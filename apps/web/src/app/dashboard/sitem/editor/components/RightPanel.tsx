'use client'

import { useState, useCallback, useRef } from 'react'
import { useEditorStore } from '../store/editor-store'
import { DEMOLAR } from '@/data/demoVitrinData'
import { PREMIUM_TEMPLATES } from '../data/premiumTemplates'

/** Convert Unsplash ID (like 'photo-xxx') or full URL to valid img src */
function unsplashUrl(val?: string): string {
    if (!val) return ''
    if (val.startsWith('http')) return val
    return `https://images.unsplash.com/${val}?auto=format&fit=crop&w=800&q=80`
}

/**
 * RightPanel — Kepenk property editor panel.
 * Premium collapsible sections with visual live preview.
 */
export default function RightPanel() {
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const rightPanelOpen = useEditorStore(s => s.rightPanelOpen)
    const setRightPanelOpen = useEditorStore(s => s.setRightPanelOpen)

    if (!rightPanelOpen || !siteData) return null

    return (
        <>
            <style>{`
                /* ══════ Right Panel Shell ══════ */
                .ke-rp {
                    width: 340px; background: #fff; border-left: 1px solid #e2e8f0;
                    display: flex; flex-direction: column; flex-shrink: 0;
                    animation: keSlideLeft 0.2s ease-out; overflow: hidden;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }
                @keyframes keSlideLeft { from { opacity:0; transform:translateX(8px); } to { opacity:1; transform:none; } }

                .ke-rp-head {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 14px 18px; border-bottom: 1px solid #e8ecf1;
                    background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
                }
                .ke-rp-title {
                    font-size: 14px; font-weight: 800; color: #0f172a;
                    display: flex; align-items: center; gap: 8px;
                }
                .ke-rp-title svg { color: #64748b; }
                .ke-rp-close {
                    width: 30px; height: 30px; border: none; background: transparent;
                    cursor: pointer; border-radius: 8px; display: flex;
                    align-items: center; justify-content: center; color: #94a3b8; transition: 0.15s;
                }
                .ke-rp-close:hover { background: #f1f5f9; color: #334155; }

                .ke-rp-body { flex: 1; overflow-y: auto; }

                /* ══════ Collapsible Section ══════ */
                .ke-rp-section {
                    border-bottom: 1px solid #f1f5f9;
                }
                .ke-rp-section-head {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 14px 18px; cursor: pointer; transition: background 0.15s;
                    user-select: none;
                }
                .ke-rp-section-head:hover { background: #fafbfc; }
                .ke-rp-section-label {
                    font-size: 12px; font-weight: 800; color: #334155;
                    display: flex; align-items: center; gap: 8px;
                    text-transform: uppercase; letter-spacing: 0.04em;
                }
                .ke-rp-section-label svg { color: #94a3b8; }
                .ke-rp-section-chevron {
                    color: #cbd5e1; transition: transform 0.2s;
                    display: flex; align-items: center;
                }
                .ke-rp-section-chevron.open { transform: rotate(180deg); }
                .ke-rp-section-body {
                    padding: 0 18px 16px;
                    animation: keSectionOpen 0.15s ease-out;
                }
                @keyframes keSectionOpen { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:none; } }

                /* ══════ Field Styles ══════ */
                .ke-rp-field { margin-bottom: 14px; }
                .ke-rp-label {
                    font-size: 11px; font-weight: 700; color: #64748b;
                    margin-bottom: 5px; display: block;
                }
                .ke-rp-input {
                    width: 100%; padding: 9px 12px; border: 1px solid #e2e8f0;
                    border-radius: 10px; font-size: 13px; color: #0f172a;
                    font-family: inherit; transition: 0.15s; outline: none;
                    background: #f8fafc; box-sizing: border-box;
                }
                .ke-rp-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
                    background: #fff;
                }

                /* Color Picker Row */
                .ke-rp-colors {
                    display: flex; gap: 5px; flex-wrap: wrap;
                }
                .ke-rp-color {
                    width: 26px; height: 26px; border-radius: 8px;
                    cursor: pointer; border: 2px solid transparent;
                    transition: all 0.15s; position: relative;
                }
                .ke-rp-color:hover { transform: scale(1.15); z-index: 1; }
                .ke-rp-color.active {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 2px rgba(59,130,246,0.25);
                    transform: scale(1.1);
                }
                .ke-rp-color-custom {
                    width: 26px; height: 26px; border-radius: 8px;
                    border: 2px dashed #cbd5e1; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    color: #94a3b8; transition: 0.15s;
                    position: relative; overflow: hidden;
                }
                .ke-rp-color-custom:hover { border-color: #94a3b8; }
                .ke-rp-color-custom input {
                    position: absolute; inset: -10px; opacity: 0;
                    cursor: pointer; width: 50px; height: 50px;
                }

                /* Hero Image Preview */
                .ke-rp-hero-img {
                    width: 100%; height: 120px; border-radius: 12px;
                    object-fit: cover; border: 1px solid #e2e8f0;
                    margin-bottom: 8px; display: block; background: #f1f5f9;
                    transition: 0.2s;
                }
                .ke-rp-hero-img:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
                .ke-rp-hero-change {
                    display: flex; align-items: center; justify-content: center;
                    gap: 6px; padding: 8px; background: #f8fafc;
                    border: 1px solid #e2e8f0; border-radius: 9px;
                    font-size: 11px; font-weight: 700; color: #475569;
                    cursor: pointer; transition: 0.15s; width: 100%;
                    font-family: inherit;
                }
                .ke-rp-hero-change:hover { background: #eff6ff; border-color: #93c5fd; color: #2563eb; }

                /* Font Select */
                .ke-rp-select {
                    width: 100%; padding: 9px 12px; border: 1px solid #e2e8f0;
                    border-radius: 10px; font-size: 13px; color: #0f172a;
                    font-family: inherit; outline: none; background: #f8fafc;
                    cursor: pointer; appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    padding-right: 32px;
                    box-sizing: border-box;
                }
                .ke-rp-select:focus { border-color: #3b82f6; }

                /* Hizmet Rows */
                .ke-rp-hizmet {
                    display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
                }
                .ke-rp-hizmet-num {
                    width: 22px; height: 22px; background: #eff6ff;
                    border-radius: 6px; display: flex; align-items: center;
                    justify-content: center; font-size: 10px; font-weight: 800;
                    color: #3b82f6; flex-shrink: 0;
                }

                /* Sector Grid */
                .ke-rp-sector-grid {
                    display: grid; grid-template-columns: repeat(2, 1fr);
                    gap: 5px; max-height: 220px; overflow-y: auto;
                }
                .ke-rp-sector-chip {
                    padding: 7px 10px; border: 1px solid #e2e8f0;
                    border-radius: 8px; font-size: 11px; font-weight: 600;
                    color: #475569; cursor: pointer; transition: 0.15s;
                    background: #fff; font-family: inherit;
                    text-align: left; white-space: nowrap;
                    overflow: hidden; text-overflow: ellipsis;
                }
                .ke-rp-sector-chip:hover { border-color: #93c5fd; background: #f0f7ff; }
                .ke-rp-sector-chip.active { border-color: #3b82f6; background: #dbeafe; color: #1e40af; font-weight: 700; }

                /* Info Badge */
                .ke-rp-info-badge {
                    display: inline-flex; align-items: center; gap: 4px;
                    padding: 3px 10px; border-radius: 6px; font-size: 10px;
                    font-weight: 700;
                }
                .ke-rp-info-badge.green { background: #ecfdf5; color: #059669; }
                .ke-rp-info-badge.blue { background: #eff6ff; color: #2563eb; }

                /* Premium Templates */
                .ke-rp-tpl-list { display: flex; flex-direction: column; gap: 5px; }
                .ke-rp-tpl-item {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 12px; border: 1px solid #e2e8f0;
                    border-radius: 10px; cursor: pointer; transition: 0.15s;
                    font-family: inherit; background: #fff; font-size: 12px;
                    font-weight: 600; color: #334155; text-align: left;
                }
                .ke-rp-tpl-item:hover { border-color: #93c5fd; background: #f0f7ff; }
                .ke-rp-tpl-item.active { border-color: #7c3aed; background: #f5f3ff; color: #6d28d9; }
                .ke-rp-tpl-icon { font-size: 18px; flex-shrink: 0; }
            `}</style>

            <div className="ke-rp">
                <div className="ke-rp-head">
                    <span className="ke-rp-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                            <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Site Düzenle
                    </span>
                    <button className="ke-rp-close" onClick={() => setRightPanelOpen(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                <div className="ke-rp-body">
                    <HeroSection />
                    <ContentSection />
                    <DesignSection />
                    <SectorSection />
                    {siteData.paket === 'PREMIUMPLUS' && <PremiumSection />}
                </div>
            </div>
        </>
    )
}

/* ═══════ Collapsible Section Wrapper ═══════ */
function Section({ label, icon, defaultOpen = true, children }: {
    label: string; icon: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode
}) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className="ke-rp-section">
            <div className="ke-rp-section-head" onClick={() => setOpen(!open)}>
                <span className="ke-rp-section-label">{icon}{label}</span>
                <span className={`ke-rp-section-chevron${open ? ' open' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </span>
            </div>
            {open && <div className="ke-rp-section-body">{children}</div>}
        </div>
    )
}

/* ═══════ Hero Image + Branding ═══════ */
function HeroSection() {
    const siteData = useEditorStore(s => s.siteData)!
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const setActiveLeftPanel = useEditorStore(s => s.setActiveLeftPanel)
    const [searchQuery, setSearchQuery] = useState('')
    const [photos, setPhotos] = useState<Array<{ id: string; urls: { small: string; regular: string }; user: { name: string } }>>([])
    const [searching, setSearching] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const handleSearchHere = async () => {
        if (!searchQuery.trim()) return
        setSearching(true)
        try {
            const res = await fetch(`/api/unsplash?query=${encodeURIComponent(searchQuery)}&count=6&orientation=landscape`)
            const data = await res.json()
            setPhotos(data.photos || [])
        } catch { setPhotos([]) }
        finally { setSearching(false) }
    }

    return (
        <Section label="Hero Görsel" defaultOpen={true} icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        }>
            {siteData.unsplash && (
                <img className="ke-rp-hero-img" src={unsplashUrl(siteData.unsplash)} alt="Hero" />
            )}

            {!showSearch ? (
                <div style={{ display: 'flex', gap: 6 }}>
                    <button className="ke-rp-hero-change" style={{ flex: 1 }} onClick={() => setShowSearch(true)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        Unsplash Ara
                    </button>
                    <button className="ke-rp-hero-change" style={{ flex: 1 }} onClick={() => setActiveLeftPanel('media')}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 14l6-6 4 4 4-4 6 6"/></svg>
                        Kütüphane
                    </button>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                        <input
                            className="ke-rp-input"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="modern mimari, mağaza..."
                            onKeyDown={e => { if (e.key === 'Enter') handleSearchHere() }}
                            style={{ marginBottom: 0 }}
                        />
                        <button className="ke-rp-hero-change" style={{ width: 60, padding: '8px 0' }} onClick={handleSearchHere}>
                            {searching ? '...' : 'Ara'}
                        </button>
                    </div>
                    {photos.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginBottom: 8 }}>
                            {photos.map(p => (
                                <img
                                    key={p.id}
                                    src={p.urls.small}
                                    alt=""
                                    style={{ width: '100%', height: 56, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', border: siteData.unsplash === p.urls.regular ? '2px solid #3b82f6' : '2px solid transparent', transition: '0.15s' }}
                                    onClick={() => { updateSiteData({ unsplash: p.urls.regular }); setShowSearch(false) }}
                                />
                            ))}
                        </div>
                    )}
                    <button className="ke-rp-hero-change" onClick={() => { setShowSearch(false); setPhotos([]) }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        Kapat
                    </button>
                </>
            )}

            <div className="ke-rp-field" style={{ marginTop: 14 }}>
                <label className="ke-rp-label">İşletme Adı</label>
                <input className="ke-rp-input" value={siteData.isletmeAdi} onChange={e => updateSiteData({ isletmeAdi: e.target.value, heroBaslik: e.target.value })} placeholder="İşletme adınız…" />
            </div>
            <div className="ke-rp-field">
                <label className="ke-rp-label">Ana Başlık</label>
                <input className="ke-rp-input" value={siteData.heroBaslik} onChange={e => updateSiteData({ heroBaslik: e.target.value })} />
            </div>
            <div className="ke-rp-field">
                <label className="ke-rp-label">Alt Başlık</label>
                <input className="ke-rp-input" value={siteData.heroAlt} onChange={e => updateSiteData({ heroAlt: e.target.value })} />
            </div>
        </Section>
    )
}

/* ═══════ Content — Services + Contact ═══════ */
function ContentSection() {
    const siteData = useEditorStore(s => s.siteData)!
    const updateSiteData = useEditorStore(s => s.updateSiteData)

    const updateHizmet = useCallback((index: number, value: string) => {
        const h = [...siteData.hizmetler] as [string, string, string]
        h[index] = value
        updateSiteData({ hizmetler: h })
    }, [siteData.hizmetler, updateSiteData])

    return (
        <Section label="İçerik" defaultOpen={false} icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        }>
            <div className="ke-rp-field">
                <label className="ke-rp-label">Hizmetler</label>
                {siteData.hizmetler.map((h, i) => (
                    <div key={i} className="ke-rp-hizmet">
                        <span className="ke-rp-hizmet-num">{i + 1}</span>
                        <input className="ke-rp-input" value={h} onChange={e => updateHizmet(i, e.target.value)} placeholder={`Hizmet ${i + 1}`} style={{ marginBottom: 0 }} />
                    </div>
                ))}
            </div>

            <div className="ke-rp-field">
                <label className="ke-rp-label">Telefon</label>
                <input className="ke-rp-input" value={siteData.telefon} onChange={e => updateSiteData({ telefon: e.target.value })} placeholder="05XX XXX XX XX" />
            </div>
            <div className="ke-rp-field">
                <label className="ke-rp-label">Adres</label>
                <input className="ke-rp-input" value={siteData.adres} onChange={e => updateSiteData({ adres: e.target.value })} placeholder="İlçe, İstanbul" />
            </div>
        </Section>
    )
}

/* ═══════ Design — Colors + Typography ═══════ */
function DesignSection() {
    const siteData = useEditorStore(s => s.siteData)!
    const updateSiteData = useEditorStore(s => s.updateSiteData)

    const BG_COLORS = ['#0f172a','#1e293b','#0d0d0d','#111111','#0a0a0f','#0b1929','#1a0f05','#faf4ed','#fffdf7','#f8f5f0','#f0f8ff','#f1fffe','#ffffff']
    const ACCENT_COLORS = ['#c2440e','#e8a030','#d4709a','#c9856a','#c53030','#2e86de','#e63946','#f5a623','#7c3aed','#4f46e5','#00c9a7','#10b981','#ff3c00']
    const FONTS = ['Cormorant Garamond','Playfair Display','Abril Fatface','Bebas Neue','Syne','Inter','Outfit','Raleway','Montserrat','Poppins','Space Grotesk','Oswald','Lora','Fraunces']

    return (
        <Section label="Tasarım" defaultOpen={false} icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><path d="M17.08 9.58a2.5 2.5 0 010 4.84"/><circle cx="6.5" cy="17.5" r="2.5"/><path d="M8.56 5.44L15.44 18.56"/></svg>
        }>
            <div className="ke-rp-field">
                <label className="ke-rp-label" style={{ marginBottom: 8 }}>Arkaplan</label>
                <div className="ke-rp-colors">
                    {BG_COLORS.map(c => (
                        <div
                            key={c}
                            className={`ke-rp-color${siteData.bg === c ? ' active' : ''}`}
                            style={{ background: c, border: c === '#ffffff' ? '2px solid #e2e8f0' : undefined }}
                            onClick={() => updateSiteData({ bg: c })}
                        />
                    ))}
                    <div className="ke-rp-color-custom">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        <input type="color" value={siteData.bg} onChange={e => updateSiteData({ bg: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="ke-rp-field">
                <label className="ke-rp-label" style={{ marginBottom: 8 }}>Vurgu Rengi</label>
                <div className="ke-rp-colors">
                    {ACCENT_COLORS.map(c => (
                        <div key={c} className={`ke-rp-color${siteData.accent === c ? ' active' : ''}`} style={{ background: c }} onClick={() => updateSiteData({ accent: c })} />
                    ))}
                    <div className="ke-rp-color-custom">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        <input type="color" value={siteData.accent} onChange={e => updateSiteData({ accent: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="ke-rp-field">
                <label className="ke-rp-label">Yazı Tipi</label>
                <select className="ke-rp-select" value={siteData.font} onChange={e => updateSiteData({ font: e.target.value })}>
                    {FONTS.map(f => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>
            </div>

            {/* Live preview mini card */}
            <div style={{
                background: siteData.bg,
                borderRadius: 10,
                padding: '14px 16px',
                border: '1px solid #e2e8f0',
                marginTop: 4,
            }}>
                <div style={{ fontFamily: siteData.font, color: siteData.accent, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                    {siteData.isletmeAdi || 'Örnek Başlık'}
                </div>
                <div style={{ fontFamily: siteData.font, color: siteData.text, fontSize: 11, opacity: 0.8 }}>
                    Lorem ipsum dolor sit amet consectetur.
                </div>
            </div>
        </Section>
    )
}

/* ═══════ Sector Selection ═══════ */
function SectorSection() {
    const siteData = useEditorStore(s => s.siteData)!
    const updateSiteData = useEditorStore(s => s.updateSiteData)

    return (
        <Section label="Sektör" defaultOpen={false} icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
        }>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <span className="ke-rp-info-badge green">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    {DEMOLAR.find(d => d.id === siteData.sektorId)?.ad || 'Seçili'}
                </span>
                <span className="ke-rp-info-badge blue">{siteData.paket}</span>
            </div>
            <div className="ke-rp-sector-grid">
                {DEMOLAR.slice(0, 20).map(d => (
                    <button
                        key={d.id}
                        className={`ke-rp-sector-chip${siteData.sektorId === d.id ? ' active' : ''}`}
                        onClick={() => updateSiteData({
                            sektorId: d.id, kategori: d.kategori,
                            heroAlt: d.heroAlt, hizmetler: d.hizmetler,
                            bg: d.bg, accent: d.accent, text: d.text,
                            font: d.font, unsplash: d.unsplash,
                        })}
                    >
                        {d.ad}
                    </button>
                ))}
            </div>
        </Section>
    )
}

/* ═══════ Premium+ Templates ═══════ */
function PremiumSection() {
    const siteData = useEditorStore(s => s.siteData)!
    const updateSiteData = useEditorStore(s => s.updateSiteData)

    return (
        <Section label="Premium+" defaultOpen={false} icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        }>
            <div className="ke-rp-tpl-list">
                <button
                    className={`ke-rp-tpl-item${!(siteData as any).premiumTemplateId ? ' active' : ''}`}
                    onClick={() => updateSiteData({ premiumTemplateId: undefined } as any)}
                >
                    <span className="ke-rp-tpl-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    </span>
                    Otomatik (demoHtmlUret)
                </button>
                {PREMIUM_TEMPLATES.map(t => (
                    <button
                        key={t.id}
                        className={`ke-rp-tpl-item${(siteData as any).premiumTemplateId === t.id ? ' active' : ''}`}
                        onClick={() => updateSiteData({ premiumTemplateId: t.id } as any)}
                    >
                        <span className="ke-rp-tpl-icon">{t.emoji}</span>
                        {t.ad}
                    </button>
                ))}
            </div>
        </Section>
    )
}
