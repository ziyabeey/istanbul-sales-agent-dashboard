"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Edit3, PieChart, AlertTriangle, User } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const esnafId = localStorage.getItem("kepenk_esnaf_id");
        if (!esnafId) {
            router.push("/onboarding");
        }
    }, [router]);

    if (!isMounted) return null;

    const navItems = [
        { href: "/dashboard", icon: Home, label: "Ana" },
        { href: "/dashboard/icerik", icon: Edit3, label: "İçerik" },
        { href: "/dashboard/raporlar", icon: PieChart, label: "Raporlar" },
        { href: "/dashboard/kriz", icon: AlertTriangle, label: "Kriz" },
        { href: "/dashboard/profil", icon: User, label: "Profil" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 md:pb-0">
            {children}

            {/* Mobile Bottom Tab Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pt-2 pb-6 px-4 flex justify-between items-center z-50 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center w-16 h-12">
                            <item.icon className={`w-6 h-6 mb-1 transition-colors ${isActive ? "text-rust" : "text-stone-light"}`} />
                            <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-rust" : "text-stone"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
            {/* Desktop dummy sidebar fallback for larger screens if necessary */}
            <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 flex-col">
                <div className="p-6 border-b border-slate-100">
                    <span className="font-syne font-bold text-xl text-ink"><span className="text-rust">K</span>EPENK <span className="text-rust text-sm font-normal">Esnaf</span></span>
                </div>
                <div className="flex-1 py-4 flex flex-col gap-2 px-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-rust/10 text-rust font-semibold' : 'text-stone hover:bg-warm/50'}`}>
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
