'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
type BStatus = 'draft' | 'scheduled' | 'published'
interface DemoBlog { id: string; title: string; status: BStatus; seo: number; views: number; readMin: number; aiGen: boolean; date: string; keywords: string[] }

const BLOGS: DemoBlog[] = [
    { id: 'b1', title: '2026 Saç Trendleri: En Popüler 10 Model', status: 'published', seo: 92, views: 1240, readMin: 5, aiGen: true, date: '12 Mar', keywords: ['saç trendleri', '2026 saç modelleri'] },
    { id: 'b2', title: 'Erkek Saç Bakımı: Evde Yapabileceğiniz 7 Uygulama', status: 'published', seo: 87, views: 856, readMin: 4, aiGen: true, date: '05 Mar', keywords: ['erkek saç bakımı', 'ev bakımı'] },
    { id: 'b3', title: 'Saç Boyatırken Dikkat Etmeniz Gereken 5 Şey', status: 'scheduled', seo: 85, views: 0, readMin: 6, aiGen: true, date: '19 Mar', keywords: ['saç boyası', 'saç bakımı'] },
    { id: 'b4', title: 'Kadıköy\'de En İyi Kuaför Nasıl Bulunur?', status: 'draft', seo: 78, views: 0, readMin: 3, aiGen: false, date: '—', keywords: ['kadıköy kuaför', 'en iyi kuaför'] },
    { id: 'b5', title: 'Bahar İçin Saç Rengi Önerileri', status: 'scheduled', seo: 90, views: 0, readMin: 4, aiGen: true, date: '26 Mar', keywords: ['bahar saç rengi', 'saç rengi 2026'] },
]

const STATS = [
    { label: 'Yayında', value: '12', icon: '📝', color: '#22c55e' },
    { label: 'Toplam Görüntüleme', value: '8.4K', icon: '👁️', color: '#3B82F6' },
    { label: 'SEO Ortalaması', value: '87', icon: '🎯', color: '#8B5CF6' },
    { label: 'Token Kullanım', value: '7/10', icon: '🪙', color: '#f59e0b' },
]

const AUTOPILOT_PLAN = [
    { topic: 'Kısa Saç Modelleri 2026', date: '01 Nis', status: 'pending' },
    { topic: 'Düğün Saçı Fikirleri', date: '08 Nis', status: 'pending' },
    { topic: 'Saç Dökülmesine Karşı 10 İpucu', date: '15 Nis', status: 'pending' },
    { topic: 'Çocuk Saç Kesim Rehberi', date: '22 Nis', status: 'pending' },
    { topic: 'Yaz İçin Saç Bakımı', date: '29 Nis', status: 'pending' },
]

