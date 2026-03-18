import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import FooterTrustSection from '@/components/sections/FooterTrustSection';
import { Button } from '@/components/ui/Button';
import { SEKTORLER } from '@/data/sektorler';
import { PAKETLER } from '@/data/paketler';
import { MODULLER } from '@/data/moduller';
import { CheckCircle, ArrowRight, Zap, Star, MessageSquare, TrendingUp, Package, Brain, Truck } from 'lucide-react';

export async function generateStaticParams() {
    return SEKTORLER.map(s => ({ sektor: s.id }));
}

type Props = { params: Promise<{ sektor: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { sektor: sektorId } = await params;
    const sektor = SEKTORLER.find(s => s.id === sektorId.toLowerCase());
    if (!sektor) return { title: 'Sektör Bulunamadı | kepenk.ai' };

    const baslik = sektor.heroBaslik || `${sektor.ad}lar İçin Yapay Zeka Asistanı`;
    const aciklama = sektor.altBaslik || `${sektor.ad} işletmeniz için 7/24 AI asistan. kepenk.ai ile dijital dönüşümünüzü başlatın.`;

    return {
        title: `${sektor.ad} İçin Dijital Asistan | kepenk.ai`,
        description: aciklama,
        alternates: { canonical: `https://kepenk.ai/${sektorId}` },
        openGraph: {
            title: `${sektor.emoji} ${baslik} | kepenk.ai`,
            description: aciklama,
            url: `https://kepenk.ai/${sektorId}`,
        }
    };
}

// Tedarikçi banner gösterilecek sektörler
const TEDARIK_SEKTORLER = ['elektrikci', 'tesisatci', 'boyaci', 'camci', 'mobilyaci', 'temizlikci', 'oto-servis', 'fitness-spor', 'restoran', 'kafe'];

const PAKET_RENK: Record<string, string> = {
    TEMEL: '#6b7280',
    STANDART: '#3b82f6',
    BUYUME: '#8b5cf6',
    PREMIUM: '#c04b1e',
    PREMIUMPLUS: '#d4a843',
};

const PAKET_ETIKET: Record<string, string> = {
    TEMEL: 'Başlangıç',
    STANDART: 'Popüler',
    BUYUME: 'En Çok Satan',
    PREMIUM: 'Tam Donanım',
    PREMIUMPLUS: 'Kurumsal',
};

export default async function SektorPage({ params }: Props) {
    const { sektor: sektorId } = await params;
    const sektor = SEKTORLER.find(s => s.id === sektorId.toLowerCase());
    if (!sektor) notFound();

    const heroBaslik = sektor.heroBaslik || `${sektor.ad}lar İçin Yapay Zeka Asistanı`;
    const altBaslik = sektor.altBaslik || `${sektor.ad} sektörünün dijital dönüşümü için 7/24 AI asistan.`;
    const diyalog = sektor.mockDiyalog?.[0] ?? {
        musteri: `Merhaba, ${sektor.cta.toLowerCase()} için bilgi alabilir miyim?`,
        ai: `Merhaba! ${sektor.ad} asistanınız olarak size yardımcı olabilirim. Hizmetlerimiz hakkında bilgi paylaşayım.`,
    };

    // Önerilen paket
    const paketId = sektor.onerilenPaket ?? 'BUYUME';
    const paket = PAKETLER.find(p => p.id === paketId) ?? PAKETLER[2];

    // Sektöre özel modüller (max 6)
    const sektorModulleri = sektor.moduller
        .map(id => MODULLER.find(m => m.id === id))
        .filter(Boolean)
        .slice(0, 6) as typeof MODULLER;

    const showTedarik = TEDARIK_SEKTORLER.includes(sektor.id);

    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rust/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-steel/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Sol: Metin */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-rust/15 text-rust border border-rust/20 mb-6">
                                <span className="text-lg">{sektor.emoji}</span>
                                {sektor.kategori} · Özel Çözüm
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-5 font-syne">
                                {heroBaslik}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                                {altBaslik}
                            </p>

                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm">
                                {[
                                    { v: '1.200+', l: 'Aktif Esnaf' },
                                    { v: '4.9★', l: 'Müşteri Puanı', accent: true },
                                    { v: '7/24', l: 'Kesintisiz' },
                                ].map(({ v, l, accent }) => (
                                    <div key={l}>
                                        <div className={`text-2xl font-bold font-syne ${accent ? 'text-rust' : 'text-foreground'}`}>{v}</div>
                                        <div className="text-xs text-muted-foreground">{l}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <Link href={`/onboarding?sektor=${sektor.id}&paket=${paketId}`}>
                                    <Button size="lg" variant="primary" className="w-full sm:w-auto px-8">
                                        {sektor.cta} — Ücretsiz Dene →
                                    </Button>
                                </Link>
                                <Link href="/#pricing">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-foreground/20 text-foreground hover:bg-foreground/10 hover:text-foreground">
                                        Fiyatları Gör
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                {['Anında Kurulum', '30 Gün İade Garantisi', 'Sözleşme Yok'].map(item => (
                                    <span key={item} className="flex items-center gap-1.5">
                                        <CheckCircle className="w-3.5 h-3.5 text-rust flex-shrink-0" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Sağ: WhatsApp Mockup */}
                        <div className="relative">
                            <div className="absolute -top-4 -right-2 sm:-right-6 bg-rust text-white rounded-2xl px-4 py-2.5 shadow-xl z-20 flex items-center gap-2">
                                <span className="text-lg">🔔</span>
                                <div>
                                    <div className="text-xs font-bold">Yeni Müşteri Mesajı!</div>
                                    <div className="text-xs opacity-80">Az önce geldi</div>
                                </div>
                            </div>

                            <div className="bg-white border border-foreground/10 shadow-sm rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
                                <div className="flex items-center gap-3 pb-4 border-b border-foreground/10 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-rust/20 border border-rust/30 flex items-center justify-center text-xl">
                                        {sektor.emoji}
                                    </div>
                                    <div>
                                        <div className="text-foreground font-semibold text-sm">kepenk.ai {sektor.ad} Asistanı</div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-muted-foreground text-xs">Çevrimiçi · 7/24 aktif</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-start">
                                        <div className="bg-foreground/10 text-foreground/90 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[82%] text-sm leading-relaxed">
                                            {diyalog.musteri}
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-rust text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] text-sm leading-relaxed">
                                            {diyalog.ai}
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-foreground/10 text-foreground/90 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm">
                                            Teşekkürler, harika! 🙏
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-foreground/10 text-center">
                                    <span className="text-muted-foreground text-xs">✨ AI asistanınız 7/24 yanıt veriyor</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ÖNERİLEN PAKET ──────────────────────────────────────── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div
                        className="rounded-3xl p-8 md:p-10 border"
                        style={{ borderColor: `${PAKET_RENK[paketId]}40`, background: `${PAKET_RENK[paketId]}08` }}
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-8">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <span
                                        className="text-xs font-bold px-3 py-1 rounded-full text-foreground"
                                        style={{ backgroundColor: PAKET_RENK[paketId] }}
                                    >
                                        {PAKET_ETIKET[paketId]}
                                    </span>
                                    <span className="text-muted-foreground text-sm">{sektor.ad} işletmeleri için en çok tercih edilen</span>
                                </div>

                                <h2 className="text-foreground font-syne font-extrabold text-2xl md:text-3xl mb-2">
                                    {paket.name} Paketi
                                    <span className="text-rust ml-2">₺{paket.aylikFiyat.toLocaleString('tr-TR')}/ay</span>
                                </h2>
                                <p className="text-muted-foreground text-sm mb-6">{paket.teknoloji}</p>

                                <ul className="space-y-2.5 mb-6">
                                    {paket.ozellikler.slice(0,3).map((f: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="w-4 h-4 text-rust shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link href={`/onboarding?sektor=${sektor.id}&paket=${paketId}`}>
                                        <Button variant="primary" className="w-full sm:w-auto">
                                            Bu Paketle Başla →
                                        </Button>
                                    </Link>
                                    <Link href="/#pricing">
                                        <Button variant="ghost" className="w-full sm:w-auto text-muted-foreground hover:text-foreground text-sm">
                                            Diğer paketleri karşılaştır
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="md:w-56 bg-white border border-foreground/10 shadow-sm rounded-2xl p-5 flex-shrink-0">
                                <p className="text-foreground font-bold text-sm mb-3">Yıllık alırsan</p>
                                <div className="text-3xl font-extrabold font-syne" style={{ color: PAKET_RENK[paketId] }}>
                                    ₺{paket.yillikFiyatAylik.toLocaleString('tr-TR')}
                                    <span className="text-sm font-normal text-muted-foreground">/ay</span>
                                </div>
                                <p className="text-muted-foreground text-xs mt-1">%15 tasarruf · ₺{paket.fiyatYillik?.toLocaleString('tr-TR')}/yıl</p>
                                <div className="mt-4 pt-4 border-t border-foreground/10">
                                    <p className="text-xs text-muted-foreground">🛡️ 30 Gün Para İade Garantisi</p>
                                    <p className="text-xs text-muted-foreground mt-1">❌ Kredi kartı gerekmez</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SEKTÖRE ÖZEL MODÜLLER ───────────────────────────────── */}
            {sektorModulleri.length > 0 && (
                <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-10">
                            <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Hazır Modüller</p>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne">
                                {sektor.ad} İşletmenize Özel Araçlar
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sektorModulleri.map(modul => {
                                const paketRengi = PAKET_RENK[modul.minPaket] ?? '#6b7280';
                                return (
                                    <div
                                        key={modul.id}
                                        className="bg-white border border-foreground/10 shadow-sm rounded-2xl p-5 hover:border-rust/30 transition-colors group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-foreground font-bold text-sm group-hover:text-rust transition-colors">{modul.ad}</h3>
                                            <span
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-full text-foreground shrink-0 ml-2"
                                                style={{ backgroundColor: `${paketRengi}80` }}
                                            >
                                                {modul.minPaket}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-xs leading-relaxed">{modul.aciklama}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/#pricing" className="text-rust text-sm font-semibold hover:underline inline-flex items-center gap-1">
                                Tüm modülleri ve paket karşılaştırmasını gör <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── AI SEKTÖR ZEKASı ──────────────────────────────────── */}
            {sektor.knowHow && (
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Sektör Zekası</p>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne mb-4">
                                    AI Asistanınız {sektor.ad} Dilini Konuşur
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {sektor.knowHow}
                                </p>
                                {sektor.aiDavranisi && (
                                    <div className="bg-rust/10 border border-rust/20 rounded-2xl p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Brain className="w-4 h-4 text-rust" />
                                            <span className="text-foreground font-bold text-sm">AI Davranış Biçimi</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{sektor.aiDavranisi}</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: MessageSquare, title: '7/24 WhatsApp Yanıtı', desc: 'Müşterileriniz gece yarısı mesaj atsa bile AI asistanınız anında cevap verir.' },
                                    { icon: Star, title: 'Google Yorumları', desc: 'Olumsuz yorumlara otomatik profesyonel cevaplar. Puanınız artmaya başlar.' },
                                    { icon: TrendingUp, title: 'Otomatik İçerik', desc: 'Her hafta Instagram ve Google için hazır içerik. Siz sadece onaylarsınız.' },
                                    { icon: Zap, title: 'Anında Kurulum', desc: '10 dakikada hazır. Teknik bilgi gerekmez, sözleşme yok.' },
                                ].map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="bg-white border border-foreground/10 shadow-sm rounded-2xl p-5 hover:border-rust/30 transition-colors">
                                        <div className="w-9 h-9 rounded-xl bg-rust/15 flex items-center justify-center mb-3">
                                            <Icon className="w-4 h-4 text-rust" />
                                        </div>
                                        <h3 className="text-foreground font-bold text-sm mb-1.5">{title}</h3>
                                        <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── HİZMETLER ─────────────────────────────────────────── */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl font-bold text-foreground text-center mb-6 font-syne">
                        {sektor.ad} Hizmetlerinizi Dijitalleştirin
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {sektor.hizmetler.map((hizmet, i) => (
                            <div key={i} className="bg-white border border-foreground/10 shadow-sm rounded-full px-4 py-2 hover:border-rust/30 transition-colors">
                                <span className="text-foreground/80 text-sm font-medium">{hizmet}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEDARİKÇİ BANNER (koşullu) ───────────────────────── */}
            {showTedarik && (
                <section className="py-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto bg-gold/10 border border-gold/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                                <Truck className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                                <h3 className="text-foreground font-bold text-base">kepenk Tedarik Ağı</h3>
                                <p className="text-muted-foreground text-sm">
                                    {sektor.ad} için malzemeleri doğrulanmış tedarikçilerden %20-35 indirimli alın.
                                    kepenk güvencesiyle sipariş verin.
                                </p>
                            </div>
                        </div>
                        <Link href="/tedarik" className="flex-shrink-0">
                            <Button variant="outline" className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold whitespace-nowrap">
                                <Package className="w-4 h-4 mr-2" />
                                Tedarikçileri İncele
                            </Button>
                        </Link>
                    </div>
                </section>
            )}

            {/* ── CTA ───────────────────────────────────────────────── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center bg-rust/10 border border-rust/20 rounded-3xl p-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground font-syne mb-4">
                        {sektor.ad} İşletmenizi Büyütmeye Hazır Mısınız?
                    </h2>
                    <p className="text-muted-foreground text-lg mb-2">
                        10 dakikada kurulumu tamamlayın. İlk 30 gün para iade garantisi.
                    </p>
                    <p className="text-muted-foreground text-sm mb-8">
                        {paket.name} paketi önerilir — ₺{paket.aylikFiyat.toLocaleString('tr-TR')}/ay
                    </p>
                    <Link href={`/onboarding?sektor=${sektor.id}&paket=${paketId}`}>
                        <Button size="lg" variant="primary" className="px-12 text-base">
                            Ücretsiz Başla →
                        </Button>
                    </Link>
                    <p className="text-muted-foreground text-sm mt-4">Kredi kartı gerekmez · İstediğiniz zaman iptal · Anında kurulum</p>
                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
