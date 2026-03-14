'use client'

import { Toaster as Sonner } from 'sonner'

export function Toaster() {
    return (
        <Sonner
            className="toaster group"
            position="top-right"
            richColors
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-gray-900 group-[.toaster]:text-gray-100 group-[.toaster]:border-gray-800 group-[.toaster]:shadow-lg font-syne",
                    description: "group-[.toast]:text-gray-400 font-inter",
                    actionButton:
                        "group-[.toast]:bg-emerald-500 group-[.toast]:text-white font-medium",
                    cancelButton:
                        "group-[.toast]:bg-gray-800 group-[.toast]:text-gray-400",
                },
            }}
        />
    )
}
