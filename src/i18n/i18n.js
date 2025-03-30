import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';
import deTranslations from './locales/de.json';
import itTranslations from './locales/it.json';
import ptTranslations from './locales/pt.json';
import ruTranslations from './locales/ru.json';
import jaTranslations from './locales/ja.json';
import zhTranslations from './locales/zh.json';
import arTranslations from './locales/ar.json';
import hiTranslations from './locales/hi.json';
import nlTranslations from './locales/nl.json';
import swTranslations from './locales/sw.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      es: {
        translation: esTranslations,
      },
      de: {
        translation: deTranslations,
      },
      it: {
        translation: itTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
      ru: {
        translation: ruTranslations,
      },
      ja: {
        translation: jaTranslations,
      },
      zh: {
        translation: zhTranslations,
      },
      ar: {
        translation: arTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
      nl: {
        translation: nlTranslations,
      },
      sw: {
        translation: swTranslations,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 