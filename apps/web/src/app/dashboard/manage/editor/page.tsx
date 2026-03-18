'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
type InspectorTab = 'content' | 'style' | 'settings'

interface BlockField {
    key: string; label: string; type: 'text' | 'richtext' | 'image' | 'color' | 'number' | 'url' | 'array'
    value: string | number
}

const DEMO_BLOCK = {
    id: 'hero1', type: 'hero', variant: 'fullscreen_overlay',
    fields: [
        { key: 'title', label: 'Başlık', type: 'text' as const, value: 'Usta Berber' },
        { key: 'subtitle', label: 'Alt Başlık', type: 'text' as const, value: 'Profesyonel erkek bakımı' },
        { key: 'backgroundImage', label: 'Arka Plan', type: 'image' as const, value: '/hero.jpg' },
        { key: 'cta1Text', label: 'CTA Metni', type: 'text' as const, value: 'Randevu Al' },
        { key: 'cta1Link', label: 'CTA Linki', type: 'url' as const, value: '#booking' },
    ],
    style: { paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24, bgColor: '#1A1A2E', opacity: 100, borderRadius: 0, shadow: 'none' },
    settings: { visible: true, animation: 'fadeUp', htmlId: 'hero', cssClass: '' },
}

const VARIANTS = [
    { id: 'fullscreen_overlay', label: 'Tam Ekran Overlay', blocks: 12 },
    { id: 'split_image', label: 'Split Layout', blocks: 10 },
    { id: 'minimal', label: 'Minimal', blocks: 8 },
    { id: 'video_bg', label: 'Video Arka Plan', blocks: 12 },
]

