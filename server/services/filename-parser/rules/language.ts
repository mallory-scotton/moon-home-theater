// Dependencies
import { MULTI_EXP } from './utils';

// Define a language regular expressions list
export const LANGUAGE_EXPS = {
  ENGLISH: {
    value: 'english',
    exp: /\b(english|eng|en|fi)\b/i
  },
  FRENCH: {
    value: 'french',
    exp: /\b(fr|french|vostfr|vo|vff|vfq|vf2|truefrench|subfrench)\b/i
  },
  SPANISH: {
    value: 'spanish',
    exp: /\b(spanish)\b/i
  },
  GERMAN: {
    value: 'german',
    exp: /\b(german|videomann)\b/i
  },
  ITALIAN: {
    value: 'italian',
    exp: /\b(ita|italian)\b/i
  },
  DANISH: {
    value: 'danish',
    exp: /\b(dk|dan|danish)\b/i
  },
  DUTCH: {
    value: 'dutch',
    exp: /\b(nl|dutch)\b/i
  },
  JAPANESE: {
    value: 'japanese',
    exp: /\b(japanese)\b/i
  },
  CANTONESE: {
    value: 'cantonese',
    exp: /\b(cantonese)\b/i
  },
  MANDARIN: {
    value: 'mandarin',
    exp: /\b(mandarin)\b/i
  },
  RUSSIAN: {
    value: 'russian',
    exp: /\b(russian|rus)\b/i
  },
  POLISH: {
    value: 'polish',
    exp: /\b(polish|pl|pldub)\b/i
  },
  VIETNAMESE: {
    value: 'vietnamese',
    exp: /\b(vietnamese)\b/i
  },
  NORDIC: {
    value: 'nordic',
    exp: /\b(nordic|nordicsubs)\b/i
  },
  SWEDISH: {
    value: 'swedish',
    exp: /\b(swedish|se|swe)\b/i
  },
  NORWEGIAN: {
    value: 'norwegian',
    exp: /\b(norwegian|no)\b/i
  },
  FINNISH: {
    value: 'finnish',
    exp: /\b(finnish)\b/i
  },
  TURKISH: {
    value: 'turkish',
    exp: /\b(turkish)\b/i
  },
  PORTUGESE: {
    value: 'portuguese',
    exp: /\b(portuguese)\b/i
  },
  FLEMISH: {
    value: 'flemish',
    exp: /\b(flemish)\b/i
  },
  GREEK: {
    value: 'greek',
    exp: /\b(greek)\b/i
  },
  KOREAN: {
    value: 'korean',
    exp: /\b(korean)\b/i
  },
  HUNGARIAN: {
    value: 'hungarian',
    exp: /\b(hungarian|hundub|hun)\b/i
  },
  PERSIAN: {
    value: 'persian',
    exp: /\b(persian)\b/i
  },
  BENGALI: {
    value: 'bengali',
    exp: /\b(bengali)\b/i
  },
  BULGARIAN: {
    value: 'bulgarian',
    exp: /\b(bulgarian)\b/i
  },
  BRAZILIAN: {
    value: 'brazilian',
    exp: /\b(brazilian)\b/i
  },
  HEBREW: {
    value: 'hebrew',
    exp: /\b(hebrew|HebDub)\b/i
  },
  CZECH: {
    value: 'czech',
    exp: /\b(czech|CZ|SK)\b/i
  },
  UKRAINIAN: {
    value: 'ukrainian',
    exp: /\b(ukrainian|ukr)\b/i
  },
  CATALAN: {
    value: 'catalan',
    exp: /\b(catalan)\b/i
  },
  CHINESE: {
    value: 'chinese',
    exp: /\b(chinese|chi)\b/i
  },
  THAI: {
    value: 'thai',
    exp: /\b(thai)\b/i
  },
  HINDI: {
    value: 'hindi',
    exp: /\b(hindi|hin)\b/i
  },
  TAMIL: {
    value: 'tamil',
    exp: /\b(tamil|tam)\b/i
  },
  ARABIC: {
    value: 'arabic',
    exp: /\b(arabic)\b/i
  },
  ESTONIAN: {
    value: 'estonian',
    exp: /\b(estonian)\b/i
  },
  ICELANDIC: {
    value: 'icelandic',
    exp: /\b(icelandic|ice)\b/i
  },
  LATVIAN: {
    value: 'latvian',
    exp: /\b(latvian)\b/i
  },
  LITHUANIAN: {
    value: 'lithuanian',
    exp: /\b(lithuanian)\b/i
  },
  ROMANIAN: {
    value: 'romanian',
    exp: /\b(romanian|ro)\b/i
  },
  SLOVAK: {
    value: 'slovak',
    exp: /\b(slovak|sk)\b/i
  },
  SERBIAN: {
    value: 'serbian',
    exp: /\b(serbian)\b/i
  },
  MULTI: {
    value: 'english',
    exp: MULTI_EXP
  }
};
