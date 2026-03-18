'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center font-sans">
            <p className="text-rust font-mono text-7xl font-bold mb-4">404</p>
            <h1 className="text-foreground font-syne font-extrabold text-2xl mb-2">
                Sayfa bulunamadı
            </h1>
            <p className="text-muted-foreground mb-10 font-lora italic max-w-md">
                &ldquo;Kepengini kapamışız sanırım.&rdquo; Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/">
                    <Button variant="primary" size="lg">Ana Sayfaya Dön</Button>
                </Link>
                <Link href="/ozellikler">
                    <Button variant="outline" size="lg" className="border-cream/30 text-foreground hover:bg-white/5">
                        Özellikler
                    </Button>
                </Link>
                <Link href="/dashboard">
                    <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground">
                        Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    )
}
