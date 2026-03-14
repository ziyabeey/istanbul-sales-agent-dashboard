'use client'

import { useState } from 'react'

const CONTACTS = [
    { id: '1', name: 'Ahmet Yılmaz', avatar: 'AY', email: 'ahmet@email.com', phone: '0532 123 45 67', status: 'ABONE' },
    { id: '2', name: 'Fatma Kaya', avatar: 'FK', email: 'fatma@email.com', phone: '0542 987 65 43', status: 'ABONE' },
    { id: '3', name: 'Kaan Çoban', avatar: 'KÇ', email: 'kaancoban73@gmail.com', phone: '-', status: 'ABONELİK BEKLEMEDE' },
    { id: '4', name: 'Mehmet Demir', avatar: 'MD', email: 'mehmet@outlook.com', phone: '0555 111 22 33', status: 'HİÇ ABONE OLMAMIŞ' },
    { id: '5', name: 'Zeynep Aktaş', avatar: 'ZA', email: 'zeynep@gmail.com', phone: '0533 444 55 66', status: 'ABONE' },
]

export default function CrmPage() {
    const [selected, setSelected] = useState<string[]>([])

    return (
        <div className="kpnk-main">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Kişiler</h1>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)', border: 'none', padding: '7px 16px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>İçe Aktar</button>
                    <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)', border: 'none', padding: '7px 16px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Segmentleri Yönet</button>
                    <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '7px 20px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Yeni Kişi</button>
                </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 16 }}>{CONTACTS.length} kişi · 3 site üyesi</p>

            {/* Onboarding */}
            <div style={{ background: 'var(--kpnk-bg-secondary)', border: '1px solid var(--kpnk-border)', borderRadius: 10, padding: 18, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 28 }}>👥</span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Kişilerinizi Tanıyın</div>
                    <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>Otomatik segmentasyon ile müşterilerinizi gruplara ayırın ve hedefli kampanyalar oluşturun.</div>
                </div>
                <button style={{ fontSize: 12, fontWeight: 700, color: 'var(--kpnk-primary)', background: '#fff', border: '1px solid var(--kpnk-primary)', padding: '7px 16px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)', whiteSpace: 'nowrap' }}>Nasıl Çalışır?</button>
            </div>

            {/* Table */}
            <div className="kpnk-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ borderBottom: '1px solid var(--kpnk-border)', background: 'var(--kpnk-bg-secondary)' }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left', width: 30 }}><input type="checkbox" /></th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Ad</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>E-posta</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Telefon</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Abonelik</th>
                    </tr></thead>
                    <tbody>
                        {CONTACTS.map(c => (
                            <tr key={c.id} style={{ borderBottom: '1px solid var(--kpnk-border-light)', cursor: 'pointer' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--kpnk-bg-secondary)')}
                                onMouseLeave={e => (e.currentTarget.style.background = '')}>
                                <td style={{ padding: '12px 14px' }}><input type="checkbox" /></td>
                                <td style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E8F0FE', color: 'var(--kpnk-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{c.avatar}</div>
                                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                                </td>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)' }}>{c.email}</td>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)' }}>{c.phone}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{
                                        fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 10,
                                        background: c.status === 'ABONE' ? '#E8F8EF' : c.status === 'ABONELİK BEKLEMEDE' ? '#FFF8E6' : '#F5F5F5',
                                        color: c.status === 'ABONE' ? '#1A7F37' : c.status === 'ABONELİK BEKLEMEDE' ? '#9A6700' : '#868686'
                                    }}>{c.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
