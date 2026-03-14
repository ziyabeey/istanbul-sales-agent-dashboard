'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { SECTORS, QuestionType } from '@kepenk/config/sectors';

export default function SektorelDetaylarPage() {
    const router = useRouter();
    const { sektor, answers, setSectorAnswer, setStep } = useOnboardingStore();
    
    // Güvenlik kontorlü
    useEffect(() => {
        if (!sektor) {
            router.replace('/onboarding/sektor');
        }
    }, [sektor, router]);

    if (!sektor) return null;

    const sectorConfig = SECTORS[sektor];
    const questions = sectorConfig?.onboardingQuestions || [];

    const handleNext = () => {
        setStep(3); // Önizleme adımı
        router.push('/onboarding/onizleme');
    };

    return (
        <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
             <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">{sectorConfig.label} Detayları</h1>
                <p className="text-slate-400">Yapay zekanın sitenizi doğru kurgulaması için son birkaç dokunuş.</p>
            </div>

            <div className="space-y-8 bg-white/5 border border-white/10 p-8 rounded-2xl">
                {questions.map(q => {
                    const val = answers.sectorAnswers?.[q.id] || '';
                    
                    return (
                        <div key={q.id}>
                            <label className="block text-sm font-bold text-white mb-2">{q.label}</label>
                            
                            {q.type === 'toggle' && (
                                <button
                                    onClick={() => setSectorAnswer(q.id, !val)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${val ? 'bg-[#7c3aed]' : 'bg-slate-700'}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${val ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            )}

                            {q.type === 'select' && (
                                <select
                                    value={val}
                                    onChange={(e) => setSectorAnswer(q.id, e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7c3aed]"
                                >
                                    <option value="" disabled>Seçiniz...</option>
                                    {q.options?.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            )}

                            {q.type === 'dynamic-list' && (
                                <div className="text-sm text-slate-400 italic">
                                    [Dinamik liste componenti gelecek sprintlerde eklenecek. Şimdilik metin alanı:]
                                    <textarea 
                                        value={val}
                                        onChange={(e) => setSectorAnswer(q.id, e.target.value)}
                                        className="w-full mt-2 bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7c3aed]"
                                        placeholder="Kategorilerinizi virgülle ayırarak yazın..."
                                    />
                                </div>
                            )}

                            {/* Diğer tipler (multi-select, triple-form) fallback olarak text */}
                            {!['toggle', 'select', 'dynamic-list'].includes(q.type) && (
                                <input
                                    type="text"
                                    value={val}
                                    onChange={(e) => setSectorAnswer(q.id, e.target.value)}
                                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7c3aed]"
                                    placeholder="Yanıtınız..."
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 flex items-center justify-between">
                <button 
                    onClick={() => router.push('/onboarding/isletme')}
                    className="text-slate-400 font-medium hover:text-white transition-colors"
                >
                    ← İşletme Bilgileri
                </button>
                
                <button 
                    onClick={handleNext}
                    className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors"
                >
                    Önizleme ve Onay →
                </button>
            </div>
        </div>
    );
}
