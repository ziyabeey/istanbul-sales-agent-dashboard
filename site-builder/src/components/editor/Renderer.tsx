import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import { cn } from '@/lib/utils';
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface RendererProps {
    id: string;
}

export const Renderer: React.FC<RendererProps> = ({ id }) => {
    const component = useEditorStore((state) => state.components[id]);
    const selectComponent = useEditorStore((state) => state.selectComponent);
    const selectedId = useEditorStore((state) => state.selectedId);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
        data: { id, type: component?.type },
        disabled: id === 'root',
    });

    const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
        id: id,
        data: { id, type: component?.type },
    });

    if (!component) return null;

    const style: React.CSSProperties = {
        ...component.style,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        border: selectedId === id ? '2px solid #3b82f6' : component.style.border,
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        selectComponent(id);
    };

    const renderContent = () => {
        switch (component.type) {
            case 'text':
                return <p>{component.props.text}</p>;
            case 'button':
                return <button className="px-4 py-2 bg-blue-500 text-white rounded">{component.props.text || 'Button'}</button>;
            case 'container':
                return (
                    <div className={cn("min-h-[50px]", isOver && "bg-blue-50")}>
                        {component.childrenIds.map((childId) => (
                            <Renderer key={childId} id={childId} />
                        ))}
                    </div>
                );
            case 'image':
                return <img src={component.props.src || 'https://via.placeholder.com/150'} alt="placeholder" className="max-w-full h-auto" />;
            default:
                return null;
        }
    };

    if (component.type === 'container' || id === 'root') {
        return (
            <div
                ref={(node) => { setNodeRef(node); setDroppableNodeRef(node); }}
                style={style}
                onClick={handleClick}
                {...attributes}
                {...listeners}
                className={cn("relative p-4", component.type === 'container' && "border border-dashed border-gray-300")}
            >
                {renderContent()}
            </div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={handleClick}
            {...attributes}
            {...listeners}
            className="relative cursor-move"
        >
            {renderContent()}
        </div>
    );
};
