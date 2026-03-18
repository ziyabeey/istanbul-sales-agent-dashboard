'use client'

import { useState, useRef, useEffect } from 'react'

/* ═══════ Types ═══════ */
interface ChatMessage {
    id: string; role: 'user' | 'assistant'; content: string
    toolResults?: { action: string; success: boolean }[]
    tokenCost?: number
}

const QUICK_ACTIONS = [
    { id: 'color', icon: '🎨', label: 'Renk Değiştir', prompt: 'Sitemin renklerini değiştirmek istiyorum.' },
    { id: 'text', icon: '📝', label: 'Metin Düzenle', prompt: 'Sitedeki metinleri düzenlemek istiyorum.' },
    { id: 'image', icon: '🖼️', label: 'Görsel Değiştir', prompt: 'Sitedeki görselleri değiştirmek istiyorum.' },
    { id: 'add', icon: '➕', label: 'Bölüm Ekle', prompt: 'Siteye yeni bir bölüm eklemek istiyorum.' },
    { id: 'swap', icon: '🔄', label: 'Bölüm Değiştir', prompt: 'Bir bölümün tasarımını değiştirmek istiyorum.' },
]

const DEMO_MESSAGES: ChatMessage[] = [
    { id: '1', role: 'assistant', content: 'Merhaba! 👋 Ben kepenk.ai AI editörüyüm. Sitenizde değişiklik yapmak istiyorsanız bana söyleyin. Renk değişimi, metin düzenleme, bölüm ekleme gibi işlemleri sizin için yapabilirim.' },
    { id: '2', role: 'user', content: 'Hero bölümünün başlığını "Usta Berber — Premium Erkek Bakım" olarak değiştir.' },
    { id: '3', role: 'assistant', content: 'Başlığınızı değiştiriyorum... ✅\n\nHero bölümünüzün başlığı "Usta Berber — Premium Erkek Bakım" olarak güncellendi. Önizlemede görebilirsiniz.', toolResults: [{ action: 'update_content', success: true }], tokenCost: 1 },
    { id: '4', role: 'user', content: 'Renk paletini daha modern yap.' },
    { id: '5', role: 'assistant', content: 'Sitenize modern bir palet uyguluyorum... 🎨\n\n✅ Ana renk: **#1A1A2E** → **#0F172A** (derin lacivert)\n✅ Vurgu: **#C9A84C** → **#F59E0B** (amber gold)\n✅ Arka plan: sıcak bej tonuna geçildi.\n\nDeğişiklikler önizlemede yansıdı. Beğenmediyseniz geri alabilirim!', toolResults: [{ action: 'change_colors', success: true }], tokenCost: 1 },
]

