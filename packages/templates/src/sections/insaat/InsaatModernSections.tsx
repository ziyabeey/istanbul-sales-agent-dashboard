import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cuboid, TriangleRight, Target, Maximize, ArrowUpRight } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const InsaatModernHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="relative min-h-[90vh] bg-[var(--color-bg)] flex items-center overflow-hidden">
       {/* Asymmetric Background Elements */}
       <div className="absolute top-0 right-0 w-2/3 h-full bg-[var(--color-surface)] clip-path-[polygon(20%_0,100%_0,100%_100%,0%_100%)] pointer-events-none" />
       
       <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <motion.div 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="max-w-xl"
             >
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-12 h-1 bg-[var(--color-accent)]" />
                   <span className="text-[var(--color-accent)] font-bold tracking-widest text-xs uppercase uppercase font-[family-name:var(--font-heading)]">
                     {data?.badge || 'YENİ NESİL TAAHHÜT'}
                   </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] font-semibold text-[var(--color-text)] leading-[1.05] mb-8">
                  {data?.title || 'Modern Yaşam Alanları İnşa Ediyoruz.'}
                </h1>
                
                <p className="text-lg text-gray-500 font-[family-name:var(--font-body)] mb-10 leading-relaxed">
                  {businessData?.slogan || 'Akıllı binalar, sürdürülebilir mimari ve ince düşünülmüş mühendislik detaylarıyla geleceğin şehirlerini yaratıyoruz.'}
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                   <a href={`tel:${businessData?.phoneClean}`} className="bg-[var(--color-text)] text-white px-8 py-4 font-[family-name:var(--font-heading)] font-medium hover:bg-[var(--color-accent)] transition-colors inline-flex items-center gap-2 group">
                      Projeyi Konuşalım
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </a>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="relative lg:h-[600px] bg-gray-100 flex items-center justify-center border border-[var(--color-border)] shadow-2xl"
             >
                <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full" />
                <div className="absolute -right-6 -top-6 w-24 h-24 border border-[var(--color-border)] border-dashed rounded-full animate-[spin_20s_linear_infinite]" />
                <Cuboid className="w-32 h-32 text-gray-300" />
             </motion.div>
          </div>
       </div>
    </section>
  );
};

export const InsaatModernAbout: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-surface)] text-[var(--color-text)]">
       <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-12 gap-12 items-center">
             <motion.div 
               className="md:col-span-4"
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
                <h2 className="text-4xl font-[family-name:var(--font-heading)] font-semibold mb-6">Mekana Can Veren Yaklaşım</h2>
                <div className="w-10 h-1 bg-[var(--color-accent)] mb-6" />
                <p className="text-gray-500 font-[family-name:var(--font-body)]">Sadece beton dökmüyor, orada yaşayacak insanların psikolojisini ve enerjisini tasarlıyoruz.</p>
             </motion.div>
             <motion.div 
               className="md:col-span-8 grid sm:grid-cols-2 gap-8"
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
                {['Sıfır Karbon Hedefi', 'Minimalist Estetik', 'Akıllı Otomasyon', 'Esnek Yaşam Alanları'].map((f, i) => (
                  <div key={i} className="bg-[var(--color-bg)] p-8 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
                     <Layers className="w-8 h-8 text-[var(--color-accent)]/50 group-hover:text-[var(--color-accent)] mb-4 transition-colors" />
                     <h3 className="font-semibold text-lg font-[family-name:var(--font-heading)] mb-2">{f}</h3>
                     <p className="text-sm text-gray-500">Kullanıcı merkezli tasarım ilkeleriyle şekillendirilmiş yenilikçi çözümler.</p>
                  </div>
                ))}
             </motion.div>
          </div>
       </div>
    </section>
  );
};

export const InsaatModernProjects: React.FC<SectionProps> = () => {
  return (
    <section className="py-32 bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-hidden">
       {/* Decor */}
       <div className="absolute left-0 top-1/2 w-64 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
       
       <div className="container mx-auto px-4 max-w-6xl pb-12 mb-12 border-b border-[var(--color-border)] flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-[var(--color-accent)] font-bold tracking-widest text-xs uppercase mb-2 block">PORTFOLYO</span>
            <h2 className="text-5xl font-[family-name:var(--font-heading)] font-semibold">Öne Çıkanlar</h2>
          </div>
          <button className="text-sm font-semibold hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 uppercase tracking-wide">
             Tüm Projelerimiz <ArrowUpRight className="w-4 h-4" />
          </button>
       </div>

       <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col gap-16">
             {[
               { t: 'Natura Residence', loc: 'Ataşehir, IST', y: '2023', img: 'bg-stone-200' },
               { t: 'Tech Plaza', loc: 'Maslak, IST', y: '2024', img: 'bg-zinc-200' }
             ].map((pr, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? 'md:[direction:rtl]' : ''}`}
                >
                   <div className={`aspect-[4/3] ${pr.img} flex items-center justify-center border border-[var(--color-border)] ${i % 2 !== 0 ? '[direction:ltr]' : ''}`}>
                      <Maximize className="w-12 h-12 text-gray-300" />
                   </div>
                   <div className={`p-8 ${i % 2 !== 0 ? '[direction:ltr]' : ''}`}>
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                         <span>{pr.y}</span>
                         <span className="w-1 h-1 bg-current rounded-full" />
                         <span>{pr.loc}</span>
                      </div>
                      <h3 className="text-3xl font-[family-name:var(--font-heading)] font-semibold mb-4 hover:text-[var(--color-accent)] transition-colors cursor-pointer inline-flex items-center gap-3 group">
                         {pr.t}
                         <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-gray-500 font-light leading-relaxed">Modern çizginin doğa ile bütünleştiği benzersiz bir yapı. Geri dönüştürülmüş materyaller ve güneş enerjisi entegrasyonu.</p>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};

export const InsaatModernProcess: React.FC<SectionProps> = () => {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
       <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
             <div className="lg:col-span-1">
                <h2 className="text-4xl font-[family-name:var(--font-heading)] font-semibold mb-6">Sıfırdan Teslime</h2>
                <p className="text-gray-500 mb-8">Tasarımdan anahtar teslimine kadar tamamen entegre, şeffaf süreç yönetimi.</p>
             </div>
             <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-12">
                {[
                  { n: '01', t: 'Konsept & Planlama' },
                  { n: '02', t: '3D Simülasyon' },
                  { n: '03', t: 'Sürdürülebilir Yapım' },
                  { n: '04', t: 'İç Mimari & Teslim' }
                ].map((st, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="border-t border-[var(--color-accent)]/30 pt-6"
                   >
                      <div className="text-3xl font-[family-name:var(--font-heading)] font-light text-[var(--color-accent)] mb-4">{st.n}</div>
                      <h3 className="text-xl font-semibold mb-2">{st.t}</h3>
                      <p className="text-gray-500 text-sm">Projenin her aşamasında kalite kontrolü ve paydaş bilgilendirmesi standarttır.</p>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
};

export const InsaatModernContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-24 bg-[var(--color-text)] text-white">
       <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
             <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] font-semibold mb-6">Bir Projeniz Mi Var?</h2>
             <p className="text-gray-400 text-lg mb-12">Birlikte vizyonunuzu hayata geçirelim. Mimari ve taahhüt talepleriniz için bize ulaşın.</p>
             <a href={`mailto:${businessData?.email}`} className="bg-[var(--color-accent)] text-white px-10 py-5 font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-2 group text-lg">
                İletişime Geçin <TriangleRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
          </motion.div>
       </div>
    </section>
  );
};
