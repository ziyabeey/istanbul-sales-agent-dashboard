"use client";

import React, { useState } from "react";
import { CheckCircle2, Shield, CreditCard, BadgeCheck, ShieldCheck } from "lucide-react";
import { waLink, ILETISIM } from "@/data/iletisim";

const footerLinks = {
    urun: [
        { label: "Özellikler", href: "/ozellikler" },
        { label: "Fiyatlar", href: "/#pricing" },
        { label: "Tema Mağazası", href: "/temalar" },
        { label: "Entegrasyonlar", href: "/entegrasyonlar" },
        { label: "Tüm Sektörler", href: "/#sectors" },
        { label: "Demo İzle", href: "/#demo" },
    ],
    sirket: [
        { label: "Hakkımızda", href: "/hakkimizda" },
        { label: "İletişim", href: "/iletisim" },
        { label: "Kariyer", href: "/kariyer" },
    ],
    hukuki: [
        { label: "Gizlilik Politikası", href: "/gizlilik" },
        { label: "KVKK Aydınlatma", href: "/kvkk" },
        { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
        { label: "Satış Sözleşmesi", href: "/satis-sozlesmesi" },
        { label: "İade Koşulları", href: "/iade-kosullari" },
    ],
    destek: [
        { label: "Yardım Merkezi", href: "/yardim" },
        { label: "WhatsApp Destek", href: waLink() },
        { label: "Demo Al", href: "/onboarding" },
        { label: "E-posta", href: `mailto:${ILETISIM.emailKurumsal}` },
    ],
};

const trustBadges = [
    { icon: Shield, label: "256-bit SSL Şifreleme" },
    { icon: CreditCard, label: "iyzico Güvenli Ödeme" },
    { icon: BadgeCheck, label: "KVKK Uyumlu" },
    { icon: ShieldCheck, label: "30 Gün Para İade Garantisi" },
];

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
        <footer className="bg-gray-900 border-t border-gray-800 text-white">
            {/* Main grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">

                    {/* Brand + Newsletter */}
                    <div className="col-span-2 md:col-span-4">
                        <h2 className="font-syne text-2xl font-bold text-white mb-4 tracking-tight">
                            <span className="text-indigo-400 font-extrabold">KPNK</span>
                        </h2>
                        <p className="font-lora text-gray-300 text-base font-medium italic mb-4">
                            &ldquo;Biz varız. Yanındayız. Seninle büyüyeceğiz.&rdquo;
                        </p>
                        <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-6">
                            Türkiye&apos;nin 3.5 milyon esnafı için geliştirilen, 7/24 uyumayan dijital iş arkadaşı ekosistemi.
                        </p>

                        <p className="text-xs text-gray-400 mb-3">Aylık dijital esnaflık ipuçları:</p>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <div className="flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                        placeholder="E-posta adresiniz"
                                        className="w-full px-3 py-2.5 rounded-l-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/20 text-sm"
                                    />
                                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-500/90 px-5 py-2.5 rounded-r-xl text-white font-bold transition-colors text-sm whitespace-nowrap">
                                        Katıl
                                    </button>
                                </div>
                                {error && <p className="text-red-500 text-xs">{error}</p>}
                            </form>
                        ) : (
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-2 rounded-lg border border-green-400/20">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                <p className="text-xs font-medium">Teşekkürler! Başarıyla kaydoldunuz.</p>
                            </div>
                        )}

                        <div className="flex gap-3 mt-6">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white" aria-label="LinkedIn">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 transition-colors text-gray-400 hover:text-emerald-400" aria-label="WhatsApp">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            </a>
                        </div>
                    </div>

                    {/* Ürün */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-xs font-bold mb-5 tracking-widest uppercase">Ürün</h3>
                        <ul className="space-y-3">
                            {footerLinks.urun.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Şirket */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-xs font-bold mb-5 tracking-widest uppercase">Şirket</h3>
                        <ul className="space-y-3">
                            {footerLinks.sirket.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hukuki */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-xs font-bold mb-5 tracking-widest uppercase">Hukuki</h3>
                        <ul className="space-y-3">
                            {footerLinks.hukuki.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destek */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-xs font-bold mb-5 tracking-widest uppercase">Destek</h3>
                        <ul className="space-y-3">
                            {footerLinks.destek.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Trust badges */}
            <div className="border-t border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                        {trustBadges.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 text-gray-400 text-xs">
                                <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} KPNK — Bir yzt.digital Şahıs İşletmesidir. Tüm hakları saklıdır.</p>
                    <p>yzt.digital tarafından geliştirilmiştir</p>
                </div>
            </div>
        </footer>
    );
}
