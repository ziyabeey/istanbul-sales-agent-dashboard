"use client";

import React, { useState } from "react";
import { IconCheckCircle } from "@/components/ui/Icons";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section style={{ background: "#2b2d33", padding: "60px 24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: "40px",
        flexWrap: "wrap",
      }}>
        <div>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
            Dijital esnaf <em style={{ fontStyle: "italic", textDecoration: "underline", textDecorationColor: "#0098ff", textUnderlineOffset: "4px" }}>ipuçları</em> alın
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", marginTop: "12px", maxWidth: "400px" }}>
            Her ay, sektörünüze özel dijital pazarlama ipuçları ve KPNK güncellemelerini e-posta kutunuza gönderiyoruz.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{
            display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: "50px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)"
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              style={{
                background: "transparent", border: "none", padding: "14px 20px",
                color: "#fff", fontSize: "14px", outline: "none", width: "280px",
              }}
            />
            <button type="submit" style={{
              background: "#0098ff", color: "#fff", border: "none", padding: "14px 32px",
              fontSize: "15px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "0.3s ease",
            }}>
              Abone Ol
            </button>
          </form>
        ) : (
          <div style={{
            background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)",
            borderRadius: "8px", padding: "14px 24px", color: "#22c55e", fontSize: "14px", fontWeight: 500,
          }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><IconCheckCircle size={16} color="#22c55e" /> Teşekkürler! Başarıyla kaydoldunuz.</span>
          </div>
        )}
      </div>
    </section>
  );
}
