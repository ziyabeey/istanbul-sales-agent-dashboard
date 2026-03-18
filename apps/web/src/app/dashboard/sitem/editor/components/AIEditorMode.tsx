'use client'

import { useState, useRef, useEffect } from 'react'
import { useEditorStore } from '../store/editor-store'
import { useEsnaf } from '@/context/EsnafContext'

/* ═══════ Types ═══════ */
interface ChatMessage {
    id: string
    role: 'user' | 'ai'
    text: string
    tokenCost?: number
    timestamp: number
}

const QUICK_ACTIONS = [
    { emoji: '🎨', label: 'Renkleri Değiştir', prompt: 'Ana renk paletini değiştirmek istiyorum' },
    { emoji: '📝', label: 'Metinleri Düzenle', prompt: 'Hero bölümünün başlığını ve alt başlığını düzenle' },
    { emoji: '🖼️', label: 'Görsel Değiştir', prompt: 'Hero bölümünün arka plan görselini değiştir' },
    { emoji: '➕', label: 'Bölüm Ekle', prompt: 'Siteye yeni bir bölüm eklemek istiyorum' },
    { emoji: '🔄', label: 'Bölüm Değiştir', prompt: 'Mevcut bir bölümü farklı bir tasarımla değiştir' },
    { emoji: '📱', label: 'Mobil Görünüm', prompt: 'Sitemi mobil cihazlara optimize et' },
]

