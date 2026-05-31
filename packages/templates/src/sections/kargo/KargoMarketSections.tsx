// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Box, Code2, ArrowRightLeft, Smartphone } from 'lucide-react'

export function KargoMarketTECHHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#A7F3D0]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2 ">
 <Box className="w-7 h-7" />
 {businessData.name}
 </div>
 <div className="flex items-center gap-4">
 <span className="hidden sm:inline-block font-semibold text-sm ">e-Ticaret Çözüm Ortağı</span>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-5 py-2 font-bold hover:opacity-90 transition-colors rounded-lg shadow-sm">
 API Dökümantasyonu
 </a>
 </div>
 </div>
 </header>
 )
}

export function KargoMarketECOMMERCEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto">
 <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm mb-8 uppercase tracking-wide border border-[#A7F3D0]">
 <Code2 className="w-4 h-4" /> Trendyol, Hepsiburada & Shopify Entegre
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
 Depolama, Paketleme <br/>
 <span className="">ve Hızlı Kargo.</span>
 </h1>
 <p className="text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
 Operasyonel yükünüzü sıfırlayın. Ürünlerinizi bize gönderin, sipariş geldiğinde sizin adınıza faturalandırıp, paketleyip, anında kargolayalım (Fulfillment).
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <div className="bg-white border-2 border-[#10B981] p-2 rounded-xl flex items-center max-w-md w-full mx-auto shadow-lg">
 <input type="text" placeholder="Gönderi Takip No" className="flex-1 bg-transparent border-none outline-none px-4 font-bold" />
 <button className="text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-colors">Takip Et</button>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KargoMarketFULFILLMENTFEATURES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 bg-white border-y border-[#D1FAE5]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <h2 className="font-heading text-3xl md:text-4xl font-black text-center mb-16">Uçtan Uca Lojistik Süreci</h2>

 <div className="grid md:grid-cols-3 gap-8">
 <div className="p-8 rounded-2xl border border-[#A7F3D0] relative overflow-hidden">
 <div className="absolute top-0 right-0 p-4 opacity-10"><Box className="w-24 h-24"/></div>
 <h3 className="text-2xl font-bold mb-4 ">1. Akıllı Depolama</h3>
 <p className="font-medium leading-relaxed mb-6">Ölçeklenebilir depo alanlarımızda stoklarınızı barkodlayarak güvenle muhafaza ederiz. Ürünleriniz sigorta kapsamındadır.</p>
 <div className="text-sm font-bold flex items-center gap-2"><Smartphone className="w-4 h-4"/> Canlı Stok Takibi</div>
 </div>

 <div className="p-8 rounded-2xl border border-[#A7F3D0] relative overflow-hidden">
 <div className="absolute top-0 right-0 p-4 opacity-10"><Code2 className="w-24 h-24"/></div>
 <h3 className="text-2xl font-bold mb-4 ">2. Fulfillment (Paketleme)</h3>
 <p className="font-medium leading-relaxed mb-6">Mağazanıza düşen sipariş API ile panomuza gelir. Özel kutularınız, teşekkür kartlarınız ve faturanızla paketlenir.</p>
 <div className="text-sm font-bold flex items-center gap-2"><Smartphone className="w-4 h-4"/> Otomatik Barkodlama</div>
 </div>

 <div className="p-8 rounded-2xl border border-[#A7F3D0] relative overflow-hidden">
 <div className="absolute top-0 right-0 p-4 opacity-10"><ArrowRightLeft className="w-24 h-24"/></div>
 <h3 className="text-2xl font-bold mb-4 ">3. Kargo & İade Yönetimi</h3>
 <p className="font-medium leading-relaxed mb-6">Aynı gün kargoya teslim edilip alıcıya SMS gider. Müşteri iadeleri depomuza gelir, kalite kontrolden geçip tekrar stoka işlenir.</p>
 <div className="text-sm font-bold flex items-center gap-2"><Smartphone className="w-4 h-4"/> Sorunsuz İade Paneli</div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KargoMarketFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center text-sm font-medium" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading font-black text-white text-lg mb-2">{businessData.name}</p>
 <p>E-commerce Fulfillment Center - {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'kargomarket_hero_0', KargoMarketTECHHEADER)
registerSection('hero', 'kargomarket_hero_1', KargoMarketECOMMERCEHERO)
registerSection('services', 'kargomarket_services_2', KargoMarketFULFILLMENTFEATURES)
registerSection('footer', 'kargomarket_footer_3', KargoMarketFOOTER)
