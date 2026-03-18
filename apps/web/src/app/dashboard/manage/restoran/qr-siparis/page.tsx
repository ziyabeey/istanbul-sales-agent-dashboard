'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface MenuItem { id: string; name: string; price: number; cat: string; desc: string; img?: string }
interface CartItem { id: string; productId: string; name: string; price: number; qty: number; notes?: string }

const CATS = ['🔥 Öne Çıkanlar', '🥘 Ana Yemekler', '🥗 Başlangıçlar', '🍰 Tatlılar', '🥤 İçecekler']
const MENU: MenuItem[] = [
    { id: 'p1', name: 'Adana Kebap', price: 32000, cat: '🔥 Öne Çıkanlar', desc: 'El yapımı, mangal közü' },
    { id: 'p2', name: 'İskender', price: 38000, cat: '🔥 Öne Çıkanlar', desc: 'Tereyağlı, yoğurtlu' },
    { id: 'p3', name: 'Tavuk Şiş', price: 28000, cat: '🥘 Ana Yemekler', desc: 'Marine edilmiş, özel sos' },
    { id: 'p4', name: 'Pide Kapalı', price: 22000, cat: '🥘 Ana Yemekler', desc: 'Kaşarlı, kıymalı' },
    { id: 'p5', name: 'Lahmacun', price: 8000, cat: '🥘 Ana Yemekler', desc: 'İnce hamur, acılı' },
    { id: 'p6', name: 'Mercimek Çorba', price: 8000, cat: '🥗 Başlangıçlar', desc: 'Ev yapımı, limonlu' },
    { id: 'p7', name: 'Karışık Salata', price: 6000, cat: '🥗 Başlangıçlar', desc: 'Mevsim sebzeleri' },
    { id: 'p8', name: 'Künefe', price: 14000, cat: '🍰 Tatlılar', desc: 'Antep fıstıklı, peynirli' },
    { id: 'p9', name: 'Ayran', price: 3000, cat: '🥤 İçecekler', desc: 'Taze, köpüklü' },
    { id: 'p10', name: 'Çay', price: 1500, cat: '🥤 İçecekler', desc: 'Demli çay bardağı' },
]

const TIPS = [0, 5, 10, 15, 20]

