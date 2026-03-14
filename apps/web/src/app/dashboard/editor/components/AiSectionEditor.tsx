'use client';

import React, { useState } from 'react';

interface AiSectionEditorProps {
    sectionId: string;
    sectionType: string;
    currentContent: any;
    onClose: () => void;
    onUpdate: (newContent: any) => void;
}

export function AiSectionEditor({ sectionId, sectionType, currentContent, onClose, onUpdate }: AiSectionEditorProps) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');

    const handleMagicGenerate = async () => {
        if (!prompt.trim()) {
            setError('Lütfen yapay zekadan ne istediğinizi yazın.');
            return;
        }

        setError('');
        setIsGenerating(true);

        try {
            // Bu endpoint ileride Next.js tarafında (/api/editor/ai) Anthropic'e bağlanacak.
            const res = await fetch('/api/editor/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sectionType,
                    currentContent,
                    prompt
                })
            });

            if (!res.ok) throw new Error('Yapay zeka yanıt veremedi');
            
            const data = await res.json();
            
            // Başarılı (Simüle edilmiş veya gerçek)
            onUpdate(data.newContent);
            setPrompt(''); // Başarı sonrası temizle
        } catch (err: any) {
            setError(err.message || 'Bir hata oluştu');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#11111a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
                
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-[#7c3aed]/10 to-transparent">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🪄</span>
                        <div>
                            <h3 className="text-lg font-bold text-white">Yapay Zeka Editörü</h3>
                            <p className="text-xs text-slate-400 capitalize">{sectionType} Bölümünü Düzenliyorsunuz</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">✕</button>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                    
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mevcut İçerik</p>
                        <pre className="text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
                            {JSON.stringify(currentContent, null, 2)}
                        </pre>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-white mb-2 block">Ne değişsin istersiniz?</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder='Örn: "Başlığı daha samimi yap ve vurguyu uygun fiyata çek"'
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] resize-none h-24"
                        />
                        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        İptal
                    </button>
                    <button 
                        onClick={handleMagicGenerate}
                        disabled={isGenerating}
                        className="bg-[#7c3aed] text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#6d28d9] transition-colors disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sihir Yapılıyor...
                            </>
                        ) : (
                            <>🪄 Sihirli Değişim</>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
