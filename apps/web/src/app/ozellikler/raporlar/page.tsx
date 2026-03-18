import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Raporlar & Analitik | kepenk.ai — Haftalık Akıllı Analiz',
    description: 'Haftalık AI raporları, müşteri analizi, gelir takibi, churn uyarıları ve rekabet analizi. Veriye dayalı kararlar alın.',
}

const RAPOR_TURLERI = [
    { baslik: '📊 Haftalık Performans', aciklama: 'Geçen haftanın müşteri sayısı, ciro, en çok satan ürünler ve büyüme trendi. AI yorumuyla birlikte.', renk: 'from-blue-600 to-cyan-500' },
    { baslik: '👥 Müşteri Segmentasyonu', aciklama: 'VIP, sadık, riskli ve yeni müşterilerinizi otomatik segmentler. Her segmente özel aksiyon önerir.', renk: 'from-purple-600 to-violet-500' },
    { baslik: '⚠️ Churn Erken Uyarı', aciklama: '60+ gün gelmemiş müşterileri tespit eder. Otomatik "Seni özledik" WhatsApp kampanyası başlatır.', renk: 'from-rose-600 to-pink-500' },
    { baslik: '💰 Gelir & Maliyet', aciklama: 'Aylık ciro, karlılık, ortalama sepet tutarı ve periyodik karşılaştırma grafikleri.', renk: 'from-emerald-600 to-green-500' },
    { baslik: '🏆 Rekabet Radarı', aciklama: 'Bölgenizdeki rakiplerin Google puanı, yorum sayısı ve fiyat karşılaştırması.', renk: 'from-amber-600 to-yellow-500' },
    { baslik: '📈 AI Büyüme Önerileri', aciklama: 'Verinize dayalı kişiselleştirilmiş büyüme tavsiyeleri. "Salı günleri kampanya yaparsanız %23 daha fazla müşteri çekersiniz."', renk: 'from-indigo-600 to-blue-500' },
]

export default function RaporlarPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-28 pb-24">
            {/* HERO */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-6">
                    📊 Standart Paketten İtibaren
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-syne">
                    AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-400">Raporlar</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                    Her Pazartesi sabah e-postanıza düşen akıllı rapor.
                    Neyin iyi gittiğini, neyin risk olduğunu ve ne yapmanız gerektiğini AI söyler.
                </p>
                <Link href="/onboarding" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/30 text-lg">
                    🚀 Ücretsiz Başla
                </Link>
            </section>

            {/* RAPOR TÜRLERİ */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {RAPOR_TURLERI.map((r, i) => (
                        <div key={i} className="group relative bg-white border border-foreground/10 rounded-3xl p-6 hover:bg-foreground/5 transition-all overflow-hidden">
                            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${r.renk} rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                            <h3 className="text-lg font-bold text-foreground mb-2 relative z-10">{r.baslik}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{r.aciklama}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-syne font-extrabold mb-4 text-foreground">
                        Veriye Dayalı Kararlar Alın
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        İçgüdülerinizle değil, veriyle büyüyün. AI asistanınız her hafta size yol göstersin.
                    </p>
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg text-lg">
                        🚀 Hemen Başla
                    </Link>
                </div>
            </section>
        </main>
    )
}
