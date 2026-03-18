'use client'

import { useState } from 'react'
import { useEditorStore, type EditorSection } from '../../store/editor-store'
import { SECTION_INSPECTORS, type InspectorField } from '../../data/sectionInspectorConfig'

/* ── Group fields by their `group` key, preserving insertion order ── */
function groupFields(fields: InspectorField[]): Map<string, InspectorField[]> {
    const map = new Map<string, InspectorField[]>()
    for (const f of fields) {
        const arr = map.get(f.group)
        if (arr) arr.push(f)
        else map.set(f.group, [f])
    }
    return map
}

/* ── Chevron SVG ── */
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
            <path
                d="M3.5 5.25L7 8.75L10.5 5.25"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

/* ── Field Renderers ── */

function TextField({ field, value, onChange }: {
    field: InspectorField
    value: string
    onChange: (v: string) => void
}) {
    return (
        <input
            type="text"
            className="ke-si-input"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={field.label}
        />
    )
}

function TextareaField({ field, value, onChange }: {
    field: InspectorField
    value: string
    onChange: (v: string) => void
}) {
    return (
        <textarea
            className="ke-si-input ke-si-textarea"
            rows={3}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={field.label}
        />
    )
}

function ColorField({ value, onChange }: {
    field: InspectorField
    value: string
    onChange: (v: string) => void
}) {
    return (
        <div className="ke-si-color-wrap">
            <input
                type="color"
                className="ke-si-color"
                value={value || '#000000'}
                onChange={e => onChange(e.target.value)}
            />
            <span className="ke-si-color-hex">{value || '#000000'}</span>
        </div>
    )
}

