"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Store, MessageCircle, Link as LinkIcon, Award, ArrowRight, ArrowLeft, Camera, Palette, LayoutGrid, Lock, Search, ClipboardList } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { isletmeAdiToSlug } from '@/utils/slugUtils'
import { PAKET_FIYATLARI } from '@/types'
import RenkPaletiSecici from "./RenkPaletiSecici";
import { sektorPaletOner } from "@/data/renkPaletleri";
import { TEMALAR, temaMinPaketKontrol } from "@/data/temalar";
import { esnafModulleri, MODULLER, modulKullanilabilir } from '@/data/moduller';
import type { Modul } from '@/data/moduller';
import { SEKTORLER as SEKTOR_LISTESI, SEKTOR_KATEGORILERI } from '@/data/sektorler';

/* ─── Sektörel Onboarding Soruları ──────────────────────────────────────────── */
interface SektorelSoru {
  id: string
  soru: string
  tip: 'text' | 'select' | 'multi' | 'number'
  secenekler?: string[]
  ipucu?: string
}

const SEKTOREL_SORULAR: Record<string, SektorelSoru[]> = {
  restoran: [
    { id: 'masa_sayisi', soru: 'Toplam kaç masanız var?', tip: 'number', ipucu: 'Paket servis dahil kapasite' },
    { id: 'mutfak_turu', soru: 'Mutfak türünüz nedir?', tip: 'select', secenekler: ['Türk Mutfağı', 'İtalyan', 'Uzak Doğu', 'Kebap & Izgara', 'Karışık', 'Diğer'] },
    { id: 'paket_servis', soru: 'Paket servis yapıyor musunuz?', tip: 'select', secenekler: ['Evet, kendi kuryemizle', 'Evet, Yemeksepeti/Getir ile', 'Hayır'] },
  ],
  kafe: [
    { id: 'ozel_kahve', soru: 'Specialty/3. dalga kahve sunuyor musunuz?', tip: 'select', secenekler: ['Evet', 'Hayır, klasik kahve'] },
    { id: 'pasta_var', soru: 'Taze pasta/tatlı üretiyor musunuz?', tip: 'select', secenekler: ['Evet, kendi üretimimiz', 'Hayır, dışarıdan', 'Evet, bazı ürünler'] },
  ],
  berber: [
    { id: 'koltuk_sayisi', soru: 'Kaç kesim koltuğunuz var?', tip: 'number' },
    { id: 'randevu_sistemi', soru: 'Randevu sistemi kullanıyor musunuz?', tip: 'select', secenekler: ['Evet', 'Hayır, sıra sistemi', 'İkisi de'] },
  ],
  kuafor: [
    { id: 'koltuk_sayisi', soru: 'Kaç koltuğunuz var?', tip: 'number' },
    { id: 'hizmetler', soru: 'Hangi hizmetleri veriyorsunuz?', tip: 'multi', secenekler: ['Saç Kesimi', 'Boya', 'Keratin', 'Makyaj', 'Gelin Saçı', 'Tırnak'] },
  ],
  elektrikci: [
    { id: 'acil_servis', soru: '7/24 acil servisiniz var mı?', tip: 'select', secenekler: ['Evet', 'Sadece gündüz', 'Mesai saatleri'] },
    { id: 'bolge', soru: 'Hangi ilçelere hizmet veriyorsunuz?', tip: 'text', ipucu: 'Örn: Kadıköy, Üsküdar, Ataşehir' },
  ],
  'oto-servis': [
    { id: 'marka', soru: 'Özel marka servisi misiniz?', tip: 'select', secenekler: ['Genel servis', 'BMW/Mercedes', 'VW/Audi', 'Hyundai/Kia', 'Diğer'] },
    { id: 'lift', soru: 'Kaç lift/kanal var?', tip: 'number' },
  ],
  avukat: [
    { id: 'alan', soru: 'Uzmanlık alanınız nedir?', tip: 'multi', secenekler: ['Aile Hukuku', 'İş Hukuku', 'Ceza Hukuku', 'Gayrimenkul', 'Ticaret', 'İdare'] },
    { id: 'baro', soru: 'Bağlı olduğunuz baro?', tip: 'text', ipucu: 'Örn: İstanbul Barosu' },
  ],
  'fitness-spor': [
    { id: 'alan_m2', soru: 'Salon alanınız (m²)?', tip: 'number' },
    { id: 'hizmetler', soru: 'Sunduğunuz hizmetler?', tip: 'multi', secenekler: ['Fitness', 'Crossfit', 'Pilates', 'Yoga', 'Boks', 'PT', 'Grup Ders'] },
  ],
}

