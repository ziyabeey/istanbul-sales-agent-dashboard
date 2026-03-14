import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Ahmet Usta Berber — Örnek kepenk.ai Web Sitesi',
    description: 'kepenk.ai ile oluşturulan örnek berber web sitesi. Bağcılar\'ın en iyi berberi.',
}

const ISLETME = {
    ad: 'Ahmet Usta',
    unvan: 'Saç & Sakal Salonu',
    slogan: 'İstanbul\'un en köklü berberi. 22 yıllık deneyim, modern dokunuş.',
    sektor: 'Berber',
    emoji: '✂️',
    telefon: '0532 XXX XX XX',
    wa: '905XXXXXXXXX',
    adres: 'Bağcılar Mah. Atatürk Cd. No:12, Bağcılar / İstanbul',
    saatler: [
        { gun: 'Pzt – Cmt', saat: '09:00 – 20:00' },
        { gun: 'Pazar', saat: '10:00 – 18:00' },
    ],
    google: 4.9,
    yorumSayisi: 247,
    hizmetler: [
        { ad: 'Saç Kesimi', fiyat: '150₺', sure: '30 dk', popular: false },
        { ad: 'Saç + Sakal Paketi', fiyat: '200₺', sure: '45 dk', popular: true },
        { ad: 'Sakal Tıraşı', fiyat: '80₺', sure: '20 dk', popular: false },
        { ad: 'Çocuk Saç Kesimi', fiyat: '100₺', sure: '25 dk', popular: false },
        { ad: 'Saç Boyama', fiyat: '350₺+', sure: '90 dk', popular: false },
        { ad: 'Cilt Bakımı', fiyat: '250₺', sure: '40 dk', popular: false },
    ],
    yorumlar: [
        { ad: 'Mehmet K.', puan: 5, tarih: '2 gün önce', metin: 'Yıllardır Ahmet ustaya gidiyorum. El becerisi ve titizliği inanılmaz. Hiçbir yere geçmez.' },
        { ad: 'Serkan T.', puan: 5, tarih: '1 hafta önce', metin: 'Çok temiz, çok hızlı ve fiyatlar çok makul. WhatsApp\'tan randevu aldım, 10 dakikada anlaştık. Kesinlikle tavsiye.' },
        { ad: 'Ali R.', puan: 5, tarih: '3 hafta önce', metin: 'Bu mahallede en iyi berber kesinlikle bu. Saça ve sakala ayrı ayrı vakit ayırıyor, hiç acele ettirmiyor.' },
    ],
    galeri: [
        { emoji: '💈', label: 'Klasik Berber' },
        { emoji: '💇', label: 'Modern Kesimler' },
        { emoji: '🪒', label: 'Geleneksel Ustura' },
        { emoji: '✨', label: 'Premium Bakım' },
    ],
}

function Stars({ count }: { count: number }) {
    return (
        <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </span>
    )
}

