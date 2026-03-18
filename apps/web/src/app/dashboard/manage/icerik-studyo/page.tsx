'use client'

import { useState } from 'react'

/* ═══════ Types ═══════ */
interface ContentItem {
    id: string
    baslik: string
    tur: 'sosyal' | 'urun' | 'blog' | 'seo' | 'reklam'
    icerik: string
    olusturulma: string
    durum: 'taslak' | 'yayinda' | 'zamanlanmis'
}

const TUR_CONFIG: Record<string, { emoji: string; label: string; color: string }> = {
    sosyal: { emoji: '📱', label: 'Sosyal Medya', color: '#e91e63' },
    urun: { emoji: '📦', label: 'Ürün Açıklaması', color: '#ff9800' },
    blog: { emoji: '📝', label: 'Blog Yazısı', color: '#3b82f6' },
    seo: { emoji: '🔍', label: 'SEO İçerik', color: '#22c55e' },
    reklam: { emoji: '📢', label: 'Reklam Metni', color: '#8b5cf6' },
}

const AI_TEMPLATES = [
    { id: 'social-post', emoji: '📱', title: 'Sosyal Medya Postu', desc: 'Instagram, Facebook, X için gönderi', tur: 'sosyal' as const },
    { id: 'product-desc', emoji: '📦', title: 'Ürün Açıklaması', desc: 'E-ticaret ürün detayı', tur: 'urun' as const },
    { id: 'blog-outline', emoji: '📝', title: 'Blog Taslağı', desc: 'SEO-uyumlu blog yazısı', tur: 'blog' as const },
    { id: 'seo-meta', emoji: '🔍', title: 'SEO Meta', desc: 'Title + description + keywords', tur: 'seo' as const },
    { id: 'ad-copy', emoji: '📢', title: 'Reklam Metni', desc: 'Google/Meta Ads metin', tur: 'reklam' as const },
    { id: 'email-body', emoji: '📧', title: 'E-posta İçeriği', desc: 'Kampanya e-postası', tur: 'sosyal' as const },
]

/* ═══════ Demo Data ═══════ */
const DEMO_CONTENT: ContentItem[] = [
    { id: '1', baslik: 'Bahar Koleksiyonu Instagram Postu', tur: 'sosyal', icerik: '🌸 Bahar koleksiyonumuz geldi! Yeni ürünlerimizi keşfedin...', olusturulma: '2026-03-15', durum: 'yayinda' },
    { id: '2', baslik: 'Premium Su Arıtma Cihazı — Ürün Detay', tur: 'urun', icerik: 'En gelişmiş 7 aşamalı filtreleme teknolojisi ile...', olusturulma: '2026-03-14', durum: 'yayinda' },
    { id: '3', baslik: 'Evde Su Arıtma Rehberi — Blog', tur: 'blog', icerik: 'Su arıtma cihazı seçerken dikkat edilmesi gereken...', olusturulma: '2026-03-12', durum: 'taslak' },
    { id: '4', baslik: 'Google Ads — Su Arıtma Kampanyası', tur: 'reklam', icerik: 'En kaliteli su arıtma cihazları! Ücretsiz montaj...', olusturulma: '2026-03-10', durum: 'yayinda' },
    { id: '5', baslik: 'Ana Sayfa SEO Optimizasyonu', tur: 'seo', icerik: 'Title: Su Arıtma Cihazları | İstanbul | Kepenk', olusturulma: '2026-03-08', durum: 'yayinda' },
]

