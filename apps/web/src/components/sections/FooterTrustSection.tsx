"use client";

import React, { useState } from "react";
import { CheckCircle2, Shield, CreditCard, BadgeCheck, ShieldCheck } from "lucide-react";

const footerLinks = {
    urun: [
        { label: "Özellikler", href: "/ozellikler" },
        { label: "Fiyatlar", href: "/#pricing" },
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
        { label: "WhatsApp Destek", href: "https://wa.me/908500000000" },
        { label: "Demo Al", href: "/onboarding" },
        { label: "E-posta", href: "mailto:kurumsal@kepenk.ai" },
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
        <footer className="bg-background border-t border-border/20 text-foreground">
            {/* Main grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">

                    {/* Brand + Newsletter */}
                    <div className="col-span-2 md:col-span-4">
                        <h2 className="font-syne text-2xl font-bold text-foreground mb-4 tracking-tight">
                            <span className="text-rust">K</span>EPENK <span className="text-rust text-sm align-top">.ai</span>
                        </h2>
                        <p className="font-lora text-muted-foreground-light text-base font-medium italic mb-4">
                            &ldquo;Biz varız. Yanındayız. Seninle büyüyeceğiz.&rdquo;
                        </p>
                        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
                            Türkiye&apos;nin 3.5 milyon esnafı için geliştirilen, 7/24 uyumayan dijital iş arkadaşı ekosistemi.
                        </p>

                        <p className="text-xs text-muted-foreground-light mb-3">Aylık dijital esnaflık ipuçları:</p>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubscribe} className="space-y-2">
                                <div className="flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                        placeholder="E-posta adresiniz"
                                        className="w-full px-3 py-2 rounded-l-lg bg-steel/50 border border-steel text-foreground placeholder-stone-light focus:outline-none focus:border-rust text-sm"
                                    />
                                    <button type="submit" className="bg-rust hover:bg-rust-light px-4 py-2 rounded-r-lg text-foreground font-medium transition-colors text-sm">
                                        Katıl
                                    </button>
                                </div>
                                {error && <p className="text-red-400 text-xs">{error}</p>}
                            </form>
                        ) : (
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-2 rounded-lg border border-green-400/20">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                <p className="text-xs font-medium">Teşekkürler! Başarıyla kaydoldunuz.</p>
                            </div>
                        )}

                        <div className="flex gap-3 mt-6">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-steel flex items-center justify-center hover:bg-steel/80 transition-colors text-xs font-bold">In</a>
                            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-steel flex items-center justify-center hover:bg-steel/80 transition-colors text-xs font-bold">Wa</a>
                        </div>
                    </div>

                    {/* Ürün */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-foreground text-xs font-bold mb-5 tracking-widest uppercase">Ürün</h3>
                        <ul className="space-y-3">
                            {footerLinks.urun.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-muted-foreground-light text-sm hover:text-foreground transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Şirket */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-foreground text-xs font-bold mb-5 tracking-widest uppercase">Şirket</h3>
                        <ul className="space-y-3">
                            {footerLinks.sirket.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-muted-foreground-light text-sm hover:text-foreground transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hukuki */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-foreground text-xs font-bold mb-5 tracking-widest uppercase">Hukuki</h3>
                        <ul className="space-y-3">
                            {footerLinks.hukuki.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-muted-foreground-light text-sm hover:text-foreground transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destek */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-foreground text-xs font-bold mb-5 tracking-widest uppercase">Destek</h3>
                        <ul className="space-y-3">
                            {footerLinks.destek.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-muted-foreground-light text-sm hover:text-foreground transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Trust badges */}
            <div className="border-t border-border/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                        {trustBadges.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-2 text-muted-foreground-light text-xs">
                                <Icon className="w-4 h-4 text-rust flex-shrink-0" />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-border/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/50">
                    <p>© {new Date().getFullYear()} kepenk.ai — Bir yzt.digital Şahıs İşletmesidir. Tüm hakları saklıdır.</p>
                    <p>yzt.digital tarafından geliştirilmiştir</p>
                </div>
            </div>
        </footer>
    );
}
