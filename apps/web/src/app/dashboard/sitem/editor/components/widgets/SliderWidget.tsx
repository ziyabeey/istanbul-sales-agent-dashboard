'use client'

import { useState, useEffect } from 'react'

interface SliderWidgetProps {
    label: string
    value: string // e.g. "16px" or "50%"
    onChange: (val: string) => void
    min?: number
    max?: number
    step?: number
    unit?: string
}

export default function SliderWidget({ label, value, onChange, min = 0, max = 100, step = 1, unit = 'px' }: SliderWidgetProps) {
    // Parse numeric value
    const numericValue = value ? parseFloat(value) : 0
    const [localValue, setLocalValue] = useState(numericValue.toString())

    useEffect(() => {
        setLocalValue((value ? parseFloat(value) : 0).toString())
    }, [value])

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
        onChange(`${e.target.value}${unit}`)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
    }

    const handleBlur = () => {
        let parsed = parseFloat(localValue)
        if (isNaN(parsed)) parsed = 0
        if (parsed < min) parsed = min
        if (parsed > max) parsed = max
        
        const finalVal = parsed.toString()
        setLocalValue(finalVal)
        onChange(`${finalVal}${unit}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleBlur()
        }
    }

    return (
        <div className="ke-widget-slider">
            <style>{`
                .ke-widget-slider { margin-bottom: 12px; }
                .ke-widget-label { display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 6px; user-select: none; }
                .ke-slider-controls { display: flex; align-items: center; gap: 10px; }
                .ke-slider-input { flex: 1; accent-color: #3b82f6; cursor: pointer; height: 4px; border-radius: 2px; }
                .ke-number-input-wrap { position: relative; width: 48px; }
                .ke-number-input { width: 100%; padding: 4px 6px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; font-family: ui-monospace, monospace; text-align: center; background: #f8fafc; color: #1e293b; outline: none; transition: 0.15s; }
                .ke-number-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.12); }
                .ke-number-unit { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #94a3b8; pointer-events: none; }
            `}</style>
            <div className="ke-widget-label">
                <span>{label}</span>
            </div>
            <div className="ke-slider-controls">
                <input 
                    type="range" 
                    className="ke-slider-input" 
                    min={min} 
                    max={max} 
                    step={step} 
                    value={localValue} 
                    onChange={handleSliderChange}
                />
                <div className="ke-number-input-wrap">
                    <input 
                        type="text" 
                        className="ke-number-input" 
                        value={localValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    )
}
