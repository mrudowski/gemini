const LANGS = {
  pl: 'pl',
  en: 'en',
} as const;

export type ILangId = keyof typeof LANGS;
export default LANGS;
