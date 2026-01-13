import React, { useState, useEffect } from 'react';
import { X, Gift, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { useI18n, Language, LANGUAGE_LABELS, LANGUAGES } from '../contexts/I18nContext';

interface WhatsNewModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentVersion: string;
}

interface ChangelogEntry {
    version: string;
    date: string;
    sections: {
        type: 'Added' | 'Changed' | 'Fixed' | 'Removed' | 'Agregado' | 'Corregido';
        items: string[];
    }[];
}

const CHANGELOG_PATHS: Record<Language, string> = {
    zh: './docs/changelog/CHANGELOG.md',
    en: './docs/changelog/CHANGELOG.en.md',
    es: './docs/changelog/CHANGELOG.es.md'
};

// Parse CHANGELOG.md content into structured data
const parseChangelog = (content: string): ChangelogEntry[] => {
    const entries: ChangelogEntry[] = [];
    const versionBlocks = content.split(/^## \[/m).filter(Boolean);

    versionBlocks.forEach(block => {
        const versionMatch = block.match(/^([^\]]+)\] - (\d{4}-\d{2}-\d{2})/);
        if (!versionMatch) return;

        const entry: ChangelogEntry = {
            version: versionMatch[1],
            date: versionMatch[2],
            sections: []
        };

        // Find all ### sections
        const sectionRegex = /### ([\w\s]+[^\n]*)\n([\s\S]*?)(?=###|$)/g;
        let match;
        while ((match = sectionRegex.exec(block)) !== null) {
            const sectionType = match[1].replace(/[📊📦📋📚🌐⚙️🎛️🔧]/g, '').trim();
            const sectionContent = match[2];

            // Extract bullet points
            const items = sectionContent
                .split('\n')
                .filter(line => line.trim().startsWith('-'))
                .map(line => line.replace(/^-\s*/, '').trim())
                .filter(item => item.length > 0);

            if (items.length > 0) {
                entry.sections.push({
                    type: sectionType as any,
                    items
                });
            }
        }

        if (entry.sections.length > 0) {
            entries.push(entry);
        }
    });

    return entries;
};

const WhatsNewModal: React.FC<WhatsNewModalProps> = ({ isOpen, onClose, currentVersion }) => {
    const { language, setLanguage, t } = useI18n();
    const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
    const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set([currentVersion]));
    const [loading, setLoading] = useState(true);
    const [showLangMenu, setShowLangMenu] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            // Fetch CHANGELOG based on selected language
            fetch(CHANGELOG_PATHS[language])
                .then(res => {
                    if (!res.ok) throw new Error('Not found');
                    return res.text();
                })
                .then(content => {
                    const parsed = parseChangelog(content);
                    setChangelog(parsed);
                    // Auto-expand current version
                    if (parsed.length > 0) {
                        setExpandedVersions(new Set([parsed[0].version]));
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to load changelog:', err);
                    setChangelog([]);
                    setLoading(false);
                });
        }
    }, [isOpen, language]);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setShowLangMenu(false);
    };

    const toggleVersion = (version: string) => {
        setExpandedVersions(prev => {
            const next = new Set(prev);
            if (next.has(version)) {
                next.delete(version);
            } else {
                next.add(version);
            }
            return next;
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[80vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex-none px-6 py-4 border-b border-slate-700 bg-gradient-to-r from-sky-500/10 to-purple-500/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-sky-500/20 rounded-xl">
                                <Gift className="w-6 h-6 text-sky-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    {t('whatsNew.title')}
                                </h2>
                                <p className="text-sm text-slate-400">v{currentVersion}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Language Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowLangMenu(!showLangMenu)}
                                    className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span className="text-sm">{LANGUAGE_LABELS[language]}</span>
                                </button>
                                {showLangMenu && (
                                    <div className="absolute right-0 mt-1 py-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                                        {LANGUAGES.map(lang => (
                                            <button
                                                key={lang}
                                                onClick={() => handleLanguageChange(lang)}
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 transition-colors ${lang === language ? 'text-sky-400' : 'text-slate-300'
                                                    }`}
                                            >
                                                {LANGUAGE_LABELS[lang]}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : changelog.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            {t('operator.noActivity')}
                        </div>
                    ) : (
                        changelog.map(entry => (
                            <div key={entry.version} className="border border-slate-700 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => toggleVersion(entry.version)}
                                    className="w-full px-4 py-3 flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono font-bold text-sky-400">v{entry.version}</span>
                                        <span className="text-sm text-slate-500">{entry.date}</span>
                                    </div>
                                    {expandedVersions.has(entry.version) ? (
                                        <ChevronUp className="w-5 h-5 text-slate-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    )}
                                </button>

                                {expandedVersions.has(entry.version) && (
                                    <div className="px-4 py-4 space-y-4 bg-slate-900/50">
                                        {entry.sections.map((section, idx) => (
                                            <div key={idx}>
                                                <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${section.type.toLowerCase().includes('fix') || section.type.toLowerCase().includes('corregido') ? 'text-emerald-400' :
                                                    section.type.toLowerCase().includes('add') || section.type.toLowerCase().includes('agregado') ? 'text-sky-400' :
                                                        section.type.toLowerCase().includes('change') ? 'text-amber-400' :
                                                            section.type.toLowerCase().includes('remove') ? 'text-red-400' :
                                                                'text-slate-300'
                                                    }`}>
                                                    {section.type}
                                                </h4>
                                                <ul className="space-y-1.5">
                                                    {section.items.map((item, itemIdx) => (
                                                        <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-300">
                                                            <span className="text-slate-500 mt-1">•</span>
                                                            <span dangerouslySetInnerHTML={{
                                                                __html: item
                                                                    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                                                            }} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="flex-none px-6 py-4 border-t border-slate-700 bg-slate-800/50">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors"
                    >
                        {t('whatsNew.gotIt')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhatsNewModal;
