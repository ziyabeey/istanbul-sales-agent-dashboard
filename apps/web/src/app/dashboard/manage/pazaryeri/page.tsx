'use client'

import { useState } from 'react'

/* ═══════ Demo Data ═══════ */
const CATS = [
    { id: 'tadilat', name: 'Tadilat', icon: '🔨', count: 842 },
    { id: 'elektrik', name: 'Elektrik', icon: '⚡', count: 634 },
    { id: 'tesisat', name: 'Tesisat', icon: '🔧', count: 567 },
    { id: 'temizlik', name: 'Temizlik', icon: '🧹', count: 1240 },
    { id: 'nakliyat', name: 'Nakliyat', icon: '🚚', count: 389 },
    { id: 'bahce', name: 'Bahçe', icon: '🌿', count: 215 },
]

interface DemoJob { id: string; title: string; cat: string; catIcon: string; city: string; budget: string; urgency: string; urgencyColor: string; bids: number; status: string; statusColor: string; ai?: { price: string; duration: string; complexity: string } }

const JOBS: DemoJob[] = [
    { id: 'j1', title: 'Salon boyatmak istiyorum (35m²)', cat: 'Boya Badana', catIcon: '🔨', city: 'Kadıköy', budget: '₺2,500-₺4,000', urgency: 'Bu Hafta', urgencyColor: '#F59E0B', bids: 3, status: 'Açık', statusColor: '#3B82F6', ai: { price: '₺2,800-₺3,500', duration: '2-3 gün', complexity: 'Orta' } },
    { id: 'j2', title: 'Mutfak lavabo tıkanıklığı', cat: 'Tıkanıklık Açma', catIcon: '🔧', city: 'Beşiktaş', budget: '₺300-₺600', urgency: 'Acil', urgencyColor: '#EF4444', bids: 5, status: 'Açık', statusColor: '#3B82F6', ai: { price: '₺350-₺500', duration: '1-2 saat', complexity: 'Kolay' } },
    { id: 'j3', title: 'Ev temizliği (3+1, 120m²)', cat: 'Ev Temizliği', catIcon: '🧹', city: 'Ataşehir', budget: '₺800-₺1,200', urgency: 'Esnek', urgencyColor: '#22C55E', bids: 4, status: 'Devam Ediyor', statusColor: '#F59E0B' },
    { id: 'j4', title: 'Sigorta panosu yenileme', cat: 'Sigorta & Pano', catIcon: '⚡', city: 'Üsküdar', budget: '₺1,500-₺2,500', urgency: 'Bu Hafta', urgencyColor: '#F59E0B', bids: 2, status: 'Açık', statusColor: '#3B82F6', ai: { price: '₺1,800-₺2,200', duration: '1 gün', complexity: 'Zor' } },
    { id: 'j5', title: 'Evden eve nakliyat (2+1)', cat: 'Nakliyat', catIcon: '🚚', city: 'Kartal', budget: '₺2,000-₺3,500', urgency: 'Esnek', urgencyColor: '#22C55E', bids: 3, status: 'Tamamlandı', statusColor: '#22C55E' },
]

const KPIS = [
    { label: 'Aktif İş', value: '3', icon: '📋', color: '#3B82F6' },
    { label: 'Gelen Teklifler', value: '14', icon: '🤝', color: '#8B5CF6' },
    { label: 'Tamamlanan', value: '12', icon: '✅', color: '#22C55E' },
    { label: 'Harcanan', value: '₺18.4K', icon: '💰', color: '#F59E0B' },
]

