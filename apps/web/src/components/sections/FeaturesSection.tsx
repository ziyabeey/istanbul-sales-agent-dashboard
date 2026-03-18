"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  BrainCircuit,
  CalendarHeart,
  Share2,
  Award,
  Zap,
  MessageSquare,
  Star,
  Globe,
} from "lucide-react";
import StickyReveal from "@/components/ui/StickyReveal";

const features = [
  {
    icon: <MessageSquare className="w-8 h-8 text-green-600" />,
    title: "WhatsApp AI Asistanı",
    description:
      "Gece 2'de gelen müşteri mesajına anında cevap verir. Fiyat sorar? PDF gönderir. Randevu ister? Takvime ekler. Siz uyurken bile çalışır.",
    accent: "#22C55E",
    visual: (
      <div className="w-full max-w-[360px] bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-foreground font-semibold text-sm">WhatsApp Business</p>
            <p className="text-green-600 text-xs">Aktif · 24/7</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
            <p className="text-foreground/80 text-sm">Merhaba, fiyat listesi alabilir miyim?</p>
          </div>
          <div className="bg-green-50 rounded-2xl rounded-tr-sm p-3 max-w-[85%] ml-auto border border-green-100">
            <p className="text-foreground/80 text-sm">
              Tabii ki! İşte güncel fiyat listemiz 📋 Ayrıca randevu almak ister misiniz?
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-[60%]">
            <p className="text-foreground/80 text-sm">Evet, yarın 15:00 uygun mu?</p>
          </div>
          <div className="bg-green-50 rounded-2xl rounded-tr-sm p-3 max-w-[80%] ml-auto border border-green-100">
            <p className="text-foreground/80 text-sm">
              ✅ Yarın 15:00 için randevunuz oluşturuldu! Hatırlatma göndereceğim.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    title: "AI Web Sitesi Oluşturucu",
    description:
      "2 dakikada profesyonel web sitesi. Sektörünüze özel içerikler AI tarafından yazılır. SEO ayarları otomatik yapılır. Domain bağlanır ve yayınlanır.",
    accent: "#3B82F6",
    visual: (
      <div className="w-full max-w-[360px] bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
          </div>
          <div className="flex-1 bg-gray-100 rounded-md h-4 flex items-center px-2">
            <span className="text-[10px] text-muted-foreground">berber-sultan.kepenk.site</span>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="h-24 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center">
            <p className="text-foreground/70 text-sm font-semibold">✂️ Sultan Berber</p>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded-full w-3/4" />
            <div className="h-3 bg-gray-100 rounded-full w-1/2" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Hizmetler", "Fiyat", "İletişim"].map((t) => (
              <div
                key={t}
                className="h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center"
              >
                <span className="text-[10px] text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Star className="w-8 h-8 text-amber-500" />,
    title: "Google Yorum & SEO Yönetimi",
    description:
      "Google My Business profilinizi canlı tutar. Kötü yorumlara profesyonel yanıt tasarlar. İyi yorumlara teşekkür eder. Puanınızı yükseltir.",
    accent: "#EAB308",
    visual: (
      <div className="w-full max-w-[360px] bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-foreground font-semibold text-sm">Google Reviews</p>
            <p className="text-amber-600 text-xs font-bold">⬆ 2.1 → 4.8 puan</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-foreground/70 text-xs">&ldquo;Harika hizmet, çok memnun kaldım!&rdquo;</p>
            <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg p-2">
              <p className="text-amber-700 text-[10px] mb-0.5">🤖 AI Yanıtı:</p>
              <p className="text-foreground/80 text-xs">
                Teşekkür ederiz! Memnuniyetiniz bizim için çok değerli 🙏
              </p>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
            <div className="flex items-center gap-1 mb-1">
              {[1, 2].map((s) => (
                <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
              {[3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 text-gray-200" />
              ))}
            </div>
            <p className="text-foreground/70 text-xs">&ldquo;Çok bekledik, pek memnun değiliz.&rdquo;</p>
            <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg p-2">
              <p className="text-amber-700 text-[10px] mb-0.5">🤖 AI Yanıtı:</p>
              <p className="text-foreground/80 text-xs">
                Geri bildiriminiz için teşekkür ederiz. Bekleme süresini iyileştirmek için çalışıyoruz...
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <CalendarHeart className="w-8 h-8 text-pink-500" />,
    title: "Akıllı Randevu & CRM",
    description:
      "Müşterilerinizin doğum günlerini hatırlar. Otomatik kampanya mesajları gönderir. Randevu alır, hatırlatır, günceller.",
    accent: "#EC4899",
    visual: (
      <div className="w-full max-w-[360px] bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
            <CalendarHeart className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <p className="text-foreground font-semibold text-sm">Akıllı Takvim</p>
            <p className="text-pink-500 text-xs">Bu hafta 12 randevu</p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { time: "09:00", name: "Ahmet K.", service: "Saç Kesimi", status: "✅" },
            { time: "10:30", name: "Fatma Ş.", service: "Saç Boyama", status: "⏳" },
            { time: "14:00", name: "Ayşe Y.", service: "Manikür", status: "🔔" },
            { time: "16:00", name: "Mehmet Y.", service: "Sakal Trim", status: "📅" },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3"
            >
              <span className="text-xs font-mono text-pink-500 w-10">{r.time}</span>
              <div className="flex-1">
                <p className="text-foreground/80 text-xs font-medium">{r.name}</p>
                <p className="text-muted-foreground text-[10px]">{r.service}</p>
              </div>
              <span className="text-sm">{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: <Coffee className="w-8 h-8 text-primary" />,
    title: "Günlük Motivasyon & İş Asistanı",
    description:
      "Her sabah 08:00'de 'Günaydın' mesajıyla güne başlar. Sektöre ve hava durumuna göre günlük iş tavsiyeleri verir. Moral bozmayan, iş bitiren asistan.",
    accent: "#4F46E5",
    visual: (
      <div className="w-full max-w-[360px] bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-muted-foreground text-xs mb-1">☀️ Günaydın Raporu · 08:00</p>
          <p className="text-foreground font-semibold text-sm">Bugün harika bir gün olacak!</p>
        </div>
        <div className="space-y-3">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
            <p className="text-primary text-xs font-bold mb-1">🌡️ Hava Durumu Tavsiyesi</p>
            <p className="text-foreground/70 text-xs">
              Bugün 28°C — soğuk içecek kampanyası açmak için ideal!
            </p>
          </div>
          <div className="bg-violet-50 border border-violet-100 rounded-xl p-3">
            <p className="text-violet-600 text-xs font-bold mb-1">📊 Dünün Özeti</p>
            <p className="text-foreground/70 text-xs">
              8 müşteri yanıtlandı · 3 randevu alındı · 2 yorum cevaplanlandı
            </p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-3">
            <p className="text-green-600 text-xs font-bold mb-1">💡 Bugünün İpucu</p>
            <p className="text-foreground/70 text-xs">
              Sosyal medyada &ldquo;Cuma İndirimi&rdquo; kampanyası %40 daha fazla etkileşim alıyor!
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-gray-50 overflow-hidden" id="features">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-ai/5 rounded-full blur-[150px]" />
      </div>

      {/* Section header */}
      <div className="relative z-10 pt-24 pb-12 text-center max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6"
        >
          <Zap className="w-4 h-4" />
          Arka Planda 17 AI Ajanı
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground font-syne tracking-tight mb-4"
        >
          Tek Platform,{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            Sonsuz Yetenek
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          Siz dükkanda müşterinize hizmet verirken, aralarında sosyal medya uzmanı, müşteri
          temsilcisi ve pazarlamacının bulunduğu koca bir ekip sizin için çalışır.
        </motion.p>
      </div>

      {/* StickyReveal showcase */}
      <StickyReveal items={features} />

      {/* Top transition line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gray-50" />
    </section>
  );
}
