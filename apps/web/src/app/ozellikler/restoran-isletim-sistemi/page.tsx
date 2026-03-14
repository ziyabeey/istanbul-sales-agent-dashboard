import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Restoran İşletim Sistemi | kepenk.ai — Sipariş → Mutfak → Masa → KPI',
    description: 'QR sipariş, Alman usulü ödeme, akıllı mutfak KDS, otonom garson dispatch, dijital bahşiş, KPI radarı ve salon haritası. Türkiye\'nin en gelişmiş restoran yönetim yazılımı.',
}

/* ─── Öne Çıkan Modüller ─── */

const MODULLER = [
    {
        baslik: '📱 QR Masadan Sipariş',
        aciklama: 'Müşteri masadaki QR kodu okutup menüden seçim yapar. Alman Usulü ödeme: Önce Iyzico ile ödeme alınır, sonra sipariş mutfağa düşer.',
        renkClass: 'from-blue-600 to-cyan-500',
        ozellikler: ['Masadan QR ile anlık menü', 'Iyzico 3D Secure ödeme', 'Sipariş anında mutfağa düşüş', 'KDV otomatik hesaplama'],
    },
    {
        baslik: '👨‍🍳 Mutfak KDS Ekranı',
        aciklama: 'Aşçının gördüğü 3-kolon Kanban. Sipariş gelir → "Hazırlanıyor" → "Hazır!" butonu basılınca garsona push bildirim gider.',
        renkClass: 'from-orange-600 to-amber-500',
        ozellikler: ['3-kolon canlı Kanban', 'Her kartta canlı kronometre', 'Zaman damgası (serverTimestamp)', '80mm termal yazdırma'],
    },
    {
        baslik: '🏃 Otonom Garson Dispatch',
        aciklama: 'Uber mantığıyla en az yoğun garsona otomatik görev atar. Transaction-safe load balancing + round-robin adalet algoritması.',
        renkClass: 'from-emerald-600 to-green-500',
        ozellikler: ['Akıllı yük dengeleme', 'Round-robin eşitlik', 'Anlık push bildirim', 'Firestore Transaction ile atama'],
    },
    {
        baslik: '📲 Garson Mobil Kokpiti',
        aciklama: 'Garsonun cebindeki PWA. Masa durumuna göre butonlar otomatik değişir: Servis Aç → Teslim Et → Temizle.',
        renkClass: 'from-purple-600 to-violet-500',
        ozellikler: ['Dinamik görev butonları', 'Canlı sayaç + titreşim', '1.5sn basılı tutarak temizlik', 'Bahşiş göstergesi'],
    },
    {
        baslik: '🪑 Masa Yaşam Döngüsü',
        aciklama: '8 durumlu state machine: Boş → Sipariş → Servis → Mutfak → Hazır → Teslim → Kirli → Temizlik → Boş. Temizlik kilidi aktifken QR sipariş engellenir.',
        renkClass: 'from-cyan-600 to-teal-500',
        ozellikler: ['8 aşamalı durum makinesi', 'Temizlik kilidi (QR engel)', 'Otomatik garson atama', 'Renkli durum haritası'],
    },
    {
        baslik: '💸 Dijital Bahşiş Motoru',
        aciklama: 'Ödeme anında garsonun adıyla "Ali size 3dk\'da sıcak servis yaptı" mesajı. %5 / %10 / Özel tutar — doğrudan dijital cüzdana.',
        renkClass: 'from-amber-600 to-yellow-500',
        ozellikler: ['Garson ismini gösterir', '%5, %10, %15 hızlı seçim', 'FieldValue.increment() atomik', 'Canlı bahşiş sayacı'],
    },
    {
        baslik: '📊 KPI & SLA Ölçüm Motoru',
        aciklama: 'Mutfak Hızı (12dk SLA) ve Garson Hızı (3dk SLA) milisaniye hassasiyetiyle ölçülür. Hedefte +10 puan, sapma başına -2 puan.',
        renkClass: 'from-rose-600 to-pink-500',
        ozellikler: ['Mutfak SLA: 12 dakika', 'Garson SLA: 3 dakika', 'Otomatik puanlama (+10/-2)', 'AI darboğaz uyarıları'],
    },
    {
        baslik: '📡 Patron Salon Radarı',
        aciklama: 'Tüm restoranı kuşbakışı izleyin. Masalar renkli yanar, garson yükleri görünür, 10dk+ kirli masalar alarm verir.',
        renkClass: 'from-indigo-600 to-blue-500',
        ozellikler: ['Renkli masa haritası', 'Garson leaderboard', '10dk kirli masa alarmı', 'Tıkla → sorumlu garson gör'],
    },
    {
        baslik: '📝 Reçete & Stok Yönetimi',
        aciklama: 'Her yemeğin malzeme gramı, maliyet analizi ve stok düşümü otomatik. Fire oranı yükselince AI uyarı verir, tedarikçi sipariş önerisi sunar.',
        renkClass: 'from-yellow-600 to-lime-500',
        ozellikler: ['Gram bazlı reçete tanımı', 'Otomatik maliyet hesabı', 'Stok düşüm & fire takibi', 'AI tedarikçi sipariş önerisi'],
    },
]

