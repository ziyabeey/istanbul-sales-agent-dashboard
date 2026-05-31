import React, { ComponentType } from 'react';
import type { SectionProps as GlobalSectionProps } from '../../types/section-types';
import { motion } from 'framer-motion';
import { LockOpen, ShieldAlert, KeyRound, CheckCircle2 } from 'lucide-react';
import { registerSection } from '../../registry/section-registry';
interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const CilingirKasaHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-bg)] to-[var(--color-surface)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-[var(--color-accent)]/30 text-[var(--color-accent)] rounded-full text-sm font-semibold tracking-wide uppercase bg-[var(--color-accent)]/10 backdrop-blur-sm"
        >
          <LockOpen className="w-4 h-4" />
          <span>{data.badge || 'PROFESYONEL KASA AÇMA'}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-heading)] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 uppercase drop-shadow-sm"
        >
          {data.title || 'Çelik Kasa Açma Uzmanı'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-2xl font-[family-name:var(--font-body)] text-[var(--color-text-secondary)] mb-10"
        >
          {businessData?.slogan || 'Banka kasalarından ev tiplerine, şifreli kasalardan anahtarlılara kadar tüm kasalar hasarsız açılır.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href={`tel:${businessData?.phoneClean}`}
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-bold text-lg hover:shadow-lg transition-all rounded shadow-[var(--color-accent)]/20 hover:-translate-y-1"
          >
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <span>KASA SERVİSİ İSTE</span>
            <div className="absolute inset-0 h-full w-full rounded outline outline-2 outline-offset-2 outline-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export const CilingirKasaAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="aspect-[4/5] bg-[var(--color-bg)] border-2 border-[var(--color-border)] p-8 relative flex flex-col justify-between">
              <div className="text-[var(--color-accent)]">
                <LockOpen className="w-20 h-20 mb-6" />
                <h3 className="text-3xl font-[family-name:var(--font-heading)] font-bold mb-4">Master Kasa Çilingiri</h3>
                <p className="font-[family-name:var(--font-body)] text-[var(--color-text-secondary)]">
                  Siradan kilitleri asan uzmanlik gerektiren kasa acma tecrubesiyle degerli esyalariniza yeniden erisim saglar.
                </p>
              </div>
              <div className="space-y-4 pt-8 border-t border-[var(--color-border)] text-sm font-bold tracking-widest uppercase">
                <div className="flex justify-between">
                  <span>Hasar Durumu</span>
                  <span className="text-[var(--color-accent)]">Sıfır Hasar</span>
                </div>
                <div className="flex justify-between">
                  <span>Müdahale Hızı</span>
                  <span className="text-[var(--color-accent)]">Acil</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-4xl font-[family-name:var(--font-heading)] font-bold mb-8 capitalize">15 Yıllık Kasa Açma Tecrübesi</h2>
            <div className="space-y-6">
              {[
                'Şifresi unutulan mekanik veya elektronik kasaların açılması.',
                'Anahtarı kaybolan çelik kasalara kilitli hasarsız müdahale.',
                'Otel tipi veya özel banka kasası göbek değişim işlemleri.',
                'Kilitli kalan şifre panellerinin resetlenmesi ve ayarlanması.'
              ].map((text, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <p className="text-lg font-[family-name:var(--font-body)] text-[var(--color-text-secondary)]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const CilingirKasaServices: React.FC<SectionProps> = ({ businessData }) => {
  const services = [
    { title: 'Şifreli Kasa', sub: 'Elektronik / Dijital', icon: KeyRound },
    { title: 'Mekanik Kasa', sub: 'Anahtarlı Çelik', icon: LockOpen },
    { title: 'Otel Kasası', sub: 'Kompakt / Mini', icon: ShieldAlert },
    { title: 'Banka Kasası', sub: 'Yüksek Güvenlik', icon: KeyRound }
  ];

  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-4">Açtığımız Kasa Tipleri</h2>
          <p className="text-[var(--color-text-secondary)] font-[family-name:var(--font-body)] max-w-2xl mx-auto">
            Marka ve model fark etmeksizin tüm güvenli kilit sistemlerine özel ekipmanlarla uygun müdahale yetisine sahibiz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-surface)] flex flex-col items-center text-center transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <srv.icon className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-2">{srv.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] font-bold tracking-widest uppercase">{srv.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CilingirKasaGallery: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center relative group overflow-hidden"
             >
               <div className="absolute inset-0 bg-[var(--color-accent)]/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center justify-center text-[var(--color-text-on-accent)]">
                 <ShieldAlert className="w-8 h-8 mb-2" />
                 <span className="font-bold tracking-wider text-sm uppercase">Güvenli Açılış</span>
               </div>
               <LockOpen className="w-12 h-12 text-[var(--color-text-secondary)] opacity-20" />
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CilingirKasaContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-bg)] text-[var(--color-text)] relative">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-[var(--color-surface)] p-12 md:p-20 border border-[var(--color-border)] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)] opacity-5 rounded-bl-full" />
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-6 text-white uppercase tracking-tight">Değerlileriniz Bize Emanet</h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto font-[family-name:var(--font-body)]">
            Açılamayan kasa yoktur, tecrübesiz çilingir vardır. Profesyonel kasa çilingirine hemen ulaşın.
          </p>
          <a
            href={`tel:${businessData?.phoneClean}`}
            className="inline-flex items-center gap-3 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-10 py-5 font-bold text-xl hover:bg-opacity-90 transition-all rounded shadow-lg shadow-[var(--color-accent)]/20 hover:scale-105"
          >
            <span>HEMEN ARA: {businessData?.phone}</span>
          </a>
          <p className="mt-8 text-sm text-[var(--color-text-secondary)] font-bold tracking-widest uppercase">
            Hizmet Bölgesi: {businessData?.district}, {businessData?.city}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

registerSection('hero', 'cilingir_kasa_hero', CilingirKasaHero as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('about', 'cilingir_kasa_about', CilingirKasaAbout as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('services', 'cilingir_kasa_services', CilingirKasaServices as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('gallery', 'cilingir_kasa_gallery', CilingirKasaGallery as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('contact', 'cilingir_kasa_contact', CilingirKasaContact as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
