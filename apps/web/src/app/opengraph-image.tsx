import { ImageResponse } from 'next/og'

export const alt = 'Kepenk.ai — İşletme otomasyonu ve randevu yönetimi'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0B0B0B',
          color: '#FFFFFF',
          padding: '72px 76px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 24,
              background: '#FF5A1F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: '-2px' }}>
            Kepenk.ai
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              maxWidth: 980,
              fontSize: 62,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-2px',
            }}
          >
            İşletmen açıkken de, kapalıyken de randevular çalışsın.
          </div>
          <div style={{ fontSize: 28, color: '#CFCFCF' }}>
            Randevu • Müşteri yönetimi • İşletme otomasyonu
          </div>
        </div>
      </div>
    ),
    size
  )
}
