"use client";
import React from 'react';
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { Container } from "@/components/User/Container";
import { Button } from "@/components/User/Button";
import { Text } from "@/components/User/Text";
import { Button as UiButton } from "@/components/ui/button";

const Topbar = ({ siteId }: { siteId: string }) => {
    const { query } = useEditor();
    const handleSave = async () => {
        const json = query.serialize();
        try {
            const res = await fetch(`http://localhost:3001/sites/${siteId}/pages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "Home",
                    content: JSON.parse(json)
                })
            });
            if (res.ok) alert('Saved!');
            else alert('Error saving');
        } catch (e) {
            console.error(e);
            alert('Error saving');
        }
    };

    return (
        <div className="flex justify-between items-center bg-gray-100 p-2 border-b h-14">
            <h1 className="font-bold">Editor - {siteId}</h1>
            <UiButton onClick={handleSave} variant="default">Save</UiButton>
        </div>
    )
};

const Toolbox = () => {
    const { connectors } = useEditor();

    return (
        <div className="space-y-2">
            <div
                ref={(ref) => { if (ref) connectors.create(ref, <Button text="Click me" className="bg-blue-500 text-white p-2 rounded" />) }}
                className="p-2 bg-white border rounded shadow w-full cursor-grab"
            >
                Button
            </div>
            <div
                ref={(ref) => { if (ref) connectors.create(ref, <Element is={Container} padding={20} canvas />) }}
                className="p-2 bg-white border rounded shadow w-full cursor-grab"
            >
                Container
            </div>
            <div
                ref={(ref) => { if (ref) connectors.create(ref, <Text text="Hi world" />) }}
                className="p-2 bg-white border rounded shadow w-full cursor-grab"
            >
                Text
            </div>
        </div>
    )
}

export const EditorCanvas = ({ siteId }: { siteId: string }) => {
    return (
        <Editor resolver={{ Container, Button, Text }}>
            <div className="flex flex-col h-screen">
                <Topbar siteId={siteId} />
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-1/4 bg-gray-100 p-4 border-r">
                        <h2 className="text-xl font-bold mb-4">Components</h2>
                        <Toolbox />
                    </div>
                    <div className="flex-1 bg-white p-4 overflow-auto">
                        <Frame>
                            <Element is={Container} padding={20} canvas>
                                <Text text="Drag items here" fontSize={20} />
                                <Button text="Click Me" className="bg-blue-500 text-white p-2 rounded" />
                            </Element>
                        </Frame>
                    </div>
                    <div className="w-1/4 bg-gray-50 border-l p-4">
                        <h2 className="text-xl font-bold mb-4">Properties</h2>
                        {/* Settings panel would go here */}
                    </div>
                </div>
            </div>
        </Editor>
    );
};
