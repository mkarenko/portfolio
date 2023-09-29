import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import plTranslation from './pl.json';
import enTranslation from './en.json';

const resources = {
  pl: {
    translation: plTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
