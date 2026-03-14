'use client';

import React, { useState } from 'react';

// MOCK DATA for Demonstration
const MOCK_MERCHANT = {
    id: 'merch_12345',
    packageId: 'buyume', // Has domain rights
    businessName: 'Ahmet Berber',
    currentSubdomain: 'ahmetberber.kepenk.ai',
    customDomain: null // Has hasn't chosen one yet
};

export default function DomainHediyePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<{name: string, available: boolean}[] | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Sadece Büyüme ve Lider paketine özel
    if (MOCK_MERCHANT.packageId === 'temel') {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
                <span className="text-6xl mb-4">🔒</span>
                <h1 className="text-2xl font-bold mb-2">Bu Özellik Kilitli</h1>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">Ücretsiz .com veya .com.tr alan adı hediyesi sadece Büyüme ve Lider paketlerimizde mevcuttur.</p>
                <button className="bg-[#7c3aed] px-6 py-3 rounded-full font-bold">Paketimi Yükselt</button>
            </div>
        );
    }

    if (MOCK_MERCHANT.customDomain || successMessage) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-500">
                <span className="text-6xl mb-4">🎉</span>
                <h1 className="text-3xl font-bold mb-2 text-white">Alan Adınız Aktif!</h1>
                <p className="text-emerald-400 text-xl font-bold mb-6">{MOCK_MERCHANT.customDomain || successMessage}</p>
                <p className="text-slate-400 max-w-md mx-auto mb-8">
                    Siteniz artık global ağa bu adres üzerinden hizmet veriyor. DNS yayılımı (propagation) dünyanın bazı bölgelerinde 24 saati bulabilir ancak çoğunlukla dakikalar içinde açılır.
                </p>
                <button className="bg-white text-black px-6 py-3 rounded-full font-bold">Siteye Git ↗</button>
            </div>
        );
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!searchQuery || searchQuery.length < 3) return;

        setIsSearching(true);
        // Simulating API Search Delay
        setTimeout(() => {
            const cleanQuery = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
            setSearchResults([
                { name: `${cleanQuery}.com`, available: true },
                { name: `${cleanQuery}.com.tr`, available: true },
                { name: `${cleanQuery}.net`, available: false },
                { name: `${cleanQuery}istanbul.com`, available: true },
            ]);
            setIsSearching(false);
        }, 1500);
    };

    const handleRegister = async (domain: string) => {
        setIsRegistering(true);
        try {
            const res = await fetch('/api/domain/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain, merchantId: MOCK_MERCHANT.id })
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error);
            
            setSuccessMessage(domain);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-3 text-white flex items-center gap-3">
                    🌐 Ücretsiz Profesyonel Domain
                </h1>
                <p className="text-slate-400">
                    Büyüme paketi avantajınız! İşletmenize yakışır bir <strong className="text-white">.com</strong> veya <strong className="text-white">.com.tr</strong> alan adını aratın ve hemen sitemize bağlayalım. Tescil ve yenileme ücreti bizden.
                </p>
            </div>

            <form onSubmit={handleSearch} className="relative mb-12">
                <input 
                    type="text" 
                    placeholder="Örn: ahmetberber, elitklinik..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#11111a] border-2 border-white/10 rounded-2xl py-5 pl-6 pr-32 text-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-[#7c3aed] transition-colors"
                />
                <button 
                    type="submit"
                    disabled={isSearching || !searchQuery}
                    className="absolute right-3 top-3 bottom-3 bg-[#7c3aed] text-white px-8 rounded-xl font-bold hover:bg-[#6d28d9] transition-colors disabled:opacity-50"
                >
                    {isSearching ? <span className="animate-pulse">Sorgulanıyor...</span> : 'Sorgula'}
                </button>
            </form>

            {searchResults && (
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-300 mb-4 border-b border-white/10 pb-2">Sonuçlar</h3>
                    {searchResults.map((result, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between ${result.available ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20 grayscale opacity-60'}`}>
                            <div className="flex flex-col">
                                <span className={`text-xl font-bold ${result.available ? 'text-emerald-400' : 'text-red-400 line-through'}`}>
                                    {result.name}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {result.available ? 'Müsait! Hemen Sahiplenin.' : 'Maalesef başkası tarafından alınmış.'}
                                </span>
                            </div>
                            
                            {result.available ? (
                                <button 
                                    onClick={() => handleRegister(result.name)}
                                    disabled={isRegistering}
                                    className="bg-emerald-500 text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50"
                                >
                                    {isRegistering ? 'Kaydediliyor...' : 'Bunu Seç ve Bağla'}
                                </button>
                            ) : (
                                <span className="text-red-400 text-sm font-bold bg-red-400/10 px-4 py-2 rounded-lg">DOLU</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
