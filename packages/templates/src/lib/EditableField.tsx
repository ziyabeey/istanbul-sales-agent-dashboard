/**
 * @kepenk/templates — EditableField Component
 *
 * Inline-editable text wrapper for the editor.
 * When isEditing=true: contentEditable, pencil icon on hover, onBlur save.
 * When isEditing=false: plain text render.
 */

'use client'

import { useRef, useState } from 'react'

interface EditableFieldProps {
  value: string
  isEditing?: boolean
  onChange?: (newValue: string) => void
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  className?: string
  placeholder?: string
}

export function EditableField({
  value,
  isEditing,
  onChange,
  as: Tag = 'div',
  className,
  placeholder = 'Metin girin...',
}: EditableFieldProps) {
  const ref = useRef<HTMLElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  if (!isEditing) {
    return <Tag className={className}>{value || placeholder}</Tag>
  }

  return (
    <div className="group relative inline-block">
      <Tag
        ref={ref as unknown as React.RefObject<HTMLDivElement>}
        contentEditable
        suppressContentEditableWarning
        className={`${className ?? ''} outline-none ring-0 focus:ring-2 focus:ring-accent/30 rounded transition-shadow`}
        onFocus={() => setIsFocused(true)}
        onBlur={(e: React.FocusEvent<HTMLElement>) => {
          setIsFocused(false)
          const newText = e.currentTarget.textContent ?? ''
          if (newText !== value) {
            onChange?.(newText)
          }
        }}
        dangerouslySetInnerHTML={{
          __html: value || `<span class="text-foreground-muted">${placeholder}</span>`,
        }}
      />
      {!isFocused && (
        <button
          className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-accent text-on-accent rounded-full shadow-sm"
          onClick={() => ref.current?.focus()}
          aria-label="Düzenle"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
        </button>
      )}
    </div>
  )
}
