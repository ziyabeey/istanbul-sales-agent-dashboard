import { create } from 'zustand'

/* ── Section Template Types ── */
export interface SectionTemplate {
    id: string
    type: string
    category: string
    name: string
    icon: string
    props: Record<string, unknown>
}

/* ── Editor Section Instance ── */
export interface EditorSection {
    instanceId: string
    templateId: string
    type: string
    name: string
    icon: string
    visible: boolean
    props: Record<string, unknown>
}

/* ── Device Mode ── */
export type DeviceMode = 'desktop' | 'tablet' | 'mobile'

/* ── Editor Page ── */
export interface EditorPage {
    id: string
    name: string
    slug: string
    isHome: boolean
    sections: EditorSection[]
}

/* ── Drag State ── */
export interface DragState {
    isDragging: boolean
    dragType: 'catalog' | 'reorder' | null
    templateId?: string
    sourceIndex?: number
    dropTargetIndex: number | null
}

/* ── Site Data (demo sync) ── */
export interface SiteData {
    sektorId: number
    kategori: string
    isletmeAdi: string
    heroBaslik: string
    heroAlt: string
    hizmetler: [string, string, string]
    bg: string
    accent: string
    text: string
    font: string
    unsplash: string
    telefon: string
    adres: string
    paket: string
    moduller: string[]
}

/* ── Context Menu ── */
export interface ContextMenuState {
    x: number
    y: number
    targetType: 'text' | 'image' | 'section' | 'generic'
    targetTag: string
    targetText: string
    targetField: string
    elementPath: string
}

/* ── Inline Edit ── */
export interface InlineEditState {
    x: number
    y: number
    width: number
    field: string
    text: string
    tagName: string
    elementPath: string
}

/* ── Image Edit ── */
export interface ImageEditState {
    src: string
    alt: string
    field: string
    elementPath: string
    x: number
    y: number
}

/* ── Site Settings ── */
export interface SiteSettings {
    /* Domain */
    customDomain: string
    subdomain: string

    /* SEO */
    seoTitle: string
    seoDescription: string
    seoKeywords: string
    ogImage: string

    /* İşletme */
    businessName: string
    businessPhone: string
    businessEmail: string
    businessAddress: string
    businessLogo: string
    openingHours: string

    /* Sosyal Medya */
    socialInstagram: string
    socialFacebook: string
    socialTwitter: string
    socialWhatsapp: string

    /* Gizlilik */
    cookieBanner: boolean
    privacyPageEnabled: boolean
}

/* ── Store State ── */
interface EditorState {
    /* Pages */
    pages: EditorPage[]
    activePageId: string

    /* Selection */
    selectedSectionId: string | null
    hoveredSectionId: string | null

    /* Device & Zoom */
    deviceMode: DeviceMode
    zoom: number

    /* Panels */
    activeLeftPanel: string | null
    rightPanelOpen: boolean

    /* Drag */
    dragState: DragState

    /* Undo / Redo */
    undoStack: EditorPage[][]
    redoStack: EditorPage[][]

    /* Dirty flag */
    isDirty: boolean
    isSaving: boolean
    saveSuccess: boolean

    /* Site data (demo sync) */
    siteData: SiteData | null
    generatedHtml: string

    /* Context Menu */
    contextMenu: ContextMenuState | null

    /* Inline Edit */
    inlineEdit: InlineEditState | null

    /* Image Edit */
    imageEdit: ImageEditState | null

    /* Site Settings */
    siteSettings: SiteSettings
    settingsModalOpen: boolean
    settingsModalTab: string

    /* ── Actions ── */
    setActivePageId: (id: string) => void
    setDeviceMode: (mode: DeviceMode) => void
    setZoom: (zoom: number) => void
    setActiveLeftPanel: (panel: string | null) => void
    setRightPanelOpen: (open: boolean) => void
    selectSection: (id: string | null) => void
    hoverSection: (id: string | null) => void

    /* Section CRUD */
    addSection: (section: EditorSection, atIndex?: number) => void
    removeSection: (instanceId: string) => void
    moveSection: (instanceId: string, direction: 'up' | 'down') => void
    moveSectionToIndex: (instanceId: string, toIndex: number) => void
    duplicateSection: (instanceId: string) => void
    toggleSectionVisibility: (instanceId: string) => void
    updateSectionProps: (instanceId: string, props: Record<string, unknown>) => void
    reorderSections: (newSections: EditorSection[]) => void

