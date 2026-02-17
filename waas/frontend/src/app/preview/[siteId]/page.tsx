// Preview Page: /preview/[siteId]
import { Editor, Frame, Element } from "@craftjs/core";
import { Container } from "@/components/User/Container";
import { Button } from "@/components/User/Button";
import { Text } from "@/components/User/Text";

// Next.js client component logic
"use client";

// Assuming we fetch data (JSON) via hook or props
const MOCK_DATA = {
    // Craft.js simple state format or empty
    "ROOT": {
        "type": "div",
        "isCanvas": true,
        "props": {},
        "displayName": "Document",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {}
    }
};

export default function PreviewPage() {
    // const { data } = useSite(siteId); // Custom hook
    const data = MOCK_DATA;

    return (
        <Editor
            resolver={{ Container, Button, Text }}
            enabled={false} // Disable editing
        >
            <Frame json={JSON.stringify(data)}>
                <Element is={Container} canvas>
                    <Text text="This is a live preview." />
                    <Button text="Click me" />
                </Element>
            </Frame>
        </Editor>
    );
}
