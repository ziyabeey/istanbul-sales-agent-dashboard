'use client'

import { useState } from 'react'
import { useEditorStore } from '../../store/editor-store'
import { getPresetsForSection, type ComponentPreset } from '../../data/componentPresets'

/* ── Mini SVG Thumbnail ── */
function PresetThumbnail({ type }: { type: ComponentPreset['thumbnail'] }) {
    const w = 60, h = 40
    const bg = '#f1f5f9', line = '#cbd5e1', dark = '#64748b', accent = '#3b82f6'
    const common = { width: w, height: h, viewBox: `0 0 ${w} ${h}`, fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }

    switch (type) {
        case 'minimal':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                    <rect x="15" y="14" width="30" height="3" rx="1" fill={dark} />
                    <rect x="18" y="20" width="24" height="2" rx="1" fill={line} />
                    <rect x="20" y="25" width="20" height="2" rx="1" fill={line} />
                </svg>
            )
        case 'cards':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                    <rect x="4" y="8" width="15" height="24" rx="2" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="22" y="8" width="15" height="24" rx="2" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="40" y="8" width="15" height="24" rx="2" fill="#fff" stroke={line} strokeWidth="0.5" />
                </svg>
            )
        case 'grid':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                    <rect x="4" y="4" width="16" height="14" rx="2" fill="#ddd6fe" />
                    <rect x="22" y="4" width="16" height="14" rx="2" fill="#bfdbfe" />
                    <rect x="40" y="4" width="16" height="14" rx="2" fill="#fecaca" />
                    <rect x="4" y="22" width="16" height="14" rx="2" fill="#d9f99d" />
                    <rect x="22" y="22" width="16" height="14" rx="2" fill="#fbcfe8" />
                    <rect x="40" y="22" width="16" height="14" rx="2" fill="#fde68a" />
                </svg>
            )
        case 'split':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                    <rect x="3" y="6" width="25" height="28" rx="2" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="7" y="14" width="17" height="2" rx="1" fill={dark} />
                    <rect x="7" y="19" width="13" height="2" rx="1" fill={line} />
                    <rect x="32" y="6" width="25" height="28" rx="2" fill="#e2e8f0" />
                </svg>
            )
        case 'centered':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                    <rect x="14" y="8" width="32" height="24" rx="2" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="20" y="14" width="20" height="3" rx="1" fill={dark} />
                    <rect x="22" y="20" width="16" height="2" rx="1" fill={line} />
                    <rect x="24" y="25" width="12" height="2" rx="1" fill={line} />
                </svg>
            )
        case 'dark':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill="#1e293b" />
                    <rect x="12" y="12" width="36" height="3" rx="1" fill="#e2e8f0" />
                    <rect x="16" y="18" width="28" height="2" rx="1" fill="#64748b" />
                    <rect x="20" y="26" width="20" height="6" rx="2" fill={accent} />
                </svg>
            )
        case 'gradient':
            return (
                <svg {...common}>
                    <defs>
                        <linearGradient id="ke-pp-grad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                    <rect width={w} height={h} rx="3" fill="url(#ke-pp-grad)" />
                    <rect x="14" y="14" width="32" height="3" rx="1" fill="#fff" />
                    <rect x="18" y="20" width="24" height="2" rx="1" fill="#fff" opacity="0.7" />
                </svg>
            )
        case 'list':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                    <rect x="6" y="7" width="48" height="6" rx="1" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="6" y="16" width="48" height="6" rx="1" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="6" y="25" width="48" height="6" rx="1" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="6" y="34" width="48" height="3" rx="1" fill={line} opacity="0.3" />
                </svg>
            )
        case 'carousel':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                    <rect x="10" y="6" width="40" height="28" rx="2" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="14" y="12" width="32" height="3" rx="1" fill={dark} />
                    <rect x="18" y="18" width="24" height="2" rx="1" fill={line} />
                    <path d="M5 20 L8 17 L8 23 Z" fill={dark} />
                    <path d="M55 20 L52 17 L52 23 Z" fill={dark} />
                </svg>
            )
        case 'masonry':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                    <rect x="4" y="4" width="16" height="18" rx="2" fill="#ddd6fe" />
                    <rect x="22" y="4" width="16" height="12" rx="2" fill="#bfdbfe" />
                    <rect x="40" y="4" width="16" height="20" rx="2" fill="#fecaca" />
                    <rect x="4" y="24" width="16" height="12" rx="2" fill="#d9f99d" />
                    <rect x="22" y="18" width="16" height="18" rx="2" fill="#fbcfe8" />
                    <rect x="40" y="26" width="16" height="10" rx="2" fill="#fde68a" />
                </svg>
            )
        case 'full':
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill="#e2e8f0" />
                    <rect x="4" y="4" width="52" height="32" rx="2" fill="#fff" stroke={line} strokeWidth="0.5" />
                    <rect x="14" y="14" width="32" height="3" rx="1" fill={dark} />
                    <rect x="18" y="20" width="24" height="2" rx="1" fill={line} />
                </svg>
            )
        default:
            return (
                <svg {...common}>
                    <rect width={w} height={h} rx="3" fill={bg} />
                </svg>
            )
    }
}

