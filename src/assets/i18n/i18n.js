import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en-US.json';
import pt from './pt-PT.json';

export const aryLangs = [
  {
    id: 1,
    name: "en-US",
    title: "English (United States of America)"
  },
  {
    id: 2,
    name: "pt-PT",
    title: "Português (Portugal)"
  },
];
  
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: aryLangs[0].name,
  fallbackLng: aryLangs[0].name,
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