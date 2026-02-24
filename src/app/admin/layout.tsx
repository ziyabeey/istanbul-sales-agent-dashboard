import React from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export const metadata = {
    title: "Super Admin | XINXIA v5.0",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-slate-50 w-full">
            <AdminSidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50">
                {children}
            </main>
        </div>
    );
}
