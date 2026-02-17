import React from 'react';
import { useEditorStore } from '@/store/editorStore';

export const PropertiesPanel = () => {
    const selectedId = useEditorStore((state) => state.selectedId);
    const component = useEditorStore((state) => selectedId ? state.components[selectedId] : null);
    const updateStyle = useEditorStore((state) => state.updateComponentStyle);
    const updateProps = useEditorStore((state) => state.updateComponentProps);

    if (!component) {
        return (
            <div className="w-80 border-l bg-muted/10 p-4 h-full flex items-center justify-center text-muted-foreground">
                Select a component
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (['text', 'src'].includes(name)) {
            updateProps(component.id, { [name]: value });
        } else {
            updateStyle(component.id, { [name]: value });
        }
    };

    return (
        <div className="w-80 border-l bg-background p-4 h-full overflow-y-auto">
            <h2 className="font-semibold text-lg mb-4">Properties</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">ID</label>
                    <input className="w-full p-2 border rounded bg-muted text-muted-foreground" value={component.id} disabled />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <input className="w-full p-2 border rounded bg-muted text-muted-foreground" value={component.type} disabled />
                </div>

                {component.type === 'text' || component.type === 'button' ? (
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Text Content</label>
                        <input name="text" className="w-full p-2 border rounded" value={component.props.text || ''} onChange={handleChange} />
                    </div>
                ) : null}

                {component.type === 'image' ? (
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Source URL</label>
                        <input name="src" className="w-full p-2 border rounded" value={component.props.src || ''} onChange={handleChange} />
                    </div>
                ) : null}

                <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Style</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className="text-xs">Background</label>
                            <input name="backgroundColor" type="color" className="w-full h-8" value={component.style.backgroundColor || '#ffffff'} onChange={handleChange} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs">Color</label>
                            <input name="color" type="color" className="w-full h-8" value={component.style.color || '#000000'} onChange={handleChange} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs">Padding</label>
                            <input name="padding" className="w-full p-1 border rounded text-sm" value={component.style.padding || ''} onChange={handleChange} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs">Margin</label>
                            <input name="margin" className="w-full p-1 border rounded text-sm" value={component.style.margin || ''} onChange={handleChange} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs">Wait/Height</label>
                            <div className="flex gap-1">
                                <input name="width" placeholder="W" className="w-full p-1 border rounded text-sm" value={component.style.width || ''} onChange={handleChange} />
                                <input name="height" placeholder="H" className="w-full p-1 border rounded text-sm" value={component.style.height || ''} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
