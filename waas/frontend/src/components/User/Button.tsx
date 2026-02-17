import { useNode } from '@craftjs/core';
import { Button as UiButton } from '@/components/ui/button';

interface ButtonProps {
    text?: string;
    className?: string;
    [key: string]: any;
}

export const Button = ({ text, ...props }: ButtonProps) => {
    const { connectors: { connect, drag } } = useNode();
    return (
        <UiButton ref={(ref: any) => connect(drag(ref))} {...props}>
            {text}
        </UiButton>
    );
};

Button.craft = {
    displayName: 'Button',
    props: {
        text: 'Click me',
        className: 'bg-blue-500 text-white',
    },
    related: {
        toolbar: () => <div>Settings</div>,
    },
};
