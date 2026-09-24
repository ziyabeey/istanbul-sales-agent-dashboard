"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  Eye,
  Layers3,
  PackageSearch,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

const actionCards = [
  {
    label: "Randevu · örnek",
    tone: "warning",
    title: "15:30 randevusu iptal edildi.",
    body: "Takvimdeki iptal olayı için bir aksiyon kartı oluştu. Canlı komutlar yalnız doğrulanmış Randevu yetenekleriyle açılır.",
    primary: "Takvim etkisini gör",
    secondary: "Daha sonra",
  },
  {
    label: "Finans · demo",
    tone: "info",
    title: "₺12.450 tahsilat bekliyor.",
    body: "Üç açık adisyon ödeme bekliyor. En eski kayıt iki gün önce oluşturuldu.",
    primary: "Tahsilatları incele",
    secondary: "Kapat",
  },
  {
    label: "Stok · demo",
    tone: "critical",
    title: "3 ürün 4 gün içinde bitebilir.",
    body: "Yaklaşan randevu yoğunluğuna göre sarf stoklarında risk oluşuyor.",
    primary: "Seçenekleri gör",
    secondary: "Daha sonra",
  },
];

const platformHorizons = [
  {
    icon: CreditCard,
    title: "Finance",
    text: "Tahsilat ve nakit olaylarını doğru anda aksiyona dönüştürmek için.",
  },
  {
    icon: PackageSearch,
    title: "Stok & Tedarik",
    text: "Yaklaşan talep ile stok riskini aynı karar yüzeyinde buluşturmak için.",
  },
  {
    icon: Layers3,
    title: "Emlak & CRM",
    text: "Müşteri ihtiyacı ile portföy eşleşmesini yeni bir menüye gömmeden göstermek için.",
  },
];

