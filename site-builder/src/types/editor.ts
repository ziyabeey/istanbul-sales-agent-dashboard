export type ComponentType = 'text' | 'image' | 'button' | 'container' | 'video' | 'form';

export interface ComponentStyle {
    width?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    display?: 'flex' | 'block' | 'inline-block';
    flexDirection?: 'row' | 'column';
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    border?: string;
    boxShadow?: string;
    [key: string]: string | number | undefined;
}

export interface ComponentData {
    id: string;
    type: ComponentType;
    props: Record<string, any>;
    style: ComponentStyle;
    childrenIds: string[]; // Normalized by ID
    parentId: string | null;
}

export interface EditorState {
    components: Record<string, ComponentData>;
    rootId: string;
    selectedId: string | null;
    history: EditorState[]; // Better to store state snapshots for undo/redo
    historyIndex: number;
}
