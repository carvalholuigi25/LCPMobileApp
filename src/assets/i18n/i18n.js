import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en-US.json';
import pt from './pt-PT.json';
  
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en-US',
  fallbackLng: 'en-US',
  resources: {
    en: en,
    'en-US': en,
    'pt-PT': pt,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;