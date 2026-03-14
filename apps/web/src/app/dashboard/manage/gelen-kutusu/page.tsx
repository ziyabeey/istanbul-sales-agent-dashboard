'use client'

export default function GelenKutusuPage() {
    const messages = [
        { from: 'info@ionicadry.com', subject: 'Contact formu', time: '11 gün önce', preview: 'Merhaba, su arıtma cihazı fiyatları hakkında bilgi almak istiyorum...', unread: true, channel: 'Form' },
        { from: 'kaancoban73@gmail.com', subject: 'İndirim formu', time: '15 gün önce', preview: 'İndirim kodunuzu almak istiyorum. Lütfen bana bilgi verin.', unread: true, channel: 'Form' },
        { from: 'ahmet@email.com', subject: 'Sipariş sorgulama', time: '18 gün önce', preview: 'Siparişim ne zaman kargoya verilecek?', unread: false, channel: 'E-posta' },
        { from: 'zeynep@gmail.com', subject: 'Montaj randevusu', time: '20 gün önce', preview: 'Montaj için müsait saatlerinizi öğrenebilir miyim?', unread: false, channel: 'WhatsApp' },
    ]

    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Gelen Kutusu</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 20 }}>Tüm kanallardan gelen mesajlarınız tek yerde.</p>

            {/* Channel Tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {['Tümü (4)', 'Formlar (2)', 'E-posta (1)', 'WhatsApp (1)'].map((t, i) => (
                    <button key={i} className={`kpnk-tab${i === 0 ? ' active' : ''}`}>{t}</button>
                ))}
            </div>

            {/* Messages */}
            {messages.map((msg, i) => (
                <div key={i} className="kpnk-card" style={{ padding: 16, marginBottom: 6, cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start', background: msg.unread ? '#FAFCFF' : '#fff' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: msg.unread ? 'var(--kpnk-primary)' : 'var(--kpnk-bg-secondary)', color: msg.unread ? '#fff' : 'var(--kpnk-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                        {msg.channel === 'Form' ? '📋' : msg.channel === 'WhatsApp' ? '💬' : '✉️'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontWeight: msg.unread ? 800 : 600, fontSize: 13 }}>{msg.from}</span>
                            {msg.unread && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--kpnk-primary)' }} />}
                            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--kpnk-text-secondary)' }}>{msg.time}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: msg.unread ? 700 : 500, marginBottom: 2 }}>{msg.subject}</div>
                        <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.preview}</div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: 'var(--kpnk-bg-secondary)', color: 'var(--kpnk-text-secondary)', whiteSpace: 'nowrap' }}>{msg.channel}</span>
                </div>
            ))}
        </div>
    )
}
