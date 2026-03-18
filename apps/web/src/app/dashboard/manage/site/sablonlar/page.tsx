'use client'

import { useState } from 'react'

/* ═══════ Sector / Template Data ═══════ */
interface SectorInfo {
    id: string; name: string; icon: string; description: string; color: string
    templates: TemplateInfo[]
}
interface TemplateInfo {
    id: string; name: string; description: string; blockCount: number
    theme: { primary: string; secondary: string; accent: string; fontHeading: string; fontBody: string }
    requiredBlocks: string[]; optionalBlocks: string[]
}

const SECTORS: SectorInfo[] = [
    {
        id: 'berber', name: 'Berber & Kuaför', icon: '✂️', description: 'Erkek kuaförü, berber dükkanı', color: '#C9A84C',
        templates: [{
            id: 'berber_classic', name: 'Klasik Berber', description: 'Geleneksel berber dükkanı için şık ve maskülen tasarım',
            blockCount: 12, theme: { primary: '#1A1A2E', secondary: '#C9A84C', accent: '#E8D5B5', fontHeading: 'Playfair Display', fontBody: 'DM Sans' },
            requiredBlocks: ['header', 'services', 'booking', 'working_hours', 'map', 'whatsapp_cta', 'footer'],
            optionalBlocks: ['hero', 'before_after', 'gallery', 'team', 'testimonials', 'blog_preview', 'faq', 'social_proof'],
        }],
    },
    {
        id: 'restoran', name: 'Restoran & Kafe', icon: '🍽️', description: 'Restoran, kafe, pastane', color: '#C84B31',
        templates: [{
            id: 'restoran_warm', name: 'Sıcak Restoran', description: 'Sıcak renkli, iştah açan restoran tasarımı',
            blockCount: 12, theme: { primary: '#C84B31', secondary: '#2D2B2B', accent: '#F5E6CC', fontHeading: 'Syne', fontBody: 'Inter' },
            requiredBlocks: ['header', 'hero', 'menu', 'working_hours', 'map', 'whatsapp_cta', 'footer'],
            optionalBlocks: ['gallery', 'testimonials', 'booking', 'team', 'faq', 'social_proof'],
        }],
    },
    {
        id: 'doktor', name: 'Doktor & Klinik', icon: '🩺', description: 'Doktor muayenehanesi, özel klinik', color: '#0077B6',
        templates: [{
            id: 'doktor_trust', name: 'Güvenilir Doktor', description: 'Profesyonel ve güven veren klinik tasarımı',
            blockCount: 12, theme: { primary: '#0077B6', secondary: '#023E8A', accent: '#E8F4FD', fontHeading: 'Inter', fontBody: 'Inter' },
            requiredBlocks: ['header', 'hero', 'services', 'team', 'booking', 'contact', 'working_hours', 'footer'],
            optionalBlocks: ['testimonials', 'faq', 'gallery', 'blog_preview', 'social_proof'],
        }],
    },
    {
        id: 'guzellik', name: 'Güzellik Salonu', icon: '💅', description: 'Güzellik merkezi, cilt bakımı, spa', color: '#BE185D',
        templates: [{
            id: 'guzellik_elegant', name: 'Elegant Studio', description: 'Feminen ve soft tonlarda güzellik salonu tasarımı',
            blockCount: 12, theme: { primary: '#BE185D', secondary: '#831843', accent: '#FDF2F8', fontHeading: 'Cormorant Garamond', fontBody: 'Lato' },
            requiredBlocks: ['header', 'hero', 'services', 'gallery', 'booking', 'working_hours', 'whatsapp_cta', 'footer'],
            optionalBlocks: ['before_after', 'team', 'testimonials', 'pricing', 'faq', 'social_proof'],
        }],
    },
    {
        id: 'avukat', name: 'Avukat & Hukuk', icon: '⚖️', description: 'Hukuk bürosu, avukatlık', color: '#D4AF37',
        templates: [{
            id: 'avukat_prestige', name: 'Prestij Hukuk', description: 'Ciddi ve güvenilir hukuk bürosu tasarımı',
            blockCount: 12, theme: { primary: '#1E293B', secondary: '#334155', accent: '#D4AF37', fontHeading: 'Libre Baskerville', fontBody: 'Source Sans 3' },
            requiredBlocks: ['header', 'hero', 'services', 'booking', 'contact', 'working_hours', 'whatsapp_cta', 'footer'],
            optionalBlocks: ['social_proof', 'team', 'testimonials', 'faq', 'blog_preview', 'gallery'],
        }],
    },
    {
        id: 'dis', name: 'Diş Kliniği', icon: '🦷', description: 'Diş hekimliği, ağız sağlığı', color: '#06B6D4',
        templates: [{
            id: 'dis_modern', name: 'Modern Diş', description: 'Güven veren, temiz diş kliniği tasarımı',
            blockCount: 13, theme: { primary: '#06B6D4', secondary: '#0891B2', accent: '#ECFEFF', fontHeading: 'Poppins', fontBody: 'Inter' },
            requiredBlocks: ['header', 'hero', 'services', 'team', 'booking', 'working_hours', 'whatsapp_cta', 'footer'],
            optionalBlocks: ['before_after', 'social_proof', 'gallery', 'testimonials', 'faq', 'blog_preview'],
        }],
    },
    {
        id: 'oto', name: 'Oto Tamir & Servis', icon: '🔧', description: 'Oto tamir, yedek parça', color: '#DC2626',
        templates: [{
            id: 'oto_mekanik', name: 'Güçlü Mekanik', description: 'Profesyonel oto tamir ve servis tasarımı',
            blockCount: 12, theme: { primary: '#DC2626', secondary: '#1F2937', accent: '#FEF2F2', fontHeading: 'Montserrat', fontBody: 'Open Sans' },
            requiredBlocks: ['header', 'hero', 'services', 'booking', 'working_hours', 'map', 'whatsapp_cta', 'footer'],
            optionalBlocks: ['pricing', 'social_proof', 'gallery', 'testimonials', 'faq', 'blog_preview', 'team'],
        }],
    },
    {
        id: 'spor', name: 'Spor Salonu & Fitness', icon: '🏋️', description: 'Fitness, gym, yoga', color: '#7C3AED',
        templates: [{
            id: 'spor_power', name: 'Power Gym', description: 'Enerjik ve motivasyon dolu fitness tasarımı',
            blockCount: 13, theme: { primary: '#7C3AED', secondary: '#4C1D95', accent: '#EDE9FE', fontHeading: 'Bebas Neue', fontBody: 'Roboto' },
            requiredBlocks: ['header', 'hero', 'services', 'pricing', 'working_hours', 'map', 'whatsapp_cta', 'footer'],
            optionalBlocks: ['team', 'social_proof', 'gallery', 'testimonials', 'booking', 'faq', 'blog_preview'],
        }],
    },
]

