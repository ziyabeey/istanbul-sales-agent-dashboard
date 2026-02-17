import { useNode } from '@craftjs/core';
import { ReactNode } from 'react';

interface ContainerProps {
    children?: ReactNode;
    padding?: number;
    background?: string;
    [key: string]: any;
}

export const Container = ({ children, padding, background, ...props }: ContainerProps) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <div
            ref={(ref: any) => connect(drag(ref))}
            style={{ padding: `${padding}px`, background }}
            className="border border-dashed border-gray-300 min-h-[100px]"
            {...props}
        >
            {children}
        </div>
    );
};

Container.craft = {
    displayName: 'Container',
    props: {
        padding: 20,
        background: '#ffffff',
    },
    rules: {
        canDrag: () => true,
    },
    related: {
        toolbar: () => <div>Container Settings</div>,
    },
};
