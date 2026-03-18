"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Phone, Cpu, TrendingUp, Server, LogOut, Megaphone } from "lucide-react";

const navItems = [
    { href: "/admin",                icon: LayoutDashboard, label: "Genel Bakış"     },
    { href: "/admin/esnaflar",       icon: Users,           label: "Esnaf Yönetimi"  },
    { href: "/admin/marketing",      icon: Megaphone,       label: "Marketing"       },
    { href: "/admin/numara-merkezi", icon: Phone,           label: "Numara Merkezi"  },
    { href: "/admin/ajanlar",        icon: Cpu,             label: "Ajan Monitörü"   },
    { href: "/admin/finans",         icon: TrendingUp,      label: "Finans & Büyüme" },
    { href: "/admin/altyapi",        icon: Server,          label: "Altyapı"         },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === "/admin/login") return null;

    const handleLogout = () => {
        document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        router.push("/admin/login");
    };

    return (
        <aside className="hidden md:flex flex-col w-60 bg-slate-950 border-r border-border/50 flex-shrink-0 min-h-screen">
            <div className="h-14 flex items-center px-5 border-b border-border/50">
                <span className="font-syne text-base font-bold tracking-tight text-slate-100">
                    KPNK <span className="text-muted-foreground font-normal text-sm">Admin</span>
                </span>
            </div>

            <nav className="flex-1 py-4">
                <ul className="space-y-0.5 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-3 py-2.5 rounded transition-colors text-sm ${
                                        isActive
                                            ? "bg-card text-slate-100"
                                            : "text-muted-foreground hover:text-muted-foreground hover:bg-card/50"
                                    }`}
                                >
                                    <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-3 border-t border-border/50">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2.5 text-sm text-muted-foreground rounded hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                    <LogOut className="w-4 h-4 mr-3" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    );
}
