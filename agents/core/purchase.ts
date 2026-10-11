/**
 * Bryggan mellan agenten och Stripe: en komplett beställning blir ett
 * fakturautkast.
 *
 * Allt som rör pengar räknas fram här ur `stripe/catalog.ts` — pris, moms och
 * belopp. Modellen har bara samlat in kundens uppgifter och kan varken sätta
 * pris, moms eller belopp. Landet härleds ur VAT-numret eller org.numret, så
 * modellen slipper gissa det också.
 *
 * Ingenting skickas till kunden: utkastet ligger i Stripe och ägaren får en
 * färdig sammanställning med dashboardlänk och klickar själv "Skicka faktura".
 */
import { loadEnv } from './env.js'
import type { InvoiceOrder } from './types.js'
import {
  buildInvoicePlan,
  createDraftInvoice,
  describeInvoicePlan,
  ownerNotification,
  type InvoiceRequest,
} from '../stripe/invoice.js'
import { keyMode, readMap, requireSecretKey } from '../stripe/client.js'

export interface PurchaseOptions {
  /** true = räkna bara, skapa ingenting (lokal testkörning). */
  dryRun: boolean
  /** Avsändarens adress — används när kunden inte uppgett någon fakturamejl. */
  fallbackEmail: string
}

export interface PurchaseOutcome {
  ok: boolean
  /** Sant när det bara var en torrkörning (inget skapat hos Stripe). */
  simulated: boolean
  /** Färdig text till ägaren — innehåller dashboardlänken när utkastet skapats. */
  ownerNote: string
  invoiceId?: string
}

/**
 * Landet ur VAT-numret (två bokstäver först) eller ur ett svenskt org.nr.
 * Blir det tomt skapas fakturan utan moms och ägaren får en varning i stället
 * för att koden killgissar en momssats.
 */
export function countryFor(orgNr: string, vatNumber: string): string {
  const vat = vatNumber.replace(/[\s.-]/g, '').toUpperCase()
  if (/^[A-Z]{2}[A-Z0-9]{4,}$/.test(vat)) return vat.slice(0, 2)

  const org = orgNr.replace(/[\s.-]/g, '')
  if (/^\d{6}-?\d{4}$/.test(org) || /^\d{10}$/.test(org)) return 'SE'

  return ''
}

/** Beställningen som Stripe-klienten vill ha den. */
export function invoiceRequestFor(order: InvoiceOrder, fallbackEmail: string): InvoiceRequest {
  const email = order.email || fallbackEmail
  return {
    company: order.company,
    orgNr: order.orgNr,
    vatNumber: order.vatNumber,
    email,
    // Referens ar frivillig for kunden, men fakturan maste ha en: den star i
    // beskrivningen och i betalningsfoten. Saknas den anvander vi kundens
    // mejladress — ett faktum ur bestallningen, aldrig en pahittad siffra.
    reference: order.reference || email,
    plan: order.plan,
    tier: order.tier,
    period: order.period,
    country: countryFor(order.orgNr, order.vatNumber),
  }
}

/**
 * Skapar (eller torrkör) fakturautkastet. Kastar aldrig vidare till mejlflödet
 * — kunden har redan fått sitt svar när den här körs, och ett Stripe-strul får
 * aldrig tystna. Ägaren får i stället besked om att något gick fel.
 */
export async function createPurchase(
  order: InvoiceOrder,
  options: PurchaseOptions,
): Promise<PurchaseOutcome> {
  loadEnv()
  const request = invoiceRequestFor(order, options.fallbackEmail)

  try {
    if (options.dryRun) {
      const plan = buildInvoicePlan(request)
      const note = [
        'FAKTURAUTKAST — torrkörning, ingenting skapades i Stripe.',
        '',
        describeInvoicePlan(plan, 'TEST', ''),
      ].join('\n')
      return { ok: true, simulated: true, ownerNote: note }
    }

    const result = await createDraftInvoice(request)
    const map = readMap()
    const plan = buildInvoicePlan(request, { taxRates: map?.taxRates })
    const mode = map?.mode ?? keyMode(requireSecretKey())
    const notification = ownerNotification(plan, result, mode)

    return {
      ok: true,
      simulated: false,
      ownerNote: notification.body,
      invoiceId: result.invoiceId,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`[purchase] kunde inte skapa fakturautkast: ${message}`)
    return {
      ok: false,
      simulated: options.dryRun,
      ownerNote: [
        'FAKTURAUTKASTET KUNDE INTE SKAPAS — beställningen ligger hos dig manuellt.',
        '',
        `Fel: ${message}`,
        '',
        'Kontrollera att `npm run stripe:apply` är körd och att STRIPE_SECRET_KEY i',
        'agents/.env är en giltig testnyckel, och skapa fakturan för hand i Stripe.',
      ].join('\n'),
    }
  }
}

/**
 * Nycklarna i `types.ts` är samma som i katalogen: `invoiceRequestFor` ovan
 * tvingar fram ett kompileringsfel om `stripe/catalog.ts` byter namn på ett
 * paket, en storlek eller en period.
 */