export default function EditorPage() {
    const [tab, setTab] = useState<InspectorTab>('content')
    const [block, setBlock] = useState(DEMO_BLOCK)
    const [showSwap, setShowSwap] = useState(false)
    const [selectedVariant, setSelectedVariant] = useState(block.variant)
    const [showCodeInject, setShowCodeInject] = useState(false)
    const [codeTab, setCodeTab] = useState<'head' | 'bodyStart' | 'bodyEnd' | 'css'>('head')
    const [codeValues, setCodeValues] = useState({ head: '', bodyStart: '', bodyEnd: '', css: '' })

    const tabs: { id: InspectorTab; label: string; icon: string }[] = [
        { id: 'content', label: 'İçerik', icon: '📝' },
        { id: 'style', label: 'Stil', icon: '🎨' },
        { id: 'settings', label: 'Ayarlar', icon: '⚙️' },
    ]

    return (
        <div style={{ maxWidth: 900 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: 0 }}>🛠️ Standart Editör</h1>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>Drag-drop, modül swap, kod enjeksiyon, inspector panel</p>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setShowSwap(true)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🔄 Modül Swap</button>
                    <button onClick={() => setShowCodeInject(true)} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', background: 'rgba(200,75,49,0.12)', color: '#C84B31', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{'<>'} Kod Ekleme</button>
                </div>
            </div>

            {/* Selected Block Info */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 7px', borderRadius: 4, background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', textTransform: 'uppercase' }}>{block.type}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Hero — {VARIANTS.find(v => v.id === block.variant)?.label}</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>ID: {block.id}</span>
            </div>

            {/* Inspector Tabs */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: tab === t.id ? 'rgba(200,75,49,0.12)' : 'rgba(255,255,255,0.02)',
                        color: tab === t.id ? '#f97316' : 'rgba(255,255,255,0.35)',
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.icon} {t.label}</button>
                ))}
            </div>

            {/* ═══ CONTENT TAB ═══ */}
            {tab === 'content' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {block.fields.map(f => (
                        <div key={f.key} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px' }}>
                            <label style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                <span style={{ fontSize: 8, padding: '1px 5px', borderRadius: 3, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)' }}>{f.type}</span>
                                {f.label}
                            </label>
                            {f.type === 'image' ? (
                                <div style={{ height: 56, borderRadius: 8, border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 11, cursor: 'pointer' }}>📷 Görsel yükle veya sürükle</div>
                            ) : (
                                <input defaultValue={String(f.value)} style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ═══ STYLE TAB ═══ */}
            {tab === 'style' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Padding/Margin Box Model */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Padding (px)</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                            {(['Top', 'Right', 'Bottom', 'Left'] as const).map(dir => (
                                <div key={dir}>
                                    <label style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: 2 }}>{dir}</label>
                                    <input type="number" defaultValue={block.style[`padding${dir}` as keyof typeof block.style]} style={{ width: '100%', padding: '4px 6px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 11, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Background Color */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Arka Plan Rengi</div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <div style={{ width: 28, height: 28, borderRadius: 6, background: block.style.bgColor, border: '2px solid rgba(255,255,255,0.15)', cursor: 'pointer' }} />
                            <input defaultValue={block.style.bgColor} style={{ flex: 1, padding: '4px 8px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'white', fontSize: 11, fontFamily: 'monospace', outline: 'none' }} />
                        </div>
                    </div>

                    {/* Opacity */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Opaklık: {block.style.opacity}%</div>
                        <input type="range" min={0} max={100} defaultValue={block.style.opacity} style={{ width: '100%', accentColor: '#C84B31' }} />
                    </div>

                    {/* Shadow */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Gölge</div>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {['none', 'sm', 'md', 'lg', 'xl'].map(s => (
                                <button key={s} style={{ flex: 1, padding: '5px 0', borderRadius: 5, border: 'none', fontSize: 10, fontWeight: 600, background: block.style.shadow === s ? 'rgba(200,75,49,0.15)' : 'rgba(255,255,255,0.03)', color: block.style.shadow === s ? '#f97316' : 'rgba(255,255,255,0.3)', cursor: 'pointer', fontFamily: 'inherit' }}>{s}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ SETTINGS TAB ═══ */}
            {tab === 'settings' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Visibility */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>👁️ Görünürlük</span>
                        <div style={{ width: 36, height: 20, borderRadius: 10, background: block.settings.visible ? '#22c55e' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative' }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: block.settings.visible ? 18 : 2, transition: '0.2s' }} />
                        </div>
                    </div>

                    {/* Animation */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>✨ Giriş Animasyonu</div>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {[{ id: 'none', l: 'Yok' }, { id: 'fadeUp', l: 'Fade Up' }, { id: 'fadeIn', l: 'Fade In' }, { id: 'slideLeft', l: 'Slide Left' }].map(a => (
                                <button key={a.id} style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: 'none', fontSize: 10, fontWeight: 600, background: block.settings.animation === a.id ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)', color: block.settings.animation === a.id ? '#8B5CF6' : 'rgba(255,255,255,0.3)', cursor: 'pointer', fontFamily: 'inherit' }}>{a.l}</button>
                            ))}
                        </div>
                    </div>

                    {/* Responsive */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: 14 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>📱 Responsive Override</div>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {['🖥️ Desktop', '📱 Tablet', '📱 Mobil'].map(d => (
                                <button key={d} style={{ flex: 1, padding: '6px 0', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{d}</button>
                            ))}
                        </div>
                    </div>

                    {/* HTML ID */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px' }}>
                        <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 4, display: 'block' }}>🔗 HTML ID</label>
                        <input defaultValue={block.settings.htmlId} placeholder="#section-id" style={{ width: '100%', padding: '5px 8px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    {/* CSS Class */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px' }}>
                        <label style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 4, display: 'block' }}>🏷️ Ek CSS Sınıfları</label>
                        <input defaultValue={block.settings.cssClass} placeholder="custom-class" style={{ width: '100%', padding: '5px 8px', borderRadius: 5, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                </div>
            )}

            {/* ═══════ Module Swap Modal ═══════ */}
            {showSwap && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setShowSwap(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 560, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>🔄 Modülü Değiştir — Hero</h3>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>İçerik korunur, sadece tasarım değişir.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
                            {VARIANTS.map(v => (
                                <div key={v.id} onClick={() => setSelectedVariant(v.id)} style={{
                                    borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                                    border: selectedVariant === v.id ? '2px solid #C84B31' : '2px solid rgba(255,255,255,0.06)',
                                    boxShadow: selectedVariant === v.id ? '0 0 0 3px rgba(200,75,49,0.2)' : 'none',
                                }}>
                                    <div style={{ height: 70, background: `linear-gradient(135deg, ${selectedVariant === v.id ? '#C84B31' : '#2a2a3c'}, #1E1E2E)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {selectedVariant === v.id && <span style={{ fontSize: 20 }}>✓</span>}
                                    </div>
                                    <div style={{ padding: '8px 10px', background: 'rgba(255,255,255,0.02)' }}>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{v.label}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>{v.blocks} blok destekli</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedVariant !== block.variant && (
                            <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, padding: '8px 12px', marginBottom: 12, fontSize: 11, color: '#f59e0b' }}>
                                ⚠️ Mevcut içerik korunacak. Uyumsuz alanlar varsayılan değer alacaktır.
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowSwap(false)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
                            <button onClick={() => { setBlock(b => ({ ...b, variant: selectedVariant })); setShowSwap(false); }} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#C84B31', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🔄 Uygula</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════ Code Injection Modal ═══════ */}
            {showCodeInject && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setShowCodeInject(false)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 600, maxWidth: '90vw', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>{'<>'} Kod Ekleme Noktaları</h3>
                        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 8, padding: '6px 10px', marginBottom: 14, fontSize: 10, color: '#f59e0b' }}>
                            ⚠️ Hatalı kod sitenizi bozabilir. Emin değilseniz değiştirmeyin.
                        </div>

                        <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                            {([
                                { id: 'head' as const, label: '<head>' },
                                { id: 'bodyStart' as const, label: '<body> Başı' },
                                { id: 'bodyEnd' as const, label: '<body> Sonu' },
                                { id: 'css' as const, label: 'Özel CSS' },
                            ]).map(t => (
                                <button key={t.id} onClick={() => setCodeTab(t.id)} style={{
                                    flex: 1, padding: '6px 0', borderRadius: 6, border: 'none', fontSize: 10, fontWeight: 700,
                                    background: codeTab === t.id ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                                    color: codeTab === t.id ? '#8B5CF6' : 'rgba(255,255,255,0.3)',
                                    cursor: 'pointer', fontFamily: 'inherit',
                                }}>{t.label}</button>
                            ))}
                        </div>

                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginBottom: 4 }}>
                            Max: {codeTab === 'css' ? '50KB' : '10KB'} · eval() ve http:// engellenir
                        </div>

                        <textarea
                            value={codeValues[codeTab]}
                            onChange={e => setCodeValues(p => ({ ...p, [codeTab]: e.target.value }))}
                            placeholder={codeTab === 'css' ? '/* Özel CSS kodunuz */' : '<!-- Kodunuzu buraya yapıştırın -->'}
                            spellCheck={false}
                            style={{
                                width: '100%', height: 180, padding: 12, borderRadius: 10,
                                border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)',
                                color: '#a78bfa', fontSize: 12, fontFamily: 'monospace', resize: 'vertical',
                                outline: 'none', boxSizing: 'border-box', lineHeight: 1.6,
                            }}
                        />

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                            <button onClick={() => setShowCodeInject(false)} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>İptal</button>
                            <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>👁️ Önizle</button>
                            <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#C84B31', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>💾 Kaydet</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
