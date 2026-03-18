'use client'

import { useState } from 'react'

/* ═══════ Demo Data ═══════ */
interface DemoJobLead { id: string; title: string; cat: string; catIcon: string; city: string; dist: string; budget: string; urgency: string; urgencyColor: string; bids: number; creditCost: number }

const LEADS: DemoJobLead[] = [
    { id: 'l1', title: 'Salon boyatmak istiyorum (35m²)', cat: 'Boya', catIcon: '🔨', city: 'Kadıköy', dist: '3.2 km', budget: '₺2,500-₺4,000', urgency: 'Bu Hafta', urgencyColor: '#F59E0B', bids: 2, creditCost: 3 },
    { id: 'l2', title: 'Sigorta panosu yenileme', cat: 'Elektrik', catIcon: '⚡', city: 'Üsküdar', dist: '5.8 km', budget: '₺1,500-₺2,500', urgency: 'Bu Hafta', urgencyColor: '#F59E0B', bids: 1, creditCost: 5 },
    { id: 'l3', title: 'Lavabo tıkanıklığı açma', cat: 'Tesisat', catIcon: '🔧', city: 'Beşiktaş', dist: '7.1 km', budget: '₺300-₺600', urgency: 'Acil', urgencyColor: '#EF4444', bids: 4, creditCost: 3 },
]

interface DemoActiveBid { id: string; title: string; myBid: number; status: string; statusColor: string; customer: string; date: string }

const ACTIVE_BIDS: DemoActiveBid[] = [
    { id: 'b1', title: 'Ev temizliği (3+1)', myBid: 950, status: 'Kabul Edildi', statusColor: '#22C55E', customer: 'Ayşe K.', date: '16 Mar' },
    { id: 'b2', title: 'Parke döşeme (salon)', myBid: 3200, status: 'Bekliyor', statusColor: '#F59E0B', customer: 'Mehmet B.', date: '17 Mar' },
    { id: 'b3', title: 'Kombi bakımı', myBid: 450, status: 'Devam Ediyor', statusColor: '#3B82F6', customer: 'Fatma D.', date: '14 Mar' },
]

const KPIS = [
    { label: 'Kredi Bakiye', value: '23', icon: '🪙', color: '#F59E0B' },
    { label: 'Aktif İşler', value: '2', icon: '🔧', color: '#3B82F6' },
    { label: 'Bu Ay Kazanç', value: '₺8,450', icon: '💰', color: '#22C55E' },
    { label: 'Puanım', value: '4.7⭐', icon: '⭐', color: '#F59E0B' },
]

const CREDIT_PACKS = [
    { credits: 10, price: '₺50', bonus: 0 },
    { credits: 30, price: '₺135', bonus: 3 },
    { credits: 100, price: '₺400', bonus: 15 },
]

export default function UstaPanelPage() {
    const [tab, setTab] = useState<'leads' | 'bids' | 'credits' | 'autobid'>('leads')

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🔧 Usta Paneli</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>İş fırsatları · Teklif ver · Kredi yönetimi · Otomatik teklif</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
                {KPIS.map(k => (
                    <div key={k.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                        <div style={{ fontSize: 16, marginBottom: 2 }}>{k.icon}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: k.color }}>{k.value}</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{k.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {([{ id: 'leads' as const, label: '📋 İş Fırsatları' }, { id: 'bids' as const, label: '🤝 Tekliflerim' }, { id: 'credits' as const, label: '🪙 Krediler' }, { id: 'autobid' as const, label: '🤖 Oto-Teklif' }]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* ═══ LEADS TAB ═══ */}
            {tab === 'leads' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {LEADS.map(l => (
                        <div key={l.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <span style={{ fontSize: 14 }}>{l.catIcon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{l.title}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{l.cat} · 📍 {l.city} ({l.dist})</div>
                                </div>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: `${l.urgencyColor}15`, color: l.urgencyColor }}>{l.urgency}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6' }}>{l.budget}</span>
                                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>🤝 {l.bids}/5 teklif</span>
                                </div>
                                <button style={{ padding: '5px 12px', borderRadius: 6, border: 'none', background: '#C84B31', color: 'white', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🪙{l.creditCost} Teklif Ver</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ═══ BIDS TAB ═══ */}
            {tab === 'bids' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {ACTIVE_BIDS.map(b => (
                        <div key={b.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{b.title}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Müşteri: {b.customer} · 📅 {b.date}</div>
                            </div>
                            <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: `${b.statusColor}15`, color: b.statusColor }}>{b.status}</span>
                            <span style={{ fontSize: 13, fontWeight: 800, color: '#22C55E' }}>₺{b.myBid.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ═══ CREDITS TAB ═══ */}
            {tab === 'credits' && (
                <div style={{ maxWidth: 420 }}>
                    <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 12, padding: 14, marginBottom: 12, textAlign: 'center' }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color: '#F59E0B' }}>23</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Mevcut Kredi Bakiyesi</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>⭐ 4.7 → %20 indirimli kredi</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {CREDIT_PACKS.map(p => (
                            <div key={p.credits} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>🪙 {p.credits} Kredi {p.bonus > 0 ? `+ ${p.bonus} bonus` : ''}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>₺{(5).toFixed(0)}/kredi</div>
                                </div>
                                <button style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: '#F59E0B', color: '#000', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{p.price}</button>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 12px' }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>💡 Kredi Maliyetleri</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginTop: 4 }}>Kolay iş (temizlik): 2 kredi · Orta (boya, tesisat): 3 kredi · Zor (tadilat, elektrik): 5 kredi</div>
                    </div>
                </div>
            )}

            {/* ═══ AUTO-BID TAB ═══ */}
            {tab === 'autobid' && (
                <div style={{ maxWidth: 520 }}>
                    <div style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#8B5CF6' }}>🤖 Otomatik Teklif</span>
                            <div style={{ width: 36, height: 20, borderRadius: 10, background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 2px', cursor: 'pointer' }}>
                                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white' }} />
                            </div>
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Kriterlere uygun yeni iş ilanlarına otomatik teklif verir.</div>
                    </div>
                    {[
                        { label: 'Kategoriler', value: 'Elektrik Tesisatı, Priz & Anahtar, Sigorta' },
                        { label: 'Maks. Mesafe', value: '15 km' },
                        { label: 'Bütçe Aralığı', value: '₺500 — ₺5,000' },
                        { label: 'Fiyat Stratejisi', value: '🏷️ Rekabetçi' },
                    ].map(f => (
                        <div key={f.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 12px', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{f.label}</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>{f.value}</span>
                        </div>
                    ))}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 12px', marginTop: 6 }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Otomatik Mesaj Şablonu</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>&quot;Merhaba, {'{{job_title}}'} işiniz için size yardımcı olabilirim. 10+ yıl deneyimle kaliteli hizmet sunuyorum.&quot;</div>
                    </div>
                </div>
            )}
        </div>
    )
}
