import React, { ComponentType } from 'react';
import type { SectionProps as GlobalSectionProps } from '../../types/section-types';
import { motion } from 'framer-motion';
import { Fingerprint, Smartphone, Cpu, Shield, ArrowRight } from 'lucide-react';
import { registerSection } from '../../registry/section-registry';
interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const CilingirLuxHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-[var(--color-bg)] text-[var(--color-text)] overflow-hidden">
      <div className="absolute inset-0 bg-[#000000]">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[var(--color-accent)]/10 blur-[150px] opacity-60 rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[var(--color-accent)]/5 blur-[100px] opacity-40 rounded-full mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-12 flex flex-col md:flex-row items-center gap-12 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 border border-[var(--color-accent)]/30 px-3 py-1 rounded-full mb-8 backdrop-blur-md bg-white/5">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="text-xs tracking-[0.2em] font-medium text-[var(--color-accent)] uppercase">
              {data.badge || 'SMART HOME SECURITY'}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-heading)] font-bold mb-6 tracking-tight text-white leading-none">
            {data.title || 'Geleceğin Güvenliği Kapınızda'}
          </h1>
          
          <p className="text-lg md:text-xl font-[family-name:var(--font-body)] text-gray-400 mb-10 max-w-xl font-light leading-relaxed">
            {businessData?.slogan || 'Parmak izi, yüz tanıma ve mobil uygulama kontrollü biyometrik kilit sistemleri kurulumu ve entegrasyonu.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={`tel:${businessData?.phoneClean}`} className="group relative px-8 py-4 bg-[var(--color-accent)] text-[#000000] font-bold text-sm tracking-widest uppercase overflow-hidden text-center rounded-sm">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Teknoloji Danışmanı
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md aspect-[3/4] border border-[var(--color-border)] rounded-sm bg-[#0a0a0a] flex flex-col justify-between p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex justify-between items-start text-[var(--color-accent)]">
              <Fingerprint className="w-12 h-12" />
              <div className="text-xs font-mono opacity-50 tracking-widest">v2.0 BIOMETRIC</div>
            </div>
            
            <div className="relative z-10">
              <div className="h-px w-full bg-gradient-to-r from-[var(--color-accent)]/50 to-transparent mb-8" />
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-2 tracking-wide">Yüz Tanıma & Parmak İzi</h3>
              <p className="text-gray-500 font-light text-sm">Fiziksel anahtarları unutun. Sınırsız güvenlik, benzersiz konfor.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const CilingirLuxAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-32 bg-[#050505] text-[var(--color-text)] border-t border-[#111]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] font-bold mb-6 text-white tracking-tight leading-tight">
              Geleneksel Kilitleri <br className="hidden md:block" />
              <span className="text-[var(--color-accent)]">Aşma Zamanı</span>
            </h2>
            <p className="text-gray-400 font-light text-lg mb-8 leading-relaxed">
              Ev otomasyon sistemlerine tam uyumlu, akıllı telefonunuzdan yönetilebilen, 
              geçmiş hareket kayıtlarını görebileceğiniz premium biyometrik çözümler sunuyoruz. 
              Uzman mühendislerimiz eski kapınıza akıllı sistemleri kusursuz entegre eder.
            </p>
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 rounded-full border border-[var(--color-accent)] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <span className="font-bold tracking-widest uppercase text-sm">Endüstri Standartlarında Şifreleme</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { text: 'Uzaktan Kontrol', icon: Smartphone },
              { text: 'Log Kaydı', icon: Cpu },
              { text: 'Hızlı Giriş', icon: Fingerprint },
              { text: 'Anti-Hırsızlık', icon: Shield }
            ].map((item, i) => (
              <div key={i} className="bg-[#111] border border-[#222] hover:border-[var(--color-accent)]/50 p-6 rounded-sm transition-colors flex flex-col items-center justify-center text-center gap-4">
                <item.icon className="w-8 h-8 text-[var(--color-accent)]" />
                <span className="text-sm font-medium tracking-wide text-white">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const CilingirLuxServices: React.FC<SectionProps> = ({ businessData }) => {
  const services = [
    { title: 'Biyometrik Kilit Kurulumu', num: '01' },
    { title: 'Yüz Tanıma Sistemleri', num: '02' },
    { title: 'Akıllı Ev Entegrasyonu', num: '03' },
    { title: 'Mobil Kontrol Kurulumu', num: '04' }
  ];

  return (
    <section className="py-32 bg-[var(--color-bg)] text-[var(--color-text)] relative">
      <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent opacity-20 hidden md:block" />
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <h2 className="text-xs text-[var(--color-accent)] tracking-[0.3em] font-bold uppercase mb-4">Hizmetlerimiz</h2>
          <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] font-bold text-white tracking-tight">VIP Güvenlik Kurulumları</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          {services.map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`py-8 block border-b border-[#222] ${i === 0 || i === 1 ? 'border-t' : ''}`}
            >
              <div className="flex items-start justify-between group cursor-pointer">
                <div>
                  <span className="text-4xl font-[family-name:var(--font-heading)] font-bold text-[#222] group-hover:text-[var(--color-accent)] transition-colors block mb-2">{srv.num}</span>
                  <h4 className="text-2xl font-medium text-white group-hover:translate-x-2 transition-transform">{srv.title}</h4>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#333] flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-black transition-all">
                  <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CilingirLuxGallery: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[#050505] text-[var(--color-text)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center">
           {[1, 2, 3].map((i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-full md:w-[30%] aspect-video bg-[#111] relative group overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 z-10">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-xs tracking-widest text-[var(--color-accent)] font-bold mb-1">PROJE</p>
                    <p className="text-white font-medium">Biyometrik Kapı Kurulumu</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[var(--color-accent)]/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                   <Fingerprint className="w-12 h-12 text-[#222]" />
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export const CilingirLuxContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-32 bg-[var(--color-bg)] text-[var(--color-text)] border-t border-[#111]">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 flex items-center justify-center mb-8">
            <Cpu className="w-8 h-8 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] font-bold text-white leading-tight mb-8">
            Geleceğin Teknolojisini <br/> Kapınıza Getirelim
          </h2>
          <a
            href={`tel:${businessData?.phoneClean}`}
            className="inline-block px-12 py-5 border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300"
          >
            ÖZEL KEŞİF TALEBİ: {businessData?.phone}
          </a>
          
          <div className="mt-16 flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-xs text-gray-500 font-mono tracking-widest uppercase">
            <span>BÖLGE: {businessData?.district}</span>
            <span>7/24 Teknik Destek</span>
            <span>2 Yıl Uluslararası Garanti</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

registerSection('hero', 'cilingir_lux_hero', CilingirLuxHero as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('about', 'cilingir_lux_about', CilingirLuxAbout as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('services', 'cilingir_lux_services', CilingirLuxServices as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('gallery', 'cilingir_lux_gallery', CilingirLuxGallery as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
registerSection('contact', 'cilingir_lux_contact', CilingirLuxContact as unknown as ComponentType<GlobalSectionProps<Record<string, unknown>>>);
