// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ⚠️ ملاحظة: يجب أن تكون مسارات الاستيراد صحيحة حسب بنية مشروعك (قد تحتاج إلى '../locales/...')
import enTranslation from './locales/en.json'; 
import arTranslation from './locales/ar.json'; 

const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  // اللغة الافتراضية عند البدء
  lng: 'en', 
  // اللغة الاحتياطية
  fallbackLng: 'en',
  // لتعيين اتجاه النص (RTL/LTR)
  // يمكنك استخدام useEffect لتغيير اتجاه الجسم (body) بناءً على اللغة الحالية
  // ltr: ['en'], 
  // rtl: ['ar'],

  interpolation: {
    escapeValue: false, // تسمح بإدخال HTML في الترجمة
  },
});

export default i18n;