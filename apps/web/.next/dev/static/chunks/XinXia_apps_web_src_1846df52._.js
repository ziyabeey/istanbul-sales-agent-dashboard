(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEditorStore",
    ()=>useEditorStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$14_immer$40$11$2e$1$2e$4_react$40$19$2e$2$2e$3_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$2$2e$3_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/zustand@5.0.11_@types+react@19.2.14_immer@11.1.4_react@19.2.3_use-sync-external-store@1.6.0_react@19.2.3_/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
/* ── Helper: get active page sections ── */ function getActiveSections(state) {
    return state.pages.find((p)=>p.id === state.activePageId)?.sections ?? [];
}
function updateActiveSections(state, updater) {
    return state.pages.map((p)=>p.id === state.activePageId ? {
            ...p,
            sections: updater(p.sections)
        } : p);
}
/* ── Default Page ── */ const DEFAULT_PAGES = [
    {
        id: 'home',
        name: 'Anasayfa',
        slug: '/',
        isHome: true,
        sections: [
            {
                instanceId: 'hero-1',
                templateId: 'hero-welcome',
                type: 'hero',
                name: 'Hoş Geldiniz',
                icon: '🎯',
                visible: true,
                props: {}
            },
            {
                instanceId: 'about-1',
                templateId: 'about-basic',
                type: 'about',
                name: 'Hakkımızda',
                icon: '📖',
                visible: true,
                props: {}
            },
            {
                instanceId: 'services-1',
                templateId: 'services-grid',
                type: 'services',
                name: 'Hizmetlerimiz',
                icon: '🔧',
                visible: true,
                props: {}
            },
            {
                instanceId: 'testimonials-1',
                templateId: 'testimonials-cards',
                type: 'testimonials',
                name: 'Müşteri Görüşleri',
                icon: '⭐',
                visible: true,
                props: {}
            },
            {
                instanceId: 'contact-1',
                templateId: 'contact-form',
                type: 'contact',
                name: 'İletişim',
                icon: '📞',
                visible: true,
                props: {}
            }
        ]
    }
];
const useEditorStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$11_$40$types$2b$react$40$19$2e$2$2e$14_immer$40$11$2e$1$2e$4_react$40$19$2e$2$2e$3_use$2d$sync$2d$external$2d$store$40$1$2e$6$2e$0_react$40$19$2e$2$2e$3_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        pages: DEFAULT_PAGES,
        activePageId: 'home',
        selectedSectionId: null,
        hoveredSectionId: null,
        deviceMode: 'desktop',
        zoom: 100,
        activeLeftPanel: null,
        rightPanelOpen: false,
        dragState: {
            isDragging: false,
            dragType: null,
            dropTargetIndex: null
        },
        undoStack: [],
        redoStack: [],
        isDirty: false,
        isSaving: false,
        saveSuccess: false,
        siteData: null,
        generatedHtml: '',
        setActivePageId: (id)=>set({
                activePageId: id
            }),
        setDeviceMode: (mode)=>set({
                deviceMode: mode
            }),
        setZoom: (zoom)=>set({
                zoom: Math.max(25, Math.min(200, zoom))
            }),
        setActiveLeftPanel: (panel)=>set((s)=>({
                    activeLeftPanel: s.activeLeftPanel === panel ? null : panel
                })),
        setRightPanelOpen: (open)=>set({
                rightPanelOpen: open
            }),
        selectSection: (id)=>set({
                selectedSectionId: id,
                rightPanelOpen: !!id
            }),
        hoverSection: (id)=>set({
                hoveredSectionId: id
            }),
        addSection: (section, atIndex)=>{
            get().pushUndo();
            set((s)=>({
                    pages: updateActiveSections(s, (secs)=>{
                        const idx = atIndex ?? secs.length;
                        const next = [
                            ...secs
                        ];
                        next.splice(idx, 0, section);
                        return next;
                    }),
                    isDirty: true
                }));
        },
        removeSection: (instanceId)=>{
            get().pushUndo();
            set((s)=>({
                    pages: updateActiveSections(s, (secs)=>secs.filter((sec)=>sec.instanceId !== instanceId)),
                    selectedSectionId: s.selectedSectionId === instanceId ? null : s.selectedSectionId,
                    isDirty: true
                }));
        },
        moveSection: (instanceId, direction)=>{
            get().pushUndo();
            set((s)=>({
                    pages: updateActiveSections(s, (secs)=>{
                        const idx = secs.findIndex((sec)=>sec.instanceId === instanceId);
                        if (idx < 0) return secs;
                        const newIdx = direction === 'up' ? idx - 1 : idx + 1;
                        if (newIdx < 0 || newIdx >= secs.length) return secs;
                        const next = [
                            ...secs
                        ];
                        const temp = next[idx];
                        next[idx] = next[newIdx];
                        next[newIdx] = temp;
                        return next;
                    }),
                    isDirty: true
                }));
        },
        duplicateSection: (instanceId)=>{
            get().pushUndo();
            set((s)=>({
                    pages: updateActiveSections(s, (secs)=>{
                        const idx = secs.findIndex((sec)=>sec.instanceId === instanceId);
                        if (idx < 0) return secs;
                        const dup = {
                            ...secs[idx],
                            instanceId: `${secs[idx].instanceId}-copy-${Date.now()}`
                        };
                        const next = [
                            ...secs
                        ];
                        next.splice(idx + 1, 0, dup);
                        return next;
                    }),
                    isDirty: true
                }));
        },
        toggleSectionVisibility: (instanceId)=>{
            get().pushUndo();
            set((s)=>({
                    pages: updateActiveSections(s, (secs)=>secs.map((sec)=>sec.instanceId === instanceId ? {
                                ...sec,
                                visible: !sec.visible
                            } : sec)),
                    isDirty: true
                }));
        },
        updateSectionProps: (instanceId, props)=>{
            set((s)=>({
                    pages: updateActiveSections(s, (secs)=>secs.map((sec)=>sec.instanceId === instanceId ? {
                                ...sec,
                                props: {
                                    ...sec.props,
                                    ...props
                                }
                            } : sec)),
                    isDirty: true
                }));
        },
        reorderSections: (newSections)=>{
            get().pushUndo();
            set((s)=>({
                    pages: s.pages.map((p)=>p.id === s.activePageId ? {
                            ...p,
                            sections: newSections
                        } : p),
                    isDirty: true
                }));
        },
        moveSectionToIndex: (instanceId, toIndex)=>{
            get().pushUndo();
            set((s)=>({
                    pages: updateActiveSections(s, (secs)=>{
                        const fromIdx = secs.findIndex((sec)=>sec.instanceId === instanceId);
                        if (fromIdx < 0) return secs;
                        const next = [
                            ...secs
                        ];
                        const [moved] = next.splice(fromIdx, 1);
                        const adjustedIdx = toIndex > fromIdx ? toIndex - 1 : toIndex;
                        next.splice(adjustedIdx, 0, moved);
                        return next;
                    }),
                    isDirty: true
                }));
        },
        startDrag: (type, payload)=>set({
                dragState: {
                    isDragging: true,
                    dragType: type,
                    templateId: payload.templateId,
                    sourceIndex: payload.sourceIndex,
                    dropTargetIndex: null
                }
            }),
        setDropTarget: (index)=>set((s)=>({
                    dragState: {
                        ...s.dragState,
                        dropTargetIndex: index
                    }
                })),
        endDrag: ()=>set({
                dragState: {
                    isDragging: false,
                    dragType: null,
                    dropTargetIndex: null
                }
            }),
        setSiteData: (data)=>set({
                siteData: data,
                isDirty: true
            }),
        updateSiteData: (partial)=>set((s)=>({
                    siteData: s.siteData ? {
                        ...s.siteData,
                        ...partial
                    } : null,
                    isDirty: true
                })),
        setGeneratedHtml: (html)=>set({
                generatedHtml: html
            }),
        setSaving: (v)=>set({
                isSaving: v
            }),
        setSaveSuccess: (v)=>set({
                saveSuccess: v
            }),
        markDirty: ()=>set({
                isDirty: true
            }),
        pushUndo: ()=>set((s)=>({
                    undoStack: [
                        ...s.undoStack.slice(-19),
                        s.pages
                    ],
                    redoStack: []
                })),
        undo: ()=>set((s)=>{
                if (s.undoStack.length === 0) return s;
                const prev = s.undoStack[s.undoStack.length - 1];
                return {
                    undoStack: s.undoStack.slice(0, -1),
                    redoStack: [
                        ...s.redoStack,
                        s.pages
                    ],
                    pages: prev,
                    isDirty: true
                };
            }),
        redo: ()=>set((s)=>{
                if (s.redoStack.length === 0) return s;
                const next = s.redoStack[s.redoStack.length - 1];
                return {
                    redoStack: s.redoStack.slice(0, -1),
                    undoStack: [
                        ...s.undoStack,
                        s.pages
                    ],
                    pages: next,
                    isDirty: true
                };
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$context$2f$EsnafContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/context/EsnafContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TopBar() {
    _s();
    const { esnafId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$context$2f$EsnafContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEsnaf"])();
    const deviceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[deviceMode]": (s)=>s.deviceMode
    }["TopBar.useEditorStore[deviceMode]"]);
    const setDeviceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[setDeviceMode]": (s)=>s.setDeviceMode
    }["TopBar.useEditorStore[setDeviceMode]"]);
    const zoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[zoom]": (s)=>s.zoom
    }["TopBar.useEditorStore[zoom]"]);
    const setZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[setZoom]": (s)=>s.setZoom
    }["TopBar.useEditorStore[setZoom]"]);
    const undoStack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[undoStack]": (s)=>s.undoStack
    }["TopBar.useEditorStore[undoStack]"]);
    const redoStack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[redoStack]": (s)=>s.redoStack
    }["TopBar.useEditorStore[redoStack]"]);
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[undo]": (s)=>s.undo
    }["TopBar.useEditorStore[undo]"]);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[redo]": (s)=>s.redo
    }["TopBar.useEditorStore[redo]"]);
    const isSaving = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[isSaving]": (s)=>s.isSaving
    }["TopBar.useEditorStore[isSaving]"]);
    const saveSuccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[saveSuccess]": (s)=>s.saveSuccess
    }["TopBar.useEditorStore[saveSuccess]"]);
    const isDirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[isDirty]": (s)=>s.isDirty
    }["TopBar.useEditorStore[isDirty]"]);
    const setSaving = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[setSaving]": (s)=>s.setSaving
    }["TopBar.useEditorStore[setSaving]"]);
    const setSaveSuccess = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[setSaveSuccess]": (s)=>s.setSaveSuccess
    }["TopBar.useEditorStore[setSaveSuccess]"]);
    const pages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[pages]": (s)=>s.pages
    }["TopBar.useEditorStore[pages]"]);
    const activePageId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[activePageId]": (s)=>s.activePageId
    }["TopBar.useEditorStore[activePageId]"]);
    const setActivePageId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TopBar.useEditorStore[setActivePageId]": (s)=>s.setActivePageId
    }["TopBar.useEditorStore[setActivePageId]"]);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [pageDropdownOpen, setPageDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [publishModal, setPublishModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [siteMenuOpen, setSiteMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const siteMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activePage = pages.find((p)=>p.id === activePageId);
    /* Keyboard shortcuts */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopBar.useEffect": ()=>{
            const handler = {
                "TopBar.useEffect.handler": (e)=>{
                    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                        e.preventDefault();
                        handleSave();
                    }
                    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
                        e.preventDefault();
                        undo();
                    }
                    if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || e.key === 'z' && e.shiftKey)) {
                        e.preventDefault();
                        redo();
                    }
                }
            }["TopBar.useEffect.handler"];
            window.addEventListener('keydown', handler);
            return ({
                "TopBar.useEffect": ()=>window.removeEventListener('keydown', handler)
            })["TopBar.useEffect"];
        }
    }["TopBar.useEffect"], [
        undo,
        redo
    ]);
    /* Close menus on outside click */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopBar.useEffect": ()=>{
            const handler = {
                "TopBar.useEffect.handler": (e)=>{
                    if (siteMenuRef.current && !siteMenuRef.current.contains(e.target)) {
                        setSiteMenuOpen(false);
                    }
                }
            }["TopBar.useEffect.handler"];
            document.addEventListener('mousedown', handler);
            return ({
                "TopBar.useEffect": ()=>document.removeEventListener('mousedown', handler)
            })["TopBar.useEffect"];
        }
    }["TopBar.useEffect"], []);
    const handleSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TopBar.useCallback[handleSave]": async ()=>{
            if (!esnafId) return;
            setSaving(true);
            try {
                await fetch('/api/site/guncelle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        esnafId
                    })
                });
                setSaveSuccess(true);
                setTimeout({
                    "TopBar.useCallback[handleSave]": ()=>setSaveSuccess(false)
                }["TopBar.useCallback[handleSave]"], 3000);
            } catch  {} finally{
                setSaving(false);
            }
        }
    }["TopBar.useCallback[handleSave]"], [
        esnafId,
        setSaving,
        setSaveSuccess
    ]);
    const handlePreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TopBar.useCallback[handlePreview]": ()=>{
            window.open(`/sites/${esnafId}`, '_blank');
        }
    }["TopBar.useCallback[handlePreview]"], [
        esnafId
    ]);
    const handlePublish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TopBar.useCallback[handlePublish]": async ()=>{
            setPublishModal('publishing');
            try {
                await fetch('/api/site/guncelle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        esnafId,
                        publish: true
                    })
                });
                setPublishModal('success');
                setTimeout({
                    "TopBar.useCallback[handlePublish]": ()=>setPublishModal('idle')
                }["TopBar.useCallback[handlePublish]"], 3000);
            } catch  {
                setPublishModal('idle');
            }
        }
    }["TopBar.useCallback[handlePublish]"], [
        esnafId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .ke-topbar { background: #fff; display: flex; flex-direction: column; border-bottom: 1px solid #e2e8f0; z-index: 200; user-select: none; font-family: 'Inter', system-ui, sans-serif; }
                .ke-tb-upper { display: flex; align-items: center; justify-content: space-between; height: 46px; padding: 0 12px; border-bottom: 1px solid #e8ecf1; }
                .ke-tb-lower { display: flex; align-items: center; justify-content: space-between; height: 42px; padding: 0 12px; }

                /* Logo */
                .ke-logo { display: flex; align-items: center; gap: 8px; font-weight: 900; font-size: 15px; color: #17191c; letter-spacing: -0.02em; }
                .ke-logo svg { width: 28px; height: 28px; }

                /* Menu bar */
                .ke-menu-bar { display: flex; gap: 4px; margin-left: 16px; }
                .ke-menu-item { padding: 6px 12px; font-size: 13px; font-weight: 500; color: #3b4057; cursor: pointer; border-radius: 6px; transition: background 0.15s; }
                .ke-menu-item:hover { background: #f1f5f9; }

                /* Right buttons */
                .ke-tb-right { display: flex; align-items: center; gap: 8px; }
                .ke-btn { padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; display: flex; align-items: center; gap: 6px; font-family: inherit; }
                .ke-btn-ghost { background: transparent; color: #3b4057; }
                .ke-btn-ghost:hover { background: #f1f5f9; }
                .ke-btn-outline { background: #fff; border: 1px solid #cbd5e1; color: #17191c; }
                .ke-btn-outline:hover { background: #f8fafc; border-color: #94a3b8; }
                .ke-btn-primary { background: #17191c; color: #fff; }
                .ke-btn-primary:hover { background: #2d3142; }
                .ke-btn-publish { background: #3b82f6; color: #fff; }
                .ke-btn-publish:hover { background: #2563eb; }
                .ke-btn-success { background: #22c55e; color: #fff; }
                .ke-btn.disabled { opacity: 0.4; pointer-events: none; }

                /* Lower deck */
                .ke-tb-left-lower { display: flex; align-items: center; gap: 8px; }
                .ke-tb-center-lower { flex: 1; display: flex; justify-content: center; align-items: center; }
                .ke-tb-right-lower { display: flex; align-items: center; gap: 4px; }

                /* Page selector */
                .ke-page-sel { display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 6px; background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; font-size: 13px; font-weight: 500; color: #17191c; position: relative; min-width: 140px; }
                .ke-page-sel:hover { border-color: #94a3b8; }
                .ke-page-label { font-size: 12px; color: #64748b; font-weight: 600; margin-right: 4px; }
                .ke-page-dd { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); margin-top: 4px; z-index: 10; overflow: hidden; }
                .ke-page-dd-item { padding: 8px 12px; font-size: 13px; cursor: pointer; transition: 0.1s; }
                .ke-page-dd-item:hover { background: #eff6ff; color: #2563eb; }
                .ke-page-dd-item.active { background: #eff6ff; color: #2563eb; font-weight: 600; }

                /* Device toggle */
                .ke-device-group { display: flex; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #f8fafc; }
                .ke-device-btn { padding: 6px 10px; border: none; background: transparent; cursor: pointer; color: #64748b; display: flex; align-items: center; transition: 0.15s; }
                .ke-device-btn.active { background: #fff; color: #17191c; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
                .ke-device-btn:hover:not(.active) { color: #334155; }
                .ke-device-btn + .ke-device-btn { border-left: 1px solid #e2e8f0; }

                /* URL bar */
                .ke-url-bar { display: flex; align-items: center; gap: 8px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 16px; border-radius: 8px; min-width: 280px; max-width: 400px; }
                .ke-url-bar svg { color: #64748b; flex-shrink: 0; }
                .ke-url-text { font-size: 12px; color: #475569; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

                /* Undo/Redo */
                .ke-undo-group { display: flex; gap: 2px; }
                .ke-icon-btn { width: 32px; height: 32px; border-radius: 6px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #475569; transition: 0.15s; }
                .ke-icon-btn:hover:not(.disabled) { background: #f1f5f9; color: #17191c; }
                .ke-icon-btn.disabled { opacity: 0.3; cursor: default; }

                /* Zoom */
                .ke-zoom-btn { display: flex; align-items: center; gap: 4px; padding: 5px 10px; border-radius: 6px; border: none; background: transparent; cursor: pointer; font-size: 12px; color: #475569; font-weight: 600; font-family: inherit; transition: 0.15s; }
                .ke-zoom-btn:hover { background: #f1f5f9; }
                .ke-zoom-btn svg { color: #64748b; }

                .ke-separator { width: 1px; height: 24px; background: #e2e8f0; margin: 0 4px; }

                /* Site menu dropdown */
                .ke-site-menu-wrap { position: relative; }
                .ke-site-dd { position: absolute; top: 100%; left: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 12px 32px rgba(0,0,0,0.12); margin-top: 6px; z-index: 100; min-width: 220px; overflow: hidden; animation: keMenuIn 0.15s ease-out; }
                @keyframes keMenuIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
                .ke-site-dd-item { padding: 9px 16px; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: #334155; transition: 0.1s; }
                .ke-site-dd-item:hover { background: #f1f5f9; color: #17191c; }
                .ke-site-dd-item.destructive:hover { background: #fef2f2; color: #ef4444; }
                .ke-site-dd-sep { height: 1px; background: #e2e8f0; margin: 4px 0; }
                .ke-dirty-dot { width: 7px; height: 7px; background: #f59e0b; border-radius: 50%; margin-left: 6px; animation: kePulse 2s infinite; }
                @keyframes kePulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

                @media (max-width: 900px) {
                    .ke-menu-bar, .ke-url-bar { display: none; }
                    .ke-page-sel { min-width: auto; }
                }
            `
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                lineNumber: 93,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-topbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-tb-upper",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/dashboard/sitem",
                                        className: "ke-logo",
                                        title: "Ana Panele Dön",
                                        onClick: (e)=>{
                                            if (isDirty && !confirm('Kaydedilmemiş değişiklikler var. Çıkmak istediğinize emin misiniz?')) e.preventDefault();
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                viewBox: "0 0 28 28",
                                                fill: "none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        width: "28",
                                                        height: "28",
                                                        rx: "6",
                                                        fill: "#17191c"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 66
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M8 8h4.5v12H8V8zm7.5 0H20v12h-4.5V8z",
                                                        fill: "#fff"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 118
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 182,
                                                columnNumber: 29
                                            }, this),
                                            "kepenk",
                                            isDirty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ke-dirty-dot",
                                                title: "Kaydedilmemiş değişiklikler"
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 184,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 181,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-menu-bar",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ke-site-menu-wrap",
                                                ref: siteMenuRef,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "ke-menu-item",
                                                        onClick: ()=>setSiteMenuOpen(!siteMenuOpen),
                                                        children: "Site ▾"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 33
                                                    }, this),
                                                    siteMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "ke-site-dd",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "ke-site-dd-item",
                                                                onClick: ()=>{
                                                                    setSiteMenuOpen(false);
                                                                    handleSave();
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        width: "14",
                                                                        height: "14",
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                                lineNumber: 192,
                                                                                columnNumber: 143
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                                points: "17 21 17 13 7 13 7 21"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                                lineNumber: 192,
                                                                                columnNumber: 214
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                        lineNumber: 192,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    "Kaydet"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                lineNumber: 191,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "ke-site-dd-item",
                                                                onClick: ()=>{
                                                                    setSiteMenuOpen(false);
                                                                    handlePreview();
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        width: "14",
                                                                        height: "14",
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                                lineNumber: 196,
                                                                                columnNumber: 143
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                cx: "12",
                                                                                cy: "12",
                                                                                r: "3"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                                lineNumber: 196,
                                                                                columnNumber: 199
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                        lineNumber: 196,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    "Önizle"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                lineNumber: 195,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "ke-site-dd-item",
                                                                onClick: ()=>{
                                                                    setSiteMenuOpen(false);
                                                                    setPublishModal('confirm');
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        width: "14",
                                                                        height: "14",
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                            lineNumber: 200,
                                                                            columnNumber: 143
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                        lineNumber: 200,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    "Yayınla"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                lineNumber: 199,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "ke-site-dd-sep"
                                                            }, void 0, false, {
                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "ke-site-dd-item",
                                                                onClick: ()=>{
                                                                    setSiteMenuOpen(false);
                                                                    if (!isDirty || confirm('Kaydedilmemiş değişiklikler var. Çıkmak istediğinize emin misiniz?')) router.push('/dashboard/sitem');
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        width: "14",
                                                                        height: "14",
                                                                        viewBox: "0 0 24 24",
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                            lineNumber: 205,
                                                                            columnNumber: 143
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                        lineNumber: 205,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    "Panele Dön"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                                lineNumber: 204,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 187,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ke-menu-item",
                                                children: "Ayarlar"
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 211,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ke-menu-item",
                                                children: "Yardım"
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 212,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 186,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                lineNumber: 180,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-tb-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ke-btn ke-btn-ghost",
                                        style: {
                                            color: '#3b82f6',
                                            fontWeight: 700
                                        },
                                        children: "Yükselt"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 217,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `ke-btn ke-btn-outline${isSaving ? ' disabled' : ''}`,
                                        onClick: handleSave,
                                        children: isSaving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "14",
                                                    height: "14",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2.5",
                                                    style: {
                                                        animation: 'spin 1s linear infinite'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M21 12a9 9 0 11-6.2-8.6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 184
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 35
                                                }, this),
                                                " Kaydediliyor"
                                            ]
                                        }, void 0, true) : saveSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "14",
                                                    height: "14",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "#22c55e",
                                                    strokeWidth: "2.5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                        points: "20 6 9 17 4 12"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 130
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 35
                                                }, this),
                                                " Kaydedildi!"
                                            ]
                                        }, void 0, true) : 'Kaydet'
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 218,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ke-btn ke-btn-primary",
                                        onClick: handlePreview,
                                        children: "Önizle"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 225,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ke-btn ke-btn-publish",
                                        onClick: ()=>setPublishModal('confirm'),
                                        children: "Yayınla"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 226,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                lineNumber: 216,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                        lineNumber: 179,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-tb-lower",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-tb-left-lower",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-page-sel",
                                        onClick: ()=>setPageDropdownOpen(!pageDropdownOpen),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ke-page-label",
                                                children: "Sayfa:"
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 235,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: activePage?.name ?? 'Anasayfa'
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 236,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                style: {
                                                    marginLeft: 'auto'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M6 9l6 6 6-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 158
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 237,
                                                columnNumber: 29
                                            }, this),
                                            pageDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ke-page-dd",
                                                children: pages.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `ke-page-dd-item${p.id === activePageId ? ' active' : ''}`,
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            setActivePageId(p.id);
                                                            setPageDropdownOpen(false);
                                                        },
                                                        children: p.name
                                                    }, p.id, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 239,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 234,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-separator"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 249,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-device-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `ke-device-btn${deviceMode === 'desktop' ? ' active' : ''}`,
                                                onClick: ()=>setDeviceMode('desktop'),
                                                title: "Masaüstü",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 24 18",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fill: "currentColor",
                                                        d: "M19 0H4a2 2 0 00-2 2v9a2 2 0 002 2h7v3H7v1h9v-1h-4v-3h7a2 2 0 002-2V2a2 2 0 00-2-2zm1 11a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1h15a1 1 0 011 1v9z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 81
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 253,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `ke-device-btn${deviceMode === 'mobile' ? ' active' : ''}`,
                                                onClick: ()=>setDeviceMode('mobile'),
                                                title: "Mobil",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 24 18",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fill: "currentColor",
                                                        d: "M15 0a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V2a2 2 0 012-2h7zm0 1H8a1 1 0 00-1 1v14a1 1 0 001 1h7a1 1 0 001-1V2a1 1 0 00-1-1zm-2 13v1h-3v-1h3z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 81
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 256,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 252,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                lineNumber: 232,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-tb-center-lower",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ke-url-bar",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "16",
                                            height: "16",
                                            viewBox: "0 0 18 18",
                                            fill: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M9 16A7 7 0 119 2a7 7 0 010 14zm6-7a5.99 5.99 0 00-.341-2h-1.825c.108.634.166 1.305.166 2 0 .695-.058 1.366-.166 2h1.825A5.99 5.99 0 0015 9z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 264,
                                                columnNumber: 97
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                            lineNumber: 264,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ke-url-text",
                                            children: "www.isletme-adi.kepenk.site"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                            lineNumber: 265,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                    lineNumber: 263,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                lineNumber: 262,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-tb-right-lower",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-undo-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `ke-icon-btn${undoStack.length === 0 ? ' disabled' : ''}`,
                                                onClick: undo,
                                                title: "Geri Al",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 29 29",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fill: "currentColor",
                                                        d: "M14 11H6.83l3-3.33L9.11 7 5 11.51 9.11 16l.74-.68L6.8 12H14a5 5 0 010 10h-2v1h2a6 6 0 100-12z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 81
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 272,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `ke-icon-btn${redoStack.length === 0 ? ' disabled' : ''}`,
                                                onClick: redo,
                                                title: "Yinele",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 29 29",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fill: "currentColor",
                                                        d: "M15 11h7.17l-3-3.33.72-.67L24 11.51 19.89 16l-.74-.68L22.2 12H15a5 5 0 000 10h2v1h-2a6 6 0 110-12z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 81
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 275,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 271,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-separator"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 280,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ke-zoom-btn",
                                        onClick: ()=>setZoom(zoom === 100 ? 50 : zoom === 50 ? 75 : 100),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M11.5,4 C15.643,4 19,7.358 19,11.5 C19,15.642 15.643,19 11.5,19 C7.357,19 4,15.642 4,11.5 C4,7.358 7.357,4 11.5,4Z M12,8 L12,11 L15,11 L15,12 L12,12 L12,15 L11,15 L11,12 L8,12 L8,11 L11,11 L11,8 L12,8Z"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 97
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 284,
                                                columnNumber: 29
                                            }, this),
                                            "%",
                                            zoom
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 283,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-separator"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 288,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ke-zoom-btn",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: "11",
                                                        cy: "11",
                                                        r: "7",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "1.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 97
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                        x1: "16.5",
                                                        y1: "16.5",
                                                        x2: "21",
                                                        y2: "21",
                                                        stroke: "currentColor",
                                                        strokeWidth: "1.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 180
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                lineNumber: 291,
                                                columnNumber: 29
                                            }, this),
                                            "Arama"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                        lineNumber: 290,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                lineNumber: 269,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                        lineNumber: 231,
                        columnNumber: 17
                    }, this),
                    publishModal !== 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                children: `
                            .ke-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 10000; animation: keFadeIn 0.15s; }
                            .ke-modal { background: #fff; border-radius: 16px; padding: 32px; max-width: 420px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.15); text-align: center; animation: keModalIn 0.2s ease-out; }
                            @keyframes keModalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: none; } }
                            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                            .ke-modal-icon { font-size: 3rem; margin-bottom: 16px; }
                            .ke-modal-title { font-size: 18px; font-weight: 800; color: #17191c; margin-bottom: 8px; }
                            .ke-modal-desc { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 24px; }
                            .ke-modal-actions { display: flex; gap: 8px; justify-content: center; }
                        `
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                lineNumber: 300,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-modal-overlay",
                                onClick: ()=>publishModal === 'confirm' && setPublishModal('idle'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ke-modal",
                                    onClick: (e)=>e.stopPropagation(),
                                    children: [
                                        publishModal === 'confirm' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-icon",
                                                    children: "🚀"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-title",
                                                    children: "Siteyi Yayınla"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-desc",
                                                    children: "Siteniz yayınlandığında tüm değişiklikler canlıya alınacak. Devam etmek istiyor musunuz?"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-actions",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "ke-btn ke-btn-outline",
                                                            onClick: ()=>setPublishModal('idle'),
                                                            children: "İptal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "ke-btn ke-btn-publish",
                                                            onClick: handlePublish,
                                                            children: "Evet, Yayınla"
                                                        }, void 0, false, {
                                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        publishModal === 'publishing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-icon",
                                                    style: {
                                                        animation: 'spin 2s linear infinite'
                                                    },
                                                    children: "⚙️"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-title",
                                                    children: "Yayınlanıyor..."
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-desc",
                                                    children: "Siteniz canlıya alınıyor, lütfen bekleyin."
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        publishModal === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-icon",
                                                    children: "🎉"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-title",
                                                    children: "Yayınlandı!"
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 333,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-desc",
                                                    children: "Tebrikler! Siteniz başarıyla yayınlandı."
                                                }, void 0, false, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ke-modal-actions",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "ke-btn ke-btn-outline",
                                                            onClick: ()=>setPublishModal('idle'),
                                                            children: "Kapat"
                                                        }, void 0, false, {
                                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                            lineNumber: 336,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "ke-btn ke-btn-publish",
                                                            onClick: ()=>window.open(`https://isletme-adi.kepenk.site`, '_blank'),
                                                            children: "Siteyi Gör"
                                                        }, void 0, false, {
                                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                    lineNumber: 311,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                                lineNumber: 310,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx",
                lineNumber: 177,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(TopBar, "6kyJYWLhAqhaVJAbVhLvowlYEUA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$context$2f$EsnafContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEsnaf"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TopBar;
var _c;
__turbopack_context__.k.register(_c, "TopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/data/section-templates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SECTION_CATEGORIES",
    ()=>SECTION_CATEGORIES,
    "SECTION_TEMPLATES",
    ()=>SECTION_TEMPLATES,
    "createSectionFromTemplate",
    ()=>createSectionFromTemplate,
    "getTemplatesByCategory",
    ()=>getTemplatesByCategory
]);
const SECTION_CATEGORIES = [
    'Hoş Geldiniz',
    'Hakkında',
    'Ekip',
    'İletişim',
    'Hizmetler',
    'Tanıtım',
    'Müşteri Görüşleri',
    'Galeri',
    'SSS',
    'Alt Bilgi'
];
const SECTION_TEMPLATES = [
    // Hoş Geldiniz
    {
        id: 'hero-welcome',
        type: 'hero',
        category: 'Hoş Geldiniz',
        name: 'Hero Karşılama',
        icon: '🎯',
        description: 'Tam ekran giriş bölümü',
        defaultProps: {
            title: 'İşletmenizin Dijital Vitrini',
            subtitle: 'Profesyonel web sitenizi saniyeler içinde oluşturun',
            buttonText: 'Hemen Başlayın'
        }
    },
    {
        id: 'hero-video',
        type: 'hero-video',
        category: 'Hoş Geldiniz',
        name: 'Video Hero',
        icon: '🎬',
        description: 'Arkaplanda video',
        defaultProps: {
            title: 'Vizyonumuzu Keşfedin',
            videoUrl: ''
        }
    },
    {
        id: 'hero-slider',
        type: 'hero-slider',
        category: 'Hoş Geldiniz',
        name: 'Slayt Hero',
        icon: '🖼️',
        description: 'Otomatik slayt gösterisi',
        defaultProps: {
            slides: 3
        }
    },
    // Hakkında
    {
        id: 'about-basic',
        type: 'about',
        category: 'Hakkında',
        name: 'Hakkımızda',
        icon: '📖',
        description: 'İşletme tanıtım bölümü',
        defaultProps: {
            title: 'Hakkımızda',
            text: 'Yıllardır sektörde edindiğimiz deneyim...'
        }
    },
    {
        id: 'story-timeline',
        type: 'story',
        category: 'Hakkında',
        name: 'Hikayemiz',
        icon: '📜',
        description: 'Zaman çizelgesi ile hikaye',
        defaultProps: {
            title: 'Hikayemiz',
            milestones: 4
        }
    },
    // Ekip
    {
        id: 'team-cards',
        type: 'team',
        category: 'Ekip',
        name: 'Ekibimiz',
        icon: '👥',
        description: 'Ekip üyeleri kartları',
        defaultProps: {
            title: 'Ekibimiz',
            members: 3
        }
    },
    // İletişim
    {
        id: 'contact-form',
        type: 'contact',
        category: 'İletişim',
        name: 'İletişim Formu',
        icon: '📞',
        description: 'İsim, e-posta, mesaj formu',
        defaultProps: {
            title: 'İletişim',
            showMap: false
        }
    },
    {
        id: 'contact-map',
        type: 'map',
        category: 'İletişim',
        name: 'Harita',
        icon: '🗺️',
        description: 'Google Maps entegrasyonu',
        defaultProps: {
            address: 'İstanbul, Türkiye'
        }
    },
    // Hizmetler
    {
        id: 'services-grid',
        type: 'services',
        category: 'Hizmetler',
        name: 'Hizmet Kartları',
        icon: '🔧',
        description: '3 sütunlu hizmet grid',
        defaultProps: {
            title: 'Hizmetlerimiz',
            count: 3
        }
    },
    {
        id: 'features-icons',
        type: 'features',
        category: 'Hizmetler',
        name: 'Özellik Grid',
        icon: '✨',
        description: 'İkon + açıklama özellikler',
        defaultProps: {
            title: 'Özelliklerimiz',
            count: 6
        }
    },
    {
        id: 'pricing-table',
        type: 'pricing',
        category: 'Hizmetler',
        name: 'Fiyat Tablosu',
        icon: '💰',
        description: 'Karşılaştırmalı fiyat planları',
        defaultProps: {
            title: 'Fiyatlandırma',
            plans: 3
        }
    },
    // Tanıtım
    {
        id: 'cta-banner',
        type: 'cta',
        category: 'Tanıtım',
        name: 'Aksiyon Çağrısı',
        icon: '🔥',
        description: 'Büyük başlık + buton',
        defaultProps: {
            title: 'Bugün Başlayın!',
            buttonText: 'Ücretsiz Deneyin'
        }
    },
    {
        id: 'stats-counter',
        type: 'stats',
        category: 'Tanıtım',
        name: 'İstatistikler',
        icon: '📊',
        description: 'Sayaçlı veri bölümü',
        defaultProps: {
            items: 4
        }
    },
    // Müşteri Görüşleri
    {
        id: 'testimonials-cards',
        type: 'testimonials',
        category: 'Müşteri Görüşleri',
        name: 'Müşteri Yorumları',
        icon: '⭐',
        description: 'Yıldızlı yorum kartları',
        defaultProps: {
            title: 'Müşteri Görüşleri',
            count: 3
        }
    },
    // Galeri
    {
        id: 'gallery-masonry',
        type: 'gallery',
        category: 'Galeri',
        name: 'Fotoğraf Galerisi',
        icon: '📷',
        description: 'Masonry fotoğraf grid',
        defaultProps: {
            title: 'Galeri',
            columns: 4
        }
    },
    // SSS
    {
        id: 'faq-accordion',
        type: 'faq',
        category: 'SSS',
        name: 'Sıkça Sorulanlar',
        icon: '❓',
        description: 'Açılır-kapanır sorular',
        defaultProps: {
            title: 'Sık Sorulan Sorular',
            count: 5
        }
    },
    // Alt Bilgi
    {
        id: 'footer-basic',
        type: 'footer',
        category: 'Alt Bilgi',
        name: 'Footer',
        icon: '📋',
        description: 'Site alt bilgi bölümü',
        defaultProps: {
            copyright: '© 2024 İşletme Adı'
        }
    }
];
function createSectionFromTemplate(templateId) {
    const tmpl = SECTION_TEMPLATES.find((t)=>t.id === templateId);
    if (!tmpl) return null;
    return {
        instanceId: `${tmpl.type}-${Date.now()}`,
        templateId: tmpl.id,
        type: tmpl.type,
        name: tmpl.name,
        icon: tmpl.icon,
        visible: true,
        props: {
            ...tmpl.defaultProps
        }
    };
}
function getTemplatesByCategory(category) {
    return SECTION_TEMPLATES.filter((t)=>t.category === category);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LeftBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$data$2f$section$2d$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/data/section-templates.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
;
const LEFT_BAR_ITEMS = [
    {
        id: 'add-element',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 22 22",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "11",
                    cy: "11",
                    r: "10",
                    fill: "#3B82F6"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 8,
                    columnNumber: 93
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M11 6v10M6 11h10",
                    stroke: "#fff",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 8,
                    columnNumber: 140
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
            lineNumber: 8,
            columnNumber: 33
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Öge Ekle'
    },
    {
        id: 'add-section',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 22 22",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "3",
                    y: "3",
                    width: "16",
                    height: "3",
                    rx: "1",
                    fill: "currentColor"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 9,
                    columnNumber: 93
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "3",
                    y: "9",
                    width: "16",
                    height: "5",
                    rx: "1",
                    fill: "currentColor"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 9,
                    columnNumber: 161
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "3",
                    y: "17",
                    width: "16",
                    height: "2",
                    rx: "1",
                    fill: "currentColor"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 9,
                    columnNumber: 229
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
            lineNumber: 9,
            columnNumber: 33
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Bölüm Ekle'
    },
    {
        id: 'layers',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 22 22",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M11 3L20 8l-9 5-9-5 9-5z",
                    fill: "currentColor",
                    opacity: ".7"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 10,
                    columnNumber: 88
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M20 11l-9 5-9-5",
                    stroke: "currentColor",
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 10,
                    columnNumber: 157
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M20 15l-9 5-9-5",
                    stroke: "currentColor",
                    strokeWidth: "1.5"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 10,
                    columnNumber: 224
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
            lineNumber: 10,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Katmanlar'
    },
    {
        id: 'pages',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 22 22",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "4",
                    y: "2",
                    width: "14",
                    height: "18",
                    rx: "2",
                    fill: "currentColor"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 11,
                    columnNumber: 87
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "7",
                    y: "8",
                    width: "8",
                    height: "1.5",
                    rx: ".5",
                    fill: "#fff"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 11,
                    columnNumber: 156
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "7",
                    y: "12",
                    width: "8",
                    height: "1.5",
                    rx: ".5",
                    fill: "#fff"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 11,
                    columnNumber: 218
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
            lineNumber: 11,
            columnNumber: 27
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Sayfalar'
    },
    {
        id: 'design',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 22 22",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "8",
                    cy: "7",
                    r: "4",
                    fill: "#3B82F6"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 12,
                    columnNumber: 88
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "14",
                    cy: "7",
                    r: "4",
                    fill: "#F59E0B"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 12,
                    columnNumber: 132
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "11",
                    cy: "13",
                    r: "4",
                    fill: "#10B981"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 12,
                    columnNumber: 177
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
            lineNumber: 12,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Tasarım'
    },
    {
        id: 'media',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "22",
            height: "22",
            viewBox: "0 0 22 22",
            fill: "none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "2",
                    y: "4",
                    width: "18",
                    height: "14",
                    rx: "2",
                    fill: "currentColor"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 13,
                    columnNumber: 87
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "7.5",
                    cy: "9",
                    r: "1.5",
                    fill: "#fff"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 13,
                    columnNumber: 156
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M2 15l5-4 3 2 5-4 5 4v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-1z",
                    fill: "#fff",
                    opacity: ".6"
                }, void 0, false, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 13,
                    columnNumber: 201
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
            lineNumber: 13,
            columnNumber: 27
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'Medya'
    }
];
function LeftBar() {
    _s();
    const activeLeftPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "LeftBar.useEditorStore[activeLeftPanel]": (s)=>s.activeLeftPanel
    }["LeftBar.useEditorStore[activeLeftPanel]"]);
    const setActiveLeftPanel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "LeftBar.useEditorStore[setActiveLeftPanel]": (s)=>s.setActiveLeftPanel
    }["LeftBar.useEditorStore[setActiveLeftPanel]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .ke-left { display: flex; height: 100%; flex-shrink: 0; }
                .ke-lb-icons { width: 62px; background: #f5f7fa; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; padding: 10px 0; gap: 4px; flex-shrink: 0; }
                .ke-lb-btn { width: 50px; height: 52px; border-radius: 10px; border: none; background: transparent; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; transition: all 0.15s; position: relative; font-family: inherit; color: #64748b; }
                .ke-lb-btn:hover { background: #e8edf3; color: #334155; }
                .ke-lb-btn.active { background: #dbeafe; color: #2563eb; }
                .ke-lb-btn-label { font-size: 9px; font-weight: 700; letter-spacing: -0.01em; max-width: 48px; text-align: center; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; line-height: 1; }

                .ke-lb-panel { width: 310px; background: #fff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; overflow: hidden; animation: keSlideRight 0.2s ease-out; flex-shrink: 0; }
                @keyframes keSlideRight { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
                .ke-lb-panel-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid #e8ecf1; background: #fafbfc; }
                .ke-lb-panel-title { font-size: 14px; font-weight: 700; color: #17191c; }
                .ke-lb-close-btn { width: 28px; height: 28px; border: none; background: transparent; cursor: pointer; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: 0.15s; }
                .ke-lb-close-btn:hover { background: #f1f5f9; color: #17191c; }
                .ke-lb-panel-body { flex: 1; overflow-y: auto; }

                /* Add Section: two-column layout */
                .ke-as-layout { display: flex; height: 100%; }
                .ke-as-cats { width: 110px; border-right: 1px solid #f1f5f9; padding: 12px 0; overflow-y: auto; flex-shrink: 0; background: #fafbfc; }
                .ke-as-cat { padding: 7px 14px; font-size: 12px; font-weight: 500; color: #64748b; cursor: pointer; transition: 0.1s; border-left: 2px solid transparent; }
                .ke-as-cat:hover { color: #334155; background: #f1f5f9; }
                .ke-as-cat.active { color: #2563eb; font-weight: 700; background: #eff6ff; border-left-color: #2563eb; }
                .ke-as-content { flex: 1; padding: 16px; overflow-y: auto; }
                .ke-as-grid { display: flex; flex-direction: column; gap: 10px; }
                .ke-as-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: 0.2s; }
                .ke-as-card:hover { border-color: #93c5fd; background: #eff6ff; transform: translateX(3px); box-shadow: 0 2px 8px rgba(37,99,235,0.06); }
                .ke-as-card-icon { font-size: 24px; width: 40px; height: 40px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .ke-as-card-info { flex: 1; }
                .ke-as-card-name { font-size: 13px; font-weight: 700; color: #17191c; margin-bottom: 2px; }
                .ke-as-card-desc { font-size: 11px; color: #94a3b8; }

                /* Layers panel */
                .ke-layer-list { display: flex; flex-direction: column; gap: 2px; padding: 12px; }
                .ke-layer-item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; cursor: pointer; transition: 0.12s; border: 1px solid transparent; }
                .ke-layer-item:hover { background: #f1f5f9; }
                .ke-layer-item.selected { background: #eff6ff; border-color: #93c5fd; }
                .ke-layer-item.hidden { opacity: 0.4; }
                .ke-layer-grip { color: #d1d5db; cursor: grab; flex-shrink: 0; }
                .ke-layer-icon { font-size: 16px; flex-shrink: 0; }
                .ke-layer-name { font-size: 12px; font-weight: 600; color: #334155; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .ke-layer-vis { width: 22px; height: 22px; border: none; background: transparent; cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: 0.1s; flex-shrink: 0; }
                .ke-layer-vis:hover { background: #e2e8f0; color: #475569; }

                /* Element widgets */
                .ke-el-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 16px; }
                .ke-el-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 8px; text-align: center; cursor: pointer; transition: 0.15s; }
                .ke-el-card:hover { border-color: #93c5fd; background: #eff6ff; transform: translateY(-1px); }
                .ke-el-card-icon { font-size: 24px; margin-bottom: 6px; }
                .ke-el-card-name { font-size: 11px; font-weight: 600; color: #475569; }

                /* Design panel */
                .ke-design-section { padding: 16px; }
                .ke-design-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px; }
                .ke-theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
                .ke-theme-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 10px; cursor: pointer; text-align: center; transition: 0.15s; }
                .ke-theme-card:hover { border-color: #93c5fd; }
                .ke-theme-card.active { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.15); }
                .ke-theme-dots { display: flex; gap: 3px; justify-content: center; margin-bottom: 6px; }
                .ke-theme-dot { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.08); }
                .ke-theme-name { font-size: 10px; font-weight: 600; color: #475569; }

                /* Pages panel */
                .ke-pages-list { display: flex; flex-direction: column; gap: 4px; padding: 12px; }
                .ke-page-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: 0.12s; border: 1px solid transparent; }
                .ke-page-item:hover { background: #f1f5f9; }
                .ke-page-item.active { background: #eff6ff; border-color: #93c5fd; }
                .ke-page-icon { width: 28px; height: 28px; background: #e2e8f0; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
                .ke-page-name { font-size: 13px; font-weight: 600; color: #334155; flex: 1; }
                .ke-page-badge { font-size: 9px; font-weight: 700; color: #94a3b8; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }
                .ke-add-page-btn { margin: 0 12px 12px; padding: 10px; border: 1px dashed #cbd5e1; border-radius: 8px; background: transparent; cursor: pointer; font-size: 12px; font-weight: 600; color: #64748b; display: flex; align-items: center; justify-content: center; gap: 6px; transition: 0.15s; font-family: inherit; }
                .ke-add-page-btn:hover { border-color: #3b82f6; color: #3b82f6; background: #eff6ff; }
            `
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-lb-icons",
                        children: LEFT_BAR_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `ke-lb-btn${activeLeftPanel === item.id ? ' active' : ''}`,
                                onClick: ()=>setActiveLeftPanel(item.id),
                                title: item.label,
                                children: [
                                    item.icon,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ke-lb-btn-label",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 105,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 98,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this),
                    activeLeftPanel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-lb-panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-lb-panel-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ke-lb-panel-title",
                                        children: [
                                            activeLeftPanel === 'add-section' && 'Bölüm Ekleyin',
                                            activeLeftPanel === 'add-element' && 'Öge Ekleyin',
                                            activeLeftPanel === 'layers' && 'Katmanlar',
                                            activeLeftPanel === 'pages' && 'Sayfalar ve Menü',
                                            activeLeftPanel === 'design' && 'Site Tasarımı',
                                            activeLeftPanel === 'media' && 'Medya Yöneticisi'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 113,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "ke-lb-close-btn",
                                        onClick: ()=>setActiveLeftPanel(null),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "16",
                                            height: "16",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M18 6L6 18M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                                lineNumber: 122,
                                                columnNumber: 131
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 122,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 121,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 112,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-lb-panel-body",
                                children: [
                                    activeLeftPanel === 'add-section' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddSectionPanel, {}, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 126,
                                        columnNumber: 67
                                    }, this),
                                    activeLeftPanel === 'add-element' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AddElementPanel, {}, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 127,
                                        columnNumber: 67
                                    }, this),
                                    activeLeftPanel === 'layers' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayersPanel, {}, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 128,
                                        columnNumber: 62
                                    }, this),
                                    activeLeftPanel === 'pages' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PagesPanel, {}, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 129,
                                        columnNumber: 61
                                    }, this),
                                    activeLeftPanel === 'design' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DesignPanel, {}, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 130,
                                        columnNumber: 62
                                    }, this),
                                    activeLeftPanel === 'media' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlaceholderPanel, {
                                        text: "Medya kütüphaneniz",
                                        emoji: "🖼️"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 131,
                                        columnNumber: 61
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 125,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 111,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(LeftBar, "M8BysbCpyQKjYI8aN/+/DpOesKk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c = LeftBar;
/* ═══════ Add Section Panel (Wix-style two-column, draggable) ═══════ */ function AddSectionPanel() {
    _s1();
    const addSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "AddSectionPanel.useEditorStore[addSection]": (s)=>s.addSection
    }["AddSectionPanel.useEditorStore[addSection]"]);
    const startDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "AddSectionPanel.useEditorStore[startDrag]": (s)=>s.startDrag
    }["AddSectionPanel.useEditorStore[startDrag]"]);
    const [activeCat, setActiveCat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$data$2f$section$2d$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_CATEGORIES"][0]);
    const filteredTemplates = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$data$2f$section$2d$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_TEMPLATES"].filter((t)=>t.category === activeCat);
    const handleClick = (tmpl)=>{
        const sec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$data$2f$section$2d$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSectionFromTemplate"])(tmpl.id);
        if (sec) addSection(sec);
    };
    const handlePointerDown = (e, tmpl)=>{
        // Only start drag on left mouse button
        if (e.button !== 0) return;
        e.preventDefault();
        startDrag('catalog', {
            templateId: tmpl.id
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ke-as-layout",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-as-cats",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$data$2f$section$2d$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SECTION_CATEGORIES"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `ke-as-cat${activeCat === cat ? ' active' : ''}`,
                        onClick: ()=>setActiveCat(cat),
                        children: cat
                    }, cat, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 164,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 162,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-as-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#94a3b8',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '12px'
                        },
                        children: activeCat
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 170,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-as-grid",
                        children: filteredTemplates.map((tmpl)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-as-card",
                                onClick: ()=>handleClick(tmpl),
                                onPointerDown: (e)=>handlePointerDown(e, tmpl),
                                style: {
                                    touchAction: 'none'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-as-card-icon",
                                        children: tmpl.icon
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 180,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-as-card-info",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ke-as-card-name",
                                                children: tmpl.name
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                                lineNumber: 182,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ke-as-card-desc",
                                                children: tmpl.description
                                            }, void 0, false, {
                                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                                lineNumber: 183,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 181,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, tmpl.id, true, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 173,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 171,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 169,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
        lineNumber: 161,
        columnNumber: 9
    }, this);
}
_s1(AddSectionPanel, "iZXBR500JFEDLfS1qi+ZZ52C6Nk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c1 = AddSectionPanel;
/* ═══════ Add Element Panel ═══════ */ function AddElementPanel() {
    const ELEMENTS = [
        {
            id: 'text',
            icon: '📝',
            name: 'Metin'
        },
        {
            id: 'image',
            icon: '🖼️',
            name: 'Resim'
        },
        {
            id: 'button',
            icon: '🔘',
            name: 'Buton'
        },
        {
            id: 'divider',
            icon: '➖',
            name: 'Ayırıcı'
        },
        {
            id: 'video',
            icon: '▶️',
            name: 'Video'
        },
        {
            id: 'form',
            icon: '📋',
            name: 'Form'
        },
        {
            id: 'map',
            icon: '🗺️',
            name: 'Harita'
        },
        {
            id: 'social',
            icon: '🔗',
            name: 'Sosyal'
        },
        {
            id: 'menu',
            icon: '☰',
            name: 'Menü'
        },
        {
            id: 'gallery',
            icon: '📷',
            name: 'Galeri'
        },
        {
            id: 'icon',
            icon: '⭐',
            name: 'İkon'
        },
        {
            id: 'embed',
            icon: '</>',
            name: 'Gömüt Kod'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "ke-el-grid",
            children: ELEMENTS.map((el)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ke-el-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ke-el-card-icon",
                            children: el.icon
                        }, void 0, false, {
                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                            lineNumber: 215,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ke-el-card-name",
                            children: el.name
                        }, void 0, false, {
                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                            lineNumber: 216,
                            columnNumber: 25
                        }, this)
                    ]
                }, el.id, true, {
                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                    lineNumber: 214,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
            lineNumber: 212,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
        lineNumber: 211,
        columnNumber: 9
    }, this);
}
_c2 = AddElementPanel;
/* ═══════ Layers Panel ═══════ */ function LayersPanel() {
    _s2();
    const pages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "LayersPanel.useEditorStore[pages]": (s)=>s.pages
    }["LayersPanel.useEditorStore[pages]"]);
    const activePageId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "LayersPanel.useEditorStore[activePageId]": (s)=>s.activePageId
    }["LayersPanel.useEditorStore[activePageId]"]);
    const selectedSectionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "LayersPanel.useEditorStore[selectedSectionId]": (s)=>s.selectedSectionId
    }["LayersPanel.useEditorStore[selectedSectionId]"]);
    const selectSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "LayersPanel.useEditorStore[selectSection]": (s)=>s.selectSection
    }["LayersPanel.useEditorStore[selectSection]"]);
    const toggleSectionVisibility = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "LayersPanel.useEditorStore[toggleSectionVisibility]": (s)=>s.toggleSectionVisibility
    }["LayersPanel.useEditorStore[toggleSectionVisibility]"]);
    const moveSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "LayersPanel.useEditorStore[moveSection]": (s)=>s.moveSection
    }["LayersPanel.useEditorStore[moveSection]"]);
    const sections = pages.find((p)=>p.id === activePageId)?.sections ?? [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '12px 16px 0',
                    fontSize: '11px',
                    color: '#94a3b8',
                    fontWeight: 600
                },
                children: [
                    sections.length,
                    " bölüm"
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 237,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-layer-list",
                children: sections.map((sec, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `ke-layer-item${selectedSectionId === sec.instanceId ? ' selected' : ''}${!sec.visible ? ' hidden' : ''}`,
                        onClick: ()=>selectSection(sec.instanceId),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-layer-grip",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "12",
                                    height: "12",
                                    viewBox: "0 0 12 12",
                                    fill: "currentColor",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "4",
                                            cy: "3",
                                            r: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 246,
                                            columnNumber: 97
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "8",
                                            cy: "3",
                                            r: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 246,
                                            columnNumber: 126
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "4",
                                            cy: "6",
                                            r: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 246,
                                            columnNumber: 155
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "8",
                                            cy: "6",
                                            r: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 246,
                                            columnNumber: 184
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "4",
                                            cy: "9",
                                            r: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 246,
                                            columnNumber: 213
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "8",
                                            cy: "9",
                                            r: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 246,
                                            columnNumber: 242
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                    lineNumber: 246,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 245,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ke-layer-icon",
                                children: sec.icon
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 248,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ke-layer-name",
                                children: sec.name
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 249,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "ke-layer-vis",
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    toggleSectionVisibility(sec.instanceId);
                                },
                                title: sec.visible ? 'Gizle' : 'Göster',
                                children: sec.visible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 252,
                                            columnNumber: 131
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "12",
                                            cy: "12",
                                            r: "3"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                            lineNumber: 252,
                                            columnNumber: 187
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                    lineNumber: 252,
                                    columnNumber: 33
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 254,
                                        columnNumber: 131
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                    lineNumber: 254,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 250,
                                columnNumber: 25
                            }, this)
                        ]
                    }, sec.instanceId, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 240,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 238,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
        lineNumber: 236,
        columnNumber: 9
    }, this);
}
_s2(LayersPanel, "HnBfbgW/4uY8PPro2yPRwyjXSoI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c3 = LayersPanel;
/* ═══════ Pages Panel ═══════ */ function PagesPanel() {
    _s3();
    const pages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "PagesPanel.useEditorStore[pages]": (s)=>s.pages
    }["PagesPanel.useEditorStore[pages]"]);
    const activePageId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "PagesPanel.useEditorStore[activePageId]": (s)=>s.activePageId
    }["PagesPanel.useEditorStore[activePageId]"]);
    const setActivePageId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "PagesPanel.useEditorStore[setActivePageId]": (s)=>s.setActivePageId
    }["PagesPanel.useEditorStore[setActivePageId]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-pages-list",
                children: pages.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `ke-page-item${p.id === activePageId ? ' active' : ''}`,
                        onClick: ()=>setActivePageId(p.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-page-icon",
                                children: "📄"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 275,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ke-page-name",
                                children: p.name
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 276,
                                columnNumber: 25
                            }, this),
                            p.isHome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ke-page-badge",
                                children: "ANA"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 277,
                                columnNumber: 38
                            }, this)
                        ]
                    }, p.id, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 274,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 272,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "ke-add-page-btn",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 5v14M5 12h14"
                        }, void 0, false, {
                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                            lineNumber: 282,
                            columnNumber: 115
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 282,
                        columnNumber: 17
                    }, this),
                    "Yeni Sayfa Ekle"
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 281,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
        lineNumber: 271,
        columnNumber: 9
    }, this);
}
_s3(PagesPanel, "l7XudPupEkxbzBSD6ktdv3JYVX4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c4 = PagesPanel;
/* ═══════ Design Panel ═══════ */ const THEMES = [
    {
        id: 'modern-dark',
        name: 'Modern Koyu',
        colors: [
            '#0f172a',
            '#1e293b',
            '#3b82f6',
            '#f8fafc'
        ]
    },
    {
        id: 'warm-earth',
        name: 'Toprak',
        colors: [
            '#1a1510',
            '#231e16',
            '#c08552',
            '#f5e6d3'
        ]
    },
    {
        id: 'ocean',
        name: 'Okyanus',
        colors: [
            '#0a1628',
            '#0f2035',
            '#06b6d4',
            '#d5eef7'
        ]
    },
    {
        id: 'neon',
        name: 'Neon',
        colors: [
            '#050510',
            '#0a0a1a',
            '#00f5ff',
            '#e0e0ff'
        ]
    },
    {
        id: 'pastel',
        name: 'Pastel',
        colors: [
            '#fdf6f0',
            '#fff8f2',
            '#f472b6',
            '#3d2c2e'
        ]
    },
    {
        id: 'forest',
        name: 'Orman',
        colors: [
            '#0f1d15',
            '#152218',
            '#22c55e',
            '#dcfce7'
        ]
    },
    {
        id: 'sunset',
        name: 'Gün Batımı',
        colors: [
            '#1c0f0a',
            '#2d1810',
            '#f97316',
            '#fff7ed'
        ]
    },
    {
        id: 'royal',
        name: 'Kraliyet',
        colors: [
            '#1a0a2e',
            '#2e1065',
            '#8b5cf6',
            '#ede9fe'
        ]
    }
];
function DesignPanel() {
    _s4();
    const [activeTheme, setActiveTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('modern-dark');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ke-design-section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-design-label",
                children: "Renk Paleti"
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 306,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-theme-grid",
                children: THEMES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `ke-theme-card${activeTheme === t.id ? ' active' : ''}`,
                        onClick: ()=>setActiveTheme(t.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-theme-dots",
                                children: t.colors.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ke-theme-dot",
                                        style: {
                                            background: c
                                        }
                                    }, i, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                        lineNumber: 311,
                                        columnNumber: 53
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 310,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ke-theme-name",
                                children: t.name
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 313,
                                columnNumber: 25
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 309,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 307,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-design-label",
                style: {
                    marginTop: '24px'
                },
                children: "Font Eşleşmesi"
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 318,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                },
                children: [
                    {
                        name: 'Inter + Inter',
                        heading: 'Inter',
                        body: 'Inter'
                    },
                    {
                        name: 'Playfair + Inter',
                        heading: 'Playfair Display',
                        body: 'Inter'
                    },
                    {
                        name: 'Syne + Quicksand',
                        heading: 'Syne',
                        body: 'Quicksand'
                    }
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '10px 12px',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: '0.15s',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: '#334155'
                                },
                                children: f.name
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 326,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '10px',
                                    color: '#94a3b8'
                                },
                                children: "Aa"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                                lineNumber: 327,
                                columnNumber: 25
                            }, this)
                        ]
                    }, f.name, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                        lineNumber: 325,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 319,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
        lineNumber: 305,
        columnNumber: 9
    }, this);
}
_s4(DesignPanel, "6eRCkjQ5jC8H4KfK7kMqOSlh5R4=");
_c5 = DesignPanel;
/* ═══════ Placeholder Panel ═══════ */ function PlaceholderPanel({ text, emoji }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            textAlign: 'center',
            padding: '48px 20px',
            color: '#94a3b8'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '2.5rem',
                    marginBottom: '12px'
                },
                children: emoji
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 339,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#475569',
                    marginBottom: '4px'
                },
                children: text
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 340,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '12px'
                },
                children: "Yakında burada olacak."
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
                lineNumber: 341,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx",
        lineNumber: 338,
        columnNumber: 9
    }, this);
}
_c6 = PlaceholderPanel;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "LeftBar");
__turbopack_context__.k.register(_c1, "AddSectionPanel");
__turbopack_context__.k.register(_c2, "AddElementPanel");
__turbopack_context__.k.register(_c3, "LayersPanel");
__turbopack_context__.k.register(_c4, "PagesPanel");
__turbopack_context__.k.register(_c5, "DesignPanel");
__turbopack_context__.k.register(_c6, "PlaceholderPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Canvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Canvas() {
    _s();
    const deviceMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "Canvas.useEditorStore[deviceMode]": (s)=>s.deviceMode
    }["Canvas.useEditorStore[deviceMode]"]);
    const zoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "Canvas.useEditorStore[zoom]": (s)=>s.zoom
    }["Canvas.useEditorStore[zoom]"]);
    const generatedHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "Canvas.useEditorStore[generatedHtml]": (s)=>s.generatedHtml
    }["Canvas.useEditorStore[generatedHtml]"]);
    const siteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "Canvas.useEditorStore[siteData]": (s)=>s.siteData
    }["Canvas.useEditorStore[siteData]"]);
    const iframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stageWidth = deviceMode === 'desktop' ? 980 : deviceMode === 'tablet' ? 768 : 375;
    /* Sync srcdoc when generatedHtml changes */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Canvas.useEffect": ()=>{
            if (iframeRef.current && generatedHtml) {
                iframeRef.current.srcdoc = generatedHtml;
            }
        }
    }["Canvas.useEffect"], [
        generatedHtml
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
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
            `
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-canvas",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-canvas-scroll",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ke-stage",
                            style: {
                                width: `${stageWidth}px`,
                                height: 'calc(100vh - 100px)',
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: 'top center'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ke-device-frame",
                                    children: [
                                        deviceMode === 'desktop' ? '💻 Masaüstü' : deviceMode === 'tablet' ? '📱 Tablet' : '📱 Mobil',
                                        ' · ',
                                        stageWidth,
                                        "px"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                                    lineNumber: 118,
                                    columnNumber: 25
                                }, this),
                                generatedHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    ref: iframeRef,
                                    title: "Site Önizleme",
                                    sandbox: "allow-same-origin allow-scripts",
                                    srcDoc: generatedHtml,
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        border: 'none'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                                    lineNumber: 124,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ke-empty",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ke-empty-icon",
                                            children: "🎨"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                                            lineNumber: 133,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ke-empty-title",
                                            children: "Site Önizlemesi"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                                            lineNumber: 134,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ke-empty-desc",
                                            children: siteData ? 'HTML oluşturuluyor...' : 'Sektör bilgileriniz yükleniyor. Sol panelden düzenlemeye başlayabilirsiniz.'
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                                            lineNumber: 135,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ke-empty-hint",
                                            children: "Editör demo sayfanızı gerçek zamanlı gösterecek"
                                        }, void 0, false, {
                                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                                            lineNumber: 141,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                                    lineNumber: 132,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                            lineNumber: 111,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                        lineNumber: 110,
                        columnNumber: 17
                    }, this),
                    zoom !== 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-zoom-info",
                        children: [
                            zoom,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                        lineNumber: 148,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx",
                lineNumber: 109,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(Canvas, "/+mtSdZiK5Q/f4o4VS+RKvZELDk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c = Canvas;
var _c;
__turbopack_context__.k.register(_c, "Canvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/data/demoVitrinData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * demoVitrinData.ts — 40 Sektör Demo Verisi + srcdoc Template Generator
 */ __turbopack_context__.s([
    "DEMOLAR",
    ()=>DEMOLAR,
    "KATEGORILER",
    ()=>KATEGORILER,
    "srcdocUret",
    ()=>srcdocUret
]);
const KATEGORILER = {
    'yerel-esnaf': {
        ad: 'Yerel Esnaf',
        sayi: 19
    },
    'profesyonel': {
        ad: 'Profesyonel',
        sayi: 11
    },
    'saglik-guzellik': {
        ad: 'Sağlık & Güzellik',
        sayi: 11
    },
    'etkinlik': {
        ad: 'Etkinlik',
        sayi: 1
    }
};
const DEMOLAR = [
    // ── YEREL ESNAF ──
    {
        id: 1,
        ad: 'Restoran & Lokanta',
        kategori: 'yerel-esnaf',
        bg: '#1e0f05',
        accent: '#c2440e',
        text: '#f5ede0',
        font: 'Cormorant Garamond',
        unsplash: 'photo-1414235077428-338989a2e8c0',
        heroBaslik: 'Ocakbaşı Sofrası',
        heroAlt: 'Büyükannenin tarifi, şefin elinden',
        hizmetler: [
            'Başlangıçlar',
            'Ana Yemekler',
            'Tatlılar'
        ]
    },
    {
        id: 2,
        ad: 'Kafe & Coffee Shop',
        kategori: 'yerel-esnaf',
        bg: '#faf4ed',
        accent: '#c2773a',
        text: '#2c1a0e',
        font: 'Playfair Display',
        unsplash: 'photo-1509042239860-f550ce710b93',
        heroBaslik: 'Filtre & Köpük',
        heroAlt: 'Her yudumda bir hikaye',
        hizmetler: [
            'Filtre Kahve',
            'Tatlılar',
            'Kahvaltı'
        ]
    },
    {
        id: 3,
        ad: 'Fırın & Pastane',
        kategori: 'yerel-esnaf',
        bg: '#fffdf7',
        accent: '#e8a030',
        text: '#3b2507',
        font: 'Abril Fatface',
        unsplash: 'photo-1509440159596-0249088772ff',
        heroBaslik: 'Un & Sıcaklık Pastanesi',
        heroAlt: 'Sabahın ilk ışığında pişer',
        hizmetler: [
            'Ekmekler',
            'Börekler',
            'Özel Pasta'
        ]
    },
    {
        id: 4,
        ad: 'Berber & Kuaför',
        kategori: 'yerel-esnaf',
        bg: '#0d0d0d',
        accent: '#b8960c',
        text: '#f2f2f2',
        font: 'Bebas Neue',
        unsplash: 'photo-1503951914875-452162b0f3f1',
        heroBaslik: 'Tıraş Atölyesi',
        heroAlt: 'Klasik tıraş, modern adam',
        hizmetler: [
            'Saç Kesimi',
            'Sakal',
            'Cilt Bakımı'
        ]
    },
    {
        id: 5,
        ad: 'Kadın Kuaförü',
        kategori: 'yerel-esnaf',
        bg: '#fdf8f9',
        accent: '#d4709a',
        text: '#2d1527',
        font: 'Cormorant',
        unsplash: 'photo-1560066984-138dadb4c035',
        heroBaslik: 'Papatya Güzellik Salonu',
        heroAlt: 'Güzelliğin en doğal hali',
        hizmetler: [
            'Saç',
            'Manikür',
            'Cilt Bakımı'
        ]
    },
    {
        id: 6,
        ad: 'Çiçekçi',
        kategori: 'yerel-esnaf',
        bg: '#f9f5f0',
        accent: '#c9856a',
        text: '#1a2e1c',
        font: 'Gilda Display',
        unsplash: 'photo-1487530811176-3780de880c2d',
        heroBaslik: 'Tomurcuk Floral',
        heroAlt: 'Her duygu bir çiçek kadar güzel',
        hizmetler: [
            'Günlük Buket',
            'Düğün',
            'Abonelik'
        ]
    },
    {
        id: 7,
        ad: 'Kasap & Et Market',
        kategori: 'yerel-esnaf',
        bg: '#fafaf8',
        accent: '#c53030',
        text: '#1c0a08',
        font: 'Syne',
        unsplash: 'photo-1607623814075-e51df1bdc82f',
        heroBaslik: 'Öz Anadolu Kasabı',
        heroAlt: 'Kökten gelen lezzet',
        hizmetler: [
            'Dana',
            'Kuzu',
            'Şarküteri'
        ]
    },
    {
        id: 8,
        ad: 'Kuru Temizleme',
        kategori: 'yerel-esnaf',
        bg: '#f0f8ff',
        accent: '#2e86de',
        text: '#0a2a4a',
        font: 'Outfit',
        unsplash: 'photo-1545173168-9f1947eebb7f',
        heroBaslik: 'Tertemiz Laundry',
        heroAlt: 'Kıyafetlerin en iyi hali',
        hizmetler: [
            'Yıkama',
            'Kuru Temizleme',
            'Express'
        ]
    },
    {
        id: 9,
        ad: 'Oto Servis',
        kategori: 'yerel-esnaf',
        bg: '#111111',
        accent: '#e63946',
        text: '#f5f5f5',
        font: 'Barlow Condensed',
        unsplash: 'photo-1486262715619-67b85e0b08d3',
        heroBaslik: 'Şahin Oto Merkezi',
        heroAlt: 'Aracın güvencesi, yolun ustası',
        hizmetler: [
            'Motor Bakım',
            'Kaporta',
            'Lastik'
        ]
    },
    {
        id: 10,
        ad: 'Elektrikçi & Tesisatçı',
        kategori: 'yerel-esnaf',
        bg: '#0a0a1a',
        accent: '#f5a623',
        text: '#e8e8f0',
        font: 'Rajdhani',
        unsplash: 'photo-1621905251189-08b45d6a269e',
        heroBaslik: 'Voltaj Teknik',
        heroAlt: '7/24 arızaya hazır',
        hizmetler: [
            'Elektrik',
            'Tesisat',
            'Doğalgaz'
        ]
    },
    {
        id: 11,
        ad: 'Mobilya & Dekorasyon',
        kategori: 'yerel-esnaf',
        bg: '#f7f3ee',
        accent: '#8b6f47',
        text: '#2a1f14',
        font: 'Fraunces',
        unsplash: 'photo-1555041469-a586c61ea9bc',
        heroBaslik: 'Form & Doku Mobilya',
        heroAlt: 'Yaşayan mekânlar, anlatılan hikayeler',
        hizmetler: [
            'Oturma Odası',
            'Yatak Odası',
            'Ofis'
        ]
    },
    {
        id: 12,
        ad: 'Terzi & Atölye',
        kategori: 'yerel-esnaf',
        bg: '#f8f5f0',
        accent: '#c9a84c',
        text: '#1e1b2e',
        font: 'Libre Baskerville',
        unsplash: 'photo-1558618666-fcd25c85f82e',
        heroBaslik: 'İnce İş Atölyesi',
        heroAlt: 'Her dikişte özen',
        hizmetler: [
            'Özel Dikim',
            'Tamir',
            'Nakış'
        ]
    },
    {
        id: 13,
        ad: 'Kırtasiye & Baskı',
        kategori: 'yerel-esnaf',
        bg: '#eae2b7',
        accent: '#003049',
        text: '#1a1a1a',
        font: 'Space Mono',
        unsplash: 'photo-1513364776144-60967b0f800f',
        heroBaslik: 'Nokta Baskı & Kırtasiye',
        heroAlt: 'Fikirleriniz kağıda dökülür',
        hizmetler: [
            'Dijital Baskı',
            'Kartvizit',
            'Ciltleme'
        ]
    },
    {
        id: 14,
        ad: 'Eczane',
        kategori: 'yerel-esnaf',
        bg: '#f1fffe',
        accent: '#00897b',
        text: '#004d40',
        font: 'Nunito',
        unsplash: 'photo-1631549916768-4119b2e5f926',
        heroBaslik: 'Sağlık Köşesi Eczanesi',
        heroAlt: 'Sağlığınız bizim önceliğimiz',
        hizmetler: [
            'Reçeteli İlaç',
            'Takviye',
            'Kozmetik'
        ]
    },
    // ── PROFESYONEL ──
    {
        id: 15,
        ad: 'Hukuk Bürosu',
        kategori: 'profesyonel',
        bg: '#f5f4f0',
        accent: '#c9a84c',
        text: '#1c2b3a',
        font: 'Libre Baskerville',
        unsplash: 'photo-1589829545856-d10d557cf95f',
        heroBaslik: 'Karaağaç Hukuk Bürosu',
        heroAlt: 'Haklarınız güçlü ellerde',
        hizmetler: [
            'Ceza Hukuku',
            'Aile Hukuku',
            'Ticaret Hukuku'
        ]
    },
    {
        id: 16,
        ad: 'Mali Müşavirlik',
        kategori: 'profesyonel',
        bg: '#f0f4f8',
        accent: '#2d8653',
        text: '#0f2044',
        font: 'Montserrat',
        unsplash: 'photo-1554224155-6726b3ff858f',
        heroBaslik: 'Güven Mali Müşavirlik',
        heroAlt: 'Rakamların arkasında güvenilir bir el',
        hizmetler: [
            'Vergi',
            'Bordro',
            'Şirket Kuruluşu'
        ]
    },
    {
        id: 17,
        ad: 'Mimarlık Ofisi',
        kategori: 'profesyonel',
        bg: '#f5f0eb',
        accent: '#c07941',
        text: '#1a1a1a',
        font: 'Syne',
        unsplash: 'photo-1487958449943-2429e8be8625',
        heroBaslik: 'Küp Mimarlık Atölyesi',
        heroAlt: 'Boşluğu anlama, mekânı dönüştürme',
        hizmetler: [
            'Konut',
            'Ticari',
            'Tadilat'
        ]
    },
    {
        id: 18,
        ad: 'Mühendislik',
        kategori: 'profesyonel',
        bg: '#0b1929',
        accent: '#00bcd4',
        text: '#e0f7fa',
        font: 'Exo 2',
        unsplash: 'photo-1581092160607-ee22621dd758',
        heroBaslik: 'Tekno Çözüm Mühendislik',
        heroAlt: 'Kompleks sorunlar, akıllı çözümler',
        hizmetler: [
            'Proje Yönetimi',
            'Yapı Denetimi',
            'Enerji'
        ]
    },
    {
        id: 19,
        ad: 'Sigorta Acentesi',
        kategori: 'profesyonel',
        bg: '#f8f9fa',
        accent: '#e87722',
        text: '#1a3a5c',
        font: 'Raleway',
        unsplash: 'photo-1450101499163-c8848c66ca85',
        heroBaslik: 'Kalkan Sigorta',
        heroAlt: 'Her riske karşı güvende olun',
        hizmetler: [
            'Kasko',
            'Sağlık',
            'Konut Sigortası'
        ]
    },
    {
        id: 20,
        ad: 'Emlak Ofisi',
        kategori: 'profesyonel',
        bg: '#f9f7f2',
        accent: '#d4af37',
        text: '#1b2838',
        font: 'Playfair Display',
        unsplash: 'photo-1560518883-ce09059eeffa',
        heroBaslik: 'Köşe Taşı Emlak',
        heroAlt: 'Doğru adres, doğru zaman',
        hizmetler: [
            'Satılık',
            'Kiralık',
            'Ticari'
        ]
    },
    {
        id: 21,
        ad: 'Dijital Ajans',
        kategori: 'profesyonel',
        bg: '#0a0a0f',
        accent: '#7c3aed',
        text: '#f0e6ff',
        font: 'Space Grotesk',
        unsplash: 'photo-1460925895917-afdab827c52f',
        heroBaslik: 'Pulse Digital Ajans',
        heroAlt: 'Markanı büyüt, rakiplerine bak',
        hizmetler: [
            'SEO',
            'Meta Ads',
            'Web Tasarım'
        ]
    },
    {
        id: 22,
        ad: 'Dershane & Kurs',
        kategori: 'profesyonel',
        bg: '#f0f4ff',
        accent: '#4f46e5',
        text: '#1a2744',
        font: 'Nunito',
        unsplash: 'photo-1524178232363-1fb2b075b655',
        heroBaslik: 'Zirve Eğitim Merkezi',
        heroAlt: 'Başarı bir adım ötede',
        hizmetler: [
            'YKS',
            'KPSS',
            'İngilizce'
        ]
    },
    {
        id: 23,
        ad: 'Tercüme Bürosu',
        kategori: 'profesyonel',
        bg: '#ecf0f1',
        accent: '#e74c3c',
        text: '#2c3e50',
        font: 'Josefin Sans',
        unsplash: 'photo-1456513080510-7bf3a84b82f8',
        heroBaslik: 'Lingua Çeviri Akademisi',
        heroAlt: 'Diller arasında köprü kuruyoruz',
        hizmetler: [
            'Noterli Çeviri',
            'Simultane',
            'Dil Kursları'
        ]
    },
    {
        id: 24,
        ad: 'Fotoğrafçı',
        kategori: 'profesyonel',
        bg: '#111111',
        accent: '#ff6b35',
        text: '#f5f5f5',
        font: 'Oswald',
        unsplash: 'photo-1471341971476-ae15ff5dd4ea',
        heroBaslik: 'Kare Prodüksiyon',
        heroAlt: 'Her anı sanat eserine dönüştürün',
        hizmetler: [
            'Düğün',
            'Kurumsal',
            'Ürün Çekimi'
        ]
    },
    {
        id: 25,
        ad: 'Yazılım Şirketi',
        kategori: 'profesyonel',
        bg: '#030712',
        accent: '#10b981',
        text: '#f0fdf4',
        font: 'Inter',
        unsplash: 'photo-1461749280684-dccba630e2f6',
        heroBaslik: 'Nexus Yazılım',
        heroAlt: 'Kodu değil, çözümü teslim ederiz',
        hizmetler: [
            'Web',
            'Mobil App',
            'API Geliştirme'
        ]
    },
    // ── SAĞLIK & GÜZELLİK ──
    {
        id: 26,
        ad: 'Diş Kliniği',
        kategori: 'saglik-guzellik',
        bg: '#f0fbf9',
        accent: '#00c9a7',
        text: '#0d4f7c',
        font: 'Poppins',
        unsplash: 'photo-1629909613654-28e377c37b09',
        heroBaslik: 'Beyaz Gülüş Polikliniği',
        heroAlt: 'Sağlıklı dişler, özgür gülüşler',
        hizmetler: [
            'İmplant',
            'Ortodonti',
            'Beyazlatma'
        ]
    },
    {
        id: 27,
        ad: 'Özel Klinik',
        kategori: 'saglik-guzellik',
        bg: '#f4fbfc',
        accent: '#4db8d4',
        text: '#1a3a4a',
        font: 'Outfit',
        unsplash: 'photo-1519494026892-80bbd2d6fd0d',
        heroBaslik: 'Anadolu Sağlık Kliniği',
        heroAlt: 'Sağlığınız profesyonel ellerde',
        hizmetler: [
            'Dahiliye',
            'Kardiyoloji',
            'Check-Up'
        ]
    },
    {
        id: 28,
        ad: 'Fizyoterapi',
        kategori: 'saglik-guzellik',
        bg: '#f0faf4',
        accent: '#52b788',
        text: '#1b4332',
        font: 'Nunito',
        unsplash: 'photo-1576091160550-2173dba999ef',
        heroBaslik: 'Hareket Fizyoterapi',
        heroAlt: 'Ağrıdan harekete, hareketten özgürlüğe',
        hizmetler: [
            'Manuel Terapi',
            'Sporcu Rehab',
            'Skolyoz'
        ]
    },
    {
        id: 29,
        ad: 'Diyetisyen',
        kategori: 'saglik-guzellik',
        bg: '#f6fbf0',
        accent: '#7bc950',
        text: '#2d4a22',
        font: 'Quicksand',
        unsplash: 'photo-1512621776951-a57141f2eefd',
        heroBaslik: 'Denge Beslenme Danışmanlığı',
        heroAlt: 'Sağlıklı vücut, dengeli yaşam',
        hizmetler: [
            'Kilo Yönetimi',
            'Sporcu Beslenmesi',
            'Online'
        ]
    },
    {
        id: 30,
        ad: 'Spor Salonu',
        kategori: 'saglik-guzellik',
        bg: '#0a0a0a',
        accent: '#ff3c00',
        text: '#ffffff',
        font: 'Anton',
        unsplash: 'photo-1534438327276-14e5300c3a48',
        heroBaslik: 'Iron Force Gym',
        heroAlt: 'Limitlerini zorla, kendinle kazan',
        hizmetler: [
            'Kişisel Antrenman',
            'Grup Dersi',
            'Beslenme'
        ]
    },
    {
        id: 31,
        ad: 'Yoga & Pilates',
        kategori: 'saglik-guzellik',
        bg: '#e7f6f2',
        accent: '#4a9e8e',
        text: '#2c3639',
        font: 'Cormorant Garamond',
        unsplash: 'photo-1544367567-0f2fcb009e0b',
        heroBaslik: 'Nefes Yoga Stüdyo',
        heroAlt: 'Bedenini dinle, zihnini özgür bırak',
        hizmetler: [
            'Hatha',
            'Vinyasa',
            'Reformer Pilates'
        ]
    },
    {
        id: 32,
        ad: 'Estetik Kliniği',
        kategori: 'saglik-guzellik',
        bg: '#fdf6f6',
        accent: '#c9a0a0',
        text: '#1a0f12',
        font: 'Gilda Display',
        unsplash: 'photo-1570172619644-dfd03ed5d881',
        heroBaslik: 'Aura Estetik Kliniği',
        heroAlt: 'Doğal güzelliğini keşfet',
        hizmetler: [
            'Botoks',
            'Dolgu',
            'Lazer Epilasyon'
        ]
    },
    {
        id: 33,
        ad: 'Psikolog',
        kategori: 'saglik-guzellik',
        bg: '#f5f7fb',
        accent: '#7b9bb8',
        text: '#2e3250',
        font: 'Lora',
        unsplash: 'photo-1573497019940-1c28c88b4f3e',
        heroBaslik: 'Güvenli Alan Psikoloji',
        heroAlt: 'Dinlenecek biri var, yardım alınabilir',
        hizmetler: [
            'Bireysel Terapi',
            'Çift Terapisi',
            'Online Seans'
        ]
    },
    {
        id: 34,
        ad: 'Veteriner Kliniği',
        kategori: 'saglik-guzellik',
        bg: '#fff8f2',
        accent: '#f4a261',
        text: '#1b3a4b',
        font: 'Nunito',
        unsplash: 'photo-1548199973-03cce0bbc87b',
        heroBaslik: 'Patici Veteriner Kliniği',
        heroAlt: 'Dostlarınıza en iyi bakım',
        hizmetler: [
            'Aşı',
            'Ameliyat',
            'Otelcilik'
        ]
    },
    {
        id: 35,
        ad: 'Masaj & Spa',
        kategori: 'saglik-guzellik',
        bg: '#f4f1eb',
        accent: '#8b7355',
        text: '#2c2418',
        font: 'Cormorant Garamond',
        unsplash: 'photo-1544161515-4ab6ce6db874',
        heroBaslik: 'Serenity Spa',
        heroAlt: 'Bedeninize huzur, zihninize dinlenme',
        hizmetler: [
            'Aromaterapi',
            'Taş Masajı',
            'Çift Masajı'
        ]
    },
    // ── YENİ YEREL ESNAF ──
    {
        id: 36,
        ad: 'Oto Yıkama',
        kategori: 'yerel-esnaf',
        bg: '#0c1a2e',
        accent: '#38bdf8',
        text: '#e0f2fe',
        font: 'Exo 2',
        unsplash: 'photo-1520340356584-f9917d1eea6f',
        heroBaslik: 'Aqua Clean Oto Yıkama',
        heroAlt: 'Aracınıza showroom parlaklığı',
        hizmetler: [
            'İç Temizlik',
            'Pasta Cila',
            'Detaylı Yıkama'
        ]
    },
    {
        id: 37,
        ad: 'Nakliyeci',
        kategori: 'yerel-esnaf',
        bg: '#1a0f05',
        accent: '#f59e0b',
        text: '#fef3c7',
        font: 'Barlow Condensed',
        unsplash: 'photo-1586528116311-ad8dd3c8310d',
        heroBaslik: 'Güven Nakliyat',
        heroAlt: 'Taşınmak artık stressiz',
        hizmetler: [
            'Ev Taşıma',
            'Ofis Taşıma',
            'Depolama'
        ]
    },
    {
        id: 38,
        ad: 'Temizlik Şirketi',
        kategori: 'yerel-esnaf',
        bg: '#f0fdf4',
        accent: '#22c55e',
        text: '#14532d',
        font: 'Nunito',
        unsplash: 'photo-1581578731548-c64695cc6952',
        heroBaslik: 'Pırıl Temizlik',
        heroAlt: 'Profesyonel temizlik garantisi',
        hizmetler: [
            'Ev Temizliği',
            'Ofis',
            'Dezenfeksiyon'
        ]
    },
    {
        id: 39,
        ad: 'Boyacı',
        kategori: 'yerel-esnaf',
        bg: '#fdf6e3',
        accent: '#d97706',
        text: '#451a03',
        font: 'Outfit',
        unsplash: 'photo-1562259929-b4e1fd3aef09',
        heroBaslik: 'Renk Ustası Boya',
        heroAlt: 'Mekanınıza renk katıyoruz',
        hizmetler: [
            'İç Cephe',
            'Dış Cephe',
            'Dekoratif Boya'
        ]
    },
    {
        id: 40,
        ad: 'Camcı',
        kategori: 'yerel-esnaf',
        bg: '#f0f9ff',
        accent: '#0284c7',
        text: '#0c4a6e',
        font: 'Raleway',
        unsplash: 'photo-1596079890744-c1a0462d0975',
        heroBaslik: 'Kristal Cam',
        heroAlt: 'Cam ve pencere çözümleri',
        hizmetler: [
            'Cam Balkon',
            'Isıcam',
            'Ayna Kesimi'
        ]
    },
    // ── ETKİNLİK ──
    {
        id: 41,
        ad: 'Organizasyon & Düğün',
        kategori: 'etkinlik',
        bg: '#1a0a2e',
        accent: '#a855f7',
        text: '#f5f3ff',
        font: 'Playfair Display',
        unsplash: 'photo-1519741497674-611481863552',
        heroBaslik: 'Peri Masalı Organizasyon',
        heroAlt: 'Unutulmaz anlar, kusursuz organizasyon',
        hizmetler: [
            'Düğün',
            'Nişan',
            'Kurumsal'
        ]
    }
];
// ── srcdoc Template Generator ──────────────────────────────────────────────
function isDark(bg) {
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 < 128;
}
function srcdocUret(d) {
    const dark = isDark(d.bg);
    const navBg = dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.85)';
    const navBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
    const cardBg = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
    const cardBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const subText = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
    const footBg = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
    const hizmetIkonlar = [
        '🎯',
        '⭐',
        '💎'
    ];
    return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:wght@400;600;700;800;900&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'${d.font}',sans-serif;background:${d.bg};color:${d.text};overflow-x:hidden}a{color:inherit;text-decoration:none}.nav{position:sticky;top:0;z-index:50;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;background:${navBg};backdrop-filter:blur(12px);border-bottom:1px solid ${navBorder}}.nav-logo{font-size:1.5rem;font-weight:900;letter-spacing:-0.03em}.nav-links{display:flex;gap:28px;font-size:0.95rem;font-weight:500;color:${subText}}.hero{position:relative;min-height:85vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:80px 40px;overflow:hidden}.hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/${d.unsplash}?w=1440&q=75&auto=format') center/cover no-repeat}.hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,${d.bg}cc 0%,${d.bg}99 40%,${d.bg}ee 100%)}.hero-content{position:relative;z-index:2;max-width:800px}.hero h1{font-size:4rem;font-weight:900;line-height:1.05;margin-bottom:20px;letter-spacing:-0.03em}.hero p{font-size:1.3rem;color:${subText};margin-bottom:40px;line-height:1.6}.hero .cta{display:inline-flex;gap:12px}.hero .btn{padding:16px 36px;border-radius:10px;font-weight:700;font-size:1rem;border:none;cursor:pointer;transition:transform 0.2s}.btn-primary{background:${d.accent};color:#fff}.btn-outline{background:transparent;border:1.5px solid ${d.accent};color:${d.accent}}.services{padding:100px 48px;max-width:1200px;margin:0 auto}.services h2{font-size:2.5rem;font-weight:800;text-align:center;margin-bottom:60px}.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}.service-card{background:${cardBg};border:1px solid ${cardBorder};border-radius:18px;padding:40px 32px;text-align:center;transition:transform 0.3s}.service-card:hover{transform:translateY(-6px)}.service-card .icon{font-size:2.5rem;margin-bottom:16px}.service-card h3{font-size:1.3rem;font-weight:700;margin-bottom:10px}.service-card p{font-size:0.9rem;color:${subText};line-height:1.6}.testimonial{padding:80px 48px;text-align:center;background:${footBg}}.testimonial blockquote{max-width:600px;margin:0 auto;font-size:1.2rem;font-style:italic;line-height:1.7;color:${subText}}.testimonial .author{margin-top:20px;font-weight:700;font-size:0.95rem}.footer{padding:30px 48px;text-align:center;font-size:0.85rem;color:${subText};border-top:1px solid ${cardBorder}}</style></head><body><nav class="nav"><div class="nav-logo">${d.heroBaslik.split(' ')[0]}<span style="color:${d.accent}">.</span></div><div class="nav-links"><a>Anasayfa</a><a>Hizmetler</a><a>Hakkımızda</a><a>İletişim</a></div></nav><section class="hero"><div class="hero-bg"></div><div class="hero-overlay"></div><div class="hero-content"><h1>${d.heroBaslik}</h1><p>${d.heroAlt}</p><div class="cta"><button class="btn btn-primary">Randevu Al</button><button class="btn btn-outline">Bizi Arayın</button></div></div></section><section class="services"><h2>Hizmetlerimiz</h2><div class="services-grid">${d.hizmetler.map((h, i)=>`<div class="service-card"><div class="icon">${hizmetIkonlar[i]}</div><h3>${h}</h3><p>Alanında uzman ekibimizle profesyonel ${h.toLowerCase()} hizmeti sunuyoruz.</p></div>`).join('')}</div></section><section class="testimonial"><blockquote>"Harika bir deneyimdi. Profesyonel kadroları ve kaliteli hizmetleriyle her zaman tercihim olacak."</blockquote><div class="author">— Mehmet K. ⭐⭐⭐⭐⭐</div></section><footer class="footer">© 2025 ${d.heroBaslik} · Powered by kepenk.ai</footer></body></html>`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RightPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/data/demoVitrinData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
function RightPanel() {
    _s();
    const siteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "RightPanel.useEditorStore[siteData]": (s)=>s.siteData
    }["RightPanel.useEditorStore[siteData]"]);
    const updateSiteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "RightPanel.useEditorStore[updateSiteData]": (s)=>s.updateSiteData
    }["RightPanel.useEditorStore[updateSiteData]"]);
    const rightPanelOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "RightPanel.useEditorStore[rightPanelOpen]": (s)=>s.rightPanelOpen
    }["RightPanel.useEditorStore[rightPanelOpen]"]);
    const setRightPanelOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "RightPanel.useEditorStore[setRightPanelOpen]": (s)=>s.setRightPanelOpen
    }["RightPanel.useEditorStore[setRightPanelOpen]"]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('genel');
    if (!rightPanelOpen || !siteData) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .ke-rp { width: 320px; background: #fff; border-left: 1px solid #e2e8f0; display: flex; flex-direction: column; flex-shrink: 0; animation: keSlideLeft 0.2s ease-out; overflow: hidden; }
                @keyframes keSlideLeft { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: none; } }
                .ke-rp-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #e8ecf1; background: #fafbfc; }
                .ke-rp-title { font-size: 14px; font-weight: 700; color: #17191c; display: flex; align-items: center; gap: 8px; }
                .ke-rp-close { width: 28px; height: 28px; border: none; background: transparent; cursor: pointer; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #94a3b8; transition: 0.15s; }
                .ke-rp-close:hover { background: #f1f5f9; color: #17191c; }

                .ke-rp-tabs { display: flex; border-bottom: 1px solid #e8ecf1; background: #fff; }
                .ke-rp-tab { flex: 1; padding: 10px; text-align: center; font-size: 12px; font-weight: 600; color: #64748b; cursor: pointer; border-bottom: 2px solid transparent; transition: 0.15s; font-family: inherit; background: none; border-left: none; border-right: none; border-top: none; }
                .ke-rp-tab:hover { color: #334155; background: #f8fafc; }
                .ke-rp-tab.active { color: #2563eb; border-bottom-color: #2563eb; }

                .ke-rp-body { flex: 1; overflow-y: auto; padding: 16px; }

                .ke-field { margin-bottom: 18px; }
                .ke-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; }
                .ke-input { width: 100%; padding: 9px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; color: #17191c; font-family: inherit; transition: 0.15s; outline: none; background: #f8fafc; box-sizing: border-box; }
                .ke-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.08); background: #fff; }
                .ke-textarea { resize: vertical; min-height: 72px; }

                .ke-color-row { display: flex; gap: 6px; flex-wrap: wrap; }
                .ke-color-swatch { width: 28px; height: 28px; border-radius: 6px; cursor: pointer; border: 2px solid #e2e8f0; transition: 0.15s; }
                .ke-color-swatch:hover { transform: scale(1.15); }
                .ke-color-swatch.active { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59,130,246,0.2); }

                .ke-divider { height: 1px; background: #e8ecf1; margin: 16px 0; }

                .ke-sector-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 12px; font-weight: 600; color: #334155; cursor: pointer; transition: 0.15s; background: #f8fafc; font-family: inherit; }
                .ke-sector-chip:hover { background: #eff6ff; border-color: #93c5fd; }
                .ke-sector-chip.active { background: #dbeafe; border-color: #3b82f6; color: #1e40af; }

                .ke-hizmet-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
                .ke-hizmet-row input { flex: 1; }
                .ke-hizmet-idx { width: 20px; height: 20px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: #94a3b8; flex-shrink: 0; }

                .ke-font-select { width: 100%; padding: 9px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; color: #17191c; font-family: inherit; outline: none; background: #f8fafc; cursor: pointer; }
                .ke-font-select:focus { border-color: #3b82f6; }

                .ke-info-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin-bottom: 12px; }
                .ke-info-label { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
                .ke-info-value { font-size: 13px; font-weight: 600; color: #334155; }
            `
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-rp",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-rp-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ke-rp-title",
                                children: "✏️ Site Düzenle"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 65,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "ke-rp-close",
                                onClick: ()=>setRightPanelOpen(false),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M18 6L6 18M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                        lineNumber: 67,
                                        columnNumber: 123
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                    lineNumber: 67,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 66,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-rp-tabs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `ke-rp-tab${activeTab === 'genel' ? ' active' : ''}`,
                                onClick: ()=>setActiveTab('genel'),
                                children: "Genel"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `ke-rp-tab${activeTab === 'icerik' ? ' active' : ''}`,
                                onClick: ()=>setActiveTab('icerik'),
                                children: "İçerik"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 73,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `ke-rp-tab${activeTab === 'tasarim' ? ' active' : ''}`,
                                onClick: ()=>setActiveTab('tasarim'),
                                children: "Tasarım"
                            }, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-rp-body",
                        children: [
                            activeTab === 'genel' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GenelTab, {}, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 78,
                                columnNumber: 47
                            }, this),
                            activeTab === 'icerik' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IcerikTab, {}, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 79,
                                columnNumber: 48
                            }, this),
                            activeTab === 'tasarim' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TasarimTab, {}, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 80,
                                columnNumber: 49
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(RightPanel, "ePrUqcHMnvF5iqzHAgQjiStjOjg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c = RightPanel;
/* ═══════ Genel Tab ═══════ */ function GenelTab() {
    _s1();
    const siteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "GenelTab.useEditorStore[siteData]": (s)=>s.siteData
    }["GenelTab.useEditorStore[siteData]"]);
    const updateSiteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "GenelTab.useEditorStore[updateSiteData]": (s)=>s.updateSiteData
    }["GenelTab.useEditorStore[updateSiteData]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-info-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-info-label",
                        children: "Sektör"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 95,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-info-value",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOLAR"].find((d)=>d.id === siteData.sektorId)?.ad || 'Bilinmiyor'
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 94,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-info-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-info-label",
                        children: "Paket"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 99,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-info-value",
                        children: siteData.paket
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 98,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-divider"
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "İşletme Adı"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 106,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "ke-input",
                        value: siteData.isletmeAdi,
                        onChange: (e)=>updateSiteData({
                                isletmeAdi: e.target.value,
                                heroBaslik: e.target.value
                            }),
                        placeholder: "İşletme adınız…"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 105,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Telefon"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 111,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "ke-input",
                        value: siteData.telefon,
                        onChange: (e)=>updateSiteData({
                                telefon: e.target.value
                            }),
                        placeholder: "05XX XXX XX XX"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 112,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 110,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Adres"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "ke-input",
                        value: siteData.adres,
                        onChange: (e)=>updateSiteData({
                                adres: e.target.value
                            }),
                        placeholder: "İlçe, Şehir"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 117,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 115,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-divider"
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 120,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Sektör Değiştir"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 123,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px',
                            maxHeight: '200px',
                            overflowY: 'auto'
                        },
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOLAR"].slice(0, 20).map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `ke-sector-chip${siteData.sektorId === d.id ? ' active' : ''}`,
                                onClick: ()=>updateSiteData({
                                        sektorId: d.id,
                                        kategori: d.kategori,
                                        heroAlt: d.heroAlt,
                                        hizmetler: d.hizmetler,
                                        bg: d.bg,
                                        accent: d.accent,
                                        text: d.text,
                                        font: d.font,
                                        unsplash: d.unsplash
                                    }),
                                children: d.ad
                            }, d.id, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 126,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 124,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 122,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
        lineNumber: 93,
        columnNumber: 9
    }, this);
}
_s1(GenelTab, "4+wFEoa876m42TYhMSQeLvE66Es=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c1 = GenelTab;
/* ═══════ İçerik Tab ═══════ */ function IcerikTab() {
    _s2();
    const siteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "IcerikTab.useEditorStore[siteData]": (s)=>s.siteData
    }["IcerikTab.useEditorStore[siteData]"]);
    const updateSiteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "IcerikTab.useEditorStore[updateSiteData]": (s)=>s.updateSiteData
    }["IcerikTab.useEditorStore[updateSiteData]"]);
    const updateHizmet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IcerikTab.useCallback[updateHizmet]": (index, value)=>{
            const h = [
                ...siteData.hizmetler
            ];
            h[index] = value;
            updateSiteData({
                hizmetler: h
            });
        }
    }["IcerikTab.useCallback[updateHizmet]"], [
        siteData.hizmetler,
        updateSiteData
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Hero Başlık"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 164,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "ke-input",
                        value: siteData.heroBaslik,
                        onChange: (e)=>updateSiteData({
                                heroBaslik: e.target.value
                            }),
                        placeholder: "Ana başlık…"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 163,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Alt Başlık"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 169,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "ke-input",
                        value: siteData.heroAlt,
                        onChange: (e)=>updateSiteData({
                                heroAlt: e.target.value
                            }),
                        placeholder: "Alt başlık…"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 170,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 168,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-divider"
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 173,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Hizmetler"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 176,
                        columnNumber: 17
                    }, this),
                    siteData.hizmetler.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "ke-hizmet-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "ke-hizmet-idx",
                                    children: i + 1
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                    lineNumber: 179,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "ke-input",
                                    value: h,
                                    onChange: (e)=>updateHizmet(i, e.target.value),
                                    placeholder: `Hizmet ${i + 1}`
                                }, void 0, false, {
                                    fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                    lineNumber: 180,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                            lineNumber: 178,
                            columnNumber: 21
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
        lineNumber: 162,
        columnNumber: 9
    }, this);
}
_s2(IcerikTab, "BsvaqHQW3aVfcqkQLwjY5a1oq5w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c2 = IcerikTab;
/* ═══════ Tasarım Tab ═══════ */ function TasarimTab() {
    _s3();
    const siteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TasarimTab.useEditorStore[siteData]": (s)=>s.siteData
    }["TasarimTab.useEditorStore[siteData]"]);
    const updateSiteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "TasarimTab.useEditorStore[updateSiteData]": (s)=>s.updateSiteData
    }["TasarimTab.useEditorStore[updateSiteData]"]);
    const BG_COLORS = [
        '#0f172a',
        '#1e293b',
        '#0d0d0d',
        '#111111',
        '#0a0a0f',
        '#0b1929',
        '#1a0f05',
        '#faf4ed',
        '#fffdf7',
        '#f8f5f0',
        '#f5f4f0',
        '#f0f8ff',
        '#f1fffe',
        '#f0f4ff',
        '#ffffff'
    ];
    const ACCENT_COLORS = [
        '#c2440e',
        '#c2773a',
        '#e8a030',
        '#b8960c',
        '#d4709a',
        '#c9856a',
        '#c53030',
        '#2e86de',
        '#e63946',
        '#f5a623',
        '#8b6f47',
        '#c9a84c',
        '#7c3aed',
        '#4f46e5',
        '#00c9a7',
        '#10b981',
        '#00897b',
        '#ff3c00',
        '#ff6b35'
    ];
    const FONTS = [
        'Cormorant Garamond',
        'Playfair Display',
        'Abril Fatface',
        'Bebas Neue',
        'Syne',
        'Inter',
        'Outfit',
        'Raleway',
        'Montserrat',
        'Poppins',
        'Nunito',
        'Space Grotesk',
        'Oswald',
        'Anton',
        'Lora',
        'Fraunces'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Arkaplan Rengi"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 200,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-color-row",
                        children: BG_COLORS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `ke-color-swatch${siteData.bg === c ? ' active' : ''}`,
                                style: {
                                    background: c
                                },
                                onClick: ()=>updateSiteData({
                                        bg: c
                                    })
                            }, c, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 203,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 201,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 199,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Vurgu Rengi"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 209,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-color-row",
                        children: ACCENT_COLORS.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `ke-color-swatch${siteData.accent === c ? ' active' : ''}`,
                                style: {
                                    background: c
                                },
                                onClick: ()=>updateSiteData({
                                        accent: c
                                    })
                            }, c, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 212,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 210,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 208,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-divider"
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 217,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-field",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-label",
                        children: "Yazı Tipi"
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 220,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "ke-font-select",
                        value: siteData.font,
                        onChange: (e)=>updateSiteData({
                                font: e.target.value
                            }),
                        children: FONTS.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: f,
                                children: f
                            }, f, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                                lineNumber: 223,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                        lineNumber: 221,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
                lineNumber: 219,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx",
        lineNumber: 198,
        columnNumber: 9
    }, this);
}
_s3(TasarimTab, "4+wFEoa876m42TYhMSQeLvE66Es=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
_c3 = TasarimTab;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "RightPanel");
__turbopack_context__.k.register(_c1, "GenelTab");
__turbopack_context__.k.register(_c2, "IcerikTab");
__turbopack_context__.k.register(_c3, "TasarimTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/utils/demoHtmlUretici.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * demoHtmlUretici.ts — Dünya Standartlarında Demo Site HTML Üretici
 *
 * Her sektör için referans sitelerden ilham alarak unique HTML üretir.
 * Noma, Stripe, Linear, Tend, Equinox, Blind Barber... estetiğinde.
 */ __turbopack_context__.s([
    "DEMO_MODAL_HTML",
    ()=>DEMO_MODAL_HTML,
    "DEMO_SCRIPT",
    ()=>DEMO_SCRIPT,
    "demoHtmlUret",
    ()=>demoHtmlUret
]);
// ── Yardımcılar ───────────────────────────────────────────────────
function isDark(bg) {
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 < 128;
}
function rgba(hex, a) {
    const h = hex.replace('#', '');
    return `rgba(${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)},${a})`;
}
// ── Sektör İkon Seti ──────────────────────────────────────────────
const IK = {
    1: [
        '🍖',
        '🔥',
        '🫕'
    ],
    2: [
        '☕',
        '🍰',
        '🥐'
    ],
    3: [
        '🥖',
        '🧁',
        '🎂'
    ],
    4: [
        '✂️',
        '💈',
        '🪒'
    ],
    5: [
        '💇‍♀️',
        '💅',
        '✨'
    ],
    6: [
        '🌹',
        '💐',
        '🌸'
    ],
    7: [
        '🥩',
        '🐄',
        '🔪'
    ],
    8: [
        '👔',
        '✨',
        '⏱'
    ],
    9: [
        '🔧',
        '🚗',
        '⚡'
    ],
    10: [
        '⚡',
        '💡',
        '🔌'
    ],
    11: [
        '🛋️',
        '🪑',
        '🏠'
    ],
    12: [
        '🧵',
        '✂️',
        '👔'
    ],
    13: [
        '🖨️',
        '📇',
        '📎'
    ],
    14: [
        '💊',
        '💉',
        '🩺'
    ],
    15: [
        '⚖️',
        '📜',
        '🏛️'
    ],
    16: [
        '📊',
        '💰',
        '📋'
    ],
    17: [
        '📐',
        '🏗️',
        '🖊️'
    ],
    18: [
        '⚙️',
        '🔬',
        '🏗️'
    ],
    19: [
        '🛡️',
        '📋',
        '🏠'
    ],
    20: [
        '🏡',
        '🗝️',
        '📍'
    ],
    21: [
        '🎨',
        '📱',
        '📈'
    ],
    22: [
        '📚',
        '🎯',
        '🏆'
    ],
    23: [
        '🌐',
        '📝',
        '🗣️'
    ],
    24: [
        '📸',
        '🎬',
        '💡'
    ],
    25: [
        '💻',
        '📱',
        '☁️'
    ],
    26: [
        '🧠',
        '💬',
        '🌿'
    ],
    27: [
        '🦷',
        '😁',
        '🪥'
    ],
    28: [
        '🏥',
        '👨‍⚕️',
        '💊'
    ],
    29: [
        '🏃',
        '💪',
        '🦴'
    ],
    30: [
        '🥗',
        '⚖️',
        '🍎'
    ],
    31: [
        '💪',
        '🏋️',
        '🔥'
    ],
    32: [
        '🧘',
        '🕯️',
        '☮️'
    ],
    33: [
        '✨',
        '💎',
        '🌟'
    ],
    34: [
        '🐾',
        '🐕',
        '❤️'
    ],
    35: [
        '💆',
        '🧖',
        '🌿'
    ],
    36: [
        '🚗',
        '💧',
        '✨'
    ],
    37: [
        '🚛',
        '📦',
        '🏠'
    ],
    38: [
        '🧹',
        '🧴',
        '✨'
    ],
    39: [
        '🖌️',
        '🎨',
        '🏠'
    ],
    40: [
        '🪟',
        '🔲',
        '🏗️'
    ],
    41: [
        '🎉',
        '💒',
        '🥂'
    ]
};
const ICERIKLER = {
    // ── 01: RESTORAN (Noma × EMP) ──
    1: {
        badge: 'Karaköy · 1987\'den beri',
        altBaslik: 'Üç kuşaktır ocak başında, İstanbul\'un kalbinde',
        stats: [
            [
                '37',
                'Yıllık Deneyim'
            ],
            [
                '15.000+',
                'Misafir / Yıl'
            ],
            [
                '4.9',
                'Google Puanı'
            ],
            [
                '6',
                'Menü Kategorisi'
            ]
        ],
        yorum: 'Mangal lezzetinin bu kadar zarif sunulabileceğini burada öğrendim. Atmosfer, servis, lezzet — kusursuz.',
        yorumcu: 'Ahmet B.',
        ctaBaslik: 'Masa Rezervasyonu',
        ctaAciklama: 'Her akşam 18:00 — 23:00 · Pazar kapalı · Karaköy, İstanbul',
        ctaButon: '📞 Hemen Rezervasyon',
        hizmetAciklama: [
            'Anadolu\'nun en seçkin başlangıçları, taze otlar ve zeytinyağı ile',
            'Meşe kömüründe pişen etler, geleneksel Ocakbaşı ustalığı ile',
            'Şefimizin özel tatlı kreasyonları, mevsim meyvesi ile'
        ],
        menuBaslik: 'Menüden Seçmeler',
        menuItems: [
            {
                ad: 'Kuzu Tandır',
                fiyat: '₺420',
                aciklama: 'Odunlu fırında 8 saat pişen kuzu'
            },
            {
                ad: 'Adana Kebap',
                fiyat: '₺320',
                aciklama: 'El kıyması, acılı biber, lavaş'
            },
            {
                ad: 'Patlıcan Kebabı',
                fiyat: '₺290',
                aciklama: 'Közlenmiş patlıcan, dana kıyma'
            }
        ]
    },
    // ── 02: KAFE (Blue Bottle × Stumptown) ──
    2: {
        badge: 'Kadıköy · 3. Dalga Kahve',
        altBaslik: 'Özenle seçilmiş çekirdekler, barista ustalığıyla',
        stats: [
            [
                '8',
                'Yıldır Kadıköy\'de'
            ],
            [
                '12',
                'Çeşit Origin'
            ],
            [
                '4.8',
                'Google Puanı'
            ],
            [
                '350+',
                'Günlük Fincan'
            ]
        ],
        yorum: 'Kadıköy\'ün en iyi filtre kahvesi burada. V60 ile yapılan Ethiopia Yirgacheffe\'yi mutlaka deneyin.',
        yorumcu: 'Elif S.',
        ctaBaslik: 'Bize Uğrayın',
        ctaAciklama: 'Hafta içi 08:00 — 22:00 · Hafta sonu 09:00 — 23:00 · Kadıköy Moda',
        ctaButon: '☕ Menüyü Gör',
        hizmetAciklama: [
            'V60, Chemex, Aeropress ile özenle demlenen filtre kahveler',
            'Ev yapımı cheesecake, brownie, cookie — her gün taze',
            'Sourdough ekmek, avokado, granola ile weekend brunch'
        ],
        menuBaslik: 'Popüler İçecekler',
        menuItems: [
            {
                ad: 'V60 Pour Over',
                fiyat: '₺120',
                aciklama: 'Tek origin, el demleme'
            },
            {
                ad: 'Flat White',
                fiyat: '₺95',
                aciklama: 'Çift shot, velvet köpük'
            },
            {
                ad: 'Cold Brew',
                fiyat: '₺110',
                aciklama: '18 saat demleme, buz üstü'
            }
        ]
    },
    // ── 03: FIRIN (Tartine × Dominique Ansel) ──
    3: {
        badge: 'Moda · 1994\'ten beri',
        altBaslik: 'Her sabah taze, her hamur sevgiyle yoğrulur',
        stats: [
            [
                '30',
                'Yıllık Gelenek'
            ],
            [
                '200+',
                'Günlük Ekmek'
            ],
            [
                '18',
                'Çeşit Börek'
            ],
            [
                '4.9',
                'Google Puanı'
            ]
        ],
        yorum: 'Ekşi maya ekmeği için İstanbul\'un karşı yakasından geliyorum. Hamur işlerinde gerçekten usta.',
        yorumcu: 'Zeynep A.',
        ctaBaslik: 'Özel Sipariş',
        ctaAciklama: 'Doğum günü pastası, düğün pastası — 48 saat önceden sipariş',
        ctaButon: '🎂 Pasta Siparişi',
        hizmetAciklama: [
            'Ekşi maya, tam buğday, çavdar — günlük taze pişirim',
            'Su böreği, kol böreği, puf böreği — anneannemizin tarifleri',
            'Profiterol, San Sebastian, Tart — patisserie ustalığı ile'
        ],
        menuBaslik: 'Bugün Ne Pişti?',
        menuItems: [
            {
                ad: 'Ekşi Maya Ekmek',
                fiyat: '₺45',
                aciklama: '24 saat fermente, odun fırını'
            },
            {
                ad: 'Fıstıklı Baklava',
                fiyat: '₺85',
                aciklama: 'Antep fıstığı, 40 kat yufka'
            },
            {
                ad: 'San Sebastian',
                fiyat: '₺120',
                aciklama: 'Bask usulü yanık cheesecake'
            }
        ]
    },
    // ── 04: BERBER (Blind Barber × Fellow) ──
    4: {
        badge: 'Cihangir · MCMXCVIII',
        altBaslik: 'Bir tıraş, bir kahve, bir sohbet',
        stats: [
            [
                '26',
                'Yıllık Deneyim'
            ],
            [
                '40+',
                'Günlük Müşteri'
            ],
            [
                '4.9',
                'Google Puanı'
            ],
            [
                '3',
                'Usta Berber'
            ]
        ],
        yorum: 'Düz jilet tıraşı için İstanbul\'un en iyi adresi. Atmosfer tam bir speakeasy.',
        yorumcu: 'Can D.',
        ctaBaslik: 'Randevu Al',
        ctaAciklama: 'Her gün 09:00 — 21:00 · Cihangir, Beyoğlu',
        ctaButon: '💈 Randevu',
        hizmetAciklama: [
            'Klasik makasla kesim, modern ya da vintage — sizin tercihiniz',
            'Düz jilet, sıcak havlu, bay rum — geleneksel deneyim',
            'Temizleme, nemlendirme, maske — erkeğe özel bakım'
        ]
    },
    // ── 05: KADIN KUAFÖRÜ (Sassoon × Josié) ──
    5: {
        badge: 'Nişantaşı · 2012',
        altBaslik: 'Güzelliğin en doğal hali, uzman ellerle',
        stats: [
            [
                '12',
                'Yıllık Deneyim'
            ],
            [
                '8',
                'Uzman Stilist'
            ],
            [
                '4.8',
                'Google Puanı'
            ],
            [
                '200+',
                'Haftalık Misafir'
            ]
        ],
        yorum: 'Saç boyası konusunda çok titizim, Papatya\'da her seferinde istediğim sonucu alıyorum.',
        yorumcu: 'Ayşe M.',
        ctaBaslik: 'Online Randevu',
        ctaAciklama: 'Pazartesi hariç her gün 10:00 — 20:00',
        ctaButon: '✨ Randevu Al',
        hizmetAciklama: [
            'Kesim, fön, saç bakımı — kişiye özel stil danışmanlığı',
            'Jel, kalıcı oje, protez tırnak — hijyenik ortamda',
            'Hydrafacial, cilt analizi, anti-aging — profesyonel cihazlar'
        ]
    },
    // ── 06: ÇİÇEKÇİ (Flowerbx × Bloom&Wild) ──
    6: {
        badge: 'Bebek · Ertesi Gün Teslimat',
        altBaslik: 'Her çiçeği ellerimizle seçiyor, her buketi kalbimizle bağlıyoruz',
        stats: [
            [
                '8',
                'Yıldır Bebek\'te'
            ],
            [
                '50+',
                'Çeşit Çiçek'
            ],
            [
                'Aynı Gün',
                'Teslimat'
            ],
            [
                '4.9',
                'Google Puanı'
            ]
        ],
        yorum: 'Düğün çiçeklerimiz Tomurcuk\'tan. Hayal ettiğimizin ötesinde bir dekorasyon yaptılar.',
        yorumcu: 'Selin K.',
        ctaBaslik: 'Buket Sipariş',
        ctaAciklama: 'İstanbul Avrupa yakası aynı gün · Anadolu yakası ertesi gün',
        ctaButon: '🌹 Buket Seç',
        hizmetAciklama: [
            'Mevsim çiçekleri ile günlük buketler — ₺150\'den başlayan',
            'Gelin buketi, masa aranjmanı, mekan süsleme',
            'Haftalık ev/ofis çiçeği — abone olun, her cuma kapınızda'
        ]
    },
    // ── 07: KASAP ──
    7: {
        badge: 'Fatih · 1962\'den beri',
        altBaslik: 'Üç kuşaktır aynı el, aynı özen — kökten gelen lezzet',
        stats: [
            [
                '62',
                'Yıllık Gelenek'
            ],
            [
                '500+',
                'Günlük Müşteri'
            ],
            [
                '4.9',
                'Google Puanı'
            ],
            [
                '3',
                'Kuşak'
            ]
        ],
        yorum: 'Sucuk ve pastırması efsane. 60 yıllık geleneklerini koruyorlar.',
        yorumcu: 'Oğuz T.',
        ctaBaslik: 'Sipariş Ver',
        ctaAciklama: 'Sabah 07:00 — Akşam 20:00 · Pazar açık · Fatih, İstanbul',
        ctaButon: '🥩 Sipariş',
        hizmetAciklama: [
            'Yerli ırk, doğal besleme — kalite garantili dana eti',
            'Taze kuzu, kemiksiz but, pirzola — her gün taze kesilir',
            'Ev yapımı sucuk, pastırma, kavurma — geleneksel tarifler'
        ],
        menuBaslik: 'Günün Taze Geleni',
        menuItems: [
            {
                ad: 'Dana Antrikot',
                fiyat: '₺380/kg',
                aciklama: 'Yerli ırk, 21 gün olgunlaştırılmış'
            },
            {
                ad: 'Kuzu Pirzola',
                fiyat: '₺450/kg',
                aciklama: 'Taze kesilmiş, kemikli'
            },
            {
                ad: 'Ev Sucuğu',
                fiyat: '₺320/kg',
                aciklama: 'Doğal bağırsak, 30 baharatlı'
            }
        ]
    },
    // ── 08: KURU TEMİZLEME ──
    8: {
        badge: 'Şişli · 3 Adımda Temizlik',
        altBaslik: 'Kıyafetleriniz profesyonel ellerde, zamanında teslim',
        stats: [
            [
                '18',
                'Yıllık Deneyim'
            ],
            [
                '10.000+',
                'Müşteri'
            ],
            [
                '24s',
                'Express Hizmet'
            ],
            [
                '30',
                'İlçeye Servis'
            ]
        ],
        yorum: 'Kapıdan alıp teslim ediyorlar, ütü kalitesi mükemmel.',
        yorumcu: 'Deniz Y.',
        ctaBaslik: 'Sipariş Ver',
        ctaAciklama: 'İstanbul\'un 30 ilçesine kapıdan servis · WhatsApp ile sipariş',
        ctaButon: '👔 Sipariş',
        hizmetAciklama: [
            'Gömlek, elbise, kaban — hassas kumaşlara özel işlem',
            'Yıkama, kurutma, ütü, katlama — tek pakette',
            'Sabah al, akşam teslim — acil işleriniz için'
        ]
    },
    // ── 09: OTO SERVİS ──
    9: {
        badge: 'Bağcılar · 7/24 Açık',
        altBaslik: 'Aracınız güvende, yolunuz açık — 22 yıllık deneyim',
        stats: [
            [
                '22',
                'Yıl Deneyim'
            ],
            [
                '15.000+',
                'Araç Servisi'
            ],
            [
                '%98',
                'Memnuniyet'
            ],
            [
                '3',
                'Usta Teknisyen'
            ]
        ],
        yorum: 'Kasko hasar işlemlerini bile hallettiler. Güvenilir ve hızlı.',
        yorumcu: 'Emre K.',
        ctaBaslik: 'Acil Servis',
        ctaAciklama: '7/24 ACİL HATTI: 0212 555 0111 · Bağcılar, İstanbul',
        ctaButon: '🔧 Hemen Ara',
        hizmetAciklama: [
            'Periyodik bakım, yağ değişimi, fren kontrolü — güvenli sürüş',
            'Boyasız göçük, boya, parlatma — profesyonel ekipman',
            'Mevsimlik değişim, balans, rot-balans — TSE onaylı'
        ]
    },
    // ── 10: ELEKTRİKÇİ ──
    10: {
        badge: 'Kadıköy · Acil Servis',
        altBaslik: '7/24 arızaya hazır — ortalama 45 dakikada kapınızdayız',
        stats: [
            [
                '15',
                'Yıl Deneyim'
            ],
            [
                '8.000+',
                'Servis'
            ],
            [
                '45dk',
                'Ort. Varış'
            ],
            [
                '7/24',
                'Açık'
            ]
        ],
        yorum: 'Gece yarısı sigorta attı, 30 dakikada geldiler. Profesyonel iş.',
        yorumcu: 'Hakan S.',
        ctaBaslik: 'Acil Arıza Hattı',
        ctaAciklama: '0216 555 0199 · Kadıköy, Üsküdar, Ataşehir',
        ctaButon: '⚡ Hemen Ara',
        hizmetAciklama: [
            'Priz, şalter, sigorta — güvenli montaj ve onarım',
            'Su tesisatı, pis su, sıcak su — profesyonel çözüm',
            'Aydınlatma planı, spot, LED — modern çözümler'
        ]
    },
    // ── 11: MOBİLYA ──
    11: {
        badge: 'Etiler · Tasarım Atölyesi',
        altBaslik: 'Yaşayan mekânlar, anlatılan hikayeler — masif ahşap ustalığı',
        stats: [
            [
                '20',
                'Yıl Deneyim'
            ],
            [
                '3.000+',
                'Proje'
            ],
            [
                '%100',
                'Masif Ahşap'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Oturma odamızı tamamen yeniden tasarladılar. Her parça sanat eseri gibi.',
        yorumcu: 'Pınar E.',
        ctaBaslik: 'Ücretsiz Danışmanlık',
        ctaAciklama: 'Showroom ziyareti · Ücretsiz iç mekan danışmanlığı',
        ctaButon: '🛋️ Randevu Al',
        hizmetAciklama: [
            'Koltuk, sehpa, TV ünitesi — masif meşe ve ceviz',
            'Yatak, gardırop, şifonyer — kişiye özel ölçü',
            'Çalışma masası, kitaplık, toplantı masası — ergonomik'
        ]
    },
    // ── 12: TERZİ ──
    12: {
        badge: 'Kapalıçarşı · 1978',
        altBaslik: 'Her dikişte özen, her kumaşta kalite — bespoke ustalığı',
        stats: [
            [
                '46',
                'Yıl Deneyim'
            ],
            [
                '10.000+',
                'Takım'
            ],
            [
                'İtalyan',
                'Kumaşlar'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Düğün takımımı burada diktirdim. Kalıp ve kumaş kalitesi olağanüstü.',
        yorumcu: 'Burak A.',
        ctaBaslik: 'Ölçü Randevusu',
        ctaAciklama: 'Kapalıçarşı · Pazartesi-Cumartesi 09:00-19:00',
        ctaButon: '🧵 Randevu',
        hizmetAciklama: [
            'Özel ölçü takım elbise — İtalyan ve İngiliz kumaşlar',
            'Erkek ve kadın gömlek — kol, yaka, fit kişiye özel',
            'Kıyafet daraltma, boy kısaltma, fermurar değişimi'
        ]
    },
    // ── 13: KIRTASİYE ──
    13: {
        badge: 'Beyoğlu · Hızlı Baskı',
        altBaslik: 'Fikirleriniz kağıda dökülür — dijital baskı ve kırtasiye',
        stats: [
            [
                '12',
                'Yıl'
            ],
            [
                '50.000+',
                'Baskı İşi'
            ],
            [
                '2s',
                'Express Baskı'
            ],
            [
                '4.7',
                'Google'
            ]
        ],
        yorum: 'Kartvizitlerimizi aynı gün bastılar. Kalite ve hız bir arada.',
        yorumcu: 'Onur B.',
        ctaBaslik: 'Hızlı Teklif',
        ctaAciklama: 'Online sipariş · Kapıda ödeme · Kargo',
        ctaButon: '🖨️ Teklif Al',
        hizmetAciklama: [
            'Kartvizit, afiş, broşür, banner — yüksek çözünürlük',
            'Ciltleme, laminasyon, fotokopi — öğrenci indirimi',
            'Tez baskı, sunum dosyası, proje çıktısı — express'
        ]
    },
    // ── 14: ECZANE ──
    14: {
        badge: 'Beşiktaş · Güvenilir',
        altBaslik: 'Sağlığınız bizim önceliğimiz — uzman eczacı kadrosu',
        stats: [
            [
                '25',
                'Yıl'
            ],
            [
                '50.000+',
                'Hasta'
            ],
            [
                '300+',
                'Ürün Çeşidi'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Sadece ilaç değil, sağlık danışmanlığı da veriyorlar.',
        yorumcu: 'Fatma H.',
        ctaBaslik: 'Bize Ulaşın',
        ctaAciklama: 'Hafta içi 08:00 — 22:00 · Cumartesi 09:00 — 20:00',
        ctaButon: '💊 Ara',
        hizmetAciklama: [
            'SGK ve özel reçete karşılama — geniş ilaç stoku',
            'D vitamini, omega-3, probiyotik — uzman danışmanlığı',
            'Dermokozmetik, güneş koruma, bebek bakımı'
        ]
    },
    // ── 15: HUKUK ──
    15: {
        badge: 'Levent · 40+ Yıl',
        altBaslik: 'Haklarınız güçlü ellerde — 3 kuşak hukuk geleneği',
        stats: [
            [
                '500+',
                'Dava'
            ],
            [
                '%94',
                'Başarı Oranı'
            ],
            [
                '40+',
                'Yıl'
            ],
            [
                '3',
                'Kuşak'
            ]
        ],
        yorum: 'Miras davamızı 6 ayda sonuçlandırdılar. Profesyonel ve şeffaf süreç.',
        yorumcu: 'İlhan G.',
        ctaBaslik: 'Ücretsiz Danışma',
        ctaAciklama: 'İlk görüşme ücretsiz · Online ve yüz yüze',
        ctaButon: '⚖️ Randevu',
        hizmetAciklama: [
            'Savunma, şikayet, temyiz — deneyimli ceza avukatları',
            'Boşanma, velayet, nafaka — hassas ve özenli yaklaşım',
            'Şirket kuruluşu, sözleşme, tahkim — hızlı çözüm'
        ]
    },
    // ── 16: MUHASEBE ──
    16: {
        badge: 'Maslak · SMMM',
        altBaslik: 'Rakamlarınız güvende — mali müşavirlik ve danışmanlık',
        stats: [
            [
                '18',
                'Yıl'
            ],
            [
                '500+',
                'Firma'
            ],
            [
                '%100',
                'Zamanında Beyan'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Şirket kuruluşumu 3 günde hallettiler. SGK ve vergi işlerini artık düşünmüyorum.',
        yorumcu: 'Serkan P.',
        ctaBaslik: 'Teklif Alın',
        ctaAciklama: 'İlk ay ücretsiz deneme · ₺890/ay\'dan başlayan',
        ctaButon: '📊 Teklif',
        hizmetAciklama: [
            'Gelir vergisi, KDV, kurumlar vergisi — zamanında beyan',
            'Maaş hesaplama, SGK bildirge, izin takibi — eksiksiz',
            'Limited, anonim, şahıs şirketi — A\'dan Z\'ye kuruluş'
        ]
    },
    // ── 17: MİMARLIK ──
    17: {
        badge: 'Beyoğlu · Ödüllü Atölye',
        altBaslik: 'Boşluğu anlama, mekânı dönüştürme — tasarım odaklı mimarlık',
        stats: [
            [
                '15',
                'Yıl'
            ],
            [
                '120+',
                'Proje'
            ],
            [
                '3',
                'Ödül'
            ],
            [
                '12',
                'Mimar'
            ]
        ],
        yorum: 'Evimizi yeniden tasarladılar. Her detay düşünülmüş, yaşam kalitemiz arttı.',
        yorumcu: 'Aslı D.',
        ctaBaslik: 'Proje Görüşmesi',
        ctaAciklama: 'Ücretsiz keşif ziyareti · Online portföy',
        ctaButon: '📐 Görüşme',
        hizmetAciklama: [
            'Villa, apartman, rezidans — konsept tasarımdan uygulamaya',
            'AVM, ofis, showroom — verimli ve estetik mekânlar',
            'Mutfak, banyo, iç mekan yenileme — minimum israfla'
        ]
    },
    // ── 18: MÜHENDİSLİK ──
    18: {
        badge: 'Ataşehir · ISO 9001',
        altBaslik: 'Kompleks sorunlar, akıllı çözümler — teknik mühendislik',
        stats: [
            [
                '20',
                'Yıl'
            ],
            [
                '150+',
                'Proje'
            ],
            [
                '30',
                'Uzman'
            ],
            [
                '12',
                'İl\'de Hizmet'
            ]
        ],
        yorum: 'Fabrika projemizi zamanında ve bütçe dahilinde teslim ettiler.',
        yorumcu: 'Murat C.',
        ctaBaslik: 'Proje Teklifi',
        ctaAciklama: 'Fizibilite raporu ücretsiz · Online toplantı',
        ctaButon: '⚙️ Teklif',
        hizmetAciklama: [
            'Planlama, koordinasyon, bütçe — uçtan uca proje yönetimi',
            'Statik rapor, denetim, deprem analizi — uzman kadro',
            'Güneş enerjisi, enerji verimliliği — sürdürülebilir çözümler'
        ]
    },
    // ── 19: SİGORTA ──
    19: {
        badge: 'Şişli · Lisanslı Acente',
        altBaslik: 'Her riske karşı güvende olun — bağımsız sigorta danışmanlığı',
        stats: [
            [
                '15',
                'Yıl'
            ],
            [
                '20.000+',
                'Poliçe'
            ],
            [
                '18',
                'Sigorta Şirketi'
            ],
            [
                '4.7',
                'Google'
            ]
        ],
        yorum: 'En uygun kasko teklifini buldular. Hasar sürecini de hızlıca yönettiler.',
        yorumcu: 'Kemal Ö.',
        ctaBaslik: 'Hızlı Teklif',
        ctaAciklama: 'Online teklif 2 dakikada · Ücretsiz karşılaştırma',
        ctaButon: '🛡️ Teklif Al',
        hizmetAciklama: [
            'Kasko, trafik, dask — online anlık fiyat',
            'Tamamlayıcı, özel sağlık — aile planları',
            'Konut, işyeri, deprem — kapsamlı koruma'
        ]
    },
    // ── 20: EMLAK ──
    20: {
        badge: 'Nişantaşı · Premium Emlak',
        altBaslik: 'Doğru adres, doğru zaman — İstanbul\'un seçkin gayrimenkulleri',
        stats: [
            [
                '12',
                'Yıl'
            ],
            [
                '2.000+',
                'Satış'
            ],
            [
                '₺5B+',
                'Portföy Değeri'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Aradığımız daireyi 1 haftada buldular. Profesyonel ve güvenilir.',
        yorumcu: 'Ebru L.',
        ctaBaslik: 'Ücretsiz Değerleme',
        ctaAciklama: 'Evinizin değerini öğrenin — 48 saatte değerleme raporu',
        ctaButon: '🏡 Değerle',
        hizmetAciklama: [
            'Konut, arsa, villa — detaylı portföy',
            'Aylık, yıllık, devren — profesyonel yönetim',
            'Ofis, dükkan, depo — yatırım danışmanlığı'
        ]
    },
    // ── 21: DİJİTAL AJANS ──
    21: {
        badge: 'Levent · Full-Service',
        altBaslik: 'Markanı büyüt, rakiplerine bak — data-driven dijital pazarlama',
        stats: [
            [
                '47',
                'Marka'
            ],
            [
                '₺12M',
                'Reklam Bütçesi'
            ],
            [
                '%340',
                'Ort. ROAS'
            ],
            [
                '15',
                'Uzman'
            ]
        ],
        yorum: 'SEO çalışması ile organik trafiğimiz 4 ayda %280 arttı.',
        yorumcu: 'Gökhan N.',
        ctaBaslik: 'Projen Var mı?',
        ctaAciklama: 'Strateji toplantısı ücretsiz · Online veya yüz yüze',
        ctaButon: '🎨 Konuşalım',
        hizmetAciklama: [
            'Teknik SEO, içerik, backlink — organik büyüme',
            'Meta, Google, TikTok — performans odaklı kampanyalar',
            'Kurumsal site, e-ticaret, landing page — modern stack'
        ]
    },
    // ── 22: DERSHANE ──
    22: {
        badge: 'Kadıköy · 847 Öğrenci Yerleşti',
        altBaslik: 'Başarı bir adım ötede — kişiye özel eğitim programları',
        stats: [
            [
                '847',
                '2024 Yerleşen'
            ],
            [
                '%92',
                'Başarı Oranı'
            ],
            [
                '25',
                'Eğitmen'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Kızım YKS\'de ilk 5.000\'e girdi. Zirve olmasaydı bu sonuç olmazdı.',
        yorumcu: 'Fadime T.',
        ctaBaslik: '1 Hafta Ücretsiz',
        ctaAciklama: 'Deneme sınavı + 1 hafta ücretsiz kurs — hemen kaydol',
        ctaButon: '📚 Kayıt Ol',
        hizmetAciklama: [
            'TYT, AYT, dil sınavı — birebir ve grup programları',
            'Kamu personeli sınavı — kapsamlı hazırlık',
            'Cambridge, IELTS, TOEFL — yabancı eğitmenler'
        ]
    },
    // ── 23: TERCÜME ──
    23: {
        badge: 'Taksim · 20 Dil',
        altBaslik: '20 dil, 48 saat teslim, noterli — profesyonel çeviri hizmetleri',
        stats: [
            [
                '20',
                'Dil'
            ],
            [
                '15.000+',
                'Belge'
            ],
            [
                '48s',
                'Ort. Teslim'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Teknik dokümanlarımızı 3 dile çevirdiler. Terminoloji hakimiyeti çok iyi.',
        yorumcu: 'Yasemin R.',
        ctaBaslik: 'Hızlı Teklif',
        ctaAciklama: 'Kelime başı ₺0.18\'den · Noterli + Apostil',
        ctaButon: '🌐 Teklif',
        hizmetAciklama: [
            'Mahkeme, noter, resmi kurum — apostil desteği',
            'Toplantı, konferans, fuar — profesyonel tercümanlar',
            'A1-C2 seviyeleri — İngilizce, Almanca, Fransızca kursları'
        ]
    },
    // ── 24: FOTOĞRAFÇI ──
    24: {
        badge: 'Karaköy · Prodüksiyon',
        altBaslik: 'Her anı sanat eserine dönüştürün — profesyonel çekim',
        stats: [
            [
                '7',
                'Yıl'
            ],
            [
                '500+',
                'Düğün'
            ],
            [
                '50+',
                'Marka'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Düğün fotoğraflarımız dergi kalitesinde çıktı. Çok mutluyuz.',
        yorumcu: 'Ceren & Ali',
        ctaBaslik: 'Projeniz İçin',
        ctaAciklama: 'Portfolio görüşmesi ücretsiz · Online veya stüdyoda',
        ctaButon: '📸 Konuşalım',
        hizmetAciklama: [
            'Gelin-damat, nişan, kına — sinematik çekim',
            'Tanıtım filmi, röportaj, etkinlik kaydı',
            'Ürün, katalog, e-ticaret — stüdyo veya mekan'
        ]
    },
    // ── 25: YAZILIM ──
    25: {
        badge: 'Ataşehir · Full-Stack',
        altBaslik: 'Kodu değil, çözümü teslim ederiz — modern yazılım geliştirme',
        stats: [
            [
                '8',
                'Yıl'
            ],
            [
                '120+',
                'Proje'
            ],
            [
                '15',
                'Geliştirici'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'E-ticaret sitemizi 6 haftada yayına aldılar. Performans ve UX mükemmel.',
        yorumcu: 'Volkan İ.',
        ctaBaslik: 'Proje Başlat',
        ctaAciklama: 'Fizibilite toplantısı ücretsiz · Saatlik: ₺850',
        ctaButon: '💻 Başla',
        hizmetAciklama: [
            'React, Next.js, Node — kurumsal site ve SaaS',
            'iOS, Android, React Native — native performans',
            'REST, GraphQL, entegrasyon — güvenli ve ölçeklenebilir'
        ]
    },
    // ── 26: PSİKOLOG ──
    26: {
        badge: 'Şişli · Online Seans',
        altBaslik: 'Kendinize zaman ayırın — yargısız, güvenli bir alan',
        stats: [
            [
                '10',
                'Yıl'
            ],
            [
                '3.000+',
                'Seans'
            ],
            [
                'Online',
                'Destek'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'İlk kez bu kadar rahat hissettim. Güvenli ve empatik bir ortam.',
        yorumcu: 'Anonim',
        ctaBaslik: 'Randevu Al',
        ctaAciklama: 'Online veya yüz yüze · Tüm görüşmeler gizlidir',
        ctaButon: '🌿 Randevu',
        hizmetAciklama: [
            'Kaygı, depresyon, stres — bilimsel yöntemlerle',
            'İlişki sorunları, iletişim — çift danışmanlığı',
            'Zoom, Google Meet — evinizden katılın'
        ]
    },
    // ── 27: DİŞ KLİNİĞİ ──
    27: {
        badge: 'Ataşehir · Dijital Diş',
        altBaslik: 'Gülüşünüz güvende — modern diş hekimliği',
        stats: [
            [
                '15',
                'Yıl'
            ],
            [
                '20.000+',
                'Tedavi'
            ],
            [
                '5',
                'Uzman Hekim'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'İmplant işlemim ağrısız ve hızlı oldu. Çok profesyonel bir klinik.',
        yorumcu: 'Necla Ş.',
        ctaBaslik: 'Online Randevu',
        ctaAciklama: 'İlk muayene ücretsiz · 10+ sigorta geçerli',
        ctaButon: '🦷 Randevu',
        hizmetAciklama: [
            'Titanyum implant, kemik grefti — uzun ömürlü çözüm',
            'Telsiz, şeffaf plak — göze çarpmayan tedavi',
            'Zoom, lazer — 1 saatte beyaz gülüş'
        ]
    },
    // ── 28: ÖZEL KLİNİK ──
    28: {
        badge: 'Kadıköy · Çok Branşlı',
        altBaslik: 'Sağlığınız profesyonel ellerde — uzman hekim kadrosu',
        stats: [
            [
                '20',
                'Yıl'
            ],
            [
                '8',
                'Branş'
            ],
            [
                '15',
                'Hekim'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: 'Check-up paketleri çok kapsamlı. Sonuçları detaylı açıklıyorlar.',
        yorumcu: 'Recep V.',
        ctaBaslik: 'Randevu',
        ctaAciklama: 'Online randevu · 15+ sigorta anlaşmalı',
        ctaButon: '🏥 Randevu',
        hizmetAciklama: [
            'Genel check-up, tanı, tedavi — uzman doktorlar',
            'EKG, efor, holter — modern cihazlarla',
            'Laboratuvar, görüntüleme — kapsamlı paketler'
        ]
    },
    // ── 29: FİZYOTERAPİ ──
    29: {
        badge: 'Beşiktaş · Sporcu Rehab',
        altBaslik: 'Hareket özgürlüğünü geri kazan — kanıta dayalı tedavi',
        stats: [
            [
                '12',
                'Yıl'
            ],
            [
                '8.000+',
                'Hasta'
            ],
            [
                '%95',
                'İyileşme'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: '6 aydır çektiğim bel ağrısı 3 seansta geçti. Harika bir ekip.',
        yorumcu: 'Sinan U.',
        ctaBaslik: 'Değerlendirme',
        ctaAciklama: 'İlk değerlendirme ücretsiz · Muayenehane + evde tedavi',
        ctaButon: '🏃 Randevu',
        hizmetAciklama: [
            'Manipülasyon, mobilizasyon, masaj — ağrı tedavisi',
            'Spor yaralanması, sakatlık sonrası — performans odaklı',
            'Egzersiz programı, postür düzeltme — bireysel plan'
        ]
    },
    // ── 30: DİYETİSYEN ──
    30: {
        badge: 'Beşiktaş · Online Takip',
        altBaslik: 'Sağlıklı vücut, dengeli yaşam — bilimsel beslenme planı',
        stats: [
            [
                '8',
                'Yıl'
            ],
            [
                '5.000+',
                'Danışan'
            ],
            [
                'Online',
                'Takip'
            ],
            [
                '4.8',
                'Google'
            ]
        ],
        yorum: '6 ayda 15 kilo verdim, enerjim arttı. Online takip çok pratik.',
        yorumcu: 'Gülşen K.',
        ctaBaslik: 'Ücretsiz Danışma',
        ctaAciklama: 'İlk görüşme ücretsiz · Online veya yüz yüze',
        ctaButon: '🥗 Randevu',
        hizmetAciklama: [
            'Kişiye özel diyet planı, psikolojik destek — sürdürülebilir',
            'Performans artımı, kas yapımı — sporcu diyeti',
            'Whatsapp, Zoom — nereye olursan ol danış'
        ]
    },
    // ── 31: SPOR SALONU ──
    31: {
        badge: 'Bağcılar · 7/24 Açık',
        altBaslik: 'Limitlerini zorla, kendinle kazan — İstanbul\'un en donanımlı salonu',
        stats: [
            [
                '5',
                'Yıl'
            ],
            [
                '2.000+',
                'Üye'
            ],
            [
                '7/24',
                'Açık'
            ],
            [
                '500m²',
                'Alan'
            ]
        ],
        yorum: 'Ekipman kalitesi ve antrenör desteği mükemmel. Her gün geliyorum.',
        yorumcu: 'Cem B.',
        ctaBaslik: 'Üyelik',
        ctaAciklama: 'Bugün kaydol, ilk ay %20 indirimli · ₺890/ay',
        ctaButon: '💪 Kaydol',
        hizmetAciklama: [
            'Birebir antrenman, program tasarımı — sonuç odaklı',
            'CrossFit, HIIT, fonksiyonel — enerji veren dersler',
            'Diyet planı, vücut analizi — ölçümlü takip'
        ],
        menuBaslik: 'Üyelik Planları',
        menuItems: [
            {
                ad: 'Günlük Giriş',
                fiyat: '₺150',
                aciklama: 'Tüm alanlara erişim'
            },
            {
                ad: 'Aylık Üyelik',
                fiyat: '₺890',
                aciklama: 'Sınırsız giriş + grup dersi'
            },
            {
                ad: 'Yıllık VIP',
                fiyat: '₺7.200',
                aciklama: '12 ay + PT + beslenme'
            }
        ]
    },
    // ── 32: YOGA ──
    32: {
        badge: 'Beyoğlu · Her Seviye',
        altBaslik: 'Bedenini dinle, zihnini özgür bırak — atmosferik yoga deneyimi',
        stats: [
            [
                '6',
                'Yıl'
            ],
            [
                '15',
                'Haftalık Ders'
            ],
            [
                '4',
                'Eğitmen'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Mum ışığında Vinyasa dersi inanılmaz bir deneyim. Bağımlılık yapıyor.',
        yorumcu: 'Beril T.',
        ctaBaslik: 'İlk Ders Ücretsiz',
        ctaAciklama: 'Beyoğlu · Her seviyeye açık · Mat dahil',
        ctaButon: '🧘 Kayıt',
        hizmetAciklama: [
            'Nefes odaklı, yavaş akış — başlangıç seviyesi',
            'Dinamik akış, güç ve esneklik — orta-ileri',
            'Reformer, mat, duvar — küçük gruplar'
        ]
    },
    // ── 33: ESTETİK ──
    33: {
        badge: 'Nişantaşı · Uzman Hekimler',
        altBaslik: 'Doğal güzelliğini keşfet — minimal invaziv estetik',
        stats: [
            [
                '10',
                'Yıl'
            ],
            [
                '15.000+',
                'İşlem'
            ],
            [
                '3',
                'Uzman Hekim'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Çok doğal bir sonuç aldım. Kimse fark etmedi, sadece "çok güzel görünüyorsun" dediler.',
        yorumcu: 'Anonim',
        ctaBaslik: 'Ücretsiz Konsültasyon',
        ctaAciklama: 'Uzmanımızla tanışın — kişiye özel plan',
        ctaButon: '✨ Randevu',
        hizmetAciklama: [
            'Kırışıklık tedavisi, alın, göz çevresi — doğal sonuç',
            'Dudak, yanak, çene hattı — harmanlı teknik',
            'Tüm vücut, alexandrite, diod — kalıcı çözüm'
        ]
    },
    // ── 34: VETERİNER ──
    34: {
        badge: 'Üsküdar · Acil 7/24',
        altBaslik: 'Dostlarınıza en iyi bakım — sevgi dolu veteriner hekimlik',
        stats: [
            [
                '15',
                'Yıl'
            ],
            [
                '30.000+',
                'Muayene'
            ],
            [
                '5',
                'Veteriner'
            ],
            [
                '4.9',
                'Google'
            ]
        ],
        yorum: 'Kedimizin ameliyatını büyük özveri ile yaptılar. Minnetarız.',
        yorumcu: 'Esra & Boncuk',
        ctaBaslik: 'Randevu',
        ctaAciklama: 'ACİL HAT: 0216 555 0177 · İlk muayene ücretsiz',
        ctaButon: '🐾 Randevu',
        hizmetAciklama: [
            'Karma, kuduz, parvo — aşı takvimi takibi',
            'Kısırlaştırma, ortopedi, diş — modern cerrahi',
            'Pet otel, tırnak, banyo, kuaför — güvenli ortam'
        ]
    }
};
// Geri kalan sektörler için varsayılan içerik üret
function varsayilanIcerik(d) {
    return {
        badge: `İstanbul · Profesyonel`,
        altBaslik: `${d.ad} alanında yılların deneyimi ile hizmetinizdeyiz`,
        stats: [
            [
                '15+',
                'Yıllık Deneyim'
            ],
            [
                '5.000+',
                'Mutlu Müşteri'
            ],
            [
                '4.9',
                'Google Puanı'
            ],
            [
                '7/24',
                'Destek'
            ]
        ],
        yorum: `Harika bir deneyimdi. Profesyonel kadroları ve kaliteli hizmetleriyle kesinlikle tavsiye ederim.`,
        yorumcu: 'Mehmet K.',
        ctaBaslik: 'Hemen Başlayalım',
        ctaAciklama: 'Ücretsiz danışma için bugün bize ulaşın',
        ctaButon: '📞 Bizi Arayın',
        hizmetAciklama: d.hizmetler.map((h)=>`Alanında uzman kadromuzla profesyonel ${h.toLowerCase()} hizmeti sunuyoruz.`)
    };
}
// ── Ana Üretici ───────────────────────────────────────────────────
// ── Özgün Şablon Üreticileri ──────────────────────────────────────────
function htmlYerelEsnaf(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg, oFrom, oTo, logo) {
    const menuSection = ic.menuItems ? `
<section class="section" id="menu">
  <div class="section-label">Menü</div>
  <div class="section-title">${ic.menuBaslik || 'Popüler Seçimler'}</div>
  <div class="menu-grid">${ic.menuItems.map((m)=>`
    <div class="menu-item">
      <div class="menu-item-top"><h4>${m.ad}</h4><span class="menu-price">${m.fiyat}</span></div>
      <p>${m.aciklama}</p>
    </div>`).join('')}
  </div>
</section>` : '';
    return `<!DOCTYPE html><html lang="tr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:${d.bg};--text:${d.text};--accent:${d.accent};--muted:${sub};--card:${cardBg};--border:${cardBorder};--nav-h:72px;--fd:'${d.font}',serif;--fb:'Inter',system-ui,sans-serif}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg);color:var(--text);overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.nav{position:sticky;top:0;z-index:99;height:var(--nav-h);padding:0 48px;display:flex;align-items:center;justify-content:space-between;background:${navBg};backdrop-filter:blur(20px);border-bottom:1px solid ${navBorder}}
.nav-logo{font-family:var(--fd);font-size:1.5rem;font-weight:900;letter-spacing:-.03em}
.nav-logo .dot{color:var(--accent)}
.nav-links{display:flex;gap:28px;font-size:.88rem;font-weight:500;color:${sub}}
.nav-links a:hover{color:var(--text)}
.nav-cta{padding:10px 22px;border-radius:10px;background:var(--accent);color:#fff;font-size:.85rem;font-weight:700;border:none;cursor:pointer;transition:transform .2s}
.nav-cta:hover{transform:scale(1.05)}
.hero{position:relative;min-height:100vh;display:flex;align-items:flex-end;padding:0 48px 80px;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/${d.unsplash}?w=1440&q=80&auto=format') center/cover no-repeat}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(175deg,${oFrom} 0%,${rgba(d.bg, 0.35)} 35%,${oTo} 100%)}
.hero-content{position:relative;z-index:2;max-width:680px}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:99px;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:${rgba(d.accent, 0.12)};border:1px solid ${rgba(d.accent, 0.25)};color:var(--accent);margin-bottom:28px}
.hero-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--accent)}
.hero h1{font-family:var(--fd);font-size:clamp(3rem,7vw,5.5rem);font-weight:900;line-height:.92;letter-spacing:-.04em;margin-bottom:20px}
.hero h1 em{font-style:italic;color:var(--accent)}
.hero-sub{font-size:1.15rem;color:${sub};max-width:500px;line-height:1.65;margin-bottom:36px}
.hero-ctas{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:15px 30px;border-radius:12px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;transition:all .3s}
.btn-p{background:var(--accent);color:#fff;box-shadow:0 8px 30px ${rgba(d.accent, 0.3)}}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 12px 40px ${rgba(d.accent, 0.4)}}
.btn-o{background:transparent;border:1.5px solid ${dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.1)'};color:var(--text)}
.btn-o:hover{border-color:var(--accent);color:var(--accent)}
.hero-side{position:absolute;right:48px;top:50%;transform:translateY(-50%) rotate(90deg);font-size:.65rem;letter-spacing:.3em;text-transform:uppercase;color:${rgba(d.text, 0.12)};white-space:nowrap}
.section{padding:100px 48px;max-width:1200px;margin:0 auto}
.section-label{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:14px}
.section-title{font-family:var(--fd);font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-.03em;margin-bottom:14px}
.section-desc{font-size:.95rem;color:${sub};max-width:520px;line-height:1.7}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
.svc{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:32px 24px;transition:transform .3s;position:relative;overflow:hidden}
.svc:hover{transform:translateY(-6px);border-color:${rgba(d.accent, 0.25)}}
.svc .si{font-size:2rem;margin-bottom:14px;display:block}
.svc h3{font-family:var(--fd);font-size:1.1rem;font-weight:700;margin-bottom:8px}
.svc p{font-size:.85rem;color:${sub};line-height:1.6}
.testi{padding:100px 48px;text-align:center;max-width:780px;margin:0 auto}
.testi-q{font-family:var(--fd);font-size:clamp(1.2rem,3vw,1.6rem);font-style:italic;line-height:1.6;margin-bottom:24px}
.testi-a{font-weight:700;font-size:.9rem}
.cta-s{padding:80px 48px;text-align:center;background:${footBg};border-top:1px solid var(--border)}
.footer{padding:28px 48px;text-align:center;border-top:1px solid var(--border);background:${footBg};font-size:.78rem;color:${sub}}
</style></head><body>
<nav class="nav">
  <div class="nav-logo">${logo}<span class="dot">.</span></div>
  <div class="nav-links"><a href="#hizmetler">Hizmetler</a><a href="#yorumlar">Yorumlar</a><a href="#iletisim">İletişim</a></div>
  <button class="nav-cta">${ic.ctaButon.split(' ').slice(1).join(' ') || 'Randevu'}</button>
</nav>
<section class="hero">
  <div class="hero-bg"></div><div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-badge">${ic.badge}</div>
    <h1>${d.heroBaslik.split(' ').map((w, i)=>i === 0 ? w : `<br><em>${w}</em>`).join('')}</h1>
    <p class="hero-sub">${ic.altBaslik}</p>
    <div class="hero-ctas">
      <button class="btn btn-p">${ic.ctaButon}</button>
      <button class="btn btn-o">İncele</button>
    </div>
  </div>
  <div class="hero-side">${d.heroBaslik.toUpperCase()}</div>
</section>
<section class="section" id="hizmetler">
  <div class="section-title">Hizmetlerimiz</div>
  <div class="section-desc">${ic.altBaslik}</div>
  <div class="services-grid">
    ${d.hizmetler.map((h, i)=>`<div class="svc"><span class="si">${ik[i]}</span><h3>${h}</h3><p>${ic.hizmetAciklama[i] || 'Profesyonel hizmet'}</p></div>`).join('')}
  </div>
</section>
${menuSection}
<section class="testi" id="yorumlar">
  <div class="testi-q">${ic.yorum}</div>
  <div class="testi-a">— ${ic.yorumcu}</div>
</section>
<section class="cta-s" id="iletisim">
  <h2>${ic.ctaBaslik}</h2>
  <button class="btn btn-p" style="margin-top:20px">${ic.ctaButon}</button>
</section>
<footer class="footer">© 2025 ${d.heroBaslik} · <strong>kepenk.ai</strong></footer>
${DEMO_MODAL_HTML}
${DEMO_SCRIPT}
</body></html>`;
}
function htmlProfesyonel(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg) {
    // Profesyonel/Kurumsal Şablon: Sol Menu Sidebar, Sağ Split Content, Köşeli ve Temiz Hatlar
    return `<!DOCTYPE html><html lang="tr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:${d.bg};--text:${d.text};--accent:${d.accent};--muted:${sub};--card:${cardBg};--border:${cardBorder};--sidebar:280px;--fd:'${d.font}',serif;--fb:'Space Grotesk',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg);color:var(--text);display:flex}
.sidebar{width:var(--sidebar);height:100vh;position:fixed;left:0;top:0;background:${dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)'};border-right:1px solid var(--border);padding:40px;display:flex;flex-direction:column;justify-content:space-between}
.logo{font-family:var(--fd);font-size:1.4rem;font-weight:700;letter-spacing:-.02em}
.logo span{color:var(--accent)}
.nav{display:flex;flex-direction:column;gap:1.5rem}
.nav-link{font-size:.9rem;font-weight:500;color:var(--muted);transition:color .2s;display:flex;align-items:center;gap:10px}
.nav-link:hover,.nav-link.active{color:var(--text)}
.nav-link.active::before{content:'';width:4px;height:4px;background:var(--accent);border-radius:50%}
.sidebar-cta{padding:12px;background:var(--text);color:var(--bg);font-weight:600;font-size:.85rem;text-align:center;transition:opacity .2s;margin-top:20px}
.sidebar-cta:hover{opacity:0.9}
.main{margin-left:var(--sidebar);width:calc(100% - var(--sidebar));min-height:100vh;}
.hero{height:100vh;display:flex}
.hero-content{flex:1;padding:80px;display:flex;flex-direction:column;justify-content:center}
.hero-graphic{flex:1;background:url('https://images.unsplash.com/${d.unsplash}?w=1000&q=80&auto=format') center/cover}
.badge{font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;color:var(--accent);margin-bottom:20px;font-weight:600}
.hero h1{font-family:var(--fd);font-size:clamp(3rem,5vw,4.5rem);font-weight:600;line-height:1.1;margin-bottom:24px;letter-spacing:-.03em}
.hero p{font-size:1rem;color:var(--muted);line-height:1.7;max-width:480px;margin-bottom:40px}
.btn-group{display:flex;gap:16px}
.btn{padding:14px 28px;font-size:.85rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em;transition:all .3s;cursor:pointer;border:none}
.btn-p{background:var(--accent);color:#fff}
.btn-p:hover{background:var(--text);color:var(--bg)}
.section{padding:120px 80px;border-top:1px solid var(--border)}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:40px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.s-title{font-family:var(--fd);font-size:2.5rem;font-weight:500;margin-bottom:48px}
.svc-card{padding:40px;background:var(--card);border:1px solid var(--border);transition:all .3s}
.svc-card:hover{border-color:var(--accent);background:transparent}
.svc-card h3{font-family:var(--fd);font-size:1.2rem;margin-bottom:12px;display:flex;align-items:center;gap:12px}
.svc-card p{font-size:.85rem;color:var(--muted);line-height:1.6}
.stat-box{text-align:left;padding:32px 0;border-bottom:1px solid var(--border)}
.stat-n{font-family:var(--fd);font-size:3.5rem;color:var(--accent);font-weight:300;line-height:1}
.stat-l{font-size:.8rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-top:10px}
@media(max-width:900px) { body{flex-direction:column} .sidebar{position:relative;width:100%;height:auto;flex-direction:row;align-items:center;padding:20px} .nav{display:none} .main{margin-left:0;width:100%} .hero{flex-direction:column-reverse;height:auto} .hero-content{padding:40px} .hero-graphic{min-height:400px} .section{padding:60px 40px} .grid-2,.grid-3{grid-template-columns:1fr} }
</style></head><body>
<aside class="sidebar">
  <div class="logo">${d.heroBaslik.split(' ')[0]}<span>.</span></div>
  <nav class="nav">
    <a href="#" class="nav-link active">Anasayfa</a>
    <a href="#uzmanlik" class="nav-link">Uzmanlık Alanlarımız</a>
    <a href="#hakkimizda" class="nav-link">Hakkımızda</a>
    <a href="#iletisim" class="nav-link">İletişim</a>
  </nav>
  <button class="sidebar-cta">${ic.ctaButon}</button>
</aside>
<main class="main">
  <section class="hero">
    <div class="hero-content">
      <div class="badge">${ic.badge}</div>
      <h1>${d.heroBaslik}</h1>
      <p>${ic.altBaslik}</p>
      <div class="btn-group">
        <button class="btn btn-p">${ic.ctaButon}</button>
      </div>
    </div>
    <div class="hero-graphic"></div>
  </section>
  <section class="section" id="uzmanlik">
    <h2 class="s-title">Uzmanlık Alanları</h2>
    <div class="grid-3">
      ${d.hizmetler.map((h, i)=>`<div class="svc-card"><h3><span>${ik[i]}</span>${h}</h3><p>${ic.hizmetAciklama[i] || 'Detaylı bilgi için.'}</p></div>`).join('')}
    </div>
  </section>
  <section class="section" id="hakkimizda">
    <div class="grid-2">
      <div>
        <h2 class="s-title">Hakkımızda</h2>
        <p style="color:var(--muted);line-height:1.7;font-size:1rem">${ic.yorum} — ${ic.yorumcu}</p>
      </div>
      <div class="grid-2" style="gap:0 40px">
        ${ic.stats.slice(0, 2).map(([n, l])=>`<div class="stat-box"><div class="stat-n">${n}</div><div class="stat-l">${l}</div></div>`).join('')}
      </div>
    </div>
  </section>
</main>
${DEMO_MODAL_HTML}
${DEMO_SCRIPT}
</body></html>`;
}
function htmlSaglikGuzellik(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg) {
    // Sağlık & Güzellik Şablon: Yuvarlak hatlar, ortalanmış, floating nav, soft renkler ve organik formlar
    return `<!DOCTYPE html><html lang="tr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=${d.font.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root{--bg:${d.bg};--text:${d.text};--accent:${d.accent};--muted:${sub};--card:${cardBg};--border:${cardBorder};--nav-h:60px;--fd:'${d.font}',serif;--fb:'Nunito',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:var(--fb);background:var(--bg);color:var(--text);text-align:center;padding-top:100px}
.nav-wrap{position:fixed;top:24px;left:0;width:100%;z-index:99;display:flex;justify-content:center;padding:0 20px}
.nav{background:${navBg};backdrop-filter:blur(16px);border:1px solid var(--border);border-radius:99px;height:var(--nav-h);padding:0 8px 0 32px;display:flex;align-items:center;gap:40px;box-shadow:0 10px 40px rgba(0,0,0,.05)}
.logo{font-family:var(--fd);font-size:1.2rem;font-weight:700}
.nav-links{display:flex;gap:24px}
.nav-links a{font-size:.9rem;color:var(--muted);font-weight:600;transition:color .2s}
.nav-links a:hover{color:var(--text)}
.nav-btn{background:var(--accent);color:#fff;border:none;height:44px;padding:0 24px;border-radius:99px;font-weight:700;font-size:.85rem;cursor:pointer}
.nav-btn:hover{background:var(--text);color:var(--bg)}
.hero{padding:60px 20px 100px;max-width:800px;margin:0 auto}
.badge{background:${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.03)'};color:var(--text);padding:8px 20px;border-radius:99px;font-size:.8rem;font-weight:700;display:inline-block;margin-bottom:30px}
.hero h1{font-family:var(--fd);font-size:clamp(2.5rem,6vw,4rem);font-weight:600;margin-bottom:24px;line-height:1.1}
.hero p{font-size:1.1rem;color:var(--muted);margin-bottom:40px;line-height:1.6}
.hero-img{width:90%;max-width:1000px;height:500px;margin:0 auto;border-radius:40px;background:url('https://images.unsplash.com/${d.unsplash}?w=1200&q=80&auto=format') center/cover;box-shadow:0 30px 60px ${dark ? 'rgba(0,0,0,.5)' : 'rgba(0,0,0,.1)'}}
.section{padding:100px 20px;max-width:1000px;margin:0 auto}
.s-title{font-family:var(--fd);font-size:2.5rem;font-weight:600;margin-bottom:16px}
.s-desc{color:var(--muted);font-size:1.05rem;max-width:600px;margin:0 auto 60px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}
.card{background:var(--card);border:1px solid var(--border);border-radius:32px;padding:48px 32px;transition:transform .3s}
.card:hover{transform:translateY(-10px);background:${dark ? 'rgba(255,255,255,.08)' : '#fff'};box-shadow:0 20px 40px rgba(0,0,0,.03)}
.icon-w{width:64px;height:64px;border-radius:50%;background:${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.03)'};display:flex;align-items:center;justify-content:center;font-size:1.6rem;margin:0 auto 24px;color:var(--accent)}
.card h3{font-family:var(--fd);font-size:1.2rem;margin-bottom:12px}
.card p{color:var(--muted);font-size:.9rem;line-height:1.6}
.banner{background:var(--accent);color:#fff;padding:80px 20px;border-radius:40px;margin:100px 20px}
.banner h2{font-family:var(--fd);font-size:2rem;margin-bottom:30px}
.banner button{background:#fff;color:var(--accent);border:none;padding:16px 36px;border-radius:99px;font-weight:700;font-size:1rem;cursor:pointer}
@media(max-width:768px){.nav-links{display:none} .hero-img{height:300px;border-radius:24px} .grid-3{grid-template-columns:1fr}}
</style></head><body>
<div class="nav-wrap">
  <nav class="nav">
    <div class="logo">${d.heroBaslik.split(' ')[0]}</div>
    <div class="nav-links"><a>Bakımlar</a><a>Uzmanlar</a><a>Yorumlar</a></div>
    <button class="nav-btn">Randevu</button>
  </nav>
</div>
<section class="hero">
  <div class="badge">${ic.badge}</div>
  <h1>${d.heroBaslik}</h1>
  <p>${ic.altBaslik}</p>
</section>
<div class="hero-img"></div>
<section class="section">
  <h2 class="s-title">Deneyimlerimiz</h2>
  <p class="s-desc">Size özel hazırlanan profesyonel bakım ve sağlık hizmetleri.</p>
  <div class="grid-3">
    ${d.hizmetler.map((h, i)=>`<div class="card"><div class="icon-w">${ik[i]}</div><h3>${h}</h3><p>${ic.hizmetAciklama[i] || 'Özel hizmet paketi.'}</p></div>`).join('')}
  </div>
</section>
<div class="banner">
  <h2>${ic.ctaBaslik}</h2>
  <button>${ic.ctaButon}</button>
</div>
${DEMO_MODAL_HTML}
${DEMO_SCRIPT}
</body></html>`;
}
function demoHtmlUret(d) {
    const dark = isDark(d.bg);
    const ic = ICERIKLER[d.id] || varsayilanIcerik(d);
    const ik = IK[d.id] || [
        '🎯',
        '⭐',
        '💎'
    ];
    const navBg = dark ? rgba(d.bg, 0.85) : rgba('#ffffff', 0.92);
    const navBorder = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
    const cardBg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';
    const cardBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const sub = dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
    const footBg = dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
    const oFrom = rgba(d.bg, 0.15);
    const oTo = rgba(d.bg, 0.92);
    const logo = d.heroBaslik.split(' ')[0];
    switch(d.kategori){
        case 'profesyonel':
            return htmlProfesyonel(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg);
        case 'saglik-guzellik':
            return htmlSaglikGuzellik(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg);
        case 'etkinlik':
            // Fallback etkinlik to profesyonel styled since we have just 1 event for now
            return htmlProfesyonel(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg);
        case 'yerel-esnaf':
        default:
            return htmlYerelEsnaf(d, ic, ik, dark, navBg, navBorder, cardBg, cardBorder, sub, footBg, oFrom, oTo, logo);
    }
}
const DEMO_MODAL_HTML = `
<!-- Kepenk.ai Interactive Demo Elements -->
<!-- 1. Universal Modal -->
<div id="k-modal-overlay" class="k-modal-overlay">
  <div class="k-modal">
    <button class="k-modal-close" onclick="closeModal()">✕</button>
    <div class="k-modal-header">
      <h3 id="k-modal-title">Randevu Talebi</h3>
      <p id="k-modal-desc">Lütfen iletişim bilgilerinizi bırakın, size en kısa sürede dönüş yapalım.</p>
    </div>
    <form id="k-modal-form" onsubmit="submitForm(event)">
      <div class="k-input-group">
        <label>Adınız Soyadınız</label>
        <input type="text" required placeholder="Örn: Ahmet Yılmaz">
      </div>
      <div class="k-input-group">
        <label>Telefon Numaranız</label>
        <input type="tel" required placeholder="05XX XXX XX XX">
      </div>
      <button type="submit" class="k-submit-btn" id="k-submit-btn">Gönder</button>
    </form>
    <div id="k-success-msg" class="k-success-msg" style="display: none;">
      <div class="k-success-icon">✓</div>
      <h4>Talebiniz Alındı!</h4>
      <p>Satış temsilcimiz en kısa sürede sizinle iletişime geçecektir.</p>
    </div>
  </div>
</div>

<!-- 2. WhatsApp Floating Widget -->
<div class="k-wa-widget">
  <div class="k-wa-tooltip">Size nasıl yardımcı olabilirim? 👋</div>
  <button class="k-wa-btn" onclick="openModal('WhatsApp İletişim', 'WhatsApp üzerinden hızlıca destek almak için bilgilerinizi bırakın.')">
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 13.92 2.55 15.7 3.5 17.2L2 22L6.96 20.65C8.42 21.52 10.15 22 11.99 22C17.51 22 22 17.52 22 12C22 6.48 17.51 2 11.99 2ZM17.15 15.61C16.92 16.27 15.82 16.82 15.17 16.94C14.7 17.03 14.07 17.13 11.66 16.13C8.61 14.86 6.64 11.77 6.49 11.57C6.34 11.37 5.25 9.93 5.25 8.42C5.25 6.92 6.01 6.18 6.3 5.88C6.55 5.62 6.96 5.51 7.37 5.51C7.5 5.51 7.62 5.52 7.72 5.52C8.03 5.54 8.18 5.56 8.38 6.04C8.64 6.66 9.27 8.2 9.34 8.35C9.42 8.5 9.5 8.7 9.4 8.9C9.3 9.09 9.22 9.21 9.07 9.38C8.92 9.55 8.75 9.77 8.62 9.92C8.47 10.09 8.32 10.27 8.5 10.58C8.68 10.89 9.27 11.85 10.14 12.63C11.26 13.63 12.16 13.95 12.49 14.08C12.82 14.22 13.2 14.19 13.43 13.94C13.72 13.63 14.09 13.11 14.47 12.58C14.76 12.18 15.14 12.23 15.45 12.34C15.76 12.45 17.41 13.26 17.74 13.43C18.07 13.6 18.29 13.68 18.37 13.82C18.45 13.96 18.45 14.61 18.15 15.34L17.15 15.61Z"></path>
    </svg>
  </button>
</div>

<!-- 3. Dashboard Return Banner (For testing only) -->
<div class="k-return-banner">
  <div class="k-banner-content">
    <span>💡 Bu bir <strong>Kepenk.ai</strong> interaktif demosudur.</span>
    <a href="/dashboard" class="k-return-btn">Panele Dön</a>
  </div>
</div>

<style>
/* Kepenk.ai Interactive Demo Styles */
.k-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  padding: 20px;
}
.k-modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}
.k-modal {
  background: var(--bg, #ffffff);
  color: var(--text, #111111);
  width: 100%;
  max-width: 440px;
  border-radius: 24px;
  padding: 40px;
  position: relative;
  transform: translateY(20px) scale(0.95);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 24px 48px rgba(0,0,0,0.12);
  border: 1px solid var(--border, rgba(0,0,0,0.1));
}
.k-modal-overlay.active .k-modal {
  transform: translateY(0) scale(1);
}
.k-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--card, rgba(0,0,0,0.05));
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.k-modal-close:hover {
  background: var(--border, rgba(0,0,0,0.1));
}
.k-modal-header {
  margin-bottom: 24px;
  text-align: center;
}
.k-modal-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  font-family: var(--fd, inherit);
}
.k-modal-header p {
  font-size: 0.9rem;
  color: var(--muted, #666);
  line-height: 1.5;
}
.k-input-group {
  margin-bottom: 20px;
}
.k-input-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text);
}
.k-input-group input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border, rgba(0,0,0,0.1));
  background: var(--card, rgba(0,0,0,0.02));
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.2s;
}
.k-input-group input:focus {
  outline: none;
  border-color: var(--accent, #ea580c);
  box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.1);
}
.k-submit-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: var(--accent, #ea580c);
  color: #ffffff;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  font-family: inherit;
}
.k-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 88, 12, 0.25);
}
.k-success-msg {
  text-align: center;
  padding: 20px 0;
}
.k-success-icon {
  width: 64px;
  height: 64px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 20px;
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.k-success-msg h4 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  font-family: var(--fd, inherit);
}
.k-success-msg p {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

/* WhatsApp Widget */
.k-wa-widget {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 12px;
}
.k-wa-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  border: none;
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.k-wa-btn:hover {
  transform: scale(1.1) rotate(-5deg);
}
.k-wa-tooltip {
  background: var(--bg, #fff);
  color: var(--text, #111);
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border: 1px solid var(--border, rgba(0,0,0,0.05));
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s;
  pointer-events: none;
}
.k-wa-widget:hover .k-wa-tooltip {
  opacity: 1;
  transform: translateY(0);
}

/* Return Banner */
.k-return-banner {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 9999;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 12px 20px;
  border-radius: 99px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
}
.k-banner-content {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #fff;
  font-size: 0.85rem;
  font-family: system-ui, -apple-system, sans-serif;
}
.k-return-btn {
  background: #fff;
  color: #000;
  padding: 8px 16px;
  border-radius: 99px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.8rem;
  transition: transform 0.2s;
}
.k-return-btn:hover {
  transform: scale(1.05);
  color: #000;
}

@keyframes scaleIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: 768px) {
  .k-wa-widget { bottom: 20px; right: 20px; }
  .k-return-banner { display: none; /* Hide on mobile to save space */ }
}
</style>
`;
const DEMO_SCRIPT = `
<script>
// Kepenk.ai Interactive Demo Logic
const INTERACTIVE_MODE = true;

// 1. Modal Logic
function openModal(title, desc) {
  const overlay = document.getElementById('k-modal-overlay');
  const titleEl = document.getElementById('k-modal-title');
  const descEl = document.getElementById('k-modal-desc');
  const form = document.getElementById('k-modal-form');
  const successMsg = document.getElementById('k-success-msg');
  
  if (title) titleEl.innerText = title;
  if (desc) descEl.innerText = desc;
  
  // Reset state
  form.style.display = 'block';
  successMsg.style.display = 'none';
  form.reset();
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('k-modal-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('k-submit-btn');
  const form = document.getElementById('k-modal-form');
  btn.innerText = 'Gönderiliyor...';
  btn.disabled = true;
  
  const formData = new FormData(form);
  const payload = {
    ad: formData.get('ad') || '',
    telefon: formData.get('telefon') || '',
    kaynakSite: window.location.hostname,
    sektorId: document.querySelector('meta[name="sektor-id"]')?.content || null,
    mesaj: document.getElementById('k-modal-title')?.innerText || ''
  };

  // Gerçek API çağrısı — iframe sandbox içinde 2 yöntem denenir:
  // 1. postMessage ile parent sayfaya ilet (sandbox-safe)
  // 2. Doğrudan fetch (same-origin demo'larda çalışır)
  try {
    window.parent.postMessage({ type: 'demo-lead', payload }, '*');
  } catch {}

  fetch('/api/lead/demo-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => r.ok ? r.json() : Promise.reject('API error'))
  .catch(() => ({ ok: true, mock: true }))
  .finally(() => {
    document.getElementById('k-modal-form').style.display = 'none';
    document.getElementById('k-success-msg').style.display = 'block';
    btn.innerText = 'Gönder';
    btn.disabled = false;
    setTimeout(() => closeModal(), 3000);
  });
}

// Close modal on click outside
document.getElementById('k-modal-overlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'k-modal-overlay') {
    closeModal();
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// 2. Attach click handlers to all buttons
document.addEventListener('DOMContentLoaded', () => {
  // Find all buttons that look like CTAs
  const ctas = document.querySelectorAll('button:not(.k-modal-close):not(.k-submit-btn)');
  
  ctas.forEach(btn => {
    // If it already has an onclick, skip it (like WhatsApp btn)
    if (btn.hasAttribute('onclick')) return;
    
    btn.addEventListener('click', (e) => {
      const text = e.target.innerText.trim();
      let title = 'İletişim Talebi';
      let desc = 'İlginiz için teşekkürler, size en kısa sürede dönüş yapacağız.';
      
      if (text.toLowerCase().includes('randevu')) {
        title = 'Randevu Alın';
        desc = 'Size uygun tarihi belirlemek için bilgilerinizi bırakın.';
      } else if (text.toLowerCase().includes('sipariş')) {
        title = 'Sipariş Verin';
        desc = 'Hızlı sipariş için lütfen numaranızı bırakın, sizi arayalım.';
      }
      
      openModal(title, desc);
    });
  });

  // 3. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
</script>
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/hooks/useEditorPreview.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEditorPreview",
    ()=>useEditorPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$utils$2f$demoHtmlUretici$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/utils/demoHtmlUretici.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useEditorPreview() {
    _s();
    const siteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "useEditorPreview.useEditorStore[siteData]": (s)=>s.siteData
    }["useEditorPreview.useEditorStore[siteData]"]);
    const setGeneratedHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "useEditorPreview.useEditorStore[setGeneratedHtml]": (s)=>s.setGeneratedHtml
    }["useEditorPreview.useEditorStore[setGeneratedHtml]"]);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const generateHtml = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useEditorPreview.useCallback[generateHtml]": (data)=>{
            // Convert SiteData to DemoSector format expected by demoHtmlUret
            const demoSector = {
                id: data.sektorId,
                ad: data.isletmeAdi,
                kategori: data.kategori,
                bg: data.bg,
                accent: data.accent,
                text: data.text,
                font: data.font,
                unsplash: data.unsplash,
                heroBaslik: data.heroBaslik,
                heroAlt: data.heroAlt,
                hizmetler: data.hizmetler
            };
            const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$utils$2f$demoHtmlUretici$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoHtmlUret"])(demoSector);
            setGeneratedHtml(html);
        }
    }["useEditorPreview.useCallback[generateHtml]"], [
        setGeneratedHtml
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEditorPreview.useEffect": ()=>{
            if (!siteData) return;
            // Debounce: 300ms
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout({
                "useEditorPreview.useEffect": ()=>{
                    generateHtml(siteData);
                }
            }["useEditorPreview.useEffect"], 300);
            return ({
                "useEditorPreview.useEffect": ()=>{
                    if (timerRef.current) clearTimeout(timerRef.current);
                }
            })["useEditorPreview.useEffect"];
        }
    }["useEditorPreview.useEffect"], [
        siteData,
        generateHtml
    ]);
    // Also generate immediately on first load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEditorPreview.useEffect": ()=>{
            if (siteData) {
                generateHtml(siteData);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useEditorPreview.useEffect"], []);
}
_s(useEditorPreview, "MutPbQ2r+xGc3spWn9b7rlFCXD0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EditorShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$components$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/TopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$components$2f$LeftBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/LeftBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$components$2f$Canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/Canvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$components$2f$RightPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/RightPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/store/editor-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$context$2f$EsnafContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/context/EsnafContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/data/demoVitrinData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$hooks$2f$useEditorPreview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/hooks/useEditorPreview.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
function EditorShell() {
    _s();
    const isDirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "EditorShell.useEditorStore[isDirty]": (s)=>s.isDirty
    }["EditorShell.useEditorStore[isDirty]"]);
    const siteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "EditorShell.useEditorStore[siteData]": (s)=>s.siteData
    }["EditorShell.useEditorStore[siteData]"]);
    const setSiteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"])({
        "EditorShell.useEditorStore[setSiteData]": (s)=>s.setSiteData
    }["EditorShell.useEditorStore[setSiteData]"]);
    const { esnaf, loading: esnafLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$context$2f$EsnafContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEsnaf"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    /* Wait for mount before using portal */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorShell.useEffect": ()=>{
            setMounted(true);
        }
    }["EditorShell.useEffect"], []);
    /* Populate siteData from EsnafContext + DEMOLAR on first load */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorShell.useEffect": ()=>{
            if (siteData || esnafLoading) return;
            // Try to match esnaf's sektor to a demo
            const sektor = esnaf?.sektor || '';
            const demo = __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOLAR"].find({
                "EditorShell.useEffect": (d)=>d.ad.toLowerCase().includes(sektor.toLowerCase())
            }["EditorShell.useEffect"]) || __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$data$2f$demoVitrinData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEMOLAR"][0];
            const initial = {
                sektorId: demo.id,
                kategori: demo.kategori,
                isletmeAdi: esnaf?.isletmeAdiTam || esnaf?.isletmeAdi || esnaf?.ad || demo.heroBaslik,
                heroBaslik: esnaf?.isletmeAdiTam || esnaf?.isletmeAdi || demo.heroBaslik,
                heroAlt: demo.heroAlt,
                hizmetler: demo.hizmetler,
                bg: demo.bg,
                accent: demo.accent,
                text: demo.text,
                font: demo.font,
                unsplash: demo.unsplash,
                telefon: esnaf?.telefon || esnaf?.waNumarasi || '',
                adres: esnaf?.ilce ? `${esnaf.ilce}, İstanbul` : 'İstanbul',
                paket: esnaf?.paket || 'STANDART',
                moduller: []
            };
            setSiteData(initial);
        }
    }["EditorShell.useEffect"], [
        esnaf,
        esnafLoading,
        siteData,
        setSiteData
    ]);
    /* Activate the preview hook — watches siteData, generates HTML */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$hooks$2f$useEditorPreview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorPreview"])();
    /* Warn before leaving with unsaved changes */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorShell.useEffect": ()=>{
            const handler = {
                "EditorShell.useEffect.handler": (e)=>{
                    if (isDirty) {
                        e.preventDefault();
                        e.returnValue = '';
                    }
                }
            }["EditorShell.useEffect.handler"];
            window.addEventListener('beforeunload', handler);
            return ({
                "EditorShell.useEffect": ()=>window.removeEventListener('beforeunload', handler)
            })["EditorShell.useEffect"];
        }
    }["EditorShell.useEffect"], [
        isDirty
    ]);
    /* Load Inter font (non-blocking) */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditorShell.useEffect": ()=>{
            if (!document.getElementById('ke-inter-font')) {
                const link = document.createElement('link');
                link.id = 'ke-inter-font';
                link.rel = 'stylesheet';
                link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
                document.head.appendChild(link);
            }
        }
    }["EditorShell.useEffect"], []);
    if (!mounted) return null;
    /* Portal: renders directly on document.body, escaping dashboard stacking context */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
                .ke-editor-root { position: fixed; inset: 0; display: flex; flex-direction: column; z-index: 99999; font-family: 'Inter', system-ui, -apple-system, sans-serif; background: #e8ecf1; -webkit-font-smoothing: antialiased; isolation: isolate; }
                .ke-editor-body { flex: 1; display: flex; overflow: hidden; }
                .ke-editor-root *, .ke-editor-root *::before, .ke-editor-root *::after { box-sizing: border-box; }
            `
            }, void 0, false, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ke-editor-root",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$components$2f$TopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx",
                        lineNumber: 88,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ke-editor-body",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$components$2f$LeftBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx",
                                lineNumber: 90,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$components$2f$Canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx",
                                lineNumber: 91,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$components$2f$RightPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx",
                                lineNumber: 92,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx",
                lineNumber: 87,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true), document.body);
}
_s(EditorShell, "/l2NUOyk7wNk/n8SEdqeu7Q3ZYg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$store$2f$editor$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$context$2f$EsnafContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEsnaf"],
        __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$app$2f$dashboard$2f$sitem$2f$editor$2f$hooks$2f$useEditorPreview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditorPreview"]
    ];
});
_c = EditorShell;
var _c;
__turbopack_context__.k.register(_c, "EditorShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/XinXia/apps/web/src/app/dashboard/sitem/editor/components/EditorShell.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=XinXia_apps_web_src_1846df52._.js.map