'use client'

import { useState } from 'react'

/* ═══════ Demo Data ═══════ */
const BOARD_COLUMNS = [
    { id: 'todo', title: 'Yapılacak', color: '#6B7280', cards: [
        { id: 'c1', title: 'Yeni menü fotoğrafları çektir', priority: 'medium' as const, assignee: 'Elif', due: '22 Mar', ai: false },
        { id: 'c2', title: 'Instagram kampanyası planla', priority: 'high' as const, assignee: 'Mert', due: '20 Mar', ai: true },
    ]},
    { id: 'progress', title: 'Devam Eden', color: '#3B82F6', cards: [
        { id: 'c3', title: 'Web sitesi hizmet sayfası güncelle', priority: 'high' as const, assignee: 'Zeynep', due: '19 Mar', ai: false },
    ]},
    { id: 'review', title: 'İnceleme', color: '#F59E0B', cards: [
        { id: 'c4', title: 'Fiyat listesi revize', priority: 'urgent' as const, assignee: 'Can', due: '18 Mar', ai: true },
    ]},
    { id: 'done', title: 'Tamamlanan', color: '#22C55E', cards: [
        { id: 'c5', title: 'Google Business profil güncelle', priority: 'low' as const, assignee: 'Sude', due: '15 Mar', ai: false },
    ]},
]

const P_COLORS: Record<string, string> = { low: '#6B7280', medium: '#3B82F6', high: '#F59E0B', urgent: '#EF4444' }

const RAG_DOCS = [
    { name: 'Çalışan El Kitabı.pdf', status: 'indexed', chunks: 45, size: '2.4 MB' },
    { name: 'Ürün Kataloğu.xlsx', status: 'indexed', chunks: 128, size: '1.8 MB' },
    { name: 'Şirket Politikaları.docx', status: 'processing', chunks: 0, size: '890 KB' },
]

const CHAT_HISTORY = [
    { role: 'user', text: 'Yıllık izin kaç gün?' },
    { role: 'assistant', text: 'Çalışan El Kitabı\'na göre yıllık izin hakkı 14 iş günüdür. 5 yılı aşan çalışanlar 20 gün hak kazanır. [Kaynak: Çalışan El Kitabı, s.12]' },
    { role: 'user', text: 'Uzaktan çalışma politikası nedir?' },
    { role: 'assistant', text: 'Şirket politikasına göre haftada 2 gün uzaktan çalışma yapılabilir. Pazartesi ve Cuma uzaktan çalışma günleri olarak belirlenmiştir. [Kaynak: Şirket Politikaları, s.8]' },
]

const KPIS = [
    { label: 'Görev Tamamlama', value: '%82', icon: '✅', color: '#22C55E' },
    { label: 'Chatbot Çözüm', value: '%91', icon: '🤖', color: '#8B5CF6' },
    { label: 'Geciken Görev', value: '3', icon: '⏰', color: '#EF4444' },
    { label: 'Ekip Verimi', value: '4.2/5', icon: '📊', color: '#3B82F6' },
]

export default function ChatbotPage() {
    const [tab, setTab] = useState<'kanban' | 'chatbot' | 'kpi'>('kanban')

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🏢 Şirket Asistanı</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>RAG Chatbot · Kanban · AI Görev Dağıtım · KPI</p>
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
                {([{ id: 'kanban' as const, label: '📋 Kanban' }, { id: 'chatbot' as const, label: '🤖 Chatbot' }, { id: 'kpi' as const, label: '📊 KPI' }]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* ═══ KANBAN ═══ */}
            {tab === 'kanban' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {BOARD_COLUMNS.map(col => (
                        <div key={col.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '8px', minHeight: 300 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8, padding: '0 4px' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>{col.title}</span>
                                <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.15)', marginLeft: 'auto' }}>{col.cards.length}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {col.cards.map(card => (
                                    <div key={card.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px', cursor: 'grab' }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: 'white', marginBottom: 4, lineHeight: 1.3 }}>{card.title}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: P_COLORS[card.priority] }} />
                                            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>{card.assignee}</span>
                                            {card.ai && <span style={{ fontSize: 7, fontWeight: 700, padding: '0 3px', borderRadius: 2, background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>AI</span>}
                                            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.15)', marginLeft: 'auto' }}>📅 {card.due}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ═══ CHATBOT ═══ */}
            {tab === 'chatbot' && (
                <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>💬 RAG Chatbot</div>
                            <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 250 }}>
                                {CHAT_HISTORY.map((m, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 6, justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                        <div style={{ maxWidth: '80%', padding: '8px 10px', borderRadius: 10, background: m.role === 'user' ? 'rgba(200,75,49,0.12)' : 'rgba(139,92,246,0.06)', border: `1px solid ${m.role === 'user' ? 'rgba(200,75,49,0.2)' : 'rgba(139,92,246,0.15)'}` }}>
                                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{m.text}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 4 }}>
                                <input placeholder="Bir soru sorun..." style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 11, fontFamily: 'inherit', outline: 'none' }} />
                                <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: '#8B5CF6', color: 'white', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Gönder</button>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: 200, flexShrink: 0 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>📄 Dokümanlar</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {RAG_DOCS.map(d => (
                                <div key={d.name} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 10px' }}>
                                    <div style={{ fontSize: 10, fontWeight: 600, color: 'white' }}>{d.name}</div>
                                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', marginTop: 2 }}>{d.size} · {d.chunks > 0 ? `${d.chunks} chunk` : 'İşleniyor...'}</div>
                                    <span style={{ fontSize: 7, fontWeight: 700, padding: '1px 4px', borderRadius: 2, background: d.status === 'indexed' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)', color: d.status === 'indexed' ? '#22C55E' : '#F59E0B' }}>{d.status === 'indexed' ? 'İndekslenmiş' : 'İşleniyor'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ KPI ═══ */}
            {tab === 'kpi' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                    {[
                        { title: 'Görev Tamamlama Oranı', value: '%82', sub: '41/50 görev bu ay', barPct: 82, barColor: '#22C55E' },
                        { title: 'Ort. Tamamlama Süresi', value: '1.2x', sub: 'Tahmini: 4sa · Gerçek: 4.8sa', barPct: 83, barColor: '#F59E0B' },
                        { title: 'Chatbot Çözüm Oranı', value: '%91', sub: '182/200 soru AI çözdü, 18 insan', barPct: 91, barColor: '#8B5CF6' },
                        { title: 'Geciken Görevler', value: '3', sub: 'Yüksek: 1 · Orta: 2', barPct: 6, barColor: '#EF4444' },
                    ].map(kpi => (
                        <div key={kpi.title} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '14px' }}>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{kpi.title}</div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: kpi.barColor, marginBottom: 2 }}>{kpi.value}</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 6 }}>{kpi.sub}</div>
                            <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                                <div style={{ width: `${kpi.barPct}%`, height: '100%', borderRadius: 2, background: kpi.barColor }} />
                            </div>
                        </div>
                    ))}
                    <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '14px' }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>👥 Ekip Verimliliği</div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {[{ name: 'Elif', done: 12, rate: '%95', time: '3.8sa' }, { name: 'Mert', done: 10, rate: '%88', time: '4.2sa' }, { name: 'Zeynep', done: 11, rate: '%92', time: '4.0sa' }, { name: 'Can', done: 8, rate: '%75', time: '5.1sa' }].map(m => (
                                <div key={m.name} style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{m.name}</div>
                                    <div style={{ fontSize: 10, color: '#22C55E', marginTop: 2 }}>{m.done} iş</div>
                                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{m.rate} zamanında · {m.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
