import type { Metadata } from 'next'
import PublicPageShell from '@/components/layout/PublicPageShell'
import { BookOpen, Bell } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Blog | kepenk.ai',
    description: 'Esnaf dijitallesme, AI otomasyonu ve kucuk isletme buyume ipuclari.',
}

export default function BlogPage() {
    return (
        <PublicPageShell>
            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="text-primary text-xs font-mono uppercase tracking-widest">Blog</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-syne tracking-tight leading-tight mb-6">
                        Yakinda Yayinda
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-12 font-lora max-w-lg mx-auto">
                        Esnaf dijitallesme rehberleri, AI otomasyon ipuclari ve basari hikayeleri burada paylasılacak.
                    </p>

                    {/* Newsletter signup */}
                    <div className="bg-card border border-border/30 rounded-2xl p-8 max-w-md mx-auto">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="font-syne font-bold text-foreground text-lg mb-2">Haberdar Ol</h2>
                        <p className="text-muted-foreground text-sm mb-6">
                            Ilk yazilarimiz yayinlandiginda bildirim almak icin e-posta adresinizi birakin.
                        </p>
                        <form className="flex gap-2" action="#">
                            <input
                                type="email"
                                placeholder="ornek@email.com"
                                className="flex-1 px-4 py-3 bg-background border border-border/30 rounded-xl text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
                            />
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-syne font-bold text-sm transition-colors whitespace-nowrap"
                            >
                                Abone Ol
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicPageShell>
    )
}
