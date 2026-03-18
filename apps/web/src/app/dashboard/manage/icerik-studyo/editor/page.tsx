'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface Template { id: string; name: string; cat: string; w: number; h: number; icon: string; sector?: string }
type Tool = 'select' | 'text' | 'image' | 'shape' | 'ai'

const SIZES = [
    { cat: 'instagram_post', label: 'IG Post', w: 1080, h: 1080, icon: '📱' },
    { cat: 'instagram_story', label: 'IG Story', w: 1080, h: 1920, icon: '📲' },
    { cat: 'facebook_post', label: 'FB Post', w: 1080, h: 1080, icon: '👤' },
    { cat: 'whatsapp_status', label: 'WA Durum', w: 1080, h: 1920, icon: '💬' },
    { cat: 'twitter_post', label: 'X Post', w: 1200, h: 675, icon: '🐦' },
    { cat: 'youtube_thumbnail', label: 'YT Thumbnail', w: 1280, h: 720, icon: '▶️' },
    { cat: 'menu_poster', label: 'Menü (A4)', w: 2480, h: 3508, icon: '🍽️' },
]

const TEMPLATES: Template[] = [
    { id: 't1', name: 'İndirim Duyurusu', cat: 'instagram_post', w: 1080, h: 1080, icon: '🏷️', sector: 'berber' },
    { id: 't2', name: 'Yeni Hizmet Tanıtım', cat: 'instagram_post', w: 1080, h: 1080, icon: '✨' },
    { id: 't3', name: 'Hikaye Promosyon', cat: 'instagram_story', w: 1080, h: 1920, icon: '🎉', sector: 'restoran' },
    { id: 't4', name: 'Hafta Sonu Menü', cat: 'menu_poster', w: 2480, h: 3508, icon: '🍽️', sector: 'restoran' },
    { id: 't5', name: 'Müşteri Yorumu', cat: 'instagram_post', w: 1080, h: 1080, icon: '⭐' },
    { id: 't6', name: 'Açılış Kampanyası', cat: 'facebook_post', w: 1080, h: 1080, icon: '🎊' },
]

const TOOLS: { id: Tool; label: string; icon: string }[] = [
    { id: 'select', label: 'Seç', icon: '🖱️' },
    { id: 'text', label: 'Metin', icon: '🔤' },
    { id: 'image', label: 'Görsel', icon: '🖼️' },
    { id: 'shape', label: 'Şekil', icon: '⬛' },
    { id: 'ai', label: 'AI ✨', icon: '✨' },
]

