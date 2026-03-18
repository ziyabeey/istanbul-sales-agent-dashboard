'use client'

import { useState } from 'react'

/* ═══════ Demo Data ═══════ */
interface DemoInfluencer { id: string; name: string; ig: string; followers: string; engagement: string; tier: string; tierColor: string; cats: string[]; price: number; rating: number; campaigns: number; fraud: number; verified: boolean }

const INFLUENCERS: DemoInfluencer[] = [
    { id: 'i1', name: 'Elif Güneş', ig: '@elifguness', followers: '124K', engagement: '6.8%', tier: 'Mid', tierColor: '#8B5CF6', cats: ['beauty', 'lifestyle'], price: 4200, rating: 4.8, campaigns: 23, fraud: 92, verified: true },
    { id: 'i2', name: 'Mert Aydın', ig: '@mertfitness', followers: '45K', engagement: '8.2%', tier: 'Micro', tierColor: '#3B82F6', cats: ['fitness', 'lifestyle'], price: 1800, rating: 4.6, campaigns: 15, fraud: 88, verified: true },
    { id: 'i3', name: 'Zeynep Kaya', ig: '@zeynepyemek', followers: '89K', engagement: '5.4%', tier: 'Mid', tierColor: '#8B5CF6', cats: ['food'], price: 3500, rating: 4.9, campaigns: 31, fraud: 95, verified: true },
    { id: 'i4', name: 'Can Demir', ig: '@cantech', followers: '210K', engagement: '3.2%', tier: 'Mid', tierColor: '#8B5CF6', cats: ['tech'], price: 5800, rating: 4.3, campaigns: 8, fraud: 78, verified: false },
    { id: 'i5', name: 'Sude Yılmaz', ig: '@sudemoda', followers: '18K', engagement: '9.1%', tier: 'Micro', tierColor: '#3B82F6', cats: ['fashion', 'beauty'], price: 950, rating: 4.7, campaigns: 12, fraud: 90, verified: true },
]

interface DemoCampaign { id: string; influencer: string; type: string; status: string; statusColor: string; price: number; deadline: string }

const CAMPAIGNS: DemoCampaign[] = [
    { id: 'c1', influencer: 'Elif Güneş', type: 'IG Reel', status: 'Yayınlandı', statusColor: '#22C55E', price: 4200, deadline: '20 Mar' },
    { id: 'c2', influencer: 'Zeynep Kaya', type: 'IG Post', status: 'İçerik Gönderildi', statusColor: '#8B5CF6', price: 3500, deadline: '22 Mar' },
    { id: 'c3', influencer: 'Mert Aydın', type: 'IG Story', status: 'Kabul Edildi', statusColor: '#3B82F6', price: 1800, deadline: '25 Mar' },
    { id: 'c4', influencer: 'Sude Yılmaz', type: 'IG Post', status: 'Bekliyor', statusColor: '#F59E0B', price: 950, deadline: '28 Mar' },
]

const KPIS = [
    { label: 'Aktif Kampanya', value: '4', icon: '📢', color: '#3B82F6' },
    { label: 'Toplam Erişim', value: '248K', icon: '👁️', color: '#8B5CF6' },
    { label: 'Harcanan', value: '₺10,450', icon: '💰', color: '#F59E0B' },
    { label: 'Ort. Engagement', value: '%6.5', icon: '❤️', color: '#EF4444' },
]

const CAT_ICONS: Record<string, string> = { beauty: '💄', fitness: '💪', food: '🍽️', lifestyle: '✨', tech: '📱', fashion: '👗' }

export default function InfluencerPage() {
    const [tab, setTab] = useState<'discover' | 'campaigns'>('discover')
    const [catFilter, setCatFilter] = useState<string>('all')

    const filtered = catFilter === 'all' ? INFLUENCERS : INFLUENCERS.filter(i => i.cats.includes(catFilter))

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🤝 Influencer Ağı</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Keşfet · Kampanya oluştur · Post takibi · Escrow ödeme</p>
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

            <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                {([{ id: 'discover' as const, label: '🔍 Keşfet' }, { id: 'campaigns' as const, label: '📢 Kampanyalar' }]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'discover' && (
                <>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 12, flexWrap: 'wrap' }}>
                        <button onClick={() => setCatFilter('all')} style={{ padding: '4px 10px', borderRadius: 5, border: 'none', fontSize: 10, fontWeight: 700, background: catFilter === 'all' ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)', color: catFilter === 'all' ? '#f97316' : 'rgba(255,255,255,0.25)', cursor: 'pointer', fontFamily: 'inherit' }}>Tümü</button>
                        {Object.entries(CAT_ICONS).map(([c, icon]) => (
                            <button key={c} onClick={() => setCatFilter(c)} style={{ padding: '4px 10px', borderRadius: 5, border: 'none', fontSize: 10, fontWeight: 700, background: catFilter === c ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)', color: catFilter === c ? '#f97316' : 'rgba(255,255,255,0.25)', cursor: 'pointer', fontFamily: 'inherit' }}>{icon} {c}</button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {filtered.map(inf => (
                            <div key={inf.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${inf.tierColor}22, ${inf.tierColor}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: inf.tierColor, flexShrink: 0 }}>{inf.name[0]}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{inf.name}</span>
                                        {inf.verified && <span style={{ fontSize: 10 }}>✅</span>}
                                    </div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{inf.ig} · {inf.followers} takipçi · {inf.engagement} eng.</div>
                                    <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
                                        <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: `${inf.tierColor}15`, color: inf.tierColor }}>{inf.tier}</span>
                                        {inf.cats.map(c => <span key={c} style={{ fontSize: 8, fontWeight: 600, padding: '1px 4px', borderRadius: 3, background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.2)' }}>{CAT_ICONS[c]} {c}</span>)}
                                        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.15)' }}>⭐{inf.rating} · {inf.campaigns} kampanya</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: '#22C55E' }}>₺{inf.price.toLocaleString()}</div>
                                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>IG Post</div>
                                    <div style={{ width: 40, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)', marginTop: 3 }}>
                                        <div style={{ width: `${inf.fraud}%`, height: '100%', borderRadius: 2, background: inf.fraud > 85 ? '#22C55E' : '#F59E0B' }} />
                                    </div>
                                    <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.15)', marginTop: 1 }}>güven {inf.fraud}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {tab === 'campaigns' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {CAMPAIGNS.map(c => (
                        <div key={c.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{c.influencer}</div>
                                <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{c.type}</span>
                                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>·</span>
                                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>📅 {c.deadline}</span>
                                </div>
                            </div>
                            <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: `${c.statusColor}15`, color: c.statusColor }}>{c.status}</span>
                            <span style={{ fontSize: 13, fontWeight: 800, color: '#F59E0B' }}>₺{c.price.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
