import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Web Sitesi Üretici | kepenk.ai — 2 Dakikada Profesyonel Site',
    description: '42 sektöre özel AI ile üretilmiş web sitesi şablonları. Sürükle-bırak editör, mobil uyumlu, SEO hazır. Domain bağlama ve tek tıkla yayınlama.',
}

const ADIMLARI = [
    { no: '1', baslik: 'Sektörünüzü Seçin', ikon: '🎯', aciklama: '22 sektörden birini seçin, AI size özel içerik üretsin.' },
    { no: '2', baslik: 'İşletme Bilgisi Girin', ikon: '📝', aciklama: 'İsim, adres, telefon — geri kalanı AI tamamlar.' },
    { no: '3', baslik: 'Siteniz Hazır!', ikon: '🚀', aciklama: 'Profesyonel web siteniz saniyeler içinde yayında.' },
]

const OZELLIKLER = [
    { baslik: '🎨 42 Sektörel Şablon', aciklama: 'Restorandan avukata, berberten tesisatçıya — her sektöre özel tasarım ve içerik.' },
    { baslik: '📱 Mobil Öncelikli', aciklama: 'Tüm siteler mobil uyumlu. Google Mobile-First indexleme standartlarına uygun.' },
    { baslik: '🔍 SEO Hazır', aciklama: 'Meta etiketler, schema.org, sitemap, hız optimizasyonu — Google\'da üst sıralarda çıkın.' },
    { baslik: '✏️ Sürükle-Bırak Editör', aciklama: 'Blok bazlı editörle sitenizi dilediğiniz gibi özelleştirin. Kod bilgisi gerekmez.' },
    { baslik: '🌐 Özel Domain', aciklama: 'Kendi alan adınızı bağlayın veya ücretsiz kepenk.ai alt alanı kullanın.' },
    { baslik: '⚡ Işık Hızında', aciklama: 'CDN üzerinden sunulan siteler <1sn yükleme süresiyle en hızlı deneyimi sunar.' },
]

export default function WebSitesiPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-28 pb-24">
            {/* HERO */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-6">
                    🌐 Her Pakete Dahil
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-syne">
                    AI ile <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400">Web Sitesi</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                    Sektörünüze özel, profesyonel web sitesi 2 dakikada hazır.
                    AI içerik yazar, tasarım seçer, SEO optimize eder — siz sadece işletme bilginizi girin.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-cyan-900/30 text-lg">
                        🚀 Sitenizi Oluşturun
                    </Link>
                    <Link href="/demolar/vitrin" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all text-lg">
                        🎬 42 Demoyu İncele
                    </Link>
                </div>
            </section>

            {/* 3 ADIM */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <h2 className="text-2xl md:text-3xl font-syne font-extrabold mb-10 text-center">
                    <span className="text-cyan-400">3 Adımda</span> Web Sitesi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ADIMLARI.map((a) => (
                        <div key={a.no} className="text-center bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                            <div className="text-4xl mb-3">{a.ikon}</div>
                            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Adım {a.no}</div>
                            <h3 className="text-white font-bold text-base mb-2">{a.baslik}</h3>
                            <p className="text-muted-foreground text-sm">{a.aciklama}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ÖZELLIKLER */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {OZELLIKLER.map((o, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.05] transition-all">
                            <h3 className="text-base font-bold text-white mb-2">{o.baslik}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{o.aciklama}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-syne font-extrabold mb-4 text-white">
                        Web Siteniz Olsun, İşiniz Büyüsün
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Dijital varlığınız olmadan müşteri kaybediyorsunuz. 2 dakikada sitenizi kurun.
                    </p>
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg text-lg">
                        🚀 Hemen Başla
                    </Link>
                </div>
            </section>
        </main>
    )
}