/* ── Check icon SVG ── */
function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" fill="#3b82f6" />
            <path d="M5 8L7 10L11 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

/* ── Chevron icon for collapsible header ── */
function ChevronDown({ open }: { open: boolean }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

/* ── Active preset detection ── */
function isPresetActive(currentProps: Record<string, unknown>, presetProps: Record<string, unknown>): boolean {
    for (const key of Object.keys(presetProps)) {
        if (currentProps[key] !== presetProps[key]) return false
    }
    return true
}

/* ══════════════════════════════════════════════════════════════════
   PresetPicker — rendered at the top of SectionInspector
   ══════════════════════════════════════════════════════════════════ */

interface PresetPickerProps {
    sectionType: string
    currentProps: Record<string, unknown>
    instanceId: string
}

export default function PresetPicker({ sectionType, currentProps, instanceId }: PresetPickerProps) {
    const [open, setOpen] = useState(true)
    const updateSectionProps = useEditorStore(s => s.updateSectionProps)
    const presets = getPresetsForSection(sectionType)

    if (presets.length === 0) return null

    return (
        <div className="ke-pp-root">
            <style>{`
                .ke-pp-root {
                    margin-bottom: 12px;
                }
                .ke-pp-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 0;
                    cursor: pointer;
                    user-select: none;
                }
                .ke-pp-title {
                    font-size: 12px;
                    font-weight: 600;
                    color: #475569;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .ke-pp-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                    padding-bottom: 8px;
                }
                .ke-pp-card {
                    padding: 10px;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    cursor: pointer;
                    text-align: center;
                    background: #fff;
                    transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
                    position: relative;
                }
                .ke-pp-card:hover {
                    border-color: #94a3b8;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
                }
                .ke-pp-card--active {
                    border-color: #3b82f6;
                    background: #eff6ff;
                }
                .ke-pp-card--active:hover {
                    border-color: #3b82f6;
                }
                .ke-pp-check {
                    position: absolute;
                    top: 6px;
                    right: 6px;
                }
                .ke-pp-thumb {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 6px;
                }
                .ke-pp-name {
                    font-size: 11px;
                    font-weight: 600;
                    color: #334155;
                    line-height: 1.3;
                }
                .ke-pp-desc {
                    font-size: 10px;
                    color: #94a3b8;
                    line-height: 1.3;
                    margin-top: 2px;
                }
            `}</style>

            <div className="ke-pp-header" onClick={() => setOpen(v => !v)}>
                <span className="ke-pp-title">Hazir Tasarimlar</span>
                <ChevronDown open={open} />
            </div>

            {open && (
                <div className="ke-pp-grid">
                    {presets.map(preset => {
                        const active = isPresetActive(currentProps, preset.props)
                        return (
                            <div
                                key={preset.id}
                                className={`ke-pp-card${active ? ' ke-pp-card--active' : ''}`}
                                onClick={() => updateSectionProps(instanceId, preset.props)}
                            >
                                {active && (
                                    <div className="ke-pp-check">
                                        <CheckIcon />
                                    </div>
                                )}
                                <div className="ke-pp-thumb">
                                    <PresetThumbnail type={preset.thumbnail} />
                                </div>
                                <div className="ke-pp-name">{preset.name}</div>
                                <div className="ke-pp-desc">{preset.description}</div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
