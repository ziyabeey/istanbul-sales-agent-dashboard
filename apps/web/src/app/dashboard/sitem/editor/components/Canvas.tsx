'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useEditorStore } from '../store/editor-store'
import { IconMonitor, IconTablet, IconSmartphone } from './Icons'

/**
 * Canvas — Full-page iframe preview of the live demo site.
 * Shows the generated HTML from demoHtmlUret in a responsive iframe.
 * Supports device mode, zoom, and postMessage communication with iframe.
 */
export default function Canvas() {
    const deviceMode = useEditorStore(s => s.deviceMode)
    const zoom = useEditorStore(s => s.zoom)
    const generatedHtml = useEditorStore(s => s.generatedHtml)
    const siteData = useEditorStore(s => s.siteData)
    const openContextMenu = useEditorStore(s => s.openContextMenu)
    const applyInlineEdit = useEditorStore(s => s.applyInlineEdit)
    const closeContextMenu = useEditorStore(s => s.closeContextMenu)
    const openImageEdit = useEditorStore(s => s.openImageEdit)
    const closeImageEdit = useEditorStore(s => s.closeImageEdit)
    const updateSiteData = useEditorStore(s => s.updateSiteData)
    const setActiveLeftPanel = useEditorStore(s => s.setActiveLeftPanel)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)

    const stageWidth = deviceMode === 'desktop' ? 980 : deviceMode === 'tablet' ? 768 : 375

    /* Sync srcdoc when generatedHtml changes */
    useEffect(() => {
        if (iframeRef.current && generatedHtml) {
            iframeRef.current.srcdoc = generatedHtml
        }
    }, [generatedHtml])

    /* Prevent browser context menu on canvas area */
    const handleCanvasContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
    }, [])

    /* Listen for postMessage from iframe */
    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if (!e.data || !e.data.type) return

            const iframe = iframeRef.current
            const stage = stageRef.current
            if (!iframe || !stage) return

            // Calculate offset: iframe position in viewport + zoom factor
            const iframeRect = iframe.getBoundingClientRect()
            const zoomFactor = zoom / 100
            const offsetX = iframeRect.left
            const offsetY = iframeRect.top

            if (e.data.type === 'ke-contextmenu') {
                const x = offsetX + (e.data.x * zoomFactor)
                const y = offsetY + (e.data.y * zoomFactor)
                openContextMenu({
                    x,
                    y,
                    targetType: e.data.targetType,
                    targetTag: e.data.targetTag,
                    targetText: e.data.targetText,
                    targetField: e.data.targetField,
                    elementPath: e.data.elementPath,
                    modulId: e.data.modulId || undefined,
                })
            }

            // True inline edit: text was changed directly in iframe
            if (e.data.type === 'ke-text-changed') {
                const { field, text } = e.data
                if (field && text !== undefined) {
                    applyInlineEdit(text, field)
                }
            }

            // Image clicked in iframe
            if (e.data.type === 'ke-image-click') {
                const x = offsetX + (e.data.x * zoomFactor)
                const y = offsetY + (e.data.y * zoomFactor)
                openImageEdit({
                    src: e.data.src || '',
                    alt: e.data.alt || '',
                    field: e.data.field || 'image',
                    elementPath: e.data.elementPath || '',
                    x: Math.max(80, x),
                    y: Math.max(80, y),
                })
            }

            // Module action from iframe overlay badge
            if (e.data.type === 'ke-modul-action') {
                const { action, modulId } = e.data
                if (action === 'config' && modulId) {
                    // Open left panel with module config
                    setActiveLeftPanel('moduller')
                }
                if (action === 'delete' && modulId) {
                    const currentSiteData = useEditorStore.getState().siteData
                    if (currentSiteData && confirm(`"${modulId}" modülünü silmek istediğinize emin misiniz?`)) {
                        updateSiteData({ moduller: currentSiteData.moduller.filter(m => m !== modulId) })
                    }
                }
            }
        }

        window.addEventListener('message', handler)
        return () => window.removeEventListener('message', handler)
    }, [zoom, openContextMenu, applyInlineEdit, openImageEdit])

    /* Close menus when clicking empty canvas area */
    const handleCanvasClick = useCallback(() => {
        closeContextMenu()
        closeImageEdit()
        // Deselect inside iframe
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({ type: 'ke-deselect' }, '*')
        }
    }, [closeContextMenu, closeImageEdit])

    return (
        <>
            <style>{`
                .ke-canvas {
                    flex: 1;
                    background: #dfe3e8;
                    overflow: auto;
                    display: flex;
                    justify-content: center;
                    position: relative;
                }
                .ke-canvas-scroll {
                    padding: 20px 24px 60px;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
                .ke-stage {
                    background: #fff;
                    border-radius: 2px;
                    box-shadow: 0 2px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04);
                    overflow: hidden;
                    position: relative;
                    transition: width 0.3s ease;
                    flex-shrink: 0;
                }
                .ke-stage iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    display: block;
                }
                .ke-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 24px;
                    text-align: center;
                    min-height: 600px;
                }
                .ke-empty-icon { font-size: 4rem; margin-bottom: 16px; }
                .ke-empty-title { font-size: 20px; font-weight: 800; color: #334155; margin-bottom: 8px; }
                .ke-empty-desc { font-size: 13px; color: #94a3b8; margin-bottom: 24px; line-height: 1.6; max-width: 380px; }
                .ke-empty-hint { font-size: 11px; color: #cbd5e1; }

                /* Device frame indicator */
                .ke-device-frame {
                    position: absolute;
                    top: -1px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #475569;
                    color: #fff;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 3px 12px;
                    border-radius: 0 0 8px 8px;
                    z-index: 2;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    opacity: 0.6;
                    transition: opacity 0.15s;
                }
                .ke-stage:hover .ke-device-frame { opacity: 1; }

                /* Zoom info */
                .ke-zoom-info {
                    position: absolute;
                    bottom: 12px;
                    right: 12px;
                    background: rgba(0,0,0,0.6);
                    color: #fff;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 4px 10px;
                    border-radius: 6px;
                    pointer-events: none;
                    z-index: 5;
                }
            `}</style>

            <div className="ke-canvas" onClick={handleCanvasClick} onContextMenu={handleCanvasContextMenu}>
                <div className="ke-canvas-scroll">
                    <div ref={stageRef} className="ke-stage" style={{
                        width: `${stageWidth}px`,
                        height: 'calc(100vh - 100px)',
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'top center',
                    }}>
                        {/* Device mode label */}
                        <div className="ke-device-frame">
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                {deviceMode === 'desktop' ? <><IconMonitor size={12} /> Masaüstü</> : deviceMode === 'tablet' ? <><IconTablet size={12} /> Tablet</> : <><IconSmartphone size={12} /> Mobil</>}
                            </span>
                            <span style={{ opacity: 0.5, margin: '0 4px' }}>·</span>{stageWidth}px
                        </div>

                        {generatedHtml ? (
                            <iframe
                                ref={iframeRef}
                                title="Site Önizleme"
                                sandbox="allow-same-origin allow-scripts"
                                srcDoc={generatedHtml}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            />
                        ) : (
                            <div className="ke-empty">
                                <div className="ke-empty-icon">🎨</div>
                                <div className="ke-empty-title">Site Önizlemesi</div>
                                <div className="ke-empty-desc">
                                    {siteData
                                        ? 'HTML oluşturuluyor...'
                                        : 'Sektör bilgileriniz yükleniyor. Sol panelden düzenlemeye başlayabilirsiniz.'
                                    }
                                </div>
                                <div className="ke-empty-hint">Editör demo sayfanızı gerçek zamanlı gösterecek</div>
                            </div>
                        )}
                    </div>
                </div>

                {zoom !== 100 && (
                    <div className="ke-zoom-info">{zoom}%</div>
                )}
            </div>
        </>
    )
}
