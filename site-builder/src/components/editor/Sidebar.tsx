import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { Type, Image, Box, MousePointer2 } from 'lucide-react';

const DraggableItem = ({ type, icon: Icon, label }: { type: string; icon: any; label: string }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `new-${type}`,
        data: { type, isNew: true },
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cn(
                "flex flex-col items-center justify-center p-4 border rounded cursor-grab hover:bg-accent",
                "w-24 h-24 bg-background shadow-sm transition-colors"
            )}
        >
            <Icon className="w-8 h-8 mb-2 text-muted-foreground" />
            <span className="text-xs font-medium">{label}</span>
        </div>
    );
};

export const Sidebar = () => {
    return (
        <div className="w-64 border-r bg-muted/10 p-4 h-full flex flex-col gap-4">
            <h2 className="font-semibold text-lg mb-4">Components</h2>
            <div className="grid grid-cols-2 gap-2">
                <DraggableItem type="text" icon={Type} label="Text" />
                <DraggableItem type="button" icon={MousePointer2} label="Button" />
                <DraggableItem type="container" icon={Box} label="Container" />
                <DraggableItem type="image" icon={Image} label="Image" />
            </div>
        </div>
    );
};