function MarketingActionCard({
  label,
  tone,
  title,
  body,
  primary,
  secondary,
  compact = false,
}: {
  label: string;
  tone: "warning" | "info" | "critical";
  title: string;
  body: string;
  primary: string;
  secondary: string;
  compact?: boolean;
}) {
  const toneClass =
    tone === "critical"
      ? "bg-red-500"
      : tone === "warning"
        ? "bg-amber-500"
        : "bg-blue-500";

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,.32)] backdrop-blur-xl",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6",
      ].join(" ")}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${toneClass}`} aria-hidden="true" />
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
        <span className={`h-2 w-2 rounded-full ${toneClass}`} />
        {label}
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-[-0.025em] text-white sm:text-xl">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">{body}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="min-h-10 rounded-full bg-[#DC4620] px-4 text-xs font-bold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {primary}
        </button>
        <button
          type="button"
          className="min-h-10 rounded-full border border-white/10 px-4 text-xs font-semibold text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {secondary}
        </button>
      </div>
    </div>
  );
}

export default function KepenkExperienceLanding() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0 : 0.55 },
  };

  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#11100E]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-[#F5F2EC]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-7">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-[-0.03em]">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#DC4620] text-sm font-black text-white">K</span>
            <span>Kepenk.ai</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <a href="#urun" className="rounded-full px-4 py-2 text-sm font-semibold text-black/60 hover:bg-black/[0.04] hover:text-black">
              Ürün
            </a>
            <a href="#nasil-calisir" className="rounded-full px-4 py-2 text-sm font-semibold text-black/60 hover:bg-black/[0.04] hover:text-black">
              Nasıl çalışır
            </a>
            <a href="#bugun" className="rounded-full px-4 py-2 text-sm font-semibold text-black/60 hover:bg-black/[0.04] hover:text-black">
              Bugün
            </a>
            <a href="#guven" className="rounded-full px-4 py-2 text-sm font-semibold text-black/60 hover:bg-black/[0.04] hover:text-black">
              Güven
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/giris" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-black/60 sm:inline-flex">
              Giriş yap
            </Link>
            <Link
              href="/kayit"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#11100E] px-5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              Randevu ile başla
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[#0B0B0B] px-5 pb-20 pt-32 text-white sm:px-7 sm:pb-28 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[14%] h-80 w-80 rounded-full bg-[#DC4620]/20 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[3%] h-96 w-96 rounded-full bg-[#F3B45A]/10 blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.03fr_.97fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-white/65"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#FF7957]" />
              Kepenk işletme deneyimi
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.08 }}
              className="mt-7 max-w-4xl text-balance text-[clamp(3.7rem,8vw,7.3rem)] font-black leading-[0.87] tracking-[-0.075em]"
            >
              Bırak iş
              <br />
              sana gelsin.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.18 }}
              className="mt-8 max-w-2xl text-balance text-lg leading-8 text-white/60 sm:text-xl"
            >
              Kepenk, işletmendeki olayları izler ve yapılması gereken işi doğru anda önüne getirir.
              İlk production ürünümüz Randevu ile başlıyoruz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.28 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/kayit"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#DC4620] px-6 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Randevu ile başla
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#nasil-calisir"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-bold text-white/80 hover:bg-white/[0.05]"
              >
                Nasıl çalıştığını gör
              </a>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/45">
              <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#FF7957]" /> Ekran arama yok</span>
              <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#FF7957]" /> Gereksiz bildirim yok</span>
              <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#FF7957]" /> Gerçek işlem yine kurallı</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, y: reduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.15 }}
            className="relative mx-auto w-full max-w-[610px]"
          >
            <div className="absolute -inset-8 rounded-[44px] bg-[#DC4620]/10 blur-3xl" />
            <div className="relative rounded-[34px] border border-white/10 bg-[#131313] p-3 shadow-[0_40px_100px_rgba(0,0,0,.45)] sm:p-5">
              <div className="flex items-center justify-between px-2 pb-4 pt-1">
                <div>
                  <p className="text-xs font-bold text-white/40">Bugün</p>
                  <p className="mt-1 text-sm font-semibold text-white/80">2 iş senden karar bekliyor</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-2 text-[11px] font-semibold text-white/50">
                  <BellRing className="h-3.5 w-3.5" />
                  Sessiz mod açık
                </div>
              </div>

              <div className="space-y-3">
                <MarketingActionCard {...actionCards[0]} />
                <MarketingActionCard {...actionCards[1]} compact />
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-xs text-white/45">
                <span>1 kart sonraya bırakıldı</span>
                <span className="flex items-center gap-1 font-semibold text-white/60">
                  Sonra bak
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/10 bg-[#1B1B1B]/95 px-4 py-3 text-xs text-white/60 shadow-xl backdrop-blur md:flex md:items-center md:gap-3">
              <ShieldCheck className="h-5 w-5 text-[#FF7957]" />
              Kart karar yüzeyi. İşlem authority değildir.
            </div>
          </motion.div>
        </div>
      </section>

      <section id="urun" className="px-5 py-20 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#DC4620]">Ürün fikri</p>
            <h2 className="mt-5 text-balance text-4xl font-black tracking-[-0.055em] sm:text-6xl">
              Rakipler sana daha büyük dashboard verir.
              <span className="text-black/35"> Kepenk dashboard’a daha az ihtiyaç bırakır.</span>
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <motion.div {...reveal} className="rounded-[30px] border border-black/[0.08] bg-white p-7 sm:p-9">
              <div className="flex items-center gap-2 text-sm font-bold text-black/45">
                <X className="h-4 w-4" />
                Klasik SaaS
              </div>
              <div className="mt-8 space-y-4 text-lg font-bold tracking-[-0.02em] text-black/35">
                <p>Menüyü aç</p>
                <p>Doğru modülü bul</p>
                <p>Filtreyi ayarla</p>
                <p>Veriyi yorumla</p>
                <p>Sonra ne yapacağına karar ver</p>
              </div>
            </motion.div>

            <motion.div {...reveal} className="rounded-[30px] bg-[#11100E] p-7 text-white sm:p-9">
              <div className="flex items-center gap-2 text-sm font-bold text-white/55">
                <Sparkles className="h-4 w-4 text-[#FF7957]" />
                Kepenk
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FF7957]">Olay</p>
                  <p className="mt-2 text-xl font-bold">15:30 randevusu iptal edildi.</p>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-white/55">
                  <ChevronRight className="h-4 w-4" />
                  <span>Kepenk yalnız gereken aksiyonu getirir.</span>
                </div>
                <div className="inline-flex rounded-full bg-[#DC4620] px-5 py-3 text-sm font-bold">
                  Boşluğu doldur
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="nasil-calisir" className="bg-white px-5 py-20 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#DC4620]">Nasıl çalışır</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.055em] sm:text-6xl">İşletmenin nabzını menüler değil, olaylar tutar.</h2>
          </motion.div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[30px] border border-black/[0.08] bg-black/[0.08] md:grid-cols-4">
            {[
              { icon: Eye, n: "01", title: "Olay", text: "Randevu, ödeme, müşteri veya stok tarafında gerçek bir değişiklik olur." },
              { icon: Workflow, n: "02", title: "Yorumla", text: "Kepenk bağlamı toplar. AI kullanılabilir, fakat gerçek verinin sahibi olmaz." },
              { icon: BellRing, n: "03", title: "Getir", text: "Attention Engine yalnız gerçekten değerli işi Action Card olarak öne çıkarır." },
              { icon: Check, n: "04", title: "Sonuç", text: "Sen karar verirsin. Gerçek komut kendi domain kurallarıyla yeniden doğrulanır." },
            ].map(({ icon: Icon, n, title, text }) => (
              <motion.div key={n} {...reveal} className="bg-[#F9F7F2] p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-[#DC4620]" />
                  <span className="text-xs font-black text-black/25">{n}</span>
                </div>
                <h3 className="mt-10 text-2xl font-black tracking-[-0.035em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/50">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="bugun" className="px-5 py-20 sm:px-7 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
            <motion.div {...reveal} className="rounded-[34px] bg-[#DC4620] p-8 text-white sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-bold">
                <CalendarDays className="h-4 w-4" />
                Bugün
              </div>
              <h2 className="mt-8 text-4xl font-black tracking-[-0.055em] sm:text-5xl">İlk production ürünümüz Randevu.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
                Gerçek müşteri randevusu, işletme takvimi ve günlük operasyon akışı Kepenk’in ilk ciddi dikeyi.
                Platform deneyimini önce burada kanıtlıyoruz.
              </p>
              <Link href="/kayit" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-black text-[#B43A18]">
                Randevu ile başla
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div {...reveal} className="rounded-[34px] border border-black/[0.08] bg-white p-8 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-black/35">Platform ufku · demo</p>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.045em]">Aynı deneyim, farklı iş dilleri.</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {platformHorizons.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl bg-[#F5F2EC] p-5">
                    <Icon className="h-5 w-5 text-[#DC4620]" />
                    <h4 className="mt-5 font-black">{title}</h4>
                    <p className="mt-2 text-xs leading-5 text-black/50">{text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-5 text-black/40">
                Bu örnekler ürün yönünü gösterir. Canlı özellik sözü değildir.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="guven" className="bg-[#11100E] px-5 py-20 text-white sm:px-7 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <motion.div {...reveal}>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF7957]">Güven sınırı</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.055em] sm:text-6xl">
                AI görebilir.
                <br />
                Kurallar karar verir.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
                Kepenk’te öneri, gerçek ve işlem birbirine karışmaz. Fiyat, slot, ödeme, tenant ve yetki gibi gerçekler
                kendi deterministik sistemlerinde kalır.
              </p>
            </motion.div>

            <motion.div {...reveal} className="grid gap-3">
              {[
                ["FACT", "Gerçek veri kendi domain sahibinden gelir."],
                ["DECISION", "Policy hangi aksiyonun güvenli olduğunu sınırlar."],
                ["ACTION", "Komut çalışmadan önce yetki ve güncellik yeniden doğrulanır."],
              ].map(([label, text]) => (
                <div key={label} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <span className="grid h-9 min-w-9 place-items-center rounded-xl bg-[#DC4620]/15 text-[10px] font-black text-[#FF7957]">
                    {label.slice(0, 2)}
                  </span>
                  <div>
                    <p className="text-xs font-black tracking-[0.12em] text-white/40">{label}</p>
                    <p className="mt-1.5 text-sm leading-6 text-white/70">{text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-7 sm:py-28">
        <motion.div
          {...reveal}
          className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#F0E7DB] px-7 py-12 sm:px-12 sm:py-16"
        >
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#DC4620]">Kepenk.ai</p>
              <h2 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.055em] sm:text-6xl">
                İşletmeyi yönetmek için bütün gün yazılım kullanmamalısın.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-black/50">
                Randevu ile başlayıp işletmenin işlerini sana getiren ortak bir Kepenk deneyimi kuruyoruz.
              </p>
            </div>
            <Link
              href="/kayit"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#11100E] px-6 text-sm font-black text-white"
            >
              Randevu ile başla
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-black/[0.07] px-5 py-8 sm:px-7">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-black/40 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-bold text-black/65">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#DC4620] text-[10px] text-white">K</span>
            Kepenk.ai
          </div>
          <p>© 2026 yzt.digital · Türkiye</p>
          <div className="flex gap-4">
            <Link href="/gizlilik">Gizlilik</Link>
            <Link href="/kullanim-kosullari">Kullanım koşulları</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
