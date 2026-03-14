'use client'

import { useEditorStore, type SiteSettings } from '../store/editor-store'

/* ── Tab Definitions ── */
const TABS = [
    { id: 'business', label: 'İşletme Bilgileri', icon: '💼' },
    { id: 'seo', label: 'SEO Ayarları', icon: '📊' },
    { id: 'domain', label: 'Domain', icon: '🌐' },
    { id: 'social', label: 'Sosyal Medya', icon: '📱' },
    { id: 'privacy', label: 'Gizlilik', icon: '🔒' },
] as const

export default function SettingsModal() {
    const open = useEditorStore(s => s.settingsModalOpen)
    const tab = useEditorStore(s => s.settingsModalTab)
    const settings = useEditorStore(s => s.siteSettings)
    const close = useEditorStore(s => s.closeSettingsModal)
    const setTab = useEditorStore(s => s.setSettingsTab)
    const update = useEditorStore(s => s.updateSiteSettings)

    if (!open) return null

    return (
        <>
            <style>{`
                .ks-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); z-index: 50000; display: flex; align-items: center; justify-content: center; animation: ksFadeIn 0.15s; font-family: 'Inter', system-ui, sans-serif; }
                @keyframes ksFadeIn { from { opacity: 0; } to { opacity: 1; } }
                .ks-modal { background: #fff; border-radius: 16px; width: 740px; max-width: 94vw; max-height: 85vh; display: flex; box-shadow: 0 24px 80px rgba(0,0,0,0.18); animation: ksSlideIn 0.2s ease-out; overflow: hidden; }
                @keyframes ksSlideIn { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: none; } }

                /* Sidebar */
                .ks-sidebar { width: 200px; background: #f8fafc; border-right: 1px solid #e2e8f0; padding: 20px 0; flex-shrink: 0; display: flex; flex-direction: column; }
                .ks-sidebar-title { font-size: 14px; font-weight: 800; color: #17191c; padding: 0 20px; margin-bottom: 16px; letter-spacing: -0.01em; }
                .ks-tab { display: flex; align-items: center; gap: 10px; padding: 10px 20px; font-size: 13px; font-weight: 500; color: #475569; cursor: pointer; transition: all 0.12s; border-left: 3px solid transparent; }
                .ks-tab:hover { background: #f1f5f9; color: #1e293b; }
                .ks-tab.active { background: #eff6ff; color: #2563eb; font-weight: 700; border-left-color: #2563eb; }
                .ks-tab-icon { font-size: 15px; width: 22px; text-align: center; }

                /* Content */
                .ks-content { flex: 1; padding: 28px 32px; overflow-y: auto; }
                .ks-content-title { font-size: 17px; font-weight: 800; color: #17191c; margin-bottom: 4px; }
                .ks-content-desc { font-size: 12px; color: #64748b; margin-bottom: 24px; line-height: 1.5; }

                /* Form Rows */
                .ks-group { margin-bottom: 20px; }
                .ks-label { display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px; letter-spacing: 0.01em; }
                .ks-input { width: 100%; padding: 9px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 13px; font-family: inherit; color: #17191c; background: #fff; transition: border-color 0.15s, box-shadow 0.15s; outline: none; }
                .ks-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
                .ks-input::placeholder { color: #94a3b8; }
                .ks-textarea { resize: vertical; min-height: 72px; }
                .ks-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
                .ks-hint { font-size: 11px; color: #94a3b8; margin-top: 4px; }
                .ks-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
                .ks-toggle-label { font-size: 13px; font-weight: 600; color: #334155; }
                .ks-toggle-desc { font-size: 11px; color: #94a3b8; margin-top: 2px; }

                /* Toggle switch */
                .ks-toggle { position: relative; width: 42px; height: 24px; border-radius: 12px; background: #cbd5e1; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
                .ks-toggle.on { background: #3b82f6; }
                .ks-toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
                .ks-toggle.on::after { transform: translateX(18px); }

                /* Close button */
                .ks-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #64748b; transition: 0.15s; }
                .ks-close:hover { background: #f1f5f9; color: #17191c; }

                /* SEO preview */
                .ks-seo-preview { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
                .ks-seo-preview-title { font-size: 16px; color: #1a0dab; font-weight: 500; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .ks-seo-preview-url { font-size: 12px; color: #006621; margin-bottom: 4px; }
                .ks-seo-preview-desc { font-size: 12px; color: #545454; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

                @media (max-width: 640px) {
                    .ks-modal { flex-direction: column; }
                    .ks-sidebar { width: 100%; flex-direction: row; overflow-x: auto; padding: 12px; border-right: none; border-bottom: 1px solid #e2e8f0; }
                    .ks-tab { flex-shrink: 0; border-left: none; border-bottom: 3px solid transparent; }
                    .ks-tab.active { border-left-color: transparent; border-bottom-color: #2563eb; }
                    .ks-sidebar-title { display: none; }
                    .ks-row { grid-template-columns: 1fr; }
                }
            `}</style>

            <div className="ks-overlay" onClick={close}>
                <div className="ks-modal" onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
                    <button className="ks-close" onClick={close} title="Kapat">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>

                    {/* Sidebar Tabs */}
                    <div className="ks-sidebar">
                        <div className="ks-sidebar-title">⚙ Ayarlar</div>
                        {TABS.map(t => (
                            <div key={t.id} className={`ks-tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
                                <span className="ks-tab-icon">{t.icon}</span>
                                {t.label}
                            </div>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="ks-content">
                        {tab === 'business' && <BusinessTab settings={settings} update={update} />}
                        {tab === 'seo' && <SeoTab settings={settings} update={update} />}
                        {tab === 'domain' && <DomainTab settings={settings} update={update} />}
                        {tab === 'social' && <SocialTab settings={settings} update={update} />}
                        {tab === 'privacy' && <PrivacyTab settings={settings} update={update} />}
                    </div>
                </div>
            </div>
        </>
    )
}

/* ── Tab: İşletme Bilgileri ── */
function BusinessTab({ settings, update }: TabProps) {
    return (
        <>
            <div className="ks-content-title">İşletme Bilgileri</div>
            <div className="ks-content-desc">Sitenizde ve SEO'da kullanılacak işletme bilgilerinizi girin.</div>

            <div className="ks-row">
                <div className="ks-group">
                    <label className="ks-label">İşletme Adı</label>
                    <input className="ks-input" value={settings.businessName} onChange={e => update({ businessName: e.target.value })} placeholder="Örn: Güzel Berber" />
                </div>
                <div className="ks-group">
                    <label className="ks-label">Telefon</label>
                    <input className="ks-input" value={settings.businessPhone} onChange={e => update({ businessPhone: e.target.value })} placeholder="0532 000 00 00" />
                </div>
            </div>

            <div className="ks-group">
                <label className="ks-label">E-posta</label>
                <input className="ks-input" type="email" value={settings.businessEmail} onChange={e => update({ businessEmail: e.target.value })} placeholder="info@isletme.com" />
            </div>

            <div className="ks-group">
                <label className="ks-label">Adres</label>
                <textarea className="ks-input ks-textarea" value={settings.businessAddress} onChange={e => update({ businessAddress: e.target.value })} placeholder="Mahalle, Cadde No, İlçe / İl" style={{ minHeight: 56 }} />
            </div>

            <div className="ks-group">
                <label className="ks-label">Çalışma Saatleri</label>
                <input className="ks-input" value={settings.openingHours} onChange={e => update({ openingHours: e.target.value })} placeholder="Hafta içi 09:00 - 18:00, Cumartesi 10:00 - 15:00" />
            </div>
        </>
    )
}

/* ── Tab: SEO ── */
function SeoTab({ settings, update }: TabProps) {
    const title = settings.seoTitle || settings.businessName || 'Site Başlığı'
    const desc = settings.seoDescription || 'Site açıklamanız burada görünecek...'
    const domain = settings.subdomain ? `${settings.subdomain}.kepenk.ai` : 'isletme.kepenk.ai'

    return (
        <>
            <div className="ks-content-title">SEO Ayarları</div>
            <div className="ks-content-desc">Arama motorlarında nasıl görüneceğinizi kontrol edin.</div>

            {/* Google Preview */}
            <div className="ks-seo-preview">
                <div className="ks-seo-preview-title">{title}</div>
                <div className="ks-seo-preview-url">https://{domain}</div>
                <div className="ks-seo-preview-desc">{desc}</div>
            </div>

            <div className="ks-group">
                <label className="ks-label">Sayfa Başlığı (Title Tag)</label>
                <input className="ks-input" value={settings.seoTitle} onChange={e => update({ seoTitle: e.target.value })} placeholder="İşletme Adı — Hizmet Açıklaması" maxLength={70} />
                <div className="ks-hint">{(settings.seoTitle || '').length}/70 karakter</div>
            </div>

            <div className="ks-group">
                <label className="ks-label">Meta Açıklama</label>
                <textarea className="ks-input ks-textarea" value={settings.seoDescription} onChange={e => update({ seoDescription: e.target.value })} placeholder="Sitenizi kısaca anlatan 155 karakterlik açıklama..." maxLength={160} />
                <div className="ks-hint">{(settings.seoDescription || '').length}/160 karakter</div>
            </div>

            <div className="ks-group">
                <label className="ks-label">Anahtar Kelimeler</label>
                <input className="ks-input" value={settings.seoKeywords} onChange={e => update({ seoKeywords: e.target.value })} placeholder="berber, kuaför, istanbul, saç kesimi" />
                <div className="ks-hint">Virgülle ayırarak yazın</div>
            </div>

            <div className="ks-group">
                <label className="ks-label">Sosyal Paylaşım Görseli (OG Image URL)</label>
                <input className="ks-input" value={settings.ogImage} onChange={e => update({ ogImage: e.target.value })} placeholder="https://..." />
                <div className="ks-hint">1200x630px önerilen boyut</div>
            </div>
        </>
    )
}

/* ── Tab: Domain ── */
function DomainTab({ settings, update }: TabProps) {
    return (
        <>
            <div className="ks-content-title">Domain Ayarları</div>
            <div className="ks-content-desc">Sitenizin alan adını yapılandırın.</div>

            <div className="ks-group">
                <label className="ks-label">Alt Alan Adı (Subdomain)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <input className="ks-input" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 'none' }} value={settings.subdomain} onChange={e => update({ subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })} placeholder="isletme-adi" />
                    <div style={{ padding: '9px 14px', background: '#f1f5f9', border: '1.5px solid #e2e8f0', borderLeft: 'none', borderRadius: '0 10px 10px 0', fontSize: 13, color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap' }}>.kepenk.ai</div>
                </div>
                <div className="ks-hint">Sadece küçük harf, rakam ve tire kullanabilirsiniz</div>
            </div>

            <div className="ks-group">
                <label className="ks-label">Özel Domain (Opsiyonel)</label>
                <input className="ks-input" value={settings.customDomain} onChange={e => update({ customDomain: e.target.value })} placeholder="www.isletme.com" />
                <div className="ks-hint">Pro paketlerde mevcut — DNS ayarlarını yapmanız gerekir</div>
            </div>

            {settings.customDomain && (
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: 14, marginTop: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1e40af', marginBottom: 8 }}>DNS Yapılandırması</div>
                    <div style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.7, fontFamily: 'monospace' }}>
                        Tür: CNAME<br />
                        İsim: www<br />
                        Değer: proxy.kepenk.ai<br /><br />
                        Tür: A<br />
                        İsim: @<br />
                        Değer: 76.76.21.21
                    </div>
                </div>
            )}
        </>
    )
}

/* ── Tab: Sosyal Medya ── */
function SocialTab({ settings, update }: TabProps) {
    const socials = [
        { key: 'socialWhatsapp' as const, label: 'WhatsApp', icon: '💬', placeholder: '905320000000' },
        { key: 'socialInstagram' as const, label: 'Instagram', icon: '📸', placeholder: 'instagram.com/isletme' },
        { key: 'socialFacebook' as const, label: 'Facebook', icon: '👍', placeholder: 'facebook.com/isletme' },
        { key: 'socialTwitter' as const, label: 'X (Twitter)', icon: '🐦', placeholder: 'x.com/isletme' },
    ]

    return (
        <>
            <div className="ks-content-title">Sosyal Medya</div>
            <div className="ks-content-desc">Sosyal medya hesaplarınızı bağlayın. Footer ve iletişim bölümlerinde otomatik görünür.</div>

            {socials.map(s => (
                <div className="ks-group" key={s.key}>
                    <label className="ks-label">{s.icon} {s.label}</label>
                    <input className="ks-input" value={settings[s.key]} onChange={e => update({ [s.key]: e.target.value })} placeholder={s.placeholder} />
                </div>
            ))}
        </>
    )
}

/* ── Tab: Gizlilik ── */
function PrivacyTab({ settings, update }: TabProps) {
    return (
        <>
            <div className="ks-content-title">Gizlilik & Çerezler</div>
            <div className="ks-content-desc">KVKK/GDPR uyumluluğu ve çerez politikası ayarları.</div>

            <div className="ks-toggle-row">
                <div>
                    <div className="ks-toggle-label">Çerez Bildirimi</div>
                    <div className="ks-toggle-desc">Ziyaretçilere çerez kullanımı hakkında banner göster</div>
                </div>
                <div className={`ks-toggle${settings.cookieBanner ? ' on' : ''}`} onClick={() => update({ cookieBanner: !settings.cookieBanner })} />
            </div>

            <div className="ks-toggle-row">
                <div>
                    <div className="ks-toggle-label">Gizlilik Politikası Sayfası</div>
                    <div className="ks-toggle-desc">Otomatik gizlilik politikası sayfası oluştur</div>
                </div>
                <div className={`ks-toggle${settings.privacyPageEnabled ? ' on' : ''}`} onClick={() => update({ privacyPageEnabled: !settings.privacyPageEnabled })} />
            </div>
        </>
    )
}

/* ── Types ── */
interface TabProps {
    settings: SiteSettings
    update: (partial: Partial<SiteSettings>) => void
}
