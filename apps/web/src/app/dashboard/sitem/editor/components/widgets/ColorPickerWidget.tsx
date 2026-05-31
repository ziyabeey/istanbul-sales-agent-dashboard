'use client'

import { useState, useEffect } from 'react'

interface ColorPickerWidgetProps {
    label: string
    value: string
    onChange: (val: string) => void
    placeholder?: string
}

export default function ColorPickerWidget({ label, value, onChange, placeholder }: ColorPickerWidgetProps) {
    const [localValue, setLocalValue] = useState(value)

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    const handleBlur = () => {
        if (localValue !== value) {
            onChange(localValue)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onChange(localValue)
        }
    }

    // Attempt to extract a valid hex color for the preview box.
    // If it's a variable or invalid, it will just fallback to transparent.
    const isHex = localValue.startsWith('#') || localValue.startsWith('rgb')
    const previewStyle = isHex ? { background: localValue } : (localValue.startsWith('var(') ? { background: localValue } : { background: 'transparent' })

    return (
        <div className="ke-widget-color">
            <style>{`
                .ke-widget-color { margin-bottom: 12px; }
                .ke-widget-label { display: block; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 5px; user-select: none; }
                .ke-color-input-wrapper { display: flex; align-items: center; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc; padding: 4px; transition: border-color 0.15s; }
                .ke-color-input-wrapper:focus-within { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.12); }
                .ke-color-preview { width: 24px; height: 24px; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1); flex-shrink: 0; }
                .ke-color-input { flex: 1; border: none; background: transparent; padding: 4px 8px; font-size: 13px; color: #1e293b; outline: none; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            `}</style>
            <label className="ke-widget-label">{label}</label>
            <div className="ke-color-input-wrapper">
                <div className="ke-color-preview" style={previewStyle} />
                <input 
                    type="text" 
                    className="ke-color-input" 
                    value={localValue} 
                    onChange={e => setLocalValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || '#000000'}
                />
            </div>
        </div>
    )
}
