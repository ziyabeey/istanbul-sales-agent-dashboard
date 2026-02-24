"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
    { name: 'Pzt', ziyaret: 120 },
    { name: 'Sal', ziyaret: 132 },
    { name: 'Çar', ziyaret: 101 },
    { name: 'Per', ziyaret: 142 },
    { name: 'Cum', ziyaret: 190 },
    { name: 'Cts', ziyaret: 230 },
    { name: 'Paz', ziyaret: 250 },
];

export default function RaporlarPage() {
    const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">İşletme Raporları</h1>
                <p className="text-sm text-slate-500 mt-1">Ziyaretçi trafiğinizi ve genel performansınızı görün.</p>
            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold flex items-center text-slate-700">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                        Haftalık Profil Ziyareti
                    </h2>
                    <span className="text-2xl font-black text-slate-800">1,165</span>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                            />
                            <Line type="monotone" dataKey="ziyaret" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Weekly Revenue Feedback */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-md text-white mt-8">
                <h2 className="text-xl font-bold mb-2 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2 text-green-400" />
                    Bu hafta işler nasıldı?
                </h2>
                <p className="text-slate-300 text-sm mb-6">
                    Sistemimizin doğru çalışabilmesi için bize ciroları sormadan sadece gidişatı bildir.
                </p>

                <div className="grid grid-cols-5 gap-2 md:gap-4">
                    {[
                        { emoji: "😭", label: "Çok Kötü" },
                        { emoji: "🙁", label: "Kötü" },
                        { emoji: "😐", label: "Normal" },
                        { emoji: "🙂", label: "İyi" },
                        { emoji: "🤩", label: "Çok İyi" }
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedFeedback(idx)}
                            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all min-h-[48px] ${selectedFeedback === idx
                                    ? "bg-white text-slate-900 scale-105 shadow-lg"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            <span className="text-2xl md:text-3xl mb-1">{item.emoji}</span>
                            <span className="text-[10px] md:text-xs font-medium hidden md:block">{item.label}</span>
                        </button>
                    ))}
                </div>

                {selectedFeedback !== null && (
                    <div className="mt-6 flex justify-end animate-in fade-in slide-in-from-bottom-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white border-none h-12 px-6 rounded-xl">
                            Geri Bildirimi Gönder
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
