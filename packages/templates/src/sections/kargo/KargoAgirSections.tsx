// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Warehouse, Truck, ShieldAlert, ArrowRight } from 'lucide-react'

export function KargoAgirINDUSTRIALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="border-b-[6px] border-[#EAB308] px-6 py-5 sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-3xl flex items-center gap-3 text-white uppercase tracking-wider">
 <Truck className="w-8 h-8 " />
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="px-6 py-2.5 font-black hover:bg-yellow-400 transition-colors uppercase tracking-widest text-sm shadow-[4px_4px_0px_#ffffff20]">
 LOJİSTİK DESTEK
 </a>
 </div>
 </header>
 )
}

export function KargoAgirFREIGHTHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative overflow-hidden border-b border-[#CBD5E1]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
 
 <div>
 <div className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em] mb-6 px-4 py-2 border border-[#EAB308] shadow-[2px_2px_0px_#EAB308]">
 <Warehouse className="w-4 h-4"/> Endüstriyel Nakliye Çözümleri
 </div>
 <h1 className="font-heading text-6xl md:text-8xl font-black mb-6 leading-[0.95] tracking-tight uppercase ">
 Ağır Tonaj, <br/> 
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] to-[#475569]">Güçlü Lojistik.</span>
 </h1>
 <p className="text-xl font-medium mb-12 max-w-lg leading-relaxed">
 Parsiyel veya komple araç tahsisi ile paletli yüklerinizi, inşaat malzemelerinizi ve endüstriyel makinelerinizi Türkiye'nin 81 iline güvenle naklediyoruz.
 </p>
 <div className="flex gap-4">
 <a href="#hizmetler" className="text-white px-8 py-5 font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-[6px_6px_0px_#EAB308] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_#EAB308] flex items-center gap-3">
 Araç Fiyatlaması Al <ArrowRight className="w-5 h-5"/>
 </a>
 </div>
 </div>

 {/* Industrial Metrics */}
 <div className="grid grid-cols-2 gap-6">
 <div className="bg-white p-8 border-2 border-[#CBD5E1] border-b-8 border-b-[#0F172A]">
 <div className="font-black text-5xl mb-2">40<span className="text-2xl">Ton</span></div>
 <div className="font-bold text-sm uppercase">Maksimum Taşıma Kapasitesi</div>
 </div>
 <div className="bg-white p-8 border-2 border-[#CBD5E1] border-b-8 border-b-[#EAB308]">
 <div className="font-black text-5xl mb-2">L1</div>
 <div className="font-bold text-sm uppercase">Yetki Belgesi Sahibi</div>
 </div>
 <div className="bg-white p-8 border-2 border-[#CBD5E1] border-b-8 border-b-[#EAB308]">
 <div className="font-black text-5xl mb-2">81</div>
 <div className="font-bold text-sm uppercase">İl ve İlçe Dağıtım Ağı</div>
 </div>
 <div className="p-8 text-white border-2 border-[#0F172A] border-b-8 border-b-[#EAB308]">
 <div className="font-black text-5xl mb-2">CMR</div>
 <div className="font-bold text-sm uppercase">Kapsamlı Yük Sigortası</div>
 </div>
 </div>

 </div>
 </section>
 )
}

export function KargoAgirSAFETYSCALE({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 text-white" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto flex flex-col items-center">
 <ShieldAlert className="w-16 h-16 mb-8" />
 <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 text-center max-w-2xl">Ağır Yüklerde Sıfır Hata Toleransı</h2>
 <p className="text-lg text-center max-w-3xl mb-16 leading-relaxed">
 Filomuzdaki Tır, Kırkayak, 10 Teker ve Kamyonet seçenekleriyle yükünüzün hacmine en uygun aracı tahsis ediyor, liftli araçlarımızla paletli indirme-bindirme süreçlerini hasarsız tamamlıyoruz.
 </p>

 <div className="grid sm:grid-cols-3 gap-1 w-full p-1 border border-[#334155]">
 <div className="p-8 text-center">
 <h4 className="font-black text-xl mb-2 uppercase tracking-wider">Komple Taşımacılık (FTL)</h4>
 <p className="text-sm">Aracın tamamını kiraladığınız, noktadan noktaya en hızlı sürede varan direkt lojistik hattı.</p>
 </div>
 <div className="p-8 text-center">
 <h4 className="font-black text-xl mb-2 uppercase tracking-wider">Parsiyel Dağıtım (LTL)</h4>
 <p className="text-sm">Aktarma merkezlerinde birleştirilen parça yüklerinizin ekonomik rotalarla teslimi.</p>
 </div>
 <div className="p-8 text-center">
 <h4 className="font-black text-xl mb-2 uppercase tracking-wider">Proje ve Gabari Dışı</h4>
 <p className="text-sm">Standart araçlara sığmayan iş makineleri ve kazanlar için eskort eşliğinde lowbed taşıma.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KargoAgirFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center font-black uppercase tracking-widest border-t-8 border-[#FACC15]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="text-2xl mb-2 font-heading">{businessData.name}</p>
 <p className="opacity-80">Industrial Freight Services • {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'kargoagir_hero_0', KargoAgirINDUSTRIALHEADER)
registerSection('hero', 'kargoagir_hero_1', KargoAgirFREIGHTHERO)
registerSection('services', 'kargoagir_services_2', KargoAgirSAFETYSCALE)
registerSection('footer', 'kargoagir_footer_3', KargoAgirFOOTER)
