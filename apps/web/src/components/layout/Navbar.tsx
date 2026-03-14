"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ─────────────── Menü Verileri ─────────────── */

interface NavItem {
  label: string;
  href: string;
  desc?: string;
  icon?: string;
  badge?: string;
}

interface NavGroup {
  id: string;
  label: string;
  sections: { title?: string; items: NavItem[] }[];
  footer?: { label: string; href: string };
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: "platform",
    label: "Platform",
    sections: [
      {
        title: "Nasıl Çalışır?",
        items: [
          { label: "Nasıl Çalışır?", href: "/nasil-calisir", icon: "🚀", desc: "3 adımda dijital dönüşüm" },
        ],
      },
      {
        title: "Özellikler",
        items: [
          { label: "AI Asistan", href: "/ozellikler/yapay-zeka-asistani", icon: "🤖", desc: "7/24 otonom yardımcı" },
          { label: "WhatsApp Botu", href: "/ozellikler/whatsapp", icon: "📱", desc: "Randevu & bildirim" },
          { label: "Web Sitesi", href: "/ozellikler/web-sitesi", icon: "🌐", desc: "AI ile üretilmiş site" },
          { label: "Raporlar", href: "/ozellikler/raporlar", icon: "📊", desc: "Haftalık analitik" },
          { label: "Sosyal Medya", href: "/ozellikler/sosyal-medya-ve-reklam", icon: "📢", desc: "Otomatik içerik" },
          { label: "Sesli Asistan", href: "/ozellikler/sesli", icon: "📞", desc: "Vapi.ai entegrasyonu", badge: "Premium+" },
          { label: "Restoran İşletim", href: "/ozellikler/restoran-isletim-sistemi", icon: "🍽️", desc: "QR sipariş → KPI radarı", badge: "Premium+" },
          { label: "Emlak Yönetim", href: "/ozellikler/emlak-yonetim-sistemi", icon: "🏠", desc: "Portföy → Sahibinden sync", badge: "Premium+" },
        ],
      },
      {
        items: [
          { label: "Güvenlik & KVKK", href: "/kvkk", icon: "🛡️", desc: "KVKK uyumlu altyapı" },
        ],
      },
    ],
    footer: { label: "Tüm Özellikleri Gör →", href: "/ozellikler" },
  },
  {
    id: "sektorler",
    label: "Sektörler",
    sections: [
      {
        title: "Yeme & İçme",
        items: [
          { label: "Restoran · Kafe · Fırın", href: "/sektorler/restoran", icon: "🍽️", desc: "QR sipariş, KDS, garson POS" },
        ],
      },
      {
        title: "Güzellik & Bakım",
        items: [
          { label: "Berber · Kuaför · Estetik", href: "/sektorler/berber", icon: "✂️" },
        ],
      },
      {
        title: "Sağlık",
        items: [
          { label: "Diş · Klinik · Fizyoterapi", href: "/sektorler/dis-hekimi", icon: "🏥" },
        ],
      },
      {
        title: "Profesyonel",
        items: [
          { label: "Hukuk · Muhasebe · Mimarlık", href: "/sektorler/avukat", icon: "⚖️" },
        ],
      },
      {
        title: "Spor & Yaşam",
        items: [
          { label: "Gym · Yoga · Veteriner", href: "/sektorler/veteriner", icon: "💪" },
        ],
      },
    ],
    footer: { label: "34 Sektörün Tümünü Gör →", href: "/sektorler" },
  },
  {
    id: "demo",
    label: "Demo",
    sections: [
      {
        items: [
          { label: "Tüm Demolar", href: "/demolar/vitrin", icon: "📄", desc: "34 sektör demo galerisi" },
        ],
      },
      {
        title: "Öne Çıkanlar",
        items: [
          { label: "Restoran Demo", href: "/demolar/vitrin?s=restoran", icon: "🍽️" },
          { label: "Berber Demo", href: "/demolar/vitrin?s=berber", icon: "💈" },
          { label: "Gym Demo", href: "/demolar/vitrin?s=spor", icon: "💪" },
        ],
      },
    ],
  },
  {
    id: "hakkimizda",
    label: "Hakkımızda",
    sections: [
      {
        items: [
          { label: "Biz Kimiz?", href: "/hakkimizda", icon: "👥", desc: "yzt.digital ekibi" },
          { label: "Blog", href: "/blog", icon: "📝", desc: "Dijital esnaf rehberi" },
          { label: "İletişim", href: "/iletisim", icon: "📬", desc: "Bize ulaşın" },
          { label: "Kariyer", href: "/kariyer", icon: "🚀", desc: "Ekibimize katıl" },
        ],
      },
    ],
  },
];

