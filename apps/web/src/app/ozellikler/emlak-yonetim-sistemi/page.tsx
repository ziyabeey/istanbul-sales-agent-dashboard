import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Emlak Yönetim Sistemi | kepenk.ai — Portföy → İlan → CRM → Değerleme → Komisyon',
    description: 'Sahibinden, Hepsiemlak, Emlakjet\'e tek tıkla ilan yayınlayın. AI müşteri eşleştirme, karşılaştırmalı değerleme motoru ve danışman performans radarı ile emlak ofisinizi geleceğe taşıyın.',
}

/* ─── Öne Çıkan Modüller ─── */

const MODULLER = [
    {
        baslik: '📡 Çoklu Platform İlan Sendikasyonu',
        aciklama: 'Tek portföy merkezinden Sahibinden, Hepsiemlak ve Emlakjet\'e eş zamanlı ilan yayınlayın. Fiyat, durum ve fotoğraflar otomatik senkronize edilir.',
        renkClass: 'from-blue-600 to-cyan-500',
        ozellikler: ['3 platformda paralel yayın', 'Platform-spesifik kategori mapping', 'Otomatik sync durumu izleme', 'Tek tıkla güncelle/kaldır'],
    },
    {
        baslik: '🤖 AI Müşteri-Mülk Eşleştirme',
        aciklama: '4 kriter üzerinden (konum, fiyat, fiziksel, opsiyonel) 0-100 puan ile müşteri-mülk eşleştirmesi. Yeni ilan girişinde otomatik ters matching ile uygun müşteriler bulunur.',
        renkClass: 'from-emerald-600 to-green-500',
        ozellikler: ['Konum bazlı eşleştirme (30p)', 'Fiyat toleransı ±%10 (25p)', 'Oda/m² fiziksel analiz (25p)', 'Asansör/otopark/eşyalı bonus (20p)'],
    },
    {
        baslik: '📊 Karşılaştırmalı Değerleme Motoru',
        aciklama: 'Bölgedeki benzer mülklerin m²/TL ortalamasını hesaplar, 6 düzeltme faktörü (kat, yaş, cephe, site, asansör, otopark) uygulayarak Min/Önerilen/Max fiyat aralığı sunar.',
        renkClass: 'from-amber-600 to-yellow-500',
        ozellikler: ['Bölgesel m² fiyat analizi', '6 faktörlü düzeltme algoritması', 'Min / Önerilen / Max aralık', 'Firestore değerleme raporu'],
    },
    {
        baslik: '📋 8 Aşamalı Mülk Yaşam Döngüsü',
        aciklama: 'Taslak → İlan Aktif → Gösterimde → Teklif Alındı → Pazarlıkta → Sözleşme → Satıldı/Kiralandı → Arşiv. Her geçiş Zod ile doğrulanır.',
        renkClass: 'from-purple-600 to-violet-500',
        ozellikler: ['Zod strict type doğrulama', 'Geçiş kuralı kontrolü', 'Komisyon otomatik hesaplama', 'Durum bazlı renk kodlaması'],
    },
    {
        baslik: '👥 CRM & Lead Yönetimi',
        aciklama: 'Müşteri talepleri (satılık/kiralık, bölge, bütçe, oda) tek merkezde toplanır. Yeni ilan eklendiğinde eşleşen müşterilere otomatik bildirim gönderilir.',
        renkClass: 'from-rose-600 to-pink-500',
        ozellikler: ['Lead-to-sale izleme', 'Otomatik bildirim (ters matching)', 'Gösterim ve teklif takibi', 'Müşteri portföy geçmişi'],
    },
    {
        baslik: '🏆 Danışman Performans Radarı',
        aciklama: 'Aylık satış, kiralama, gösterim, teklif ve komisyon verileriyle danışmanları sıralayın. Leaderboard ve funnel analizi ile ekibinizi motive edin.',
        renkClass: 'from-indigo-600 to-blue-500',
        ozellikler: ['Aylık komisyon sıralaması', 'Satış hunisi görselleştirme', 'Portföy değeri takibi', 'Aktif ilan / kapanan anlaşma oranı'],
    },
]

/* ─── Mülk Yaşam Döngüsü Adımları ─── */

