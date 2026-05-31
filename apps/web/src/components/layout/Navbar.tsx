"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, ChevronRight,
  Rocket, Bot, MessageCircle, Globe, BarChart3,
  Megaphone, Phone, UtensilsCrossed, Home,
  Shield, Scissors, Stethoscope, Scale,
  Dumbbell, FileText, Users, Pen, Mail, 
  Sparkles, type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";

/* ─────────────── İkon Eşleme ─────────────── */

const ICON_MAP: Record<string, LucideIcon> = {
  rocket: Rocket,
  bot: Bot,
  message: MessageCircle,
  globe: Globe,
  chart: BarChart3,
  megaphone: Megaphone,
  phone: Phone,
  utensils: UtensilsCrossed,
  home: Home,
  shield: Shield,
  scissors: Scissors,
  stethoscope: Stethoscope,
  scale: Scale,
  dumbbell: Dumbbell,
  file: FileText,
  users: Users,
  pen: Pen,
  mail: Mail,
  sparkles: Sparkles,
};

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
          { label: "Nasıl Çalışır?", href: "/nasil-calisir", icon: "rocket", desc: "3 adımda dijital dönüşüm" },
        ],
      },
      {
        title: "Özellikler",
        items: [
          { label: "AI Asistan", href: "/ozellikler/yapay-zeka-asistani", icon: "bot", desc: "7/24 otonom yardımcı" },
          { label: "WhatsApp Botu", href: "/ozellikler/whatsapp", icon: "message", desc: "Randevu & bildirim" },
          { label: "Web Sitesi", href: "/ozellikler/web-sitesi", icon: "globe", desc: "AI ile üretilmiş site" },
          { label: "Raporlar", href: "/ozellikler/raporlar", icon: "chart", desc: "Haftalık analitik" },
          { label: "Sosyal Medya", href: "/ozellikler/sosyal-medya-ve-reklam", icon: "megaphone", desc: "Otomatik içerik" },
          { label: "Sesli Asistan", href: "/ozellikler/sesli", icon: "phone", desc: "Vapi.ai entegrasyonu", badge: "Premium+" },
          { label: "Restoran İşletim", href: "/ozellikler/restoran-isletim-sistemi", icon: "utensils", desc: "QR sipariş → KPI radarı", badge: "Premium+" },
          { label: "Emlak Yönetim", href: "/ozellikler/emlak-yonetim-sistemi", icon: "home", desc: "Portföy → Sahibinden sync", badge: "Premium+" },
        ],
      },
      {
        items: [
          { label: "Güvenlik & KVKK", href: "/kvkk", icon: "shield", desc: "KVKK uyumlu altyapı" },
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
          { label: "Restoran · Kafe · Fırın", href: "/sektorler/restoran", icon: "utensils", desc: "QR sipariş, KDS, garson POS" },
        ],
      },
      {
        title: "Güzellik & Bakım",
        items: [
          { label: "Berber · Kuaför · Estetik", href: "/sektorler/berber", icon: "scissors" },
        ],
      },
      {
        title: "Sağlık",
        items: [
          { label: "Diş · Klinik · Fizyoterapi", href: "/sektorler/dis-hekimi", icon: "stethoscope" },
        ],
      },
      {
        title: "Profesyonel",
        items: [
          { label: "Hukuk · Muhasebe · Mimarlık", href: "/sektorler/avukat", icon: "scale" },
        ],
      },
      {
        title: "Spor & Yaşam",
        items: [
          { label: "Gym · Yoga · Veteriner", href: "/sektorler/veteriner", icon: "dumbbell" },
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
          { label: "Tüm Demolar", href: "/demolar/vitrin", icon: "file", desc: "200+ profesyonel demo" },
        ],
      },
      {
        title: "Öne Çıkanlar",
        items: [
          { label: "Restoran Demo", href: "/demolar/vitrin?s=restoran", icon: "utensils" },
          { label: "Berber Demo", href: "/demolar/vitrin?s=berber", icon: "scissors" },
          { label: "Gym Demo", href: "/demolar/vitrin?s=spor", icon: "dumbbell" },
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
          { label: "Biz Kimiz?", href: "/hakkimizda", icon: "users", desc: "yzt.digital ekibi" },
          { label: "Blog", href: "/blog", icon: "pen", desc: "Dijital esnaf rehberi" },
          { label: "İletişim", href: "/iletisim", icon: "mail", desc: "Bize ulaşın" },
          { label: "Kariyer", href: "/kariyer", icon: "rocket", desc: "Ekibimize katıl" },
        ],
      },
    ],
  },
];

