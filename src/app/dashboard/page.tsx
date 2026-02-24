"use client";

import React, { useState } from "react";
import { Copy, Plus, Activity, Star, Zap, Package, Sun, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Hardcoded user data for useMockData=true flag
const mockDashboardData = {
    esnafIsmi: "Ahmet Usta",
    gununHedefi: "Bugün 3 yeni sipariş alalım!",
    metrikler: [
        { label: "Ziyaret", value: "124", icon: Activity, color: "text-blue-500", bg: "bg-blue-100" },
        { label: "Puan", value: "4.8", icon: Star, color: "text-amber-500", bg: "bg-amber-100" },
        { label: "Hız", value: "%92", icon: Zap, color: "text-orange-500", bg: "bg-orange-100" },
        { label: "Paket", value: "Aylık", icon: Package, color: "text-purple-500", bg: "bg-purple-100" },
    ],
    bugunIcerik: "Yeni mevsim ürünlerimiz tezgahta! Taptaze lezzetleri kaçırmayın. Bekliyoruz! 🍅🥬🥩"
};

export default function DashboardPage() {
    const data = mockDashboardData;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(data.bugunIcerik);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">

            {/* Header / Greeting */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Günaydın <span className="text-orange-500">{data.esnafIsmi}</span> 👋
                    </h1>
                    <p className="text-slate-500 mt-1 flex items-center">
                        <Sun className="w-4 h-4 mr-2 text-amber-500" />
                        {data.gununHedefi}
                    </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center border border-orange-200">
                    <span className="text-xl">☀️</span>
                </div>
            </div>

            {/* Metrics (4 grids) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.metrikler.map((m, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <div className={`w-10 h-10 ${m.bg} rounded-full flex items-center justify-center mb-3`}>
                            <m.icon className={`w-5 h-5 ${m.color}`} />
                        </div>
                        <span className="text-2xl font-bold text-slate-800">{m.value}</span>
                        <span className="text-xs font-medium text-slate-500 mt-1">{m.label}</span>
                    </div>
                ))}
            </div>

            {/* Content Suggestion Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 md:p-8 shadow-md text-white">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">Bugün Ne Paylaşalım?</h2>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                        Instagram
                    </span>
                </div>
                <p className="text-orange-50 text-base md:text-lg leading-relaxed mb-6 bg-orange-950/20 p-4 rounded-xl">
                    "{data.bugunIcerik}"
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={handleCopy}
                        variant="secondary"
                        size="lg"
                        className="flex-1 bg-white text-orange-600 hover:bg-orange-50 justify-center h-12"
                    >
                        {copied ? (
                            <><CheckCircle2 className="w-5 h-5 mr-2" /> Kopyalandı! ✓</>
                        ) : (
                            <><Copy className="w-5 h-5 mr-2" /> Metni Kopyala</>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 border-white/30 text-white hover:bg-white/10 hover:text-white justify-center h-12"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Başka Üret
                    </Button>
                </div>
            </div>

        </div>
    );
}