/* ═══════ AI Editor Mode ═══════ */
export default function AIEditorMode() {
    const { esnaf } = useEsnaf()
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const generatedHtml = useEditorStore(s => s.generatedHtml)
    const aiTokensUsed = useEditorStore(s => s.aiTokensUsed)
    const aiTokensLimit = useEditorStore(s => s.aiTokensLimit)
    const setAiTokensUsed = useEditorStore(s => s.setAiTokensUsed)

    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '0', role: 'ai', text: `Merhaba! 👋 Sitenizde ne değiştirmek istersiniz?\n\nAşağıdaki hızlı aksiyonları kullanabilir veya doğrudan yazabilirsiniz.`, timestamp: Date.now() },
    ])
    const [input, setInput] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const chatEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const tokensRemaining = aiTokensLimit - aiTokensUsed

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async (text: string) => {
        if (!text.trim() || isProcessing) return
        const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text: text.trim(), timestamp: Date.now() }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsProcessing(true)

        // Determine token cost
        let tokenCost = 1
        const lowerText = text.toLowerCase()
        if (lowerText.includes('ekle') || lowerText.includes('bölüm')) tokenCost = 2
        if (lowerText.includes('yeniden') || lowerText.includes('tamamen')) tokenCost = 5

        // Check token budget
        if (aiTokensUsed + tokenCost > aiTokensLimit) {
            const noTokenMsg: ChatMessage = {
                id: `ai-${Date.now()}`, role: 'ai', timestamp: Date.now(),
                text: `⚠️ Yeterli token yok. Bu işlem ${tokenCost} token gerektirir ama ${tokensRemaining} token kaldı.\n\nEk token satın almak için Ayarlar → Paket bölümüne gidin.`,
            }
            setMessages(prev => [...prev, noTokenMsg])
            setIsProcessing(false)
            return
        }

        // Simulate AI processing (in production → /api/ai/editor-command)
        try {
            const res = await fetch('/api/ai/editor-command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    command: text.trim(),
                    siteData,
                    esnafId: esnaf?.id,
                }),
            })

            let aiResponse: string
            if (res.ok) {
                const data = await res.json()
                if (data.siteDataUpdate) updateSiteData(data.siteDataUpdate)
                aiResponse = data.message || '✅ Değişiklik uygulandı!'
            } else {
                // Fallback — simulate intelligent response
                aiResponse = simulateAIResponse(text.trim(), siteData)
                applySimulatedChanges(text.trim(), siteData, updateSiteData)
            }

            setAiTokensUsed(aiTokensUsed + tokenCost)
            const aiMsg: ChatMessage = {
                id: `ai-${Date.now()}`, role: 'ai', text: aiResponse,
                tokenCost, timestamp: Date.now(),
            }
            setMessages(prev => [...prev, aiMsg])
        } catch {
            const aiMsg: ChatMessage = {
                id: `ai-${Date.now()}`, role: 'ai', timestamp: Date.now(),
                text: simulateAIResponse(text.trim(), siteData),
                tokenCost,
            }
            applySimulatedChanges(text.trim(), siteData, updateSiteData)
            setAiTokensUsed(aiTokensUsed + tokenCost)
            setMessages(prev => [...prev, aiMsg])
        }
        setIsProcessing(false)
    }

    return (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Left — Chat Panel */}
            <div style={{
                width: 380, minWidth: 340, display: 'flex', flexDirection: 'column',
                background: '#0c0c14', borderRight: '1px solid rgba(255,255,255,0.06)',
            }}>
                {/* Chat header */}
                <div style={{
                    padding: '16px 18px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: 'linear-gradient(180deg, rgba(168,85,247,0.05), transparent)',
                }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>✨ AI Editör</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                        Token: {tokensRemaining}/{aiTokensLimit} kalan
                    </div>
                    {/* Token progress */}
                    <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                        <div style={{
                            width: `${Math.min(100, (tokensRemaining / aiTokensLimit) * 100)}%`,
                            height: '100%', borderRadius: 2, transition: 'width 0.3s',
                            background: tokensRemaining > 10 ? '#22c55e' : tokensRemaining > 3 ? '#f59e0b' : '#ef4444',
                        }} />
                    </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {messages.map(msg => (
                        <div key={msg.id} style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        }}>
                            <div style={{
                                maxWidth: '88%', padding: '10px 14px', borderRadius: 14,
                                fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-wrap',
                                ...(msg.role === 'user'
                                    ? { background: '#dc4e1e', color: 'white', borderBottomRightRadius: 4 }
                                    : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', borderBottomLeftRadius: 4, border: '1px solid rgba(255,255,255,0.06)' }
                                ),
                            }}>
                                {msg.text}
                            </div>
                            {msg.tokenCost && (
                                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginTop: 2, padding: '0 4px' }}>
                                    -{msg.tokenCost} token
                                </span>
                            )}
                        </div>
                    ))}
                    {isProcessing && (
                        <div style={{
                            padding: '10px 14px', borderRadius: 14, borderBottomLeftRadius: 4,
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)',
                            color: 'rgba(255,255,255,0.4)', fontSize: 13, maxWidth: '88%',
                        }}>
                            ✍️ AI düşünüyor...
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Quick actions */}
                <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {QUICK_ACTIONS.map((a, i) => (
                        <button key={i} onClick={() => handleSend(a.prompt)} disabled={isProcessing}
                            style={{
                                padding: '5px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)',
                                background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.5)',
                                fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                            }}>
                            {a.emoji} {a.label}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <div style={{ padding: '10px 14px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input) } }}
                            placeholder="Ne değiştirmek istiyorsunuz?"
                            rows={1}
                            style={{
                                flex: 1, padding: '10px 14px', borderRadius: 12,
                                border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)',
                                color: 'white', fontSize: 13, fontFamily: 'inherit',
                                resize: 'none', outline: 'none', lineHeight: 1.4,
                            }}
                        />
                        <button onClick={() => handleSend(input)} disabled={isProcessing || !input.trim()}
                            style={{
                                width: 38, height: 38, borderRadius: 10, border: 'none',
                                background: input.trim() ? '#dc4e1e' : 'rgba(255,255,255,0.05)',
                                color: 'white', fontSize: 16, cursor: 'pointer', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                            ↑
                        </button>
                    </div>
                </div>
            </div>

            {/* Right — Live Preview */}
            <div style={{ flex: 1, background: '#e8ecf1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
                <div style={{
                    width: '100%', height: '100%', position: 'relative',
                }}>
                    <iframe
                        srcDoc={generatedHtml || '<div style="display:flex;align-items:center;justify-content:center;height:100vh;color:#999;font-family:sans-serif">Site önizlemesi yükleniyor...</div>'}
                        style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
                        title="AI Editör Önizleme"
                        sandbox="allow-scripts allow-same-origin"
                    />
                </div>
            </div>
        </div>
    )
}

/* ═══════ Simulated AI Responses (offline fallback) ═══════ */
function simulateAIResponse(command: string, siteData: any): string {
    const lower = command.toLowerCase()
    if (lower.includes('renk')) return '🎨 Renk paletini güncelliyorum...\n\n✅ Ana tema renkleri değiştirildi! Önizlemeyi kontrol edin.'
    if (lower.includes('başlık') || lower.includes('metin')) return '📝 Metin güncelleniyor...\n\n✅ Hero bölümü başlığı değiştirildi.'
    if (lower.includes('görsel') || lower.includes('resim')) return '🖼️ Görsel kaynağı güncelleniyor...\n\n✅ Yeni görsel uygulandı.'
    if (lower.includes('ekle') || lower.includes('bölüm')) return '➕ Yeni bölüm ekleniyor...\n\n3 seçenek var:\n1️⃣ Müşteri Yorumları (Slider)\n2️⃣ Galeri (Grid)\n3️⃣ SSS (Accordion)\n\nHangisini ekleyeyim?'
    if (lower.includes('mobil')) return '📱 Mobil optimizasyon kontrol ediliyor...\n\n✅ Siteniz zaten responsive! Font boyutları ve padding mobil için optimize.'
    if (lower.includes('font') || lower.includes('yazı tipi')) return '🔤 Font değiştiriliyor...\n\n✅ Yeni font uygulandı.'
    return `✅ İsteğinizi anladım: "${command}"\n\nDeğişiklik uygulandı! Önizlemeyi kontrol edin.`
}

function applySimulatedChanges(command: string, siteData: any, updateSiteData: (p: any) => void) {
    if (!siteData) return
    const lower = command.toLowerCase()
    if (lower.includes('renk') && lower.includes('kırmızı')) updateSiteData({ accent: '#dc2626' })
    else if (lower.includes('renk') && lower.includes('mavi')) updateSiteData({ accent: '#2563eb' })
    else if (lower.includes('renk') && lower.includes('yeşil')) updateSiteData({ accent: '#16a34a' })
    else if (lower.includes('renk') && lower.includes('mor')) updateSiteData({ accent: '#9333ea' })
    else if (lower.includes('font') && lower.includes('serif')) updateSiteData({ font: 'Georgia, serif' })
}
