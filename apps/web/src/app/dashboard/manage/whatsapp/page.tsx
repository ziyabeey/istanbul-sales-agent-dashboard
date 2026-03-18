'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
type ConvState = 'active' | 'human_handoff' | 'completed'
interface Conversation {
    id: string; phone: string; name: string; state: ConvState
    lastMessage: string; lastAt: string; unread: number
    messages: { role: 'user' | 'assistant'; text: string; time: string; tools?: { name: string; ok: boolean }[] }[]
}

const DEMO: Conversation[] = [
    {
        id: 'c1', phone: '+905551234567', name: 'Ahmet Yılmaz', state: 'active',
        lastMessage: 'Yarın 14:00\'e randevu alabilir miyim?', lastAt: '2dk', unread: 1,
        messages: [
            { role: 'user', text: 'Merhaba, saç kesimi için fiyat nedir?', time: '14:20' },
            { role: 'assistant', text: 'Merhaba Ahmet Bey! 👋 Saç kesimi fiyatımız ₺150\'dir. Randevu almak ister misiniz?', time: '14:20', tools: [{ name: 'get_services_list', ok: true }] },
            { role: 'user', text: 'Evet, yarın müsait misiniz?', time: '14:22' },
            { role: 'assistant', text: 'Yarın için müsait saatlerimiz: 10:00, 11:30, 14:00, 15:30, 17:00. Hangisi size uygun?', time: '14:22', tools: [{ name: 'check_availability', ok: true }] },
            { role: 'user', text: 'Yarın 14:00\'e randevu alabilir miyim?', time: '14:25' },
        ],
    },
    {
        id: 'c2', phone: '+905559876543', name: 'Fatma Demir', state: 'human_handoff',
        lastMessage: 'Şikayet: Geçen hafta yaptırdığım işlemden memnun kalmadım.', lastAt: '15dk', unread: 0,
        messages: [
            { role: 'user', text: 'Geçen hafta yaptırdığım saç boyası çok kötü oldu!', time: '13:50' },
            { role: 'assistant', text: '🙋 Bu konuda size en iyi şekilde yardımcı olabilmek için sizi bir temsilcimize bağlıyorum. En kısa sürede dönüş yapılacaktır.', time: '13:50', tools: [{ name: 'escalate_to_human', ok: true }] },
        ],
    },
    {
        id: 'c3', phone: '+905553456789', name: 'Mehmet Kaya', state: 'active',
        lastMessage: 'Teşekkürler, randevum onaylandı mı?', lastAt: '1sa', unread: 0,
        messages: [
            { role: 'user', text: 'Bugün 16:00 için randevu almak istiyorum', time: '12:00' },
            { role: 'assistant', text: '✅ Randevunuz onaylandı! Bugün saat 16:00\'da bekliyoruz. Adres: Bağdat Caddesi No:45, Kadıköy.', time: '12:01', tools: [{ name: 'create_booking', ok: true }] },
            { role: 'user', text: 'Teşekkürler, randevum onaylandı mı?', time: '12:30' },
        ],
    },
    {
        id: 'c4', phone: '+905557654321', name: 'Ayşe Öztürk', state: 'completed',
        lastMessage: 'Çok teşekkür ederim!', lastAt: '3sa', unread: 0,
        messages: [
            { role: 'user', text: 'Çalışma saatleriniz nedir?', time: '10:00' },
            { role: 'assistant', text: 'Pzt-Cuma: 09:00-19:00\nCumartesi: 09:00-17:00\nPazar: Kapalı\n\nBaşka bir sorunuz var mı?', time: '10:00' },
            { role: 'user', text: 'Çok teşekkür ederim!', time: '10:02' },
        ],
    },
]

const STATS = [
    { label: 'Bugün Konuşma', value: '23', icon: '💬', color: '#8B5CF6' },
    { label: 'AI Çözüm', value: '%87', icon: '🤖', color: '#22c55e' },
    { label: 'Ort. Yanıt', value: '< 5sn', icon: '⚡', color: '#f59e0b' },
    { label: 'Handoff', value: '3', icon: '🙋', color: '#ef4444' },
]

