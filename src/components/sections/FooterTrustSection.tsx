"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, Mail, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FooterTrustSection() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Lütfen geçerli bir e-posta adresi giriniz.");
            return;
        }
        setError("");
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setEmail("");
    };
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
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer text-sm font-bold">In</a>
                            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-800/50 flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer text-sm font-bold">Wa</a>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-4 pl-0 md:pl-8">
                        <h3 className="text-white font-bold mb-4 tracking-wide">İletişim & Bülten</h3>
                        <p className="text-sm text-blue-200 mb-4">Ayda bir kez dijital esnaflık hakkında ipuçları alın.</p>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <div className="flex group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                        placeholder="E-posta adresiniz"
                                        className="w-full px-4 py-2 rounded-l-lg bg-blue-900 border border-blue-800 text-white placeholder-blue-400 focus:outline-none focus:border-secondary-500"
                                    />
                                    <button type="submit" className="bg-secondary-500 hover:bg-secondary-600 px-4 py-2 rounded-r-lg text-white font-medium transition-colors">
                                        Katıl
                                    </button>
                                </div>
                                {error && <p className="text-red-400 text-xs">{error}</p>}
                            </form>
                        ) : (
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2.5 rounded-lg border border-green-400/20">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">Teşekkürler! Başarıyla kaydoldunuz.</p>
                            </div>
                        )}

                        <div className="mt-8">
                            <a href="mailto:kurumsal@xinxia.com.tr" className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-secondary-400 transition-colors">
                                <Mail className="w-4 h-4" />
                                Kurumsal Teklif Al
                                <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3 grid grid-cols-1 gap-8">
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
