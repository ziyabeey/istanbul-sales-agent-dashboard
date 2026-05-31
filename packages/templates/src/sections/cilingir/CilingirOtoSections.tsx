import React, { ComponentType } from 'react';
import type { SectionProps as GlobalSectionProps } from '../../types/section-types';
import { motion } from 'framer-motion';
import { KeyRound, ShieldAlert, PhoneCall, Clock, Wrench } from 'lucide-react';
import { registerSection } from '../../registry/section-registry';
interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const CilingirOtoHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] opacity-50" />
      <div className="absolute top-1/2 left-0 w-full h-[600px] bg-[var(--color-accent)] opacity-[0.05] blur-[120px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{data.badge || '7/24 OTO ÇİLİNGİR'}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] font-bold mb-6 leading-tight uppercase tracking-tight"
          >
            {data.title || 'Aracınızın Kapısı Güvenle Açılır, Anahtar Yenilenir'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-[family-name:var(--font-body)] text-[var(--color-text-secondary)] mb-10 max-w-2xl"
          >
            {businessData?.slogan || 'Her marka ve model araca özel hasarsız çilingir ve immobilizer çözümleri.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={`tel:${businessData?.phoneClean}`}
              className="inline-flex items-center justify-center space-x-3 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-8 py-5 rounded-lg text-lg font-bold hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95"
            >
              <PhoneCall className="w-6 h-6" />
              <span>HEMEN ARA: {businessData?.phone}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const CilingirOtoAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent">
              <div className="absolute inset-2 border border-[var(--color-accent)]/30 rounded-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <KeyRound className="w-32 h-32 text-[var(--color-accent)] opacity-50" />
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl font-[family-name:var(--font-heading)] font-bold mb-6 uppercase tracking-wide">
              Neden Biz?
            </h2>
            <p className="text-[var(--color-text-secondary)] font-[family-name:var(--font-body)] text-lg mb-8 leading-relaxed">
              Kaybolan veya kırılan oto anahtarlarından yedekleme işlemlerine kadar her türlü immobilizer çözümü için uzman ekibimizle hizmetinizdeyiz. Profesyonel ekipmanlarla hasarsız müdahale garanti altındadır.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Clock, title: 'Hızlı Ulaşım', desc: '15 dakikada yanınızdayız' },
                { icon: ShieldAlert, title: 'Hasarsız İşlem', desc: 'Aracınıza zarar vermeden' },
                { icon: Wrench, title: 'Teknolojik Cihaz', desc: 'Lisanslı programlama' },
                { icon: KeyRound, title: 'İmmobilizer', desc: 'Yerinde kodlama' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col space-y-2 p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                  <item.icon className="w-8 h-8 text-[var(--color-accent)]" />
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const CilingirOtoServices: React.FC<SectionProps> = ({ businessData }) => {
  const services = [
    { title: 'Kayıp Anahtar Yenileme', category: 'Kodlama' },
    { title: 'Kapı Kilit Açma', category: 'Hasarsız' },
    { title: 'İmmobilizer Çözümleri', category: 'Güvenlik' },
    { title: 'Kontak Arızası Tamiri', category: 'Mekanik' },
    { title: 'Yedek Anahtar', category: 'Kopyalama' },
    { title: 'Kumanda Tamiri', category: 'Elektronik' }
  ];

  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-4 uppercase">Teknik Hizmetlerimiz</h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wrench className="w-16 h-16 text-[var(--color-text)]" />
              </div>
              <span className="text-xs font-bold tracking-widest text-[var(--color-accent)] uppercase mb-2 block">
                {service.category}
              </span>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] font-bold mb-4">
                {service.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] font-[family-name:var(--font-body)]">
                Aracınız için en güvenli donanımlarla, en kaliteli hizmet garantisiyle.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CilingirOtoGallery: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)] border-y border-[var(--color-border)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-4 z-10 relative uppercase">Sahadan Görüntüler</h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] flex items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <ShieldAlert className="w-12 h-12 text-[var(--color-accent)] opacity-30 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-110 duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CilingirOtoContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--color-surface)] rounded-3xl p-10 md:p-16 border border-[var(--color-accent)]/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-10 rounded-bl-full blur-[80px]" />
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-6 uppercase">Yolda Kalmayın</h2>
            <p className="text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
              Konumuzu gönderin, mobil aracımızla yanınıza gelelim. Haftanın 7 günü hizmet veriyoruz.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href={`tel:${businessData?.phoneClean}`}
                className="flex items-center gap-3 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                <PhoneCall className="w-6 h-6" />
                <span className="text-lg text-left leading-tight">
                  <span className="block text-xs font-normal opacity-80">Acil Mobil Servis</span>
                  {businessData?.phone}
                </span>
              </a>
              <a
                href={`https://wa.me/${businessData?.whatsapp}`}
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                <span className="text-lg text-left leading-tight">
                  <span className="block text-xs font-normal opacity-80">Konum Gönder (WhatsApp)</span>
                  {businessData?.phone}
                </span>
              </a>
            </div>
            
            <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-wrap justify-center gap-8 text-[var(--color-text-secondary)] text-sm font-medium uppercase tracking-wide">
              <span>{businessData?.district}, {businessData?.city}</span>
              <span>Hasarsız İşlem Garantisi</span>
              <span>15 Dk İçi Ulaşım</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

registerSection('hero', 'cilingir_oto_hero', CilingirOtoHero as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('about', 'cilingir_oto_about', CilingirOtoAbout as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('services', 'cilingir_oto_services', CilingirOtoServices as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('gallery', 'cilingir_oto_gallery', CilingirOtoGallery as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('contact', 'cilingir_oto_contact', CilingirOtoContact as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