export default function BlogMotorPage() {
    const [blogs] = useState(BLOGS)
    const [tab, setTab] = useState<'posts' | 'autopilot' | 'generate'>('posts')
    const [genTopic, setGenTopic] = useState('')
    const [genKeywords, setGenKeywords] = useState('')
    const [genTone, setGenTone] = useState<'professional' | 'casual' | 'educational'>('professional')
    const [generating, setGenerating] = useState(false)

    const statusMap = (s: BStatus) => {
        if (s === 'published') return { l: 'Yayında', c: '#22c55e', bg: 'rgba(34,197,94,0.1)' }
        if (s === 'scheduled') return { l: 'Planlandı', c: '#3B82F6', bg: 'rgba(59,130,246,0.1)' }
        return { l: 'Taslak', c: 'rgba(255,255,255,0.25)', bg: 'rgba(255,255,255,0.03)' }
    }

    const seoColor = (s: number) => s >= 85 ? '#22c55e' : s >= 70 ? '#f59e0b' : '#ef4444'

    const handleGenerate = () => {
        setGenerating(true)
        setTimeout(() => setGenerating(false), 3000) // Simulate
    }

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>✍️ AI Blog Motoru</h1>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Claude ile SEO-optimize blog · Otopilot · Tiptap editör</p>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
                {STATS.map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                        <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {([
                    { id: 'posts' as const, label: '📝 Blog Yazıları' },
                    { id: 'generate' as const, label: '✨ AI Üret' },
                    { id: 'autopilot' as const, label: '🤖 Otopilot' },
                ]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* ═══ POSTS TAB ═══ */}
            {tab === 'posts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {blogs.map(b => {
                        const sm = statusMap(b.status)
                        return (
                            <div key={b.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 3 }}>{b.title}</div>
                                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: sm.bg, color: sm.c }}>{sm.l}</span>
                                        {b.aiGen && <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>🤖 AI</span>}
                                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>📅 {b.date}</span>
                                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>⏱️ {b.readMin}dk</span>
                                        {b.views > 0 && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>👁️ {b.views}</span>}
                                    </div>
                                    <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                                        {b.keywords.map(k => <span key={k} style={{ fontSize: 8, padding: '1px 4px', borderRadius: 3, background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.2)' }}>{k}</span>)}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: seoColor(b.seo) }}>{b.seo}</div>
                                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>SEO</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* ═══ GENERATE TAB ═══ */}
            {tab === 'generate' && (
                <div style={{ maxWidth: 520 }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 12 }}>✨ AI Blog Üret</div>

                        <div style={{ marginBottom: 12 }}>
                            <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Konu (opsiyonel)</label>
                            <input value={genTopic} onChange={e => setGenTopic(e.target.value)} placeholder="AI konu seçecek veya kendi konunuzu yazın..." style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                        </div>

                        <div style={{ marginBottom: 12 }}>
                            <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Hedef Anahtar Kelimeler</label>
                            <input value={genKeywords} onChange={e => setGenKeywords(e.target.value)} placeholder="saç bakımı, erkek saç modeli..." style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Ton</label>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {([
                                    { id: 'professional' as const, label: '💼 Profesyonel' },
                                    { id: 'casual' as const, label: '😊 Samimi' },
                                    { id: 'educational' as const, label: '📚 Eğitici' },
                                ]).map(t => (
                                    <button key={t.id} onClick={() => setGenTone(t.id)} style={{
                                        flex: 1, padding: '6px 0', borderRadius: 6, border: 'none', fontSize: 10, fontWeight: 700,
                                        background: genTone === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                                        color: genTone === t.id ? '#f97316' : 'rgba(255,255,255,0.25)',
                                        cursor: 'pointer', fontFamily: 'inherit',
                                    }}>{t.label}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 8, padding: '8px 12px', marginBottom: 12 }}>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>📊 Blog Standartları</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6, marginTop: 4 }}>
                                • 1200-1800 kelime · SEO optimize başlık (50-60 char)<br />
                                • 3-5 H2 alt başlık · FAQ (Schema.org uyumlu)<br />
                                • Görsel önerileri · Internal link önerileri<br />
                                • Slug: Türkçe karakter içermez
                            </div>
                        </div>

                        <button onClick={handleGenerate} disabled={generating} style={{
                            width: '100%', padding: '10px 0', borderRadius: 10, border: 'none',
                            background: generating ? 'rgba(255,255,255,0.05)' : '#8B5CF6',
                            color: generating ? 'rgba(255,255,255,0.15)' : 'white',
                            fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
                        }}>{generating ? '⏳ Üretiliyor (~10sn)...' : '✨ Blog Üret (1 token)'}</button>
                    </div>
                </div>
            )}

            {/* ═══ AUTOPILOT TAB ═══ */}
            {tab === 'autopilot' && (
                <div>
                    <div style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#8B5CF6', marginBottom: 4 }}>🤖 Otopilot Blog — Nisan 2026</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>AI her ay otomatik olarak 5 blog konusu planlar. Onayladıktan sonra haftada 1 blog yayınlanır.</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {AUTOPILOT_PLAN.map((p, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#8B5CF6' }}>{i + 1}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>{p.topic}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>📅 {p.date}</div>
                                </div>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 3, background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>Onay Bekliyor</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                        <button style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', background: '#22c55e', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✅ Planı Onayla</button>
                        <button style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✏️ Düzenle</button>
                    </div>
                </div>
            )}
        </div>
    )
}
