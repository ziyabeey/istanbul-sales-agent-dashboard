"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OfflineToast() {
    const [isOffline, setIsOffline] = useState(false);
    const [showOnlineToast, setShowOnlineToast] = useState(false);

    useEffect(() => {
        // Only run in the browser
        if (typeof window === "undefined") return;

        const handleOffline = () => {
            setIsOffline(true);
            setShowOnlineToast(false);
        };

        const handleOnline = () => {
            setIsOffline(false);
            setShowOnlineToast(true);
            setTimeout(() => setShowOnlineToast(false), 3000); // Hide after 3s
        };

        // Initial check and event listeners
        if (!navigator.onLine) handleOffline();

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOffline && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-red-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center font-medium text-sm"
                >
                    <WifiOff className="w-4 h-4 mr-2" />
                    İnternet bağlantınız koptu. Çevrimdışı moddasınız.
                </motion.div>
            )}

            {showOnlineToast && !isOffline && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center font-medium text-sm"
                >
                    <Wifi className="w-4 h-4 mr-2" />
                    Bağlantı sağlandı! İnternete tekrar bağlandınız.
                </motion.div>
            )}
        </AnimatePresence>
    );
}
