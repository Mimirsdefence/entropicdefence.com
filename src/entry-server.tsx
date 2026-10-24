import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import {
  DEFAULT_LANGUAGE,
  LanguageProvider,
  languageFromPath,
  stripLanguagePrefix,
  translations,
  type LanguageCode,
} from './i18n'

import { getPost, getPostTranslations, getPosts } from './blog/posts'
import { blogUi } from './blog/ui'

export { getPostTranslations as getBlogTranslations, getPosts as getBlogPosts }

/**
 * SSR-ingång för prerendering. Renderar hela appen till statisk HTML för en
 * given URL. `LanguageProvider` läser språket ur URL:en (`/sv/papers` → sv),
 * så ingen extra språkprop behövs — `<html lang>` sätts av prerender-skriptet.
 */
export function render(url: string): { html: string } {
  const html = renderToString(
    <StaticRouter location={url}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StaticRouter>,
  )
  return { html }
}

const META_KEYS: Record<string, keyof (typeof translations)['sv']['meta']> = {
  '/': 'home',
  '/checkout': 'checkout',
  '/checkout/extern': 'checkoutExtern',
  '/checkout/mindre': 'checkoutSmall',
  '/checkout/intern': 'checkoutIntern',
  '/checkout/ledning': 'checkoutLedning',
  '/success': 'success',
  '/papers': 'papers',
  '/legal': 'legal',
  '/support': 'support',
  '/advisories': 'advisories',
  '/disclosures': 'disclosures',
  '/status': 'status',
}

/**
 * Titel + meta description för en URL, oavsett språkprefix. Används av
 * prerender-skriptet för att ge varje statisk sida rätt <title> och
 * meta description på rätt språk.
 */
export function getPageMeta(url: string): { title: string; description: string; lang: LanguageCode } {
  const lang = languageFromPath(url) ?? DEFAULT_LANGUAGE
  const pagePath = stripLanguagePrefix(url)

  if (pagePath === '/blog') {
    const ui = blogUi[lang]
    return { title: `${ui.title} — Entropic Defence`, description: ui.lead, lang }
  }

  if (pagePath.startsWith('/blog/')) {
    const post = getPost(lang, pagePath.slice('/blog/'.length))
    if (post) {
      return { title: `${post.title} — Entropic Defence`, description: post.description, lang }
    }
  }

  const key = META_KEYS[pagePath] ?? 'notFound'
  const meta = translations[lang].meta[key]
  return { title: meta.title, description: meta.description, lang }
}

const SITE_URL = 'https://entropicdefence.com'

/** og:locale per språk — prerender skriver rätt värde i varje statisk sida. */
export const OG_LOCALES: Record<LanguageCode, string> = {
  sv: 'sv_SE',
  en: 'en_US',
  fi: 'fi_FI',
  da: 'da_DK',
  no: 'nb_NO',
  lt: 'lt_LT',
  et: 'et_EE',
  lv: 'lv_LV',
  pl: 'pl_PL',
  sl: 'sl_SI',
  fr: 'fr_FR',
  es: 'es_ES',
  th: 'th_TH',
}

/** Länder sajten riktar sig till. Används i `areaServed`. */
const AREA_SERVED = [
  'Sweden',
  'Finland',
  'Denmark',
  'Norway',
  'Estonia',
  'Lithuania',
  'Latvia',
  'Poland',
  'Slovenia',
  'France',
  'Spain',
  'Thailand',
]

/**
 * Sociala profiler för `sameAs`. Lämnas tom tills kontona finns — påhittade
 * länkar i strukturerad data är sämre än inga länkar.
 */
const SOCIAL_PROFILES: string[] = []

/**
 * JSON-LD (schema.org) för en URL. Skrivs in i `<head>` av prerender-skriptet
 * så att Google, Bing och AI-svar (ChatGPT, Perplexity) får strukturerad data
 * utan att köra JavaScript.
 *
 * Organization + WebSite en gång per sida, WebPage + BreadcrumbList per sida,
 * och FAQPage på /support (frågorna finns redan översatta i lexikonet).
 */
export function getStructuredData(url: string): string {
  const lang = languageFromPath(url) ?? DEFAULT_LANGUAGE
  const pagePath = stripLanguagePrefix(url)
  const key = META_KEYS[pagePath] ?? 'notFound'
  const dict = translations[lang]
  const meta = getPageMeta(url)
  const slug = pagePath.startsWith('/blog/') ? pagePath.slice('/blog/'.length) : undefined
  const post = slug ? getPost(lang, slug) : undefined
  const pageUrl = `${SITE_URL}${url}`
  const orgId = `${SITE_URL}/#organization`
  const siteId = `${SITE_URL}/#website`

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'Entropic Defence',
      url: `${SITE_URL}/${lang}`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon-512x512.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/og-image.png`,
      email: 'contact@entropicdefence.com',
      description: dict.footer.tagline,
      areaServed: AREA_SERVED.map((name) => ({ '@type': 'Country', name })),
      knowsLanguage: Object.keys(OG_LOCALES),
      ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: `${SITE_URL}/${lang}`,
      name: 'Entropic Defence',
      inLanguage: lang,
      publisher: { '@id': orgId },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: meta.title,
      description: meta.description,
      inLanguage: lang,
      isPartOf: { '@id': siteId },
      about: { '@id': orgId },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/og-image.png` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Entropic Defence',
          item: `${SITE_URL}/${lang}`,
        },
        ...(pagePath === '/'
          ? []
          : pagePath === '/blog'
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: blogUi[lang].navLabel,
                  item: pageUrl,
                },
              ]
            : post
              ? [
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: blogUi[lang].navLabel,
                    item: `${SITE_URL}/${lang}/blog`,
                  },
                  { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
                ]
              : [{ '@type': 'ListItem', position: 2, name: meta.title, item: pageUrl }]),
      ],
    },
  ]

  if (post) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: lang,
      author: { '@id': orgId },
      publisher: { '@id': orgId },
      image: `${SITE_URL}/og-image.png`,
      mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      ...(post.tags.length > 0 ? { keywords: post.tags.join(', ') } : {}),
    })
    graph.push({
      '@type': 'Blog',
      '@id': `${SITE_URL}/${lang}/blog#blog`,
      url: `${SITE_URL}/${lang}/blog`,
      name: blogUi[lang].title,
      inLanguage: lang,
      publisher: { '@id': orgId },
      blogPost: getPosts(lang).map((entry) => ({
        '@type': 'BlogPosting',
        headline: entry.title,
        url: `${SITE_URL}/${lang}/blog/${entry.slug}`,
        datePublished: entry.date,
      })),
    })
  } else if (pagePath === '/blog') {
    graph.push({
      '@type': 'Blog',
      '@id': `${pageUrl}#blog`,
      url: pageUrl,
      name: meta.title,
      description: meta.description,
      inLanguage: lang,
      publisher: { '@id': orgId },
      blogPost: getPosts(lang).map((entry) => ({
        '@type': 'BlogPosting',
        headline: entry.title,
        url: `${SITE_URL}/${lang}/blog/${entry.slug}`,
        datePublished: entry.date,
      })),
    })
  }

  if (key === 'support') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      inLanguage: lang,
      mainEntity: dict.support.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    })
  }

  // `<` escapas så att innehållet aldrig kan stänga <script>-taggen.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll(
    '<',
    '\\u003c',
  )
}
