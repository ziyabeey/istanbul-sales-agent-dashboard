import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import FooterTrustSection from '@/components/sections/FooterTrustSection'
import ModulMarket from '@/components/sections/ModulMarket'

export const metadata: Metadata = {
    title: 'Modül Marketi | kepenk.ai — 65 Web Modülü',
    description: 'Harita, randevu sistemi, WhatsApp chat, blog, KVKK, anket ve daha fazlası. kepenk.ai\'nin 65 web modülünü keşfedin — tüm sektörlere uygun.',
    openGraph: {
        title: 'kepenk.ai Modül Marketi',
        description: '65 hazır web modülü. Sektörünüze özel Gemini tarafından içerikle doldurulur.',
    },
}

export default function ModullerPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            <Navbar />
            <ModulMarket />
            <FooterTrustSection />
        </main>
    )
}
