'use client'

import { useState } from 'react'
import { useEditorStore } from '../../store/editor-store'
import { BORDER_RADIUS_OPTIONS, BUTTON_STYLE_OPTIONS, SHADOW_PRESETS, ANIMATION_LEVELS } from '../../data/designPresets'

/* ── Theme Presets ── */
const THEMES = [
    { id: 'dark-1', name: 'Gece', bg: '#0f172a', accent: '#3b82f6', text: '#f8fafc' },
    { id: 'dark-2', name: 'Komur', bg: '#0d0d0d', accent: '#e63946', text: '#f5f5f5' },
    { id: 'warm', name: 'Toprak', bg: '#1e0f05', accent: '#c2440e', text: '#f5ede0' },
    { id: 'elegant', name: 'Zarif', bg: '#faf4ed', accent: '#c2773a', text: '#2c1a0e' },
    { id: 'forest', name: 'Orman', bg: '#f0faf4', accent: '#52b788', text: '#1b4332' },
    { id: 'ocean', name: 'Okyanus', bg: '#f0f8ff', accent: '#2e86de', text: '#0a2a4a' },
    { id: 'neon', name: 'Neon', bg: '#0a0a0f', accent: '#7c3aed', text: '#f0e6ff' },
    { id: 'pastel', name: 'Pastel', bg: '#fdf8f9', accent: '#d4709a', text: '#2d1527' },
] as const

/* ── Shadow keys for iteration ── */
const SHADOW_KEYS = ['none', 'subtle', 'medium', 'strong'] as const

/* ── Section IDs ── */
type SectionId = 'theme' | 'colors' | 'radius' | 'button' | 'shadow' | 'animation' | 'darkmode'

const ALL_SECTIONS: SectionId[] = ['theme', 'colors', 'radius', 'button', 'shadow', 'animation', 'darkmode']

/* ── Chevron SVG ── */
function ChevronSVG({ open }: { open: boolean }) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
                transition: 'transform 0.2s',
                transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
            }}
        >
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

/* ── Collapsible Section ── */
function Section({
    id,
    title,
    openSections,
    toggle,
    children,
}: {
    id: SectionId
    title: string
    openSections: Set<SectionId>
    toggle: (id: SectionId) => void
    children: React.ReactNode
}) {
    const isOpen = openSections.has(id)
    return (
        <div>
            <div
                className="ke-gs-section-header"
                onClick={() => toggle(id)}
            >
                <span>{title}</span>
                <ChevronSVG open={isOpen} />
            </div>
            {isOpen && (
                <div className="ke-gs-section-body">
                    {children}
                </div>
            )}
            <div className="ke-gs-divider" />
        </div>
    )
}

/* ── GlobalStylePanel ──────────────────────────────────────────────────────
   Global design settings panel for the editor LeftBar (280px wide).
   Theme presets, custom colors, border radius, button style,
   shadow level, animation level, and dark mode toggle.
────────────────────────────────────────────────────────────────────────── */

