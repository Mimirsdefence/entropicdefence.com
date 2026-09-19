import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { sv, type Dictionary } from './sv'
import { fi } from './fi'
import { da } from './da'
import { no } from './no'
import { lt } from './lt'
import { et } from './et'
import { lv } from './lv'
import { fr } from './fr'
import { es } from './es'
import { th } from './th'
import {
  DEFAULT_LANGUAGE,
  isLanguageCode,
  languageFromNavigator,
  LANGUAGES,
  type LanguageCode,
} from './languages'

export { LANGUAGES, DEFAULT_LANGUAGE, isLanguageCode, languageFromNavigator }
export type { LanguageCode, Dictionary }

const STORAGE_KEY = 'ed-lang'

const translations: Record<LanguageCode, Dictionary> = { sv, fi, da, no, lt, et, lv, fr, es, th }

interface I18nContextValue {
  lang: LanguageCode
  setLang: (lang: LanguageCode) => void
  t: Dictionary
}

const I18nContext = createContext<I18nContextValue | null>(null)

function detectInitialLanguage(): LanguageCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLanguageCode(saved)) return saved
  } catch {
    // localStorage kan vara blockerad (t.ex. privat läge) — fall tillbaka till navigator
  }
  return languageFromNavigator(typeof navigator !== 'undefined' ? navigator.language : undefined)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>(detectInitialLanguage)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignorera — språket gäller fortfarande för sessionen
    }
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t: translations[lang] }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n måste användas innanför <LanguageProvider>')
  }
  return ctx
}
