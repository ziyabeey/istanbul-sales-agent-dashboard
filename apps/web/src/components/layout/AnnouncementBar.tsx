"use client";

import React, { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 24px",
        background: "#fff",
        borderBottom: "1px solid #eee",
        fontSize: "14px",
        position: "relative",
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #a8d8ff, #0098ff)",
          }}
        />
        <span>
          <strong>KPNK AI</strong> — Türkiye&apos;nin esnaf yapay zekası artık aktif!
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a
          href="/onboarding"
          style={{
            padding: "8px 20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "0.3s ease",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Hemen Dene
        </a>
        <button
          onClick={() => setVisible(false)}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#999",
            marginLeft: "16px",
          }}
          aria-label="Kapat"
        >
          ×
        </button>
      </div>
    </div>
  );
}
