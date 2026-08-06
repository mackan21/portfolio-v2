import { ref, watch } from 'vue'

export type Lang = 'sv' | 'en'

const STORAGE_KEY = 'portfolio-lang'

function detectInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'sv' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('sv') ? 'sv' : 'en'
}

export const lang = ref<Lang>(typeof window === 'undefined' ? 'sv' : detectInitialLang())

watch(lang, (value) => {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, value)
})

export function toggleLang() {
  lang.value = lang.value === 'sv' ? 'en' : 'sv'
}