export default function StudioEditorPage() {
    const [activeTool, setActiveTool] = useState<Tool>('select')
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
    const [selectedSize, setSelectedSize] = useState(SIZES[0])
    const [propPanel, setPropPanel] = useState({ fill: '#C84B31', fontSize: 24, fontFamily: 'Inter', opacity: 100 })

    return (
        <div style={{ maxWidth: 960 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🎨 Stüdyo Editör</h1>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Fabric.js v7 · Şablonlar · AI görsel üretimi · Export (PNG/JPG/WebP)</p>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                    <button style={{ padding: '6px 12px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>PNG İndir</button>
                    <button style={{ padding: '6px 12px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>JPG İndir</button>
                    <button style={{ padding: '6px 12px', borderRadius: 7, border: 'none', background: '#8B5CF6', color: 'white', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📅 Paylaş</button>
                </div>
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 10, padding: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                {TOOLS.map(t => (
                    <button key={t.id} onClick={() => setActiveTool(t.id)} style={{
                        padding: '5px 12px', borderRadius: 6, border: 'none', fontSize: 11, fontWeight: 700,
                        background: activeTool === t.id ? 'rgba(200,75,49,0.12)' : 'transparent',
                        color: activeTool === t.id ? '#f97316' : 'rgba(255,255,255,0.3)',
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.icon} {t.label}</button>
                ))}
                <div style={{ flex: 1 }} />
                <select value={selectedSize.cat} onChange={e => setSelectedSize(SIZES.find(s => s.cat === e.target.value) || SIZES[0])} style={{ padding: '4px 8px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'inherit', outline: 'none' }}>
                    {SIZES.map(s => <option key={s.cat} value={s.cat}>{s.icon} {s.label} ({s.w}×{s.h})</option>)}
                </select>
            </div>

            {/* Main Layout */}
            <div style={{ display: 'flex', gap: 8, minHeight: 400 }}>
                {/* Template Gallery */}
                <div style={{ width: 140, flexShrink: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>📐 Şablonlar</div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {TEMPLATES.map(t => (
                            <div key={t.id} onClick={() => setSelectedTemplate(t)} style={{
                                padding: '8px', borderRadius: 8, cursor: 'pointer',
                                background: selectedTemplate?.id === t.id ? 'rgba(200,75,49,0.1)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${selectedTemplate?.id === t.id ? 'rgba(200,75,49,0.2)' : 'rgba(255,255,255,0.04)'}`,
                            }}>
                                <div style={{ width: '100%', aspectRatio: t.w === t.h ? '1/1' : '9/16', background: 'rgba(255,255,255,0.03)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 4 }}>{t.icon}</div>
                                <div style={{ fontSize: 9, fontWeight: 600, color: 'white', lineHeight: 1.2 }}>{t.name}</div>
                                {t.sector && <span style={{ fontSize: 7, fontWeight: 600, padding: '0 3px', borderRadius: 2, background: 'rgba(139,92,246,0.1)', color: '#8B5CF6', marginTop: 2, display: 'inline-block' }}>{t.sector}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Canvas */}
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{
                        width: selectedSize.w > selectedSize.h ? 300 : 200,
                        height: selectedSize.w > selectedSize.h ? (300 * selectedSize.h / selectedSize.w) : Math.min(360, 200 * selectedSize.h / selectedSize.w),
                        background: 'white', borderRadius: 4,
                        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8,
                    }}>
                        {selectedTemplate ? (
                            <>
                                <span style={{ fontSize: 32 }}>{selectedTemplate.icon}</span>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>{selectedTemplate.name}</span>
                                <span style={{ fontSize: 10, color: '#666' }}>{selectedSize.w}×{selectedSize.h}</span>
                            </>
                        ) : (
                            <>
                                <span style={{ fontSize: 24, color: '#999' }}>🎨</span>
                                <span style={{ fontSize: 11, color: '#999' }}>Şablon seçin veya boş başlayın</span>
                            </>
                        )}
                    </div>
                    <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 9, color: 'rgba(255,255,255,0.15)' }}>Fabric.js v7 Canvas</div>
                </div>

                {/* Properties Panel */}
                <div style={{ width: 160, flexShrink: 0, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>⚙️ Özellikler</div>
                    <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div>
                            <label style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Renk</label>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {['#C84B31', '#8B5CF6', '#22c55e', '#3B82F6', '#f59e0b', '#ffffff'].map(c => (
                                    <div key={c} onClick={() => setPropPanel(p => ({ ...p, fill: c }))} style={{
                                        width: 18, height: 18, borderRadius: 4, background: c, cursor: 'pointer',
                                        border: propPanel.fill === c ? '2px solid white' : '1px solid rgba(255,255,255,0.1)',
                                    }} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Font Boyutu</label>
                            <input type="range" min={12} max={72} value={propPanel.fontSize} onChange={e => setPropPanel(p => ({ ...p, fontSize: +e.target.value }))} style={{ width: '100%' }} />
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{propPanel.fontSize}px</span>
                        </div>
                        <div>
                            <label style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Font</label>
                            <select value={propPanel.fontFamily} onChange={e => setPropPanel(p => ({ ...p, fontFamily: e.target.value }))} style={{ width: '100%', padding: '4px 6px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'inherit', outline: 'none' }}>
                                {['Inter', 'Roboto', 'Outfit', 'Poppins', 'Playfair Display'].map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', display: 'block', marginBottom: 3 }}>Opacity</label>
                            <input type="range" min={0} max={100} value={propPanel.opacity} onChange={e => setPropPanel(p => ({ ...p, opacity: +e.target.value }))} style={{ width: '100%' }} />
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{propPanel.opacity}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
