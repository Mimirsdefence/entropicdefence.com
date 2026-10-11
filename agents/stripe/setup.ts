/**
 * Skapar de fasta externpriserna i Stripe.
 *
 *   npm run stripe:plan    torrkorning — visar exakt vad som skulle skapas (ingen nyckel kravs)
 *   npm run stripe:apply   skapar produkter, priser, momssatser och betallankar
 *
 * Kraver STRIPE_SECRET_KEY i agents/.env. Kor alltid i testlage forst
 * (sk_test_...). En nyckel som borjar pa sk_live_ vagras om du inte ocksa
 * skickar --yes-live.
 *
 * Skapandet ar idempotent: varje objekt markeras med metadata[ed_key] och
 * ateranvands vid nasta korning. Resultatet sparas i `stripe/.stripe-map.json`
 * (lokal fil, committas aldrig) sa agenten kan sla upp pris-id och betallank.
 */
import { existsSync, writeFileSync } from 'node:fs'

import {
  PERIOD_KEYS,
  PERIOD_NAMES,
  PRICE_SPECS,
  PRODUCT_SPECS,
  TAX_RATE_SPECS,
  type PriceSpec,
  type ProductSpec,
} from './catalog.js'
import {
  byKey,
  formatKrFromKronor,
  keyMode,
  listAll,
  mapFilePath,
  requireSecretKey,
  stripeRequest,
  type ParamValue,
  type StripeAccount,
  type StripeMap,
} from './client.js'
import { loadEnv } from '../core/env.js'

interface StripeProduct {
  id: string
  name: string
  metadata?: Record<string, string>
}

interface StripePrice {
  id: string
  unit_amount: number | null
  metadata?: Record<string, string>
}

interface StripeTaxRate {
  id: string
  display_name: string
  metadata?: Record<string, string>
}

interface StripePaymentLink {
  id: string
  url: string
  metadata?: Record<string, string>
}

function kr(amount: number): string {
  return formatKrFromKronor(amount)
}

function printPlan(): void {
  console.log('Produkter (6):')
  for (const product of PRODUCT_SPECS) {
    console.log(`  ${product.key.padEnd(24)} ${product.name}`)
  }
  console.log('\nPriser (18):')
  for (const product of PRODUCT_SPECS) {
    const rows = PRICE_SPECS.filter((spec) => spec.productKey === product.key).map((spec) => {
      const interval = spec.interval === 'year' ? '1 år' : `${spec.intervalCount} mån`
      return `${PERIOD_NAMES[spec.period]}: ${kr(spec.monthly)}/mån => ${kr(spec.total)} per ${interval}`
    })
    console.log(`  ${product.key.padEnd(24)} ${rows.join('  |  ')}`)
  }
  console.log('\nMomssatser (2):')
  for (const rate of TAX_RATE_SPECS) {
    console.log(`  ${rate.key.padEnd(24)} ${rate.displayName} (${rate.percentage} %)`)
  }
  console.log('\nBetallankar (18) skapas mot samma priser — en per produkt och period.')
  console.log('\nTorrkorning. Kor `npm run stripe:apply` for att skapa allt i Stripe.')
}

interface SetupResult {
  products: Record<string, string>
  prices: Record<string, string>
  taxRates: Record<string, string>
  paymentLinks: Record<string, string>
}

async function ensureProduct(
  secretKey: string,
  existing: StripeProduct[],
  spec: ProductSpec,
): Promise<{ id: string; created: boolean }> {
  const found = byKey(existing, spec.key)
  if (found) return { id: found.id, created: false }
  const created = await stripeRequest<StripeProduct>(
    secretKey,
    'POST',
    '/products',
    {
      name: spec.name,
      description: spec.description,
      'metadata[ed_key]': spec.key,
    },
    `ed-product-${spec.key}`,
  )
  existing.push(created)
  return { id: created.id, created: true }
}

async function ensurePrice(
  secretKey: string,
  productId: string,
  spec: PriceSpec,
  knownPrices: StripePrice[],
): Promise<{ id: string; created: boolean }> {
  const found = byKey(knownPrices, spec.key)
  if (found) return { id: found.id, created: false }

  const base: Record<string, ParamValue> = {
    product: productId,
    currency: 'sek',
    unit_amount: spec.unitAmountOre,
    nickname: spec.nickname,
    'recurring[interval]': spec.interval,
    'recurring[interval_count]': spec.intervalCount,
    'metadata[ed_key]': spec.key,
  }

  let created: StripePrice
  try {
    created = await stripeRequest<StripePrice>(
      secretKey,
      'POST',
      '/prices',
      { ...base, tax_behavior: 'exclusive' },
      `ed-price-${spec.key}`,
    )
  } catch (error) {
    // Konton utan Stripe Tax kan neka tax_behavior — skapa priset utan och fortsatt.
    if (!(error instanceof Error) || !error.message.includes('tax_behavior')) throw error
    console.warn(`  ! tax_behavior nekades for ${spec.key} — skapar priset utan.`)
    created = await stripeRequest<StripePrice>(secretKey, 'POST', '/prices', base, `ed-price-${spec.key}`)
  }
  knownPrices.push(created)
  return { id: created.id, created: true }
}

