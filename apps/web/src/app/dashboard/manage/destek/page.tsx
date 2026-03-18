'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
type TStatus = 'open' | 'assigned' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed'
type TPriority = 'P1' | 'P2' | 'P3' | 'P4'

interface DemoTicket {
    id: string; subject: string; user: string; status: TStatus; priority: TPriority
    category: string; aiConfidence?: number; aiResolved?: boolean
    slaRemaining: string; slaBreached: boolean; createdAt: string
    messages: { sender: string; type: 'customer' | 'agent' | 'ai'; text: string; time: string }[]
}

const PRIORITY_MAP: Record<TPriority, { l: string; c: string }> = {
    P1: { l: 'Kritik', c: '#ef4444' }, P2: { l: 'Yüksek', c: '#f59e0b' },
    P3: { l: 'Orta', c: '#3B82F6' }, P4: { l: 'Düşük', c: '#6B7280' },
}
const STATUS_MAP: Record<TStatus, { l: string; c: string }> = {
    open: { l: 'Açık', c: '#22c55e' }, assigned: { l: 'Atandı', c: '#8B5CF6' },
    in_progress: { l: 'İşleniyor', c: '#3B82F6' }, waiting_customer: { l: 'Müşteri Bekleniyor', c: '#f59e0b' },
    resolved: { l: 'Çözüldü', c: '#10B981' }, closed: { l: 'Kapatıldı', c: '#6B7280' },
}

const DEMO: DemoTicket[] = [
    { id: 'TK-001', subject: 'Ödeme sayfası hata veriyor', user: 'Ahmet Y.', status: 'open', priority: 'P1', category: 'technical', slaRemaining: '12dk', slaBreached: false, createdAt: '3dk önce', messages: [
        { sender: 'Ahmet Y.', type: 'customer', text: 'Müşterilerim ödeme sayfasında 500 hatası alıyor. Acil çözüm lazım!', time: '14:55' },
    ]},
    { id: 'TK-002', subject: 'Fatura indirme çalışmıyor', user: 'Fatma D.', status: 'assigned', priority: 'P3', category: 'billing', aiConfidence: 0.92, aiResolved: false, slaRemaining: '3sa 45dk', slaBreached: false, createdAt: '15dk önce', messages: [
        { sender: 'Fatma D.', type: 'customer', text: 'Geçmiş faturalarımı PDF olarak indiremiyorum.', time: '14:40' },
        { sender: 'AI', type: 'ai', text: '📄 Fatura indirme: Ayarlar → Ödeme → Fatura Geçmişi → PDF İndir butonu. İndirme başlamazsa tarayıcı popup engelleyicisini kontrol edin.', time: '14:41' },
    ]},
    { id: 'TK-003', subject: 'SEO ayarları nerede?', user: 'Mehmet K.', status: 'resolved', priority: 'P4', category: 'technical', aiConfidence: 0.95, aiResolved: true, slaRemaining: '—', slaBreached: false, createdAt: '1sa önce', messages: [
        { sender: 'Mehmet K.', type: 'customer', text: 'SEO meta açıklamalarını nereden düzenleyebilirim?', time: '13:50' },
        { sender: 'AI', type: 'ai', text: '🔍 SEO ayarları: Site Yönetimi → SEO sekmesi → Meta Başlık ve Açıklama alanları. Her sayfa için ayrı SEO ayarı yapabilirsiniz.', time: '13:50' },
    ]},
    { id: 'TK-004', subject: 'Planımı yükseltmek istiyorum', user: 'Ayşe Ö.', status: 'waiting_customer', priority: 'P3', category: 'billing', slaRemaining: '2sa', slaBreached: false, createdAt: '2sa önce', messages: [
        { sender: 'Ayşe Ö.', type: 'customer', text: 'Başlangıç planından büyüme planına geçmek istiyorum.', time: '12:50' },
        { sender: 'Destek', type: 'agent', text: 'Merhaba Ayşe Hanım! Planınızı dashboard → Ayarlar → Abonelik bölümünden yükseltebilirsiniz. Fark tutarı günlük olarak hesaplanır. Yardımcı olmamı ister misiniz?', time: '13:10' },
    ]},
    { id: 'TK-005', subject: 'Sitem çok yavaş yükleniyor', user: 'Ali B.', status: 'in_progress', priority: 'P2', category: 'technical', slaRemaining: '45dk', slaBreached: true, createdAt: '6sa önce', messages: [
        { sender: 'Ali B.', type: 'customer', text: 'Sitem son 2 gündür çok yavaş. Google PageSpeed 35 puan gösteriyor.', time: '08:50' },
        { sender: 'Destek', type: 'agent', text: 'Sitenizi inceliyoruz. Büyük boyutlu görseller tespit ettik, optimizasyon yapıyoruz.', time: '09:30' },
    ]},
]

const STATS = [
    { label: 'Açık Ticket', value: '12', icon: '🎫', color: '#22c55e' },
    { label: 'AI Çözüm', value: '%68', icon: '🤖', color: '#8B5CF6' },
    { label: 'Ort. Çözüm', value: '2.3sa', icon: '⏱️', color: '#f59e0b' },
    { label: 'SLA İhlali', value: '1', icon: '🚨', color: '#ef4444' },
]