const BLOCK_LABELS: Record<string, string> = {
    header: '📌 Header', hero: '🖼️ Hero', services: '🛠️ Hizmetler', team: '👥 Ekip',
    gallery: '📸 Galeri', testimonials: '⭐ Yorumlar', booking: '📅 Randevu', pricing: '💰 Fiyatlar',
    faq: '❓ SSS', contact: '📞 İletişim', map: '🗺️ Harita', working_hours: '🕒 Saatler',
    whatsapp_cta: '💬 WhatsApp', social_proof: '📊 Kanıtlar', menu: '🍽️ Menü',
    before_after: '🔄 Önce/Sonra', blog_preview: '📝 Blog', cta: '🎯 CTA', footer: '📍 Footer',
}

export default function SablonGalerisiPage() {
    const [activeSector, setActiveSector] = useState<string | null>(null)
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(null)
    const filtered = activeSector ? SECTORS.filter(s => s.id === activeSector) : SECTORS

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>🎨 Şablon Galerisi</h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Sektörünüze özel hazır şablonlarla sitenizi oluşturun.</p>
            </div>

            {/* Sector Filter */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
                <button onClick={() => setActiveSector(null)} style={{
                    padding: '7px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                    background: !activeSector ? 'rgba(200,75,49,0.15)' : 'rgba(255,255,255,0.03)',
                    color: !activeSector ? '#f97316' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', fontFamily: 'inherit',
                }}>Tümü</button>
                {SECTORS.map(s => (
                    <button key={s.id} onClick={() => setActiveSector(s.id)} style={{
                        padding: '7px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                        background: activeSector === s.id ? `${s.color}15` : 'rgba(255,255,255,0.03)',
                        color: activeSector === s.id ? s.color : 'rgba(255,255,255,0.4)',
                        cursor: 'pointer', fontFamily: 'inherit',
                    }}>{s.icon} {s.name}</button>
                ))}
            </div>

            {/* Sector Cards + Templates */}
            {filtered.map(sector => (
                <div key={sector.id} style={{ marginBottom: 28 }}>
                    {/* Sector Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${sector.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{sector.icon}</div>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>{sector.name}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{sector.description}</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: sector.color, background: `${sector.color}10`, padding: '3px 10px', borderRadius: 6 }}>{sector.templates.length} şablon</div>
                    </div>

                    {/* Template Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                        {sector.templates.map(tpl => (
                            <div key={tpl.id} onClick={() => setSelectedTemplate(tpl)} style={{
                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: '0.2s',
                            }}>
                                {/* Theme Preview */}
                                <div style={{ height: 100, background: `linear-gradient(135deg, ${tpl.theme.primary}, ${tpl.theme.secondary})`, position: 'relative' }}>
                                    <div style={{ position: 'absolute', bottom: 10, left: 12, display: 'flex', gap: 4 }}>
                                        {[tpl.theme.primary, tpl.theme.secondary, tpl.theme.accent].map((c, i) => (
                                            <div key={i} style={{ width: 18, height: 18, borderRadius: 4, background: c, border: '2px solid rgba(255,255,255,0.3)' }} />
                                        ))}
                                    </div>
                                    <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: 'rgba(0,0,0,0.5)', color: 'white' }}>{tpl.blockCount} blok</div>
                                </div>
                                <div style={{ padding: '12px 14px' }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>{tpl.name}</div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 8, lineHeight: 1.4 }}>{tpl.description}</div>
                                    <div style={{ display: 'flex', gap: 4, fontSize: 9, color: 'rgba(255,255,255,0.25)' }}>
                                        <span>📝 {tpl.theme.fontHeading}</span>
                                        <span>·</span>
                                        <span>📖 {tpl.theme.fontBody}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* ═══════ Template Detail Modal ═══════ */}
            {selectedTemplate && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setSelectedTemplate(null)}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 520, maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        {/* Theme Preview */}
                        <div style={{ height: 80, borderRadius: 12, background: `linear-gradient(135deg, ${selectedTemplate.theme.primary}, ${selectedTemplate.theme.secondary})`, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 28, fontWeight: 800, color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{selectedTemplate.name}</span>
                        </div>

                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{selectedTemplate.description}</p>

                        {/* Theme Colors */}
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>Renk Paleti</div>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                            {[
                                { label: 'Ana', color: selectedTemplate.theme.primary },
                                { label: 'İkincil', color: selectedTemplate.theme.secondary },
                                { label: 'Vurgu', color: selectedTemplate.theme.accent },
                            ].map((c, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '6px 10px' }}>
                                    <div style={{ width: 16, height: 16, borderRadius: 3, background: c.color, border: '1px solid rgba(255,255,255,0.15)' }} />
                                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{c.label}</span>
                                    <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>{c.color}</span>
                                </div>
                            ))}
                        </div>

                        {/* Required Blocks */}
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>Zorunlu Bloklar</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
                            {selectedTemplate.requiredBlocks.map(b => (
                                <span key={b} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 5, background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                                    {BLOCK_LABELS[b] || b}
                                </span>
                            ))}
                        </div>

                        {/* Optional Blocks */}
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 6 }}>Opsiyonel Bloklar</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 20 }}>
                            {selectedTemplate.optionalBlocks.map(b => (
                                <span key={b} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 5, background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' }}>
                                    {BLOCK_LABELS[b] || b}
                                </span>
                            ))}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setSelectedTemplate(null)} style={{ padding: '9px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Kapat</button>
                            <button style={{ padding: '9px 18px', borderRadius: 10, border: 'none', background: '#C84B31', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>🚀 Bu Şablonu Kullan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
