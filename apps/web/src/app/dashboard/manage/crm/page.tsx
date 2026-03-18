'use client'

import { useState, useEffect } from 'react'
import { useEsnaf } from '@/context/EsnafContext'

/* ═══════ Types ═══════ */
interface Customer {
    id: string
    ad: string
    email: string
    telefon: string
    toplam_harcama: number
    siparis_sayisi: number
    son_siparis: string | null
    etiketler: string[]
    notlar: string
    kaynak: 'form' | 'whatsapp' | 'siparis' | 'manuel' | 'reklam'
    durum: 'musteri' | 'lead' | 'kaybedilen'
    createdAt: string
}

type TabView = 'all' | 'musteri' | 'lead' | 'kaybedilen'

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
    VIP: { bg: '#fef3c7', color: '#92400e' },
    'Düzenli': { bg: '#dcfce7', color: '#166534' },
    'Yeni': { bg: '#dbeafe', color: '#1e40af' },
    'Kayıp Risk': { bg: '#fee2e2', color: '#991b1b' },
    'Sadık': { bg: '#d1fae5', color: '#065f46' },
}

const SOURCE_EMOJI: Record<string, string> = {
    form: '📋', whatsapp: '💬', siparis: '🛒', manuel: '✏️', reklam: '📢',
}

/* ═══════ Demo Data ═══════ */
const DEMO_CUSTOMERS: Customer[] = [
    { id: '1', ad: 'Ahmet Yılmaz', email: 'ahmet@email.com', telefon: '0532 123 45 67', toplam_harcama: 2450, siparis_sayisi: 8, son_siparis: '2026-03-10', etiketler: ['VIP', 'Düzenli'], notlar: 'Hep aynı ürünü alıyor', kaynak: 'siparis', durum: 'musteri', createdAt: '2025-06-15' },
    { id: '2', ad: 'Fatma Kaya', email: 'fatma@email.com', telefon: '0542 987 65 43', toplam_harcama: 1200, siparis_sayisi: 4, son_siparis: '2026-02-28', etiketler: ['Düzenli'], notlar: '', kaynak: 'whatsapp', durum: 'musteri', createdAt: '2025-09-20' },
    { id: '3', ad: 'Kaan Çoban', email: 'kaan@gmail.com', telefon: '0555 111 22 33', toplam_harcama: 0, siparis_sayisi: 0, son_siparis: null, etiketler: ['Yeni'], notlar: 'İletişim formundan geldi', kaynak: 'form', durum: 'lead', createdAt: '2026-03-12' },
    { id: '4', ad: 'Zeynep Aktaş', email: 'zeynep@outlook.com', telefon: '0533 444 55 66', toplam_harcama: 450, siparis_sayisi: 2, son_siparis: '2025-12-15', etiketler: ['Kayıp Risk'], notlar: '3 aydır sipariş vermedi', kaynak: 'reklam', durum: 'musteri', createdAt: '2025-08-01' },
    { id: '5', ad: 'Mehmet Demir', email: 'mehmet@test.com', telefon: '0544 666 77 88', toplam_harcama: 0, siparis_sayisi: 0, son_siparis: null, etiketler: [], notlar: 'WhatsApp\'tan fiyat sordu', kaynak: 'whatsapp', durum: 'lead', createdAt: '2026-03-15' },
    { id: '6', ad: 'Ayşe Yıldız', email: 'ayse@mail.com', telefon: '0530 222 33 44', toplam_harcama: 3800, siparis_sayisi: 12, son_siparis: '2026-03-14', etiketler: ['VIP', 'Sadık'], notlar: 'En değerli müşteri', kaynak: 'siparis', durum: 'musteri', createdAt: '2025-03-10' },
    { id: '7', ad: 'Ali Özcan', email: 'ali@email.com', telefon: '0546 999 88 77', toplam_harcama: 150, siparis_sayisi: 1, son_siparis: '2025-10-20', etiketler: ['Kayıp Risk'], notlar: 'Tek sipariş verdi, geri gelmedi', kaynak: 'siparis', durum: 'kaybedilen', createdAt: '2025-10-15' },
]

