import { create } from 'zustand';
import { type EditorState, type ComponentData, type ComponentType, type ComponentStyle } from '../types/editor';

interface EditorActions {
    addComponent: (type: ComponentType, parentId?: string) => void;
    removeComponent: (id: string) => void;
    selectComponent: (id: string | null) => void;
    updateComponentStyle: (id: string, style: Partial<ComponentStyle>) => void;
    updateComponentProps: (id: string, props: Record<string, any>) => void;
    moveComponent: (id: string, overId: string) => void;
}

const INITIAL_ROOT: ComponentData = {
    id: 'root',
    type: 'container',
    props: {},
    style: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    childrenIds: [],
    parentId: null,
};

// Start with just root
const INITIAL_STATE: Omit<EditorState, 'history' | 'historyIndex'> = {
    components: { 'root': INITIAL_ROOT },
    rootId: 'root',
    selectedId: null,
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
    ...INITIAL_STATE,
    history: [],
    historyIndex: -1,

    addComponent: (type, parentId = 'root') => set((state) => {
        const newId = generateId();
        const newComponent: ComponentData = {
            id: newId,
            type,
            props: { text: type === 'text' ? 'New Text' : undefined },
            style: { padding: '10px', border: '1px dashed #ccc' }, // Default styles
            childrenIds: [],
            parentId,
        };

        const parent = state.components[parentId];
        if (!parent) return state;

        return {
            components: {
                ...state.components,
                [newId]: newComponent,
                [parentId]: {
                    ...parent,
                    childrenIds: [...parent.childrenIds, newId],
                },
            },
        };
    }),

    removeComponent: (id) => set((state) => {
        if (id === 'root') return state;
        const component = state.components[id];
        if (!component || !component.parentId) return state;

        const parent = state.components[component.parentId];
        const newChildrenIds = parent.childrenIds.filter((childId) => childId !== id);

        // Remove component and update parent
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _removed, ...restComponents } = state.components;

        return {
            components: {
                ...restComponents,
                [component.parentId]: {
                    ...parent,
                    childrenIds: newChildrenIds,
                },
            },
            selectedId: state.selectedId === id ? null : state.selectedId,
        };
    }),

    selectComponent: (id) => set({ selectedId: id }),

    updateComponentStyle: (id, style) => set((state) => {
        const component = state.components[id];
        if (!component) return state;
        return {
            components: {
                ...state.components,
                [id]: {
                    ...component,
                    style: { ...component.style, ...style },
                },
            },
        };
    }),

    updateComponentProps: (id, props) => set((state) => {
        const component = state.components[id];
        if (!component) return state;
        return {
            components: {
                ...state.components,
                [id]: {
                    ...component,
                    props: { ...component.props, ...props },
                },
            },
        };
    }),

    moveComponent: (_id, _overId) => set((state) => {
        // Check if moving inside/outside or reordering?
        // For simplicity, just reordering within same parent or not implemented yet.
        return state;
    }),
}));