/* ─── Sektör Seçim Grid Bileşeni ───────────────────────────────────────────── */
function SektorSecimAdimi({
  seciliSektor,
  onSec,
}: {
  seciliSektor: string
  onSec: (id: string) => void
}) {
  const [arama, setArama] = useState('')
  const [kategori, setKategori] = useState<string | null>(null)

  const filtrelenmis = useMemo(() => {
    return SEKTOR_LISTESI.filter(s => {
      const aramaUygun = !arama || s.ad.toLowerCase().includes(arama.toLowerCase()) ||
        s.anahtar.some(a => a.toLowerCase().includes(arama.toLowerCase()))
      const kategoriUygun = !kategori || s.kategori === kategori
      return aramaUygun && kategoriUygun
    })
  }, [arama, kategori])

  return (
    <div className="w-full max-w-lg space-y-4 mb-4">
      {/* Arama */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={arama}
          onChange={e => setArama(e.target.value)}
          placeholder="Sektör ara… (örn: berber, restoran)"
          className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all text-sm"
        />
      </div>

      {/* Kategori Filtreleri */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setKategori(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
            !kategori ? 'bg-rust border-rust text-white shadow-lg shadow-rust/20' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white backdrop-blur-md'
          }`}
        >
          Tümü ({SEKTOR_LISTESI.length})
        </button>
        {SEKTOR_KATEGORILERI.map(k => {
          const sayi = SEKTOR_LISTESI.filter(s => s.kategori === k).length
          return (
            <button
              key={k}
              type="button"
              onClick={() => setKategori(kategori === k ? null : k)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                kategori === k ? 'bg-rust border-rust text-white shadow-lg shadow-rust/20' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white backdrop-blur-md'
              }`}
            >
              {k} ({sayi})
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[340px] overflow-y-auto pr-1">
        {filtrelenmis.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSec(s.id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center backdrop-blur-md ${
              seciliSektor === s.id
                ? 'border-rust bg-rust/10 shadow-[0_0_15px_rgba(220,70,30,0.3)] scale-[1.02]'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <span className="text-2xl drop-shadow-md">{s.emoji}</span>
            <span className={`text-[11px] font-semibold leading-tight ${
              seciliSektor === s.id ? 'text-rust-light' : 'text-white/80'
            }`}>
              {s.ad}
            </span>
          </button>
        ))}
        {filtrelenmis.length === 0 && (
          <p className="col-span-full text-center text-white/50 text-sm py-8">
            Sonuç bulunamadı. Farklı bir arama terimi deneyin.
          </p>
        )}
      </div>
    </div>
  )
}

/* ─── Sektörel Sorular Adımı ───────────────────────────────────────────────── */
function SektorelSorularAdimi({
  sektorId,
  cevaplar,
  onCevapla,
}: {
  sektorId: string
  cevaplar: Record<string, string | string[]>
  onCevapla: (id: string, value: string | string[]) => void
}) {
  const sorular = SEKTOREL_SORULAR[sektorId] || []

  if (sorular.length === 0) {
    return (
      <div className="w-full max-w-sm text-center py-8">
        <p className="text-4xl mb-3">✨</p>
        <p className="text-muted-foreground-light text-sm">
          Bu sektör için ek soru bulunmuyor. Bir sonraki adıma geçebilirsiniz.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm space-y-4 mb-6">
      {sorular.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-1.5"
        >
          <label className="text-sm font-semibold text-white block">
            {s.soru}
          </label>

          {s.tip === 'text' && (
            <>
              <input
                type="text"
                value={(cevaplar[s.id] as string) || ''}
                onChange={e => onCevapla(s.id, e.target.value)}
                placeholder={s.ipucu}
                className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all text-sm"
              />
            </>
          )}

          {s.tip === 'number' && (
            <input
              type="number"
              min={0}
              value={(cevaplar[s.id] as string) || ''}
              onChange={e => onCevapla(s.id, e.target.value)}
              placeholder={s.ipucu || '0'}
              className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all text-sm"
            />
          )}

          {s.tip === 'select' && s.secenekler && (
            <div className="flex flex-wrap gap-2">
              {s.secenekler.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onCevapla(s.id, opt)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all backdrop-blur-sm ${
                    cevaplar[s.id] === opt
                      ? 'border-rust bg-rust/20 text-rust-light shadow-[0_0_15px_rgba(220,70,30,0.3)]'
                      : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {s.tip === 'multi' && s.secenekler && (
            <div className="flex flex-wrap gap-2">
              {s.secenekler.map(opt => {
                const secili = Array.isArray(cevaplar[s.id]) && (cevaplar[s.id] as string[]).includes(opt)
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      const mevcut = Array.isArray(cevaplar[s.id]) ? (cevaplar[s.id] as string[]) : []
                      onCevapla(s.id, secili ? mevcut.filter(x => x !== opt) : [...mevcut, opt])
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all backdrop-blur-sm ${
                      secili
                        ? 'border-rust bg-rust/20 text-rust-light shadow-[0_0_15px_rgba(220,70,30,0.3)]'
                        : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {secili && '✓ '}{opt}
                  </button>
                )
              })}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

const SEHIRLER = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Diğer']

const TELEFON_REGEX = /^(\+90|0)?[0-9]{10}$/

// ─── Adım 3: Görsel Kimlik (Renk + Tema sekmeli) ─────────────────────────────
function Adim3GorselKimlik({
    sektor,
    paket,
    formData,
    onGuncelle,
}: {
    sektor: string
    paket: string
    formData: { paletId: string; temaId: string }
    onGuncelle: (key: string, value: string) => void
}) {
    const [aktifSekme, setAktifSekme] = useState<'renk' | 'tema'>('renk')
    const erisimTemalar = TEMALAR.filter((t) => temaMinPaketKontrol(t.id, paket))

    return (
        <div className="w-full max-w-sm space-y-4 mb-6 max-h-[520px] overflow-y-auto">
            <div className="text-center">
                <p className="text-4xl mb-3">🎨</p>
                <h3 className="text-foreground font-syne font-extrabold text-xl">Görsel Kimlik</h3>
                <p className="text-muted-foreground-light text-sm mt-2">Sitenizin rengi ve tarzını seçin</p>
            </div>

            <div className="flex bg-white/5 backdrop-blur-md rounded-xl p-1 gap-1 border border-white/10">
                {[
                    { id: 'renk', label: '🎨 Renk' },
                    { id: 'tema', label: '✨ Stil' },
                ].map((s) => (
                    <button
                        key={s.id}
                        type="button"
                        onClick={() => setAktifSekme(s.id as 'renk' | 'tema')}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-syne font-bold transition-all ${aktifSekme === s.id ? 'bg-rust text-white shadow-lg shadow-rust/20' : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {aktifSekme === 'renk' && (
                <RenkPaletiSecici
                    secilenSektor={sektor}
                    secilenPaletId={formData.paletId}
                    onSec={(id) => onGuncelle('paletId', id)}
                />
            )}

            {aktifSekme === 'tema' && (
                <TemaSecici
                    temalar={erisimTemalar}
                    secilenTemaId={formData.temaId}
                    onSec={(id) => onGuncelle('temaId', id)}
                    paket={paket}
                />
            )}
        </div>
    )
}

function TemaSecici({
    temalar,
    secilenTemaId,
    onSec,
    paket,
}: {
    temalar: typeof TEMALAR
    secilenTemaId: string
    onSec: (id: string) => void
    paket: string
}) {
    return (
        <div className="space-y-3">
            {temalar.map((tema) => (
                <button
                    key={tema.id}
                    type="button"
                    onClick={() => onSec(tema.id)}
                    className={`w-full rounded-2xl overflow-hidden border-2 text-left transition-all backdrop-blur-md ${secilenTemaId === tema.id
                            ? 'border-rust shadow-[0_0_20px_rgba(220,70,30,0.3)]'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                >
                    <div className="relative h-36 bg-black/40 overflow-hidden">
                        <img
                            src={tema.onizlemeUrl}
                            alt={tema.ad}
                            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                            <span className="text-2xl drop-shadow-md">{tema.emoji}</span>
                            <p className="text-white font-syne font-extrabold text-lg leading-tight drop-shadow-md">{tema.ad}</p>
                        </div>
                        {secilenTemaId === tema.id && (
                            <div className="absolute top-3 right-3 w-7 h-7 bg-rust rounded-full flex items-center justify-center text-white text-sm shadow-md">
                                ✓
                            </div>
                        )}
                    </div>
                    <div className="bg-white/5 px-4 py-3 border-t border-white/10">
                        <p className="text-white/70 text-sm">{tema.aciklama}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {[
                                tema.cssOzellikleri.kartStili,
                                tema.cssOzellikleri.animasyon + ' animasyon',
                                tema.cssOzellikleri.fontStili + ' font',
                            ].map((tag, i) => (
                                <span key={i} className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </button>
            ))}

            {TEMALAR.filter((t) => !temaMinPaketKontrol(t.id, paket)).map((tema) => (
                <div key={tema.id} className="rounded-2xl overflow-hidden border-2 border-border opacity-60 pointer-events-none">
                    <div className="relative h-36 bg-warm overflow-hidden">
                        <img src={tema.onizlemeUrl} alt={tema.ad} className="w-full h-full object-cover grayscale" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-4xl">🔒</p>
                                <p className="text-foreground text-sm font-syne font-bold mt-1">{tema.minPaket} paketten itibaren</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card px-4 py-2">
                        <p className="text-muted-foreground text-sm">{tema.ad} — {tema.aciklama}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

// ─── Adım 4: Modül Seçimi ──────────────────────────────────────────────────
const PAKET_SIRASI = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS']
const PAKET_ETIKETLERI: Record<string, string> = {
    TEMEL: 'Temel', STANDART: 'Standart', BUYUME: 'Büyüme', PREMIUM: 'Premium', PREMIUMPLUS: 'Premium+'
}

function ModulSecimAdimi({
    sektor,
    paket,
    seciliModuller,
    onDegistir,
}: {
    sektor: string
    paket: string
    seciliModuller: string[]
    onDegistir: (moduller: string[]) => void
}) {
    // Sektöre uygun tüm modüller (paket kısıtlaması olmadan)
    const sektorModulleri = useMemo(() => {
        const { sektorBul } = require('@/data/sektorler')
        const s = sektorBul(sektor)
        if (!s) return []
        return s.moduller
            .map((id: string) => MODULLER.find(m => m.id === id))
            .filter(Boolean) as Modul[]
    }, [sektor])

    // İlk render'da paketine uygun modülleri oto-seç
    React.useEffect(() => {
        if (seciliModuller.length === 0 && sektorModulleri.length > 0) {
            const otomatik = sektorModulleri
                .filter(m => modulKullanilabilir(m.id, paket))
                .map(m => m.id)
            onDegistir(otomatik)
        }
    }, [sektorModulleri]) // eslint-disable-line

    function toggleModul(modulId: string) {
        if (seciliModuller.includes(modulId)) {
            onDegistir(seciliModuller.filter(id => id !== modulId))
        } else {
            onDegistir([...seciliModuller, modulId])
        }
    }

    const MODUL_EMOJILERI: Record<string, string> = {
        'randevu': '📅', 'menu': '🍽️', 'galeri': '📸', 'santiye-gunlugu': '🏗️',
        'online-rezervasyon': '📆', 'iletisim-formu': '📬', 'acil-buton': '🚨',
        'hizmet-bolgeleri': '📍', 'hizmet-fiyat-listesi': '💰', 'ucretsiz-kesif': '🔍',
        'paket-listesi': '📦', 'katalog': '📋', 'fiyat-hesaplayici': '🧮',
        'nobet-takvimi': '🗓️', 'siparis-linki': '🛒', 'gunun-ozel': '⭐',
        'instagram-feed': '📱', 'online-danisma': '💬', 'evrak-listesi': '📄',
        'proje-portfoy': '🗂️', 'arac-sorgulama': '🚗', 'uyelik-paketleri': '🎫',
        'ders-programi': '📚', 'kayit-formu': '✍️', 'recete-iletme': '💊',
        'ilac-hatirlatici': '⏰', 'sasi-parca-sorgulama': '🔧', 'qr-menu': '📲',
        'masadan-siparis': '🍴', 'seviye-tespit-formu': '📝', 'oncesi-sonrasi-slider': '🔄',
        'canli-destek': '💬', 'sss-genis': '❓', 'ekip-uyeleri': '👥',
    }

    return (
        <div className="w-full max-w-sm space-y-3 mb-6 max-h-[520px] overflow-y-auto pr-2">
            <div className="text-center mb-2">
                <p className="text-4xl mb-2 drop-shadow-md">🧩</p>
                <h3 className="text-white font-syne font-extrabold text-lg drop-shadow-sm">Site Modülleri</h3>
                <p className="text-white/60 text-xs mt-1 font-medium">
                    Sektörünüze uygun {sektorModulleri.length} özellik • <span className="text-rust-light font-bold">{seciliModuller.length}</span> seçili
                </p>
            </div>

            <div className="space-y-2">
                {sektorModulleri.map((modul) => {
                    const kullanilabilir = modulKullanilabilir(modul.id, paket)
                    const secili = seciliModuller.includes(modul.id)
                    const emoji = MODUL_EMOJILERI[modul.id] || '🔷'

                    return (
                        <button
                            key={modul.id}
                            type="button"
                            onClick={() => kullanilabilir && toggleModul(modul.id)}
                            disabled={!kullanilabilir}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all backdrop-blur-md ${
                                !kullanilabilir
                                    ? 'border-white/5 opacity-50 cursor-not-allowed bg-white/5'
                                    : secili
                                    ? 'border-rust bg-rust/20 shadow-[0_0_15px_rgba(220,70,30,0.2)]'
                                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                            }`}
                        >
                            <span className="text-xl flex-shrink-0 drop-shadow-md">{emoji}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className={`font-semibold text-sm ${secili ? 'text-rust-light' : 'text-white'}`}>
                                        {modul.ad}
                                    </p>
                                    {!kullanilabilir && (
                                        <span className="text-[9px] bg-black/40 text-white/70 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-white/10">
                                            <Lock className="w-2.5 h-2.5 text-rust/80" />
                                            {PAKET_ETIKETLERI[modul.minPaket]}
                                        </span>
                                    )}
                                </div>
                                <p className={`text-[11px] truncate mt-0.5 ${secili ? 'text-white/80' : 'text-white/50'}`}>{modul.aciklama}</p>
                            </div>
                            {kullanilabilir && (
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                                    secili ? 'bg-rust border-rust text-white shadow-md' : 'border-white/20 bg-black/20 text-transparent'
                                }`}>
                                    <span className="text-[10px] font-bold">✓</span>
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>

            {sektorModulleri.some(m => !modulKullanilabilir(m.id, paket)) && (
                <div className="bg-rust/5 border border-rust/20 rounded-xl p-3 mt-3">
                    <p className="text-xs text-muted-foreground">
                        🔒 Kilitli modüllere erişmek için paketinizi yükseltebilirsiniz.
                        Randevu Sistemi ve Şantiye Günlüğü <strong>Premium</strong> paketle gelir.
                    </p>
                </div>
            )}
        </div>
    )
}

const steps = [
    {
        id: "welcome",
        title: "İşletme Bilgilerin",
        description: "Dijital dükkanını hazırlamak için birkaç bilgi lazım. Sadece 2 dakika!",
        icon: <Store className="w-12 h-12 text-rust mb-4" />
    },
    {
        id: "gmb",
        title: "Dijital Varlıkların",
        description: "Google, Instagram, Facebook hesapların varsa bağla. Yoksa biz buluruz!",
        icon: <LinkIcon className="w-12 h-12 text-steel mb-4" />
    },
    {
        id: "palette",
        title: "Sitenizin Rengi",
        description: "Yapay zeka bu renk paletini kullanarak sitenizi tasarlayacak.",
        icon: <Palette className="w-12 h-12 text-rust mb-4" />
    },
    {
        id: "moduller",
        title: "Site Özellikleri",
        description: "Sitenize eklenecek özellikleri seçin. Yapay zeka seçtiğiniz modülleri siteye entegre edecek.",
        icon: <LayoutGrid className="w-12 h-12 text-steel mb-4" />
    },
    {
        id: "sektorel",
        title: "Sektörel Detaylar",
        description: "İşletmenize özel birkaç soru — sitenizi daha doğru kurgulamamız için.",
        icon: <ClipboardList className="w-12 h-12 text-steel mb-4" />
    },
    {
        id: "whatsapp",
        title: "İletişim Bilgilerin",
        description: "Müşterilerine otomatik WhatsApp mesajları gönderebilmemiz için numaranı doğrula.",
        icon: <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
    },
    {
        id: "photo",
        title: "Dükkanının Fotoğrafı",
        description: "Vitrinini göster! Bu fotoğrafı ileride sosyal medya içeriklerinde kullanacağız.",
        icon: <Camera className="w-12 h-12 text-gold mb-4" />
    },
    {
        id: "onaylar",
        title: "Sözleşme & Onaylar",
        description: "Hizmet koşullarını onaylayın ve hesabınızı oluşturun.",
        icon: <CheckCircle2 className="w-12 h-12 text-rust mb-4" />
    },
    {
        id: "first_post",
        title: "Kepengini Astık! 🎉",
        description: "Her şey hazır! Dijital esnaf rozetini kazan ve kepengini aç.",
        icon: <Award className="w-12 h-12 text-rust mb-4" />
    }
];

type PaketTipi = keyof typeof PAKET_FIYATLARI

export default function OnboardingWizard() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialPaket = (searchParams.get('paket') || 'TEMEL').toUpperCase() as PaketTipi;
    const googleEmail = searchParams.get('googleEmail') || '';
    const googleName  = searchParams.get('googleName')  || '';
    const googleAuthFlow = !!(googleEmail);

    const [formData, setFormData] = useState({
        ad: googleName.split(' ')[0] || "",
        soyad: googleName.split(' ').slice(1).join(' ') || "",
        isletmeAdi: "",
        sektor: "",
        sehir: "İstanbul",
        ilce: "",
        paket: initialPaket in PAKET_FIYATLARI ? initialPaket : 'TEMEL' as PaketTipi,
        gmbUrl: "",
        instagramUsername: "",
        facebookUrl: "",
        paletId: "",
        temaId: "",
        email: googleEmail,
        telefon: "",
        waSame: true,
        waNumarasi: "",
        photoUrl: "",
        aktifWebModulleri: [] as string[],
        sektorelCevaplar: {} as Record<string, string | string[]>,
        kvkkOnay: false,
        smsOnay: false,
    });

    const [hatalar, setHatalar] = useState<Record<string, string>>({});
    const [yukleniyor, setYukleniyor] = useState(false);
    const [hata, setHata] = useState('');
    const [progressAdim, setProgressAdim] = useState(0);

    // Telefon doğrulama (onboarding OTP)
    const [telefonDogrulandi, setTelefonDogrulandi] = useState(false);
    const [otpGonderiyor, setOtpGonderiyor] = useState(false);
    const [otpGonderildi, setOtpGonderildi] = useState(false);
    const [otpKod, setOtpKod] = useState('');
    const [otpDogruluyor, setOtpDogruluyor] = useState(false);
    const [otpHata, setOtpHata] = useState('');

    const loaderMetinleri = [
        "Website Altyapınız Kuruluyor...",
        "İlk Reklam Kampanyanız Hazırlanıyor...",
        "Satış Asistanı Profiliniz Eğitiliyor...",
        "Mükemmel. Kepenkler Açılıyor! 🚀"
    ];

    function validate(): boolean {
        const e: Record<string, string> = {};
        const step = steps[currentStepIndex].id;

        if (step === 'welcome') {
            if (!formData.ad || formData.ad.length < 2) e.ad = 'Adınız en az 2 karakter olmalı';
            if (!formData.isletmeAdi || formData.isletmeAdi.length < 2) e.isletmeAdi = 'İşletme adı en az 2 karakter olmalı';
            if (!formData.sektor) e.sektor = 'Sektör seçiniz';
        }
        if (step === 'whatsapp') {
            const tel = formData.telefon.replace(/\s/g, '');
            if (!TELEFON_REGEX.test(tel)) e.telefon = 'Geçerli bir telefon numarası giriniz';
            if (!telefonDogrulandi) e.telefonDogrulama = 'Telefon numaranızı doğrulamanız gerekiyor';
        }
        if (step === 'onaylar') {
            if (!formData.kvkkOnay) e.kvkkOnay = 'Devam etmek için aydınlatma metnini kabul etmeniz gerekiyor';
        }

        setHatalar(e);
        return Object.keys(e).length === 0;
    }

    const handleNext = () => {
        if (!validate()) return;
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setHatalar({ ...hatalar, [e.target.name]: '' });
        // Telefon değişince doğrulamayı sıfırla
        if (e.target.name === 'telefon') {
            setTelefonDogrulandi(false);
            setOtpGonderildi(false);
            setOtpKod('');
            setOtpHata('');
        }
    };

    async function handleOtpGonder() {
        const tel = formData.telefon.replace(/\s/g, '');
        if (!TELEFON_REGEX.test(tel)) {
            setHatalar(prev => ({ ...prev, telefon: 'Geçerli bir telefon numarası giriniz' }));
            return;
        }
        setOtpGonderiyor(true);
        setOtpHata('');
        try {
            const res = await fetch('/api/auth/onboarding-otp-gonder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ telefon: tel }),
            });
            const data = await res.json();
            if (res.ok) {
                setOtpGonderildi(true);
            } else {
                setOtpHata(data.error || 'SMS gönderilemedi');
            }
        } catch {
            setOtpHata('Bağlantı hatası');
        } finally {
            setOtpGonderiyor(false);
        }
    }

    async function handleOtpDogrula() {
        if (otpKod.length !== 6) { setOtpHata('6 haneli kodu giriniz'); return; }
        const tel = formData.telefon.replace(/\s/g, '');
        setOtpDogruluyor(true);
        setOtpHata('');
        try {
            const res = await fetch('/api/auth/onboarding-otp-dogrula', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ telefon: tel, kod: otpKod }),
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                setTelefonDogrulandi(true);
                setHatalar(prev => ({ ...prev, telefonDogrulama: '' }));
            } else {
                setOtpHata(data.error || 'Hatalı kod');
            }
        } catch {
            setOtpHata('Bağlantı hatası');
        } finally {
            setOtpDogruluyor(false);
        }
    }

    const handleTamamla = async () => {
        setYukleniyor(true);
        setHata('');
        setProgressAdim(0);

        try {
            // STEP 1 UI Anim
            setProgressAdim(1)
            await new Promise(r => setTimeout(r, 1500))

            // STEP 2 UI Anim
            setProgressAdim(2)
            await new Promise(r => setTimeout(r, 1500))

            const tel = formData.telefon.replace(/\s/g, '');
            const wa = formData.waSame ? tel : formData.waNumarasi.replace(/\s/g, '');

            const res = await fetch('/api/onboarding/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adim1: {
                        ad: formData.ad,
                        soyad: formData.soyad,
                        isletmeAdi: formData.isletmeAdi,
                        sektor: formData.sektor,
                        sehir: formData.sehir,
                        ilce: formData.ilce,
                        paket: formData.paket,
                    },
                    adim2: {
                        gmbLink: formData.gmbUrl,
                        instagramUsername: formData.instagramUsername || null,
                        instagramUrl: formData.instagramUsername
                            ? `https://instagram.com/${formData.instagramUsername}`
                            : null,
                        facebookUrl: formData.facebookUrl || null,
                    },
                    adim3: {
                        paletId: formData.paletId || 'siyah-altin',
                        temaId: formData.temaId || 'modern-minimal',
                    },
                    adim4: {
                        aktifWebModulleri: formData.aktifWebModulleri,
                    },
                    adim5: {
                        email: formData.email,
                        telefon: tel,
                        waNumarasi: wa,
                        telefonDogrulandi,
                    },
                    smsRizasi: formData.smsOnay,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                setHata(err.error || 'Kayıt sırasında bir sorun oluştu.');
                setYukleniyor(false);
                return;
            }

            // STEP 3 UI Anim
            setProgressAdim(3)
            await new Promise(r => setTimeout(r, 800))

            const { esnafId } = await res.json();
            // Cookie otomatik set ediliyor (HttpOnly — API response header)

            // Ödeme sayfasına yönlendir
            router.push(`/odeme?esnafId=${esnafId}&paket=${formData.paket}`);
        } catch {
            setHata('Bağlantı hatası. Lütfen tekrar deneyin.');
            setYukleniyor(false);
        }
    };

    const currentStep = steps[currentStepIndex];
    const isLastStep = currentStepIndex === steps.length - 1;
    const fiyat = PAKET_FIYATLARI[formData.paket] || 399;

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-8">
            <div className="text-center mb-6 text-sm font-medium text-muted-foreground-light">
                Adım {currentStepIndex + 1} / {steps.length}
            </div>

            {/* Progress Bar */}
            <div className="mb-10">
                <div className="flex justify-between mb-2">
                    {steps.map((s, idx) => (
                        <div key={s.id} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${idx <= currentStepIndex ? "bg-rust text-foreground shadow-md shadow-rust/20" : "bg-warm text-muted-foreground"}`}>
                                {idx < currentStepIndex ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-2 w-full bg-warm rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-rust"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.98 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                    className="relative bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 text-center flex flex-col justify-center items-center w-full overflow-hidden"
                >
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-rust/5 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 w-full flex flex-col items-center">
                        <motion.div 
                            initial={{ scale: 0.5, rotate: -15 }} 
                            animate={{ scale: 1, rotate: 0 }} 
                            transition={{ duration: 0.5, type: "spring" }}
                        >
                            {currentStep.icon}
                        </motion.div>
                        <h2 className="text-3xl font-extrabold text-white mb-3 font-syne tracking-tight mt-2 drop-shadow-md">{currentStep.title}</h2>
                        <p className="text-muted-foreground-300 font-lora leading-relaxed mb-8 max-w-sm text-[15px]">
                            {currentStep.description}
                        </p>

                    {/* ADIM 1 — İşletme Bilgileri + Sektör Seçim Grid */}
                    {currentStep.id === "welcome" && (
                        <div className="w-full max-w-lg space-y-3 mb-6">
                            <div className="max-w-sm mx-auto space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <input
                                            type="text"
                                            name="ad"
                                            value={formData.ad}
                                            onChange={handleChange}
                                            placeholder="Adınız *"
                                            className={`w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 transition-all ${hatalar.ad ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:border-rust focus:bg-white/10 focus:ring-rust/50'} focus:outline-none focus:ring-2`}
                                        />
                                        {hatalar.ad && <p className="text-red-400 text-xs mt-1 text-left">{hatalar.ad}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="soyad"
                                            value={formData.soyad}
                                            onChange={handleChange}
                                            placeholder="Soyadınız"
                                            className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all"
                                        />
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    name="isletmeAdi"
                                    value={formData.isletmeAdi}
                                    onChange={handleChange}
                                    placeholder="İşletme Adınız *"
                                    className={`w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 transition-all ${hatalar.isletmeAdi ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:border-rust focus:bg-white/10 focus:ring-rust/50'} focus:outline-none focus:ring-2`}
                                />
                                {hatalar.isletmeAdi && <p className="text-red-400 text-xs mt-1 text-left">{hatalar.isletmeAdi}</p>}
                                <div className="grid grid-cols-2 gap-2">
                                    <select
                                        name="sehir"
                                        value={formData.sehir}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all appearance-none"
                                    >
                                        {SEHIRLER.map(s => <option key={s} value={s} className="bg-zinc-800 text-white">{s}</option>)}
                                    </select>
                                    <input
                                        type="text"
                                        name="ilce"
                                        value={formData.ilce}
                                        onChange={handleChange}
                                        placeholder="İlçe (opsiyonel)"
                                        className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Sektör Seçim Grid */}
                            <div className="pt-3 border-t border-border/50">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 text-center">Sektörünüzü Seçin *</p>
                                <SektorSecimAdimi
                                    seciliSektor={formData.sektor}
                                    onSec={(id) => setFormData(prev => ({ ...prev, sektor: id }))}
                                />
                                {hatalar.sektor && <p className="text-red-500 text-xs mt-1 text-center">{hatalar.sektor}</p>}
                            </div>
                        </div>
                    )}

                    {/* ADIM 2 — Dijital Varlık */}
                    {currentStep.id === "gmb" && (
                        <div className="w-full max-w-sm space-y-3 mb-6">
                            <input
                                type="text"
                                name="gmbUrl"
                                value={formData.gmbUrl}
                                onChange={handleChange}
                                placeholder="Google My Business Linki (opsiyonel)"
                                className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all"
                            />
                            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm focus-within:ring-2 focus-within:ring-rust/50 focus-within:border-rust focus-within:bg-white/10 transition-all overflow-hidden">
                                <span className="px-3 py-3 text-white/50 bg-black/20 text-sm select-none">@</span>
                                <input
                                    type="text"
                                    name="instagramUsername"
                                    value={formData.instagramUsername}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        instagramUsername: e.target.value.replace('@', '').replace(/\s/g, '')
                                    })}
                                    placeholder="instagram_kullanici_adi"
                                    className="flex-1 px-3 py-3 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm"
                                />
                                {formData.instagramUsername && (
                                    <a
                                        href={`https://instagram.com/${formData.instagramUsername}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-3 text-rust text-xs font-medium hover:underline"
                                    >
                                        Kontrol ↗
                                    </a>
                                )}
                            </div>
                            <input
                                type="text"
                                name="facebookUrl"
                                value={formData.facebookUrl}
                                onChange={handleChange}
                                placeholder="Facebook Sayfası (opsiyonel)"
                                className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all"
                            />
                            <p className="text-xs text-white/50 text-center">
                                Instagram/Facebook yoksa atlayabilirsin — biz buluruz.
                            </p>
                        </div>
                    )}

                    {/* ADIM 3 — Görsel Kimlik (Renk + Tema) */}
                    {currentStep.id === "palette" && (
                        <Adim3GorselKimlik
                            sektor={formData.sektor}
                            paket={formData.paket}
                            formData={formData}
                            onGuncelle={(key, value) => setFormData(prev => ({ ...prev, [key]: value }))}
                        />
                    )}

                    {/* ADIM 4 — Modül Seçimi */}
                    {currentStep.id === "moduller" && (
                        <ModulSecimAdimi
                            sektor={formData.sektor}
                            paket={formData.paket}
                            seciliModuller={formData.aktifWebModulleri}
                            onDegistir={(moduller) => setFormData(prev => ({ ...prev, aktifWebModulleri: moduller }))}
                        />
                    )}

                    {/* ADIM 5 — Sektörel Detaylar */}
                    {currentStep.id === "sektorel" && (
                        <SektorelSorularAdimi
                            sektorId={formData.sektor}
                            cevaplar={formData.sektorelCevaplar}
                            onCevapla={(id, value) => setFormData(prev => ({
                                ...prev,
                                sektorelCevaplar: { ...prev.sektorelCevaplar, [id]: value }
                            }))}
                        />
                    )}

                    {/* ADIM 3 — İletişim */}
                    {currentStep.id === "whatsapp" && (
                        <div className="w-full max-w-sm space-y-3 mb-6">
                            {googleAuthFlow && (
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-4 py-3 text-blue-300 text-xs">
                                    Google hesabınızla devam ediyorsunuz ({googleEmail}). Telefon numaranızı girin.
                                </div>
                            )}
                            <div>
                                <label className="text-white/60 text-xs text-left block mb-1">
                                    E-posta <span className="text-white/30">(Fatura için)</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="isletme@ornek.com"
                                    className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all"
                                    readOnly={googleAuthFlow}
                                />
                            </div>
                            <div>
                                <div className="flex gap-2">
                                    <input
                                        type="tel"
                                        name="telefon"
                                        value={formData.telefon}
                                        onChange={handleChange}
                                        placeholder="Telefon * (05551234567)"
                                        readOnly={telefonDogrulandi}
                                        className={`flex-1 px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 transition-all ${hatalar.telefon ? 'border-red-400 focus:ring-red-400' : telefonDogrulandi ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 focus:border-rust focus:bg-white/10 focus:ring-rust/50'} focus:outline-none focus:ring-2`}
                                    />
                                    {!telefonDogrulandi && (
                                        <button
                                            type="button"
                                            onClick={handleOtpGonder}
                                            disabled={otpGonderiyor}
                                            className="px-4 py-3 rounded-xl bg-rust text-white text-sm font-medium disabled:opacity-50 whitespace-nowrap hover:bg-rust-light transition-colors"
                                        >
                                            {otpGonderiyor ? '...' : 'Doğrula'}
                                        </button>
                                    )}
                                    {telefonDogrulandi && (
                                        <span className="flex items-center gap-1 px-3 py-3 text-green-400 text-sm font-medium">
                                            <CheckCircle2 className="w-4 h-4" /> Onaylı
                                        </span>
                                    )}
                                </div>
                                {hatalar.telefon && <p className="text-red-400 text-xs mt-1 text-left">{hatalar.telefon}</p>}
                            </div>

                            {/* OTP Giriş Alanı */}
                            {otpGonderildi && !telefonDogrulandi && (
                                <div className="space-y-2">
                                    <p className="text-white/60 text-xs text-left">SMS ile gönderilen 6 haneli kodu girin:</p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={otpKod}
                                            onChange={(e) => { setOtpKod(e.target.value.replace(/\D/g, '')); setOtpHata(''); }}
                                            placeholder="_ _ _ _ _ _"
                                            className="flex-1 px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 text-center tracking-widest font-mono text-lg focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleOtpDogrula}
                                            disabled={otpDogruluyor || otpKod.length !== 6}
                                            className="px-4 py-3 rounded-xl bg-white/10 text-white text-sm font-medium disabled:opacity-50 hover:bg-white/20 transition-colors backdrop-blur-md"
                                        >
                                            {otpDogruluyor ? '...' : 'Onayla'}
                                        </button>
                                    </div>
                                    {otpHata && <p className="text-red-400 text-xs">{otpHata}</p>}
                                    <button type="button" onClick={handleOtpGonder} disabled={otpGonderiyor}
                                        className="text-xs text-white/50 underline hover:text-white transition-colors">
                                        Tekrar gönder
                                    </button>
                                </div>
                            )}
                            {!otpGonderildi && otpHata && <p className="text-red-400 text-xs text-left">{otpHata}</p>}
                            {hatalar.telefonDogrulama && !otpGonderildi && (
                                <p className="text-amber-400 text-xs text-left">{hatalar.telefonDogrulama}</p>
                            )}

                            <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer pt-2">
                                <input
                                    type="checkbox"
                                    checked={formData.waSame}
                                    onChange={(e) => setFormData({ ...formData, waSame: e.target.checked })}
                                    className="rounded border-white/20 bg-black/20 text-rust focus:ring-rust/50 focus:ring-offset-background"
                                />
                                WhatsApp numaram aynı
                            </label>
                            {!formData.waSame && (
                                <input
                                    type="tel"
                                    name="waNumarasi"
                                    value={formData.waNumarasi}
                                    onChange={handleChange}
                                    placeholder="WhatsApp Numaranız"
                                    className="w-full px-4 py-3 rounded-xl border bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border-white/10 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust focus:bg-white/10 transition-all"
                                />
                            )}
                        </div>
                    )}

                    {/* ADIM 4 — Fotoğraf */}
                    {currentStep.id === "photo" && (
                        <div className="w-full max-w-sm mb-6 space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.files?.[0]?.name || "" })}
                                className="w-full px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-rust file:text-white hover:file:bg-rust-light cursor-pointer border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm"
                            />
                            <p className="text-xs text-white/50 text-center">
                                Fotoğraf yoksa atlayabilirsin, sonra da ekleyebilirsin.
                            </p>
                        </div>
                    )}

                    {/* ADIM ONAYLAR — KVKK & SMS */}
                    {currentStep.id === "onaylar" && (
                        <div className="w-full max-w-sm space-y-4 mb-6 text-left">
                            <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${formData.kvkkOnay ? 'border-rust bg-rust/10' : 'border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20'}`}>
                                <input
                                    type="checkbox"
                                    checked={formData.kvkkOnay}
                                    onChange={e => setFormData(prev => ({ ...prev, kvkkOnay: e.target.checked }))}
                                    className="mt-0.5 rounded accent-rust flex-shrink-0"
                                />
                                <span className="text-sm text-white/80 leading-relaxed">
                                    <a href="/kvkk" target="_blank" rel="noopener noreferrer" className="text-rust font-semibold underline hover:text-rust-light transition-colors">KVKK Aydınlatma Metni</a>'ni,{' '}
                                    <a href="/kullanim-kosullari" target="_blank" rel="noopener noreferrer" className="text-rust font-semibold underline hover:text-rust-light transition-colors">Kullanım Koşulları</a>'nı ve{' '}
                                    <a href="/satis-sozlesmesi" target="_blank" rel="noopener noreferrer" className="text-rust font-semibold underline hover:text-rust-light transition-colors">Mesafeli Satış Sözleşmesi</a>'ni okudum, kabul ediyorum. <span className="text-red-400">*</span>
                                </span>
                            </label>
                            {hatalar.kvkkOnay && (
                                <p className="text-red-400 text-xs">{hatalar.kvkkOnay}</p>
                            )}

                            <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${formData.smsOnay ? 'border-rust bg-rust/5' : 'border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20'}`}>
                                <input
                                    type="checkbox"
                                    checked={formData.smsOnay}
                                    onChange={e => setFormData(prev => ({ ...prev, smsOnay: e.target.checked }))}
                                    className="mt-0.5 rounded accent-rust flex-shrink-0"
                                />
                                <span className="text-sm text-white/80 leading-relaxed">
                                    kepenk.ai tarafından kampanya, güncelleme ve fırsatlar hakkında SMS/WhatsApp ile bilgilendirme almak istiyorum. <span className="text-white/40 text-xs">(İsteğe bağlı)</span>
                                </span>
                            </label>

                            <p className="text-xs text-white/50 text-center pt-2">
                                Kişisel verileriniz 6698 sayılı KVKK kapsamında korunmaktadır.
                            </p>
                        </div>
                    )}

                    {/* ADIM 5 — Özet + Partner Etiketi */}
                    {currentStep.id === "first_post" && (
                        <div className="w-full max-w-sm mb-6 flex flex-col items-center space-y-4">
                            {/* Partner Etiket */}
                            <div className="bg-black/40 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 w-full relative overflow-hidden ring-1 ring-white/10">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-rust rounded-full opacity-30 blur-2xl" />
                                <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-gold rounded-full opacity-20 blur-2xl" />
                                <div className="flex flex-col items-center justify-center relative z-10 space-y-3">
                                    <div className="w-14 h-14 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-2 shadow-inner">
                                        <Store className="w-7 h-7 text-rust" />
                                    </div>
                                    <h3 className="font-syne font-extrabold text-2xl text-white tracking-tight text-center drop-shadow-md">
                                        <span className="text-rust">K</span>EPENK <span className="text-rust/80 text-sm font-normal">.ai</span>
                                    </h3>
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />
                                    <p className="text-xs text-white/70 text-center font-medium leading-relaxed">
                                        Bu işletme <span className="text-rust font-bold">kepenk.ai</span> akıllı esnaf asistanı kullanmaktadır.
                                    </p>
                                </div>
                            </div>

                            {/* Subdomain */}
                            <div className="w-full bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center">
                                <span className="text-[10px] font-bold text-rust uppercase tracking-widest mb-1 block">İŞLETME LİNKİNİZ</span>
                                <span className="text-white font-mono font-medium drop-shadow-sm">{isletmeAdiToSlug(formData.isletmeAdi || "isletme-adiniz")}.kepenk.ai</span>
                            </div>

                            {/* Büyüme Motoru Başlatma Özeti */}
                            {yukleniyor && (
                                <div className="w-full bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 mt-4 shadow-xl">
                                    <h4 className="font-syne font-bold text-white mb-3 text-sm flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-rust animate-pulse" />
                                        Sistem Hazırlanıyor
                                    </h4>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((step) => (
                                            <div key={step} className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] transition-all duration-500
                                                    ${progressAdim >= step ? 'bg-rust border-rust text-white shadow-[0_0_10px_rgba(220,70,30,0.5)]' : 'border-white/20 text-white/30'}`}>
                                                    {progressAdim >= step ? '✓' : ''}
                                                </div>
                                                <p className={`text-sm transition-colors duration-500 ${progressAdim >= step ? 'text-white font-semibold' : 'text-white/40'}`}>
                                                    {loaderMetinleri[step - 1]}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-white/5" />
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-rust to-gold relative z-10"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${(progressAdim / 3) * 100}%` }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            )}

                            {hata && (
                                <p className="text-red-400 text-sm mt-3 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20">{hata}</p>
                            )}

                            <p className="text-[11px] text-white/40 italic">
                                * Partner etiketiniz dükkan vitrininiz için kargoyla gönderilecektir.
                            </p>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-auto w-full pt-6 flex gap-4 justify-between border-t border-white/10 mt-8">
                        {currentStepIndex > 0 ? (
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleBack}
                                className="flex-1 max-w-[140px] flex items-center justify-center bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white backdrop-blur-md transition-all rounded-xl"
                            >
                                <ArrowLeft className="mr-2 w-5 h-5 text-white/50" /> Geri
                            </Button>
                        ) : <div className="flex-1 max-w-[140px]" />}

                        {isLastStep ? (
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleTamamla}
                                disabled={yukleniyor}
                                className="flex-1 group flex items-center justify-center disabled:opacity-50 min-h-[50px] font-syne font-bold text-lg bg-rust hover:bg-rust-light text-white border-0 shadow-[0_0_20px_rgba(220,70,30,0.4)] hover:shadow-[0_0_30px_rgba(220,70,30,0.6)] transition-all rounded-xl"
                            >
                                {yukleniyor ? 'Makineler Çalışıyor...' : 'Büyüme Motorunu Ateşle'}
                                <span className="ml-2 inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">🚀</span>
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => {
                                    if (currentStep.id === 'palette') {
                                        if (!formData.paletId) {
                                            const varsayilan = sektorPaletOner(formData.sektor)[0]
                                            setFormData(prev => ({ ...prev, paletId: varsayilan?.id ?? 'siyah-altin' }))
                                        }
                                        if (!formData.temaId) {
                                            setFormData(prev => ({ ...prev, temaId: 'modern-minimal' }))
                                        }
                                    }
                                    handleNext()
                                }}
                                className="flex-1 group flex items-center justify-center bg-white text-black hover:bg-white/90 border-0 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all font-medium rounded-xl"
                            >
                                {['photo', 'palette'].includes(currentStep.id) ? 'Atla veya Devam Et' : 'Onayla ve Devam Et'}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        )}
                    </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