export default function QROrderPage() {
    const [activeCat, setActiveCat] = useState(CATS[0])
    const [cart, setCart] = useState<CartItem[]>([])
    const [tipPct, setTipPct] = useState(10)
    const [showCart, setShowCart] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(c => c.productId === item.id)
            if (existing) return prev.map(c => c.productId === item.id ? { ...c, qty: c.qty + 1 } : c)
            return [...prev, { id: `c-${Date.now()}`, productId: item.id, name: item.name, price: item.price, qty: 1 }]
        })
    }
    const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.id !== id))
    const updateQty = (id: string, delta: number) => setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c))

    const total = cart.reduce((s, c) => s + c.price * c.qty, 0)
    const tip = Math.round(total * tipPct / 100)
    const grandTotal = total + tip
    const formatTL = (k: number) => `₺${(k / 100).toFixed(2)}`

    if (orderPlaced) {
        return (
            <div style={{ maxWidth: 480, margin: '0 auto', padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 60, marginBottom: 12 }}>✅</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 8 }}>Siparişiniz Alındı!</h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Mutfak hazırlanmaya başladı. Ortalama süre: 15 dakika.</p>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Sipariş Durumu</div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        {['Alındı', 'Hazırlanıyor', 'Hazır', 'Teslim'].map((step, i) => (
                            <div key={step} style={{ textAlign: 'center' }}>
                                <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: i === 0 ? '#22c55e' : 'rgba(255,255,255,0.05)', color: i === 0 ? 'white' : 'rgba(255,255,255,0.2)', margin: '0 auto 4px' }}>{i === 0 ? '✓' : i + 1}</div>
                                <span style={{ fontSize: 9, color: i === 0 ? '#22c55e' : 'rgba(255,255,255,0.2)' }}>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Toplam: {formatTL(grandTotal)} (bahşiş dahil)</div>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
            {/* Restaurant Header */}
            <div style={{ padding: '16px 0', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>🍽️</span>
                    <h1 style={{ fontSize: 18, fontWeight: 800, color: 'white', margin: 0 }}>Lezzet Durağı</h1>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Masa 7 · QR Sipariş · Alman Usulü Ödeme</div>
            </div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: 4, overflowX: 'auto', marginBottom: 14, paddingBottom: 2 }}>
                {CATS.map(cat => (
                    <button key={cat} onClick={() => setActiveCat(cat)} style={{
                        padding: '6px 12px', borderRadius: 8, border: 'none', whiteSpace: 'nowrap',
                        fontSize: 11, fontWeight: 700,
                        background: activeCat === cat ? 'rgba(200,75,49,0.15)' : 'rgba(255,255,255,0.03)',
                        color: activeCat === cat ? '#f97316' : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>{cat}</button>
                ))}
            </div>

            {/* Menu Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: cart.length > 0 ? 80 : 0 }}>
                {MENU.filter(m => m.cat === activeCat).map(item => {
                    const inCart = cart.find(c => c.productId === item.id)
                    return (
                        <div key={item.id} style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12,
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{item.name}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{item.desc}</div>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 800, color: '#C84B31', marginRight: 6 }}>{formatTL(item.price)}</div>
                            {inCart ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <button onClick={() => updateQty(inCart.id, -1)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>−</button>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: 'white', minWidth: 16, textAlign: 'center' }}>{inCart.qty}</span>
                                    <button onClick={() => updateQty(inCart.id, 1)} style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: '#C84B31', color: 'white', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>+</button>
                                </div>
                            ) : (
                                <button onClick={() => addToCart(item)} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'rgba(200,75,49,0.15)', color: '#C84B31', cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}>+</button>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Floating Cart Bar */}
            {cart.length > 0 && !showCart && (
                <div onClick={() => setShowCart(true)} style={{
                    position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
                    width: 'calc(100% - 32px)', maxWidth: 448, padding: '12px 16px',
                    background: '#C84B31', borderRadius: 14, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(200,75,49,0.4)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white' }}>{cart.reduce((s, c) => s + c.qty, 0)}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Sepeti Gör</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{formatTL(total)}</span>
                </div>
            )}

            {/* Cart Sheet */}
            {showCart && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                    onClick={() => setShowCart(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: '18px 18px 0 0', padding: 20, maxHeight: '75vh', overflowY: 'auto' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 14 }}>🛒 Sepetiniz</h3>

                        {cart.map(c => (
                            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{c.name}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{formatTL(c.price)} × {c.qty}</div>
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{formatTL(c.price * c.qty)}</span>
                                <button onClick={() => removeFromCart(c.id)} style={{ padding: 4, background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}>✕</button>
                            </div>
                        ))}

                        {/* Tip */}
                        <div style={{ marginTop: 14, marginBottom: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6 }}>💰 Bahşiş</div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {TIPS.map(t => (
                                    <button key={t} onClick={() => setTipPct(t)} style={{
                                        flex: 1, padding: '6px 0', borderRadius: 6, border: 'none', fontSize: 11, fontWeight: 700,
                                        background: tipPct === t ? 'rgba(200,75,49,0.15)' : 'rgba(255,255,255,0.03)',
                                        color: tipPct === t ? '#f97316' : 'rgba(255,255,255,0.3)',
                                        cursor: 'pointer', fontFamily: 'inherit',
                                    }}>%{t}</button>
                                ))}
                            </div>
                        </div>

                        {/* Totals */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, marginBottom: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
                                <span>Ara Toplam</span><span>{formatTL(total)}</span>
                            </div>
                            {tip > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>
                                    <span>Bahşiş (%{tipPct})</span><span>{formatTL(tip)}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, color: 'white', marginTop: 6 }}>
                                <span>Toplam</span><span>{formatTL(grandTotal)}</span>
                            </div>
                        </div>

                        {/* Order Button */}
                        <button onClick={() => { setOrderPlaced(true); setShowCart(false) }} style={{
                            width: '100%', padding: '12px 0', borderRadius: 12, border: 'none',
                            background: '#C84B31', color: 'white', fontSize: 14, fontWeight: 800,
                            cursor: 'pointer', fontFamily: 'inherit',
                        }}>💳 Sipariş Ver ve Öde — {formatTL(grandTotal)}</button>

                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 8 }}>🔒 3D Secure ile güvenli ödeme · iyzico altyapısı</div>
                    </div>
                </div>
            )}
        </div>
    )
}
