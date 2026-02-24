"use client";

import React, { useState } from "react";
import { Instagram, Facebook, Video, Copy, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const platforms = [
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-500", bg: "bg-pink-100" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-500", bg: "bg-blue-100" },
    { id: "tiktok", name: "TikTok", icon: Video, color: "text-black", bg: "bg-slate-200" },
];

const mockContents = [
    { day: "Pazartesi", text: "Haftaya enerjik başlıyoruz! En taze ürünlerimiz tezgahta yerini aldı. 🍊🌿 Bekliyoruz!", type: "Post" },
    { day: "Salı", text: "Günün sürprizi! Saat 14:00'e kadar gelen herkese %10 indirim. 🎁", type: "Hikaye" },
    { day: "Çarşamba", text: "İşin sırrı kalitede gizli. Ustamızın ellerinden çıkan bu lezzeti denediniz mi? 👨‍🍳", type: "Reels" },
    { day: "Perşembe", text: "Müşteri memnuniyeti bizim için her şey! Bizi tercih ettiğiniz için teşekkürler. ❤️", type: "Post" },
    { day: "Cuma", text: "Hafta sonu hazırlıkları tam gaz devam ediyor. Özel siparişleriniz için DM'den yazabilirsiniz! 📦", type: "Hikaye" },
    { day: "Cumartesi", text: "Cumartesi demek keyif demek! En güzel anlarınıza eşlik etmeye hazırız. ☕️", type: "Post" },
    { day: "Pazar", text: "Mutlu pazarlar! Ailenizle birlikte güzel bir gün geçirmeniz dileğiyle. 🌻", type: "Post" }
];

export default function IcerikPage() {
    const [activeTab, setActiveTab] = useState(platforms[0].id);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">İçerik Stüdyosu</h1>
                <p className="text-sm text-slate-500 mt-1">Gelecek haftanın içerik planı hazır. Seç, kopyala ve paylaş!</p>
            </div>

            {/* Platform Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {platforms.map(p => (
                    <button
                        key={p.id}
                        onClick={() => setActiveTab(p.id)}
                        className={`flex items-center whitespace-nowrap px-4 py-3 rounded-xl font-medium transition-all min-h-[48px] ${activeTab === p.id
                                ? "bg-slate-800 text-white shadow-md"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        <p.icon className={`w-5 h-5 mr-2 ${activeTab === p.id ? "text-white" : p.color}`} />
                        {p.name}
                    </button>
                ))}
            </div>

            {/* 7 Day Content List */}
            <div className="space-y-4 pb-4">
                {mockContents.map((content, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-3 border-b border-slate-50 pb-3">
                            <div className="flex items-center text-orange-600 font-semibold text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {content.day}
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                                {content.type}
                            </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-4 text-sm md:text-base">
                            {content.text}
                        </p>
                        <Button
                            variant={copiedIndex === idx ? "primary" : "outline"}
                            size="sm"
                            className={`w-full justify-center h-12 transition-colors ${copiedIndex === idx ? "" : "hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"}`}
                            onClick={() => handleCopy(content.text, idx)}
                        >
                            {copiedIndex === idx ? (
                                <><CheckCircle2 className="w-4 h-4 mr-2" /> Kopyalandı ✓</>
                            ) : (
                                <><Copy className="w-4 h-4 mr-2" /> Metni Kopyala</>
                            )}
                        </Button>
                    </div>
                ))}
            </div>
            {/* Scroll bottom padding adjustment for mobile tab bar is handled in layout via pb-20 */}
        </div>
    );
}
