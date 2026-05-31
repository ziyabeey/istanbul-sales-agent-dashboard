'use client'

import { useState } from 'react';

export default function AiTemsilcilerPage() {
    const [loadingMarketing, setLoadingMarketing] = useState(false);
    const [marketingResult, setMarketingResult] = useState<string | null>(null);

    const runMarketingAgent = async () => {
        setLoadingMarketing(true);
        setMarketingResult(null);
        try {
            const res = await fetch('/api/agent/marketing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessName: 'Yeni Müşteri', sector: 'Genel' })
            });
            const data = await res.json();
            if (data.success) {
                setMarketingResult(data.result);
            } else {
                setMarketingResult('Hata: ' + data.error);
            }
        } catch (e: any) {
            setMarketingResult('Bir hata oluştu: ' + e.message);
        } finally {
            setLoadingMarketing(false);
        }
    };

    return (
        <div className="kpnk-main">
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>AI Temsilciler</h1>
            <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', marginBottom: 28 }}>Yapay zeka destekli temsilcileriniz ile işlerinizi otomatikleştirin.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {/* Kepenk AI - Marketing Agent */}
                <div className="kpnk-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #F5A623, #D35400)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🤖</div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 800 }}>Kepenk AI</div>
                            <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>Pazarlama Temsilcisi</div>
                        </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', lineHeight: 1.6 }}>
                        Kişiselleştirilmiş pazarlama planı oluşturan AI agent. Blog yazıları, SEO optimizasyonu, sosyal medya paylaşımları, e-posta kampanyaları ve ücretli reklamlar sunar.
                    </p>
                    <ul style={{ fontSize: 12, color: 'var(--kpnk-text)', lineHeight: 2, paddingLeft: 18 }}>
                        <li>📝 Blog yazıları ve SEO optimizasyonları</li>
                        <li>📱 Sosyal medya paylaşımları</li>
                        <li>✉️ E-posta kampanyaları</li>
                        <li>🎯 Ücretli reklamlar</li>
                    </ul>
                    
                    {marketingResult && (
                        <div style={{ marginTop: 12, padding: 16, background: '#111', borderRadius: 8, border: '1px solid #333' }}>
                            <div style={{ fontSize: 11, color: '#F5A623', marginBottom: 8, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Üretilen İçerik</div>
                            <div style={{ fontSize: 13, color: '#e5e5e5', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                {marketingResult}
                            </div>
                        </div>
                    )}

                    <button 
                        onClick={runMarketingAgent}
                        disabled={loadingMarketing}
                        style={{ 
                            fontSize: 13, fontWeight: 700, color: '#fff', 
                            background: loadingMarketing ? '#333' : 'linear-gradient(135deg, #F5A623, #D35400)', 
                            border: 'none', padding: '10px 24px', borderRadius: 'var(--kpnk-pill-radius)', 
                            cursor: loadingMarketing ? 'not-allowed' : 'pointer', fontFamily: 'var(--kpnk-font)', alignSelf: 'flex-start',
                            opacity: loadingMarketing ? 0.7 : 1
                        }}
                    >
                        {loadingMarketing ? 'Üretiliyor...' : 'Metin Oluştur →'}
                    </button>
                </div>

                {/* Omni - Task Runner */}
                <div className="kpnk-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 12, right: 12 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 10, background: '#FFF8E6', color: '#9A6700' }}>BETA</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #DC4620, #FF6B45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⚡</div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 800 }}>Omni</div>
                            <div style={{ fontSize: 12, color: 'var(--kpnk-text-secondary)' }}>Görev Yürütücü</div>
                        </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--kpnk-text-secondary)', lineHeight: 1.6 }}>
                        Operasyonel AI agent. Stok yönetimi, müşteri etkileşimi, analiz raporları ve otomatik görev yürütme kapasitesine sahip.
                    </p>
                    {/* Task Flow Visualization */}
                    <div style={{ background: 'var(--kpnk-bg-secondary)', borderRadius: 8, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { text: 'Stoku azalmış öğeleri tedarik et...', status: '✅' },
                            { text: 'Aktif olmayan müşterilerle etkileş...', status: '✅' },
                            { text: 'Kupon oluşturuluyor...', status: '⏳' },
                            { text: 'E-posta taslağı oluşturuluyor...', status: '🔄' },
                            { text: 'Müşterilere iletiliyor...', status: '⬜' },
                        ].map((step, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--kpnk-text-secondary)' }}>
                                <span>{step.status}</span>
                                <span>{step.text}</span>
                            </div>
                        ))}
                    </div>
                    <button style={{ fontSize: 13, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #DC4620, #FF6B45)', border: 'none', padding: '10px 24px', borderRadius: 'var(--kpnk-pill-radius)', cursor: 'not-allowed', fontFamily: 'var(--kpnk-font)', alignSelf: 'flex-start', opacity: 0.6 }}>Yakında</button>
                </div>
            </div>
        </div>
    )
}

