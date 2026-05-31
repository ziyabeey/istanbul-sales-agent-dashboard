import React, { ComponentType } from 'react';
import type { SectionProps as GlobalSectionProps } from '../../types/section-types';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, MapPin, Search, PhoneCall } from 'lucide-react';
import { registerSection } from '../../registry/section-registry';
interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const CilingirCelikHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[var(--color-surface)] border-l border-[var(--color-border)] hidden lg:block" />
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-4 py-2 rounded mb-8 font-medium tracking-widest text-sm border border-[var(--color-accent)]/20">
                <ShieldCheck className="w-5 h-5" />
                <span>{data.badge || 'ÜSTÜN GÜVENLİK TEKNOLOJİSİ'}</span>
              </div>
              <h1 className="text-5xl lg:text-8xl font-[family-name:var(--font-heading)] font-bold mb-8 leading-[1.1] tracking-tight text-white drop-shadow-md">
                {data.title || 'Çelik Kapı Güvenlik Sistemleri'}
              </h1>
              <p className="text-xl lg:text-2xl font-[family-name:var(--font-body)] text-[var(--color-text-secondary)] mb-12 max-w-2xl font-light">
                {businessData?.slogan || 'Evinizin ve iş yerinizin güvenliğini dijital ve mekanik yüksek teknolojili donanımlarla garanti altına alıyoruz.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href={`tel:${businessData?.phoneClean}`}
                  className="bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-8 py-5 text-lg font-bold hover:bg-opacity-90 transition-all text-center flex items-center justify-center gap-3 drop-shadow-glow"
                >
                  <Lock className="w-6 h-6" />
                  KİLİT TAMİRİ
                </a>
                <a
                  href="#contact"
                  className="border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] px-8 py-5 text-lg font-medium hover:border-[var(--color-accent)] transition-all text-center"
                >
                  Ücretsiz Keşif İste
                </a>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-64 h-[600px] border-l border-r border-t border-[var(--color-accent)]/30 rounded-t-full relative flex items-center justify-center bg-[var(--color-bg)]/50 backdrop-blur-sm overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent" />
                <Lock className="w-24 h-24 text-[var(--color-accent)] opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CilingirCelikAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-32 bg-[var(--color-surface)] text-[var(--color-text)] border-t border-[var(--color-border)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-6 text-white"
          >
            Yenilmez Güvenlik İçi̇n Profesyonel Yaklaşım
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '100px' }}
            viewport={{ once: true }}
            className="h-1 bg-[var(--color-accent)] mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Search, title: 'Analiz ve Keşif', desc: 'Kapınızın mevcut durumu incelenir ve güvenlik açıkları tespit edilir.' },
            { icon: ShieldCheck, title: 'Doğru Donanım', desc: 'İhtiyacınıza uygun olan en güvenli mekanizma ve kilit tipi önerilir.' },
            { icon: Lock, title: 'Uzman Montaj', desc: 'Eski sistem sökülerek yerine kusursuz bir şekilde yenisi entegre edilir.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-bg)] transition-colors duration-300 relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <div className="w-16 h-16 bg-[var(--color-surface)] flex items-center justify-center mb-8 border border-[var(--color-border)] text-[var(--color-accent)]">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-heading)] font-bold mb-4">{item.title}</h3>
              <p className="text-[var(--color-text-secondary)] font-[family-name:var(--font-body)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CilingirCelikServices: React.FC<SectionProps> = ({ businessData }) => {
  const services = [
    { title: 'Çelik Kapı Açma', desc: 'Kilitli veya kapalı kalmış çelik kapılar hasarsız profesyonel tekniklerle açılır.' },
    { title: 'Barel & Kilit Değişimi', desc: 'Hırsızlığa karşı yüksek güvenlikli, patentli tuzaklı bareller montajlanır.' },
    { title: 'Akıllı Kilit Sistemleri', desc: 'Anahtarsız giriş sağlayan parmak izi ve mobil uyumlu akıllı kilit entegrasyonu.' },
    { title: 'Kapı Ayarı ve Tamir', desc: 'Sürtme yapan, tam kapanmayan çelik kapıların menteşe ve kilit ayarları yapılır.' }
  ];

  return (
    <section className="py-32 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-8 tracking-tight">
              Uzmanlık Alanlarımız
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] mb-12 font-light">
              Yüksek donanım ve tecrübe gerektiren çelik kapı servis hizmetleri sunuyoruz.
            </p>
            
            <div className="space-y-8">
              {services.map((srv, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <ShieldCheck className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{srv.title}</h3>
                    <p className="text-[var(--color-text-secondary)] text-sm">{srv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[3/4] border border-[var(--color-border)] bg-[var(--color-surface)] relative flex items-center justify-center p-8 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--color-accent)] opacity-5" />
            <div className="relative z-10 text-center border p-8 border-[var(--color-accent)]/20 w-full h-full flex flex-col items-center justify-center bg-[var(--color-bg)]/90">
              <Lock className="w-24 h-24 mb-8 text-[var(--color-accent)]" />
              <h4 className="text-2xl font-bold mb-4 font-[family-name:var(--font-heading)]">GÜVENLİK SINIFI: A+</h4>
              <p className="text-[var(--color-text-secondary)] mb-8">Uluslararası standartlarda sertifikalı donanımlar.</p>
              <div className="px-6 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm font-bold tracking-widest">
                GARANTİLİ HİZMET
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const CilingirCelikGallery: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex overflow-hidden relative w-full text-8xl md:text-9xl font-bold font-[family-name:var(--font-heading)] opacity-5 text-[var(--color-text)] whitespace-nowrap py-12">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear" as const, duration: 20 }}
            className="flex gap-8"
          >
            {[...Array(4)].map((_, i) => (
              <span key={i}>GÜVENLİK • SAĞLAMLIK • HIZ • PROFESYONELLİK • TEKNOLOJİ • </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const CilingirCelikContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section id="contact" className="py-32 bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[var(--color-surface)] -skew-x-12 translate-x-32 hidden lg:block" />
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-8">Servis Talebi Oluştur</h2>
            <p className="text-[var(--color-text-secondary)] mb-12 text-lg font-light">
              Acil durumlarınız veya planlı donanım değişiklikleriniz için bizimle iletişime geçin.
            </p>
            <div className="space-y-6">
              <a href={`tel:${businessData?.phoneClean}`} className="flex items-center gap-6 p-6 border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors group">
                <div className="bg-[var(--color-bg)] p-4 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-text-on-accent)] transition-colors">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-[var(--color-text-secondary)] font-medium mb-1 tracking-widest uppercase">7/24 Acil Hat</div>
                  <div className="text-2xl font-bold">{businessData?.phone}</div>
                </div>
              </a>
              <div className="flex items-center gap-6 p-6 border border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="bg-[var(--color-bg)] p-4 text-[var(--color-text-secondary)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-[var(--color-text-secondary)] font-medium mb-1 tracking-widest uppercase">Servis Bölgemiz</div>
                  <div className="text-xl font-bold">{businessData?.district}, {businessData?.city}</div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center p-12 lg:p-0"
          >
            <div className="text-center w-full max-w-md">
              <div className="w-24 h-24 mx-auto border-4 border-[var(--color-accent)] flex items-center justify-center mb-8 rounded-full">
                <ShieldCheck className="w-10 h-10 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-[family-name:var(--font-heading)] text-white">
                %100 Müşteri Memnuniyeti
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Güvenliğiniz şansa bırakılamaz. Sertifikalı ekibimiz ve orijinal ürün garantimiz ile hizmetinizdeyiz.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

registerSection('hero', 'cilingir_celik_hero', CilingirCelikHero as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('about', 'cilingir_celik_about', CilingirCelikAbout as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('services', 'cilingir_celik_services', CilingirCelikServices as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('gallery', 'cilingir_celik_gallery', CilingirCelikGallery as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('contact', 'cilingir_celik_contact', CilingirCelikContact as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
