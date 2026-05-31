import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Truck, ArrowRight, CheckCircle, ShieldAlert, BadgeCheck, Building2 } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const InsaatKurumsalHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center bg-[var(--color-accent)] text-white">
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             className="inline-block bg-blue-600 px-4 py-2 text-sm font-bold uppercase tracking-wider mb-8"
           >
             {data?.badge || 'ALTYAPI & ÜSTYAPI'}
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] font-extrabold mb-8 leading-tight"
           >
             {data?.title || 'Türkiye\'nin Mega Projelerinde İmzamız Var'}
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-xl text-slate-300 font-[family-name:var(--font-body)] mb-10 max-w-2xl leading-relaxed"
           >
             {businessData?.slogan || '40 yıllık tecrübe ile kamu ihaleleri, otoyol projeleri ve kurumsal bina komplekslerinde güvenilir çözüm ortağınız.'}
           </motion.p>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="flex flex-wrap gap-4"
           >
             <a href={`tel:${businessData?.phoneClean}`} className="bg-white text-[var(--color-accent)] px-8 py-4 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2 group">
               Teklif Alın <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
             <button className="border-2 border-slate-600 px-8 py-4 font-bold hover:border-slate-400 transition-colors">
               Hizmetlerimiz
             </button>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export const InsaatKurumsalAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="aspect-video bg-slate-200 rounded-lg relative overflow-hidden flex items-center justify-center border border-[var(--color-border)] shadow-xl"
           >
              <HardHat className="w-24 h-24 text-[var(--color-accent)] opacity-20" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-50" />
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-slate-900 mb-6">Nesiller Boyu Kalıcı Eserler Bırakıyoruz</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {businessData?.name || 'Kurumsal İnşaat A.Ş.'}, kurulduğu günden bu yana sayısız devlet kurumu ve büyük ölçekli özel sektör yatırımına mühendislik hizmeti sunmuştur. İş güvenliğini, zamanında teslimatı ve uluslararası kalite standartlarını tartışmasız bir kural olarak kabul ediyoruz.
              </p>
              
              <div className="space-y-4">
                 {[
                   { i: ShieldAlert, t: 'İş Sağlığı ve Güvenliği' },
                   { i: BadgeCheck, t: 'ISO 9001 Kalite Yönetimi' },
                   { i: CheckCircle, t: 'Zamanında Teslimat Garantisi' }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center shrink-0">
                         <item.i className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-800">{item.t}</span>
                   </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export const InsaatKurumsalServices: React.FC<SectionProps> = () => {
  const services = [
    { t: 'Altyapı Projeleri', d: 'Otoyol, köprü, baraj ve tünel inşaatlarında devasa kapasite.' },
    { t: 'Üstyapı ve Bina', d: 'Kamu binaları, hastaneler, eğitim kurumları ve iş merkezleri.' },
    { t: 'Taahhüt İşleri', d: 'Anahtar teslim yapım, proje yönetimi ve ihale süreçleri.' },
    { t: 'Güçlendirme', d: 'Mevcut yapıların deprem ve sismik izolasyon güçlendirmeleri.' }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-[family-name:var(--font-heading)] font-bold mb-4">Faaliyet Alanlarımız</h2>
           <div className="w-20 h-1 bg-blue-500 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {services.map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="bg-slate-800 p-8 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors group"
             >
                <Truck className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4">{item.t}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export const InsaatKurumsalProjects: React.FC<SectionProps> = () => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="container mx-auto px-4 max-w-6xl">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
               <h2 className="text-4xl font-[family-name:var(--font-heading)] font-bold text-slate-900 mb-4">Referans Projeler</h2>
               <p className="text-slate-600 max-w-xl">Ülke ekonomisine katkı sağlayan, gururla teslim ettiğimiz büyük ölçekli ve yüksek mühendislik gerektiren projelerimiz.</p>
            </div>
            <button className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 whitespace-nowrap">
               Tümünü Gör <ArrowRight className="w-4 h-4" />
            </button>
         </div>

         <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col"
               >
                  <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                     <Building2 className="w-12 h-12 text-slate-300" />
                  </div>
                  <div className="p-6">
                     <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider">Biten Proje</div>
                     <h3 className="font-bold text-slate-900 text-lg mb-2">Devlet Hastanesi Kompleksi</h3>
                     <p className="text-slate-500 text-sm">Kat alanı: 150.000 m² | Tamamlanma Yılı: 2023</p>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
};

export const InsaatKurumsalContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-blue-600 text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-6">Yeni Bir Projeye Mi Başlıyorsunuz?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
               Geniş makine parkurumuz ve uzman mühendis kadromuzla ihalelerinizi ve özel yatırımlarınızı hayata geçirmek için buradayız.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <a href={`tel:${businessData?.phoneClean}`} className="bg-white text-blue-600 px-10 py-4 font-bold rounded shadow-lg hover:bg-slate-50 transition-colors">
                  İletişime Geçin
               </a>
               <a href={`mailto:${businessData?.email}`} className="border border-blue-400 px-10 py-4 font-bold rounded hover:bg-blue-700 transition-colors">
                  Kurumsal Dosya Talebi
               </a>
            </div>
         </motion.div>
      </div>
    </section>
  );
};
