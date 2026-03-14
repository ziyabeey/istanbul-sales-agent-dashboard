'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';

const UNIVERSAL_QUESTIONS = [
    { id: 'businessName', label: 'İşletmenizin adı nedir?', placeholder: 'Örn: Ahmet Usta Berber Salonu', type: 'text', required: true },
    { id: 'slogan', label: 'Bir sloganınız var mı?', placeholder: 'Örn: Şehrin en iyi tıraşı (Opsiyonel)', type: 'text', required: false },
    { id: 'phone', label: 'Müşteri İletişim Numaranız', placeholder: '05XX XXX XX XX', type: 'text', required: true },
    { id: 'address', label: 'Açık Adresiniz', placeholder: 'İlçe, Mahalle, Sokak detaylarıyla...', type: 'textarea', required: true },
    // Simplified selection for brevity
    { id: 'openTime', label: 'Kaçta açılıyor?', type: 'time', placeholder: '', required: true },
    { id: 'closeTime', label: 'Kaçta kapanıyor?', type: 'time', placeholder: '', required: true },
] as const;

export default function IsletmeBilgileriPage() {
    const router = useRouter();
    const { answers, setAnswer, setStep } = useOnboardingStore();
    const [localStep, setLocalStep] = useState(0);

    const q = UNIVERSAL_QUESTIONS[localStep];
    const currentValue = (answers as any)[q.id] || '';

    const handleNext = () => {
        if (q.required && !currentValue) {
            alert('Lütfen bu alanı doldurun.');
            return;
        }

        if (localStep < UNIVERSAL_QUESTIONS.length - 1) {
            setLocalStep(prev => prev + 1);
        } else {
            // İleri adıma (Sektörel detaylar) geç
            setStep(2);
            router.push('/onboarding/detaylar');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && q.type !== 'textarea') {
            handleNext();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in slide-in-from-right-8 duration-500">
            <div className="w-full max-w-lg">
                <div className="mb-4 text-[#7c3aed] font-bold text-sm tracking-widest uppercase">
                    Adım {localStep + 1} / {UNIVERSAL_QUESTIONS.length}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{q.label}</h2>

                {q.type === 'textarea' ? (
                    <textarea 
                        autoFocus
                        value={currentValue}
                        onChange={(e) => setAnswer(q.id as any, e.target.value)}
                        className="w-full bg-transparent border-b-2 border-white/20 text-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c3aed] pb-4 transition-colors resize-none h-32"
                        placeholder={q.placeholder}
                    />
                ) : (
                    <input 
                        autoFocus
                        type={q.type}
                        value={currentValue}
                        onChange={(e) => setAnswer(q.id as any, e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-b-2 border-white/20 text-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#7c3aed] pb-4 transition-colors"
                        placeholder={q.placeholder}
                    />
                )}

                <div className="mt-12 flex items-center justify-between">
                    <button 
                        onClick={() => localStep > 0 ? setLocalStep(prev => prev - 1) : router.push('/onboarding/sektor')}
                        className="text-slate-400 font-medium hover:text-white transition-colors"
                    >
                        ← Geri
                    </button>
                    
                    <button 
                        onClick={handleNext}
                        className="bg-[#7c3aed] text-white px-8 py-3 rounded-full font-bold hover:bg-[#6d28d9] transition-colors flex items-center gap-2"
                    >
                        {localStep === UNIVERSAL_QUESTIONS.length - 1 ? 'Devam Et' : 'Sonraki'} →
                    </button>
                </div>
            </div>
        </div>
    );
}
