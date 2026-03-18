'use client'

import { useState } from 'react'

export default function MobilUygulamaPage() {
    const [showQR, setShowQR] = useState(false)

    const features = [
        { emoji: '📱', title: 'Push Bildirimler', desc: 'Kampanya ve sipariş bildirimlerini anında gönderin', durum: 'aktif' },
        { emoji: '🛒', title: 'Mobil Sipariş', desc: 'Müşteriler telefondan sipariş verebilsin', durum: 'aktif' },
        { emoji: '📅', title: 'Randevu Sistemi', desc: 'Mobil uygulama üzerinden randevu alma', durum: 'aktif' },
        { emoji: '💳', title: 'Dijital Sadakat Kartı', desc: 'QR kod ile puan kazanma ve harcama', durum: 'yakin' },
        { emoji: '🗺️', title: 'Konum Tabanlı Bildirim', desc: 'Mağaza yakınındaki müşterilere bildirim', durum: 'yakin' },
        { emoji: '💬', title: 'Canlı Destek', desc: 'Uygulama içi müşteri desteği', durum: 'gelistirme' },
        { emoji: '🎮', title: 'Gamification', desc: 'Rozet ve ödül sistemi ile etkileşim', durum: 'gelistirme' },
        { emoji: '📊', title: 'Mobil Analitik', desc: 'Uygulama kullanım istatistikleri', durum: 'gelistirme' },
    ]

    const DURUM: Record<string, { l: string; bg: string; c: string }> = {
        aktif: { l: '✅ Aktif', bg: '#dcfce7', c: '#166534' },
        yakin: { l: '🔜 Yakında', bg: '#fef3c7', c: '#92400e' },
        gelistirme: { l: '🔧 Geliştirme', bg: '#f1f5f9', c: '#475569' },
    }

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>📱 Mobil Uygulama</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>İşletmeniz için PWA mobil uygulama oluşturun.</p>
                </div>
                <button onClick={() => setShowQR(true)} style={{ padding: '9px 18px', borderRadius: 10, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📲 QR Kod Oluştur</button>
            </div>

            {/* Status Card */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(59,130,246,0.06))',
                border: '1px solid rgba(34,197,94,0.2)', borderRadius: 16, padding: 20, marginBottom: 24,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>📱</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>PWA Uygulamanız Oluşturuldu!</div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Progressive Web App — iOS ve Android'de çalışır. App Store gerekmez.</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#22c55e' }}>✓</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Yayında</div>
                    </div>
                </div>
            </div>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Kurulum', value: '156', emoji: '📲' },
                    { label: 'Aktif Kullanıcı', value: '89', emoji: '👥' },
                    { label: 'Push İzni', value: '%72', emoji: '🔔' },
                    { label: 'Ort. Oturum', value: '3.2 dk', emoji: '⏱️' },
                ].map((k, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* App Preview */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>🎨 Uygulama Ayarları</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {[
                        { l: 'Uygulama Adı', v: 'İşletmem', icon: '📝' },
                        { l: 'Tema Rengi', v: '#dc4e1e', icon: '🎨' },
                        { l: 'Splash Screen', v: 'Aktif', icon: '🖼️' },
                    ].map((s, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{s.icon} {s.l}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{s.v}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>⚙️ Özellikler</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {features.map((f, i) => {
                    const d = DURUM[f.durum]
                    return (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: 22 }}>{f.emoji}</span>
                                <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: d.bg, color: d.c }}>{d.l}</span>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{f.title}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{f.desc}</div>
                        </div>
                    )
                })}
            </div>

            {/* QR Modal */}
            {showQR && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowQR(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 32, width: 340, border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>📲</div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 8 }}>QR Kod</h3>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Müşterileriniz bu QR kodu tarayarak uygulamanızı telefonlarına ekleyebilir.</p>
                        <div style={{ width: 180, height: 180, margin: '0 auto 16px', background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#333', fontWeight: 600 }}>
                            [QR Kod]
                        </div>
                        <button onClick={() => setShowQR(false)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Kapat</button>
                    </div>
                </div>
            )}
        </div>
    )
}
