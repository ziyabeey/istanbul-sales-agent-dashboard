
import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export const NetworkStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-md animate-in slide-in-from-top duration-300">
            <WifiOff className="w-4 h-4" />
            <span className="text-sm font-medium">İnternet bağlantısı koptu. Verileriniz senkronize olmayabilir.</span>
        </div>
    );
};