/* ─────────────── Dropdown Animasyonu ─────────────── */

const dropdownVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/* ─────────────── Ana Bileşen ─────────────── */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = useCallback((id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  }, []);

  const navLinkClass =
    "text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors duration-150 flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust";

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-ink/50"
          : "bg-background/75 backdrop-blur-md border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <span className="font-syne font-extrabold text-xl tracking-tight">
              <span className="text-rust">K</span>
              <span className="text-foreground group-hover:text-foreground/80 transition-colors">EPENK</span>
            </span>
            <span className="hidden sm:inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold bg-rust/20 text-rust border border-rust/30">
              AI
            </span>
          </Link>

          {/* Desktop—Group Dropdowns */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_GROUPS.map((group) => (
              <div key={group.id} className="relative">
                <button
                  className={`${navLinkClass} ${openDropdown === group.id ? "bg-white/5 text-foreground" : ""}`}
                  onClick={() => toggleDropdown(group.id)}
                >
                  {group.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === group.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === group.id && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-background border border-white/10 rounded-2xl shadow-2xl shadow-ink/80 p-4"
                    >
                      {group.sections.map((section, si) => (
                        <div key={si}>
                          {si > 0 && <div className="border-t border-white/8 my-2" />}
                          {section.title && (
                            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/25 px-3 py-1.5">
                              {section.title}
                            </p>
                          )}
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item"
                            >
                              {item.icon && <span className="text-base mt-0.5 shrink-0">{item.icon}</span>}
                              <div className="flex-1 min-w-0">
                                <span className="text-foreground text-sm font-semibold group-hover/item:text-rust transition-colors flex items-center gap-2">
                                  {item.label}
                                  {item.badge && (
                                    <span className="text-[9px] font-bold text-purple-400 bg-purple-500/15 border border-purple-500/25 rounded-full px-1.5 py-0.5">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                                {item.desc && (
                                  <span className="text-white/35 text-xs mt-0.5 block">{item.desc}</span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}

                      {group.footer && (
                        <div className="border-t border-white/8 mt-2 pt-2">
                          <Link
                            href={group.footer.href}
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-rust" />
                            <span className="text-rust text-sm font-semibold">{group.footer.label}</span>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link href="/fiyatlar" className={navLinkClass}>
              Fiyatlar
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/giris" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              Giriş Yap
            </Link>
            <Link href="/onboarding" passHref legacyBehavior>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="primary" size="sm">
                  Başlayın →
                </Button>
              </motion.a>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground/70 hover:text-foreground p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rust"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — Full-width bottom-up */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 md:hidden"
              style={{ top: "60px" }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full left-0 w-full bg-background border-t border-white/10 shadow-2xl z-50 md:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-2">
                {NAV_GROUPS.map((group) => (
                  <MobileNavGroup
                    key={group.id}
                    group={group}
                    onClose={() => setIsMobileMenuOpen(false)}
                  />
                ))}

                <Link
                  href="/fiyatlar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex px-3 py-2.5 rounded-xl text-foreground/70 hover:text-foreground hover:bg-white/5 transition-colors text-sm font-semibold"
                >
                  Fiyatlar
                </Link>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-3 px-1">
                  <Link
                    href="/giris"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-foreground/70 hover:text-foreground text-sm font-medium rounded-xl hover:bg-white/5 transition-colors"
                  >
                    Giriş Yap
                  </Link>
                  <Link href="/onboarding" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" size="lg" className="w-full">
                      Başlayın →
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─────────────── Mobil Accordion ─────────────── */

function MobileNavGroup({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 pb-1">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors text-sm font-semibold"
      >
        {group.label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-2 pb-2 space-y-0.5">
              {group.sections.map((section, si) => (
                <div key={si}>
                  {section.title && (
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 px-3 py-1.5 mt-1">
                      {section.title}
                    </p>
                  )}
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground/60 hover:text-foreground hover:bg-white/5 transition-colors text-sm"
                    >
                      {item.icon && <span className="text-sm">{item.icon}</span>}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold text-purple-400 bg-purple-500/15 border border-purple-500/25 rounded-full px-1.5 py-0.5">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
              {group.footer && (
                <Link
                  href={group.footer.href}
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-rust hover:bg-white/5 transition-colors text-sm font-semibold"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  {group.footer.label}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
