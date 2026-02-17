import React from 'react';
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    type DragEndEvent,
    type DragStartEvent,
} from '@dnd-kit/core';
import { Sidebar } from '@/components/editor/Sidebar';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { Renderer } from '@/components/editor/Renderer';
import { useEditorStore } from '@/store/editorStore';
import { createPortal } from 'react-dom';

export const Editor = () => {
    const rootId = useEditorStore((state) => state.rootId);
    const addComponent = useEditorStore((state) => state.addComponent);
    const [activeId, setActiveId] = React.useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Prevent accidental drags
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        // Check if new item from Sidebar
        // The id from Sidebar is `new-type`. data is { type, isNew: true }
        if (String(active.id).startsWith('new-')) {
            const type = (active.data.current?.type || String(active.id).split('-')[1]) as any;
            // Add to the container dropped over
            if (over.id) {
                console.log('Adding', type, 'to', over.id);
                addComponent(type, String(over.id));
            }
        } else {
            // Handle sorting/moving existing items (not implemented in MVP)
            console.log('Moved existing item', active.id, 'to', over.id);
        }
    };

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex h-screen bg-background">
                <Sidebar />
                <div className="flex-1 bg-gray-50 overflow-hidden relative flex flex-col">
                    <header className="h-14 border-b bg-white flex items-center px-4 justify-between">
                        <span className="font-bold">Site Builder</span>
                        <div className="flex gap-2">
                            <button className="text-sm px-3 py-1 border rounded hover:bg-gray-100">Preview</button>
                            <button className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800">Publish</button>
                        </div>
                    </header>
                    <div className="flex-1 overflow-auto p-8 flex justify-center">
                        {/* The Canvas Area */}
                        <div className="bg-white shadow-sm min-h-[800px] w-full max-w-[1200px] transition-all">
                            <Renderer id={rootId} />
                        </div>
                    </div>
                </div>
                <PropertiesPanel />
            </div>
            {/* Drag Overlay for ghost image */}
            {createPortal(
                <DragOverlay>
                    {activeId ? (
                        <div className="p-2 bg-blue-500 text-white rounded opacity-80 w-32 h-10 flex items-center justify-center shadow-xl">
                            Dragging...
                        </div>
                    ) : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
};
