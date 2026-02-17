import React, { useEffect, useState } from 'react';

interface ModalTransitionProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const ModalTransition: React.FC<ModalTransitionProps> = ({
    isOpen,
    onClose,
    children,
    size = 'lg',
}) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimationState('entering');
                    setTimeout(() => setAnimationState('entered'), 300);
                });
            });
        } else {
            setAnimationState('exiting');
            const timer = setTimeout(() => {
                setAnimationState('exited');
                setShouldRender(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    const sizeClasses: Record<string, string> = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw]',
    };

    const isVisible = animationState === 'entering' || animationState === 'entered';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative w-full ${sizeClasses[size]} bg-white rounded-3xl shadow-2xl border border-white/50 transform transition-all duration-300 ${isVisible
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4'
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalTransition;
