'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { SECTORS } from '@kepenk/config/sectors';

export default function OnizlemeVeOnayPage() {
    const router = useRouter();
    const { sektor, answers, submit, setStep } = useOnboardingStore();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (!sektor) {
            router.replace('/onboarding/sektor');
        }
    }, [sektor, router]);

    if (!sektor) return null;

    const sectorConfig = SECTORS[sektor];

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await submit();
            // Başarılı olursa Dashboard'a veya "Siteniz Kuruluyor" loading ekranına yönlendir
            router.push('/dashboard?onboarding=success');
        } catch (error) {
            setLoading(false);
            alert('Kurulum başlatılırken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
             <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Harika! Her Şey Hazır 🎉</h1>
                <p className="text-slate-400 text-lg">Yapay zeka asistanınız bilgilerinizi aldı. Siteniz ve asistanınız saniyeler içinde oluşturulacak.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed] blur-[150px] opacity-20 pointer-events-none" />
                
                <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Özet Bilgiler</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                        <span className="text-slate-500 text-sm block mb-1">İşletme Adı</span>
                        <span className="text-white font-medium">{answers.businessName || 'Belirtilmedi'}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 text-sm block mb-1">Telefon</span>
                        <span className="text-white font-medium">{answers.phone || 'Belirtilmedi'}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 text-sm block mb-1">Sektör</span>
                        <span className="text-white font-medium">{sectorConfig?.label} {sectorConfig?.emoji}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 text-sm block mb-1">Slogan</span>
                        <span className="text-white font-medium italic">{answers.slogan || 'Yok'}</span>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-slate-500 text-sm block mb-1">Adres</span>
                        <span className="text-white font-medium">{answers.address || 'Belirtilmedi'}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold mt-10 mb-6 text-white border-b border-white/10 pb-4">Sektörel Seçimler</h3>
                <div className="space-y-3">
                    {Object.entries(answers.sectorAnswers || {}).map(([key, value]) => {
                        const question = sectorConfig?.onboardingQuestions.find(q => q.id === key);
                        return (
                            <div key={key} className="flex flex-col">
                                <span className="text-slate-500 text-sm">{question?.label || key}</span>
                                <span className="text-white">{typeof value === 'boolean' ? (value ? 'Evet' : 'Hayır') : (value as string) || 'Boş'}</span>
                            </div>
                        );
                    })}
                    {Object.keys(answers.sectorAnswers || {}).length === 0 && (
                        <span className="text-slate-400 italic">Sektörel detay girilmedi.</span>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <button 
                    onClick={() => { setStep(2); router.push('/onboarding/detaylar'); }}
                    className="text-slate-400 font-medium hover:text-white transition-colors order-2 sm:order-1"
                    disabled={loading}
                >
                    ← Detayları Düzenle
                </button>
                
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full sm:w-auto bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-[#7c3aed]/25 transition-all order-1 sm:order-2 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Kuruluş Başlatılıyor...
                        </>
                    ) : (
                        <>🚀 Sihri Başlat (Siteyi Kur)</>
                    )}
                </button>
            </div>
        </div>
    );
}