/* ─── Sipariş Akış Adımları ─── */

const AKIS_ADIMLARI = [
    { no: '1', baslik: 'QR Oku & Sipariş Ver', ikon: '📱', aciklama: 'Müşteri masadaki QR\'ı tarayıp menüden seçim yapar.', renk: 'bg-blue-500' },
    { no: '2', baslik: 'Alman Usulü Ödeme', ikon: '💳', aciklama: 'Iyzico ile 3D Secure ödeme — ödenmeden mutfağa sipariş düşmez.', renk: 'bg-emerald-500' },
    { no: '3', baslik: 'Garson Otomatik Atanır', ikon: '🤖', aciklama: 'Load balancer en uygun garsonu bulur, görev atar.', renk: 'bg-purple-500' },
    { no: '4', baslik: 'Garson Servis Açar', ikon: '🍽️', aciklama: 'Garson çatal/bıçak/su götürür, "Servis Aç" butonuna basar.', renk: 'bg-cyan-500' },
    { no: '5', baslik: 'Mutfak Hazırlar', ikon: '👨‍🍳', aciklama: 'KDS ekranında kronometre başlar, aşçı sipariş çıkarır.', renk: 'bg-orange-500' },
    { no: '6', baslik: 'Garson Teslim Eder', ikon: '🏃', aciklama: 'Hazır bildirim gelir, garson yemeği masaya bırakır.', renk: 'bg-green-500' },
    { no: '7', baslik: 'KPI Otomatik Hesaplanır', ikon: '📊', aciklama: 'Mutfak ve garson süreleri SLA hedefiyle karşılaştırılır.', renk: 'bg-rose-500' },
    { no: '8', baslik: 'Masa Temizlenir', ikon: '🧹', aciklama: 'Müşteri gidince garson temizler, masa havuza döner.', renk: 'bg-violet-500' },
]

/* ─── Premium+ Paket Avantajları ─── */

const PREMIUM_AVANTAJLAR = [
    'Sınırsız masa ve QR kod',
    'Mutfak KDS ekranı',
    'Garson POS uygulaması (PWA)',
    'Otonom garson dispatch (load balancer)',
    'Dijital bahşiş motoru',
    'KPI & SLA ölçüm radarı',
    'Salon haritası & garson leaderboard',
    'Alman Usulü Iyzico entegrasyonu',
    'Firebase real-time senkronizasyon',
    'AI darboğaz uyarıları',
    'Reçete & stok yönetimi (gram bazlı)',
    'Fire takibi & tedarikçi sipariş önerisi',
]

