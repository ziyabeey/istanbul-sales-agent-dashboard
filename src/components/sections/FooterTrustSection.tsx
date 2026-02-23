"use client";

import React from "react";
import { ShieldCheck, Lock } from "lucide-react";

export default function FooterTrustSection() {
    return (
        <footer className="bg-primary-900 border-t border-blue-800 text-blue-100 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    <div className="col-span-1 md:col-span-5">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            XINXIA <span className="text-secondary-500 text-sm align-top">v5.0</span>
                        </h2>
                        <p className="text-blue-200 text-lg font-medium italic mb-6">
                            "Biz varız. Yanındayız. Seninle büyüyeceğiz."
                        </p>
                        <p className="text-sm text-blue-300 max-w-sm leading-relaxed mb-6">
                            Türkiye'nin 3.5 milyon esnafı için geliştirilen, 7/24 uyumayan, yorulmayan dijital iş arkadaşı ekosistemi.
                        </p>
                        <div className="flex gap-4">
                            <span className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer text-sm font-bold">In</span>
                            <span className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer text-sm font-bold">Wa</span>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Trust Policies */}
                        <div>
                            <h3 className="text-white font-bold mb-6 tracking-wide flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-green-400" />
                                Güvenlik ve İptal Politikası
                            </h3>
                            <ul className="space-y-4 text-sm text-blue-200">
                                <li className="flex gap-3">
                                    <span className="text-secondary-500 font-bold mb-0.5">•</span>
                                    <span><strong>Şeffaf Ayrılık:</strong> Sistemden ayrılırsanız, dijital asistanınız ve siteniz de kapanır. Verileriniz KVKK kapsamında <span className="text-white bg-blue-800/50 px-1 rounded">44. günde güvenle imha edilir.</span></span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-secondary-500 font-bold mb-0.5">•</span>
                                    <span>Aylık abonelikte taahhüt zorunluluğu yoktur. Dilediğiniz zaman iptal edebilirsiniz.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-white font-bold mb-6 tracking-wide flex items-center gap-2">
                                <Lock className="w-5 h-5 text-blue-400" />
                                Yasal Uyum ve Bildirimler
                            </h3>
                            <ul className="space-y-4 text-sm text-blue-200">
                                <li className="flex gap-3">
                                    <span className="text-blue-400 font-bold mb-0.5">•</span>
                                    <span>KVKK Aydınlatma Metni standarttır. Müşteri verileriniz 256-bit şifreleme ile barındırılır.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-400 font-bold mb-0.5">•</span>
                                    <span>B2B iletişim (Whatsapp Bot) İYS ETK (Esnaf Muafiyeti) kurallarına uygundur.</span>
                                </li>
                                <li className="flex gap-3 mt-6">
                                    <a href="#" className="underline hover:text-white transition-colors">Gizlilik Sözleşmesi</a>
                                </li>
                                <li className="flex gap-3">
                                    <a href="#" className="underline hover:text-white transition-colors">Mesafeli Satış Sözleşmesi</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="border-t border-blue-800/50 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-blue-400">
                    <p>© {new Date().getFullYear()} XINXIA Teknoloji A.Ş. Tüm hakları saklıdır.</p>
                    <p className="mt-2 md:mt-0 opacity-50">Tasarım & Mimari: Google Antigravity</p>
                </div>
            </div>
        </footer>
    );
}
