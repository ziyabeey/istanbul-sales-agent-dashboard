"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";
import { Button } from "@/components/ui/Button";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { waLink, ILETISIM } from "@/data/iletisim";

export default function IletisimPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [form, setForm] = useState({
        adSoyad: "",
        isletme: "",
        email: "",
        mesaj: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/iletisim", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                throw new Error("İletişim formu gönderilemedi");
            }
            setStatus("success");
            setForm({ adSoyad: "", isletme: "", email: "", mesaj: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 font-syne">
                        Bize <span className="text-primary">Ulaşın</span>
                    </h1>
                    <p className="font-lora italic text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Soru, öneri ve işbirlikleri için buradayız. Yapay zeka dönüşümünde yanınızdayız.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <h3 className="text-2xl font-bold font-syne text-foreground mb-6">İletişim Kanalları</h3>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                KPNK ekibi size destek olmak için 7/24 çalışır. Hızlı dönüşler için öncelikli olarak WhatsApp destek hattımızı tercih edebilirsiniz.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <a href={waLink()} target="_blank" rel="noopener noreferrer"
                                className="flex items-start gap-4 p-6 bg-warm/30 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-bold font-syne text-lg">WhatsApp Destek Hattı</h4>
                                    <p className="text-muted-foreground mt-1">Anında yanıt alın: {ILETISIM.whatsappGosterim}</p>
                                </div>
                            </a>

                            <a href="mailto:destek@kepenk.ai"
                                className="flex items-start gap-4 p-6 bg-warm/30 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-bold font-syne text-lg">E-Posta</h4>
                                    <p className="text-muted-foreground mt-1">Kurumsal iletişim: destek@kepenk.ai</p>
                                </div>
                            </a>

                            <div className="flex items-start gap-4 p-6 bg-warm/30 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                                <div className="w-12 h-12 bg-steel/10 text-steel rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-bold font-syne text-lg">Merkez Ofis</h4>
                                    <p className="text-muted-foreground mt-1">Teknopark İstanbul Kuluçka Merkezi,<br /> Pendik / İstanbul</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-background rounded-3xl p-8 border border-border shadow-xl relative mt-8 lg:mt-0">
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                        <h3 className="text-2xl font-bold font-syne text-foreground mb-6 relative z-10">Bize Mesaj Bırakın</h3>

                        {status === "success" ? (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center relative z-10">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h4 className="text-green-800 font-bold text-xl mb-2">Mesajınız Alındı</h4>
                                <p className="text-green-700">En kısa sürede e-posta üzerinden dönüş yapacağız. İlginize teşekkür ederiz.</p>
                                <Button className="mt-6" variant="secondary" onClick={() => setStatus("idle")}>Yeni Mesaj Gönder</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground">Adınız Soyadınız *</label>
                                        <input required type="text" value={form.adSoyad} onChange={(e) => setForm((f) => ({ ...f, adSoyad: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-white border border-border-light/30 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Ahmet Yılmaz" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground">İşletme Adı</label>
                                        <input type="text" value={form.isletme} onChange={(e) => setForm((f) => ({ ...f, isletme: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-white border border-border-light/30 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Ahmet Kuaför" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">E-Posta Adresiniz *</label>
                                    <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-white border border-border-light/30 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="ornek@mail.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground">Mesajınız *</label>
                                    <textarea required rows={4} value={form.mesaj} onChange={(e) => setForm((f) => ({ ...f, mesaj: e.target.value }))} className="w-full px-4 py-3 rounded-xl bg-white border border-border-light/30 text-foreground focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Hangi konuda yardımcı olabiliriz?" />
                                </div>

                                <Button disabled={status === "loading"} type="submit" className="w-full py-4 bg-primary hover:bg-primary/90 text-foreground font-bold text-lg rounded-xl flex justify-center items-center gap-2 transition-all">
                                    <Send className="w-5 h-5" />
                                    {status === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
                                </Button>
                                <p className="text-xs text-muted-foreground text-center mt-4">Kişisel verileriniz KVKK kapsamında işlenmektedir.</p>
                                {status === "error" ? <p className="text-xs text-center text-red-500">Mesaj gönderilemedi. Lütfen tekrar deneyin.</p> : null}
                            </form>
                        )}
                    </div>

                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
