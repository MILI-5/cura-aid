// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    welcome: "Welcome to Our Service",
                    description: "We provide the best solutions for your needs.",
                    button: "Get Started",
                },
            },
            ar: {
                translation: {
                    welcome: "مرحبًا بكم في خدمتنا",
                    description: "نحن نقدم أفضل الحلول لاحتياجاتك.",
                    button: "ابدأ الآن",
                },
            },
            es: {
                translation: {
                    welcome: "Bienvenido a nuestro servicio",
                    description: "Ofrecemos las mejores soluciones para sus necesidades.",
                    button: "Comenzar",
                },
            },
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
