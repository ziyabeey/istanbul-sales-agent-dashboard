"use client";

import React from "react";
import Link from "next/link";
import { IconMessageCircle, IconBarChart, IconCalendar, IconTrendingUp, IconSmartphone, IconShield, IconMic, IconTarget, IconCheck, IconCloud, IconLock, IconGlobe } from "@/components/ui/Icons";

export default function ProductCardsSection() {
  return (
    <section style={{ maxWidth: "1200px", margin: "48px auto", padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      {/* Card 1: Site Oluşturucu */}
      <div className="bento-card card-sc" style={{ height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div className="card-icon ci-sc">S</div>
          <span className="card-name">Site Oluşturucu</span>
        </div>
        <h4>AI ile <em>profesyonel</em> web sitesi</h4>
        <p>2 dakikada sektörünüze özel, SEO uyumlu web sitesi oluşturun. İçerikler yapay zeka tarafından yazılır.</p>
        <Link href="/ozellikler/web-sitesi" className="btn-card primary">Keşfet</Link>

        {/* Rich browser mockup */}
        <div className="card-visual" style={{ marginTop: "auto" }}>
          <div className="mock-browser card-visual-animate" style={{ width: "95%" }}>
            <div className="mock-dots"><span /><span /><span /></div>
            {/* Site header */}
            <div className="mock-site-header">
              <span className="mock-site-logo">BERBER SULTAN</span>
              <div className="mock-site-nav">
                <span /><span /><span />
              </div>
            </div>
            {/* Site hero */}
            <div className="mock-site-hero">
              <div className="mock-site-text">
                <div className="mock-h1" /><div className="mock-h1-sub" /><div className="mock-btn" />
              </div>
              <div className="mock-site-img" />
            </div>
            {/* Site features */}
            <div className="mock-site-features">
              {[0, 1, 2].map((i) => (
                <div key={i} className="mock-site-feature">
                  <div className="feat-icon" style={{ background: ["#e8f4ff", "#fff0f0", "#f0ffe8"][i] }} />
                  <div className="feat-line" />
                  <div className="feat-line short" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: KPNK Suite */}
      <div className="bento-card card-ksuite" style={{ height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div className="card-icon ci-ks">K</div>
          <span className="card-name">KPNK Suite</span>
        </div>
        <h4>WhatsApp · CRM · <em>Randevu</em> · SEO</h4>
        <p>Gece 2&apos;de gelen müşteri mesajına anında cevap, otomatik randevu yönetimi, Google yorum takibi — hepsi tek platformda.</p>
        <Link href="/ozellikler" className="btn-card outline-light">Keşfet</Link>

        {/* Hex grid with labels */}
        <div className="card-visual" style={{ marginTop: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", width: "100%", padding: "0 20px" }}>
            {[
              { icon: <IconMessageCircle size={20} color="rgba(255,255,255,.5)" />, label: "WhatsApp" },
              { icon: <IconBarChart size={20} color="rgba(255,255,255,.5)" />, label: "CRM" },
              { icon: <IconCalendar size={20} color="rgba(255,255,255,.5)" />, label: "Randevu" },
              { icon: <IconTrendingUp size={20} color="rgba(255,255,255,.5)" />, label: "SEO" },
              { icon: <IconSmartphone size={20} color="rgba(255,255,255,.5)" />, label: "Sosyal" },
              { icon: <IconShield size={20} color="rgba(255,255,255,.5)" />, label: "KVKK" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="hex" style={{ margin: "0 auto 6px" }}>{item.icon}</div>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3: KPNK Suite Pro */}
      <div className="bento-card card-mail" style={{ height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div className="card-icon" style={{ background: "#ff4444" }}>K+</div>
          <span className="card-name">KPNK Suite Pro</span>
          <span className="card-badge" style={{ background: "rgba(255,68,68,0.15)", color: "#ff4444", border: "1px solid rgba(255,68,68,.3)" }}>YENİ</span>
        </div>
        <h4>Sesli Asistan & <em>Premium+</em> özellikler</h4>
        <p>Vapi.ai entegrasyonu ile insan sesinde otonom çağrılar, aktif A/B test optimizasyonu, gelişmiş Google & Meta Ads yönetimi.</p>
        <Link href="/fiyatlar" className="btn-card outline-dark">Planları Gör</Link>

        {/* Premium feature list with checkmarks */}
        <div style={{ marginTop: "auto" }}>
          <div className="mail-preview">
            <h5>Premium+ Özellikler</h5>
            {[
              { IconComp: IconMic, label: "Sesli Asistan — Vapi.ai", active: true },
              { IconComp: IconBarChart, label: "A/B Test — Otomatik", active: false },
              { IconComp: IconTarget, label: "Google Ads — AI", active: false },
              { IconComp: IconSmartphone, label: "Meta Ads — Premium", active: false },
            ].map((item, i) => (
              <div key={i} className="mail-item" style={{ gap: "10px" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                  background: item.active ? "linear-gradient(135deg, #ff4444, #cc2222)" : "#f2f4f6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.active ? <IconCheck size={12} color="#fff" /> : <item.IconComp size={12} color="#999" />}
                </div>
                <span style={{ fontSize: "13px", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 4: Google Cloud Partner */}
      <div className="bento-card card-cloud" style={{ height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div className="card-icon ci-cloud" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconCloud size={16} color="#fff" />
          </div>
          <span className="card-name">Google Cloud</span>
          <span className="card-badge" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}>PARTNER</span>
        </div>
        <h4>Google Cloud <em>altyapısı</em></h4>
        <p>Google Cloud altyapısında barınan verileriniz, %99.9 uptime garantisi, SSL şifreleme ve KVKK uyumlu güvenlik.</p>
        <Link href="/tedarik" className="btn-card outline-light">Keşfet</Link>

        {/* Cloud visual with shield + stats */}
        <div className="card-visual" style={{ marginTop: "auto", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(255,255,255,.1)", border: "2px solid rgba(255,255,255,.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconShield size={28} color="rgba(255,255,255,.7)" />
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>%99.9</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: "1px" }}>Uptime</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["SSL", "KVKK", "GDPR"].map((tag) => (
              <span key={tag} style={{
                padding: "4px 12px", borderRadius: "20px",
                background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)",
                fontSize: "11px", color: "rgba(255,255,255,.7)", fontWeight: 600,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
