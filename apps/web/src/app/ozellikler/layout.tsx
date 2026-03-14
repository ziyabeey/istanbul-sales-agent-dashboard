import Navbar from '@/components/layout/Navbar'
import FooterTrustSection from '@/components/sections/FooterTrustSection'

export default function OzelliklerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      {children}
      <FooterTrustSection />
    </div>
  )
}
