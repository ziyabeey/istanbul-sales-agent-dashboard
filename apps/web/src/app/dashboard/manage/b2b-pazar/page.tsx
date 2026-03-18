'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface Supplier {
    id: string
    ad: string
    sektor: string
    urunSayisi: number
    minSiparis: number
    puan: number
    konum: string
    verified: boolean
}

interface B2BProduct {
    id: string
    ad: string
    tedarikci: string
    fiyat: number
    birim: string
    minAdet: number
    kategori: string
}

const DEMO_SUPPLIERS: Supplier[] = [
    { id: '1', ad: 'Anatolia Gıda A.Ş.', sektor: 'Gıda', urunSayisi: 120, minSiparis: 500, puan: 4.8, konum: 'İstanbul', verified: true },
    { id: '2', ad: 'Ege Temizlik', sektor: 'Temizlik', urunSayisi: 45, minSiparis: 200, puan: 4.5, konum: 'İzmir', verified: true },
    { id: '3', ad: 'Akdeniz Ambalaj', sektor: 'Ambalaj', urunSayisi: 80, minSiparis: 300, puan: 4.2, konum: 'Antalya', verified: false },
    { id: '4', ad: 'Marmara Tekstil', sektor: 'Tekstil', urunSayisi: 200, minSiparis: 1000, puan: 4.7, konum: 'Bursa', verified: true },
]

const DEMO_PRODUCTS: B2BProduct[] = [
    { id: '1', ad: 'Zeytinyağı Extra Virgin 5L', tedarikci: 'Anatolia Gıda', fiyat: 450, birim: 'adet', minAdet: 10, kategori: 'Gıda' },
    { id: '2', ad: 'Endüstriyel Temizlik Seti', tedarikci: 'Ege Temizlik', fiyat: 180, birim: 'set', minAdet: 5, kategori: 'Temizlik' },
    { id: '3', ad: 'Kraft Kağıt Torba (500\'lü)', tedarikci: 'Akdeniz Ambalaj', fiyat: 320, birim: 'koli', minAdet: 3, kategori: 'Ambalaj' },
    { id: '4', ad: 'Pamuk Peçete (1000\'li)', tedarikci: 'Marmara Tekstil', fiyat: 95, birim: 'paket', minAdet: 20, kategori: 'Tekstil' },
    { id: '5', ad: 'Doğal Bal 1kg', tedarikci: 'Anatolia Gıda', fiyat: 280, birim: 'adet', minAdet: 12, kategori: 'Gıda' },
    { id: '6', ad: 'Dezenfektan 5L', tedarikci: 'Ege Temizlik', fiyat: 120, birim: 'adet', minAdet: 6, kategori: 'Temizlik' },
]

export default function B2BPazarYeriPage() {
    const [activeTab, setActiveTab] = useState<'urunler' | 'tedarikciler'>('urunler')
    const [search, setSearch] = useState('')
    const [showOrder, setShowOrder] = useState<B2BProduct | null>(null)
    const [orderQty, setOrderQty] = useState('')

    const filteredProducts = DEMO_PRODUCTS.filter(p => !search || p.ad.toLowerCase().includes(search.toLowerCase()) || p.kategori.toLowerCase().includes(search.toLowerCase()))
    const filteredSuppliers = DEMO_SUPPLIERS.filter(s => !search || s.ad.toLowerCase().includes(search.toLowerCase()) || s.sektor.toLowerCase().includes(search.toLowerCase()))

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>🏪 B2B Pazar Yeri</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Toptan tedarikçiler ve ürünler.</p>
                </div>
            </div>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Tedarikçi', value: DEMO_SUPPLIERS.length, emoji: '🏭' },
                    { label: 'Ürün', value: DEMO_PRODUCTS.length, emoji: '📦' },
                    { label: 'Onaylı Tedarikçi', value: DEMO_SUPPLIERS.filter(s => s.verified).length, emoji: '✅' },
                    { label: 'Kategori', value: new Set(DEMO_PRODUCTS.map(p => p.kategori)).size, emoji: '🏷️' },
                ].map((k, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Search + Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Ürün veya tedarikçi ara..."
                    style={{ flex: 1, padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
                <div style={{ display: 'flex', gap: 3 }}>
                    {([['urunler', '📦 Ürünler'], ['tedarikciler', '🏭 Tedarikçiler']] as const).map(([key, label]) => (
                        <button key={key} onClick={() => setActiveTab(key)} style={{
                            padding: '6px 14px', borderRadius: 8, border: 'none',
                            background: activeTab === key ? 'rgba(220,70,30,0.15)' : 'transparent',
                            color: activeTab === key ? '#f97316' : 'rgba(255,255,255,0.4)',
                            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                        }}>{label}</button>
                    ))}
                </div>
            </div>

            {/* Products */}
            {activeTab === 'urunler' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                    {filteredProducts.map(p => (
                        <div key={p.id} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 14, padding: '16px 18px',
                        }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>{p.ad}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 8, display: 'flex', gap: 8 }}>
                                <span>🏭 {p.tedarikci}</span>
                                <span>📦 Min {p.minAdet} {p.birim}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 18, fontWeight: 800, color: '#22c55e' }}>₺{p.fiyat} <span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>/ {p.birim}</span></span>
                                <button onClick={() => { setShowOrder(p); setOrderQty(String(p.minAdet)) }} style={{
                                    padding: '6px 14px', borderRadius: 8, border: 'none',
                                    background: 'rgba(220,70,30,0.15)', color: '#f97316',
                                    fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                }}>🛒 Sipariş</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Suppliers */}
            {activeTab === 'tedarikciler' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {filteredSuppliers.map(s => (
                        <div key={s.id} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14,
                        }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏭</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    {s.ad} {s.verified && <span style={{ fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4, background: '#dcfce7', color: '#166534' }}>✓ Onaylı</span>}
                                </div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', gap: 10 }}>
                                    <span>📍 {s.konum}</span>
                                    <span>🏷️ {s.sektor}</span>
                                    <span>📦 {s.urunSayisi} ürün</span>
                                    <span>💰 Min ₺{s.minSiparis}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#f59e0b' }}>⭐ {s.puan}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Order Modal */}
            {showOrder && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowOrder(null)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 400, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>🛒 Sipariş Ver</h3>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{showOrder.ad}</p>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Birim Fiyat</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#22c55e' }}>₺{showOrder.fiyat}</div>
                            </div>
                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Min Sipariş</div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{showOrder.minAdet} {showOrder.birim}</div>
                            </div>
                        </div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Adet</label>
                        <input type="number" value={orderQty} onChange={e => setOrderQty(e.target.value)} min={showOrder.minAdet}
                            style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: 14, fontFamily: 'inherit', marginTop: 4, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }} />
                        <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 16, textAlign: 'right' }}>
                            Toplam: <span style={{ color: '#22c55e' }}>₺{((parseFloat(orderQty) || 0) * showOrder.fiyat).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowOrder(null)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
                            <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#dc4e1e', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Sipariş Ver</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