/* ─────────────── İkon Render ─────────────── */

function NavIcon({ name, className = "w-4 h-4" }: { name?: string; className?: string }) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}

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

  // Escape tuşuyla dropdown ve mobil menüyü kapat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openDropdown) setOpenDropdown(null);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown, isMobileMenuOpen]);

  const toggleDropdown = useCallback((id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  }, []);

  const navLinkClass =
    "text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors duration-150 flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <nav
      ref={navRef}
      aria-label="Ana navigasyon"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border py-3 shadow-sm"
          : "bg-background/80 backdrop-blur-md border-b border-border/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <span className="font-syne font-extrabold text-xl tracking-tight text-primary group-hover:text-primary/80 transition-colors">
              KPNK
            </span>
          </Link>

          {/* Desktop—Group Dropdowns */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_GROUPS.map((group) => (
              <div key={group.id} className="relative">
                <button
                  className={`${navLinkClass} ${openDropdown === group.id ? "bg-foreground/5 text-foreground" : ""}`}
                  onClick={() => toggleDropdown(group.id)}
                  aria-expanded={openDropdown === group.id}
                  aria-haspopup="true"
                  aria-controls={`nav-dropdown-${group.id}`}
                >
                  {group.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === group.id ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
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
                      id={`nav-dropdown-${group.id}`}
                      role="menu"
                      aria-label={`${group.label} menüsü`}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-card border border-border rounded-2xl shadow-xl p-4"
                    >
                      {group.sections.map((section, si) => (
                        <div key={si}>
                          {si > 0 && <div className="border-t border-border/50 my-2" />}
                          {section.title && (
                            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground px-3 py-1.5">
                              {section.title}
                            </p>
                          )}
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors group/item"
                            >
                              {item.icon && (
                                <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                  <NavIcon name={item.icon} className="w-4 h-4" />
                                </span>
                              )}
                              <div className="flex-1 min-w-0">
                                <span className="text-foreground text-sm font-semibold group-hover/item:text-primary transition-colors flex items-center gap-2">
                                  {item.label}
                                  {item.badge && (
                                    <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/25 rounded-full px-1.5 py-0.5">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                                {item.desc && (
                                  <span className="text-muted-foreground text-xs mt-0.5 block">{item.desc}</span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}

                      {group.footer && (
                        <div className="border-t border-border/50 mt-2 pt-2">
                          <Link
                            href={group.footer.href}
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-primary" />
                            <span className="text-primary text-sm font-semibold">{group.footer.label}</span>
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
            <Link href="/giris" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Giriş Yap
            </Link>
            <Link href="/kayit" passHref legacyBehavior>
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
            className="md:hidden text-foreground/70 hover:text-foreground p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
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
              className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40 md:hidden"
              style={{ top: "60px" }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full left-0 w-full bg-card border-t border-border shadow-xl z-50 md:hidden max-h-[80vh] overflow-y-auto"
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
                  className="flex px-3 py-2.5 rounded-xl text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors text-sm font-semibold"
                >
                  Fiyatlar
                </Link>

                <div className="pt-4 border-t border-border flex flex-col gap-3 px-1">
                  <Link
                    href="/giris"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-foreground/80 hover:text-foreground text-sm font-medium rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    Giriş Yap
                  </Link>
                  <Link href="/kayit" onClick={() => setIsMobileMenuOpen(false)}>
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
    <div className="border-b border-border/30 pb-1">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors text-sm font-semibold"
        aria-expanded={open}
      >
        {group.label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
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
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 py-1.5 mt-1">
                      {section.title}
                    </p>
                  )}
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors text-sm"
                    >
                      {item.icon && (
                        <span className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <NavIcon name={item.icon} className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/25 rounded-full px-1.5 py-0.5">
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
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-primary hover:bg-muted/50 transition-colors text-sm font-semibold"
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
