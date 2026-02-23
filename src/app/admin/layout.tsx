import React from "react";
import { ShieldAlert } from "lucide-react";

export const metadata = {
    title: "Super Admin | XINXIA v5.0",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // Simple Mock Auth - In production this would be handled by middleware
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
                <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold">Yetkisiz Erişim</h1>
                <p className="text-slate-400 mt-2">Bu alana sadece Super Admin kimliğine sahip yöneticiler girebilir.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-orange-500/30">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-white">
                                X
                            </div>
                            <span className="font-bold text-lg tracking-wider text-slate-200">OP-CENTER</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-400">Admin_01</span>
                            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
}
