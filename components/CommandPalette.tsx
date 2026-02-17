import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search, LayoutDashboard, Users, Mail, CalendarCheck, BarChart3, Settings,
    GraduationCap, BookOpen, Zap, Command, ArrowRight, Hash, AlertTriangle
} from 'lucide-react';
import { useAgent } from '../context/AgentContext';

interface CommandItem {
    id: string;
    label: string;
    category: 'navigation' | 'action' | 'search';
    icon: React.ReactNode;
    action: () => void;
    keywords?: string[];
}

const CommandPalette: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { toggleAgent, isAgentRunning } = useAgent();

    const commands: CommandItem[] = [
        // ... (previous items)
        { id: 'nav-settings', label: 'Ayarlar', category: 'navigation', icon: <Settings size={16} />, action: () => navigate('/settings'), keywords: ['ayar', 'api', 'yapılandır'] },
        {
            id: 'action-autopilot',
            label: isAgentRunning ? 'Otopilotu Durdur' : 'Otopilotu Başlat',
            category: 'action',
            icon: <Zap size={16} className={isAgentRunning ? 'text-red-500' : 'text-green-500'} />,
            action: () => toggleAgent(),
            keywords: ['başlat', 'ajan', 'otopilot', 'start', 'durdur', 'stop']
        },
        {
            id: 'action-debug',
            label: 'Sistem Tanılayıcı (Debug)',
            category: 'action',
            icon: <AlertTriangle size={16} />,
            action: () => window.dispatchEvent(new CustomEvent('open-diagnostics')),
            keywords: ['debug', 'hata', 'kontrol', 'test', 'tanı']
        },
    ];

    const filteredCommands = query.length === 0
        ? commands
        : commands.filter(cmd => {
            const q = query.toLowerCase();
            return cmd.label.toLowerCase().includes(q) ||
                cmd.keywords?.some(k => k.includes(q));
        });

    // Keyboard shortcut to open
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
            e.preventDefault();
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
        }
    }, [filteredCommands, selectedIndex]);

    // Scroll selected item into view
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const item = list.children[selectedIndex] as HTMLElement;
        if (item) {
            item.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex]);

    if (!isOpen) return null;

    const grouped = {
        navigation: filteredCommands.filter(c => c.category === 'navigation'),
        action: filteredCommands.filter(c => c.category === 'action'),
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <Search size={20} className="text-slate-400 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Sayfa ara, komut çalıştır..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 outline-none text-base"
                    />
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                        ESC
                    </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[320px] overflow-y-auto py-2 custom-scrollbar">
                    {filteredCommands.length === 0 ? (
                        <div className="px-5 py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                            Sonuç bulunamadı
                        </div>
                    ) : (
                        <>
                            {grouped.navigation.length > 0 && (
                                <>
                                    <div className="px-5 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        Sayfalar
                                    </div>
                                    {grouped.navigation.map((cmd) => {
                                        const idx = filteredCommands.indexOf(cmd);
                                        return (
                                            <button
                                                key={cmd.id}
                                                onClick={() => { cmd.action(); setIsOpen(false); }}
                                                onMouseEnter={() => setSelectedIndex(idx)}
                                                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left text-sm transition-colors ${selectedIndex === idx
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <span className={`flex-shrink-0 ${selectedIndex === idx ? 'text-indigo-500' : 'text-slate-400'}`}>
                                                    {cmd.icon}
                                                </span>
                                                <span className="flex-1 font-medium">{cmd.label}</span>
                                                {selectedIndex === idx && <ArrowRight size={14} className="text-indigo-400" />}
                                            </button>
                                        );
                                    })}
                                </>
                            )}

                            {grouped.action.length > 0 && (
                                <>
                                    <div className="px-5 py-1.5 mt-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        Aksiyonlar
                                    </div>
                                    {grouped.action.map((cmd) => {
                                        const idx = filteredCommands.indexOf(cmd);
                                        return (
                                            <button
                                                key={cmd.id}
                                                onClick={() => { cmd.action(); setIsOpen(false); }}
                                                onMouseEnter={() => setSelectedIndex(idx)}
                                                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left text-sm transition-colors ${selectedIndex === idx
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                    }`}
                                            >
                                                <span className={`flex-shrink-0 ${selectedIndex === idx ? 'text-amber-500' : 'text-slate-400'}`}>
                                                    {cmd.icon}
                                                </span>
                                                <span className="flex-1 font-medium">{cmd.label}</span>
                                                {selectedIndex === idx && <ArrowRight size={14} className="text-indigo-400" />}
                                            </button>
                                        );
                                    })}
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-[11px] text-slate-400">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-[10px] font-mono">↑↓</kbd>
                            gezin
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-[10px] font-mono">↵</kbd>
                            seç
                        </span>
                    </div>
                    <span className="flex items-center gap-1">
                        <Command size={10} />
                        <kbd className="font-mono">K</kbd> ile aç
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
