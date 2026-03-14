'use client';

import React, { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Redirect url after successful login (usually /dashboard)
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if(!email || !password) {
            setError('Lütfen e-posta ve şifrenizi girin.');
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch (err) {
            setError('Bir sistem hatası oluştu. Lütfen teknik ekiple iletişime geçin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="w-full max-w-md">
                
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <span className="text-5xl font-black tracking-tighter hover:text-white transition-colors cursor-pointer">
                        kepenk.<span className="text-[#7c3aed]">ai</span>
                    </span>
                    <p className="text-slate-500 mt-2 font-medium">Esnaf Dashboard Girişi</p>
                </div>

                {/* Login Card */}
                <div className="bg-[#11111a] border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <h1 className="text-2xl font-bold mb-6 text-center">Hoş Geldiniz 👋</h1>
                    
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-400 pl-1">E-posta</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ornek@esnaf.com"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#7c3aed] transition-colors"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between pl-1">
                                <label className="text-sm font-medium text-slate-400">Şifre</label>
                                <button type="button" className="text-xs font-bold text-[#7c3aed] hover:text-[#a78bfa] transition-colors">
                                    Şifremi Unuttum
                                </button>
                            </div>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#7c3aed] transition-colors"
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 mt-4 shadow-lg shadow-[#7c3aed]/20"
                        >
                            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-sm text-slate-500">
                            Henüz kepenk.ai abonesi değil misiniz?
                            <br />
                            <a href="/onboarding/sektor" className="text-[#a78bfa] font-bold hover:underline mt-1 inline-block">Hemen Kayıt Olun</a>
                        </p>
                    </div>
                </div>

                {/* Footer Notes */}
                <p className="text-center text-xs text-slate-600 mt-8">
                    Demo Müşteri Girişi İçin: <br />
                    E-Posta: <strong className="text-slate-400">admin@kepenk.ai</strong> Şifre: <strong className="text-slate-400">123456</strong>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
                <div className="animate-pulse w-full max-w-md h-[400px] bg-[#11111a] rounded-3xl" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
