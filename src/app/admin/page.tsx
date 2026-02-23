"use client";

import React, { useState, useEffect } from "react";
import { Users, Activity, Briefcase, TrendingUp, AlertTriangle, MessageSquare, Moon, Sun, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard");
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        const savedMode = localStorage.getItem("adminTheme");
        if (savedMode === "light") {
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("adminTheme", newMode ? "dark" : "light");
    };

    const handleIntervention = (merchantName: string) => {
        console.log(`[Admin Action] Agent 16 Intervention triggered for: ${merchantName}`);
        setToastMessage(`${merchantName} dükkanı için müdahale başlatıldı.`);
        setTimeout(() => setToastMessage(null), 3000);
    };

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
        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 ${isDarkMode ? 'text-slate-50' : 'bg-slate-50 text-slate-900 rounded-xl'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                        Operasyon Merkezi
                    </h1>
                    <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-2`}>Tüm esnaf ekosisteminin finansal ve operasyonel canlı durumu.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Tabs */}
                    <div className={`flex rounded-lg p-1 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'}`}>
                        {["dashboard", "crm", "settings"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveSection(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeSection === tab
                                        ? (isDarkMode ? 'bg-slate-800 text-white shadow' : 'bg-white text-slate-800 shadow')
                                        : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800')
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Dark/Light Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white text-slate-800 shadow-sm border border-slate-200'}`}
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeSection === "dashboard" && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {/* Top Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border rounded-xl p-6`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                    <h3 className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Aylık Tekrar Geliri (MRR)</h3>
                                </div>
                                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{mrrData.total}</p>
                                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded mt-2 inline-block">{mrrData.growth} geçen aydan</span>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border rounded-xl p-6`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <Users className="w-5 h-5 text-blue-500" />
                                    <h3 className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Aktif Esnaf</h3>
                                </div>
                                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{mrrData.activeMerchants}</p>
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded mt-2 inline-block">3 Yeni Katılım</span>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border rounded-xl p-6`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <Activity className="w-5 h-5 text-orange-500" />
                                    <h3 className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-medium`}>Sistem Sağlığı</h3>
                                </div>
                                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>%99.9</p>
                                <span className="text-xs text-slate-400 mt-2 block">Tüm Ajanlar Operasyonel</span>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Churn Risk Panel */}
                            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border rounded-xl overflow-hidden flex flex-col`}>
                                <div className={`p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'} flex justify-between items-center`}>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Ajan 16 : Churn Alarmları</h2>
                                    </div>
                                </div>
                                <div className="p-0 flex-1 overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className={`${isDarkMode ? 'bg-slate-950/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                                            <tr>
                                                <th className="p-4 font-medium">Esnaf</th>
                                                <th className="p-4 font-medium">Risk Skoru</th>
                                                <th className="p-4 font-medium">Neden</th>
                                                <th className="p-4 font-medium text-right">Aksiyon</th>
                                            </tr>
                                        </thead>
                                        <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/50' : 'divide-slate-100'}`}>
                                            {churnAlerts.map(alert => (
                                                <tr key={alert.id} className={`${isDarkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'} transition-colors`}>
                                                    <td className={`p-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{alert.merchant}</td>
                                                    <td className="p-4 flex items-center gap-2">
                                                        <div className={`w-16 h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                                                            <div
                                                                className={`h-full ${alert.score > 75 ? 'bg-red-500' : 'bg-yellow-500'}`}
                                                                style={{ width: `${alert.score}%` }}
                                                            />
                                                        </div>
                                                        <span className={alert.score > 75 ? (isDarkMode ? 'text-red-400' : 'text-red-600') : (isDarkMode ? 'text-yellow-400' : 'text-yellow-600')}>{alert.score}</span>
                                                    </td>
                                                    <td className={`p-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{alert.reason}</td>
                                                    <td className="p-4 text-right">
                                                        <button
                                                            onClick={() => handleIntervention(alert.merchant)}
                                                            className="px-3 py-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-md transition-colors text-xs font-semibold"
                                                        >
                                                            Müdahale Et
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Action Panel */}
                            <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} border rounded-xl overflow-hidden flex flex-col`}>
                                <div className={`p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                                    <h2 className={`text-lg font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Hızlı Aksiyonlar</h2>
                                </div>
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button className={`flex items-center gap-3 p-4 rounded-lg transition border cursor-pointer text-left ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-700' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'}`}>
                                        <Briefcase className="w-6 h-6 text-purple-500" />
                                        <div>
                                            <h4 className={`font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Ajan 17 İK Raporu</h4>
                                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>Ekip OKR'larını gör</p>
                                        </div>
                                    </button>
                                    <button className={`flex items-center gap-3 p-4 rounded-lg transition border cursor-pointer text-left ${isDarkMode ? 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/20' : 'bg-orange-50 hover:bg-orange-100 border-orange-200'}`}>
                                        <MessageSquare className="w-6 h-6 text-orange-500" />
                                        <div>
                                            <h4 className={`font-medium ${isDarkMode ? 'text-orange-200' : 'text-orange-700'}`}>Kitle Mesajı At</h4>
                                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-orange-500/70' : 'text-orange-500'}`}>Tüm esnafa duyuru</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeSection !== "dashboard" && (
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-12 text-center rounded-xl border border-dashed ${isDarkMode ? 'border-slate-700 text-slate-500' : 'border-slate-300 text-slate-500'}`}
                    >
                        <p className="text-xl capitalize">{activeSection} Paneli</p>
                        <p className="text-sm mt-2">Bu modül yapım aşamasındadır.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toast Notification for Churn Intervention */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3"
                    >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="font-medium text-sm">{toastMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
