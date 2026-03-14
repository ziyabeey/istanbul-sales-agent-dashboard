import { SEKTORLER } from '@/data/sektorler'
import { sektorDetayliKnowhow } from '@/data/sektorlerServer'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WhatsAppMockup } from '@/components/ui/WhatsAppMockup'
import { PricingCard } from '@/components/ui/PricingCard'
import Link from 'next/link'
import Script from 'next/script'
import Navbar from '@/components/layout/Navbar'

const SITE_URL = 'https://kepenk.ai'

export async function generateStaticParams() {
    return SEKTORLER.map((sektor) => ({
        sektor: sektor.id,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ sektor: string }> }): Promise<Metadata> {
    const { sektor } = await params
    const data = SEKTORLER.find(s => s.id === sektor)
    if (!data) return {}

    const title = `${data.ad} Sektörü İçin Yapay Zeka Yazılımı | kepenk.ai`
    const description = data.altBaslik || `${data.ad} işletmeleri için 7/24 randevu kapan, fiyat veren ve müşteri ilişkilerini yöneten kurumsal B2B yapay zeka asistanı.`
    const canonical = `${SITE_URL}/sektorler/${sektor}`
    const keywords = [...data.anahtar, 'yapay zeka', 'kepenk.ai', data.ad, data.kategori]

    return {
        title,
        description,
        keywords: keywords.join(', '),
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: 'kepenk.ai',
            locale: 'tr_TR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    }
}

function buildTemplateFaq(ad: string, altBaslik: string | undefined, moduller: string[]) {
    return [
        { soru: `${ad} için kepenk.ai ne yapar?`, cevap: altBaslik || `${ad} işletmeleri için 7/24 WhatsApp üzerinden müşteri yanıtı, randevu ve fiyat bilgisi veren, sektöre özel eğitilmiş yapay zeka asistanı sunar.` },
        { soru: `Hangi özellikler ${ad} sektörüne uygun?`, cevap: `Randevu, iletişim formu, fiyat listesi, Google Haritalar görünürlüğü ve sektörünüze özel modüller: ${moduller.slice(0, 4).join(', ')}. Paket seçimine göre daha fazla özellik açılır.` },
        { soru: 'Ücretsiz deneme var mı?', cevap: 'Evet. Kayıt sonrası belirli süre ücretsiz deneyebilirsiniz. Detaylar için Fiyatlar sayfasını inceleyin veya kayıt olun.' },
        { soru: 'Yapay zeka müşteriye nasıl yanıt veriyor?', cevap: 'Sektörünüze özel eğitilmiş model, WhatsApp ve web üzerinden gelen soruları anlar; randevu açar, fiyat verir ve sizin belirlediğiniz bilgileri paylaşır. 7/24 kesintisiz çalışır.' },
    ]
}

function benzersizFaq(items: { soru: string; cevap: string }[]) {
    const seen = new Set<string>()
    return items.filter((item) => {
        const key = item.soru.toLocaleLowerCase('tr-TR').replace(/\s+/g, ' ').trim()
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
}

function hizmetAciklamasi(hizmet: string, sektorAdi: string, index: number) {
    const sablonlar = [
        `${sektorAdi} işletmeleri için ${hizmet.toLowerCase()} süreçlerinde WhatsApp üzerinden 7/24 hızlı bilgilendirme ve dönüşüm odaklı müşteri iletişimi sağlar.`,
        `${hizmet} operasyonlarını otomasyona alarak manuel iş yükünü düşürür, ekiplerinizi satışa ve müşteri deneyimine odaklar.`,
        `${hizmet} tarafında gelen talepleri kaçırmadan toplar; doğru teklif, doğru zamanlama ve daha yüksek kapanış oranı sunar.`,
    ]
    return sablonlar[index % sablonlar.length]
}

export default async function SektorLandingPage({ params }: { params: Promise<{ sektor: string }> }) {
    const { sektor } = await params
    const data = SEKTORLER.find(s => s.id === sektor)
    if (!data) notFound()

    const knowhow = await sektorDetayliKnowhow(sektor)
    const faqItems = benzersizFaq(
        (knowhow?.sikSorulanlar?.length ? knowhow.sikSorulanlar : buildTemplateFaq(data.ad, data.altBaslik, data.moduller))
            .map((f: { soru: string; cevap: string }) => ({ soru: f.soru, cevap: f.cevap }))
    )
    const ayniKategori = SEKTORLER.filter(s => s.kategori === data.kategori && s.id !== data.id).slice(0, 3)
    let ilgiliFinal = [...ayniKategori]
    if (ilgiliFinal.length < 2) {
        const diger = SEKTORLER.filter(s => s.id !== data.id && !ilgiliFinal.some(i => i.id === s.id)).slice(0, 3 - ilgiliFinal.length)
        ilgiliFinal = ilgiliFinal.concat(diger)
    }
    ilgiliFinal = ilgiliFinal.slice(0, 3)

    const breadcrumbListSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: 'Sektörler', item: SITE_URL + '/#sektorler' },
            { '@type': 'ListItem', position: 3, name: data.ad, item: `${SITE_URL}/sektorler/${sektor}` },
        ],
    }
    const faqPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f: { soru: string; cevap: string }) => ({
            '@type': 'Question',
            name: f.soru,
            acceptedAnswer: { '@type': 'Answer', text: f.cevap },
        })),
    }

    // B2B Pricing Tier Features Mapping Request Handler
    const getFeatures = (tier: string) => {
        if (tier === 'TEMEL') return ['WhatsApp Otonomasyonu', 'Yapay Zeka RAG Belleği', 'Aylık 1000 Mesaj', 'Google Haritalar Basit']
        if (tier === 'STANDART') return ['Tüm Temel Özellikler', 'Otomatik E-Fatura Okuyucu', 'LSA Reklam Yönetimi', 'Aylık 2500 Mesaj']
        if (tier === 'BUYUME') return ['Iyzico Kapora Alma', 'Takvim / Randevu Kapanışı', 'Tüm Standart Özellikler', 'Sınırsız Mesaj Hakkı']
        if (tier === 'PREMIUM') return ['ERP Entegrasyonları', 'Kendi API Webhooklarınızı Bağlayın', 'Gelişmiş Ekip Yönetimi', 'Tüm Büyüme Özellikleri']
        return ['B2B Büyük İşletmelere Özel Kurulum', 'Yerinde Sunucu Seçeneği', 'Tüm Premium Özellikler', 'Anahtar Teslim']
    }

    const renderHooks = (moduller: string[]) => {
        const hooks = []
        if (moduller.includes('Yemeksepeti Entegrasyonu') || moduller.includes('Getir Entegrasyonu') || moduller.includes('Trendyol Yemek Entegrasyonu')) {
            hooks.push({ isim: 'Yemeksepeti / Paket Takibi', desc: 'Siparişleriniz kuryeye verildiği an müşterinize giden otonom WhatsApp bildirimleri.', platform: 'Yemeksepeti', renk: 'text-red-500' })
        }
        if (moduller.includes('Trendyol Entegrasyonu') || moduller.includes('Hepsiburada Entegrasyonu') || moduller.includes('Amazon Entegrasyonu')) {
            hooks.push({ isim: 'Trendyol & Pazaryerleri', desc: 'Stoklarınız azaldığında veya yeni kampanya açtığınızda sistemin otomatik fiyata uyum sağlaması.', platform: 'Trendyol', renk: 'text-orange-500' })
        }
        if (moduller.includes('Armut Entegrasyonu') || moduller.includes('Bionluk Entegrasyonu') || moduller.includes('Sahibinden Entegrasyonu')) {
            hooks.push({ isim: 'Armut.com & Lead Madencisi', desc: 'Sektörünüze özel açılan taleplere insan hızından daha hızlı şekilde en düşük maliyetle teklif veren AI.', platform: 'Armut', renk: 'text-green-500' })
        }
        if (moduller.includes('Google LSA (Local Services Ads)')) {
            hooks.push({ isim: 'Google Local Services', desc: 'Bölgenizde "acil" olarak aranan anahtar kelimelerde en üstte çıkıp doğrudan çağrıları AI asistanınıza yönlendirin.', platform: 'Google LSA', renk: 'text-blue-500' })
        }

        if (hooks.length === 0) return null

        return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rust/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                    <div className="text-center mb-10 relative z-10">
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-rust bg-rust/10 mb-4 border border-rust/20">
                            Öne Çıkan Entegrasyonlar
                        </div>
                        <h2 className="text-3xl md:text-4xl font-syne font-bold mb-4">Mevcut Sistemlerinize <span className="text-transparent bg-clip-text bg-gradient-to-r from-cream to-stone-light">Görünmez</span> Bağlantı</h2>
                        <p className="text-muted-foreground-light max-w-2xl mx-auto">Sektörünüzün can damarı olan pazaryerlerini yapay zekanıza bağlayın, sipariş ve randevuları tek merkezden otopilota alın.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                        {hooks.map((h, i) => (
                            <Link href="/entegrasyonlar" key={i} className="group block bg-black/20 hover:bg-black/40 border border-white/5 hover:border-white/10 p-6 rounded-2xl transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                        <span className={`font-bold text-lg ${h.renk}`}>{h.platform.charAt(0)}</span>
                                    </div>
                                    <h3 className="font-syne font-bold text-lg text-foreground group-hover:text-rust transition-colors">{h.isim}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground-light/80 leading-relaxed">{h.desc}</p>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10 flex justify-center relative z-10">
                        <Link href="/entegrasyonlar" className="text-sm font-bold text-foreground hover:text-rust transition-colors flex items-center gap-2">
                            Tüm Ekosistemi Keşfet <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <main className="min-h-screen bg-background font-sans selection:bg-rust/30">
            <Navbar />

            <div className="pt-32 pb-24 text-foreground"> {/* Icerik sarmalayici */}
                {/* Schema: BreadcrumbList, FAQPage, SoftwareApplication */}
                <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />
                <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
                <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: `kepenk.ai ${data.ad} Çözümü`,
                        applicationCategory: 'BusinessApplication',
                        description: data.altBaslik || `${data.ad} işletmeleri için yapay zeka asistanı`,
                        operatingSystem: 'Web',
                        offers: { '@type': 'Offer', price: '1250.00', priceCurrency: 'TRY' },
                    })
                }} />

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
                    <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground-light">
                        <li><Link href="/" className="hover:text-rust transition-colors">Ana Sayfa</Link></li>
                        <li aria-hidden="true" className="text-muted-foreground">/</li>
                        <li><Link href="/#sektorler" className="hover:text-rust transition-colors">Sektörler</Link></li>
                        <li aria-hidden="true" className="text-muted-foreground">/</li>
                        <li className="text-foreground font-medium" aria-current="page">{data.ad}</li>
                    </ol>
                </nav>

                {/* Dynamic Hero */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24 relative mt-8 md:mt-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] md:h-[400px] bg-rust/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground-light text-xs md:text-sm mb-6 uppercase tracking-widest font-bold">
                        <span className="text-base md:text-lg">{data.emoji}</span> {data.ad} İçin Özelleştirilmiş Yapay Zeka
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-syne font-extrabold mb-6 leading-tight sm:px-4">
                        {data.heroBaslik || <>{data.ad} Firmalarına Özel İşletim Sistemi</>}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground-light/90 max-w-3xl mx-auto mb-10 leading-relaxed font-medium px-4">
                        {data.altBaslik || `${data.ad} sektöründeki müşteri alışkanlıklarını ezbere bilen yapay zekanızla hemen tanışın.`}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-6">
                        <Link href="/kayit" className="bg-rust hover:bg-rust-dark text-white font-bold py-4 px-8 md:px-10 rounded-full transition-all shadow-xl shadow-rust/20 w-full sm:w-auto text-base md:text-lg hover:scale-105">
                            Vakit Kaybetmeden Dene
                        </Link>
                        <Link href="/#pricing" className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 md:px-10 rounded-full border border-white/10 transition-all w-full sm:w-auto text-base md:text-lg">
                            Fiyatları Gör
                        </Link>
                    </div>
                </section>

                {/* Feature / Mockup Split */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 flex flex-col lg:flex-row items-center gap-12 md:gap-16 overflow-hidden relative">
                        <div className="flex-1 z-10 w-full text-center lg:text-left">
                            <h2 className="text-2xl md:text-3xl font-syne font-bold mb-4 md:mb-6 leading-snug">Tıpkı İçerideki Bir Çalışanınız Gibi.</h2>
                            <p className="text-muted-foreground-light text-base md:text-lg mb-8 leading-relaxed">
                                Müşterilerinizin derdini anlar, kendi kendinize oluşturduğunuz katalogları arar ve doğru ürünü/hizmeti veya fiyatlamayı satar.
                                <br className="hidden md:block" /><br className="hidden md:block" />
                                <span className="block mt-4 md:mt-0 font-bold text-foreground">Sektör Zekası:</span> {data.knowHow?.split('.')[0] || "Müşteri verilerinizi akıllıca yorumlar."}
                            </p>
                            <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto lg:mx-0">
                                <div className="bg-black/20 rounded-xl p-3 md:p-4 border border-white/5 text-center lg:text-left">
                                    <div className="text-xl md:text-2xl mb-1 md:mb-2">⚡</div>
                                    <h4 className="font-bold text-xs md:text-sm text-sage">7/24 Anında Dönüş</h4>
                                </div>
                                <div className="bg-black/20 rounded-xl p-3 md:p-4 border border-white/5 text-center lg:text-left">
                                    <div className="text-xl md:text-2xl mb-1 md:mb-2">🎯</div>
                                    <h4 className="font-bold text-xs md:text-sm text-rust">Sıfır İnsani Hata</h4>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-[400px] flex justify-center z-10">
                            {data.mockDiyalog ? (
                                <WhatsAppMockup messages={data.mockDiyalog} delayMultiplier={0.8} />
                            ) : (
                                <div className="w-[300px] h-[500px] bg-black/50 border border-white/10 rounded-3xl flex items-center justify-center text-sm text-muted-foreground">WhatsApp Örneği Yüklenemedi</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Dynamic Hooks / Integration Marketplace */}
                {renderHooks(data.moduller)}

                {/* Recommendation / Pricing Focus */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-syne font-extrabold mb-3 md:mb-4">Sektörünüze <span className="text-rust">Önerilen</span> Plan</h2>
                        <p className="text-muted-foreground-light text-sm md:text-base px-4">Verilerimize göre kendi sektörünüzdeki en iyi dönüşümü aşağıdaki donanım sağlıyor.</p>
                    </div>
                    <div className="max-w-lg mx-auto">
                        <PricingCard
                            tier={(data.onerilenPaket as 'TEMEL' | 'STANDART' | 'BUYUME' | 'PREMIUM' | 'PREMIUMPLUS') || 'BUYUME'}
                            title={data.onerilenPaket === 'BUYUME' ? 'Büyüme Paneli' : (data.onerilenPaket || 'Büyüme Paneli')}
                            price={data.onerilenPaket === 'STANDART' ? '1.250 TL' : data.onerilenPaket === 'BUYUME' ? '2.500 TL' : '4.000+ TL'}
                            description="Her şeyi otopilota alarak operasyonel verimliliği maksimuma çıkartır."
                            features={getFeatures(data.onerilenPaket || 'BUYUME')}
                            isRecommended={true}
                        />
                    </div>
                </section>

                {/* Neler Yapılır / Hizmetler */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
                    <h2 className="text-2xl md:text-3xl font-syne font-bold mb-6 md:mb-8 text-center">{data.ad} Sektöründe kepenk.ai ile Neler Yapılır?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {data.hizmetler.map((hizmet, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5">
                                <h3 className="font-syne font-bold text-foreground mb-2">{hizmet}</h3>
                                <p className="text-sm text-muted-foreground-light leading-relaxed">{hizmetAciklamasi(hizmet, data.ad, i)}</p>
                            </div>
                        ))}
                    </div>
                    {knowhow?.populerHizmetler?.length ? (
                        <>
                            <h3 className="text-lg font-syne font-bold text-foreground mt-10 mb-4">En çok talep edilen hizmetler</h3>
                            <ul className="flex flex-wrap gap-2">
                                {knowhow.populerHizmetler.map((h, i) => (
                                    <li key={i} className="px-3 py-1.5 bg-rust/10 border border-rust/20 rounded-full text-sm text-muted-foreground-light">{h}</li>
                                ))}
                            </ul>
                        </>
                    ) : null}
                </section>

                {/* SEO Content & Modules Listing + Uzun metin */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-syne font-bold mb-4 md:mb-6">Mevcut Opt-in Modülleriniz</h2>
                    <div className="flex gap-2 flex-wrap mb-8 md:mb-10 justify-center md:justify-start">
                        {data.moduller.map(modul => (
                            <span key={modul} className="px-2.5 md:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm font-medium text-muted-foreground-light">
                                {modul}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-invert prose-sm md:prose-lg max-w-none text-muted-foreground-light text-left">
                        <h3 className="text-lg md:text-xl font-bold text-foreground">{data.ad} İşletmeleri Neden Dijitalleşmeli?</h3>
                        <p className="leading-relaxed">
                            Günümüz B2B rekabet ortamında {data.ad.toLowerCase()} sektörü, hızlı reaksiyon ve kusursuz müşteri deneyimi gerektirir.
                            Yapay zeka asistanımız; Google arama kelimelerinizden ({data.anahtar.join(', ')}) gelen trafikleri %80 daha yüksek bir dönüşüm (conversion) oranıyla sıcak satışa (lead) çevirir.
                        </p>
                        <p className="leading-relaxed mt-4">
                            {data.ad} işletmeleri için dijital dönüşüm artık opsiyonel değil. Müşteriler WhatsApp ve arama motorlarından anında yanıt bekliyor; randevu ve fiyat bilgisi vermeden rakiplerinize kaptırırsanız geri dönüş zor. kepenk.ai ile 7/24 müşteri ilişkileri otomasyonu, sektörünüze özel dil ve davranış kalitesiyle tek panelden yönetilir.
                        </p>
                        <p className="leading-relaxed mt-4">
                            {data.knowHow ? `Sektör bilgimiz: ${data.knowHow.split('.')[0]}. ` : ''}Yapay zeka asistanı, hem mevcut müşterilerinizi hem de {data.anahtar[0] || data.ad.toLowerCase()} arayan yeni potansiyel müşterileri doğru bilgi ve tonla karşılar; böylece markanız güvenilir ve erişilebilir kalır.
                        </p>
                    </div>
                </section>

                {/* Sıkça Sorulan Sorular */}
                <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32" aria-labelledby="faq-heading">
                    <h2 id="faq-heading" className="text-2xl md:text-3xl font-syne font-bold mb-8 text-center">Sıkça Sorulan Sorular</h2>
                    <div className="space-y-3">
                        {faqItems.map((faq, i) => (
                            <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                <summary className="px-4 py-4 md:px-5 md:py-5 cursor-pointer list-none font-syne font-bold text-foreground flex items-center justify-between gap-2">
                                    <span>{faq.soru}</span>
                                    <span className="text-rust shrink-0 transition-transform group-open:rotate-180" aria-hidden="true">▼</span>
                                </summary>
                                <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0 text-muted-foreground-light text-sm md:text-base leading-relaxed border-t border-white/10">
                                    {faq.cevap}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* İlgili Sektörler */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <h2 className="text-xl md:text-2xl font-syne font-bold mb-6 text-center">İlgili Sektörler</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {ilgiliFinal.map((s) => (
                            <Link key={s.id} href={`/sektorler/${s.id}`} className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-foreground font-medium transition-colors">
                                <span>{s.emoji}</span>
                                <span>{s.ad}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}
