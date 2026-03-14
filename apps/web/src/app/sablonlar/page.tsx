import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import FooterTrustSection from '@/components/sections/FooterTrustSection'
import SablonMarket from '@/components/sections/SablonMarket'

export const metadata: Metadata = {
    title: 'Site Şablonları | kepenk.ai',
    description: 'Yapay zeka odaklı, sektörünüze özel dönüşüm odaklı web sitesi yapı şablonlarını inceleyin.',
}

export default function SablonlarSayfasi() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans">
            <Navbar />
            <div className="flex-1">
                <SablonMarket />
            </div>
            <FooterTrustSection />
        </main>
    )
}