const YASAM_DONGUSU = [
    { no: '1', baslik: 'Taslak Oluştur', ikon: '📝', aciklama: 'Mülk bilgilerini gir: konum, oda, m², fiyat, özellikler, fotoğraflar.', renk: 'bg-neutral-500' },
    { no: '2', baslik: '3 Platforma Yayınla', ikon: '📡', aciklama: 'Tek tıkla Sahibinden + Hepsiemlak + Emlakjet\'e paralel ilan yayınla.', renk: 'bg-blue-500' },
    { no: '3', baslik: 'AI Müşteri Eşleştir', ikon: '🤖', aciklama: 'CRM\'deki taleplere göre uygun müşteriler otomatik bulunur.', renk: 'bg-emerald-500' },
    { no: '4', baslik: 'Gösterim Planla', ikon: '🏠', aciklama: 'Müşteriye gösterim randevusu oluştur, danışman ata.', renk: 'bg-purple-500' },
    { no: '5', baslik: 'Teklif ve Pazarlık', ikon: '💰', aciklama: 'Gelen teklifleri karşılaştır, pazarlık sürecini yönet.', renk: 'bg-amber-500' },
    { no: '6', baslik: 'Sözleşme & Kapanış', ikon: '📄', aciklama: 'Sözleşme aşamasına geç, komisyon otomatik hesaplansın.', renk: 'bg-cyan-500' },
    { no: '7', baslik: 'Satıldı / Kiralandı', ikon: '🎉', aciklama: 'İlanlar 3 platformdan otomatik kaldırılır.', renk: 'bg-green-500' },
    { no: '8', baslik: 'Arşiv & Rapor', ikon: '📊', aciklama: 'Tüm veriler değerleme ve performans raporlarına akar.', renk: 'bg-rose-500' },
]

/* ─── Premium+ Paket Avantajları ─── */

const PREMIUM_AVANTAJLAR = [
    'Sınırsız mülk portföyü',
    'Sahibinden + Hepsiemlak + Emlakjet sendikasyon',
    'AI müşteri-mülk eşleştirme motoru',
    'Karşılaştırmalı değerleme raporu',
    '8 aşamalı mülk state machine',
    'CRM & lead pipeline',
    'Danışman leaderboard & komisyon takibi',
    'Satış hunisi görselleştirme',
    'Portföy değeri dashboard',
    'Firebase real-time senkronizasyon',
]

export default function EmlakYonetimSistemiPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-28 pb-24">

            {/* ═══ HERO ═══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-6">
                    ✨ Premium+ Özel Modül
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 font-syne">
                    Emlak <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500">Yönetim Sistemi</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
                    Portföy → 3 Platforma İlan → AI Eşleştirme → Değerleme → Komisyon.
                    Tek merkezden <strong className="text-foreground">Sahibinden, Hepsiemlak ve Emlakjet</strong>&apos;e ilan yayınlayın,
                    müşterileri <strong className="text-foreground">AI ile eşleştirin</strong>,
                    mülkleri <strong className="text-foreground">karşılaştırmalı değerleme</strong> ile fiyatlandırın.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-blue-500 hover:from-emerald-500 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-emerald-900/30 text-lg">
                        🚀 Ücretsiz Deneyin
                    </Link>
                    <Link href="/fiyatlar" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all text-lg">
                        💰 Fiyatları İncele
                    </Link>
                </div>
            </section>

            {/* ═══ MÜLK YAŞAM DÖNGÜSÜ (8 ADIM) ═══ */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4">
                        Mülk Yaşam Döngüsü: <span className="text-emerald-500">8 Adım</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Taslak oluşturmadan arşive kadar her adım otomatik, izlenebilir ve kontrollü.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-500 via-emerald-500 to-rose-500 hidden md:block" />
                    <div className="space-y-6">
                        {YASAM_DONGUSU.map((adim) => (
                            <div key={adim.no} className="flex items-start gap-4 md:gap-6">
                                <div className={`w-12 h-12 ${adim.renk} rounded-full flex items-center justify-center text-white text-xl font-black shrink-0 shadow-lg relative z-10`}>
                                    {adim.ikon}
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex-1 hover:bg-white/[0.05] transition-colors">
                                    <h3 className="text-white font-bold text-base mb-1">
                                        <span className="text-muted-foreground mr-2">{adim.no}.</span>
                                        {adim.baslik}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">{adim.aciklama}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 6 MODÜL SHOWCASE ═══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-purple-500">6 Güçlü</span> Modül
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Her biri kendi başına devrimci, bir arada ise rakipsiz bir emlak yönetim ekosistemi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MODULLER.map((m, i) => (
                        <div key={i} className="group relative bg-white/[0.02] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.05] transition-all overflow-hidden">
                            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${m.renkClass} rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                                {m.baslik}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed relative z-10">
                                {m.aciklama}
                            </p>
                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                {m.ozellikler.map((oz, j) => (
                                    <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 shrink-0" />
                                        {oz}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ EKRAN GÖRSELLERİ ═══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4">
                        Gerçek <span className="text-blue-500">Ekran Görüntüleri</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Patron paneli, portföy listesi, CRM eşleştirme ve değerleme raporları.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { baslik: '📊 Portföy Dashboard', aciklama: 'Satış hunisi, ilan sayıları, portföy değeri', gradient: 'from-emerald-600/20 to-green-600/20' },
                        { baslik: '📡 Platform Senkronizasyonu', aciklama: 'Sahibinden + Hepsiemlak + Emlakjet durumu', gradient: 'from-blue-600/20 to-cyan-600/20' },
                        { baslik: '🤖 AI Eşleştirme', aciklama: 'Müşteri-mülk puan tablosu, 0-100 scoring', gradient: 'from-purple-600/20 to-violet-600/20' },
                        { baslik: '📋 Değerleme Raporu', aciklama: 'Bölgesel m²/TL, düzeltme faktörleri, fiyat aralığı', gradient: 'from-amber-600/20 to-yellow-600/20' },
                        { baslik: '🏆 Danışman Leaderboard', aciklama: 'Aylık komisyon sıralaması, başarı oranları', gradient: 'from-rose-600/20 to-pink-600/20' },
                        { baslik: '👥 CRM Pipeline', aciklama: 'Müşteri talepleri, gösterim geçmişi, teklif takibi', gradient: 'from-indigo-600/20 to-blue-600/20' },
                    ].map((ekran, i) => (
                        <div key={i} className="group relative" style={{ perspective: '1000px' }}>
                            <div
                                className={`bg-gradient-to-br ${ekran.gradient} border border-white/10 rounded-3xl p-6 h-64 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]`}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="bg-neutral-900/80 rounded-2xl p-4 flex-1 flex flex-col justify-center items-center border border-white/5">
                                    <div className="text-4xl mb-3">{ekran.baslik.split(' ')[0]}</div>
                                    <div className="w-full space-y-2">
                                        <div className="h-2 bg-white/10 rounded-full w-full" />
                                        <div className="h-2 bg-white/10 rounded-full w-3/4" />
                                        <div className="h-2 bg-white/10 rounded-full w-1/2" />
                                        <div className="flex gap-2 mt-3 justify-center">
                                            <div className="w-8 h-8 rounded-lg bg-white/10" />
                                            <div className="w-8 h-8 rounded-lg bg-white/10" />
                                            <div className="w-8 h-8 rounded-lg bg-white/10" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-white font-bold text-sm">{ekran.baslik}</h3>
                                    <p className="text-muted-foreground text-xs mt-0.5">{ekran.aciklama}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ PREMIUM+ PAKET ═══ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="bg-gradient-to-br from-emerald-600/10 via-blue-600/10 to-purple-600/10 border border-emerald-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25 mb-4">
                            ✨ Premium+ Pakete Dahil
                        </span>
                        <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4 text-white">
                            Tüm Emlak Modülleri<br />Tek Pakette
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                            Ekstra kurulum ücreti yok. Premium+ paketinizi aktifleştirin,
                            tüm modüller anında kullanıma hazır.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-8 text-left">
                            {PREMIUM_AVANTAJLAR.map((a, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                                    <span className="text-emerald-400">✓</span>
                                    {a}
                                </div>
                            ))}
                        </div>

                        <Link href="/onboarding" className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 to-blue-500 hover:from-emerald-500 hover:to-blue-400 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-emerald-900/30 text-lg">
                            🚀 Premium+ ile Başlayın
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-3xl font-syne font-bold mb-4 text-white">
                    Emlak Ofisinizi Geleceğe Taşıyın
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Rakipleriniz excelde ilan takip ederken siz AI ile müşteri eşleştirin.
                    5 dakikada kurulum, sıfır eğitim.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/iletisim" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-semibold py-3 px-6 rounded-xl hover:bg-white/10 transition-all">
                        📞 Bize Ulaşın
                    </Link>
                    <Link href="/demolar/vitrin?s=emlakci" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-semibold py-3 px-6 rounded-xl hover:bg-white/10 transition-all">
                        🎬 Demo İzleyin
                    </Link>
                </div>
            </section>
        </main>
    )
}