    /* Drag */
    startDrag: (type: 'catalog' | 'reorder', payload: { templateId?: string; sourceIndex?: number }) => void
    setDropTarget: (index: number | null) => void
    endDrag: () => void

    /* Site data */
    setSiteData: (data: SiteData) => void
    updateSiteData: (partial: Partial<SiteData>) => void
    setGeneratedHtml: (html: string) => void

    /* Save */
    setSaving: (v: boolean) => void
    setSaveSuccess: (v: boolean) => void
    markDirty: () => void

    /* Context Menu */
    openContextMenu: (cm: ContextMenuState) => void
    closeContextMenu: () => void

    /* Inline Edit */
    openInlineEdit: (ie: InlineEditState) => void
    closeInlineEdit: () => void
    applyInlineEdit: (text: string, field?: string) => void

    /* Image Edit */
    openImageEdit: (state: ImageEditState) => void
    closeImageEdit: () => void
    applyImageEdit: (newSrc: string, newAlt?: string) => void

    /* Site Settings */
    openSettingsModal: (tab?: string) => void
    closeSettingsModal: () => void
    setSettingsTab: (tab: string) => void
    updateSiteSettings: (partial: Partial<SiteSettings>) => void

    /* Page CRUD */
    addPage: (name: string, slug: string) => void
    removePage: (pageId: string) => void
    renamePage: (pageId: string, name: string, slug?: string) => void
    reorderPages: (newPages: EditorPage[]) => void

    /* Undo / Redo */
    undo: () => void
    redo: () => void
    pushUndo: () => void
}

/* ── Helper: get active page sections ── */
function getActiveSections(state: EditorState): EditorSection[] {
    return state.pages.find(p => p.id === state.activePageId)?.sections ?? []
}

function updateActiveSections(state: EditorState, updater: (sections: EditorSection[]) => EditorSection[]): EditorPage[] {
    return state.pages.map(p =>
        p.id === state.activePageId
            ? { ...p, sections: updater(p.sections) }
            : p
    )
}

/* ── Default Page ── */
const DEFAULT_PAGES: EditorPage[] = [
    {
        id: 'home',
        name: 'Anasayfa',
        slug: '/',
        isHome: true,
        sections: [
            { instanceId: 'hero-1', templateId: 'hero-welcome', type: 'hero', name: 'Hoş Geldiniz', icon: '🎯', visible: true, props: {} },
            { instanceId: 'about-1', templateId: 'about-basic', type: 'about', name: 'Hakkımızda', icon: '📖', visible: true, props: {} },
            { instanceId: 'services-1', templateId: 'services-grid', type: 'services', name: 'Hizmetlerimiz', icon: '🔧', visible: true, props: {} },
            { instanceId: 'testimonials-1', templateId: 'testimonials-cards', type: 'testimonials', name: 'Müşteri Görüşleri', icon: '⭐', visible: true, props: {} },
            { instanceId: 'contact-1', templateId: 'contact-form', type: 'contact', name: 'İletişim', icon: '📞', visible: true, props: {} },
        ],
    },
]

