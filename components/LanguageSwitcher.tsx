import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useI18n, LANGUAGES, LANGUAGE_LABELS, Language } from '../contexts/I18nContext';

interface LanguageSwitcherProps {
    className?: string;
    compact?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', compact = false }) => {
    const { language, setLanguage } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${isOpen
                        ? 'bg-sky-500/20 text-sky-400'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                    }`}
                title="Change Language"
            >
                <Globe className="w-5 h-5" />
                {!compact && (
                    <span className="text-sm font-medium">{LANGUAGE_LABELS[language]}</span>
                )}
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-0 mb-2 py-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 min-w-[140px] animate-in fade-in slide-in-from-bottom-2 duration-200">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang}
                            onClick={() => {
                                setLanguage(lang);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-2 flex items-center justify-between text-sm transition-colors ${lang === language
                                    ? 'text-sky-400 bg-sky-500/10'
                                    : 'text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            <span>{LANGUAGE_LABELS[lang]}</span>
                            {lang === language && <Check className="w-4 h-4" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
