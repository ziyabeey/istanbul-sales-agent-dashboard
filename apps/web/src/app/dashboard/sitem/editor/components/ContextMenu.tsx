'use client'

import { useEffect, useRef } from 'react'
import { useEditorStore } from '../store/editor-store'
import { IconEdit, IconCopy, IconAI, IconGlobe, IconPalette, IconEye, IconEyeOff, IconCode, IconType, IconTrash } from './Icons'

/**
 * ContextMenu — Custom right-click menu for the editor.
 * Polished with SVG icons, keyboard shortcuts, and smooth animation.
 */
export default function ContextMenu() {
    const contextMenu = useEditorStore(s => s.contextMenu)
    const closeContextMenu = useEditorStore(s => s.closeContextMenu)
    const openInlineEdit = useEditorStore(s => s.openInlineEdit)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!contextMenu) return
        const handleClick = () => closeContextMenu()
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeContextMenu() }
        window.addEventListener('click', handleClick)
        window.addEventListener('keydown', handleKey)
        return () => {
            window.removeEventListener('click', handleClick)
            window.removeEventListener('keydown', handleKey)
        }
    }, [contextMenu, closeContextMenu])

    useEffect(() => {
        if (!menuRef.current || !contextMenu) return
        const rect = menuRef.current.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight
        if (rect.right > vw) menuRef.current.style.left = `${contextMenu.x - rect.width}px`
        if (rect.bottom > vh) menuRef.current.style.top = `${contextMenu.y - rect.height}px`
    }, [contextMenu])

    if (!contextMenu) return null

    const isText = contextMenu.targetType === 'text'
    const hasField = contextMenu.targetField !== ''

    const handleEdit = () => {
        if (hasField) {
            openInlineEdit({
                x: contextMenu.x, y: contextMenu.y, width: 320,
                field: contextMenu.targetField, text: contextMenu.targetText,
                tagName: contextMenu.targetTag, elementPath: contextMenu.elementPath,
            })
        }
        closeContextMenu()
    }

    const handleCopy = () => {
        if (contextMenu.targetText) navigator.clipboard.writeText(contextMenu.targetText).catch(() => {})
        closeContextMenu()
    }

    return (
        <>
            <style>{`
                .ke-ctx-overlay { position:fixed;inset:0;z-index:9999; }
                .ke-ctx-menu {
                    position:fixed;z-index:10000;
                    background:#fff;border:1px solid #e2e8f0;
                    border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,0.15),0 2px 8px rgba(0,0,0,0.06);
                    min-width:220px;padding:4px;
                    animation:keCtxIn 0.12s ease-out;
                    font-family:'Inter',system-ui,sans-serif;
                }
                @keyframes keCtxIn { from{opacity:0;transform:scale(0.96) translateY(-3px)} to{opacity:1;transform:none} }
                .ke-ctx-item {
                    display:flex;align-items:center;gap:10px;
                    padding:8px 12px;border-radius:8px;
                    font-size:13px;font-weight:500;color:#334155;
                    cursor:pointer;transition:all 0.1s;border:none;
                    background:transparent;width:100%;text-align:left;
                    font-family:inherit;
                }
                .ke-ctx-item:hover { background:#f1f5f9;color:#0f172a; }
                .ke-ctx-item.primary { color:#2563eb; }
                .ke-ctx-item.primary:hover { background:#eff6ff; }
                .ke-ctx-item.destructive:hover { background:#fef2f2;color:#ef4444; }
                .ke-ctx-icon { width:18px;height:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;opacity:0.7; }
                .ke-ctx-item:hover .ke-ctx-icon { opacity:1; }
                .ke-ctx-label { flex:1; }
                .ke-ctx-shortcut { font-size:11px;color:#94a3b8;font-weight:600;font-family:'SF Mono',monospace; }
                .ke-ctx-sep { height:1px;background:#f1f5f9;margin:3px 8px; }
                .ke-ctx-header {
                    padding:6px 12px 4px;font-size:10px;font-weight:700;
                    color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;
                    display:flex;align-items:center;gap:6px;
                }
                .ke-ctx-header-badge {
                    background:#f1f5f9;padding:1px 6px;border-radius:4px;
                    font-size:10px;font-weight:800;color:#64748b;
                }
            `}</style>

            <div className="ke-ctx-overlay" onClick={closeContextMenu} onContextMenu={e => { e.preventDefault(); closeContextMenu() }}>
                <div
                    ref={menuRef}
                    className="ke-ctx-menu"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Target info */}
                    <div className="ke-ctx-header">
                        <span className="ke-ctx-header-badge">{contextMenu.targetTag.toUpperCase()}</span>
                        {contextMenu.targetText && (
                            <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                                {contextMenu.targetText.slice(0, 30)}{contextMenu.targetText.length > 30 ? '…' : ''}
                            </span>
                        )}
                    </div>

                    {/* Edit */}
                    {hasField && (
                        <button className="ke-ctx-item primary" onClick={handleEdit}>
                            <span className="ke-ctx-icon"><IconEdit size={15} /></span>
                            <span className="ke-ctx-label">Düzenle</span>
                            <span className="ke-ctx-shortcut">Tıkla</span>
                        </button>
                    )}

                    {/* Copy text */}
                    {isText && contextMenu.targetText && (
                        <button className="ke-ctx-item" onClick={handleCopy}>
                            <span className="ke-ctx-icon"><IconCopy size={15} /></span>
                            <span className="ke-ctx-label">Metni Kopyala</span>
                            <span className="ke-ctx-shortcut">⌘C</span>
                        </button>
                    )}

                    <div className="ke-ctx-sep" />

                    {/* AI actions */}
                    {isText && (
                        <>
                            <button className="ke-ctx-item" onClick={() => closeContextMenu()}>
                                <span className="ke-ctx-icon"><IconAI size={15} /></span>
                                <span className="ke-ctx-label">AI ile Yeniden Yaz</span>
                            </button>
                            <button className="ke-ctx-item" onClick={() => closeContextMenu()}>
                                <span className="ke-ctx-icon"><IconGlobe size={15} /></span>
                                <span className="ke-ctx-label">İngilizce&apos;ye Çevir</span>
                            </button>
                        </>
                    )}

                    <div className="ke-ctx-sep" />

                    {/* Style shortcuts */}
                    <button className="ke-ctx-item" onClick={() => closeContextMenu()}>
                        <span className="ke-ctx-icon"><IconPalette size={15} /></span>
                        <span className="ke-ctx-label">Tasarımı Düzenle</span>
                    </button>
                    <button className="ke-ctx-item" onClick={() => closeContextMenu()}>
                        <span className="ke-ctx-icon"><IconEye size={15} /></span>
                        <span className="ke-ctx-label">Gizle / Göster</span>
                    </button>

                    <div className="ke-ctx-sep" />

                    {/* Inspect */}
                    <button className="ke-ctx-item" onClick={() => { console.log('Element:', contextMenu.elementPath); closeContextMenu() }}>
                        <span className="ke-ctx-icon"><IconCode size={15} /></span>
                        <span className="ke-ctx-label">Elementi İncele</span>
                        <span className="ke-ctx-shortcut">Dev</span>
                    </button>
                </div>
            </div>
        </>
    )
}
