import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'WhatsApp AI Botu | kepenk.ai — 7/24 Otonom Müşteri İletişimi',
    description: 'WhatsApp üzerinden randevu alma, sipariş onayı, hatırlatma, kampanya bildirimi. The Closer ile satış kapama. Türk esnafı için en güçlü WhatsApp otomasyon motoru.',
}

const OZELLIKLER = [
    { baslik: '📅 Otonom Randevu Alma', aciklama: 'Müşteri WhatsApp\'tan mesaj yazar, AI takvimi kontrol edip uygun saatleri sunar, onay alır ve randevu oluşturur.', renk: 'from-green-600 to-emerald-500' },
    { baslik: '🔔 Akıllı Hatırlatmalar', aciklama: 'Randevu öncesi 24 saat ve 1 saat öncesinden otomatik hatırlatma. No-show oranını %70 azaltır.', renk: 'from-blue-600 to-cyan-500' },
    { baslik: '📢 Kampanya Bildirimi', aciklama: 'Yeni ürün, indirim veya özel gün kampanyalarını müşteri segmentlerine otomatik gönderir.', renk: 'from-purple-600 to-violet-500' },
    { baslik: '🤝 The Closer Satış Motoru', aciklama: 'Karasız müşterileri AI ile ikna eder. Fiyat soranlara özel teklif sunar, sepet terk edenleri geri kazanır.', renk: 'from-rose-600 to-pink-500' },
    { baslik: '⭐ Google Yorum Toplama', aciklama: 'İşlem sonrası memnuniyet anketini WhatsApp üzerinden gönderir, olumlu yanıtlardan Google yorumu yönlendirir.', renk: 'from-amber-600 to-yellow-500' },
    { baslik: '🌍 Çoklu Dil Desteği', aciklama: 'Türkçe, İngilizce, Arapça, Rusça otomatik dil algılama. Turist yoğun bölgelerde %40 daha fazla müşteri kazanımı.', renk: 'from-indigo-600 to-blue-500' },
]

export default function WhatsAppPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-28 pb-24">
            {/* HERO */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-green-400 bg-green-500/10 border border-green-500/20 mb-6">
                    📱 Her Pakete Dahil
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-syne">
                    WhatsApp <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">AI Bot</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                    Müşteriniz mesaj yazar, AI anında cevaplar. Randevu alır, sipariş onaylar,
                    kampanya gönderir, satış kapatır — 7/24 yorulmadan.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-green-900/30 text-lg">
                        🚀 Ücretsiz Başla
                    </Link>
                    <Link href="/fiyatlar" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all text-lg">
                        💰 Fiyatları İncele
                    </Link>
                </div>
            </section>

            {/* ÖZELLIKLER */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {OZELLIKLER.map((o, i) => (
                        <div key={i} className="group relative bg-white/[0.02] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.05] transition-all overflow-hidden">
                            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${o.renk} rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                            <h3 className="text-lg font-bold text-white mb-2 relative z-10">{o.baslik}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{o.aciklama}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-syne font-extrabold mb-4 text-white">
                        Müşterileriniz WhatsApp&apos;ta, Siz de Orada Olun
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Günde ortalama 120 mesaj — hepsini AI yanıtlasın, siz işinize odaklanın.
                    </p>
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg text-lg">
                        🚀 Hemen Başla
                    </Link>
                </div>
            </section>
        </main>
    )
}
