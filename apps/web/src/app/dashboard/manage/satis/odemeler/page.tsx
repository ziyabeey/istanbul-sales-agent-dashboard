'use client'

export default function OdemelerPage() {
    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Ödemeler ve Mali Durum</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 24 }}>Tüm ödeme işlemlerinizi ve mali durumunuzu takip edin.</p>

            {/* KPI */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
                {[
                    { label: 'Toplam Gelir', value: '₺4.690,00', icon: '💰' },
                    { label: 'Bekleyen Ödeme', value: '₺890,00', icon: '⏳' },
                    { label: 'İade Edildi', value: '₺670,00', icon: '↩️' },
                ].map((k, i) => (
                    <div key={i} className="kpnk-card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ fontSize: 24 }}>{k.icon}</span>
                        <div>
                            <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>{k.label}</div>
                            <div style={{ fontSize: 22, fontWeight: 700 }}>{k.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment History */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Ödeme Geçmişi</h2>
            <div className="kpnk-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr style={{ borderBottom: '1px solid var(--kpnk-border)', background: 'var(--kpnk-bg-secondary)' }}>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Tarih</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Tür</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Müşteri</th>
                        <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Durum</th>
                        <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600 }}>Tutar</th>
                    </tr></thead>
                    <tbody>
                        {[
                            { date: '14 Mar', type: 'Kredi Kartı', customer: 'Ahmet Y.', status: 'Tamamlandı', amount: '₺1.250' },
                            { date: '12 Mar', type: 'Havale/EFT', customer: 'Fatma K.', status: 'Bekliyor', amount: '₺890' },
                            { date: '10 Mar', type: 'Kredi Kartı', customer: 'Mehmet D.', status: 'Tamamlandı', amount: '₺2.100' },
                            { date: '8 Mar', type: 'Kapıda Ödeme', customer: 'Zeynep A.', status: 'Tamamlandı', amount: '₺450' },
                        ].map((p, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--kpnk-border-light)' }}>
                                <td style={{ padding: '12px 14px', color: 'var(--kpnk-text-secondary)' }}>{p.date}</td>
                                <td style={{ padding: '12px 14px' }}>{p.type}</td>
                                <td style={{ padding: '12px 14px' }}>{p.customer}</td>
                                <td style={{ padding: '12px 14px' }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: p.status === 'Tamamlandı' ? '#E8F8EF' : '#FFF8E6', color: p.status === 'Tamamlandı' ? '#1A7F37' : '#9A6700' }}>{p.status}</span>
                                </td>
                                <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600 }}>{p.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