export default function AIEditorPage() {
    const [messages, setMessages] = useState(DEMO_MESSAGES)
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [tokensUsed, setTokensUsed] = useState(5)
    const [showTokenDetail, setShowTokenDetail] = useState(false)
    const [activeMode, setActiveMode] = useState<'standard' | 'ai'>('ai')
    const chatEnd = useRef<HTMLDivElement>(null)
    const tokenLimit = 50

    useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

    const handleSend = async (text?: string) => {
        const msg = text || input.trim()
        if (!msg) return
        setInput('')

        const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', content: msg }
        setMessages(prev => [...prev, userMsg])
        setIsTyping(true)

        // Simulated AI response
        setTimeout(() => {
            const aiMsg: ChatMessage = {
                id: `a-${Date.now()}`, role: 'assistant',
                content: `İsteğinizi işliyorum... ✅\n\n"${msg.slice(0, 60)}${msg.length > 60 ? '...' : ''}" için değişiklikler uygulandı. Önizlemede kontrol edebilirsiniz.`,
                toolResults: [{ action: 'update_content', success: true }], tokenCost: 1,
            }
            setMessages(prev => [...prev, aiMsg])
            setTokensUsed(prev => prev + 1)
            setIsTyping(false)
        }, 1500)
    }

    const tokenPercent = (tokensUsed / tokenLimit) * 100
    const tokenColor = tokenPercent > 95 ? '#ef4444' : tokenPercent > 80 ? '#f59e0b' : '#22c55e'

    return (
        <div style={{ maxWidth: 900, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
            {/* ═══ Top Bar: Mode Switcher + Token ═══ */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexShrink: 0 }}>
                {/* Mode Switcher */}
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 3 }}>
                    <button onClick={() => setActiveMode('standard')} style={{
                        padding: '7px 16px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: activeMode === 'standard' ? '#C84B31' : 'transparent',
                        color: activeMode === 'standard' ? 'white' : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer', fontFamily: 'inherit', transition: '0.2s',
                    }}>🛠️ Standart Editör</button>
                    <button onClick={() => setActiveMode('ai')} style={{
                        padding: '7px 16px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: activeMode === 'ai' ? '#8B5CF6' : 'transparent',
                        color: activeMode === 'ai' ? 'white' : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer', fontFamily: 'inherit', transition: '0.2s',
                    }}>✨ AI Editör</button>
                </div>

                {/* Token Counter */}
                <div style={{ position: 'relative' }}>
                    <button onClick={() => setShowTokenDetail(!showTokenDetail)} style={{
                        padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.03)', cursor: 'pointer', fontFamily: 'inherit',
                        display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <span style={{ fontSize: 12 }}>🔋</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: tokenColor }}>{tokensUsed}/{tokenLimit}</span>
                        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
                            <div style={{ width: `${tokenPercent}%`, height: '100%', borderRadius: 2, background: tokenColor, transition: '0.3s' }} />
                        </div>
                    </button>

                    {showTokenDetail && (
                        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, width: 220, background: '#0c0c14', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', padding: 14, zIndex: 50 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'white', marginBottom: 8 }}>Token Kullanımı</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Bu ay kullanılan: <b style={{ color: 'white' }}>{tokensUsed}</b></div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>Kalan: <b style={{ color: tokenColor }}>{tokenLimit - tokensUsed}</b></div>
                            <button style={{ width: '100%', padding: '6px 0', borderRadius: 6, border: 'none', background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 4 }}>💎 Ek Token Satın Al</button>
                            <button style={{ width: '100%', padding: '6px 0', borderRadius: 6, border: 'none', background: 'rgba(200,75,49,0.12)', color: '#C84B31', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🚀 Planı Yükselt</button>
                        </div>
                    )}
                </div>
            </div>

            {/* ═══ Main: Chat + Preview ═══ */}
            <div style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0 }}>
                {/* Chat Panel */}
                <div style={{ width: 380, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden' }}>
                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {messages.map(m => (
                            <div key={m.id} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{
                                    maxWidth: '85%', padding: '10px 14px', borderRadius: 14,
                                    background: m.role === 'user' ? 'rgba(200,75,49,0.15)' : 'rgba(139,92,246,0.08)',
                                    borderBottomRightRadius: m.role === 'user' ? 4 : 14,
                                    borderBottomLeftRadius: m.role === 'assistant' ? 4 : 14,
                                }}>
                                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{m.content}</div>
                                    {m.toolResults && (
                                        <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                            {m.toolResults.map((t, i) => (
                                                <span key={i} style={{ fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: t.success ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: t.success ? '#22c55e' : '#ef4444' }}>
                                                    {t.success ? '✓' : '✗'} {t.action}
                                                </span>
                                            ))}
                                            {m.tokenCost && (
                                                <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}>🔋 -{m.tokenCost}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div style={{ padding: '10px 14px', borderRadius: 14, borderBottomLeftRadius: 4, background: 'rgba(139,92,246,0.08)' }}>
                                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>AI düşünüyor<span className="dots">...</span></span>
                                </div>
                            </div>
                        )}
                        <div ref={chatEnd} />
                    </div>

                    {/* Quick Actions */}
                    <div style={{ padding: '8px 10px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {QUICK_ACTIONS.map(a => (
                            <button key={a.id} onClick={() => handleSend(a.prompt)} style={{
                                padding: '4px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)',
                                background: 'rgba(255,255,255,0.02)', fontSize: 10, fontWeight: 600,
                                color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'inherit',
                            }}>{a.icon} {a.label}</button>
                        ))}
                    </div>

                    {/* Input */}
                    <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                            placeholder="Siteyi nasıl değiştirmek istersiniz?"
                            style={{
                                flex: 1, padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)',
                                background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12,
                                fontFamily: 'inherit', outline: 'none',
                            }}
                        />
                        <button onClick={() => handleSend()} disabled={!input.trim()} style={{
                            padding: '8px 14px', borderRadius: 10, border: 'none',
                            background: input.trim() ? '#8B5CF6' : 'rgba(255,255,255,0.05)',
                            color: input.trim() ? 'white' : 'rgba(255,255,255,0.15)',
                            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                        }}>Gönder</button>
                    </div>
                </div>

                {/* Live Preview */}
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                        <div style={{ display: 'flex', gap: 4 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                        </div>
                        <div style={{ flex: 1, padding: '3px 10px', borderRadius: 5, background: 'rgba(255,255,255,0.03)', fontSize: 10, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>usta-berber.kepenk.ai</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f6f3', color: '#1A1A2E' }}>
                        <div style={{ textAlign: 'center', padding: 40 }}>
                            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, fontFamily: 'serif' }}>Usta Berber</div>
                            <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Premium Erkek Bakım</div>
                            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                                <span style={{ padding: '8px 20px', borderRadius: 10, background: '#1A1A2E', color: 'white', fontSize: 12, fontWeight: 600 }}>Randevu Al</span>
                                <span style={{ padding: '8px 20px', borderRadius: 10, border: '1px solid #1A1A2E', color: '#1A1A2E', fontSize: 12, fontWeight: 600 }}>WhatsApp</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
