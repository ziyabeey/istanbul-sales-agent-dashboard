import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    const location = useLocation();
    const [displayChildren, setDisplayChildren] = React.useState(children);
    const [transitionStage, setTransitionStage] = React.useState<'enter' | 'idle'>('enter');

    React.useEffect(() => {
        setTransitionStage('enter');
        setDisplayChildren(children);
        const timer = setTimeout(() => setTransitionStage('idle'), 400);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div
            className={`w-full h-full transition-all duration-300 ease-out ${transitionStage === 'enter'
                    ? 'animate-page-enter'
                    : ''
                }`}
        >
            {displayChildren}
        </div>
    );
};

export default PageTransition;
