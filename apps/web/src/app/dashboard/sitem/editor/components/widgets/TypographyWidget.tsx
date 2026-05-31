'use client'

import { useState, useEffect } from 'react'

interface TypographyWidgetProps {
    fontFamily: string
    fontWeight: string
    textAlign: string
    fontSize: string
    lineHeight: string
    onChange: (key: string, val: string) => void
}

export default function TypographyWidget({ 
    fontFamily, 
    fontWeight, 
    textAlign, 
    fontSize, 
    lineHeight, 
    onChange 
}: TypographyWidgetProps) {

    const fonts = [
        'Inter', 'Syne', 'Outfit', 'Plus Jakarta Sans', 
        'Manrope', 'Poppins', 'Playfair Display', 'system-ui'
    ]

    const weights = [
        { label: 'R', value: '400', title: 'Regular' },
        { label: 'M', value: '500', title: 'Medium' },
        { label: 'SB', value: '600', title: 'SemiBold' },
        { label: 'B', value: '700', title: 'Bold' }
    ]

    const aligns = [
        { icon: 'M3 6h18M3 12h12M3 18h18', value: 'left', title: 'Sol' },
        { icon: 'M3 6h18M6 12h12M3 18h18', value: 'center', title: 'Orta' },
        { icon: 'M3 6h18M9 12h12M3 18h18', value: 'right', title: 'Sağ' },
        { icon: 'M3 6h18M3 12h18M3 18h18', value: 'justify', title: 'İki Yana Yasla' }
    ]

    // Local states for inputs that need blur behavior
    const [localSize, setLocalSize] = useState(fontSize)
    const [localHeight, setLocalHeight] = useState(lineHeight)

    useEffect(() => setLocalSize(fontSize), [fontSize])
    useEffect(() => setLocalHeight(lineHeight), [lineHeight])

    const handleBlur = (key: string, val: string) => {
        const num = parseFloat(val)
        if (isNaN(num)) {
            onChange(key, '') // clear if invalid
            return
        }
        // e.g., if user types "16", convert to "16px". If they type "1.5", convert to "1.5".
        const hasUnit = /[a-zA-Z%]$/.test(val)
        let finalVal = val
        if (!hasUnit) {
            finalVal = key === 'fontSize' ? `${num}px` : `${num}` // lineHeight usually unitless
        }
        onChange(key, finalVal)
        if (key === 'fontSize') setLocalSize(finalVal)
        if (key === 'lineHeight') setLocalHeight(finalVal)
    }

    const handleKeyDown = (e: React.KeyboardEvent, key: string, val: string) => {
        if (e.key === 'Enter') handleBlur(key, val)
    }

    return (
        <div className="ke-widget-typo">
            <style>{`
                .ke-widget-typo { display: flex; flex-direction: column; gap: 12px; }
                .ke-typo-row { display: flex; gap: 8px; align-items: center; }
                .ke-typo-col { flex: 1; display: flex; flex-direction: column; gap: 5px; }
                .ke-typo-label { font-size: 11px; font-weight: 700; color: #64748b; user-select: none; }
                
                .ke-typo-select { appearance: none; width: 100%; padding: 6px 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; background: #f8fafc url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 8px center; color: #1e293b; outline: none; transition: 0.15s; }
                .ke-typo-select:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.12); }
                
                .ke-typo-toggle-group { display: flex; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; }
                .ke-typo-toggle-btn { flex: 1; background: transparent; border: none; padding: 6px 0; font-size: 11px; font-weight: 600; color: #64748b; cursor: pointer; transition: 0.15s; border-right: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; }
                .ke-typo-toggle-btn:last-child { border-right: none; }
                .ke-typo-toggle-btn:hover { background: #f1f5f9; color: #3b82f6; }
                .ke-typo-toggle-btn.active { background: #e0f2fe; color: #0284c7; }
                
                .ke-typo-input { width: 100%; padding: 6px 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; font-family: ui-monospace, monospace; background: #f8fafc; color: #1e293b; outline: none; transition: 0.15s; }
                .ke-typo-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.12); }
            `}</style>
            
            {/* Font Family */}
            <div className="ke-typo-col">
                <label className="ke-typo-label">Font</label>
                <select 
                    className="ke-typo-select" 
                    value={fontFamily || ''} 
                    onChange={e => onChange('fontFamily', e.target.value)}
                >
                    <option value="">Varsayılan (System)</option>
                    {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
            </div>

            {/* Weight & Align */}
            <div className="ke-typo-row">
                <div className="ke-typo-col" style={{ flex: 1.5 }}>
                    <label className="ke-typo-label">Weight</label>
                    <div className="ke-typo-toggle-group">
                        {weights.map(w => (
                            <button
                                key={w.value}
                                className={`ke-typo-toggle-btn ${fontWeight === w.value ? 'active' : ''}`}
                                title={w.title}
                                onClick={() => onChange('fontWeight', w.value)}
                            >
                                {w.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="ke-typo-col">
                    <label className="ke-typo-label">Align</label>
                    <div className="ke-typo-toggle-group">
                        {aligns.map(a => (
                            <button
                                key={a.value}
                                className={`ke-typo-toggle-btn ${textAlign === a.value ? 'active' : ''}`}
                                title={a.title}
                                onClick={() => onChange('textAlign', a.value)}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d={a.icon} />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Size & Line Height */}
            <div className="ke-typo-row">
                <div className="ke-typo-col">
                    <label className="ke-typo-label">Size</label>
                    <input 
                        type="text" 
                        className="ke-typo-input" 
                        value={localSize || ''} 
                        placeholder="16px"
                        onChange={e => setLocalSize(e.target.value)}
                        onBlur={e => handleBlur('fontSize', e.target.value)}
                        onKeyDown={e => handleKeyDown(e, 'fontSize', e.currentTarget.value)}
                    />
                </div>
                <div className="ke-typo-col">
                    <label className="ke-typo-label">Height</label>
                    <input 
                        type="text" 
                        className="ke-typo-input" 
                        value={localHeight || ''} 
                        placeholder="1.5"
                        onChange={e => setLocalHeight(e.target.value)}
                        onBlur={e => handleBlur('lineHeight', e.target.value)}
                        onKeyDown={e => handleKeyDown(e, 'lineHeight', e.currentTarget.value)}
                    />
                </div>
            </div>
        </div>
    )
}
