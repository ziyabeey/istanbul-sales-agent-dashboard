'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface AIEvent {
    id: string
    tur: 'blog' | 'editor' | 'icerik' | 'seo' | 'chatbot' | 'analiz'
    islem: string
    token: number
    tarih: string
    durum: 'basarili' | 'hata' | 'isleniyor'
}

interface AIUsageSummary {
    modul: string
    emoji: string
    toplamIslem: number
    toplamToken: number
    basariOrani: number
}

const AI_EVENTS: AIEvent[] = [
    { id: '1', tur: 'blog', islem: 'Blog yazısı oluşturuldu: "Su Arıtma Rehberi"', token: 1250, tarih: '2026-03-17T14:30:00', durum: 'basarili' },
    { id: '2', tur: 'editor', islem: 'Site renk paleti değiştirildi', token: 3, tarih: '2026-03-17T13:15:00', durum: 'basarili' },
    { id: '3', tur: 'icerik', islem: 'Instagram postu oluşturuldu', token: 450, tarih: '2026-03-17T12:00:00', durum: 'basarili' },
    { id: '4', tur: 'seo', islem: 'SEO meta description optimize edildi', token: 180, tarih: '2026-03-16T16:45:00', durum: 'basarili' },
    { id: '5', tur: 'chatbot', islem: 'Müşteri sorusu yanıtlandı', token: 320, tarih: '2026-03-16T15:30:00', durum: 'basarili' },
    { id: '6', tur: 'analiz', islem: 'Haftalık performans raporu oluşturuldu', token: 800, tarih: '2026-03-16T10:00:00', durum: 'basarili' },
    { id: '7', tur: 'blog', islem: 'AI konu önerisi: 3 başlık analiz edildi', token: 200, tarih: '2026-03-15T14:00:00', durum: 'basarili' },
    { id: '8', tur: 'editor', islem: 'Font değişikliği: Poppins → Inter', token: 2, tarih: '2026-03-15T11:20:00', durum: 'basarili' },
    { id: '9', tur: 'icerik', islem: 'Reklam metni oluşturuldu', token: 380, tarih: '2026-03-14T09:00:00', durum: 'hata' },
    { id: '10', tur: 'chatbot', islem: 'Canlı chat konuşması — 3 mesaj', token: 150, tarih: '2026-03-14T18:30:00', durum: 'basarili' },
]

const MODULE_SUMMARY: AIUsageSummary[] = [
    { modul: 'Blog Motoru', emoji: '📝', toplamIslem: 24, toplamToken: 18500, basariOrani: 96 },
    { modul: 'İçerik Stüdyo', emoji: '🎨', toplamIslem: 38, toplamToken: 14200, basariOrani: 92 },
    { modul: 'AI Editör', emoji: '✨', toplamIslem: 56, toplamToken: 280, basariOrani: 100 },
    { modul: 'SEO Optimizer', emoji: '🔍', toplamIslem: 12, toplamToken: 3600, basariOrani: 100 },
    { modul: 'AI Chatbot', emoji: '🤖', toplamIslem: 142, toplamToken: 28400, basariOrani: 98 },
    { modul: 'Analiz & Rapor', emoji: '📊', toplamIslem: 8, toplamToken: 6400, basariOrani: 100 },
]

const TUR_CONFIG: Record<string, { emoji: string; color: string }> = {
    blog: { emoji: '📝', color: '#3b82f6' },
    editor: { emoji: '✨', color: '#8b5cf6' },
    icerik: { emoji: '🎨', color: '#ec4899' },
    seo: { emoji: '🔍', color: '#22c55e' },
    chatbot: { emoji: '🤖', color: '#f59e0b' },
    analiz: { emoji: '📊', color: '#06b6d4' },
}

export default function AITrackingPage() {
    const [period, setPeriod] = useState<'bugun' | 'hafta' | 'ay'>('hafta')

    const toplamToken = MODULE_SUMMARY.reduce((s, m) => s + m.toplamToken, 0)
    const toplamIslem = MODULE_SUMMARY.reduce((s, m) => s + m.toplamIslem, 0)
    const tokenLimit = 100000
    const tokenKullanim = Math.round((toplamToken / tokenLimit) * 100)

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>🧠 AI Tracking & Analytics</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>AI kullanım metrikleri, token tüketimi ve modül performansı.</p>
                </div>
                <select value={period} onChange={e => setPeriod(e.target.value as any)} style={{
                    padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'inherit', outline: 'none',
                }}>
                    <option value="bugun">Bugün</option>
                    <option value="hafta">Bu Hafta</option>
                    <option value="ay">Bu Ay</option>
                </select>
            </div>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Toplam İşlem', value: toplamIslem, emoji: '⚡' },
                    { label: 'Token Kullanımı', value: toplamToken.toLocaleString(), emoji: '🔢' },
                    { label: 'Modül', value: MODULE_SUMMARY.length, emoji: '📦' },
                    { label: 'Başarı Oranı', value: '%97', emoji: '✅' },
                ].map((k, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Token Usage Bar */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>🔋 Token Bütçesi</div>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{toplamToken.toLocaleString()} / {tokenLimit.toLocaleString()}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${tokenKullanim}%`, borderRadius: 4, background: tokenKullanim < 60 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : tokenKullanim < 85 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #ef4444, #dc2626)', transition: '0.3s' }} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>%{tokenKullanim} kullanıldı · {(tokenLimit - toplamToken).toLocaleString()} token kaldı</div>
            </div>

            {/* Module Performance */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>📦 Modül Performansı</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {MODULE_SUMMARY.map((m, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ fontSize: 22, marginBottom: 4 }}>{m.emoji}</div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'white', marginBottom: 6 }}>{m.modul}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
                                <span>⚡ {m.toplamIslem} işlem</span>
                                <span>🔢 {m.toplamToken.toLocaleString()} token</span>
                            </div>
                            <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', marginTop: 6, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${m.basariOrani}%`, borderRadius: 2, background: m.basariOrani > 95 ? '#22c55e' : '#f59e0b' }} />
                            </div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 2, textAlign: 'right' }}>%{m.basariOrani} başarı</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Event Log */}
            <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 10 }}>📋 Son AI İşlemleri</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {AI_EVENTS.map(e => {
                    const tc = TUR_CONFIG[e.tur]
                    const durumBadge = e.durum === 'basarili' ? { l: '✅', bg: '#dcfce7', c: '#166534' } : e.durum === 'hata' ? { l: '❌', bg: '#fee2e2', c: '#991b1b' } : { l: '🔄', bg: '#dbeafe', c: '#1e40af' }
                    return (
                        <div key={e.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: `${tc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{tc.emoji}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.islem}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{new Date(e.tarih).toLocaleString('tr')}</div>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>🔢 {e.token}</span>
                            <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: durumBadge.bg, color: durumBadge.c, flexShrink: 0 }}>{durumBadge.l}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
