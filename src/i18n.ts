import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import en from '~/locales/en.json';
import ptBr from '~/locales/pt-br.json';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || 'en',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      pt: {
        translation: ptBr,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
