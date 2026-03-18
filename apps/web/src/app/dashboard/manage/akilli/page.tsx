'use client'

import { useState } from 'react'

/* ═══════ Demo Data ═══════ */
const VOICE_INTENTS = [
    { intent: 'GET_REVENUE', icon: '💰', label: 'Ciro Sorgula', example: 'Bugünkü ciroyu söyle', count: 45 },
    { intent: 'GET_ORDER_COUNT', icon: '📦', label: 'Sipariş Sayısı', example: 'Bu hafta kaç sipariş geldi', count: 32 },
    { intent: 'CREATE_BOOKING', icon: '📅', label: 'Randevu Al', example: "Yarın saat 3'e randevu al", count: 28 },
    { intent: 'CHECK_STOCK', icon: '📊', label: 'Stok Kontrol', example: 'Stokta kaç adet X var', count: 21 },
    { intent: 'CREATE_INVOICE', icon: '🧾', label: 'Fatura Oluştur', example: 'Son siparişi faturala', count: 15 },
    { intent: 'GET_APPOINTMENTS', icon: '🗓️', label: 'Randevular', example: 'Bugünkü randevuları göster', count: 18 },
]

const VOICE_LOG = [
    { text: 'Bugünkü ciroyu söyle', intent: 'GET_REVENUE', response: 'Bugünkü ciro ₺4,820. Dünden %12 daha yüksek.', confidence: 0.98, time: '2dk' },
    { text: 'Yarın saat 2ye Ahmet Bey randevu', intent: 'CREATE_BOOKING', response: 'Ahmet Bey için yarın 14:00 randevusu oluşturuldu.', confidence: 0.92, time: '5dk' },
    { text: 'Stokta kaç şampuan var', intent: 'CHECK_STOCK', response: 'Stokta 15 adet Wella Professional şampuan mevcut.', confidence: 0.95, time: '8dk' },
]

const AI_MENTIONS = [
    { platform: 'ChatGPT', icon: '🤖', color: '#10A37F', query: 'Kadıköy en iyi berber', mentioned: true },
    { platform: 'Perplexity', icon: '🔍', color: '#20B2AA', query: 'İstanbul berber önerisi', mentioned: true },
    { platform: 'Claude', icon: '🧠', color: '#D4A373', query: 'Kadıköy saç kesim', mentioned: false },
    { platform: 'Gemini', icon: '✨', color: '#4285F4', query: 'yakınımdaki berber', mentioned: true },
]

const SEO_DATA = [
    { label: 'JSON-LD Schema', value: 'BarberShop ✅', color: '#22C55E' },
    { label: 'llms.txt', value: 'Aktif ✅', color: '#22C55E' },
    { label: 'AI Mention', value: '3/4 platform', color: '#3B82F6' },
    { label: 'Bu Ay Öneri', value: '5 kez', color: '#8B5CF6' },
]

export default function AkilliFeaturesPage() {
    const [tab, setTab] = useState<'voice' | 'agentic' | 'seo'>('voice')

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ marginBottom: 16 }}>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🧠 Akıllı Özellikler</h1>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Sesli komut · Agentic Commerce · JSON-LD · llms.txt · AI Mention</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
                {SEO_DATA.map(s => (
                    <div key={s.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {([{ id: 'voice' as const, label: '🎤 Sesli Komut' }, { id: 'agentic' as const, label: '🤖 AI Mention' }, { id: 'seo' as const, label: '🔗 SEO/JSON-LD' }]).map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* ═══ VOICE ═══ */}
            {tab === 'voice' && (
                <div>
                    <div style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 12, padding: 14, marginBottom: 12, textAlign: 'center' }}>
                        <div style={{ fontSize: 40, marginBottom: 6 }}>🎤</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#8B5CF6' }}>Basılı Tut → Konuş → Bırak</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Deepgram Nova-3 Türkçe · Claude Haiku intent · ~₺0.005/komut</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 12 }}>
                        {VOICE_INTENTS.map(v => (
                            <div key={v.intent} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                                    <span style={{ fontSize: 14 }}>{v.icon}</span>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>{v.label}</span>
                                    <span style={{ fontSize: 9, fontWeight: 700, color: '#3B82F6', marginLeft: 'auto' }}>{v.count}</span>
                                </div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>"{v.example}"</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>📝 Son Komutlar</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {VOICE_LOG.map((l, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '8px 12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>🗣️ "{l.text}"</span>
                                    <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.15)' }}>{l.time} önce</span>
                                </div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>→ {l.response}</div>
                                <span style={{ fontSize: 7, color: '#22C55E', fontWeight: 600 }}>✅ {(l.confidence * 100).toFixed(0)}% güven</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══ AI MENTION ═══ */}
            {tab === 'agentic' && (
                <div style={{ maxWidth: 560 }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>🤖 AI Mention Tracking</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>4 AI platformunda işletmenizin ne sıklıkla önerildiğini takip edin.</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {AI_MENTIONS.map(m => (
                            <div key={m.platform} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontSize: 16 }}>{m.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.platform}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>"{m.query}"</div>
                                </div>
                                <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: m.mentioned ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: m.mentioned ? '#22C55E' : '#EF4444' }}>{m.mentioned ? '✅ Önerildi' : '❌ Yok'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══ SEO ═══ */}
            {tab === 'seo' && (
                <div style={{ maxWidth: 560 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 12, padding: 14 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#22C55E', marginBottom: 4 }}>✅ JSON-LD Active</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>@type: BarberShop · name · address · geo · rating · hasOfferCatalog · mainEntity (FAQ)</div>
                        </div>
                        <div style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 12, padding: 14 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#3B82F6', marginBottom: 4 }}>📄 llms.txt</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', whiteSpace: 'pre-line' }}>{'# İşletme Adı\n> Açıklama\n## Hizmetler\n- Erkek Saç Kesimi (₺250)\n## İletişim\n- Telefon · Adres · Web'}</div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 14 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>🔍 Agentic Commerce</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                                AI ajanları (ChatGPT, Perplexity, Gemini) sizin adınıza alışveriş yapar.<br />
                                JSON-LD + llms.txt ile siteniz AI tarafından keşfedilebilir hale gelir.<br />
                                Doğru schema + zengin içerik = AI önerilerinde üst sıralarda yer alın.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
