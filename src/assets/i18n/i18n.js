import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as langs from './index';

export const aryLangs = require('../../data/languages.json');
  
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: aryLangs[0].name ?? 'en-US',
  fallbackLng: aryLangs[0].name ?? 'en-US',
  resources: {
    en: langs.en,
    'en-US': langs.en,
    'pt-PT': langs.pt,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;