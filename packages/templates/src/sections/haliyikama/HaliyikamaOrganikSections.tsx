import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplet, Sprout, Wind, CheckCircle, RefreshCcw, Smile } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const HaliyikamaOrganikHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[var(--color-border)] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#BBF7D0] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="inline-flex items-center gap-2 bg-[var(--color-surface)] border border-[var(--color-accent)]/20 text-[var(--color-accent)] px-4 py-2 rounded-full mb-8 font-[family-name:var(--font-body)] font-medium"
           >
              <Leaf className="w-4 h-4" />
              <span>{data.badge || 'DOĞA VE SAĞLIK DOSTU'}</span>
           </motion.div>
           
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] font-semibold text-gray-900 leading-tight mb-8"
           >
             {data.title || 'Zararlı Kimyasallar Yok, Sadece Saf ve Derinlemesine Temizlik'}
           </motion.h1>

           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-xl text-gray-600 font-[family-name:var(--font-body)] mb-12 max-w-2xl mx-auto leading-relaxed"
           >
             {businessData?.slogan || '%100 bitkisel aktifli, vegan ve alerjen içermeyen şampuanlarla aileniz ve evcil hayvanlarınız için güvenilir hijyen.'}
           </motion.p>
           
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4"
           >
              <a href={`tel:${businessData?.phoneClean}`} className="bg-[var(--color-accent)] text-white px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-colors font-semibold flex items-center gap-2">
                 <Droplet className="w-5 h-5" />
                 Hemen Hizmet Alın
              </a>
              <a href="#farkimiz" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
                 İçeriklerimizi Görün
              </a>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaOrganikAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section id="farkimiz" className="py-24 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-[var(--color-bg)] rounded-[3rem] p-12 relative shadow-sm border border-[var(--color-border)]"
           >
             <div className="w-20 h-20 bg-emerald-100 text-[var(--color-accent)] rounded-full flex items-center justify-center mb-8">
               <Sprout className="w-10 h-10" />
             </div>
             <h2 className="text-4xl font-[family-name:var(--font-heading)] font-semibold text-gray-900 mb-6">Neden Organik Yıkama?</h2>
             <p className="text-gray-600 leading-relaxed font-[family-name:var(--font-body)] text-lg mb-8">
                Geleneksel halı yıkama servisleri, maliyeti düşürmek için kanserojen ftalatlar, amonyak ve ağır kimyasal ağartıcılar kullanmaktadır. Bu maddeler aylar boyunca soluduğunuz havaya karışır.
             </p>
             <ul className="space-y-4">
                {['Kokusuz ve kalıntısız', 'Bebeklerin emeklediği alanlar için %100 güvenli', 'Alerjiyi tetiklemez, astım dostudur', 'Atık suyumuz doğaya zarar vermez'].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-800 font-medium">
                     <CheckCircle className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
                     <span>{item}</span>
                  </li>
                ))}
             </ul>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="grid grid-cols-2 gap-6"
           >
              {[
                { i: Leaf, t: 'Tamamen Vegan', d: 'Hayvansal hiçbir bileşen içermeyen şampuanlar.' },
                { i: Droplet, t: 'Su Tasarrufu', d: 'Özel arıtma sistemleri ile sudan %40 tasarruf.' },
                { i: Wind, t: 'Kokusuz Hava', d: 'Keskin parfüm kokuları yerine doğal tazelik ferahlığı.' },
                { i: Smile, t: 'Garantili T.', d: 'Doğal enzimlerle zorlu lekelere (çay, kahve, mürekkep) kesin çözüm.' }
              ].map((ft, i) => (
                 <div key={i} className={`bg-white p-6 rounded-3xl shadow-sm border border-[var(--color-border)] ${i === 1 || i === 3 ? 'translate-y-6' : ''}`}>
                    <div className="w-12 h-12 bg-gray-50 text-[var(--color-accent)] rounded-xl flex items-center justify-center mb-4">
                       <ft.i className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 font-[family-name:var(--font-heading)]">{ft.t}</h3>
                    <p className="text-gray-500 text-sm font-[family-name:var(--font-body)] leading-relaxed">{ft.d}</p>
                 </div>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaOrganikServices: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-semibold text-gray-900 mb-4">Temizlik Aşamalarımız</h2>
            <p className="text-gray-600 font-[family-name:var(--font-body)] text-lg max-w-2xl mx-auto">Sıfır atık, doğaya ve kumaşa saygı.</p>
         </div>

         <div className="space-y-6">
            {[
              { n: '01', title: 'Toz Alma & Ayrıştırma', desc: 'Sünger veya lateks tabanlı halıların organik yapısına zarar vermeden titreşimle tozları çekilir.' },
              { n: '02', title: 'Bitkisel Islatma', desc: 'Zeytinyağı asidi türevleri ve bitkisel gliserin içeren özel solüsyonla lifler yumuşatılır.' },
              { n: '03', title: 'Nazik Fırçalama', desc: 'At kılı fırçalar ve yumuşak pedler ile liflerin doğal yönünde yıkama yapılır.' },
              { n: '04', title: 'UV Güneşleme & Havalandırma', desc: 'Özel camlı seralarda radyant ısıtıcısız gün ışığında kuruması sağlanır.' }
            ].map((st, i) => (
              <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="bg-white rounded-3xl p-8 border border-[var(--color-border)] flex flex-col md:flex-row items-start md:items-center gap-8 hover:border-[var(--color-accent)]/50 transition-colors"
              >
                 <div className="text-5xl font-bold text-[var(--color-accent)]/20 font-[family-name:var(--font-heading)] shrink-0">
                    {st.n}
                 </div>
                 <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-900">{st.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-[family-name:var(--font-body)]">{st.desc}</p>
                 </div>
                 <div className="shrink-0 hidden md:block text-[var(--color-accent)]">
                    <RefreshCcw className="w-8 h-8 opacity-30" />
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
};

export const HaliyikamaOrganikGallery: React.FC<SectionProps> = ({ businessData }) => {
  return null; // For minimalist organic variant, skipping traditional gallery.
};

export const HaliyikamaOrganikContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-5xl text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-[var(--color-accent)] text-white p-12 md:p-20 rounded-[3rem] relative overflow-hidden"
         >
           <div className="absolute inset-0 bg-white/5 opacity-50 backdrop-blur-3xl" />
           <div className="relative z-10">
              <Leaf className="w-16 h-16 mx-auto mb-8 text-white" />
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-semibold mb-6">Sağlıklı Bir Ev İçin<br/>İlk Adımı Atın</h2>
              <p className="text-emerald-100 text-lg mb-12 max-w-2xl mx-auto font-[family-name:var(--font-body)]">
                 Doğal şampuanlarımız sadece kirleri çıkarmakla kalmaz, kumaşlarınızın ömrünü uzatır. Randevunuzu oluşturun, size ve ailenize nefes aldıran temizliği sunalım.
              </p>
              <div className="flex justify-center">
                 <a href={`tel:${businessData?.phoneClean}`} className="bg-white text-[var(--color-accent)] px-10 py-5 rounded-full text-xl font-bold shadow-xl hover:bg-emerald-50 transition-colors flex items-center gap-3">
                    <Droplet className="w-6 h-6" />
                    <span>{businessData?.phone}</span>
                 </a>
              </div>
           </div>
         </motion.div>
      </div>
    </section>
  );
};
