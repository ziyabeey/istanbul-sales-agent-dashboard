'use client'

export default function TerkSepetlerPage() {
    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Terk Edilmiş Sepetler</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 24 }}>Satın alma tamamlamadan ayrılan müşterilerinizi kurtarın.</p>

            {/* Automation Toggle */}
            <div className="kpnk-card" style={{ padding: 18, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Sepet kurtarma e-posta otomasyonu <span style={{ fontSize: 11, color: 'var(--kpnk-text-secondary)', fontWeight: 400 }}>(0 aktif)</span></div>
                    <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>Ödeme adımı terk edildi → E-posta gönder (+1 eylem)</div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: 44, height: 24 }}>
                    <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: 'absolute', cursor: 'pointer', inset: 0, background: '#ccc', borderRadius: 24, transition: '0.2s' }}><span style={{ position: 'absolute', left: 3, bottom: 3, width: 18, height: 18, background: '#fff', borderRadius: '50%', transition: '0.2s' }} /></span>
                </label>
            </div>

            {/* Table */}
            <div className="kpnk-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ borderBottom: '1px solid var(--kpnk-border)', background: 'var(--kpnk-bg-secondary)' }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Tarih</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Müşteri</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>E-posta Otomasyonu</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Kurtarma</th>
                        <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Öğe Sayısı</th>
                    </tr></thead>
                    <tbody>
                        {[
                            { date: '13 Mar', customer: 'test@gmail.com', email: 'Gönderilmedi', recovery: 'Kurtarılmadı', items: 3 },
                            { date: '11 Mar', customer: 'user@hotmail.com', email: 'Gönderildi', recovery: 'Kurtarıldı', items: 1 },
                            { date: '9 Mar', customer: 'demo@outlook.com', email: 'Gönderildi', recovery: 'Kurtarılmadı', items: 2 },
                        ].map((r, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--kpnk-border-light)' }}>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)' }}>{r.date}</td>
                                <td style={{ padding: '12px 14px' }}>{r.customer}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: r.email === 'Gönderildi' ? '#E8F8EF' : '#F5F5F5', color: r.email === 'Gönderildi' ? '#1A7F37' : '#868686' }}>{r.email}</span>
                                </td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: r.recovery === 'Kurtarıldı' ? '#E8F8EF' : '#FDECEC', color: r.recovery === 'Kurtarıldı' ? '#1A7F37' : '#CF222E' }}>{r.recovery}</span>
                                </td>
                                <td style={{ padding: '12px 14px', textAlign: 'right' }}>{r.items}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
