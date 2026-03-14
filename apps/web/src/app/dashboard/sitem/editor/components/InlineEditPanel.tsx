'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useEditorStore } from '../store/editor-store'

/**
 * InlineEditPanel — Floating text editor that appears when clicking on
 * text elements in the iframe preview. Positioned near the clicked element.
 */
export default function InlineEditPanel() {
    const inlineEdit = useEditorStore(s => s.inlineEdit)
    const closeInlineEdit = useEditorStore(s => s.closeInlineEdit)
    const applyInlineEdit = useEditorStore(s => s.applyInlineEdit)
    const [text, setText] = useState('')
    const [isDirty, setIsDirty] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)

    /* Sync text when inlineEdit changes */
    useEffect(() => {
        if (inlineEdit) {
            setText(inlineEdit.text)
            setIsDirty(false)
            // Focus with slight delay for animation
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [inlineEdit])

    /* Keep panel within viewport */
    useEffect(() => {
        if (!panelRef.current || !inlineEdit) return
        const rect = panelRef.current.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight
        if (rect.right > vw - 10) {
            panelRef.current.style.left = `${Math.max(10, vw - rect.width - 10)}px`
        }
        if (rect.bottom > vh - 10) {
            panelRef.current.style.top = `${Math.max(10, inlineEdit.y - rect.height - 10)}px`
        }
    }, [inlineEdit])

    /* Keyboard shortcuts */
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeInlineEdit()
        }
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            applyInlineEdit(text)
        }
    }, [text, closeInlineEdit, applyInlineEdit])

    const handleApply = useCallback(() => {
        applyInlineEdit(text)
    }, [text, applyInlineEdit])

    if (!inlineEdit) return null

    const isHeading = ['h1', 'h2', 'h3', 'h4'].includes(inlineEdit.tagName)
    const fieldLabel = getFieldLabel(inlineEdit.field, inlineEdit.tagName)

    return (
        <>
            <style>{`
                .ke-ie-overlay {
                    position: fixed; inset: 0; z-index: 9998;
                }
                .ke-ie-panel {
                    position: fixed; z-index: 9999;
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    box-shadow: 0 16px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.06);
                    min-width: 280px;
                    max-width: 420px;
                    animation: keIeIn 0.15s ease-out;
                    font-family: 'Inter', system-ui, sans-serif;
                    overflow: hidden;
                }
                @keyframes keIeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

                .ke-ie-header {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 10px 14px;
                    background: #f8fafc; border-bottom: 1px solid #e8ecf1;
                }
                .ke-ie-tag {
                    display: flex; align-items: center; gap: 6px;
                    font-size: 11px; font-weight: 700; color: #64748b;
                }
                .ke-ie-tag-badge {
                    background: #e0e7ff; color: #4338ca;
                    font-size: 10px; font-weight: 800;
                    padding: 2px 7px; border-radius: 4px;
                    text-transform: uppercase; letter-spacing: 0.03em;
                }
                .ke-ie-field-badge {
                    background: #f0fdf4; color: #16a34a;
                    font-size: 10px; font-weight: 700;
                    padding: 2px 7px; border-radius: 4px;
                }
                .ke-ie-close {
                    width: 24px; height: 24px; border: none; background: transparent;
                    cursor: pointer; border-radius: 6px; display: flex;
                    align-items: center; justify-content: center; color: #94a3b8;
                    transition: 0.1s; font-size: 16px;
                }
                .ke-ie-close:hover { background: #f1f5f9; color: #334155; }

                .ke-ie-body { padding: 12px 14px; }
                .ke-ie-textarea {
                    width: 100%; border: 1px solid #e2e8f0; border-radius: 10px;
                    padding: 10px 12px; font-size: 13px; line-height: 1.6;
                    resize: vertical; min-height: 60px; max-height: 200px;
                    font-family: inherit; outline: none; background: #fafbfc;
                    box-sizing: border-box; transition: 0.15s;
                }
                .ke-ie-textarea:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
                    background: #fff;
                }
                .ke-ie-textarea.heading { font-weight: 700; font-size: 16px; }

                .ke-ie-footer {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 8px 14px 12px;
                }
                .ke-ie-hint { font-size: 10px; color: #94a3b8; }
                .ke-ie-actions { display: flex; gap: 6px; }
                .ke-ie-btn {
                    padding: 6px 14px; border-radius: 8px; font-size: 12px;
                    font-weight: 700; cursor: pointer; border: none;
                    transition: 0.15s; font-family: inherit;
                }
                .ke-ie-btn-cancel { background: #f1f5f9; color: #475569; }
                .ke-ie-btn-cancel:hover { background: #e2e8f0; }
                .ke-ie-btn-apply { background: #2563eb; color: #fff; }
                .ke-ie-btn-apply:hover { background: #1d4ed8; }
                .ke-ie-btn-apply.disabled { opacity: 0.4; pointer-events: none; }

                .ke-ie-charcount {
                    font-size: 10px; color: #94a3b8; text-align: right;
                    padding: 0 14px 6px;
                }
            `}</style>

            <div className="ke-ie-overlay" onClick={closeInlineEdit} />
            <div
                ref={panelRef}
                className="ke-ie-panel"
                style={{
                    left: inlineEdit.x,
                    top: inlineEdit.y,
                    width: Math.min(inlineEdit.width + 40, 420),
                }}
                onClick={e => e.stopPropagation()}
                onKeyDown={handleKeyDown}
            >
                <div className="ke-ie-header">
                    <div className="ke-ie-tag">
                        <span className="ke-ie-tag-badge">{inlineEdit.tagName}</span>
                        {inlineEdit.field && <span className="ke-ie-field-badge">{fieldLabel}</span>}
                    </div>
                    <button className="ke-ie-close" onClick={closeInlineEdit}>×</button>
                </div>

                <div className="ke-ie-body">
                    <textarea
                        ref={inputRef}
                        className={`ke-ie-textarea${isHeading ? ' heading' : ''}`}
                        value={text}
                        onChange={e => { setText(e.target.value); setIsDirty(true) }}
                        rows={isHeading ? 2 : 3}
                        placeholder="İçerik yazın…"
                    />
                </div>

                <div className="ke-ie-charcount">{text.length} karakter</div>

                <div className="ke-ie-footer">
                    <div className="ke-ie-hint">⌘Enter kaydet · Esc iptal</div>
                    <div className="ke-ie-actions">
                        <button className="ke-ie-btn ke-ie-btn-cancel" onClick={closeInlineEdit}>İptal</button>
                        <button
                            className={`ke-ie-btn ke-ie-btn-apply${!isDirty ? ' disabled' : ''}`}
                            onClick={handleApply}
                        >
                            ✓ Uygula
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

function getFieldLabel(field: string, tagName: string): string {
    const labels: Record<string, string> = {
        'hero-baslik': 'Ana Başlık',
        'hero-alt': 'Alt Başlık',
        'isletme-adi': 'İşletme Adı',
        'telefon': 'Telefon',
        'adres': 'Adres',
        'hizmet-0': 'Hizmet 1',
        'hizmet-1': 'Hizmet 2',
        'hizmet-2': 'Hizmet 3',
    }
    return labels[field] || field || tagName
}
