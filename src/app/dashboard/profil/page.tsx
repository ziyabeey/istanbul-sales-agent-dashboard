"use client";

import React, { useState } from "react";
import { User, Store, Bell, LogOut, Package, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function ProfilPage() {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("kepenk_esnaf_id");
        router.push("/onboarding");
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <div className="text-center mb-8">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-lg">
                    <Store className="w-10 h-10 text-slate-400" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Ahmet Usta Lezzetleri</h1>
                <p className="text-slate-500 mt-1">Premium Üye</p>
            </div>

            <div className="space-y-4">
                {/* Upgrade Package Card */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 shadow-md text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-lg mb-1 flex items-center">
                            <Package className="w-5 h-5 mr-2" />
                            Planı Yükselt
                        </h3>
                        <p className="text-purple-100 text-sm">Daha fazla asistan gücü için Enterprise planına geçin.</p>
                    </div>
                    <Button variant="secondary" className="w-full md:w-auto bg-white text-purple-600 hover:bg-purple-50 shrink-0 h-12">
                        Seçenekleri Gör
                    </Button>
                </div>

                {/* Settings Items */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

                    <div className="flex items-center justify-between p-5 border-b border-slate-50">
                        <div className="flex items-center text-slate-700 font-medium">
                            <User className="w-5 h-5 mr-3 text-slate-400" />
                            İşletme Bilgileri
                        </div>
                        <Button variant="ghost" className="text-rust hover:text-rust-light hover:bg-rust/10">
                            Düzenle
                        </Button>
                    </div>

                    <div className="flex items-center justify-between p-5 border-b border-slate-50">
                        <div className="flex items-center text-slate-700 font-medium">
                            <CreditCard className="w-5 h-5 mr-3 text-slate-400" />
                            Ödeme Yöntemleri
                        </div>
                        <span className="text-slate-400 text-sm">•••• 4242</span>
                    </div>

                    <div className="flex items-center justify-between p-5">
                        <div className="flex items-center text-slate-700 font-medium">
                            <Bell className="w-5 h-5 mr-3 text-slate-400" />
                            Sabah Bildirimleri
                        </div>
                        <button
                            className={`w-12 h-6 rounded-full transition-colors relative ${notificationsEnabled ? "bg-rust" : "bg-slate-200"}`}
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${notificationsEnabled ? "translate-x-7" : "translate-x-1"}`} />
                        </button>
                    </div>

                </div>

                {/* Logout */}
                <Button
                    variant="outline"
                    className="w-full h-12 text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600 border-none bg-white rounded-2xl shadow-sm"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Çıkış Yap
                </Button>
            </div>
        </div>
    );
}