export default function SupportPage() {
    const [tickets] = useState(DEMO)
    const [selected, setSelected] = useState<DemoTicket | null>(DEMO[0])
    const [filter, setFilter] = useState<'all' | TStatus>('all')

    const filtered = filter === 'all' ? tickets : tickets.filter(t => t.status === filter)

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🎫 Destek Merkezi</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Ticket yönetimi · AI otomatik yanıt · SLA takibi · RAG bilgi bankası</p>
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

            {/* Main */}
            <div style={{ display: 'flex', gap: 10, minHeight: 440 }}>
                {/* Ticket List */}
                <div style={{ width: 340, flexShrink: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '8px 8px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        {(['all', 'open', 'assigned', 'in_progress', 'resolved'] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{
                                padding: '3px 7px', borderRadius: 5, border: 'none', fontSize: 9, fontWeight: 700,
                                background: filter === f ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                                color: filter === f ? '#f97316' : 'rgba(255,255,255,0.25)',
                                cursor: 'pointer', fontFamily: 'inherit',
                            }}>{f === 'all' ? 'Tümü' : STATUS_MAP[f]?.l || f}</button>
                        ))}
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {filtered.map(t => (
                            <div key={t.id} onClick={() => setSelected(t)} style={{
                                padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)',
                                background: selected?.id === t.id ? 'rgba(200,75,49,0.06)' : 'transparent',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                                    <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 3, background: `${PRIORITY_MAP[t.priority].c}20`, color: PRIORITY_MAP[t.priority].c }}>{t.priority}</span>
                                    <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 3, background: `${STATUS_MAP[t.status].c}20`, color: STATUS_MAP[t.status].c }}>{STATUS_MAP[t.status].l}</span>
                                    {t.aiConfidence && t.aiConfidence > 0.85 && <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 3, background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>🤖 AI</span>}
                                    {t.slaBreached && <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 3, background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>⏰ SLA</span>}
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: 'white', marginBottom: 2 }}>{t.subject}</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>
                                    <span>{t.user}</span><span>{t.createdAt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail */}
                {selected ? (
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.2)' }}>{selected.id}</span>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: `${PRIORITY_MAP[selected.priority].c}20`, color: PRIORITY_MAP[selected.priority].c }}>{PRIORITY_MAP[selected.priority].l}</span>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: `${STATUS_MAP[selected.status].c}20`, color: STATUS_MAP[selected.status].c }}>{STATUS_MAP[selected.status].l}</span>
                                {!selected.slaBreached && <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginLeft: 'auto' }}>⏱️ SLA: {selected.slaRemaining}</span>}
                                {selected.slaBreached && <span style={{ fontSize: 9, color: '#ef4444', fontWeight: 700, marginLeft: 'auto' }}>🚨 SLA İhlali!</span>}
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{selected.subject}</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{selected.user} · {selected.category} · {selected.createdAt}</div>
                        </div>

                        {/* AI Confidence */}
                        {selected.aiConfidence != null && (
                            <div style={{ padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>🤖 AI Güven:</span>
                                <div style={{ width: 60, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                                    <div style={{ width: `${selected.aiConfidence * 100}%`, height: '100%', borderRadius: 2, background: selected.aiConfidence > 0.85 ? '#22c55e' : selected.aiConfidence > 0.5 ? '#f59e0b' : '#ef4444' }} />
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 700, color: selected.aiConfidence > 0.85 ? '#22c55e' : '#f59e0b' }}>{Math.round(selected.aiConfidence * 100)}%</span>
                                {selected.aiResolved && <span style={{ fontSize: 9, fontWeight: 600, padding: '1px 5px', borderRadius: 3, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>✓ AI Çözüm</span>}
                            </div>
                        )}

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {selected.messages.map((m, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: m.type === 'customer' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{
                                        maxWidth: '80%', padding: '8px 12px', borderRadius: 12,
                                        background: m.type === 'customer' ? 'rgba(200,75,49,0.12)' : m.type === 'ai' ? 'rgba(139,92,246,0.08)' : 'rgba(34,197,94,0.08)',
                                        borderBottomRightRadius: m.type === 'customer' ? 4 : 12,
                                        borderBottomLeftRadius: m.type !== 'customer' ? 4 : 12,
                                    }}>
                                        <div style={{ fontSize: 9, fontWeight: 700, color: m.type === 'ai' ? '#8B5CF6' : m.type === 'agent' ? '#22c55e' : 'rgba(255,255,255,0.3)', marginBottom: 2 }}>
                                            {m.type === 'ai' ? '🤖 AI' : m.type === 'agent' ? '👤 Destek' : m.sender}
                                        </div>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{m.text}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)', textAlign: 'right', marginTop: 4 }}>{m.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14 }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.15)' }}>Bir ticket seçin</span>
                    </div>
                )}
            </div>
        </div>
    )
}
