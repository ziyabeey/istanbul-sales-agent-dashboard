'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SECTORS, SECTOR_GROUPS } from '@kepenk/config/sectors';
import { useOnboardingStore } from '@/store/onboardingStore';

export default function SektorSecimiPage() {
    const router = useRouter();
    const { setSektor, setStep } = useOnboardingStore();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelect = (sektorId: string) => {
        setSektor(sektorId);
        setStep(1); // İşletme bilgileri adımı
        router.push('/onboarding/isletme');
    };

    const filteredSectors = Object.values(SECTORS).filter(s => 
        s.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">İşletmenizin Sektörü Nedir?</h1>
                <p className="text-slate-400 text-lg">Yapay zeka asistanınızı sektörünüze özel eğitebilmemiz için lütfen ana kategorinizi seçin.</p>
            </div>

            <div className="mb-8 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">🔍</span>
                <input 
                    type="text" 
                    placeholder="Sektör veya meslek arayın (Örn: Kafe, Avukat, Berber...)" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredSectors.map((sector) => (
                    <button
                        key={sector.id}
                        onClick={() => handleSelect(sector.id)}
                        className="group flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-[#7c3aed]/10 hover:border-[#7c3aed]/50 transition-all text-center"
                    >
                        <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{sector.emoji}</span>
                        <span className="font-medium text-slate-200 group-hover:text-white">{sector.label}</span>
                    </button>
                ))}
            </div>

            {filteredSectors.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    "{searchTerm}" ile eşleşen bir sektör bulunamadı.<br/>
                    Daha genel bir terim kullanarak tekrar deneyebilirsiniz.
                </div>
            )}
        </div>
    );
}
