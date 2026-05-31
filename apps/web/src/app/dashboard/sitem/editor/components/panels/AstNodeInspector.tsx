'use client'

import { useState } from 'react'
import { useEditorStore } from '../../store/editor-store'
import type { BlockNode } from '@kepenk/templates/src/types/ast-types'
import ColorPickerWidget from '../widgets/ColorPickerWidget'
import SliderWidget from '../widgets/SliderWidget'
import SpacingWidget from '../widgets/SpacingWidget'
import TypographyWidget from '../widgets/TypographyWidget'

function Chevron({ open }: { open: boolean }) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{
                transition: 'transform 0.2s ease',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
        >
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function AstNodeInspector({ node }: { node: BlockNode }) {
    const updateAstNodeStyle = useEditorStore(s => s.updateAstNodeStyle)
    const updateAstNodeProps = useEditorStore(s => s.updateAstNodeProps)

    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

    const toggleGroup = (group: string) => {
        setCollapsed(prev => ({ ...prev, [group]: !prev[group] }))
    }

    const handleStyleChange = (key: string, value: string) => {
        updateAstNodeStyle(node.id, { [key]: value })
    }

    const handlePropChange = (propsType: string, key: string, value: string) => {
        updateAstNodeProps(node.id, propsType, { [key]: value })
    }

    return (
        <div className="ke-si-root">
            <style>{styles}</style>
            
            <div className="ke-si-header">
                <span className="ke-si-header-label">{node.type} Özellikleri</span>
                <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 'auto' }}>{node.id.split('-')[0]}</span>
            </div>

            {/* İçerik Özellikleri */}
            <div className="ke-si-group">
                <button type="button" className="ke-si-group-header" onClick={() => toggleGroup('content')}>
                    <span>İçerik</span>
                    <Chevron open={!collapsed['content']} />
                </button>
                {!collapsed['content'] && (
                    <div className="ke-si-group-body">
                        {node.type === 'Typography' && (
                            <div className="ke-si-field">
                                <label className="ke-si-label">Metin</label>
                                <textarea 
                                    className="ke-si-input ke-si-textarea" 
                                    value={node.typographyProps?.content || ''} 
                                    onChange={e => handlePropChange('typographyProps', 'content', e.target.value)} 
                                />
                            </div>
                        )}
                        {node.type === 'Button' && (
                            <div className="ke-si-field">
                                <label className="ke-si-label">Buton Metni</label>
                                <input 
                                    type="text" 
                                    className="ke-si-input" 
                                    value={node.buttonProps?.content || ''} 
                                    onChange={e => handlePropChange('buttonProps', 'content', e.target.value)} 
                                />
                            </div>
                        )}
                        {node.type === 'Image' && (
                            <div className="ke-si-field">
                                <label className="ke-si-label">Görsel URL</label>
                                <input 
                                    type="text" 
                                    className="ke-si-input" 
                                    value={node.imageProps?.src || ''} 
                                    onChange={e => handlePropChange('imageProps', 'src', e.target.value)} 
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Stil Özellikleri */}
            <div className="ke-si-group">
                <button type="button" className="ke-si-group-header" onClick={() => toggleGroup('style')}>
                    <span>Stil (Görünüm)</span>
                    <Chevron open={!collapsed['style']} />
                </button>
                {!collapsed['style'] && (
                    <div className="ke-si-group-body">
                        <ColorPickerWidget 
                            label="Arkaplan Rengi"
                            value={node.styles?.backgroundColor || ''}
                            onChange={val => handleStyleChange('backgroundColor', val)}
                            placeholder="var(--bg-surface)"
                        />
                        <ColorPickerWidget 
                            label="Metin Rengi"
                            value={node.styles?.color || ''}
                            onChange={val => handleStyleChange('color', val)}
                            placeholder="var(--text-primary)"
                        />
                        <ColorPickerWidget 
                            label="Kenarlık Rengi"
                            value={node.styles?.borderColor || ''}
                            onChange={val => handleStyleChange('borderColor', val)}
                            placeholder="transparent"
                        />
                        <SliderWidget 
                            label="Köşe Yuvarlama (Border Radius)"
                            value={node.styles?.borderRadius || '0px'}
                            onChange={val => handleStyleChange('borderRadius', val)}
                            min={0} max={100} step={1} unit="px"
                        />
                        <SliderWidget 
                            label="Kenarlık Kalınlığı"
                            value={node.styles?.borderWidth || '0px'}
                            onChange={val => handleStyleChange('borderWidth', val)}
                            min={0} max={20} step={1} unit="px"
                        />
                        <div style={{ marginTop: 16 }}>
                            <SpacingWidget 
                                label="İç Boşluk (Padding)"
                                value={node.styles?.padding || '0px'}
                                onChange={val => handleStyleChange('padding', val)}
                            />
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <SpacingWidget 
                                label="Dış Boşluk (Margin)"
                                value={node.styles?.margin || '0px'}
                                onChange={val => handleStyleChange('margin', val)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Tipografi Özellikleri (Sadece metin içerebilenler için) */}
            {(node.type === 'Typography' || node.type === 'Button') && (
                <div className="ke-si-group">
                    <button type="button" className="ke-si-group-header" onClick={() => toggleGroup('typography')}>
                        <span>Tipografi</span>
                        <Chevron open={!collapsed['typography']} />
                    </button>
                    {!collapsed['typography'] && (
                        <div className="ke-si-group-body">
                            <TypographyWidget 
                                fontFamily={node.styles?.fontFamily || ''}
                                fontWeight={node.styles?.fontWeight || ''}
                                textAlign={node.styles?.textAlign || ''}
                                fontSize={node.styles?.fontSize || ''}
                                lineHeight={node.styles?.lineHeight || ''}
                                onChange={(key, val) => handleStyleChange(key, val)}
                            />
                        </div>
                    )}
                </div>
            )}
            
            {/* Düzen / Layout Özellikleri */}
            {(node.type === 'Flex' || node.type === 'Grid' || node.type === 'Box') && (
                <div className="ke-si-group">
                    <button type="button" className="ke-si-group-header" onClick={() => toggleGroup('layout')}>
                        <span>Düzen (Layout)</span>
                        <Chevron open={!collapsed['layout']} />
                    </button>
                    {!collapsed['layout'] && (
                        <div className="ke-si-group-body">
                            {node.type === 'Flex' && (
                                <>
                                    <div className="ke-si-field">
                                        <label className="ke-si-label">Flex Direction</label>
                                        <select className="ke-si-input ke-si-select" value={node.styles?.flexDirection || 'row'} onChange={e => handleStyleChange('flexDirection', e.target.value)}>
                                            <option value="row">Row (Yatay)</option>
                                            <option value="column">Column (Dikey)</option>
                                        </select>
                                    </div>
                                    <div className="ke-si-field">
                                        <label className="ke-si-label">Justify Content</label>
                                        <select className="ke-si-input ke-si-select" value={node.styles?.justifyContent || 'flex-start'} onChange={e => handleStyleChange('justifyContent', e.target.value)}>
                                            <option value="flex-start">Start</option>
                                            <option value="center">Center</option>
                                            <option value="space-between">Space Between</option>
                                            <option value="flex-end">End</option>
                                        </select>
                                    </div>
                                    <div className="ke-si-field">
                                        <label className="ke-si-label">Align Items</label>
                                        <select className="ke-si-input ke-si-select" value={node.styles?.alignItems || 'flex-start'} onChange={e => handleStyleChange('alignItems', e.target.value)}>
                                            <option value="flex-start">Start</option>
                                            <option value="center">Center</option>
                                            <option value="flex-end">End</option>
                                            <option value="stretch">Stretch</option>
                                        </select>
                                    </div>
                                    <div className="ke-si-field">
                                        <label className="ke-si-label">Gap</label>
                                        <input className="ke-si-input" value={node.styles?.gap || ''} onChange={e => handleStyleChange('gap', e.target.value)} placeholder="16px" />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

/* ── Scoped Styles ── */
const styles = /* css */ `
.ke-si-root { padding: 0; }
.ke-si-header { display: flex; align-items: center; gap: 8px; padding: 14px 16px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
.ke-si-header-label { font-size: 13px; font-weight: 700; color: #1e293b; }
.ke-si-group { padding: 0 16px; border-bottom: 1px solid #e2e8f0; }
.ke-si-group-header { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 12px 0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #334155; cursor: pointer; background: none; border: none; outline: none; }
.ke-si-group-header:hover { color: #0f172a; }
.ke-si-group-body { padding-bottom: 12px; }
.ke-si-field { margin-bottom: 12px; }
.ke-si-label { display: block; font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 5px; user-select: none; }
.ke-si-input { width: 100%; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; font-family: inherit; background: #f8fafc; color: #1e293b; outline: none; transition: 0.15s; box-sizing: border-box; }
.ke-si-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.12); }
.ke-si-textarea { resize: vertical; min-height: 60px; }
.ke-si-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 32px; }
`
