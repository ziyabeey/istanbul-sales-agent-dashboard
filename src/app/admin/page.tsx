"use client";

import React, { useState, useEffect } from "react";
import { Users, Activity, Briefcase, TrendingUp, AlertTriangle, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const mrrData = {
        total: "₺84,500",
        growth: "+14%",
        activeMerchants: 142
    };

    const churnAlerts = [
        { id: 1, merchant: "Ahmet Usta Tesisat", score: 85, reason: "14 gündür sisteme girmedi", status: "Kritik" },
        { id: 2, merchant: "Ayşe Kuaför", score: 62, reason: "Raporları açmıyor", status: "Orta" }
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    Operasyon Merkezi
                </h1>
                <p className="text-slate-400 mt-2">Tüm esnaf ekosisteminin finansal ve operasyonel canlı durumu.</p>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <h3 className="text-slate-400 font-medium">Aylık Tekrar Geliri (MRR)</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">{mrrData.total}</p>
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded mt-2 inline-block">{mrrData.growth} geçen aydan</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        <h3 className="text-slate-400 font-medium">Aktif Esnaf</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">{mrrData.activeMerchants}</p>
                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded mt-2 inline-block">3 Yeni Katılım</span>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-5 h-5 text-orange-500" />
                        <h3 className="text-slate-400 font-medium">Sistem Sağlığı</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">%99.9</p>
                    <span className="text-xs text-slate-500 mt-2 block">Tüm Ajanlar Operasyonel</span>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Churn Risk Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <h2 className="text-lg font-bold text-slate-200">Ajan 16 : Churn Alarmları</h2>
                        </div>
                    </div>
                    <div className="p-0 flex-1">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-950/50 text-slate-400">
                                <tr>
                                    <th className="p-4 font-medium">Esnaf</th>
                                    <th className="p-4 font-medium">Risk Skoru</th>
                                    <th className="p-4 font-medium">Neden</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {churnAlerts.map(alert => (
                                    <tr key={alert.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="p-4 text-slate-300">{alert.merchant}</td>
                                        <td className="p-4 flex items-center gap-2">
                                            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${alert.score > 75 ? 'bg-red-500' : 'bg-yellow-500'}`}
                                                    style={{ width: `${alert.score}%` }}
                                                />
                                            </div>
                                            <span className={alert.score > 75 ? 'text-red-400' : 'text-yellow-400'}>{alert.score}</span>
                                        </td>
                                        <td className="p-4 text-slate-500">{alert.reason}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-lg font-bold text-slate-200">Hızlı Aksiyonlar</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button className="flex items-center gap-3 p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition border border-slate-700 cursor-pointer text-left">
                            <Briefcase className="w-6 h-6 text-purple-400" />
                            <div>
                                <h4 className="font-medium text-slate-200">Ajan 17 İK Raporu</h4>
                                <p className="text-xs text-slate-500 mt-1">Ekip OKR'larını gör</p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 p-4 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition border border-orange-500/20 cursor-pointer text-left">
                            <MessageSquare className="w-6 h-6 text-orange-400" />
                            <div>
                                <h4 className="font-medium text-orange-200">Kitle Mesajı At</h4>
                                <p className="text-xs text-orange-500/70 mt-1">Tüm esnafa duyuru</p>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}
