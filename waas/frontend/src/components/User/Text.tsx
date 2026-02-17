import { useNode } from '@craftjs/core';

interface TextProps {
    text?: string;
    fontSize?: number;
    textAlign?: 'left' | 'center' | 'right';
    [key: string]: any;
}

export const Text = ({ text, fontSize, textAlign }: TextProps) => {
    const { connectors: { connect, drag } } = useNode((node) => ({
        selected: node.events.selected,
    }));

    return (
        <div
            ref={(ref: any) => connect(drag(ref))}
            onClick={() => { }}
            style={{ fontSize: `${fontSize}px`, textAlign }}
        >
            <p className="p-2 cursor-pointer">{text}</p>
        </div>
    );
};

Text.craft = {
    displayName: 'Text',
    props: {
        text: 'Edit me',
        fontSize: 16,
        textAlign: 'left',
    },
    related: {
        toolbar: () => <div>Text Settings</div>,
    },
};