export default function WhatsAppPage() {
    const [conversations] = useState(DEMO)
    const [selected, setSelected] = useState<Conversation | null>(DEMO[0])
    const [filter, setFilter] = useState<'all' | ConvState>('all')
    const [input, setInput] = useState('')

    const filtered = filter === 'all' ? conversations : conversations.filter(c => c.state === filter)

    const stateLabel = (s: ConvState) => {
        if (s === 'active') return { text: 'Aktif', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' }
        if (s === 'human_handoff') return { text: 'Temsilci', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }
        return { text: 'Tamamlandı', color: 'rgba(255,255,255,0.25)', bg: 'rgba(255,255,255,0.03)' }
    }

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>💬 WhatsApp AI Motoru</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Meta Cloud API + Claude · Otomatik sipariş, randevu, destek</p>
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

            {/* Main: Conversations + Chat */}
            <div style={{ display: 'flex', gap: 10, minHeight: 480 }}>
                {/* Conversation List */}
                <div style={{ width: 280, flexShrink: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Filters */}
                    <div style={{ padding: '8px 8px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 3 }}>
                        {(['all', 'active', 'human_handoff', 'completed'] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{
                                flex: 1, padding: '4px 0', borderRadius: 5, border: 'none', fontSize: 9, fontWeight: 700,
                                background: filter === f ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                                color: filter === f ? '#f97316' : 'rgba(255,255,255,0.25)',
                                cursor: 'pointer', fontFamily: 'inherit',
                            }}>{f === 'all' ? 'Tümü' : f === 'active' ? 'Aktif' : f === 'human_handoff' ? '🙋' : '✓'}</button>
                        ))}
                    </div>

                    {/* List */}
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {filtered.map(c => {
                            const sl = stateLabel(c.state)
                            return (
                                <div key={c.id} onClick={() => setSelected(c)} style={{
                                    padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.03)',
                                    background: selected?.id === c.id ? 'rgba(200,75,49,0.06)' : 'transparent',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{c.name}</span>
                                        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>{c.lastAt}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <span style={{ fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 3, background: sl.bg, color: sl.color }}>{sl.text}</span>
                                        {c.unread > 0 && <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#C84B31', color: 'white', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.unread}</span>}
                                    </div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.lastMessage}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Chat View */}
                {selected ? (
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        {/* Chat Header */}
                        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{selected.name}</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{selected.phone}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {selected.state === 'human_handoff' && (
                                    <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>🙋 Temsilci Bekliyor</span>
                                )}
                                {selected.state === 'active' && (
                                    <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>🤖 AI Aktif</span>
                                )}
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {selected.messages.map((m, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                    <div style={{
                                        maxWidth: '80%', padding: '8px 12px', borderRadius: 12,
                                        background: m.role === 'user' ? 'rgba(200,75,49,0.12)' : 'rgba(139,92,246,0.08)',
                                        borderBottomRightRadius: m.role === 'user' ? 4 : 12,
                                        borderBottomLeftRadius: m.role === 'assistant' ? 4 : 12,
                                    }}>
                                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{m.text}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 4 }}>
                                            {m.tools?.map((t, j) => (
                                                <span key={j} style={{ fontSize: 8, fontWeight: 600, padding: '1px 5px', borderRadius: 3, background: t.ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: t.ok ? '#22c55e' : '#ef4444' }}>
                                                    {t.ok ? '✓' : '✗'} {t.name}
                                                </span>
                                            ))}
                                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>{m.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input (human handoff mode) */}
                        {selected.state === 'human_handoff' && (
                            <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
                                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Temsilci yanıtı yazın..." style={{
                                    flex: 1, padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)',
                                    background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none',
                                }} />
                                <button style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: '#ef4444', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Gönder</button>
                            </div>
                        )}

                        {/* AI mode info */}
                        {selected.state === 'active' && (
                            <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
                                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>🤖 Bu konuşma AI tarafından yönetiliyor · Claude Sonnet · 24h pencere aktif</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14 }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.15)' }}>Bir konuşma seçin</span>
                    </div>
                )}
            </div>
        </div>
    )
}
