import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Truck, Droplets, CheckCircle2 } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const HaliyikamaFabrikaHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[var(--color-surface)] -skew-x-12 translate-x-32 hidden lg:block opacity-50" />
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-4 py-2 rounded mb-8 font-bold tracking-widest text-sm uppercase">
              <Factory className="w-5 h-5" />
              <span>{data.badge || 'TÜRKİYE\'NİN EN BÜYÜK YIKAMA TESİSİ'}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-heading)] font-black mb-6 leading-none text-gray-900 uppercase">
              {data.title || 'ENDÜSTRİYEL GÜÇ KUSURSUZ TEMİZLİK'}
            </h1>
            
            <p className="text-xl md:text-2xl font-[family-name:var(--font-body)] text-gray-600 mb-10 max-w-xl">
              {businessData?.slogan || 'El değmeden, tam otomatik bant sistemlerinde halılarınız ilk günkü temizliğine kavuşuyor.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${businessData?.phoneClean}`}
                className="inline-flex items-center justify-center space-x-3 bg-[var(--color-accent)] text-white px-8 py-5 text-lg font-bold hover:bg-sky-700 transition-colors uppercase tracking-wider shadow-xl shadow-sky-900/20"
              >
                <Truck className="w-6 h-6" />
                <span>Ücretsiz Fabrika Servisi</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative"
          >
             <div className="aspect-square border-[16px] border-[var(--color-surface)] bg-gray-100 shadow-2xl relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-[var(--color-accent)]/5 flex items-center justify-center">
                 <svg className="w-48 h-48 text-[var(--color-accent)] opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
               </div>
               <div className="absolute top-8 left-8 bg-white p-4 shadow-xl flex items-center gap-4 border border-gray-100">
                 <div className="w-12 h-12 bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xl">
                   10K
                 </div>
                 <div className="font-bold text-gray-800 text-sm uppercase">M² Kapalı Alan<br/><span className="text-gray-500 font-normal">Kurutma Odası</span></div>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaFabrikaAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-gray-900 text-white border-y border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {[
             { num: '3', label: 'TAM OTOMATİK BANT' },
             { num: '5K', label: 'GÜNLÜK YIKAMA KAPASİTESİ (M²)' },
             { num: '24', label: 'SAATTE TESLİMAT' },
             { num: '%100', label: 'KAPALI ALAN KURUTMA' }
          ].map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="border border-gray-800 p-8 flex flex-col items-center justify-center text-center bg-gray-900/50"
             >
               <div className="text-5xl font-black font-[family-name:var(--font-heading)] text-[var(--color-accent)] mb-2">{stat.num}</div>
               <div className="text-sm font-bold tracking-widest text-gray-400">{stat.label}</div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaFabrikaServices: React.FC<SectionProps> = ({ businessData }) => {
  const steps = [
    { title: 'Toz Vurma Makinesi', desc: 'Halıların hav arasına giren tozlar sanayi tipi vakumlarla çekilir.' },
    { title: 'Konveyör Bant Yıkama', desc: '14 fırçalı otomatik makinede ön yıkama, ana yıkama ve alt yıkama.' },
    { title: 'Sıkma Santrifüj', desc: 'Boru tipi sıkma makinelerinde %95 oranında su atımı sağlanır.' },
    { title: 'İklimlendirme Odası', desc: 'Güneş ışığına maruz kalmadan kapalı odalarda kurutma.' }
  ];

  return (
    <section className="py-32 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-[family-name:var(--font-heading)] font-black uppercase text-gray-900 mb-6"
          >
            Fabrika Süreci
          </motion.h2>
          <div className="w-24 h-2 bg-[var(--color-accent)] mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 border-t-8 border-[var(--color-accent)] shadow-lg"
            >
              <div className="text-6xl font-black text-gray-100 font-[family-name:var(--font-heading)] mb-4 leading-none">0{i+1}</div>
              <h3 className="text-2xl font-black font-[family-name:var(--font-heading)] uppercase mb-4 text-gray-800">{step.title}</h3>
              <p className="font-[family-name:var(--font-body)] text-gray-600 font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaFabrikaGallery: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="bg-[var(--color-bg)] py-32 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-black uppercase text-gray-900">Teknoloji & Altyapı</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="aspect-[3/4] bg-gray-200 border border-gray-300 relative group overflow-hidden"
             >
                <div className="absolute inset-0 bg-sky-900/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center p-6 text-center">
                  <div>
                    <Factory className="w-12 h-12 text-white mx-auto mb-4" />
                    <span className="text-white font-bold tracking-widest uppercase">Tesis Görüntüleri</span>
                  </div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaFabrikaContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 text-white p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
             <Truck className="w-96 h-96 text-white" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] font-black uppercase mb-6 leading-none">Servis Ağı</h2>
            <p className="text-xl text-gray-400 mb-10 font-[family-name:var(--font-body)]">
               10'dan fazla servis aracımız ile {businessData?.city} genelinde kurumsal ve bireysel müşterilerimize ücretsiz lojistik sağlıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href={`tel:${businessData?.phoneClean}`} className="bg-[var(--color-accent)] text-white px-8 py-4 font-bold tracking-widest uppercase text-center hover:bg-sky-600 transition-colors">
                Servis Çağır: {businessData?.phone}
              </a>
              <div className="px-8 py-4 border border-gray-700 font-bold tracking-widest uppercase text-center text-gray-400">
                Lojistik Merkezi: {businessData?.district}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
