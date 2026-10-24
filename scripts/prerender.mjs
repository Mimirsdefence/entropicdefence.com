import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const SITE = 'https://entropicdefence.com'

/** Samma koder som i src/i18n/languages.ts — källa till sanning för prerender. */
const LANGS = ['sv', 'en', 'fi', 'da', 'no', 'lt', 'et', 'lv', 'pl', 'sl', 'fr', 'es', 'th']

/** Språkfria sökvägar. `''` = startsida. */
const ROUTES = [
  '',
  '/checkout',
  '/checkout/extern',
  '/checkout/mindre',
  '/checkout/intern',
  '/checkout/ledning',
  '/success',
  '/papers',
  '/blog',
  '/legal',
  '/support',
  '/advisories',
  '/disclosures',
  '/status',
]

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function pageUrl(lang, route) {
  return route === '' ? `/${lang}` : `/${lang}${route}`
}

function hreflangLinks(alternates) {
  const links = alternates
    .map((entry) => `<link rel="alternate" hreflang="${entry.lang}" href="${SITE}${entry.url}" />`)
    .join('\n    ')
  const fallback = alternates.find((entry) => entry.lang === 'en') ?? alternates[0]
  return `${links}\n    <link rel="alternate" hreflang="x-default" href="${SITE}${fallback.url}" />`
}

function buildPage(template, { url, lang, title, description, appHtml, locale, jsonLd, alternates, robots = 'index, follow' }) {
  let html = template
  html = html.replace('<html lang="sv">', `<html lang="${lang}">`)
  html = html.replace(
    /<title>.*?<\/title>/s,
    `<title>${escapeHtml(title)}</title>`,
  )
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  )
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/>/s,
    `<meta name="robots" content="${robots}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/s,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/s,
    `<meta property="og:url" content="${SITE}${url}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/>/s,
    `<meta property="og:locale" content="${locale}" />`,
  )
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/s,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  )
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/s,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  )
  html = html.replace(
    '<meta name="theme-color" content="#04060b" />',
    `<meta name="theme-color" content="#04060b" />
    <link rel="canonical" href="${SITE}${url}" />
    ${hreflangLinks(alternates)}`,
  )
  html = html.replace(
    '</head>',
    `  <script type="application/ld+json">${jsonLd}</script>
  </head>`,
  )
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  return html
}

async function main() {
  const server = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
  const { render, getPageMeta, getStructuredData, OG_LOCALES, getBlogPosts, getBlogTranslations } = server
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8')

  const sitemap = []
  let written = 0

  for (const lang of LANGS) {
    for (const route of ROUTES) {
      const url = pageUrl(lang, route)
      const { title, description, lang: resolvedLang } = getPageMeta(url)
      const { html: appHtml } = render(url)
      const alternates = LANGS.map((code) => ({ lang: code, url: pageUrl(code, route) }))
      const page = buildPage(template, {
        url,
        lang: resolvedLang,
        title,
        description,
        locale: OG_LOCALES[resolvedLang] ?? 'en_US',
        jsonLd: getStructuredData(url),
        appHtml,
        alternates,
        robots: route === '/papers' ? 'noindex, follow' : 'index, follow',
      })

      let outPath
      if (route === '') {
        // `/sv` → sv.html (cleanUrls) — och `/sv/` → sv/index.html (trailing slash)
        outPath = path.join(distDir, `${lang}.html`)
        await writeFile(outPath, page)
        written += 1
        await mkdir(path.join(distDir, lang), { recursive: true })
        await writeFile(path.join(distDir, lang, 'index.html'), page)
        written += 1
      } else {
        // `/sv/papers` → sv/papers.html (cleanUrls)
        outPath = path.join(distDir, lang, `${route.slice(1)}.html`)
        await mkdir(path.dirname(outPath), { recursive: true })
        await writeFile(outPath, page)
        written += 1
      }

      // Forskning är noindex tills vi har riktiga rapporter — ta bort ur sitemap
      if (route !== '/papers') sitemap.push({ lang, url })
    }
  }

  // Blogginlägg — bara de språk där artikeln faktiskt finns. Saknad översättning
  // genererar ingen fil, så länken kan aldrig peka på en tom sida.
  let postsWritten = 0
  for (const lang of LANGS) {
    for (const post of getBlogPosts(lang)) {
      const url = `/${lang}/blog/${post.slug}`
      const { title, description } = getPageMeta(url)
      const { html: appHtml } = render(url)
      const alternates = getBlogTranslations(post.translationKey).map((entry) => ({
        lang: entry.lang,
        url: `/${entry.lang}/blog/${entry.slug}`,
      }))
      const page = buildPage(template, {
        url,
        lang,
        title,
        description,
        locale: OG_LOCALES[lang] ?? 'en_US',
        jsonLd: getStructuredData(url),
        appHtml,
        alternates,
      })

      const outPath = path.join(distDir, lang, 'blog', `${post.slug}.html`)
      await mkdir(path.dirname(outPath), { recursive: true })
      await writeFile(outPath, page)
      postsWritten += 1

      sitemap.push({
        lang,
        url,
        lastmod: post.updated ?? post.date,
        priority: '0.7',
        changefreq: 'monthly',
      })
    }
  }

  // 404 — engelsk notFound-sida (Vercel visar den när inget matchar)
  const { html: notFoundHtml } = render('/en/404')
  const { title, description } = getPageMeta('/en/404')
  const page404 = buildPage(template, {
    url: '/en/404',
    lang: 'en',
    title,
    description,
    locale: 'en_US',
    jsonLd: getStructuredData('/en/404'),
    appHtml: notFoundHtml,
    alternates: [{ lang: 'en', url: '/en/404' }],
  })
  await writeFile(path.join(distDir, '404.html'), page404)
  written += 1

  // sitemap.xml
  const now = new Date().toISOString().slice(0, 10)
  const urls = sitemap
    .map(
      ({ lang, url, lastmod, priority, changefreq }) =>
        `  <url>
    <loc>${SITE}${url}</loc>
    <lastmod>${lastmod ?? now}</lastmod>
    <changefreq>${changefreq ?? 'weekly'}</changefreq>
    <priority>${priority ?? (url === `/${lang}` ? '1.0' : '0.8')}</priority>
  </url>`,
    )
    .join('\n')
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml)
  written += 1

  console.log(
    `prerender: ${written} filer skrivna (${LANGS.length} språk × ${ROUTES.length} rutter + ${postsWritten} blogginlägg + 404 + sitemap)`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
