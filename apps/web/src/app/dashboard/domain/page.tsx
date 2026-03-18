'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface Domain {
    id: string
    domain: string
    durum: 'aktif' | 'bekliyor' | 'hata' | 'ssl_bekliyor'
    ssl: boolean
    tur: 'ozel' | 'alt_domain'
    eklenme: string
}

/* ═══════ Demo Data ═══════ */
const DEMO_DOMAINS: Domain[] = [
    { id: '1', domain: 'isletmem.kepenk.ai', durum: 'aktif', ssl: true, tur: 'alt_domain', eklenme: '2026-01-15' },
]

/* ═══════ Page ═══════ */
export default function DomainYonetimiPage() {
    const [domains, setDomains] = useState<Domain[]>(DEMO_DOMAINS)
    const [showAddModal, setShowAddModal] = useState(false)
    const [newDomain, setNewDomain] = useState('')
    const [step, setStep] = useState<'input' | 'dns' | 'verifying'>('input')

    const handleAddDomain = () => {
        if (!newDomain.trim()) return
        const d: Domain = {
            id: `new-${Date.now()}`, domain: newDomain.trim(),
            durum: 'bekliyor', ssl: false, tur: 'ozel', eklenme: new Date().toISOString().split('T')[0],
        }
        setDomains(prev => [...prev, d])
        setStep('dns')
    }

    const handleVerify = () => {
        setStep('verifying')
        setTimeout(() => {
            setDomains(prev => prev.map(d => d.durum === 'bekliyor' ? { ...d, durum: 'ssl_bekliyor' as const } : d))
            setShowAddModal(false)
            setStep('input')
            setNewDomain('')
        }, 2000)
    }

    const DURUM_BADGE: Record<string, { l: string; bg: string; c: string; emoji: string }> = {
        aktif: { l: 'Aktif', bg: '#dcfce7', c: '#166534', emoji: '🟢' },
        bekliyor: { l: 'DNS Bekleniyor', bg: '#fef3c7', c: '#92400e', emoji: '⏳' },
        ssl_bekliyor: { l: 'SSL Kuruluyor', bg: '#dbeafe', c: '#1e40af', emoji: '🔒' },
        hata: { l: 'Hata', bg: '#fee2e2', c: '#991b1b', emoji: '❌' },
    }

    return (
        <div style={{ maxWidth: 800 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>🌐 Domain Yönetimi</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Özel domain bağlayın veya alt domain kullanın.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} style={{
                    padding: '9px 18px', borderRadius: 10, border: 'none',
                    background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                }}>+ Domain Bağla</button>
            </div>

            {/* DNS Setup Guide */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(168,85,247,0.04))',
                border: '1px solid rgba(59,130,246,0.15)', borderRadius: 14, padding: 18, marginBottom: 20,
            }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 8 }}>📋 Domain Nasıl Bağlanır?</div>
                <div style={{ display: 'flex', gap: 12 }}>
                    {['1️⃣ Domain Ekle', '2️⃣ DNS Kayıtlarını Güncelle', '3️⃣ SSL Otomatik Kurulur', '4️⃣ Site Yayında!'].map((s, i) => (
                        <div key={i} style={{
                            flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px',
                            border: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'rgba(255,255,255,0.6)',
                            fontWeight: 600, textAlign: 'center',
                        }}>{s}</div>
                    ))}
                </div>
            </div>

            {/* Domain List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {domains.map(d => {
                    const badge = DURUM_BADGE[d.durum]
                    return (
                        <div key={d.id} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14,
                        }}>
                            <div style={{
                                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                                background: d.tur === 'ozel' ? 'rgba(168,85,247,0.1)' : 'rgba(59,130,246,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                            }}>{d.tur === 'ozel' ? '🌍' : '🔗'}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 15, fontWeight: 800, color: 'white', marginBottom: 2 }}>{d.domain}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 8 }}>
                                    <span>{d.tur === 'ozel' ? 'Özel Domain' : 'Alt Domain'}</span>
                                    <span>{d.ssl ? '🔒 SSL Aktif' : '⚠️ SSL Yok'}</span>
                                    <span>Eklendi: {new Date(d.eklenme).toLocaleDateString('tr')}</span>
                                </div>
                            </div>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: badge.bg, color: badge.c }}>{badge.emoji} {badge.l}</span>
                        </div>
                    )
                })}
            </div>

            {/* Add Domain Modal */}
            {showAddModal && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => { setShowAddModal(false); setStep('input') }}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 480, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>

                        {step === 'input' && (<>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 16 }}>🌐 Özel Domain Bağla</h3>
                            <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Domain Adı</label>
                            <input value={newDomain} onChange={e => setNewDomain(e.target.value)} placeholder="ornek.com"
                                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 14, fontFamily: 'inherit', marginTop: 6, marginBottom: 16, outline: 'none', boxSizing: 'border-box' }} />
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                                <button onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
                                <button onClick={handleAddDomain} disabled={!newDomain.trim()} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Devam →</button>
                            </div>
                        </>)}

                        {step === 'dns' && (<>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 12 }}>📋 DNS Kayıtlarını Güncelleyin</h3>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Domain sağlayıcınızda aşağıdaki DNS kayıtlarını ekleyin:</p>
                            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 14, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16, fontFamily: 'monospace', fontSize: 12 }}>
                                <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                                    <span style={{ color: '#22c55e', fontWeight: 700 }}>A</span> {"   "}@ → 76.76.21.21
                                </div>
                                <div style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    <span style={{ color: '#3b82f6', fontWeight: 700 }}>CNAME</span> www → cname.kepenk.ai
                                </div>
                            </div>
                            <button onClick={handleVerify} style={{ width: '100%', padding: '10px 0', borderRadius: 10, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🔍 DNS Doğrula</button>
                        </>)}

                        {step === 'verifying' && (
                            <div style={{ textAlign: 'center', padding: 30 }}>
                                <div style={{ fontSize: 36, marginBottom: 12 }}>🔄</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>DNS doğrulanıyor...</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>Bu işlem birkaç dakika sürebilir.</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