function SelectField({ field, value, onChange }: {
    field: InspectorField
    value: string
    onChange: (v: string) => void
}) {
    return (
        <select
            className="ke-si-input ke-si-select"
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            {field.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    )
}

function NumberField({ value, onChange }: {
    field: InspectorField
    value: number
    onChange: (v: number) => void
}) {
    return (
        <input
            type="number"
            className="ke-si-input ke-si-number"
            value={value}
            onChange={e => onChange(Number(e.target.value))}
        />
    )
}

function ToggleField({ value, onChange }: {
    field: InspectorField
    value: boolean
    onChange: (v: boolean) => void
}) {
    return (
        <button
            type="button"
            className={`ke-si-toggle ${value ? 'ke-si-toggle--active' : ''}`}
            onClick={() => onChange(!value)}
            aria-pressed={value}
        >
            <span className="ke-si-toggle-thumb" />
        </button>
    )
}

function RangeField({ field, value, onChange }: {
    field: InspectorField
    value: number
    onChange: (v: number) => void
}) {
    return (
        <div className="ke-si-range-wrap">
            <input
                type="range"
                className="ke-si-range"
                min={field.min ?? 0}
                max={field.max ?? 100}
                step={field.step ?? 1}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
            />
            <span className="ke-si-range-val">{value}</span>
        </div>
    )
}

/* ── Main Component ── */

interface SectionInspectorProps {
    section: EditorSection
}

export default function SectionInspector({ section }: SectionInspectorProps) {
    const updateSectionProps = useEditorStore(s => s.updateSectionProps)

    const def = SECTION_INSPECTORS.find(d => d.type === section.type)

    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

    const toggleGroup = (group: string) => {
        setCollapsed(prev => ({ ...prev, [group]: !prev[group] }))
    }

    const getValue = (field: InspectorField): unknown => {
        const v = section.props[field.key]
        return v !== undefined ? v : field.defaultValue
    }

    const handleChange = (field: InspectorField, newValue: unknown) => {
        updateSectionProps(section.instanceId, { [field.key]: newValue })
    }

    /* No matching definition */
    if (!def) {
        return (
            <div className="ke-si-empty">
                <style>{styles}</style>
                <p className="ke-si-empty-text">
                    Bu bölüm için özelleştirme seçenekleri yakında eklenecek.
                </p>
            </div>
        )
    }

    const grouped = groupFields(def.fields)

    return (
        <div className="ke-si-root">
            <style>{styles}</style>

            {/* Section header */}
            <div className="ke-si-header">
                <span className="ke-si-header-icon">{def.icon}</span>
                <span className="ke-si-header-label">{def.label}</span>
            </div>

            {/* Grouped fields */}
            {Array.from(grouped.entries()).map(([group, fields], gi) => {
                const isOpen = !collapsed[group]
                return (
                    <div key={group} className="ke-si-group">
                        {gi > 0 && <div className="ke-si-divider" />}
                        <button
                            type="button"
                            className="ke-si-group-header"
                            onClick={() => toggleGroup(group)}
                        >
                            <span>{group}</span>
                            <Chevron open={isOpen} />
                        </button>

                        {isOpen && (
                            <div className="ke-si-group-body">
                                {fields.map(field => (
                                    <div key={field.key} className="ke-si-field">
                                        {/* Toggle gets inline label */}
                                        {field.type === 'toggle' ? (
                                            <div className="ke-si-toggle-row">
                                                <span className="ke-si-label">{field.label}</span>
                                                <ToggleField
                                                    field={field}
                                                    value={getValue(field) as boolean}
                                                    onChange={v => handleChange(field, v)}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <label className="ke-si-label">{field.label}</label>
                                                {field.type === 'text' && (
                                                    <TextField
                                                        field={field}
                                                        value={getValue(field) as string}
                                                        onChange={v => handleChange(field, v)}
                                                    />
                                                )}
                                                {field.type === 'textarea' && (
                                                    <TextareaField
                                                        field={field}
                                                        value={getValue(field) as string}
                                                        onChange={v => handleChange(field, v)}
                                                    />
                                                )}
                                                {field.type === 'color' && (
                                                    <ColorField
                                                        field={field}
                                                        value={getValue(field) as string}
                                                        onChange={v => handleChange(field, v)}
                                                    />
                                                )}
                                                {field.type === 'select' && (
                                                    <SelectField
                                                        field={field}
                                                        value={getValue(field) as string}
                                                        onChange={v => handleChange(field, v)}
                                                    />
                                                )}
                                                {field.type === 'number' && (
                                                    <NumberField
                                                        field={field}
                                                        value={getValue(field) as number}
                                                        onChange={v => handleChange(field, v)}
                                                    />
                                                )}
                                                {field.type === 'range' && (
                                                    <RangeField
                                                        field={field}
                                                        value={getValue(field) as number}
                                                        onChange={v => handleChange(field, v)}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

/* ── Scoped Styles ── */
const styles = /* css */ `
.ke-si-root {
    padding: 0;
}

.ke-si-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
}

.ke-si-header-icon {
    font-size: 16px;
    line-height: 1;
}

.ke-si-header-label {
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
}

/* Group */
.ke-si-group {
    padding: 0 16px;
}

.ke-si-group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 0;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #334155;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
}

.ke-si-group-header:hover {
    color: #0f172a;
}

.ke-si-group-body {
    padding-bottom: 8px;
}

.ke-si-divider {
    height: 1px;
    background: #e2e8f0;
    margin: 0 -16px;
}

/* Field row */
.ke-si-field {
    margin-bottom: 12px;
}

.ke-si-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    margin-bottom: 5px;
    user-select: none;
}

/* Inputs */
.ke-si-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 13px;
    font-family: inherit;
    background: #f8fafc;
    color: #1e293b;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    box-sizing: border-box;
}

.ke-si-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.12);
}

.ke-si-textarea {
    resize: vertical;
    min-height: 60px;
}

.ke-si-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 32px;
}

.ke-si-number {
    max-width: 100px;
}

/* Color */
.ke-si-color-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
}

.ke-si-color {
    width: 36px;
    height: 36px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 2px;
    cursor: pointer;
    background: none;
}

.ke-si-color::-webkit-color-swatch-wrapper {
    padding: 0;
}

.ke-si-color::-webkit-color-swatch {
    border: none;
    border-radius: 4px;
}

.ke-si-color-hex {
    font-size: 12px;
    font-family: monospace;
    color: #64748b;
}

/* Toggle */
.ke-si-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.ke-si-toggle-row .ke-si-label {
    margin-bottom: 0;
}

.ke-si-toggle {
    position: relative;
    width: 40px;
    height: 22px;
    border-radius: 11px;
    background: #e2e8f0;
    border: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    transition: background 0.2s ease;
}

.ke-si-toggle--active {
    background: #3b82f6;
}

.ke-si-toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
    pointer-events: none;
}

.ke-si-toggle--active .ke-si-toggle-thumb {
    transform: translateX(18px);
}

/* Range */
.ke-si-range-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
}

.ke-si-range {
    flex: 1;
    height: 4px;
    appearance: none;
    background: #e2e8f0;
    border-radius: 2px;
    outline: none;
}

.ke-si-range::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.ke-si-range::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.ke-si-range-val {
    min-width: 28px;
    text-align: right;
    font-size: 12px;
    font-weight: 600;
    color: #475569;
    font-variant-numeric: tabular-nums;
}

/* Empty state */
.ke-si-empty {
    padding: 32px 16px;
    text-align: center;
}

.ke-si-empty-text {
    font-size: 13px;
    color: #94a3b8;
    line-height: 1.5;
}
`
