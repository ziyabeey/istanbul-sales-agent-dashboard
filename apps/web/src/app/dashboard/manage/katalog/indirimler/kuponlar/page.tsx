'use client'

import { useState } from 'react'

export default function KuponlarPage() {
    const [showModal, setShowModal] = useState(false)
    const [coupons] = useState([
        { id: '1', code: 'ILK10', name: 'İLK ALIŞVERİŞ', discount: '%10', type: '% İndirim', usage: '3/100', status: 'Aktif' },
        { id: '2', code: 'YAZ25', name: 'YAZ KAMPANYASI', discount: '%25', type: '% İndirim', usage: '0/50', status: 'Aktif' },
        { id: '3', code: 'KARGO0', name: 'Ücretsiz Kargo', discount: '-', type: 'Ücretsiz Kargo', usage: '12/∞', status: 'Süresi dolmuş' },
    ])

    return (
        <div className="kpnk-main">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>Kuponlar</h1>
                <button onClick={() => setShowModal(true)} style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '8px 20px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>+ Yeni Kupon</button>
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {['Tümü', 'Aktif', 'Süresi dolmuş'].map(f => (
                    <button key={f} className="kpnk-tab active" style={{ fontSize: 12 }}>{f}</button>
                ))}
            </div>

            {/* Table */}
            <div className="kpnk-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ borderBottom: '1px solid var(--kpnk-border)', background: 'var(--kpnk-bg-secondary)' }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Ad</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>İndirim</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Tür</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Kod</th>
                        <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 600 }}>Kullanım</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Durum</th>
                    </tr></thead>
                    <tbody>
                        {coupons.map(c => (
                            <tr key={c.id} style={{ borderBottom: '1px solid var(--kpnk-border-light)', cursor: 'pointer' }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'var(--kpnk-bg-secondary)')}
                                onMouseLeave={e => (e.currentTarget.style.background = '')}>
                                <td style={{ padding: '12px 14px', fontWeight: 600 }}>{c.name}</td>
                                <td style={{ padding: '12px 14px', fontWeight: 700, color: 'var(--kpnk-success)' }}>{c.discount}</td>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)' }}>{c.type}</td>
                                <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 12, color: 'var(--kpnk-primary)' }}>{c.code}</td>
                                <td style={{ padding: '12px 14px', textAlign: 'center' }}>{c.usage}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: c.status === 'Aktif' ? '#E8F8EF' : '#F5F5F5', color: c.status === 'Aktif' ? '#1A7F37' : '#868686' }}>{c.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Coupon Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowModal(false)}>
                    <div style={{ background: '#fff', borderRadius: 12, width: 480, maxHeight: '80vh', overflow: 'auto', padding: 28 }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Yeni Kupon Oluştur</h2>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <label style={{ fontSize: 13, fontWeight: 600 }}>Kupon Kodu
                                <input placeholder="örn: ILK10" style={{ display: 'block', width: '100%', padding: '8px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 13, marginTop: 4, fontFamily: 'var(--kpnk-font)' }} />
                            </label>
                            <label style={{ fontSize: 13, fontWeight: 600 }}>Kupon Adı
                                <input placeholder="örn: İLK ALIŞVERİŞ" style={{ display: 'block', width: '100%', padding: '8px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 13, marginTop: 4, fontFamily: 'var(--kpnk-font)' }} />
                            </label>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <label style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>İndirim
                                    <input type="number" placeholder="10" style={{ display: 'block', width: '100%', padding: '8px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 13, marginTop: 4, fontFamily: 'var(--kpnk-font)' }} />
                                </label>
                                <label style={{ fontSize: 13, fontWeight: 600, width: 120 }}>Tür
                                    <select style={{ display: 'block', width: '100%', padding: '8px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 13, marginTop: 4, fontFamily: 'var(--kpnk-font)' }}>
                                        <option>Yüzde (%)</option>
                                        <option>Sabit (₺)</option>
                                    </select>
                                </label>
                            </div>
                            <label style={{ fontSize: 13, fontWeight: 600 }}>Geçerlilik
                                <select style={{ display: 'block', width: '100%', padding: '8px 12px', border: '1px solid var(--kpnk-border)', borderRadius: 8, fontSize: 13, marginTop: 4, fontFamily: 'var(--kpnk-font)' }}>
                                    <option>Tüm ürünler</option>
                                    <option>Belirli ürünler</option>
                                    <option>Belirli kategoriler</option>
                                </select>
                            </label>
                            <div style={{ fontSize: 13 }}>
                                <label style={{ display: 'flex', gap: 8, cursor: 'pointer' }}>
                                    <input type="radio" name="apply" defaultChecked /> Sipariş başına bir kez uygula
                                </label>
                                <label style={{ display: 'flex', gap: 8, cursor: 'pointer', marginTop: 6 }}>
                                    <input type="radio" name="apply" /> Siparişteki her uygun öğeye uygula
                                </label>
                            </div>
                            <label style={{ display: 'flex', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                                <input type="checkbox" /> Abonelikleri de dahil et
                            </label>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, borderTop: '1px solid var(--kpnk-border)', paddingTop: 16 }}>
                            <button style={{ fontSize: 12, color: 'var(--kpnk-danger)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Sil</button>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <button onClick={() => setShowModal(false)} style={{ fontSize: 12, fontWeight: 600, color: 'var(--kpnk-text)', background: '#fff', border: '1px solid var(--kpnk-border)', padding: '7px 18px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>İptal</button>
                                <button style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: 'var(--kpnk-primary)', border: 'none', padding: '7px 18px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'pointer', fontFamily: 'var(--kpnk-font)' }}>Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
