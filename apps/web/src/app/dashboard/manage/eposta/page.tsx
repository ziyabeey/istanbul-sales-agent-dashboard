'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface EmailTemplate {
    id: string
    ad: string
    kategori: 'promosyon' | 'bildirim' | 'hosgeldin' | 'siparis' | 'ozel'
    onizleme: string
    kullanilma: number
}

interface EmailList {
    id: string
    ad: string
    kisiSayisi: number
    kaynak: string
}

const KAT_CONFIG: Record<string, { emoji: string; label: string; color: string }> = {
    promosyon: { emoji: '🏷️', label: 'Promosyon', color: '#f97316' },
    bildirim: { emoji: '🔔', label: 'Bildirim', color: '#3b82f6' },
    hosgeldin: { emoji: '👋', label: 'Hoş Geldin', color: '#22c55e' },
    siparis: { emoji: '📦', label: 'Sipariş', color: '#8b5cf6' },
    ozel: { emoji: '✨', label: 'Özel', color: '#ec4899' },
}

const TEMPLATES: EmailTemplate[] = [
    { id: '1', ad: 'İndirim Kampanyası', kategori: 'promosyon', onizleme: 'Sınırlı süre! %30 indirim fırsatı...', kullanilma: 45 },
    { id: '2', ad: 'Yeni Üye Hoş Geldin', kategori: 'hosgeldin', onizleme: 'Aramıza hoş geldiniz! İşte size özel...', kullanilma: 120 },
    { id: '3', ad: 'Sipariş Onayı', kategori: 'siparis', onizleme: 'Siparişiniz alındı! Sipariş No: ...', kullanilma: 230 },
    { id: '4', ad: 'Haftalık Bülten', kategori: 'bildirim', onizleme: 'Bu haftanın haberleri ve önerileri...', kullanilma: 89 },
    { id: '5', ad: 'Doğum Günü Tebrik', kategori: 'ozel', onizleme: 'İyi ki doğdunuz! Size özel hediye...', kullanilma: 34 },
]

const LISTS: EmailList[] = [
    { id: '1', ad: 'Tüm Aboneler', kisiSayisi: 245, kaynak: 'Otomatik' },
    { id: '2', ad: 'VIP Müşteriler', kisiSayisi: 18, kaynak: 'CRM Segmenti' },
    { id: '3', ad: 'Yeni Kayıtlar (30 gün)', kisiSayisi: 42, kaynak: 'İletişim Formu' },
    { id: '4', ad: 'Pasif Müşteriler', kisiSayisi: 31, kaynak: 'Otomatik' },
]

export default function EpostaBuilderPage() {
    const [showCreate, setShowCreate] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
    const [subject, setSubject] = useState('')
    const [selectedList, setSelectedList] = useState('')

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>📧 E-posta Stüdyo</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Şablonlarla e-posta oluşturun ve gönderin.</p>
                </div>
                <button onClick={() => setShowCreate(true)} style={{ padding: '9px 18px', borderRadius: 10, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ E-posta Oluştur</button>
            </div>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Şablon', value: TEMPLATES.length, emoji: '📋' },
                    { label: 'Liste', value: LISTS.length, emoji: '📬' },
                    { label: 'Toplam Abone', value: 245, emoji: '👥' },
                    { label: 'Gönderim / Ay', value: '32 / 200', emoji: '📤' },
                ].map((k, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Mailing Lists */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>📬 E-posta Listeleri</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {LISTS.map(l => (
                        <div key={l.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 2 }}>{l.ad}</div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: '#dc4e1e' }}>{l.kisiSayisi}</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{l.kaynak}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Templates */}
            <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>📋 E-posta Şablonları</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {TEMPLATES.map(t => {
                    const kc = KAT_CONFIG[t.kategori]
                    return (
                        <div key={t.id} onClick={() => { setSelectedTemplate(t); setShowCreate(true) }} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                        }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `${kc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{kc.emoji}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{t.ad}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{t.onizleme}</div>
                            </div>
                            <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: `${kc.color}15`, color: kc.color }}>{kc.label}</span>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{t.kullanilma}× kullanıldı</span>
                        </div>
                    )
                })}
            </div>

            {/* Create/Send Modal */}
            {showCreate && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => { setShowCreate(false); setSelectedTemplate(null) }}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 480, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>📧 {selectedTemplate ? selectedTemplate.ad : 'Yeni E-posta'}</h3>
                        {selectedTemplate && <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>{selectedTemplate.onizleme}</p>}

                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Konu Satırı</label>
                        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="E-posta konu satırı..."
                            style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit', marginTop: 4, marginBottom: 14, outline: 'none', boxSizing: 'border-box' }} />

                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Gönderilecek Liste</label>
                        <select value={selectedList} onChange={e => setSelectedList(e.target.value)}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit', marginTop: 4, marginBottom: 16, outline: 'none' }}>
                            <option value="">Liste seçin...</option>
                            {LISTS.map(l => <option key={l.id} value={l.id}>{l.ad} ({l.kisiSayisi} kişi)</option>)}
                        </select>

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => { setShowCreate(false); setSelectedTemplate(null) }} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
                            <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📤 Gönder</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