/* ═══════ Page ═══════ */
export default function IcerikStudyoPage() {
    const [contents, setContents] = useState(DEMO_CONTENT)
    const [showGenerator, setShowGenerator] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<typeof AI_TEMPLATES[0] | null>(null)
    const [aiPrompt, setAiPrompt] = useState('')
    const [aiResult, setAiResult] = useState('')
    const [generating, setGenerating] = useState(false)
    const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)

    const handleGenerate = async () => {
        if (!aiPrompt.trim() && !selectedTemplate) return
        setGenerating(true)

        try {
            const res = await fetch('/api/ai/content-studio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ template: selectedTemplate?.id, prompt: aiPrompt }),
            })
            if (res.ok) {
                const data = await res.json()
                setAiResult(data.content || simulateContent(selectedTemplate?.tur || 'sosyal'))
            } else {
                setAiResult(simulateContent(selectedTemplate?.tur || 'sosyal'))
            }
        } catch {
            setAiResult(simulateContent(selectedTemplate?.tur || 'sosyal'))
        }
        setGenerating(false)
    }

    const handleSaveContent = () => {
        if (!aiResult) return
        const item: ContentItem = {
            id: `new-${Date.now()}`, baslik: selectedTemplate?.title || aiPrompt.slice(0, 40),
            tur: selectedTemplate?.tur || 'sosyal', icerik: aiResult,
            olusturulma: new Date().toISOString().split('T')[0], durum: 'taslak',
        }
        setContents(prev => [item, ...prev])
        setShowGenerator(false)
        setSelectedTemplate(null)
        setAiPrompt('')
        setAiResult('')
    }

    return (
        <div style={{ maxWidth: 960 }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', margin: 0 }}>🎨 İçerik Stüdyo</h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>AI destekli içerik oluşturma ve yönetim merkezi.</p>
                </div>
                <button onClick={() => setShowGenerator(true)} style={{
                    padding: '9px 18px', borderRadius: 10, border: '1px solid rgba(168,85,247,0.3)',
                    background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(59,130,246,0.1))',
                    color: '#c084fc', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                }}>✨ AI ile Oluştur</button>
            </div>

            {/* Quick Templates */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>⚡ Hızlı Oluştur</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {AI_TEMPLATES.map(t => (
                        <button key={t.id} onClick={() => { setSelectedTemplate(t); setShowGenerator(true) }}
                            style={{
                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left',
                                transition: '0.15s', fontFamily: 'inherit',
                            }}>
                            <div style={{ fontSize: 24, marginBottom: 6 }}>{t.emoji}</div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginBottom: 2 }}>{t.title}</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{t.desc}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Toplam İçerik', value: contents.length, emoji: '📄' },
                    { label: 'Yayında', value: contents.filter(c => c.durum === 'yayinda').length, emoji: '🟢' },
                    { label: 'Taslak', value: contents.filter(c => c.durum === 'taslak').length, emoji: '📝' },
                ].map((k, i) => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 12, padding: '14px 16px',
                    }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: 6 }}>{k.emoji} {k.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{k.value}</div>
                    </div>
                ))}
            </div>

            {/* Content List */}
            <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 12 }}>📋 Oluşturulan İçerikler</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {contents.map(c => {
                    const tc = TUR_CONFIG[c.tur]
                    return (
                        <div key={c.id} onClick={() => setSelectedContent(c)} style={{
                            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 12, padding: '14px 16px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                background: `${tc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                            }}>{tc.emoji}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 2 }}>{c.baslik}</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
                                    {tc.label} · {new Date(c.olusturulma).toLocaleDateString('tr')}
                                </div>
                            </div>
                            <span style={{
                                fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 5, flexShrink: 0,
                                background: c.durum === 'yayinda' ? '#dcfce7' : '#f1f5f9',
                                color: c.durum === 'yayinda' ? '#166534' : '#475569',
                            }}>{c.durum === 'yayinda' ? 'Yayında' : 'Taslak'}</span>
                        </div>
                    )
                })}
            </div>

            {/* ═══════ AI Generator Modal ═══════ */}
            {showGenerator && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => { setShowGenerator(false); setAiResult(''); setSelectedTemplate(null) }}>
                    <div style={{ background: '#0c0c14', borderRadius: 18, padding: 24, width: 520, maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.08)' }}
                        onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 4 }}>
                            ✨ {selectedTemplate ? selectedTemplate.title : 'AI İçerik Üretici'}
                        </h3>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
                            {selectedTemplate ? selectedTemplate.desc : 'Ne tür bir içerik oluşturmak istiyorsunuz?'}
                        </p>

                        {!selectedTemplate && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16 }}>
                                {AI_TEMPLATES.map(t => (
                                    <button key={t.id} onClick={() => setSelectedTemplate(t)} style={{
                                        padding: '10px 8px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)',
                                        background: 'rgba(255,255,255,0.02)', cursor: 'pointer', fontFamily: 'inherit',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{ fontSize: 18 }}>{t.emoji}</div>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: 'white', marginTop: 4 }}>{t.title}</div>
                                    </button>
                                ))}
                            </div>
                        )}

                        <textarea
                            value={aiPrompt}
                            onChange={e => setAiPrompt(e.target.value)}
                            placeholder="Ne hakkında içerik oluşturmak istiyorsunuz? (ürün, hizmet, konu)"
                            rows={3}
                            style={{
                                width: '100%', padding: '10px 14px', borderRadius: 10,
                                border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)',
                                color: 'white', fontSize: 13, fontFamily: 'inherit', resize: 'none', outline: 'none',
                                marginBottom: 12, boxSizing: 'border-box',
                            }}
                        />

                        {!aiResult ? (
                            <button onClick={handleGenerate} disabled={generating} style={{
                                width: '100%', padding: '12px 0', borderRadius: 10, border: 'none',
                                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', color: 'white',
                                fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                            }}>
                                {generating ? '🔄 AI oluşturuyor...' : '🚀 İçerik Oluştur'}
                            </button>
                        ) : (
                            <>
                                <div style={{
                                    padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.08)', marginBottom: 12,
                                    fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, whiteSpace: 'pre-wrap',
                                }}>
                                    {aiResult}
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button onClick={() => { setAiResult(''); handleGenerate() }} style={{
                                        flex: 1, padding: '8px 0', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                                    }}>🔄 Yeniden Oluştur</button>
                                    <button onClick={() => { navigator.clipboard.writeText(aiResult) }} style={{
                                        flex: 1, padding: '8px 0', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                                    }}>📋 Kopyala</button>
                                    <button onClick={handleSaveContent} style={{
                                        flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                                        background: '#dc4e1e', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                    }}>💾 Kaydet</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* ═══════ Content Detail Drawer ═══════ */}
            {selectedContent && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setSelectedContent(null)}>
                    <div style={{
                        position: 'absolute', right: 0, top: 0, bottom: 0, width: 440, maxWidth: '90vw',
                        background: '#0a0a12', borderLeft: '1px solid rgba(255,255,255,0.08)', overflowY: 'auto',
                        animation: 'slideInRight 0.2s ease-out',
                    }} onClick={e => e.stopPropagation()}>
                        <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
                        <div style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', margin: 0 }}>{selectedContent.baslik}</h3>
                                <button onClick={() => setSelectedContent(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>✕</button>
                            </div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
                                {TUR_CONFIG[selectedContent.tur].emoji} {TUR_CONFIG[selectedContent.tur].label} · {new Date(selectedContent.olusturulma).toLocaleDateString('tr')}
                            </div>
                            <div style={{
                                padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)', fontSize: 14, color: 'rgba(255,255,255,0.7)',
                                lineHeight: 1.8, whiteSpace: 'pre-wrap',
                            }}>{selectedContent.icerik}</div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                                <button onClick={() => navigator.clipboard.writeText(selectedContent.icerik)} style={{
                                    flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                                }}>📋 Kopyala</button>
                                <button style={{
                                    flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
                                    background: '#dc4e1e', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                                }}>📤 Paylaş</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

/* ═══════ Simulated AI Content ═══════ */
function simulateContent(tur: string): string {
    const contents: Record<string, string> = {
        sosyal: `🌟 İşletmenizi büyütmenin zamanı geldi!

Kaliteli ürünlerimiz ve hizmetlerimizle fark yaratıyoruz. Yeni sezon koleksiyonumuzu keşfedin!

✅ Hızlı teslimat
✅ Kalite garantisi
✅ 7/24 müşteri desteği

📱 Hemen sipariş verin!
#kepenk #esnaf #dijital`,
        urun: `Premium Su Arıtma Cihazı — Model X500

7 aşamalı filtreleme teknolojisi ile musluk suyunuzu en saf haliyle için. UV dezenfeksiyon, aktif karbon ve ters ozmoz filtreli.

• Kapasite: 75 GPD
• Boyutlar: 40x36x45 cm
• Garanti: 2 yıl
• Ücretsiz montaj

Fiyat: ₺2.499 (KDV dahil)`,
        blog: `# Evde Su Arıtma: 2026 Kapsamlı Rehberi

## Neden Su Arıtma?
Su kalitesi sağlığımızın temelini oluşturur. İstanbul'un musluk suyu klorlu ve kireçli olabilir...

## Cihaz Türleri
1. **Tezgah Altı Sistemler** — En popüler seçenek
2. **Tezgah Üstü Filtreler** — Kolay kurulum
3. **Tam Ev Sistemleri** — Tüm musluklar için

## Seçim Kriterleri
- Bütçe ve kapasite
- Filtre değişim sıklığı
- Sertifikalar ve garantiler`,
        seo: `Title: Su Arıtma Cihazları | İstanbul | Kepenk.ai
Description: İstanbul'un en güvenilir su arıtma çözümleri. 7 aşamalı filtreleme, ücretsiz montaj ve 2 yıl garanti. Hemen sipariş verin!
Keywords: su arıtma, su arıtma cihazı, İstanbul su arıtma, ters ozmoz, filtre`,
        reklam: `🔥 İstanbul'un En İyi Su Arıtma Cihazları!

✅ Ücretsiz Montaj
✅ 2 Yıl Garanti
✅ Taksit İmkanı

📞 Hemen Arayın: 0212 XXX XX XX
🌐 www.kepenk.ai

#SuArıtma #İstanbul #ÜcretsizMontaj`,
    }
    return contents[tur] || contents.sosyal
}
