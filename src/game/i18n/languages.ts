import {ILangId} from "../../engine/commons/types/types";

const LANGS = {
  pl: "pl",
  en: "en",
  de: "de",
  es: "es",
} as const;

export const LANGS_LABELS: Record<ILangId, string> = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
  es: "Español",
} as const;

export const LANGS_ORDER: ILangId[] = [LANGS.en, LANGS.de, LANGS.pl];

export default LANGS;
