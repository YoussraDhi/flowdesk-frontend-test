import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from './locale/en.json';
import frJson from './locale/fr.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { ...enJson },
        fr: { ...frJson }
    }, 
    lng: 'en',
    fallbackLng: 'en',
});
    