export default function WebsiteOrnekPage() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#0A0908', color: '#F4EFE8', fontFamily: "'Inter', sans-serif" }}>

            {/* Demo Banner */}
            <div style={{ background: 'linear-gradient(90deg, #C04B1E, #E05722)', padding: '10px 16px', textAlign: 'center', fontSize: '13px', fontWeight: 600, position: 'sticky', top: 0, zIndex: 100 }}>
                🚀 Bu, kepenk.ai ile oluşturulan örnek bir web sitesidir.&nbsp;
                <Link href="/onboarding" style={{ color: '#FFF', textDecoration: 'underline', marginLeft: 4 }}>
                    Sizin sitenizi oluşturalım →
                </Link>
            </div>

            {/* NAV */}
            <nav style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', background: 'rgba(10,9,8,0.8)', position: 'sticky', top: 40, zIndex: 90 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#C04B1E,#E8A028)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✂️</div>
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>{ISLETME.ad}</div>
                        <div style={{ fontSize: 11, color: '#8A7E70' }}>{ISLETME.sektor}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`tel:${ISLETME.telefon}`} style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', color: '#F4EFE8', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>📞 Ara</a>
                    <a href={`https://wa.me/${ISLETME.wa}?text=Randevu%20almak%20istiyorum`} target="_blank" rel="noreferrer" style={{ padding: '8px 16px', borderRadius: 10, background: '#25D366', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>💬 Randevu</a>
                </div>
            </nav>

            {/* HERO */}
            <section style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '64px 24px', position: 'relative', overflow: 'hidden' }}>
                {/* BG glow */}
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,75,30,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                {/* Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(192,75,30,0.12)', border: '1px solid rgba(192,75,30,0.3)', borderRadius: 99, padding: '6px 14px', fontSize: 12, color: '#E07040', fontWeight: 600, marginBottom: 28 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C04B1E', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                    Bugün Açık · Randevu Müsait
                </div>

                {/* Title */}
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 20, maxWidth: 760 }}>
                    {ISLETME.ad}
                    <br />
                    <span style={{ background: 'linear-gradient(135deg, #C04B1E, #E8A028)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {ISLETME.unvan}
                    </span>
                </h1>

                <p style={{ color: '#8A7E70', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', maxWidth: 520, lineHeight: 1.6, marginBottom: 40, fontStyle: 'italic' }}>
                    &ldquo;{ISLETME.slogan}&rdquo;
                </p>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 32, marginBottom: 44, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: '#E8A028' }}>⭐ {ISLETME.google}</div>
                        <div style={{ fontSize: 12, color: '#8A7E70' }}>{ISLETME.yorumSayisi} Google Yorumu</div>
                    </div>
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: '#C04B1E' }}>22+</div>
                        <div style={{ fontSize: 12, color: '#8A7E70' }}>Yıllık Deneyim</div>
                    </div>
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 28, fontWeight: 900, color: '#6BB89A' }}>7/24</div>
                        <div style={{ fontSize: 12, color: '#8A7E70' }}>WA Botu Aktif</div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href={`https://wa.me/${ISLETME.wa}?text=Merhaba%2C%20randevu%20almak%20istiyorum`} target="_blank" rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 0 32px rgba(37,211,102,0.25)' }}>
                        💬 WhatsApp ile Randevu Al
                    </a>
                    <a href={`tel:${ISLETME.telefon}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#F4EFE8', padding: '14px 28px', borderRadius: 14, fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>
                        📞 Hemen Ara
                    </a>
                </div>

                {/* Scroll indicator */}
                <div style={{ marginTop: 64, color: '#8A7E70', fontSize: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <span>Daha Fazlası</span>
                    <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
                </div>
            </section>

            {/* INFO BAR */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '28px 24px' }}>
                <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
                    <div>
                        <div style={{ fontSize: 11, color: '#8A7E70', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>📍 Adres</div>
                        <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.5 }}>{ISLETME.adres}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: '#8A7E70', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>⏰ Çalışma Saatleri</div>
                        {ISLETME.saatler.map(s => (
                            <div key={s.gun} style={{ fontSize: 14, lineHeight: 1.8 }}>
                                <span style={{ color: '#8A7E70' }}>{s.gun}:</span> <span style={{ fontWeight: 600 }}>{s.saat}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: '#8A7E70', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>📞 İletişim</div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{ISLETME.telefon}</div>
                        <div style={{ fontSize: 12, color: '#25D366', marginTop: 4 }}>WhatsApp Randevu Aktif ✓</div>
                    </div>
                </div>
            </div>

            {/* SERVICES */}
            <section style={{ padding: '80px 24px', maxWidth: 960, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <p style={{ fontSize: 12, color: '#C04B1E', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 12 }}>Fiyat Listesi</p>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>Hizmetlerimiz</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {ISLETME.hizmetler.map((h) => (
                        <div key={h.ad} style={{
                            padding: '20px 24px', borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            background: h.popular ? 'linear-gradient(135deg, rgba(192,75,30,0.15), rgba(232,160,40,0.08))' : 'rgba(255,255,255,0.04)',
                            border: h.popular ? '1px solid rgba(192,75,30,0.4)' : '1px solid rgba(255,255,255,0.07)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {h.popular && (
                                <div style={{ position: 'absolute', top: 10, right: 10, background: '#C04B1E', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>
                                    Favori
                                </div>
                            )}
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{h.ad}</div>
                                <div style={{ color: '#8A7E70', fontSize: 13 }}>⏱ {h.sure}</div>
                            </div>
                            <div style={{ fontWeight: 900, fontSize: 22, color: h.popular ? '#E8A028' : '#C04B1E' }}>{h.fiyat}</div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <a href={`https://wa.me/${ISLETME.wa}?text=Fiyat%20listesi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum`} target="_blank" rel="noreferrer"
                        style={{ display: 'inline-block', background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', padding: '12px 28px', borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                        💬 Tam Fiyat Listesi İçin WhatsApp
                    </a>
                </div>
            </section>

            {/* GALLERY (visual mood) */}
            <section style={{ padding: '20px 24px 80px', maxWidth: 960, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {ISLETME.galeri.map((g) => (
                        <div key={g.label} style={{ aspectRatio: '1', borderRadius: 16, background: 'linear-gradient(135deg, rgba(192,75,30,0.1), rgba(255,255,255,0.04))', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <div style={{ fontSize: 36 }}>{g.emoji}</div>
                            <div style={{ fontSize: 11, color: '#8A7E70', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{g.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* REVIEWS */}
            <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '80px 24px' }}>
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <p style={{ fontSize: 12, color: '#E8A028', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: 12 }}>⭐ {ISLETME.google} / 5.0</p>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900 }}>Müşterilerimiz Ne Diyor?</h2>
                        <p style={{ color: '#8A7E70', fontSize: 14, marginTop: 8 }}>{ISLETME.yorumSayisi} doğrulanmış Google yorumu</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                        {ISLETME.yorumlar.map((y) => (
                            <div key={y.ad} style={{ padding: '24px', borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#C04B1E,#E8A028)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>
                                            {y.ad.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 14 }}>{y.ad}</div>
                                            <div style={{ fontSize: 11, color: '#8A7E70' }}>{y.tarih}</div>
                                        </div>
                                    </div>
                                    <Stars count={y.puan} />
                                </div>
                                <p style={{ color: '#C2B9AD', fontSize: 14, lineHeight: 1.65, fontStyle: 'italic' }}>&ldquo;{y.metin}&rdquo;</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MAP PLACEHOLDER */}
            <section style={{ padding: '64px 24px' }}>
                <div style={{ maxWidth: 960, margin: '0 auto', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', padding: 40, textAlign: 'center' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
                    <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Bize Ulaşın</h3>
                    <p style={{ color: '#8A7E70', fontSize: 14, marginBottom: 24 }}>{ISLETME.adres}</p>
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(ISLETME.adres)}`} target="_blank" rel="noreferrer"
                        style={{ display: 'inline-block', background: '#C04B1E', color: '#fff', padding: '12px 28px', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                        Google Maps&apos;te Aç →
                    </a>
                </div>
            </section>

            {/* FLOATING WA BUTTON */}
            <a href={`https://wa.me/${ISLETME.wa}?text=Randevu%20almak%20istiyorum`} target="_blank" rel="noreferrer"
                style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200, width: 58, height: 58, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, boxShadow: '0 4px 24px rgba(37,211,102,0.5)', textDecoration: 'none' }}>
                💬
            </a>

            {/* FOOTER */}
            <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px', textAlign: 'center' }}>
                <p style={{ color: '#8A7E70', fontSize: 13, marginBottom: 6 }}>
                    Bu site <strong style={{ color: '#C04B1E' }}>kepenk.ai</strong> tarafından oluşturulmuştur.
                </p>
                <p style={{ color: '#5A5248', fontSize: 12, marginBottom: 20 }}>
                    © 2025 {ISLETME.ad} {ISLETME.unvan} · Tüm hakları saklıdır.
                </p>
                <Link href="/onboarding" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #C04B1E, #E8A028)', color: '#fff', padding: '12px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
                    🚀 Siz de kepenk.ai&apos;ya Katılın — 399₺/ay&apos;dan Başlayan Fiyatlarla
                </Link>
            </footer>
        </div>
    )
}