async function ensureTaxRate(
  secretKey: string,
  existing: StripeTaxRate[],
  spec: (typeof TAX_RATE_SPECS)[number],
): Promise<{ id: string; created: boolean }> {
  const found = byKey(existing, spec.key)
  if (found) return { id: found.id, created: false }
  const created = await stripeRequest<StripeTaxRate>(
    secretKey,
    'POST',
    '/tax_rates',
    {
      display_name: spec.displayName,
      description: spec.description,
      percentage: spec.percentage,
      inclusive: false,
      'metadata[ed_key]': spec.key,
    },
    `ed-taxrate-${spec.key}`,
  )
  existing.push(created)
  return { id: created.id, created: true }
}

async function ensurePaymentLink(
  secretKey: string,
  existing: StripePaymentLink[],
  priceId: string,
  spec: PriceSpec,
): Promise<{ url: string; created: boolean }> {
  const found = byKey(existing, spec.key)
  if (found) return { url: found.url, created: false }
  const created = await stripeRequest<StripePaymentLink>(
    secretKey,
    'POST',
    '/payment_links',
    {
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': 1,
      'metadata[ed_key]': spec.key,
    },
    `ed-link-${spec.key}`,
  )
  existing.push(created)
  return { url: created.url, created: true }
}

async function apply(): Promise<void> {
  const secretKey = requireSecretKey()
  const mode = keyMode(secretKey)

  const account = await stripeRequest<StripeAccount>(secretKey, 'GET', '/account')
  console.log(`Stripe-konto ${account.id} (${account.country}) — ${mode}LAGE\n`)

  const products = await listAll<StripeProduct>(secretKey, '/products', { active: true })
  const taxRates = await listAll<StripeTaxRate>(secretKey, '/tax_rates')
  const paymentLinks = await listAll<StripePaymentLink>(secretKey, '/payment_links')

  const result: SetupResult = { products: {}, prices: {}, taxRates: {}, paymentLinks: {} }

  for (const spec of TAX_RATE_SPECS) {
    const { id, created } = await ensureTaxRate(secretKey, taxRates, spec)
    result.taxRates[spec.key] = id
    console.log(`${created ? '+' : '='} momssats ${spec.key}: ${id}`)
  }

  for (const spec of PRODUCT_SPECS) {
    const { id, created } = await ensureProduct(secretKey, products, spec)
    result.products[spec.key] = id
    console.log(`${created ? '+' : '='} produkt ${spec.key}: ${id}`)

    const knownPrices = await listAll<StripePrice>(secretKey, '/prices', { product: id, active: true })
    for (const period of PERIOD_KEYS) {
      const priceSpec = PRICE_SPECS.find(
        (candidate) => candidate.productKey === spec.key && candidate.period === period,
      )
      if (!priceSpec) throw new Error(`Saknar prisspec for ${spec.key}/${period}`)

      const price = await ensurePrice(secretKey, id, priceSpec, knownPrices)
      result.prices[priceSpec.key] = price.id

      const link = await ensurePaymentLink(secretKey, paymentLinks, price.id, priceSpec)
      result.paymentLinks[priceSpec.key] = link.url

      console.log(
        `  ${price.created ? '+' : '='} ${priceSpec.key.padEnd(28)} ${kr(priceSpec.total)} ` +
          `${price.id}  ${link.created ? 'lank skapad' : 'lank finns'}`,
      )
    }
  }

  const map: StripeMap = { generatedAt: new Date().toISOString(), mode, ...result }
  writeFileSync(mapFilePath, `${JSON.stringify(map, null, 2)}\n`, 'utf8')
  console.log(`\nKlart. Karta skriven till ${mapFilePath}`)
  console.log('Inget har skickats till nagon kund — bara katalogobjekt har skapats.')
}

async function main(): Promise<void> {
  loadEnv()
  const command = process.argv[2] ?? 'plan'

  if (command === 'plan') {
    printPlan()
    return
  }
  if (command === 'apply') {
    await apply()
    return
  }
  console.log('Anvandning: npm run stripe:plan | npm run stripe:apply [-- --yes-live]')
  if (existsSync(mapFilePath)) console.log(`Senaste karta: ${mapFilePath}`)
}

main().catch((error: unknown) => {
  console.error(`\nFel: ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
})
