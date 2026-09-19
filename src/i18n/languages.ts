export type LanguageCode = 'sv' | 'fi' | 'da' | 'no' | 'lt' | 'et' | 'lv' | 'fr' | 'es' | 'th'

export interface LanguageMeta {
  code: LanguageCode
  /** Endonym — språkets namn på sitt eget språk */
  name: string
  /** Emoji-flagga som visas i språkväljaren */
  flag: string
  /** Prefix som matchas mot navigator.language (t.ex. "nb-NO" → "no") */
  match: string[]
}

export const LANGUAGES: LanguageMeta[] = [
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', match: ['sv'] },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮', match: ['fi'] },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', match: ['da'] },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', match: ['no', 'nb', 'nn'] },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹', match: ['lt'] },
  { code: 'et', name: 'Eesti', flag: '🇪🇪', match: ['et'] },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻', match: ['lv'] },
  { code: 'fr', name: 'Français', flag: '🇫🇷', match: ['fr'] },
  { code: 'es', name: 'Español', flag: '🇪🇸', match: ['es'] },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', match: ['th'] },
]

export const DEFAULT_LANGUAGE: LanguageCode = 'sv'

export function languageFromNavigator(value: string | undefined): LanguageCode {
  if (!value) return DEFAULT_LANGUAGE
  const v = value.toLowerCase()
  for (const lang of LANGUAGES) {
    if (lang.match.some((prefix) => v === prefix || v.startsWith(`${prefix}-`))) {
      return lang.code
    }
  }
  return DEFAULT_LANGUAGE
}

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return LANGUAGES.some((lang) => lang.code === value)
}
