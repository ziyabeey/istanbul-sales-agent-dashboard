'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const sorular = [
    {
        q: 'Internet bilgim yoksa da kullanabilir miyim?',
        a: 'Evet! kepenk.ai, dijitali hiç bilmeyenlere özel tasarlandı. Sadece WhatsApp\'ı kullanabiliyorsanız yeterli. Kurulumu biz yapıyoruz, siz sadece işinize bakıyorsunuz.',
    },
    {
        q: 'Sözleşme süresi ne kadar? İstediğimde çıkabilir miyim?',
        a: 'Yıllık abonelik sistemi çalışıyoruz — bu sayede paket fiyatları çok daha uygun. Ancak deneyimlemek için ilk ay içinde memnun kalmazsanız ücret iadesi yapıyoruz.',
    },
    {
        q: 'WhatsApp botunu kendim mi kuracağım?',
        a: 'Hayır, hiçbir şeyi siz yapmıyorsunuz. Numaranızı bize veriyorsunuz, biz 24 saat içinde aktif ediyor ve test ediyoruz. Siz sadece telefona bakıyorsunuz.',
    },
    {
        q: 'Web sitem olacak — ama benim içeriklerimi kim yazacak?',
        a: 'Yapay zekamız sektörünüze özel içerik üretiyor. Kurulum formunda verdiğiniz bilgilerle dükkanınızın web sitesini biz dolduruyoruz. Siz sadece onaylıyorsunuz.',
    },
    {
        q: 'Google\'da çıkmaya ne zaman başlarım?',
        a: 'Google My Business profiliniz varsa bağlıyoruz, yoksa oluşturuyoruz. Google\'un dizin süreleri nedeniyle ilk sonuçlar genellikle 2-4 hafta içinde görünmeye başlar.',
    },
    {
        q: 'Rakibim de kepenk.ai kullanabilir mi?',
        a: 'Evet, sistem herkese açık. Ama zaten erken kayıt avantajı şu: aynı mahalledeki iki kuyumcu varsa kim önce dijitale geçerse o kazanır. Karar sizin! 😉',
    },
    {
        q: 'Aylık içerik sınırı aşılırsa ne olur?',
        a: 'Hiçbir şey kesilmez, sistem çalışmaya devam eder. Aylık limit dolduğunda sizi bilgilendiriyoruz ve istediyseniz üst pakete geçebilirsiniz.',
    },
]

export default function SSSSection() {
    const [acik, setAcik] = useState<number | null>(null)

    return (
        <section className="py-24 relative" id="sss">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="text-rust font-mono text-sm uppercase tracking-[0.3em] mb-3">Merak edilenler</p>
                    <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-foreground">
                        Sık Sorulan <span className="text-rust">Sorular</span>
                    </h2>
                </motion.div>

                <div className="space-y-3">
                    {sorular.map((soru, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${acik === i ? 'border-rust/50 bg-card' : 'border-border/20 bg-card/50 hover:border-border/40'
                                }`}
                        >
                            <button
                                onClick={() => setAcik(acik === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left gap-4"
                            >
                                <span className={`font-syne font-semibold text-base ${acik === i ? 'text-foreground' : 'text-foreground/80'}`}>
                                    {soru.q}
                                </span>
                                <span
                                    className={`text-rust text-xl flex-shrink-0 transition-transform duration-200 ${acik === i ? 'rotate-45' : ''}`}
                                >
                                    +
                                </span>
                            </button>

                            <AnimatePresence>
                                {acik === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="px-5 pb-5 text-muted-foreground font-lora leading-relaxed text-sm">
                                            {soru.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-muted-foreground text-sm mb-4">Başka sorunuz mu var?</p>
                    <a
                        href="https://wa.me/905XXXXXXXXX?text=kepenk.ai%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-sage/20 border border-sage text-sage px-6 py-3 rounded-xl font-syne font-bold hover:bg-sage/30 transition-colors"
                    >
                        💬 WhatsApp&apos;tan Sorun
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
