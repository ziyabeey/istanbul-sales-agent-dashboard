'use client'

import dynamic from 'next/dynamic'

const EditorShell = dynamic(() => import('./components/EditorShell'), {
    ssr: false,
    loading: () => (
        <div style={{
            position: 'fixed', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: '#e8ecf1', zIndex: 9999,
            fontFamily: "'Inter', system-ui, sans-serif"
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px', animation: 'spin 2s linear infinite' }}>⚙️</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#475569' }}>Editör Yükleniyor...</div>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    ),
})

export default function SiteEditorPage() {
    return <EditorShell />
}
