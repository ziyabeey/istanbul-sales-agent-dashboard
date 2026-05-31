'use client'

import { useState } from 'react'
import { useEditorStore } from '../../store/editor-store'
import type { BlockNode } from '@kepenk/templates/src/types/ast-types'

function LayerNode({ 
    node, 
    level = 0,
    selectedId,
    hoveredId,
    onSelect,
    onHover,
    onDelete,
    onDuplicate
}: { 
    node: BlockNode
    level?: number
    selectedId: string | null
    hoveredId: string | null
    onSelect: (id: string) => void
    onHover: (id: string | null) => void
    onDelete: (id: string) => void
    onDuplicate: (id: string) => void
    onAdd: (id: string, type: string) => void
}) {
    const [expanded, setExpanded] = useState(true)
    const hasChildren = node.children && node.children.length > 0
    const isSelected = selectedId === node.id
    const isHovered = hoveredId === node.id
    const canHaveChildren = ['Box', 'Flex', 'Grid'].includes(node.type)

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onSelect(node.id)
        useEditorStore.getState().openContextMenu({
            x: e.clientX,
            y: e.clientY,
            type: 'ast-node',
            payload: { nodeId: node.id }
        })
    }

    return (
        <div className="ke-layer-item-wrapper">
            <div 
                className={`ke-layer-item ${isSelected ? 'selected' : ''} ${isHovered && !isSelected ? 'hovered' : ''}`}
                style={{ paddingLeft: 12 + (level * 16) }}
                onClick={(e) => { e.stopPropagation(); onSelect(node.id) }}
                onMouseEnter={(e) => { e.stopPropagation(); onHover(node.id) }}
                onMouseLeave={(e) => { e.stopPropagation(); onHover(null) }}
                onContextMenu={handleContextMenu}
            >
                <div className="ke-layer-toggle" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}>
                    {hasChildren ? (
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.15s' }}>
                            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <span style={{ width: 12, height: 12, display: 'inline-block' }} />
                    )}
                </div>

                <div className="ke-layer-icon">
                    {node.type === 'Box' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /></svg>}
                    {node.type === 'Flex' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M12 3v18" /></svg>}
                    {node.type === 'Grid' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M12 3v18M3 12h18" /></svg>}
                    {node.type === 'Typography' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>}
                    {node.type === 'Button' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="7" width="18" height="10" rx="5" ry="5" /></svg>}
                    {node.type === 'Image' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>}
                    {node.type === 'Icon' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}
                    {!['Box','Flex','Grid','Typography','Button','Image','Icon'].includes(node.type) && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>}
                </div>

                <div className="ke-layer-name">
                    {node.type}
                </div>

                {isSelected && (
                    <div className="ke-layer-actions">
                        {canHaveChildren && (
                            <button className="ke-layer-btn" title="İçine Kutu Ekle" onClick={(e) => { e.stopPropagation(); onAdd(node.id, 'Box'); setExpanded(true) }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                        )}
                        <button className="ke-layer-btn" title="Kopyala" onClick={(e) => { e.stopPropagation(); onDuplicate(node.id) }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </button>
                        <button className="ke-layer-btn destructive" title="Sil" onClick={(e) => { e.stopPropagation(); onDelete(node.id) }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                )}
            </div>

            {expanded && hasChildren && (
                <div className="ke-layer-children">
                    {node.children!.map((child) => (
                        <LayerNode 
                            key={child.id} 
                            node={child} 
                            level={level + 1}
                            selectedId={selectedId}
                            hoveredId={hoveredId}
                            onSelect={onSelect}
                            onHover={onHover}
                            onDelete={onDelete}
                            onDuplicate={onDuplicate}
                            onAdd={onAdd}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function AstLayersPanel() {
    const pages = useEditorStore(s => s.pages)
    const activePageId = useEditorStore(s => s.activePageId)
    const siteData = useEditorStore(s => s.siteData)
    
    const selectedSectionId = useEditorStore(s => s.selectedSectionId)
    const setSelectedSectionId = useEditorStore(s => s.setSelectedSectionId)
    const hoveredSectionId = useEditorStore(s => s.hoveredSectionId)
    const setHoveredSectionId = useEditorStore(s => s.setHoveredSectionId)
    
    const deleteAstNode = useEditorStore(s => s.deleteAstNode)
    const duplicateAstNode = useEditorStore(s => s.duplicateAstNode)
    const addAstNode = useEditorStore(s => s.addAstNode)

    const activeThemePage = siteData?.theme?.pages?.find(p => p.id === activePageId) || siteData?.theme?.pages?.[0]

    return (
        <div className="ke-layers-panel">
            <style>{`
                .ke-layers-panel { height: 100%; display: flex; flex-direction: column; background: #fff; border-right: 1px solid #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
                .ke-layers-header { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #1e293b; display: flex; align-items: center; justify-content: space-between; }
                
                .ke-layers-content { flex: 1; overflow-y: auto; padding: 8px 0; }
                
                .ke-layer-item { display: flex; align-items: center; padding: 6px 12px; cursor: pointer; color: #475569; position: relative; }
                .ke-layer-item:hover { background: #f8fafc; }
                .ke-layer-item.hovered { background: #f1f5f9; }
                .ke-layer-item.selected { background: #eff6ff; color: #1d4ed8; font-weight: 500; }
                
                .ke-layer-toggle { display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; margin-right: 4px; color: #94a3b8; cursor: pointer; }
                .ke-layer-toggle:hover { color: #64748b; }
                
                .ke-layer-icon { display: flex; align-items: center; justify-content: center; width: 18px; height: 18px; margin-right: 8px; color: inherit; opacity: 0.7; }
                .ke-layer-item.selected .ke-layer-icon { opacity: 1; color: #2563eb; }
                
                .ke-layer-name { font-size: 12px; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                
                .ke-layer-actions { display: flex; align-items: center; gap: 4px; position: absolute; right: 12px; background: #eff6ff; padding-left: 8px; }
                .ke-layer-btn { display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; border: none; background: transparent; border-radius: 4px; color: #64748b; cursor: pointer; transition: 0.15s; }
                .ke-layer-btn:hover { background: #dbeafe; color: #1d4ed8; }
                .ke-layer-btn.destructive:hover { background: #fee2e2; color: #ef4444; }
                
                .ke-layer-section-header { padding: 8px 16px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 8px; }
                .ke-layer-section-header:first-child { margin-top: 0; }
            `}</style>
            
            <div className="ke-layers-header">
                Katmanlar (Layers)
            </div>
            
            <div className="ke-layers-content">
                {activeThemePage?.sections?.map((section) => (
                    <div key={section.id}>
                        <div className="ke-layer-section-header">
                            {section.name || section.type}
                        </div>
                        {section.blockTree && (
                            <LayerNode 
                                node={section.blockTree}
                                selectedId={selectedSectionId}
                                hoveredId={hoveredSectionId}
                                onSelect={setSelectedSectionId}
                                onHover={setHoveredSectionId}
                                onDelete={deleteAstNode}
                                onDuplicate={duplicateAstNode}
                                onAdd={addAstNode}
                            />
                        )}
                    </div>
                ))}
                {!activeThemePage?.sections?.length && (
                    <div style={{ padding: 24, textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
                        Bu sayfada içerik bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    )
}