export default function GlobalStylePanel() {
    /* ── Store ── */
    const siteData = useEditorStore(s => s.siteData)
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const updateDesignSettings = useEditorStore(s => s.updateDesignSettings)

    /* ── Current design values ── */
    const ds = siteData?.designSettings
    const currentRadius = ds?.borderRadius || 'medium'
    const currentButton = ds?.buttonStyle || 'solid'
    const currentShadow = ds?.shadowLevel || 'subtle'
    const currentAnim = ds?.animationLevel || 'standard'
    const currentDark = ds?.darkMode || false

    /* ── Current colors ── */
    const currentBg = siteData?.bg || '#0f172a'
    const currentAccent = siteData?.accent || '#3b82f6'
    const currentText = siteData?.text || '#f8fafc'

    /* ── Collapsible sections ── */
    const [openSections, setOpenSections] = useState<Set<SectionId>>(
        () => new Set(ALL_SECTIONS)
    )

    const toggleSection = (id: SectionId) => {
        setOpenSections(prev => {
            const next = new Set(prev)
            if (next.has(id)) {
                next.delete(id)
            } else {
                next.add(id)
            }
            return next
        })
    }

    /* ── Active theme detection ── */
    const activeThemeId = THEMES.find(
        t => t.bg === currentBg && t.accent === currentAccent && t.text === currentText
    )?.id ?? null

    return (
        <>
            <style>{`
                .ke-gs-root {
                    display: flex; flex-direction: column; height: 100%;
                    font-family: 'Inter', -apple-system, sans-serif;
                    overflow-y: auto;
                }
                .ke-gs-root::-webkit-scrollbar { width: 4px; }
                .ke-gs-root::-webkit-scrollbar-track { background: transparent; }
                .ke-gs-root::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

                /* ── Section header ── */
                .ke-gs-section-header {
                    padding: 14px 16px;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    color: #334155;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    user-select: none;
                    transition: background 0.1s;
                }
                .ke-gs-section-header:hover { background: #f8fafc; }

                /* ── Divider ── */
                .ke-gs-divider { height: 1px; background: #e2e8f0; margin: 0 16px; }

                /* ── Section body ── */
                .ke-gs-section-body { padding: 0 16px 16px; }

                /* ── Theme grid ── */
                .ke-gs-theme-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    gap: 8px;
                }
                .ke-gs-theme-card {
                    display: flex; flex-direction: column; align-items: center;
                    padding: 10px 4px 6px; border-radius: 8px;
                    border: 2px solid #e2e8f0; cursor: pointer;
                    background: #fff; transition: 0.15s;
                }
                .ke-gs-theme-card:hover { border-color: #93c5fd; }
                .ke-gs-theme-card-active {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 1px rgba(59,130,246,0.15);
                }
                .ke-gs-theme-dots {
                    display: flex; gap: 3px; margin-bottom: 6px;
                }
                .ke-gs-theme-dot {
                    width: 12px; height: 12px; border-radius: 50%;
                    border: 1px solid rgba(0,0,0,0.08);
                }
                .ke-gs-theme-name {
                    font-size: 9px; font-weight: 700; color: #64748b;
                    text-align: center; line-height: 1;
                }

                /* ── Color picker rows ── */
                .ke-gs-color-row {
                    display: flex; align-items: center; gap: 10px;
                    margin-bottom: 10px;
                }
                .ke-gs-color-row:last-child { margin-bottom: 0; }
                .ke-gs-color-input {
                    width: 32px; height: 32px; border: 2px solid #e2e8f0;
                    border-radius: 8px; cursor: pointer; padding: 0;
                    background: none; flex-shrink: 0;
                }
                .ke-gs-color-input::-webkit-color-swatch-wrapper { padding: 2px; }
                .ke-gs-color-input::-webkit-color-swatch { border: none; border-radius: 4px; }
                .ke-gs-color-input::-moz-color-swatch { border: none; border-radius: 4px; }
                .ke-gs-color-label {
                    font-size: 12px; font-weight: 600; color: #0f172a;
                    flex: 1;
                }
                .ke-gs-color-hex {
                    font-size: 11px; font-weight: 500; color: #94a3b8;
                    font-family: 'SF Mono', 'Fira Code', monospace;
                    text-transform: uppercase;
                }

                /* ── Radius options ── */
                .ke-gs-radius-row {
                    display: flex; gap: 6px;
                }
                .ke-gs-radius-item {
                    flex: 1; display: flex; flex-direction: column;
                    align-items: center; gap: 6px; cursor: pointer;
                }
                .ke-gs-radius-preview {
                    width: 36px; height: 36px;
                    background: #f1f5f9; border: 2px solid #e2e8f0;
                    transition: 0.15s;
                }
                .ke-gs-radius-preview:hover { border-color: #93c5fd; }
                .ke-gs-radius-preview-active {
                    border-color: #3b82f6;
                    background: #eff6ff;
                    box-shadow: 0 0 0 1px rgba(59,130,246,0.15);
                }
                .ke-gs-radius-label {
                    font-size: 9px; font-weight: 600; color: #64748b;
                    text-align: center;
                }

                /* ── Button style options ── */
                .ke-gs-btn-row {
                    display: grid; grid-template-columns: 1fr 1fr;
                    gap: 8px;
                }
                .ke-gs-btn-item {
                    display: flex; flex-direction: column;
                    align-items: center; gap: 6px;
                    padding: 10px 6px; border-radius: 8px;
                    border: 2px solid #e2e8f0; cursor: pointer;
                    background: #fff; transition: 0.15s;
                }
                .ke-gs-btn-item:hover { border-color: #93c5fd; }
                .ke-gs-btn-item-active {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 1px rgba(59,130,246,0.15);
                }
                .ke-gs-btn-preview {
                    display: inline-flex; align-items: center;
                    justify-content: center; padding: 4px 14px;
                    font-size: 10px; font-weight: 700;
                    font-family: inherit; line-height: 1;
                    transition: 0.15s;
                }
                .ke-gs-btn-label {
                    font-size: 9px; font-weight: 600; color: #64748b;
                    text-align: center;
                }

                /* ── Shadow options ── */
                .ke-gs-shadow-row {
                    display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;
                    gap: 8px;
                }
                .ke-gs-shadow-item {
                    display: flex; flex-direction: column;
                    align-items: center; gap: 6px; cursor: pointer;
                }
                .ke-gs-shadow-preview {
                    width: 40px; height: 40px; border-radius: 8px;
                    background: #fff; border: 2px solid #e2e8f0;
                    transition: 0.15s;
                }
                .ke-gs-shadow-preview:hover { border-color: #93c5fd; }
                .ke-gs-shadow-preview-active {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 1px rgba(59,130,246,0.15);
                }
                .ke-gs-shadow-label {
                    font-size: 9px; font-weight: 600; color: #64748b;
                    text-align: center;
                }

                /* ── Animation options ── */
                .ke-gs-anim-list {
                    display: flex; flex-direction: column; gap: 6px;
                }
                .ke-gs-anim-card {
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 12px; border-radius: 8px;
                    border: 2px solid #e2e8f0; cursor: pointer;
                    background: #fff; transition: 0.15s;
                }
                .ke-gs-anim-card:hover { border-color: #93c5fd; }
                .ke-gs-anim-card-active {
                    border-color: #3b82f6;
                    background: #eff6ff;
                    box-shadow: 0 0 0 1px rgba(59,130,246,0.15);
                }
                .ke-gs-anim-text { flex: 1; }
                .ke-gs-anim-title {
                    font-size: 12px; font-weight: 700; color: #0f172a;
                    margin-bottom: 1px;
                }
                .ke-gs-anim-desc {
                    font-size: 10px; color: #64748b; font-weight: 500;
                }
                .ke-gs-anim-check {
                    width: 18px; height: 18px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                }
                .ke-gs-anim-check-active {
                    background: #3b82f6;
                }
                .ke-gs-anim-check-inactive {
                    border: 2px solid #e2e8f0;
                    background: #fff;
                }

                /* ── Dark mode toggle ── */
                .ke-gs-toggle-row {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 4px 0;
                }
                .ke-gs-toggle-label {
                    font-size: 13px; font-weight: 600; color: #0f172a;
                }
                .ke-gs-toggle-track {
                    width: 40px; height: 22px; border-radius: 11px;
                    cursor: pointer; transition: background 0.2s;
                    position: relative; flex-shrink: 0;
                    border: none; padding: 0;
                }
                .ke-gs-toggle-track-on { background: #3b82f6; }
                .ke-gs-toggle-track-off { background: #cbd5e1; }
                .ke-gs-toggle-thumb {
                    width: 18px; height: 18px; border-radius: 50%;
                    background: #fff; position: absolute; top: 2px;
                    transition: left 0.2s;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
                }
                .ke-gs-toggle-thumb-on { left: 20px; }
                .ke-gs-toggle-thumb-off { left: 2px; }
            `}</style>

            <div className="ke-gs-root">
                {/* ── 1. Hizli Tema ── */}
                <Section id="theme" title="Hizli Tema" openSections={openSections} toggle={toggleSection}>
                    <div className="ke-gs-theme-grid">
                        {THEMES.map(theme => (
                            <div
                                key={theme.id}
                                className={`ke-gs-theme-card ${activeThemeId === theme.id ? 'ke-gs-theme-card-active' : ''}`}
                                onClick={() => updateSiteData({ bg: theme.bg, accent: theme.accent, text: theme.text })}
                            >
                                <div className="ke-gs-theme-dots">
                                    <div className="ke-gs-theme-dot" style={{ background: theme.bg }} />
                                    <div className="ke-gs-theme-dot" style={{ background: theme.accent }} />
                                    <div className="ke-gs-theme-dot" style={{ background: theme.text }} />
                                </div>
                                <span className="ke-gs-theme-name">{theme.name}</span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── 2. Ozel Renkler ── */}
                <Section id="colors" title="Ozel Renkler" openSections={openSections} toggle={toggleSection}>
                    <div className="ke-gs-color-row">
                        <input
                            type="color"
                            className="ke-gs-color-input"
                            value={currentBg}
                            onChange={e => updateSiteData({ bg: e.target.value })}
                        />
                        <span className="ke-gs-color-label">Arka Plan</span>
                        <span className="ke-gs-color-hex">{currentBg}</span>
                    </div>
                    <div className="ke-gs-color-row">
                        <input
                            type="color"
                            className="ke-gs-color-input"
                            value={currentAccent}
                            onChange={e => updateSiteData({ accent: e.target.value })}
                        />
                        <span className="ke-gs-color-label">Vurgu Rengi</span>
                        <span className="ke-gs-color-hex">{currentAccent}</span>
                    </div>
                    <div className="ke-gs-color-row">
                        <input
                            type="color"
                            className="ke-gs-color-input"
                            value={currentText}
                            onChange={e => updateSiteData({ text: e.target.value })}
                        />
                        <span className="ke-gs-color-label">Metin Rengi</span>
                        <span className="ke-gs-color-hex">{currentText}</span>
                    </div>
                </Section>

                {/* ── 3. Kose Yuvarlakliği ── */}
                <Section id="radius" title="Kose Yuvarlakliği" openSections={openSections} toggle={toggleSection}>
                    <div className="ke-gs-radius-row">
                        {BORDER_RADIUS_OPTIONS.map(opt => (
                            <div
                                key={opt.id}
                                className="ke-gs-radius-item"
                                onClick={() => updateDesignSettings({ borderRadius: opt.id })}
                            >
                                <div
                                    className={`ke-gs-radius-preview ${currentRadius === opt.id ? 'ke-gs-radius-preview-active' : ''}`}
                                    style={{ borderRadius: opt.value }}
                                />
                                <span className="ke-gs-radius-label">{opt.label}</span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── 4. Buton Stili ── */}
                <Section id="button" title="Buton Stili" openSections={openSections} toggle={toggleSection}>
                    <div className="ke-gs-btn-row">
                        {BUTTON_STYLE_OPTIONS.map(opt => {
                            const isActive = currentButton === opt.id
                            const accent = currentAccent

                            let previewStyle: React.CSSProperties = {}
                            if (opt.id === 'solid') {
                                previewStyle = {
                                    background: accent, color: '#fff',
                                    borderRadius: '6px', border: 'none',
                                }
                            } else if (opt.id === 'outline') {
                                previewStyle = {
                                    background: 'transparent', color: accent,
                                    borderRadius: '6px', border: `2px solid ${accent}`,
                                }
                            } else if (opt.id === 'ghost') {
                                previewStyle = {
                                    background: 'transparent', color: accent,
                                    borderRadius: '6px', border: 'none',
                                }
                            } else if (opt.id === 'pill') {
                                previewStyle = {
                                    background: accent, color: '#fff',
                                    borderRadius: '9999px', border: 'none',
                                }
                            }

                            return (
                                <div
                                    key={opt.id}
                                    className={`ke-gs-btn-item ${isActive ? 'ke-gs-btn-item-active' : ''}`}
                                    onClick={() => updateDesignSettings({ buttonStyle: opt.id })}
                                >
                                    <span className="ke-gs-btn-preview" style={previewStyle}>
                                        Buton
                                    </span>
                                    <span className="ke-gs-btn-label">{opt.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </Section>

                {/* ── 5. Golge ── */}
                <Section id="shadow" title="Golge" openSections={openSections} toggle={toggleSection}>
                    <div className="ke-gs-shadow-row">
                        {SHADOW_KEYS.map(key => {
                            const preset = SHADOW_PRESETS[key]
                            const isActive = currentShadow === key

                            return (
                                <div
                                    key={key}
                                    className="ke-gs-shadow-item"
                                    onClick={() => updateDesignSettings({ shadowLevel: key })}
                                >
                                    <div
                                        className={`ke-gs-shadow-preview ${isActive ? 'ke-gs-shadow-preview-active' : ''}`}
                                        style={{ boxShadow: isActive ? `${preset.value}, 0 0 0 1px rgba(59,130,246,0.15)` : preset.value }}
                                    />
                                    <span className="ke-gs-shadow-label">{preset.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </Section>

                {/* ── 6. Animasyon ── */}
                <Section id="animation" title="Animasyon" openSections={openSections} toggle={toggleSection}>
                    <div className="ke-gs-anim-list">
                        {ANIMATION_LEVELS.map(opt => {
                            const isActive = currentAnim === opt.id
                            return (
                                <div
                                    key={opt.id}
                                    className={`ke-gs-anim-card ${isActive ? 'ke-gs-anim-card-active' : ''}`}
                                    onClick={() => updateDesignSettings({ animationLevel: opt.id })}
                                >
                                    <div className="ke-gs-anim-text">
                                        <div className="ke-gs-anim-title">{opt.label}</div>
                                        <div className="ke-gs-anim-desc">{opt.description}</div>
                                    </div>
                                    <div className={`ke-gs-anim-check ${isActive ? 'ke-gs-anim-check-active' : 'ke-gs-anim-check-inactive'}`}>
                                        {isActive && (
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                <path d="M2 5L4.2 7.5L8 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Section>

                {/* ── 7. Karanlik Mod ── */}
                <Section id="darkmode" title="Karanlik Mod" openSections={openSections} toggle={toggleSection}>
                    <div className="ke-gs-toggle-row">
                        <span className="ke-gs-toggle-label">Karanlik Mod</span>
                        <button
                            className={`ke-gs-toggle-track ${currentDark ? 'ke-gs-toggle-track-on' : 'ke-gs-toggle-track-off'}`}
                            onClick={() => updateDesignSettings({ darkMode: !currentDark })}
                        >
                            <div className={`ke-gs-toggle-thumb ${currentDark ? 'ke-gs-toggle-thumb-on' : 'ke-gs-toggle-thumb-off'}`} />
                        </button>
                    </div>
                </Section>
            </div>
        </>
    )
}