export default function PazaryeriPage() {
    const [tab, setTab] = useState<'jobs' | 'create'>('jobs')
    const [selectedJob, setSelectedJob] = useState<DemoJob | null>(null)

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🏠 Hizmet Pazaryeri</h1>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>İş oluştur → Teklif al → Escrow ödeme → İş tamamla</p>
                </div>
                <button onClick={() => setTab('create')} style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: '#C84B31', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Yeni İş Oluştur</button>
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

            {/* Categories */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 16 }}>
                {CATS.map(c => (
                    <div key={c.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px', textAlign: 'center', cursor: 'pointer' }}>
                        <div style={{ fontSize: 20, marginBottom: 3 }}>{c.icon}</div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: 'white' }}>{c.name}</div>
                        <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>{c.count} usta</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                {([{ id: 'jobs' as const, label: '📋 İşlerim' }, { id: 'create' as const, label: '+ Yeni İş' }]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'jobs' && !selectedJob && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {JOBS.map(j => (
                        <div key={j.id} onClick={() => setSelectedJob(j)} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ fontSize: 14 }}>{j.catIcon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{j.title}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{j.cat} · 📍 {j.city}</div>
                                </div>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: `${j.statusColor}15`, color: j.statusColor }}>{j.status}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6' }}>{j.budget}</span>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: `${j.urgencyColor}15`, color: j.urgencyColor }}>{j.urgency}</span>
                                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>🤝 {j.bids}/5 teklif</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Job Detail with AI Analysis */}
            {tab === 'jobs' && selectedJob && (
                <div>
                    <button onClick={() => setSelectedJob(null)} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10 }}>← Geri</button>

                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16, marginBottom: 10 }}>
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>{selectedJob.catIcon} {selectedJob.title}</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{selectedJob.cat}</span>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>📍 {selectedJob.city}</span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#8B5CF6' }}>{selectedJob.budget}</span>
                            <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: `${selectedJob.urgencyColor}15`, color: selectedJob.urgencyColor }}>{selectedJob.urgency}</span>
                        </div>
                    </div>

                    {selectedJob.ai && (
                        <div style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 12, padding: 14 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#8B5CF6', marginBottom: 8 }}>🤖 AI Analizi</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 10 }}>
                                <div><div style={{ fontSize: 14, fontWeight: 800, color: '#22C55E' }}>{selectedJob.ai.price}</div><div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>💰 Tahmini Fiyat</div></div>
                                <div><div style={{ fontSize: 14, fontWeight: 800, color: '#3B82F6' }}>{selectedJob.ai.duration}</div><div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>⏱️ Süre</div></div>
                                <div><div style={{ fontSize: 14, fontWeight: 800, color: '#F59E0B' }}>{selectedJob.ai.complexity}</div><div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>📊 Zorluk</div></div>
                            </div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>💡 Tavsiye</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>• En az 3 teklif karşılaştırın<br />• İşçilik garantisi isteyin — en az 1 yıl<br />• Kullanılacak malzemeleri önceden netleştirin</div>
                        </div>
                    )}
                </div>
            )}

            {/* Create Job */}
            {tab === 'create' && (
                <div style={{ maxWidth: 520 }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 16 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 12 }}>+ Yeni İş Oluştur</div>
                        {[
                            { label: 'Kategori', placeholder: 'Tadilat > Boya > İç Cephe' },
                            { label: 'Başlık', placeholder: 'Salon boyatmak istiyorum' },
                            { label: 'Açıklama', placeholder: 'Detaylı açıklama...', textarea: true },
                        ].map(f => (
                            <div key={f.label} style={{ marginBottom: 10 }}>
                                <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>{f.label}</label>
                                {f.textarea ? (
                                    <textarea placeholder={f.placeholder} rows={3} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                                ) : (
                                    <input placeholder={f.placeholder} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                                )}
                            </div>
                        ))}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Min Bütçe (₺)</label>
                                <input placeholder="2000" type="number" style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Max Bütçe (₺)</label>
                                <input placeholder="4000" type="number" style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                            <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>Aciliyet</label>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {[{ id: 'flexible', l: '🟢 Esnek' }, { id: 'this_week', l: '🟡 Bu Hafta' }, { id: 'urgent', l: '🔴 Acil' }].map(u => (
                                    <button key={u.id} style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{u.l}</button>
                                ))}
                            </div>
                        </div>
                        <button style={{ width: '100%', padding: '10px 0', borderRadius: 10, border: 'none', background: '#C84B31', color: 'white', fontSize: 13, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>📋 İş İlanı Yayınla</button>
                    </div>
                </div>
            )}
        </div>
    )
}