/* ═══════ CRM Page ═══════ */
export default function CrmPage() {
    const { esnafId } = useEsnaf()
    const [customers, setCustomers] = useState<Customer[]>(DEMO_CUSTOMERS)
    const [activeTab, setActiveTab] = useState<TabView>('all')
    const [search, setSearch] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [newCustomer, setNewCustomer] = useState({ ad: '', email: '', telefon: '' })

    const filtered = customers
        .filter(c => activeTab === 'all' ? true : c.durum === activeTab)
        .filter(c => !search || c.ad.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))

    const musteriCount = customers.filter(c => c.durum === 'musteri').length
    const leadCount = customers.filter(c => c.durum === 'lead').length
    const toplamHarcama = customers.reduce((s, c) => s + c.toplam_harcama, 0)
    const vipCount = customers.filter(c => c.etiketler.includes('VIP')).length

    const handleAddCustomer = () => {
        if (!newCustomer.ad.trim()) return
        const c: Customer = {
            id: `new-${Date.now()}`, ad: newCustomer.ad, email: newCustomer.email, telefon: newCustomer.telefon,
            toplam_harcama: 0, siparis_sayisi: 0, son_siparis: null, etiketler: ['Yeni'],
            notlar: '', kaynak: 'manuel', durum: 'lead', createdAt: new Date().toISOString(),
        }
        setCustomers(prev => [c, ...prev])
        setNewCustomer({ ad: '', email: '', telefon: '' })
        setShowAddModal(false)
    }

    const handleToggleTag = (customerId: string, tag: string) => {
        setCustomers(prev => prev.map(c => {
            if (c.id !== customerId) return c
            const tags = c.etiketler.includes(tag) ? c.etiketler.filter(t => t !== tag) : [...c.etiketler, tag]
            return { ...c, etiketler: tags }
        }))
        if (selectedCustomer?.id === customerId) {
            setSelectedCustomer(prev => prev ? {
                ...prev,
                etiketler: prev.etiketler.includes(tag) ? prev.etiketler.filter(t => t !== tag) : [...prev.etiketler, tag]
            } : null)
        }
    }

    const handleConvertToCustomer = (id: string) => {
        setCustomers(prev => prev.map(c => c.id === id ? { ...c, durum: 'musteri' as const } : c))
        if (selectedCustomer?.id === id) setSelectedCustomer(prev => prev ? { ...prev, durum: 'musteri' } : null)
    }

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>👥 CRM — Müşteri Yönetimi</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Müşterilerinizi ve potansiyel müşterileri yönetin.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} style={{
                    padding: '9px 18px', borderRadius: 10, border: 'none',
                    background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                }}>+ Yeni Kişi</button>
            </div>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Toplam Kişi', value: customers.length, emoji: '👥' },
                    { label: 'Müşteri', value: musteriCount, emoji: '🟢' },
                    { label: 'Lead', value: leadCount, emoji: '🔵' },
                    { label: 'Toplam Ciro', value: `₺${toplamHarcama.toLocaleString()}`, emoji: '💰' },
                ].map((k, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 12, padding: '14px 16px',
                    }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Search + Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 İsim veya e-posta ara..."
                    style={{
                        flex: 1, padding: '8px 14px', borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)',
                        color: 'white', fontSize: 13, fontFamily: 'inherit', outline: 'none',
                    }} />
                <div style={{ display: 'flex', gap: 3 }}>
                    {([['all', 'Tümü'], ['musteri', '🟢 Müşteri'], ['lead', '🔵 Lead'], ['kaybedilen', '🔴 Kayıp']] as const).map(([key, label]) => (
                        <button key={key} onClick={() => setActiveTab(key)} style={{
                            padding: '6px 12px', borderRadius: 7, border: 'none',
                            background: activeTab === key ? 'rgba(220,70,30,0.15)' : 'transparent',
                            color: activeTab === key ? '#f97316' : 'rgba(255,255,255,0.35)',
                            fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                        }}>{label}</button>
                    ))}
                </div>
            </div>

            {/* Lead Pipeline (only when lead tab active) */}
            {activeTab === 'lead' && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(168,85,247,0.04))',
                    border: '1px solid rgba(59,130,246,0.15)', borderRadius: 14, padding: 16, marginBottom: 16,
                }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 10 }}>📊 Lead Pipeline</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {['İlk Temas', 'Teklif Gönderildi', 'Değerlendirme', 'Dönüşüm'].map((stage, i) => (
                            <div key={i} style={{
                                flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px',
                                border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center',
                            }}>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 4 }}>{stage}</div>
                                <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{i === 0 ? leadCount : 0}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Customer List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.02)', borderRadius: 14 }}>
                        Kişi bulunamadı
                    </div>
                ) : filtered.map(c => {
                    const durumBadge = c.durum === 'musteri' ? { l: 'Müşteri', bg: '#dcfce7', c: '#166534' } : c.durum === 'lead' ? { l: 'Lead', bg: '#dbeafe', c: '#1e40af' } : { l: 'Kayıp', bg: '#fee2e2', c: '#991b1b' }
                    return (
                        <div key={c.id} onClick={() => setSelectedCustomer(c)} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '14px 16px', cursor: 'pointer', transition: '0.15s',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            {/* Avatar */}
                            <div style={{
                                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                                background: c.durum === 'musteri' ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 14, fontWeight: 800, color: c.durum === 'musteri' ? '#22c55e' : '#3b82f6',
                            }}>{c.ad.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 2 }}>{c.ad}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    <span>{c.email}</span>
                                    {c.son_siparis && <span>Son: {new Date(c.son_siparis).toLocaleDateString('tr')}</span>}
                                    <span>{SOURCE_EMOJI[c.kaynak]} {c.kaynak}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                                {c.etiketler.slice(0, 2).map(tag => {
                                    const tc = TAG_COLORS[tag] || { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }
                                    return <span key={tag} style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: tc.bg, color: tc.color }}>{tag}</span>
                                })}
                            </div>

                            {/* Status */}
                            <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: durumBadge.bg, color: durumBadge.c, flexShrink: 0 }}>{durumBadge.l}</span>

                            {/* Revenue */}
                            {c.toplam_harcama > 0 && (
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', flexShrink: 0 }}>₺{c.toplam_harcama.toLocaleString()}</span>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* ═══════ Customer Detail Drawer ═══════ */}
            {selectedCustomer && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setSelectedCustomer(null)}>
                    <div style={{
                        position: 'absolute', right: 0, top: 0, bottom: 0, width: 440, maxWidth: '90vw',
                        background: '#0a0a12', borderLeft: '1px solid rgba(255,255,255,0.08)', overflowY: 'auto',
                        animation: 'slideInRight 0.2s ease-out',
                    }} onClick={e => e.stopPropagation()}>
                        <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

                        {/* Header */}
                        <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: '50%',
                                        background: 'rgba(220,70,30,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 18, fontWeight: 800, color: '#dc4e1e',
                                    }}>{selectedCustomer.ad.split(' ').map(w => w[0]).join('').slice(0, 2)}</div>
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{selectedCustomer.ad}</div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{selectedCustomer.email}</div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedCustomer(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>✕</button>
                            </div>

                            {/* Contact actions */}
                            <div style={{ display: 'flex', gap: 6 }}>
                                <a href={`https://wa.me/${selectedCustomer.telefon.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" style={{
                                    flex: 1, padding: '8px 0', borderRadius: 8, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)',
                                    color: '#25d366', fontSize: 12, fontWeight: 700, textDecoration: 'none', textAlign: 'center',
                                }}>💬 WhatsApp</a>
                                <a href={`mailto:${selectedCustomer.email}`} style={{
                                    flex: 1, padding: '8px 0', borderRadius: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                                    color: '#3b82f6', fontSize: 12, fontWeight: 700, textDecoration: 'none', textAlign: 'center',
                                }}>📧 E-posta</a>
                                <a href={`tel:${selectedCustomer.telefon}`} style={{
                                    flex: 1, padding: '8px 0', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, textDecoration: 'none', textAlign: 'center',
                                }}>📞 Ara</a>
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                            {[
                                { l: 'Toplam Harcama', v: `₺${selectedCustomer.toplam_harcama.toLocaleString()}` },
                                { l: 'Sipariş Sayısı', v: selectedCustomer.siparis_sayisi },
                                { l: 'Son Sipariş', v: selectedCustomer.son_siparis ? new Date(selectedCustomer.son_siparis).toLocaleDateString('tr') : '—' },
                                { l: 'Kaynak', v: `${SOURCE_EMOJI[selectedCustomer.kaynak]} ${selectedCustomer.kaynak}` },
                            ].map((s, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginBottom: 4 }}>{s.l}</div>
                                    <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>{s.v}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tags */}
                        <div style={{ padding: '0 24px 16px' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>ETİKETLER</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {Object.keys(TAG_COLORS).map(tag => {
                                    const active = selectedCustomer.etiketler.includes(tag)
                                    const tc = TAG_COLORS[tag]
                                    return (
                                        <button key={tag} onClick={() => handleToggleTag(selectedCustomer.id, tag)} style={{
                                            padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                            border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                            background: active ? tc.bg : 'transparent',
                                            color: active ? tc.color : 'rgba(255,255,255,0.3)',
                                        }}>{active ? '✓ ' : ''}{tag}</button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Notes */}
                        <div style={{ padding: '0 24px 16px' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>NOTLAR</div>
                            <div style={{
                                padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.06)', fontSize: 13, color: 'rgba(255,255,255,0.6)',
                                minHeight: 60, lineHeight: 1.5,
                            }}>
                                {selectedCustomer.notlar || 'Henüz not eklenmemiş.'}
                            </div>
                        </div>

                        {/* Convert to customer (for leads) */}
                        {selectedCustomer.durum === 'lead' && (
                            <div style={{ padding: '0 24px 24px' }}>
                                <button onClick={() => handleConvertToCustomer(selectedCustomer.id)} style={{
                                    width: '100%', padding: '10px 0', borderRadius: 10, border: 'none',
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white',
                                    fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                }}>🎉 Müşteriye Dönüştür</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ═══════ Add Customer Modal ═══════ */}
            {showAddModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setShowAddModal(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 400, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 16 }}>+ Yeni Kişi Ekle</h3>
                        {(['ad', 'email', 'telefon'] as const).map(field => (
                            <div key={field} style={{ marginBottom: 12 }}>
                                <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                                    {field === 'ad' ? 'Ad Soyad' : field === 'email' ? 'E-posta' : 'Telefon'}
                                </label>
                                <input value={newCustomer[field]} onChange={e => setNewCustomer(prev => ({ ...prev, [field]: e.target.value }))}
                                    style={{
                                        width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 13, fontFamily: 'inherit',
                                        marginTop: 4, outline: 'none', boxSizing: 'border-box',
                                    }} />
                            </div>
                        ))}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
                            <button onClick={() => setShowAddModal(false)} style={{
                                padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                            }}>İptal</button>
                            <button onClick={handleAddCustomer} disabled={!newCustomer.ad.trim()} style={{
                                padding: '8px 16px', borderRadius: 8, border: 'none', background: '#dc4e1e',
                                color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                            }}>Ekle</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
