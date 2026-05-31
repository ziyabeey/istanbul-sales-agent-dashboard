import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Droplets, CheckCircle2, PhoneCall, Star } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const HaliyikamaEvHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[var(--color-surface)] opacity-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full mb-8">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold text-sm">{data.badge || 'PROFESYONEL HALI YIKAMA'}</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold font-[family-name:var(--font-heading)] mb-6 leading-tight text-gray-900 drop-shadow-sm">
              {data.title || 'Halılarınız İlk Günkü Gibi Tertemiz'}
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-[family-name:var(--font-body)]">
              {businessData?.slogan || 'Evinizdeki halıları ücretsiz servisimizle kapınızdan alıyor, özel şampuanlarla tertemiz yıkayıp teslim ediyoruz.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href={`tel:${businessData?.phoneClean}`}
                className="inline-flex gap-3 items-center justify-center px-8 py-4 bg-[var(--color-accent)] text-white font-bold rounded-xl shadow-lg shadow-[var(--color-accent)]/30 hover:-translate-y-1 transition-transform"
              >
                <PhoneCall className="w-5 h-5" />
                ÜCRETSİZ SERVİS ÇAĞIR
              </a>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" />
                <span>Ücretsiz Servis</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" />
                <span>Garantili Yıkama</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center relative"
          >
            <div className="w-full max-w-md aspect-square bg-[var(--color-surface)] border-4 border-white shadow-2xl rounded-tr-[100px] rounded-bl-[100px] overflow-hidden relative flex items-center justify-center">
              <Droplets className="w-32 h-32 text-[var(--color-accent)] opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent flex items-end justify-center p-8">
                <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-800">%100 Memnuniyet Garantisi</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaEvAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-white text-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-[var(--color-surface)] aspect-[4/5] rounded-3xl flex items-center justify-center border border-[var(--color-border)] shadow-sm">
                  <Droplets className="w-16 h-16 text-[var(--color-accent)] opacity-50" />
                </div>
                <div className="bg-[var(--color-accent)] text-white aspect-square rounded-3xl flex flex-col items-center justify-center shadow-lg shadow-[var(--color-accent)]/20 p-6 text-center">
                  <span className="text-4xl font-bold mb-2">10+</span>
                  <span className="font-medium">Yıllık Tecrübe</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-[var(--color-surface)] aspect-square rounded-3xl flex flex-col items-center justify-center border border-[var(--color-border)] shadow-sm p-6 text-center">
                   <div className="flex gap-1 text-yellow-500 mb-2">
                     {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
                   </div>
                   <span className="font-bold text-gray-800 text-lg">Mutlu Müşteri</span>
                </div>
                <div className="bg-[var(--color-surface)] aspect-[4/5] rounded-3xl flex items-center justify-center border border-[var(--color-border)] shadow-sm">
                  <Sparkles className="w-16 h-16 text-[var(--color-accent)] opacity-50" />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6 text-gray-900 leading-tight">
              Halı Yıkamada <br/><span className="text-[var(--color-accent)]">Güvenilir Adresiniz</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed font-[family-name:var(--font-body)] text-lg">
              Evlerimizin en çok kullanılan eşyası olan halılar, zamanla gözle görülmeyen bakteri ve ev akarlarını barındırır. 
              Özel anti-bakteriyel bitkisel şampuanlarımız ve tam otomatik makinelerimiz ile halılarınızı özüne zarar vermeden derinlemesine temizliyoruz.
            </p>
            <ul className="space-y-4 font-[family-name:var(--font-body)]">
              {[
                'Tam Otomatik Makinelerde Yıkama',
                'Bitkisel Leke Çıkarıcı Şampuanlar',
                'Kapalı Kurutma Odalarında Tozsuz Kurutma',
                'Ücretsiz ve Hızlı Servis Ağı'
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-center text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaEvServices: React.FC<SectionProps> = ({ businessData }) => {
  const processes = [
    { title: 'Toz Alma', desc: 'Halılar çırpma makinesinde toz ve kaba pisliklerden arındırılır.' },
    { title: 'Derin Yıkama', desc: 'Tam otomatik bantlı sistemde anti-bakteriyel şampuanlarla alt-üst yıkanır.' },
    { title: 'Sıkma & Durulama', desc: 'Kazan tipi sıkma makinelerinde %95 oranında kurutulur.' },
    { title: 'Kurutma & Paketleme', desc: 'Kapalı kurutma odalarında kurutulur, son kontrol sonrası parfümlenip paketlenir.' }
  ];

  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4 text-gray-900"
          >
            Yıkama Aşamalarımız
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 64 }}
            viewport={{ once: true }}
            className="h-1 bg-[var(--color-accent)] mx-auto rounded-full"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processes.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative group hover:shadow-xl transition-shadow"
            >
              <div className="text-6xl font-black text-[var(--color-accent)] opacity-10 absolute right-6 top-6 transition-transform group-hover:scale-110">
                0{i+1}
              </div>
              <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-heading)] text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaEvGallery: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-white text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-[4/3] bg-gray-100 rounded-2xl border-4 border-[var(--color-surface)] flex flex-col items-center justify-center text-gray-300 group hover:border-[var(--color-accent)] transition-colors overflow-hidden relative cursor-pointer"
            >
              <Droplets className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-[var(--color-accent)]/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                <span className="text-white font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur">Öncesi - Sonrası</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaEvContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)] border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] rounded-[3rem] p-10 md:p-16 border border-[var(--color-border)] shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 text-center">
             <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6 text-gray-900">
               Ücretsiz Servisi <br/> Hemen Çağırın
             </h2>
             <p className="text-gray-600 mb-10 max-w-xl mx-auto font-[family-name:var(--font-body)] text-lg">
               Siz yorulmayın, lekelerle biz savaşalım. Halılarınızı evinizden alıp evinize bırakıyoruz.
             </p>
             <div className="flex justify-center">
               <a
                 href={`tel:${businessData?.phoneClean}`}
                 className="flex items-center gap-4 bg-[var(--color-accent)] text-white px-10 py-5 rounded-2xl font-bold hover:shadow-[0_10px_40px_-10px_var(--color-accent)] transition-all hover:-translate-y-1 group"
               >
                 <div className="bg-white/20 p-2 rounded-full group-hover:animate-bounce">
                   <PhoneCall className="w-6 h-6" />
                 </div>
                 <span className="text-xl">{businessData?.phone}</span>
               </a>
             </div>
             
             <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 text-sm font-semibold text-gray-500 tracking-wide uppercase">
               <span className="bg-white px-4 py-2 rounded-full shadow-sm">{businessData?.district} Servisimiz</span>
               <span className="bg-white px-4 py-2 rounded-full shadow-sm">Garantili Leke Çıkarma</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
