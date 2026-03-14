import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sesli AI Asistan | kepenk.ai — Vapi.ai ile Telefon Yanıtlama',
    description: 'AI sesli asistan ile telefon çağrılarını otomatik yanıtlayın. Randevu alma, bilgi verme, yönlendirme. Vapi.ai entegrasyonu.',
}

const OZELLIKLER = [
    { baslik: '📞 Otomatik Çağrı Yanıtlama', aciklama: 'Meşgulken, mesai dışında veya çağrı yoğunluğunda AI telefonu açar. Doğal Türkçe ile müşteriyi karşılar.', renk: 'from-purple-600 to-violet-500' },
    { baslik: '📅 Telefonla Randevu', aciklama: 'Arayan müşteriye uygun saatleri söyler, randevuyu takvime ekler, SMS ile onay gönderir.', renk: 'from-blue-600 to-cyan-500' },
    { baslik: '🗣️ Doğal Dil İşleme', aciklama: 'Müşteri "yarın öğlen gelecektim" dese bile AI anlar ve doğru zaman aralığını sunar.', renk: 'from-emerald-600 to-green-500' },
    { baslik: '🌍 Çoklu Dil', aciklama: 'Türkçe, İngilizce, Arapça, Almanca sesli yanıt. Turist bölgelerinde büyük avantaj.', renk: 'from-amber-600 to-yellow-500' },
    { baslik: '📊 Çağrı Analizi', aciklama: 'Her çağrının transkripti, süresi, sonucu ve müşteri duygusu (pozitif/negatif) raporlanır.', renk: 'from-rose-600 to-pink-500' },
    { baslik: '🔄 Akıllı Yönlendirme', aciklama: 'Acil veya karmaşık konularda çağrıyı işletme sahibine yönlendirir. Basit soruları kendi çözer.', renk: 'from-indigo-600 to-blue-500' },
]

export default function SesliAsistanPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-28 pb-24">
            {/* HERO */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 mb-6">
                    📞 Premium+ Özel
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-syne">
                    Sesli <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-400">AI Asistan</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                    Telefonu her çaldığında bir müşteri kaybedebilirsiniz.
                    AI sesli asistan 7/24 telefonu açar, randevu alır, bilgi verir — hiçbir çağrıyı kaçırmaz.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-purple-900/30 text-lg">
                        🚀 Premium+ ile Başlayın
                    </Link>
                    <Link href="/fiyatlar" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all text-lg">
                        💰 Fiyatları İncele
                    </Link>
                </div>
            </section>

            {/* Powered by Vapi.ai */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                    <p className="text-sm text-muted-foreground">
                        Powered by <span className="text-purple-400 font-bold">Vapi.ai</span> — dünyanın en gelişmiş sesli AI platformu.
                        Millisaniye gecikmeli yanıt, doğal konuşma ve duygu algılama.
                    </p>
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
                <div className="bg-gradient-to-r from-purple-600/10 to-violet-600/10 border border-purple-500/20 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-syne font-extrabold mb-4 text-white">
                        Hiçbir Çağrıyı Kaçırmayın
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Her kaçan çağrı = kayıp müşteri. AI asistanınız 7/24 nöbette.
                    </p>
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg text-lg">
                        🚀 Hemen Başla
                    </Link>
                </div>
            </section>
        </main>
    )
}
