import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";

export default function PublicPageShell({ children }: { children: React.ReactNode }) {
    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />
            {children}
            <FooterTrustSection />
        </main>
    );
}
