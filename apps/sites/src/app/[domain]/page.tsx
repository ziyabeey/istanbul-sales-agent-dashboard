import { notFound } from 'next/navigation';
// In a real app, this would fetch from Fimport TemplateComponent from '@/components/TemplateComponent';

interface PageProps {
    params: Promise<{ domain: string }>;
}

export default async function SitePage({ params }: PageProps) {
    // Next.js 15 requires awaiting params
    const { domain } = await params;

    // 1. Slug ya da Custom Domain'i çözümles.domain;

    // TODO: Fetch site data from Firestore based on domain
    // const snapshot = await adminDb.collection('businesses').where('siteUrl', '==', domain).limit(1).get();
    // if (snapshot.empty) return notFound();
    // const data = snapshot.docs[0].data();

    return (
        <div className="min-h-screen font-sans">
            {/* Minimal Placeholder Hero */}
            <header className="py-24 bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] text-center px-4">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Mükemmel Siteye Hoş Geldiniz
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                    Bu alan adı (<span className="text-[#7c3aed] font-mono">{domain}</span>) kepenk.ai altyapısıyla çalışmaktadır.
                </p>
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors">
                    Hizmetlerimizi İnceleyin
                </button>
            </header>

            <main className="py-20 px-6 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 text-black">
                    <div className="bg-slate-100 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-4">Hakkımızda</h2>
                        <p className="text-slate-600">
                            (Bu alan dashboard editorü veya Ajan 9 tarafından otomatik olarak JSON formatında doldurulacaktır. İskelet Next.js routing sistemi başarıyla kurulmuştur.)
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

// SSG for fastest performance on subdomains if desired, otherwise ISR
export const revalidate = 60; // ISR cache every 60 seconds
