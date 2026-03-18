'use client'

import { useState } from 'react'

/* ═══════ Right Panel Component ═══════ */
function RightPanel() {
    return (
        <aside className="kpnk-right">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Sizin İçin Önerilenler</h3>
            <p style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>İhtiyaçlarınıza göre kişiselleştirildi.</p>
            <a href="/dashboard/raporlar" style={{ fontSize: 13, fontWeight: 500, color: 'var(--kpnk-text-link)', textDecoration: 'none', display: 'block', marginBottom: 20 }}>Tümünü Görüntüle</a>

            <div className="kpnk-card" style={{ padding: 18 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>Çok Dilli Bir Site Edinin</h4>
                <p style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
                    180+ dil ile kitlelere ulaşın ve sitenizin trafiğini artırın. İçeriğinizi tek bir tıklamayla otomatik olarak çevirin.
                </p>
                <a href="/dashboard/sitem/editor" style={{
                    display: 'block', textAlign: 'center', fontSize: 12, fontWeight: 600,
                    color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)',
                    padding: '8px 14px', borderRadius: 'var(--kpnk-pill-radius)', textDecoration: 'none'
                }}>Sitenizi Başka Dillere Çevirin</a>
            </div>

            <div className="kpnk-card" style={{ padding: 18, marginTop: 12 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>Google Ads ile Büyüyün</h4>
                <p style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
                    Hedef kitlenize doğrudan ulaşın. AI destekli kampanya oluşturucu ile dakikalar içinde reklam yayınlayın.
                </p>
                <a href="/dashboard/reklamlar" style={{
                    display: 'block', textAlign: 'center', fontSize: 12, fontWeight: 600,
                    color: 'var(--kpnk-primary)', background: 'var(--kpnk-primary-light)',
                    padding: '8px 14px', borderRadius: 'var(--kpnk-pill-radius)', textDecoration: 'none'
                }}>Reklam Kampanyası Oluştur</a>
            </div>
        </aside>
    )
}

/* ═══════ Main Dashboard Page ═══════ */
export default function ManageDashboard() {
    const [activeQueryTab, setActiveQueryTab] = useState<'queries' | 'pages'>('queries')
    const [sortBy, setSortBy] = useState<'priority' | 'date'>('priority')
    const [dismissed, setDismissed] = useState<string[]>([])

    const suggestions = [
        { id: 's1', text: 'Müşteri Deneyimini İyileştirmek İçin Mağaza Ayarlarınızı Yapın', btn: 'Ayarları Yönet' },
        { id: 's2', text: 'Ürün Sayfalarının Arama Sonuçlarında ve Sosyal Ağlardaki Görünümünü Özelleştirin', btn: 'Başla' },
        { id: 's3', text: 'Facebook ve Instagram Reklam Kampanyasıyla Yeni Kitlelere Ulaşın', btn: 'Hemen Başla' },
        { id: 's4', text: 'Düzenli Olmak ve İletişimi Kolaylaştırmak İçin Kişilerinizi İçe Aktarın', btn: 'Kişileri İçe Aktar' },
    ].filter(s => !dismissed.includes(s.id))

    return (
        <>
            <div className="kpnk-main">
                {/* Welcome */}
                <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Tekrar hoş geldiniz, Yusuf Ziya</h1>

                {/* Site Identity Bar */}
                <div className="kpnk-info-bar">
                    <span><strong>Business</strong></span>
                    <a href="/dashboard/abonelik" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', textDecoration: 'none', fontWeight: 500 }}>Paketi Yönet</a>
                    <div className="kpnk-info-sep" />
                    <span style={{ fontSize: 13 }}>https://www.ionicadry.com/</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--kpnk-text-secondary)" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    <a href="/dashboard/domain" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', textDecoration: 'none', fontWeight: 500 }}>Domaini Yönet</a>
                    <div className="kpnk-info-sep" />
                    <span style={{ fontSize: 13 }}>İş e-postası bağlı</span>
                    <a href="/dashboard/ayarlar" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', textDecoration: 'none', fontWeight: 500 }}>Yönet</a>
                    <div className="kpnk-info-sep" />
                    <a href="/dashboard/profil" style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4"/></svg>
                        İşletme Bilgilerini Düzenle
                    </a>
                </div>

                {/* Analytics Section */}
                <div className="kpnk-section-head">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <h2 className="kpnk-section-title">Analizler</h2>
                        <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)', background: 'var(--kpnk-bg-secondary)', padding: '3px 10px', borderRadius: 12 }}>Şu an ziyaretçi yok</span>
                    </div>
                    <a href="/dashboard/raporlar" className="kpnk-section-link">
                        Tüm Raporları Göster
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                    <a href="#" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', fontWeight: 500, textDecoration: 'none' }}>Son 30 gün ▾</a>
                    <span style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)' }}>için önemli istatistikleriniz</span>
                    <div style={{ marginLeft: 'auto' }}>
                        <a href="#" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            İstatistik Ekle
                        </a>
                    </div>
                </div>

                {/* KPI Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
                    <KPICard title="Site oturumları" value="46" change={{ dir: 'down', pct: '2%' }} sub="0 bugün" sparkData={[20,35,28,42,38,30,46]} />
                    <KPICard title="Toplam satış" value="₺0,00" sub="" sparkData={[0,0,0,0,0,0,0]} />
                    <KPICard title="Toplam sipariş" value="0" sub="" sparkData={[0,0,0,0,0,0,0]} />
                    <KPICard title="Form gönderimleri" value="2" sub="0 bugün" sparkData={[0,0,1,0,0,1,0]} />
                </div>

                {/* Refresh */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>
                    Birkaç dakika önce güncellendi
                    <a href="#" style={{ color: 'var(--kpnk-text-link)', fontWeight: 500, textDecoration: 'none' }}>Yenile</a>
                </div>

                {/* Goal Recommendations */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div>
                            <span style={{ fontSize: 15, fontWeight: 700 }}>Önerilerimizi Uygulayın ve </span>
                            <a href="#" style={{ fontSize: 15, fontWeight: 700, color: 'var(--kpnk-text-link)', textDecoration: 'underline' }}>Aylık 250 Site Ziyaretçisine Ulaşın</a>
                        </div>
                        <div className="kpnk-progress-wrap" style={{ width: 200 }}>
                            <span className="kpnk-progress-label">41/250 ziyaretçi</span>
                            <div className="kpnk-progress-bar"><div className="kpnk-progress-fill" style={{ width: '16.4%' }} /></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>Site Trafiğini Artırma Yolları</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kpnk-text-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', marginBottom: 12 }}>Öneriler ilerlemenize ve site hareketlerine göre güncellenir.</p>

                    {suggestions.map(s => (
                        <div key={s.id} className="kpnk-sug-row">
                            <div className="kpnk-sug-dot" />
                            <span className="kpnk-sug-text">{s.text}</span>
                            <button className="kpnk-sug-btn">{s.btn}</button>
                            <button className="kpnk-sug-close" onClick={() => setDismissed(d => [...d, s.id])}>✕</button>
                        </div>
                    ))}
                </div>

                {/* Activity Feed */}
                <div style={{ marginBottom: 32 }}>
                    <div className="kpnk-section-head">
                        <div>
                            <h2 className="kpnk-section-title">Hareket Akışı</h2>
                            <p style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', marginTop: 2 }}>En son güncellemeleriniz.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>Sırala:</span>
                            <div className="kpnk-tabs">
                                <button className={`kpnk-tab${sortBy === 'priority' ? ' active' : ''}`} onClick={() => setSortBy('priority')}>Öncelik</button>
                                <button className={`kpnk-tab${sortBy === 'date' ? ' active' : ''}`} onClick={() => setSortBy('date')}>Tarih</button>
                            </div>
                        </div>
                    </div>

                    {/* Performance Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0 14px' }}>
                        <div style={{ flex: 1, height: 1, background: 'var(--kpnk-border)' }} />
                        <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>Performans Güncellemeleri</span>
                        <div style={{ flex: 1, height: 1, background: 'var(--kpnk-border)' }} />
                    </div>

                    {/* Google Search Card */}
                    <div className="kpnk-card" style={{ padding: 20, marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>G</div>
                                <span style={{ fontSize: 14, fontWeight: 700 }}>Google&apos;da Arama Performansı</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kpnk-text-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                            </div>
                            <a href="/dashboard/sitem/editor" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', fontWeight: 500, textDecoration: 'none' }}>Site SEO&apos;sunu Yönet</a>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <div className="kpnk-tabs">
                                <button className={`kpnk-tab${activeQueryTab === 'queries' ? ' active' : ''}`} onClick={() => setActiveQueryTab('queries')}>Başlıca Sorgular</button>
                                <button className={`kpnk-tab${activeQueryTab === 'pages' ? ' active' : ''}`} onClick={() => setActiveQueryTab('pages')}>Başlıca Sayfalar</button>
                            </div>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', marginBottom: 14 }}>Google&apos;da en çok aranan sorgularınız.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {[
                                { q: 'ionica su arıtma', imp: 186, clicks: 1, pos: null },
                                { q: 'ionica', imp: 161, clicks: 1, pos: '10,4' },
                                { q: 'ionica su arıtma filtreleri fiyatları', imp: 20, clicks: 1, pos: '4,7' },
                            ].map((row, i) => (
                                <div key={i} className="kpnk-card" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 16 }}>
                                    <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>&quot;{row.q}&quot;</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 70 }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kpnk-text-secondary)" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                        <span style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>{row.imp}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 50 }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kpnk-text-secondary)" strokeWidth="1.5"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                                        <span style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>{row.clicks}</span>
                                    </div>
                                    {row.pos && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 50 }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kpnk-text-secondary)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><polyline points="8 12 12 16 16 12"/></svg>
                                            <span style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>{row.pos}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                            <a href="/dashboard/raporlar" style={{ fontSize: 13, color: 'var(--kpnk-text-link)', fontWeight: 500, textDecoration: 'none' }}>Tam Raporu Görüntüle</a>
                            <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)' }}>Feb 12 - Mar 12 istatistikleri (29 gün)</span>
                        </div>
                    </div>

                    {/* General Updates */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0 14px' }}>
                        <div style={{ flex: 1, height: 1, background: 'var(--kpnk-border)' }} />
                        <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>Genel Güncellemeler</span>
                        <div style={{ flex: 1, height: 1, background: 'var(--kpnk-border)' }} />
                    </div>

                    <div>
                        {[
                            { icon: '📋', text: <><strong>info@ionicadry.com</strong>, Contact formunu doldurdu.</>, action: 'Gönderimi Görüntüle', time: '11 gün önce', hasNotif: true },
                            { icon: '👤', text: <><strong>kaancoban73@gmail.com</strong> e-posta listenize abone oldu.</>, action: 'Aboneyi Görüntüle', time: '15 gün önce', hasNotif: true },
                            { icon: '📋', text: <><strong>kaancoban73@gmail.com</strong>, İndirim formunu doldurdu.</>, action: 'Gönderimi Görüntüle', time: '15 gün önce', hasNotif: false },
                            { icon: '👤', text: <><strong>kaancoban73@gmail.com</strong> sitenize üye oldu.</>, action: 'Üyeyi Görüntüle', time: '15 gün önce', hasNotif: false },
                        ].map((item, i) => (
                            <div key={i} className="kpnk-feed-item">
                                <div className="kpnk-feed-icon">
                                    {item.icon}
                                    {item.hasNotif && <div className="kpnk-feed-dot" />}
                                </div>
                                <div className="kpnk-feed-body">
                                    <div className="kpnk-feed-text">{item.text}</div>
                                    <div className="kpnk-feed-time">{item.time}</div>
                                </div>
                                <a href="#" className="kpnk-feed-action">{item.action}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <RightPanel />
        </>
    )
}

/* ═══════ KPI Card ═══════ */
function KPICard({ title, value, change, sub, sparkData }: {
    title: string; value: string; change?: { dir: 'up' | 'down'; pct: string }; sub: string; sparkData: number[]
}) {
    const max = Math.max(...sparkData, 1)
    const points = sparkData.map((v, i) => `${(i / (sparkData.length - 1)) * 100},${100 - (v / max) * 80}`).join(' ')

    return (
        <div className="kpnk-card kpnk-kpi">
            <div className="kpnk-kpi-title">{title}</div>
            <div className="kpnk-kpi-row">
                <span className="kpnk-kpi-value">{value}</span>
                {change && (
                    <span className={`kpnk-kpi-change ${change.dir}`}>
                        {change.dir === 'up' ? '↑' : '↓'} {change.pct}
                    </span>
                )}
            </div>
            <svg width="100%" height="28" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ marginTop: 4 }}>
                <polyline points={points} fill="none" stroke="var(--kpnk-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            </svg>
            {sub && <div className="kpnk-kpi-sub">{sub}</div>}
        </div>
    )
}
