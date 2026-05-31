import React from 'react';
import { motion } from 'framer-motion';
import { Home, Trees, Key, Check, PhoneCall, Star, Crown, ShieldAlert } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const InsaatPrestijHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-[95vh] flex font-[family-name:var(--font-body)] bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 relative z-10">
         <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
               <span className="inline-block text-[var(--color-accent)] text-xs font-bold tracking-[0.2em] uppercase mb-6 border-b border-[var(--color-accent)]/30 pb-2">
                 {data?.badge || 'PREMIUM YATIRIM'}
               </span>
               <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-heading)] text-gray-900 leading-tight mb-8">
                 {data?.title || 'Geleceğe Değer Katan Konutlar'}
               </h1>
               <p className="text-lg text-gray-600 leading-relaxed mb-10">
                 {businessData?.slogan || 'Prestijli lokasyonlarda, sadece bir ev değil, aileniz için nezih ve güvenli bir yaşam stili inşa ediyoruz.'}
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <a href={`tel:${businessData?.phoneClean}`} className="bg-[var(--color-accent)] text-white px-8 py-4 text-center hover:bg-blue-900 transition-colors tracking-wide">
                     Satış Ofisi İletişim
                  </a>
                  <button className="border border-[var(--color-border)] text-gray-700 px-8 py-4 text-center hover:border-gray-400 hover:bg-gray-50 transition-colors tracking-wide">
                     Örnek Daire Randevusu
                  </button>
               </div>
               
               <div className="flex items-center gap-6 pt-6 border-t border-[var(--color-border)]">
                  <div className="flex -space-x-3">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                     ))}
                  </div>
                  <div>
                    <div className="flex text-yellow-500 mb-1"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
                    <span className="text-xs text-gray-500 font-semibold">%100 Müşteri Memnuniyeti</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 absolute top-0 right-0 h-full">
         <motion.div 
           initial={{ opacity: 0, scale: 1.05 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="w-full h-full bg-slate-200 relative"
         >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--color-bg)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-accent)] opacity-10">
               <Crown className="w-64 h-64" />
            </div>
         </motion.div>
      </div>
    </section>
  );
};

export const InsaatPrestijVision: React.FC<SectionProps> = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-5xl text-center">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
            <Crown className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-6" />
            <h2 className="text-4xl font-[family-name:var(--font-heading)] font-medium text-gray-900 mb-8">Statünüzü Yansıtan Mimari</h2>
            <p className="text-xl text-gray-500 font-light leading-loose max-w-3xl mx-auto italic">
              "Bizim için lüks, pahalı malzemelerin kullanımı değil; mekanın içinde nefes alan insanın huzuru, projenin yeşile saygısı ve yıllar boyu değerine değer katan kusursuz işçiliktir."
            </p>
         </motion.div>
      </div>
    </section>
  );
};

export const InsaatPrestijPortfolio: React.FC<SectionProps> = () => {
  return (
    <section className="py-24 bg-[var(--color-bg)] border-y border-[var(--color-border)]">
      <div className="container mx-auto px-4 max-w-7xl">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-[family-name:var(--font-heading)] text-gray-900 mb-4">Geleceğin Projeleri</h2>
            <div className="w-16 h-px bg-[var(--color-accent)] mx-auto" />
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: 'Prestij Konakları', l: 'Tamamlandı - Satışta', c: 'blue' },
              { t: 'Vadi Panorama', l: 'İnşaat Aşamasında', c: 'amber' },
              { t: 'Koru Villaları', l: 'Ön Talep Toplanıyor', c: 'emerald' }
            ].map((p, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white border border-[var(--color-border)] hover:shadow-xl transition-shadow group"
               >
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden flex items-center justify-center">
                     <Home className="w-16 h-16 text-gray-300 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8 text-center">
                     <div className={`text-xs font-bold uppercase tracking-widest text-slate-500 mb-3`}>{p.l}</div>
                     <h3 className="text-2xl font-[family-name:var(--font-heading)] text-gray-900">{p.t}</h3>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
};

export const InsaatPrestijFeatures: React.FC<SectionProps> = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
               <h2 className="text-4xl font-[family-name:var(--font-heading)] text-gray-900">Neden Bizim Konutlarımız?</h2>
               <div className="w-16 h-px bg-[var(--color-accent)]" />
               <p className="text-gray-600 leading-relaxed">Projelerimiz sadece dört duvardan ibaret değildir. Sosyal yaşam alanları, akıllı ev otomasyonları ve deprem güvenliği önceliklerimizdendir.</p>
               
               <ul className="space-y-4">
                  {[
                    'C35/C40 Sınıfı Yüksek Dayanımlı Beton',
                    'A Sınıfı Enerji Kimlik Belgesi',
                    'Ses ve Isı Yalıtımlı Duvar Sistemleri',
                    '7/24 Kapalı Devre Güvenlik & Resepsiyon',
                    'Geniş Peyzaj Alanları ve Yürüyüş Yolları'
                  ].map((ft, i) => (
                     <li key={i} className="flex items-start gap-4 text-gray-700">
                        <Check className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                        <span>{ft}</span>
                     </li>
                  ))}
               </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
               <div className="aspect-square bg-slate-100 flex items-center justify-center"><Trees className="w-10 h-10 text-slate-300"/></div>
               <div className="aspect-square bg-[var(--color-accent)] text-white flex flex-col items-center justify-center p-6 text-center">
                  <Key className="w-10 h-10 mb-4 opacity-50" />
                  <span className="font-[family-name:var(--font-heading)] text-xl font-medium">Hemen Tapu</span>
               </div>
               <div className="aspect-[2/1] bg-slate-100 col-span-2 flex items-center justify-center"><ShieldAlert className="w-10 h-10 text-slate-300"/></div>
            </motion.div>
         </div>
      </div>
    </section>
  );
};

export const InsaatPrestijContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-slate-900 text-white border-b-8 border-[var(--color-accent)]">
      <div className="container mx-auto px-4 max-w-5xl text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] mb-8 text-white">Satış Ofisimize Bekleriz</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">Sıcak bir kahve eşliğinde projelerimizin maketlerini inceleyip size en uygun daire tipini seçebilirsiniz.</p>
            <a href={`tel:${businessData?.phoneClean}`} className="inline-flex items-center gap-3 bg-[var(--color-accent)] text-white px-10 py-5 hover:bg-white hover:text-slate-900 transition-colors">
               <PhoneCall className="w-6 h-6" />
               <span className="text-xl font-medium tracking-wide">{businessData?.phone}</span>
            </a>
         </motion.div>
      </div>
    </section>
  );
};
