"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, UserCog, DollarSign, LogOut } from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === "/admin/login") {
        return null; // Login sayfasında sidebar gözükmez
    }

    const navItems = [
        { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/admin/esnaflar", icon: Users, label: "Esnaflar" },
        { href: "/admin/ajanlar", icon: UserCog, label: "Ajanlar" },
        { href: "/admin/finans", icon: DollarSign, label: "Finans" },
    ];

    const handleLogout = () => {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        router.push("/admin/login");
    };

    return (
        <aside className="hidden md:flex flex-col w-64 bg-ink border-r border-stone/20 text-cream flex-shrink-0 min-h-screen">
            <div className="h-16 flex items-center px-6 border-b border-stone/20">
                <span className="font-syne text-xl font-bold tracking-tight text-cream">
                    <span className="text-rust">K</span>EPENK <span className="text-stone font-normal">Admin</span>
                </span>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${isActive
                                        ? "bg-rust/10 text-rust"
                                        : "text-stone-light hover:text-cream hover:bg-steel/50"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-stone/20">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-stone-light rounded-lg hover:text-cream hover:bg-steel/50 transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    );
}
