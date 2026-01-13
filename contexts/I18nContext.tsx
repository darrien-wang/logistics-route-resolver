import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Import language files
import zhLocale from '../locales/zh.json';
import enLocale from '../locales/en.json';
import esLocale from '../locales/es.json';

export type Language = 'zh' | 'en' | 'es';

export const LANGUAGE_LABELS: Record<Language, string> = {
    zh: '中文',
    en: 'English',
    es: 'Español'
};

type LocaleData = typeof zhLocale;

const locales: Record<Language, LocaleData> = {
    zh: zhLocale,
    en: enLocale,
    es: esLocale
};

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Get nested value from object using dot notation
const getNestedValue = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((current, key) => {
        return current && typeof current === 'object' ? current[key] : undefined;
    }, obj);
};

// Detect browser language
const detectLanguage = (): Language => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('es')) return 'es';
    return 'en';
};

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        // Try to get saved language from localStorage
        const saved = localStorage.getItem('appLanguage') as Language;
        if (saved && locales[saved]) return saved;
        return detectLanguage();
    });

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('appLanguage', lang);
    }, []);

    const t = useCallback((key: string, fallback?: string): string => {
        const value = getNestedValue(locales[language], key);
        if (value !== undefined) return value;

        // Fallback to English if key not found in current language
        if (language !== 'en') {
            const enValue = getNestedValue(locales.en, key);
            if (enValue !== undefined) return enValue;
        }

        // Return fallback or key itself
        return fallback || key;
    }, [language]);

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

// Export language list for components
export const LANGUAGES: Language[] = ['zh', 'en', 'es'];
