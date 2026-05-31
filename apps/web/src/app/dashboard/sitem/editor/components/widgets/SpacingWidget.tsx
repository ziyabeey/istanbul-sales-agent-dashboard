'use client'

import { useState, useEffect } from 'react'

interface SpacingWidgetProps {
    label: string
    value: string
    onChange: (val: string) => void
}

function parseSpacing(val: string) {
    if (!val) return { t: '0', r: '0', b: '0', l: '0' }
    const parts = val.trim().split(/\s+/)
    if (parts.length === 1) return { t: parts[0], r: parts[0], b: parts[0], l: parts[0] }
    if (parts.length === 2) return { t: parts[0], r: parts[1], b: parts[0], l: parts[1] }
    if (parts.length === 3) return { t: parts[0], r: parts[1], b: parts[2], l: parts[1] }
    return { t: parts[0], r: parts[1], b: parts[2], l: parts[3] }
}

function extractNumber(str: string) {
    return parseFloat(str) || 0
}

export default function SpacingWidget({ label, value, onChange }: SpacingWidgetProps) {
    const [locked, setLocked] = useState(true)
    const [vals, setVals] = useState(() => parseSpacing(value))

    useEffect(() => {
        setVals(parseSpacing(value))
    }, [value])

    const handleInput = (dir: 't' | 'r' | 'b' | 'l', val: string) => {
        const num = val.replace(/[^0-9.-]/g, '')
        const newVal = num ? `${num}px` : '0px'
        
        if (locked) {
            const newVals = { t: newVal, r: newVal, b: newVal, l: newVal }
            setVals(newVals)
            onChange(`${newVals.t} ${newVals.r} ${newVals.b} ${newVals.l}`)
        } else {
            const newVals = { ...vals, [dir]: newVal }
            setVals(newVals)
            onChange(`${newVals.t} ${newVals.r} ${newVals.b} ${newVals.l}`)
        }
    }

    const InputBox = ({ dir, val }: { dir: 't'|'r'|'b'|'l', val: string }) => (
        <input 
            type="text" 
            className="ke-spacing-input" 
            value={extractNumber(val)} 
            onChange={e => {
                const updated = { ...vals, [dir]: e.target.value }
                setVals(updated)
            }}
            onBlur={e => handleInput(dir, e.target.value)}
            onKeyDown={e => {
                if (e.key === 'Enter') handleInput(dir, e.currentTarget.value)
            }}
        />
    )

    return (
        <div className="ke-widget-spacing">
            <style>{`
                .ke-widget-spacing { margin-bottom: 16px; }
                .ke-widget-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                .ke-widget-label { font-size: 11px; font-weight: 700; color: #64748b; user-select: none; }
                .ke-lock-btn { background: transparent; border: none; cursor: pointer; color: #94a3b8; padding: 4px; border-radius: 4px; transition: 0.15s; display: flex; align-items: center; justify-content: center; }
                .ke-lock-btn:hover { background: #f1f5f9; color: #3b82f6; }
                .ke-lock-btn.locked { color: #3b82f6; }
                
                .ke-spacing-grid { 
                    position: relative; 
                    width: 140px; 
                    height: 90px; 
                    margin: 0 auto; 
                    background: #f8fafc; 
                    border: 1px solid #e2e8f0; 
                    border-radius: 8px;
                }
                .ke-spacing-inner {
                    position: absolute;
                    top: 28px; left: 34px; right: 34px; bottom: 28px;
                    background: #fff;
                    border: 1px dashed #cbd5e1;
                    border-radius: 4px;
                }
                .ke-spacing-input {
                    position: absolute;
                    width: 32px;
                    height: 20px;
                    text-align: center;
                    font-size: 11px;
                    font-family: ui-monospace, monospace;
                    border: 1px solid transparent;
                    background: transparent;
                    color: #475569;
                    border-radius: 4px;
                    outline: none;
                    transition: 0.15s;
                }
                .ke-spacing-input:hover { background: #e2e8f0; }
                .ke-spacing-input:focus { background: #fff; border-color: #3b82f6; color: #1e293b; z-index: 10; }
                
                .ke-input-t { top: 4px; left: 50%; transform: translateX(-50%); }
                .ke-input-b { bottom: 4px; left: 50%; transform: translateX(-50%); }
                .ke-input-l { left: 2px; top: 50%; transform: translateY(-50%); }
                .ke-input-r { right: 2px; top: 50%; transform: translateY(-50%); }
            `}</style>
            
            <div className="ke-widget-header">
                <span className="ke-widget-label">{label}</span>
                <button 
                    className={`ke-lock-btn ${locked ? 'locked' : ''}`} 
                    onClick={() => setLocked(!locked)}
                    title={locked ? "Kilidi Aç" : "Değerleri Kilitle"}
                >
                    {locked ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>
                    )}
                </button>
            </div>

            <div className="ke-spacing-grid">
                <div className="ke-spacing-inner" />
                <div className="ke-input-t"><InputBox dir="t" val={vals.t} /></div>
                <div className="ke-input-b"><InputBox dir="b" val={vals.b} /></div>
                <div className="ke-input-l"><InputBox dir="l" val={vals.l} /></div>
                <div className="ke-input-r"><InputBox dir="r" val={vals.r} /></div>
            </div>
        </div>
    )
}
