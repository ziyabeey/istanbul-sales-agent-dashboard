"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Basit şifre koruması, middleware ile check edilecek
        if (password === "admin123") { // Geçici basit kontrol
            // Cookie set
            document.cookie = "admin_token=secret_admin_token_2026; path=/; max-age=86400";
            router.push("/admin");
        } else {
            setError("Hatalı şifre");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    Sistem Yönetimi
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Sadece yetkili personel giriş yapabilir.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Yönetici Şifresi
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                            </div>
                            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                        </div>

                        <div>
                            <Button type="submit" variant="primary" className="w-full justify-center">
                                Giriş Yap
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
