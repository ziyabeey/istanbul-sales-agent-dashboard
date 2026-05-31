import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Scissors, ShieldAlert, BadgeCent, ArrowRight, Play, Star } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const HaliyikamaLuxHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-[var(--color-bg)] text-[var(--color-text)] border-b border-[var(--color-border)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-surface)] to-[var(--color-bg)] opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--color-accent)]/30 text-[var(--color-accent)] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,163,115,0.2)]">
              <Gem className="w-6 h-6" />
            </div>
            <div className="mt-4 text-[var(--color-accent)] uppercase tracking-[0.3em] text-xs font-bold font-[family-name:var(--font-body)]">
               {data.badge || 'EL DOKUMASI & ANTİKA HALI RESTORASYONU'}
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-heading)] text-white font-medium mb-10 leading-[1.1]"
          >
            {data.title || 'MİRASINIZA HASSAS BİR DOKUNUŞ'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 font-[family-name:var(--font-body)] font-light max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {businessData?.slogan || 'İran, Hereke ve çok değerli antika halılarınız için özel formüllü organik temizlik ve detaylı saçak onarımı.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href={`tel:${businessData?.phoneClean}`} className="group flex items-center gap-4 bg-[var(--color-accent)] text-black px-10 py-4 font-[family-name:var(--font-heading)] tracking-widest uppercase hover:bg-white transition-colors duration-500">
               <span>VIP Servis Talebi</span>
               <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            <button className="flex items-center gap-4 text-white hover:text-[var(--color-accent)] transition-colors px-6 py-4 border border-transparent hover:border-[var(--color-accent)]/30 group">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[var(--color-accent)]/10">
                 <Play className="w-4 h-4 ml-1" />
               </div>
               <span className="font-[family-name:var(--font-heading)] uppercase tracking-wider text-sm">Süreci İzleyin</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaLuxAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-32 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="relative aspect-[4/5] overflow-hidden group"
           >
              <div className="absolute inset-0 bg-zinc-900 border border-[var(--color-border)] p-4">
                 <div className="w-full h-full border border-[var(--color-accent)]/20 relative overflow-hidden bg-zinc-950 flex justify-center items-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <Gem className="w-32 h-32 text-[var(--color-accent)] opacity-10" />
                 </div>
              </div>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
           >
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-white mb-8">Ustalık ve İhtimam</h2>
              <div className="w-12 h-px bg-[var(--color-accent)] mb-8" />
              <p className="text-gray-400 font-[family-name:var(--font-body)] font-light leading-loose text-lg mb-10">
                El tezgahlarında aylar süren emekle dokunan yöresel ve antika halılarınız, seri üretim ürünleri gibi yıkanamaz. Kök boyalarının birbirine karışmaması ve iplerin keçeleşmemesi için her halıya özel bir reçete oluşturulmalıdır. <br/><br/>
                Uzman ekibimiz, halının dokuma türüne, iplik yapısına ve ipek oranına bağlı olarak %100 bitkisel aktifli şampuanlar kullanmaktadır.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                 <div className="flex gap-4">
                    <ShieldAlert className="w-8 h-8 text-[var(--color-accent)] shrink-0" />
                    <div>
                       <h3 className="text-white font-[family-name:var(--font-heading)] text-lg mb-2">Sigortalı Taşıma</h3>
                       <p className="text-sm text-gray-500 font-light text-[family-name:var(--font-body)]">Tüm değerli eşyalarınız taşıma esnasında güvence altındadır.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <Scissors className="w-8 h-8 text-[var(--color-accent)] shrink-0" />
                    <div>
                       <h3 className="text-white font-[family-name:var(--font-heading)] text-lg mb-2">Saçak Onarımı</h3>
                       <p className="text-sm text-gray-500 font-light text-[family-name:var(--font-body)]">Zamanla yıpranan antika halı saçakları aslına uygun yenilenir.</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaLuxServices: React.FC<SectionProps> = ({ businessData }) => {
  const services = [
     { t: 'El Dokuması Halı Yıkama', d: 'Kök boyalı yün halılar için renk atma riskini ortadan kaldıran özel teknik.' },
     { t: 'İpek Halı Yıkama', d: 'Hassas ipek yüzeyin parlaklığını koruyan, sürtünmesiz yumuşak fırçalama.' },
     { t: 'Antika Halı Restorasyonu', d: 'Yırtılan, güveyen veya saçakları dökülen antika halıların yeniden örülmesi.' },
     { t: 'Ozonlama ve Dezenfeksiyon', d: 'Kimyasal kullanmadan UV-C ve Ozon odamızda tam sterilizasyon.' }
  ];

  return (
    <section className="py-32 bg-[var(--color-bg)] border-y border-[var(--color-border)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-24 relative">
           <h2 className="text-5xl font-[family-name:var(--font-heading)] font-bold text-white mb-6">Özel Hizmetlerimiz</h2>
           <p className="text-gray-400 text-lg max-w-2xl mx-auto">Standart hizmetlerin ötesinde, değerli tekstillerinize gösterilmesi gereken gerçek özen.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
           {services.map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="flex gap-6 items-start group"
             >
                <div className="text-4xl font-[family-name:var(--font-heading)] text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors opacity-50 shrink-0">
                  0{i+1}
                </div>
                <div>
                   <h3 className="text-2xl text-white font-[family-name:var(--font-heading)] mb-4">{item.t}</h3>
                   <p className="text-gray-500 font-[family-name:var(--font-body)] font-light leading-relaxed">{item.d}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaLuxGallery: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-32 bg-[var(--color-surface)]">
      <div className="container mx-auto px-4 max-w-7xl">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col justify-center">
               <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] text-white mb-6">Restorasyon Merkezi</h2>
               <div className="w-12 h-px bg-[var(--color-accent)] mb-6" />
               <p className="text-gray-400 leading-relaxed font-light mb-8">Tozsuzlaştırma odasından nem kontrollü kurutma tünellerine kadar, her şey en ince detayına kadar tasarlandı.</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
               {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`aspect-square bg-zinc-900 border border-[var(--color-border)] flex items-center justify-center p-8 text-center text-[var(--color-border)] ${i === 1 || i === 4 ? 'col-span-2 md:col-span-1 md:aspect-[3/4]' : ''}`}
                  >
                     <Gem className="w-12 h-12 opacity-20" />
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
};

export const HaliyikamaLuxContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-32 bg-[var(--color-bg)]">
      <div className="container mx-auto px-4 max-w-5xl">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="border border-[var(--color-accent)]/30 p-12 md:p-24 relative overflow-hidden bg-[var(--color-surface)]"
         >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 text-center">
               <ShieldAlert className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-8" />
               <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-white mb-6">Sizden Teslim Alıyoruz</h2>
               <p className="text-lg text-gray-400 font-[family-name:var(--font-body)] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                  Özel ekiplerimiz, galoş ve koruyucu ekipmanlarla evinize gelerek değerli eşyanızı tutanakla teslim alır. Tüm süreç barkod sistemi ile akıllı telefonunuzdan takip edilebilir.
               </p>
               <a href={`tel:${businessData?.phoneClean}`} className="inline-block bg-white text-black px-12 py-5 font-[family-name:var(--font-heading)] tracking-[0.2em] uppercase hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-500 text-sm">
                  {businessData?.phone || 'RANDEVU ALIN'}
               </a>
               <p className="mt-8 text-xs text-gray-500 font-[family-name:var(--font-body)] uppercase tracking-wider">
                  {businessData?.district} bölgesinden gün içi VIP servis
               </p>
            </div>
         </motion.div>
      </div>
    </section>
  );
};
