import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: '#0E0D0B', // ink
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#C04B1E', // rust
                    fontWeight: 800,
                    borderRadius: '20%',
                    fontFamily: 'sans-serif', // fallback
                }}
            >
                K
            </div>
        ),
        {
            ...size,
        }
    )
}
