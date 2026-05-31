import React from 'react';
import { motion } from 'framer-motion';
import { Sofa, ShieldCheck, Clock, MapPin, BadgeCheck, Zap, PhoneCall } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const HaliyikamaKoltukHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full mb-6 font-semibold tracking-wide text-sm border border-[var(--color-accent)]/20">
               <Sofa className="w-4 h-4" />
               <span>{data.badge || 'YERİNDE YIKAMA HİZMETİ'}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] font-bold mb-6 leading-[1.1] text-gray-900 tracking-tight">
              {data.title || 'Koltuk Ve Yataklarda Derinlemesine Temizlik'}
            </h1>
            
            <p className="text-lg md:text-xl font-[family-name:var(--font-body)] text-gray-600 mb-10 max-w-lg leading-relaxed">
              {businessData?.slogan || 'Güçlü vakumlama ve sıcak su ektraksiyon yöntemiyle kumaşlarınızdaki zorlu lekeleri ve ev akarlarını yok ediyoruz.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={`tel:${businessData?.phoneClean}`}
                className="flex items-center justify-center gap-3 bg-[var(--color-accent)] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
              >
                <Zap className="w-5 h-5" />
                <span>HEMEN RANDEVU AL</span>
              </a>
              <div className="flex items-center justify-center gap-2 px-6 py-4 border border-[var(--color-border)] rounded-xl font-medium text-gray-700 bg-white">
                <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
                <span>Kumaşlara Zarar Vermez</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] rounded-[2.5rem] bg-[var(--color-surface)] border border-[var(--color-border)] p-8 flex items-center justify-center overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[80px]" />
            
            <Sofa className="w-48 h-48 text-[var(--color-accent)] opacity-20 relative z-10" />
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-8 py-4 rounded-2xl shadow-xl flex items-center gap-4 z-20 border border-[var(--color-border)] w-max max-w-full">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900 leading-tight">Garantili Temizlik</p>
                <p className="text-sm font-medium text-gray-500">Çıkmayan lekelerde ücretsiz müdahale</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaKoltukAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-6"
          >
            Nasıl Çalışıyoruz?
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-[family-name:var(--font-body)] text-lg">
            Evinize gelen profesyonel ekibimiz koltuklarınızın kumaş yapısına uygun çözümleri belirler.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Clock, title: 'Hızlı Randevu', desc: 'Size en uygun gün ve saatte adresinize geliyoruz. Bekleme yok.' },
            { icon: ShieldCheck, title: 'Bitkisel Solüsyon', desc: 'Evcil hayvan ve bebek dostu insan sağlığına zararsız şampuanlar.' },
            { icon: Zap, title: 'Güçlü Vakum', desc: 'Sanayi tipi Alman teknolojisi makinelerle köpüklü vakumlama.' }
          ].map((item, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-8 rounded-3xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
             >
               <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                 <item.icon className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 text-gray-900">{item.title}</h3>
               <p className="text-gray-600 font-[family-name:var(--font-body)] leading-relaxed">{item.desc}</p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaKoltukServices: React.FC<SectionProps> = ({ businessData }) => {
  const services = [
    'Oturma Grubu Yıkama', 'Köşe Takımı', 'Çekyat / Kanepe', 'Yatak Yıkama (Çift/Tek)',
    'Sandalye Yıkama', 'Oto Koltuk Yıkama', 'Puf & Mindet Temizliği', 'Leke Çıkarma İşlemi'
  ];

  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-[var(--color-accent)] text-white rounded-[2.5rem] p-12 lg:p-16 relative overflow-hidden"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6 text-white leading-tight">Hizmet Kapsamımız</h2>
                <p className="text-blue-100 text-lg mb-8 font-[family-name:var(--font-body)]">Tüm döşemelik kumaş türlerinde, derilerde ve nubuk ürünlerde özel fırça uçları ile işlem yapıyoruz.</p>
                <a href={`tel:${businessData?.phoneClean}`} className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Bilgi ve Fiyat Al
                </a>
             </div>
             <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((srv, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                         <BadgeCheck className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-blue-50">{srv}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const HaliyikamaKoltukGallery: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)] border-t border-[var(--color-border)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-[family-name:var(--font-heading)] font-bold text-gray-900">Kuruma Süresi Sadece 4 Saat!</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map((i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="aspect-square bg-[var(--color-bg)] rounded-3xl border border-[var(--color-border)] flex flex-col items-center justify-center p-6 text-center shadow-sm"
             >
               <Sofa className="w-16 h-16 text-gray-200 mb-4" />
               <span className="text-sm font-bold text-gray-400">Temizlik Öncesi & Sonrası</span>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HaliyikamaKoltukContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="p-12 border border-[var(--color-border)] rounded-3xl bg-white shadow-xl"
        >
          <h2 className="text-4xl font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-6">Müsaitlik Durumu Sorun</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Hemen arayın, size en yakın saat için randevu oluşturalım. Adresinize gelip tertemiz yapalım.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={`tel:${businessData?.phoneClean}`} className="flex items-center gap-3 bg-[var(--color-accent)] text-white px-8 py-4 rounded-xl text-xl font-bold hover:shadow-lg transition-all hover:-translate-y-1">
              <PhoneCall className="w-6 h-6" />
              <span>{businessData?.phone}</span>
            </a>
            <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-600 font-medium">
              <MapPin className="w-5 h-5" />
              <span>{businessData?.district} Servis Aracı</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