/* ── Create Store ── */
export const useEditorStore = create<EditorState>((set, get) => ({
    pages: DEFAULT_PAGES,
    activePageId: 'home',
    selectedSectionId: null,
    hoveredSectionId: null,
    deviceMode: 'desktop',
    zoom: 100,
    activeLeftPanel: null,
    rightPanelOpen: false,
    dragState: { isDragging: false, dragType: null, dropTargetIndex: null },
    undoStack: [],
    redoStack: [],
    isDirty: false,
    isSaving: false,
    saveSuccess: false,
    siteData: null,
    generatedHtml: '',
    contextMenu: null,
    inlineEdit: null,
    imageEdit: null,
    siteSettings: {
        customDomain: '', subdomain: '',
        seoTitle: '', seoDescription: '', seoKeywords: '', ogImage: '',
        businessName: '', businessPhone: '', businessEmail: '', businessAddress: '', businessLogo: '', openingHours: '',
        socialInstagram: '', socialFacebook: '', socialTwitter: '', socialWhatsapp: '',
        cookieBanner: false, privacyPageEnabled: false,
    },
    settingsModalOpen: false,
    settingsModalTab: 'business',

    setActivePageId: (id) => set({ activePageId: id }),
    setDeviceMode: (mode) => set({ deviceMode: mode }),
    setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(200, zoom)) }),
    setActiveLeftPanel: (panel) => set(s => ({ activeLeftPanel: s.activeLeftPanel === panel ? null : panel })),
    setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
    selectSection: (id) => set({ selectedSectionId: id, rightPanelOpen: !!id }),
    hoverSection: (id) => set({ hoveredSectionId: id }),

    addSection: (section, atIndex) => {
        get().pushUndo()
        set(s => ({
            pages: updateActiveSections(s, secs => {
                const idx = atIndex ?? secs.length
                const next = [...secs]
                next.splice(idx, 0, section)
                return next
            }),
            isDirty: true,
        }))
    },

    removeSection: (instanceId) => {
        get().pushUndo()
        set(s => ({
            pages: updateActiveSections(s, secs => secs.filter(sec => sec.instanceId !== instanceId)),
            selectedSectionId: s.selectedSectionId === instanceId ? null : s.selectedSectionId,
            isDirty: true,
        }))
    },

    moveSection: (instanceId, direction) => {
        get().pushUndo()
        set(s => ({
            pages: updateActiveSections(s, secs => {
                const idx = secs.findIndex(sec => sec.instanceId === instanceId)
                if (idx < 0) return secs
                const newIdx = direction === 'up' ? idx - 1 : idx + 1
                if (newIdx < 0 || newIdx >= secs.length) return secs
                const next = [...secs]
                const temp = next[idx]
                next[idx] = next[newIdx]
                next[newIdx] = temp
                return next
            }),
            isDirty: true,
        }))
    },

    duplicateSection: (instanceId) => {
        get().pushUndo()
        set(s => ({
            pages: updateActiveSections(s, secs => {
                const idx = secs.findIndex(sec => sec.instanceId === instanceId)
                if (idx < 0) return secs
                const dup = { ...secs[idx], instanceId: `${secs[idx].instanceId}-copy-${Date.now()}` }
                const next = [...secs]
                next.splice(idx + 1, 0, dup)
                return next
            }),
            isDirty: true,
        }))
    },

    toggleSectionVisibility: (instanceId) => {
        get().pushUndo()
        set(s => ({
            pages: updateActiveSections(s, secs => secs.map(sec => sec.instanceId === instanceId ? { ...sec, visible: !sec.visible } : sec)),
            isDirty: true,
        }))
    },

    updateSectionProps: (instanceId, props) => {
        set(s => ({
            pages: updateActiveSections(s, secs => secs.map(sec => sec.instanceId === instanceId ? { ...sec, props: { ...sec.props, ...props } } : sec)),
            isDirty: true,
        }))
    },

    reorderSections: (newSections) => {
        get().pushUndo()
        set(s => ({
            pages: s.pages.map(p => p.id === s.activePageId ? { ...p, sections: newSections } : p),
            isDirty: true,
        }))
    },

    moveSectionToIndex: (instanceId, toIndex) => {
        get().pushUndo()
        set(s => ({
            pages: updateActiveSections(s, secs => {
                const fromIdx = secs.findIndex(sec => sec.instanceId === instanceId)
                if (fromIdx < 0) return secs
                const next = [...secs]
                const [moved] = next.splice(fromIdx, 1)
                const adjustedIdx = toIndex > fromIdx ? toIndex - 1 : toIndex
                next.splice(adjustedIdx, 0, moved)
                return next
            }),
            isDirty: true,
        }))
    },

    startDrag: (type, payload) => set({
        dragState: { isDragging: true, dragType: type, templateId: payload.templateId, sourceIndex: payload.sourceIndex, dropTargetIndex: null },
    }),
    setDropTarget: (index) => set(s => ({
        dragState: { ...s.dragState, dropTargetIndex: index },
    })),
    endDrag: () => set({
        dragState: { isDragging: false, dragType: null, dropTargetIndex: null },
    }),

    setSiteData: (data) => set({ siteData: data, isDirty: true }),
    updateSiteData: (partial) => set(s => ({
        siteData: s.siteData ? { ...s.siteData, ...partial } : null,
        isDirty: true,
    })),
    setGeneratedHtml: (html) => set({ generatedHtml: html }),

    setSaving: (v) => set({ isSaving: v }),
    setSaveSuccess: (v) => set({ saveSuccess: v }),
    markDirty: () => set({ isDirty: true }),

    /* Context Menu */
    openContextMenu: (cm) => set({ contextMenu: cm, inlineEdit: null }),
    closeContextMenu: () => set({ contextMenu: null }),

    /* Inline Edit */
    openInlineEdit: (ie) => set({ inlineEdit: ie, contextMenu: null }),
    closeInlineEdit: () => set({ inlineEdit: null }),
    applyInlineEdit: (text, fieldOverride) => set(s => {
        if (!s.siteData) return s
        const field = fieldOverride || s.inlineEdit?.field || ''
        if (!field) return { inlineEdit: null }
        // Map known fields to siteData properties
        const fieldMap: Record<string, string> = {
            'hero-baslik': 'heroBaslik',
            'hero-alt': 'heroAlt',
            'isletme-adi': 'isletmeAdi',
            'telefon': 'telefon',
            'adres': 'adres',
        }
        const siteField = fieldMap[field]
        if (siteField) {
            return {
                siteData: { ...s.siteData, [siteField]: text },
                inlineEdit: null,
                isDirty: true,
            }
        }
        // Handle hizmet fields (hizmet-0, hizmet-1, hizmet-2)
        const hizmetMatch = field.match(/^hizmet-(\d+)$/)
        if (hizmetMatch) {
            const idx = parseInt(hizmetMatch[1])
            const hizmetler = [...s.siteData.hizmetler] as [string, string, string]
            if (idx >= 0 && idx < 3) {
                hizmetler[idx] = text
                return { siteData: { ...s.siteData, hizmetler }, inlineEdit: null, isDirty: true }
            }
        }
        return { inlineEdit: null }
    }),

    /* Image Edit */
    openImageEdit: (state) => set({ imageEdit: state, contextMenu: null }),
    closeImageEdit: () => set({ imageEdit: null }),
    applyImageEdit: (newSrc, newAlt) => set(s => {
        if (!s.siteData || !s.imageEdit) return { imageEdit: null }
        const field = s.imageEdit.field
        const updates: Partial<SiteData> = {}

        // Map image fields to siteData
        if (field === 'hero-bg' || field === 'unsplash' || field === 'hero-image') {
            updates.unsplash = newSrc
        }

        return {
            siteData: { ...s.siteData, ...updates },
            imageEdit: null,
            isDirty: true,
        }
    }),

    /* Site Settings */
    openSettingsModal: (tab) => set({ settingsModalOpen: true, settingsModalTab: tab || 'business' }),
    closeSettingsModal: () => set({ settingsModalOpen: false }),
    setSettingsTab: (tab) => set({ settingsModalTab: tab }),
    updateSiteSettings: (partial) => set(s => ({
        siteSettings: { ...s.siteSettings, ...partial },
        isDirty: true,
    })),

    /* Page CRUD */
    addPage: (name, slug) => {
        get().pushUndo()
        set(s => ({
            pages: [...s.pages, {
                id: `page-${Date.now()}`,
                name,
                slug: slug.startsWith('/') ? slug : `/${slug}`,
                isHome: false,
                sections: [],
            }],
            isDirty: true,
        }))
    },
    removePage: (pageId) => {
        const state = get()
        const page = state.pages.find(p => p.id === pageId)
        if (!page || page.isHome) return // Cannot delete home page
        state.pushUndo()
        set(s => ({
            pages: s.pages.filter(p => p.id !== pageId),
            activePageId: s.activePageId === pageId ? 'home' : s.activePageId,
            isDirty: true,
        }))
    },
    renamePage: (pageId, name, slug) => {
        set(s => ({
            pages: s.pages.map(p => p.id === pageId ? { ...p, name, slug: slug ?? p.slug } : p),
            isDirty: true,
        }))
    },
    reorderPages: (newPages) => {
        get().pushUndo()
        set({ pages: newPages, isDirty: true })
    },

    pushUndo: () => set(s => ({
        undoStack: [...s.undoStack.slice(-19), s.pages],
        redoStack: [],
    })),

    undo: () => set(s => {
        if (s.undoStack.length === 0) return s
        const prev = s.undoStack[s.undoStack.length - 1]
        return {
            undoStack: s.undoStack.slice(0, -1),
            redoStack: [...s.redoStack, s.pages],
            pages: prev,
            isDirty: true,
        }
    }),

    redo: () => set(s => {
        if (s.redoStack.length === 0) return s
        const next = s.redoStack[s.redoStack.length - 1]
        return {
            redoStack: s.redoStack.slice(0, -1),
            undoStack: [...s.undoStack, s.pages],
            pages: next,
            isDirty: true,
        }
    }),
}))
