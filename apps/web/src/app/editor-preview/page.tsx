'use client'

import { useEffect, useState } from 'react'
import { ThemeRenderer } from '@kepenk/templates/src/renderer/ThemeRenderer'
import type { ThemeConfig, BusinessData } from '@kepenk/templates/src/types/section-types'

export default function EditorPreviewPage() {
  const [theme, setTheme] = useState<ThemeConfig | null>(null)
  const [business, setBusiness] = useState<BusinessData | null>(null)

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ke-preview-init' || e.data?.type === 'ke-preview-update') {
        if (e.data.themeConfig) setTheme(e.data.themeConfig)
        if (e.data.businessData) setBusiness(e.data.businessData)
      }
    }
    
    window.addEventListener('message', handleMessage)
    
    // Parent iframe'e (Canvas.tsx) hazır olduğumuzu bildiriyoruz
    window.parent.postMessage({ type: 'ke-preview-ready' }, '*')
    
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!theme || !business) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc', color: '#64748b', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px', animation: 'spin 2s linear infinite' }}>⚙️</div>
          <div>AST Bekleniyor...</div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  return <ThemeRenderer theme={theme} business={business} isEditMode={true} />
}