export default function RestoranIsletimSistemiPage() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-28 pb-24">

            {/* ═══ HERO ═══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 mb-6">
                    ✨ Premium+ Özel Modül
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 font-syne">
                    Restoran <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500">İşletim Sistemi</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
                    QR sipariş → Ödeme → Mutfak → Garson → Masa → KPI. Sipariş anından masa temizliğine kadar
                    her adımı <strong className="text-foreground">milisaniye hassasiyetiyle</strong> ölçen,
                    garsonları <strong className="text-foreground">Uber gibi</strong> akıllıca dağıtan,
                    patrona <strong className="text-foreground">salon haritası</strong> sunan Türkiye&apos;nin en gelişmiş restoran yönetim yazılımı.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/onboarding" className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-rose-500 hover:from-orange-500 hover:to-rose-400 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-orange-900/30 text-lg">
                        🚀 Ücretsiz Deneyin
                    </Link>
                    <Link href="/fiyatlar" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-all text-lg">
                        💰 Fiyatları İncele
                    </Link>
                </div>
            </section>

            {/* ═══ UÇTAN UCA AKIŞ (8 ADIM) ═══ */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4">
                        Uçtan Uca <span className="text-orange-500">8 Adımlık</span> Akış
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Müşterinin QR okumasından masa temizliğine kadar her adım otomatik, ölçülü ve kontrollü.
                    </p>
                </div>
                <div className="relative">
                    {/* Dikey çizgi */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-violet-500 hidden md:block" />
                    <div className="space-y-6">
                        {AKIS_ADIMLARI.map((adim) => (
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

            {/* ═══ 8 MODÜL SHOWCASE ═══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">9 Güçlü</span> Modül
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Her biri kendi başına devrimci, bir arada ise rakipsiz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MODULLER.map((m, i) => (
                        <div key={i} className="group relative bg-white/[0.02] border border-white/10 rounded-3xl p-6 hover:bg-white/[0.05] transition-all overflow-hidden">
                            {/* Gradient glow */}
                            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${m.renkClass} rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />

                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                                {m.baslik}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed relative z-10">
                                {m.aciklama}
                            </p>
                            <div className="grid grid-cols-2 gap-2 relative z-10">
                                {m.ozellikler.map((oz, j) => (
                                    <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 shrink-0" />
                                        {oz}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ EKRAN GÖRSELLERİ (Gerçek UI Mockup) ═══ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4">
                        Gerçek <span className="text-rose-500">Ekran Görüntüleri</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Her ekran özel tasarlanmış, koyu temalı ve mobil uyumlu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* ── 1. QR Sipariş Ekranı ── */}
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-white/10 rounded-3xl p-5 h-72 flex flex-col hover:border-cyan-500/30 transition-colors">
                            <div className="bg-neutral-900/90 rounded-2xl p-3 flex-1 border border-white/5 overflow-hidden">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                    <div className="w-6 h-6 rounded-lg bg-blue-500/30 flex items-center justify-center text-[10px]">📱</div>
                                    <span className="text-[10px] text-white/60 font-bold">MENÜ — Masa 7</span>
                                    <span className="ml-auto text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">Açık</span>
                                </div>
                                {[{ ad: 'Karışık Izgara', fiyat: '₺285' }, { ad: 'Adana Kebap', fiyat: '₺195' }, { ad: 'Ayran', fiyat: '₺35' }].map((u, j) => (
                                    <div key={j} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded bg-white/10" />
                                            <span className="text-[10px] text-white/80">{u.ad}</span>
                                        </div>
                                        <span className="text-[10px] text-cyan-400 font-bold">{u.fiyat}</span>
                                    </div>
                                ))}
                                <div className="mt-2 flex items-center justify-between bg-blue-500/20 rounded-lg px-2 py-1.5">
                                    <span className="text-[9px] text-white/60">Toplam</span>
                                    <span className="text-[11px] text-white font-extrabold">₺515</span>
                                </div>
                                <div className="mt-1.5 bg-blue-500 rounded-lg py-1.5 text-center text-[10px] text-white font-bold">
                                    💳 Iyzico ile Öde
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <h3 className="text-white font-bold text-sm">📱 QR Sipariş Ekranı</h3>
                                <p className="text-muted-foreground text-xs mt-0.5">Müşterinin telefonundan gördüğü menü ve ödeme formu</p>
                            </div>
                        </div>
                    </div>

                    {/* ── 2. Mutfak KDS ── */}
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-orange-600/20 to-amber-600/20 border border-white/10 rounded-3xl p-5 h-72 flex flex-col hover:border-orange-500/30 transition-colors">
                            <div className="bg-neutral-900/90 rounded-2xl p-3 flex-1 border border-white/5 overflow-hidden">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                    <span className="text-[10px] text-white/60 font-bold">👨‍🍳 MUTFAK KDS</span>
                                    <span className="ml-auto text-[9px] text-orange-400">3 aktif sipariş</span>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5 flex-1">
                                    {/* Yeni */}
                                    <div className="space-y-1">
                                        <div className="text-[8px] text-yellow-400 font-bold text-center mb-1">YENİ</div>
                                        <div className="bg-yellow-500/15 border border-yellow-500/20 rounded-md p-1.5">
                                            <div className="text-[8px] text-white/80 font-bold">M7</div>
                                            <div className="text-[7px] text-yellow-300">Izgara x2</div>
                                            <div className="text-[7px] text-orange-300 font-mono">02:31</div>
                                        </div>
                                    </div>
                                    {/* Hazırlanıyor */}
                                    <div className="space-y-1">
                                        <div className="text-[8px] text-blue-400 font-bold text-center mb-1">PİŞİYOR</div>
                                        <div className="bg-blue-500/15 border border-blue-500/20 rounded-md p-1.5">
                                            <div className="text-[8px] text-white/80 font-bold">M3</div>
                                            <div className="text-[7px] text-blue-300">Kebap x1</div>
                                            <div className="text-[7px] text-blue-300 font-mono">08:45</div>
                                        </div>
                                    </div>
                                    {/* Hazır */}
                                    <div className="space-y-1">
                                        <div className="text-[8px] text-green-400 font-bold text-center mb-1">HAZIR ✓</div>
                                        <div className="bg-green-500/15 border border-green-500/20 rounded-md p-1.5">
                                            <div className="text-[8px] text-white/80 font-bold">M12</div>
                                            <div className="text-[7px] text-green-300">Pizza x3</div>
                                            <div className="text-[7px] text-green-300 font-mono">11:20</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <h3 className="text-white font-bold text-sm">👨‍🍳 Mutfak KDS</h3>
                                <p className="text-muted-foreground text-xs mt-0.5">3-kolon Kanban: Ödendi → Hazırlanıyor → Hazır</p>
                            </div>
                        </div>
                    </div>

                    {/* ── 3. Garson Kokpiti ── */}
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-white/10 rounded-3xl p-5 h-72 flex flex-col hover:border-emerald-500/30 transition-colors">
                            <div className="bg-neutral-900/90 rounded-2xl p-3 flex-1 border border-white/5 overflow-hidden">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                    <span className="text-[10px] text-white/60 font-bold">🏃 GARSON — Ali K.</span>
                                    <span className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">4 görev</span>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/20 rounded-lg px-2 py-1.5">
                                        <span className="text-[10px]">🍽️</span>
                                        <div className="flex-1">
                                            <div className="text-[9px] text-white/90 font-bold">Masa 7 — Servis Aç</div>
                                            <div className="text-[8px] text-emerald-300">Çatal/bıçak/su hazırla</div>
                                        </div>
                                        <div className="text-[9px] text-emerald-400 font-mono font-bold">01:22</div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/15 rounded-lg px-2 py-1.5">
                                        <span className="text-[10px]">📦</span>
                                        <div className="flex-1">
                                            <div className="text-[9px] text-white/90 font-bold">Masa 3 — Teslim Et</div>
                                            <div className="text-[8px] text-orange-300">Kebap hazır</div>
                                        </div>
                                        <div className="text-[9px] text-orange-400 font-mono font-bold">00:45</div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5">
                                        <span className="text-[10px]">🧹</span>
                                        <div className="flex-1">
                                            <div className="text-[9px] text-white/70 font-bold">Masa 12 — Temizle</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-[9px] text-white/40">
                                    <span>💸 Bugünkü bahşiş:</span>
                                    <span className="text-emerald-400 font-bold">₺185</span>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <h3 className="text-white font-bold text-sm">🏃 Garson Kokpiti</h3>
                                <p className="text-muted-foreground text-xs mt-0.5">Dinamik görev butonları, canlı sayaç, bahşiş</p>
                            </div>
                        </div>
                    </div>

                    {/* ── 4. Adisyon Yönetimi ── */}
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-white/10 rounded-3xl p-5 h-72 flex flex-col hover:border-purple-500/30 transition-colors">
                            <div className="bg-neutral-900/90 rounded-2xl p-3 flex-1 border border-white/5 overflow-hidden">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                    <span className="text-[10px] text-white/60 font-bold">🪑 ADİSYON #1847</span>
                                    <span className="ml-auto text-[9px] text-purple-400">Masa 7</span>
                                </div>
                                <div className="space-y-1">
                                    {[{ ad: 'Karışık Izgara', adet: '2x', fiyat: '₺570' }, { ad: 'Adana Kebap', adet: '1x', fiyat: '₺195' }, { ad: 'Ayran', adet: '3x', fiyat: '₺105' }, { ad: 'Künefe', adet: '2x', fiyat: '₺180' }].map((k, j) => (
                                        <div key={j} className="flex items-center justify-between text-[9px] py-0.5">
                                            <span className="text-white/60">{k.adet}</span>
                                            <span className="text-white/80 flex-1 ml-2">{k.ad}</span>
                                            <span className="text-purple-300 font-mono">{k.fiyat}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-2 pt-1.5 border-t border-white/10 space-y-0.5">
                                    <div className="flex justify-between text-[9px]">
                                        <span className="text-white/40">Ara Toplam</span>
                                        <span className="text-white/60">₺1.050</span>
                                    </div>
                                    <div className="flex justify-between text-[9px]">
                                        <span className="text-white/40">KDV %10</span>
                                        <span className="text-white/60">₺105</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-extrabold mt-1">
                                        <span className="text-white/80">TOPLAM</span>
                                        <span className="text-purple-400">₺1.155</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <h3 className="text-white font-bold text-sm">🪑 Adisyon Yönetimi</h3>
                                <p className="text-muted-foreground text-xs mt-0.5">Zaman damgalı adisyon kartları, KDV detayı</p>
                            </div>
                        </div>
                    </div>

                    {/* ── 5. Salon Radarı ── */}
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-white/10 rounded-3xl p-5 h-72 flex flex-col hover:border-indigo-500/30 transition-colors">
                            <div className="bg-neutral-900/90 rounded-2xl p-3 flex-1 border border-white/5 overflow-hidden">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                    <span className="text-[10px] text-white/60 font-bold">📡 SALON RADARI</span>
                                    <span className="ml-auto text-[9px] text-white/40">12/16 masa dolu</span>
                                </div>
                                <div className="grid grid-cols-4 gap-1 mb-2">
                                    {[
                                        { no: 1, renk: 'bg-emerald-500', durum: '●' }, { no: 2, renk: 'bg-orange-500', durum: '◐' },
                                        { no: 3, renk: 'bg-blue-500', durum: '●' }, { no: 4, renk: 'bg-neutral-700', durum: '○' },
                                        { no: 5, renk: 'bg-emerald-500', durum: '●' }, { no: 6, renk: 'bg-emerald-500', durum: '●' },
                                        { no: 7, renk: 'bg-red-500', durum: '◉' }, { no: 8, renk: 'bg-neutral-700', durum: '○' },
                                        { no: 9, renk: 'bg-blue-500', durum: '●' }, { no: 10, renk: 'bg-emerald-500', durum: '●' },
                                        { no: 11, renk: 'bg-orange-500', durum: '◐' }, { no: 12, renk: 'bg-emerald-500', durum: '●' },
                                    ].map((m) => (
                                        <div key={m.no} className={`${m.renk} rounded text-center py-1 text-[8px] text-white font-bold`}>
                                            {m.no}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3 text-[7px] text-white/50 justify-center">
                                    <span><span className="text-emerald-400">●</span> Servis</span>
                                    <span><span className="text-orange-400">●</span> Hazır</span>
                                    <span><span className="text-blue-400">●</span> Mutfak</span>
                                    <span><span className="text-red-400">●</span> Alarm</span>
                                    <span><span className="text-neutral-400">●</span> Boş</span>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <h3 className="text-white font-bold text-sm">📡 Salon Radarı</h3>
                                <p className="text-muted-foreground text-xs mt-0.5">Renkli masa grid, garson leaderboard, alarm</p>
                            </div>
                        </div>
                    </div>

                    {/* ── 6. KPI Dashboard ── */}
                    <div className="group relative">
                        <div className="bg-gradient-to-br from-rose-600/20 to-pink-600/20 border border-white/10 rounded-3xl p-5 h-72 flex flex-col hover:border-rose-500/30 transition-colors">
                            <div className="bg-neutral-900/90 rounded-2xl p-3 flex-1 border border-white/5 overflow-hidden">
                                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                    <span className="text-[10px] text-white/60 font-bold">📊 KPI DASHBOARD</span>
                                    <span className="ml-auto text-[9px] text-emerald-400">↑ 12%</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5 mb-2">
                                    <div className="bg-white/5 rounded-lg p-1.5 text-center">
                                        <div className="text-[8px] text-white/40">Mutfak SLA</div>
                                        <div className="text-[12px] font-extrabold text-emerald-400">9.2 dk</div>
                                        <div className="text-[7px] text-emerald-400">✓ Hedef: 12dk</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-1.5 text-center">
                                        <div className="text-[8px] text-white/40">Garson SLA</div>
                                        <div className="text-[12px] font-extrabold text-rose-400">4.1 dk</div>
                                        <div className="text-[7px] text-rose-400">✗ Hedef: 3dk</div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    {[{ ad: 'Ali K.', puan: 92, renk: 'bg-emerald-500' }, { ad: 'Mehmet B.', puan: 78, renk: 'bg-blue-500' }, { ad: 'Zeynep A.', puan: 65, renk: 'bg-amber-500' }].map((g, j) => (
                                        <div key={j} className="flex items-center gap-2">
                                            <span className="text-[8px] text-white/50 w-14 truncate">{g.ad}</span>
                                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div className={`h-full ${g.renk} rounded-full`} style={{ width: `${g.puan}%` }} />
                                            </div>
                                            <span className="text-[8px] text-white/60 font-mono w-5">{g.puan}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <h3 className="text-white font-bold text-sm">📊 KPI Dashboard</h3>
                                <p className="text-muted-foreground text-xs mt-0.5">SLA kartları, liderlik tablosu, AI uyarılar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PREMIUM+ PAKET ═══ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <div className="bg-gradient-to-br from-purple-600/10 via-rose-600/10 to-orange-600/10 border border-purple-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-xl" />
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-xl" />

                    <div className="relative z-10">
                        <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-purple-400 bg-purple-500/15 border border-purple-500/25 mb-4">
                            ✨ Premium+ Pakete Dahil
                        </span>
                        <h2 className="text-3xl md:text-4xl font-syne font-extrabold mb-4 text-white">
                            Tüm Restoran Modülleri<br />Tek Pakette
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

                        <Link href="/onboarding" className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-purple-900/30 text-lg">
                            🚀 Premium+ ile Başlayın
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-3xl font-syne font-bold mb-4 text-white">
                    Restoranınızı Geleceğe Taşıyın
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Rakipleriniz kağıt adisyon tutarken siz AI ile KPI ölçün.
                    5 dakikada kurulum, sıfır eğitim zorunluluğu.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/iletisim" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-semibold py-3 px-6 rounded-xl hover:bg-white/10 transition-all">
                        📞 Bize Ulaşın
                    </Link>
                    <Link href="/demolar/vitrin?s=restoran" className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-foreground font-semibold py-3 px-6 rounded-xl hover:bg-white/10 transition-all">
                        🎬 Demo İzleyin
                    </Link>
                </div>
            </section>
        </main>
    )
}
