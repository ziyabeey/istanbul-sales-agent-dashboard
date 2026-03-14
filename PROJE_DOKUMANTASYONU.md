# kepenk.ai — Kapsamlı Proje Dokümantasyonu

> **Son güncelleme:** 2026-03-13  
> **Toplam dosya:** 300+ | **API:** 80+ | **Sayfa:** 40+ | **Ajan:** 32 | **Cron:** 26 | **Test:** 171

---

## 1. Proje Özeti

**kepenk.ai**, Türkiye'deki küçük işletme sahiplerine (esnaf) dijital dönüşüm sunan bir SaaS platformudur. Yapay zeka destekli ajanlar aracılığıyla web sitesi oluşturma, içerik üretimi, müşteri yönetimi, reklam, muhasebe ve operasyon otomasyonu sağlar.

### Hedef Kitle
- Berber, kuaför, terzi, tesisatçı, elektrikçi, restoran, avukat, veteriner gibi **28+ farklı sektörde** hizmet veren esnaflar
- Türkiye geneli, İstanbul odaklı SEO ve pazarlama
- Kurumsal zincir işletmeler (White-Label / Çok Şube)

### Vizyon
"Esnafın dijital kepengi" — tek platform üzerinden web sitesi, sosyal medya, müşteri iletişimi ve iş operasyonlarını AI ile yönetmek.

### Teknik Stack
| Teknoloji | Kullanım |
|-----------|----------|
| Next.js 16 (App Router) | Frontend + API Routes |
| TypeScript 5 | Tip güvenliği |
| Tailwind CSS v4 | Stil sistemi |
| React 19 | UI framework |
| Firebase Firestore | Veritabanı (Admin SDK) |
| Twilio | WhatsApp mesajlaşma |
| NetGSM | SMS + IYS |
| İyzico | Ödeme altyapısı (3D Secure) |
| Google ADK + Gemini 2.0 | AI ajan orkestrasyon sistemi |
| Anthropic Claude | İçerik üretimi |
| Cloudflare Pages | Esnaf web sitesi barındırma |
| Docker + Cloud Run | Production deployment |
| Vercel | Cron job deployment |
| Framer Motion | 3D animasyonlar ve geçişler |

---

## 2. Mimari

### Monorepo Yapısı (pnpm + Turborepo)
```
XinXia/
├── apps/
│   └── web/                    # Ana Next.js uygulaması
│       └── src/
│           ├── app/            # App Router (sayfalar + API)
│           │   ├── (seo)/      # Dinamik SEO sektör sayfaları
│           │   ├── admin/      # Admin paneli (7 alt sayfa)
│           │   ├── dashboard/  # Esnaf dashboard (23 alt sayfa)
│           │   ├── demolar/    # Demo vitrin galerisi
│           │   ├── onboarding/ # Kayıt sihirbazı
│           │   ├── ozellikler/ # 11 özellik alt sayfası
│           │   ├── magaza/     # E-ticaret mağaza
│           │   ├── sablonlar/  # Şablon market + editör
│           │   └── api/        # 46 API route klasörü
│           ├── agents/         # 21 çekirdek ajan + 11 ADK modülü
│           ├── components/     # React bileşenler (50+)
│           ├── context/        # EsnafContext (auth state)
│           ├── data/           # Paketler, sektörler, modüller, temalar
│           ├── lib/            # Kütüphane dosyaları (76 dosya)
│           ├── types/          # TypeScript tip tanımları (3)
│           └── utils/          # Yardımcı fonksiyonlar (36)
├── data/
│   └── sektorel_knowhow/      # Sektör JSON bilgi bankası
├── scripts/                    # Migrasyon ve seed scriptleri
├── public/                     # Statik dosyalar, PWA
├── Dockerfile                  # Cloud Run deployment
├── cloudbuild.yaml             # Google Cloud Build
├── vercel.json                 # Vercel cron
├── turbo.json                  # Turborepo config
└── pnpm-workspace.yaml         # Monorepo workspace
```

### Auth Akışı
1. Kullanıcı `/giris` sayfasında telefon numarasını girer
2. `POST /api/auth/giris-kodu-gonder` → 6 haneli OTP kodu WhatsApp ile gönderilir
3. OTP kodlar `global.GECICI_KODLAR` Map'inde saklanır (process-local)
4. `POST /api/auth/giris-kodu-dogrula` → Doğrulama sonrası `esnaf_id` localStorage'a yazılır
5. `EsnafContext` (`src/context/EsnafContext.tsx`) localStorage'dan `esnaf_id` okur
6. Dashboard sayfaları `useEsnaf()` hook'u ile esnaf verisine erişir

### Veritabanı (Firestore Koleksiyonları)
| Koleksiyon | Amaç | Önemli Alanlar |
|------------|------|----------------|
| `esnaflar` | Ana esnaf kayıtları | durum, paket, telefonTemiz, sektor, aktifModuller |
| `musteriKonusmalar` | WhatsApp mesaj logları | esnafId, musteriNumara, mesaj, kimden, zaman |
| `randevular` | AI oluşturulan randevular | esnafId, musteriNumara, hizmet, saat, durum |
| `agent_logs` | Ajan aktivite kayıtları | ajan, esnafId, tip, input, output, zaman |
| `esnafBildirimleri` | Dashboard bildirimleri | esnafId, mesaj, okundu, zaman |
| `odemeler` | İyzico ödeme kayıtları | esnafId, paket, tutar, durum |
| `icerikler` | AI üretilen içerikler | esnafId, icerik, platform, durum |
| `yorumlar` | Google yorum verileri | esnafId, yorum, puan, yanitlandi |
| `karaliste` | WA opt-out numaraları | telefon, sebep, zaman |
| `siparisler` | E-ticaret siparişleri | esnafId, urunler, tutar, durum |
| `urunler` | Mağaza ürünleri | esnafId, ad, fiyat, stok, kategori |
| `kuponlar` | İndirim kuponları | kod, tip, deger, gecerlilik |

---

## 3. Sayfa Envanteri (40+ Sayfa)

### Genel Sayfalar
| Sayfa | Yol | Açıklama |
|-------|-----|----------|
| Ana Sayfa | `/` | Landing page (Hero 3D, Features, Pricing, Footer) |
| Giriş | `/giris` | Telefon OTP giriş |
| Onboarding | `/onboarding` | Kayıt sihirbazı (sektör grid, sorular, OTP, modül, renk) |
| Fiyatlar | `/fiyatlar` | 5 paket karşılaştırma |
| Özellikler | `/ozellikler` | Platform özellikleri hub |
| Hakkımızda | `/hakkimizda` | 3D Cuboid hero, takım, vizyon |
| İletişim | `/iletisim` | İletişim formu |
| Yardım | `/yardim` | SSS accordion |
| Nasıl Çalışır | `/nasil-calisir` | 3 adımlı açıklama |
| Kurumsal | `/kurumsal` | Zincir/kurumsal çözümler + teklif formu |
| Kariyer | `/kariyer` | Açık pozisyonlar |
| Tedarik | `/tedarik` | Tedarik ağı |
| Entegrasyonlar | `/entegrasyonlar` | Entegrasyon vitrin |
| Modüller | `/moduller` | Modül market |
| Şablonlar | `/sablonlar` | Şablon market + editör |
| Demo Vitrin | `/demolar/vitrin` | 34 sektör demo galerisi |

### Özellikler Alt Sayfaları (11)
`/ozellikler/yapay-zeka-asistani`, `/ozellikler/whatsapp`, `/ozellikler/web-sitesi`, `/ozellikler/raporlar`, `/ozellikler/sosyal-medya-ve-reklam`, `/ozellikler/sesli`, `/ozellikler/restoran-isletim-sistemi`, `/ozellikler/emlak-yonetim-sistemi`, `/ozellikler/randevu-ve-kapora`, `/ozellikler/santiye-gunlugu`, `/ozellikler/otomatik-e-fatura`

### Hukuki Sayfalar (5)
`/gizlilik`, `/kvkk`, `/kullanim-kosullari`, `/satis-sozlesmesi`, `/iade-kosullari`

### SEO Sayfaları
| Sayfa | Yol | Açıklama |
|-------|-----|----------|
| Sektör Sayfaları | `/(seo)/[sektor]` | Dinamik 28 sektör + ilçe |

### Ödeme Sayfaları (3)
`/odeme`, `/odeme/basarili`, `/odeme/basarisiz`

### Admin Sayfaları (7)
| Sayfa | Yol | Açıklama |
|-------|-----|----------|
| Dashboard | `/admin` | Genel istatistikler |
| Giriş | `/admin/login` | Admin auth |
| Esnaflar | `/admin/esnaflar` | Esnaf yönetimi |
| Ajanlar | `/admin/ajanlar` | Ajan izleme |
| Finans | `/admin/finans` | Finansal raporlar |
| Altyapı | `/admin/altyapi` | Sistem sağlığı |
| Marketing | `/admin/marketing` | Pazarlama |
| Numara Merkezi | `/admin/numara-merkezi` | Twilio numara yönetimi |

### Dashboard Sayfaları (23)
| Sayfa | Yol |
|-------|-----|
| Ana Dashboard | `/dashboard` |
| Abonelik | `/dashboard/abonelik` |
| Profil | `/dashboard/profil` |
| Sitem | `/dashboard/sitem` |
| İçerik | `/dashboard/icerik` |
| Kriz | `/dashboard/kriz` |
| Raporlar | `/dashboard/raporlar` |
| Bildirimler | `/dashboard/bildirimler` |
| Müşteriler | `/dashboard/musteriler` |
| Konuşmalar | `/dashboard/konusmalar` |
| Finans | `/dashboard/finans` |
| Reklamlar | `/dashboard/reklamlar` |
| Ekip | `/dashboard/ekip` |
| B2B | `/dashboard/b2b` |
| B2B Satış | `/dashboard/b2b-satis` |
| Randevular | `/dashboard/randevular` |
| Ajanlar | `/dashboard/ajanlar` |
| Domain | `/dashboard/domain` |
| Editör | `/dashboard/editor` |
| Emlak | `/dashboard/emlak` |
| Entegrasyonlar | `/dashboard/entegrasyonlar` |
| Mağaza | `/dashboard/magaza` |
| Restoran | `/dashboard/restoran` |

---

## 4. API Route Envanteri (46 Klasör, 80+ Endpoint)

### Core Authentication & Admin
| Route | Method | Açıklama |
|-------|--------|----------|
| `/api/auth/giris-kodu-gonder` | POST | OTP kodu WhatsApp ile gönder |
| `/api/auth/giris-kodu-dogrula` | POST | OTP kodunu doğrula |
| `/api/admin/login` | POST | Admin giriş |
| `/api/admin/stats` | GET | Admin istatistikleri |

### Payment & Checkout
| Route | Method | Açıklama |
|-------|--------|----------|
| `/api/payment/create` | POST | İyzico 3D Secure ödeme başlat |
| `/api/payment/callback` | POST | İyzico callback → paketSenaryosuCalistir |
| `/api/checkout/...` | POST | Checkout işlemleri |

### Onboarding & Esnaf
| Route | Method | Açıklama |
|-------|--------|----------|
| `/api/onboarding/complete` | POST | Kayıt tamamla |
| `/api/esnaf/[id]` | GET/PATCH | Esnaf bilgileri |

### Site & Domain
| Route | Method | Açıklama |
|-------|--------|----------|
| `/api/site/uret` | POST | AI ile web sitesi üret |
| `/api/site/guncelle` | POST | Mevcut siteyi güncelle |
| `/api/site/provision` | POST | Cloudflare Pages projesi oluştur |
| `/api/domain/sec` | POST | Domain seçimi |
| `/api/editor/...` | POST | Site editör işlemleri |

### Ajan Sistemi
| Route | Method | Açıklama |
|-------|--------|----------|
| `/api/ajan/tetikle` | POST | Ajan manuel tetikle |
| `/api/ajan/[ajanAdi]` | GET/POST | Ajan detay/çalıştırma |
| `/api/a2a` | POST | Agent-to-Agent JSON-RPC |
| `/api/adk/...` | POST | ADK modül tetikleme |
| `/api/.well-known/agent.json` | GET | ADK agent discovery |

### İçerik & Yorumlar
| Route | Method | Açıklama |
|-------|--------|----------|
| `/api/icerik` | GET | İçerik listesi |
| `/api/icerik/durum` | PATCH | İçerik durumu güncelle |
| `/api/icerik/uret` | POST | AI ile içerik üret |
| `/api/reviews` | PUT | Yorum yanıtı güncelle |
| `/api/yorumlar` | GET | Yorum listesi |

### Dashboard Data (13 endpoint)
`/api/dashboard/[esnafId]`, `/api/dashboard/summary`, `/api/dashboard/bildirimler`, `/api/dashboard/sentiment`, `/api/dashboard/ai-roi`, `/api/dashboard/buyume-skoru`, `/api/dashboard/omnichannel`, `/api/dashboard/stream`, `/api/dashboard/reklamlar`, `/api/dashboard/gelir-tahmini`, `/api/dashboard/musteriler`, `/api/dashboard/konusmalar`, `/api/dashboard/konusmalar/mesajlar`

### Mesajlaşma & Sosyal
| Route | Method | Açıklama |
|-------|--------|----------|
| `/api/whatsapp` | POST | Twilio webhook (gelen WA) |
| `/api/whatsapp/proactive` | POST | Proaktif WA mesaj |
| `/api/wa/musteri-mesaji` | POST | Müşteri WA mesaj işleme |
| `/api/instagram/webhook` | POST | Instagram yorum webhook |
| `/api/instagram/dm-webhook` | POST | Instagram DM webhook |

### Restoran İşletim Sistemi (9 endpoint)
| Route | Açıklama |
|-------|----------|
| `/api/restoran/masa-olustur` | Masa oluşturma |
| `/api/restoran/masa-siparis` | Masa siparişi |
| `/api/restoran/siparis-olustur` | Sipariş oluşturma |
| `/api/restoran/menu-sihirbazi` | AI menü oluşturma |
| `/api/restoran/alman-odeme` | Alman usulü hesap bölme |
| `/api/restoran/alman-odeme-callback` | Ödeme callback |
| `/api/restoran/split-odeme` | Split ödeme |
| `/api/restoran/upsell-onerisi` | AI upsell önerisi |
| `/api/restoran/parasut-tetikle` | Paraşüt muhasebe tetikleme |

### E-Ticaret / Mağaza (8 endpoint)
`/api/shop/products`, `/api/shop/categories`, `/api/shop/orders`, `/api/shop/inventory`, `/api/shop/coupons`, `/api/shop/feeds`, `/api/shop/shipping`, `/api/shop/sms`

### Diğer
| Route | Method | Açıklama |
|-------|--------|----------|
| `/api/ads` | POST | Reklam kampanyası oluştur |
| `/api/reklam/...` | POST | Reklam yönetimi |
| `/api/lead/scan` | POST | Lead tarama |
| `/api/finans/bilanco` | GET | Gelir/gider bilançosu |
| `/api/finans/gider-ekle` | POST | Gider kaydı |
| `/api/finans/cari-hesap-ekle` | POST | Cari hesap |
| `/api/hr/personel` | GET/POST | Personel yönetimi |
| `/api/b2b/siparisler` | GET/PATCH | B2B sipariş |
| `/api/b2b/kampanya` | POST | B2B kampanya |
| `/api/b2b/finans` | GET | B2B finansal |
| `/api/randevu/...` | POST | Randevu yönetimi |
| `/api/santiye/...` | POST | Şantiye günlüğü |
| `/api/storefront/...` | GET | Mağaza vitrin |
| `/api/push/...` | POST | Push notification |
| `/api/bulten/...` | POST | E-bülten |
| `/api/iletisim/...` | POST | İletişim formu |
| `/api/kariyer-basvuru/...` | POST | Kariyer başvuru |
| `/api/kurumsal-teklif/...` | POST | Kurumsal teklif |
| `/api/referans/...` | GET | Referanslar |
| `/api/vapi` | POST | Voice AI webhook (VAPI) |
| `/api/health` | GET | Sistem sağlığı |
| `/api/ai/...` | POST | AI işlemleri |
| `/api/webhooks/...` | POST | Genel webhook'lar |
| `/api/worker/...` | POST | Background worker |
| `/api/workers/...` | POST | Worker pool |
| `/api/ciro-anket` | POST | Ciro anketi |
| `/api/analytics/churn` | GET | Churn analizi |

### Cron Jobs (26 Görev)
| Route | Açıklama |
|-------|----------|
| `morning-message` | Sabah özet mesajı (WA) |
| `kvkk` | KVKK veri temizleme |
| `kvkk-purge` | KVKK kaydedilmemiş veri silme |
| `data-purge` | Eski veri temizleme |
| `churn-scan` | Kayıp riski taraması |
| `weekly-report` | Haftalık rapor üretimi |
| `konusma-ozeti` | Konuşma özeti üretimi |
| `rakip-analiz` | Rakip analizi |
| `sezon-uyari` | Mevsimsel kampanya uyarıları |
| `saglik-skor` | Esnaf dijital sağlık skoru |
| `kampanya-motoru` | Otomatik kampanya oluşturma |
| `reklam-performans` | Reklam performans hasatçısı |
| `dinamik-fiyat` | Dinamik fiyatlandırma |
| `esnaf-hafiza` | Esnaf hafıza güncelleme |
| `buyume-skoru` | Büyüme skoru hesaplama |
| `lookalike-guncelle` | Lookalike hedef kitle |
| `gmb-yorum-kontrol` | Google My Business yorum kontrolü |
| `mesaj-isleyici` | Bekleyen mesaj işleme |
| `tahsilat-hatirlatici` | Ödeme hatırlatma mesajları |
| `kolektif-zeka` | Esnaf ağı kolektif öğrenme |
| `otonom-isletme` | Tam otonom operasyon döngüsü |
| `google-reviews` | Google yorum çekme |
| `marketing-check` | Pazarlama durum kontrolü |
| `kuyruk-isleyici` | Kuyruk işleme |
| `worker` | Background worker |
| `yenileme-hatirlatici` | Abonelik yenileme hatırlatma |

---

## 5. AI Ajan Sistemi (32 Ajan)

### Merkezi Altyapı
- **`agentRunner.ts`** (20KB): Ajan çalıştırıcı. Sektör know-how enjeksiyonu yapar. Firestore'a log yazar.
- **`OrchestratorAgent.ts`** (10KB): Google ADK tabanlı merkezi yönlendirici. Gelen mesajı analiz eder, uygun ajana yönlendirir.
- **`AgentBase.ts`** (7KB): Tüm ajanların türediği temel sınıf.
- **`AgentBus.ts`** (7KB): Ajan arası event bus sistemi.

### Çekirdek Ajanlar (19)
| Ajan | Dosya | Boyut | Amaç |
|------|-------|-------|------|
| Orchestrator | `OrchestratorAgent.ts` | 10KB | Merkezi yönlendirici |
| The Closer | `TheCloserAgent.ts` | 1.5KB | Satış kapama |
| Churn Detective | `ChurnDetectiveAgent.ts` | 1.2KB | Kayıp riski tespiti |
| The Creator | `TheCreatorAgent.ts` | 1KB | Web sitesi üretimi |
| Esnaf Asistanı | `EsnafAsistaniAgent.ts` | 1.2KB | Genel asistan |
| Sentiment Guardian | `SentimentGuardianAgent.ts` | 0.9KB | Duygu analizi |
| Mesaj Mimarı | `MesajMimariAgent.ts` | 1.9KB | Mesaj üretimi |
| Derin Araştırmacı | `DerinArastirmaciAgent.ts` | 1.7KB | Pazar araştırması |
| Lead Madencisi | `LeadMadencisiAgent.ts` | 1.6KB | Potansiyel müşteri bulma |
| Reklam Asistanı | `ReklamAsistaniAgent.ts` | 6.6KB | Google/Meta Ads |
| Müzakereci | `MuzakereciAgent.ts` | 1KB | İtiraz yönetimi |
| Destek Upsell | `DestekUpsellAgent.ts` | 0.9KB | Paket yükseltme |
| Değişiklik Ajanı | `DegisiklikAjaniAgent.ts` | 1KB | Site güncelleme |
| Operasyon Beyni | `OperasyonBeyniAgent.ts` | 0.9KB | Operasyon raporu |
| Telefon Komutanı | `TelefonKomutaniAgent.ts` | 0.8KB | VAPI sesli arama |
| The Overseer | `TheOverseerAgent.ts` | 0.9KB | Kalite kontrol |
| IK Ajanı | `IKAjaniAgent.ts` | 1.1KB | İnsan kaynakları |
| Satınalma Ajanı | `SatinalmaAjani.ts` | 12KB | Tedarikçi karşılaştırma |

### ADK Modülleri — Otonom Entegrasyon Ajanları (11)
`src/agents/adk_modules/` klasöründe, A2A (JSON-RPC) ile keşfedilen gelişmiş modüller:

| Modül | Boyut | Amaç |
|-------|-------|------|
| `OtonomKaporaAgent.ts` | 6.7KB | İyzico ile ön ödeme linki üretir |
| `TrendyolAgent.ts` | 2.1KB | Stok/fiyat senkronizasyonu |
| `YemeksepetiAgent.ts` | 1.4KB | Katalog senkronizasyonu |
| `ParasutAgent.ts` | 9.2KB | OCR fiş okuma + muhasebe |
| `ArmutAgent.ts` | 1.2KB | Hizmet taleplerine teklif |
| `LsaAgent.ts` | 0.5KB | Google LSA feed |
| `TikTokAgent.ts` | 0.9KB | TikTok Direct Post |
| `HatirlaticiAjani.ts` | 5.3KB | Akıllı hatırlatıcı |
| `ReceteTahminAjani.ts` | 6.7KB | Reçete tahmin + maliyet |
| `SiparisBuyutucuAgent.ts` | 6.6KB | Sipariş büyütme (upsell) |
| `SatinalmaAjani.ts` | 7.7KB | Toptan satınalma |

---

## 6. Kütüphane Dosyaları (src/lib/ — 76 Dosya)

### Firebase & Auth
`firebaseAdmin.ts`, `apiGuard.ts`, `gcpAuthGuard.ts`, `sessionManager.ts`, `tokenSifreleme.ts`, `impersonation.ts`

### Mesajlaşma & İletişim
`twilioClient.ts`, `twilioProvisioning.ts`, `netgsmClient.ts`, `smsClient.ts`, `emailClient.ts`, `telegram.ts`

### Ödeme & Finans
`iyzicoClient.ts` (12KB), `iyzicoLinkClient.ts`, `finansAjani.ts`, `faturaUretici.ts`, `efatura.ts` (6KB), `fiyatlandirmaMotoru.ts`, `fiyatlandirmaKurallari.ts` (9KB)

### Cloudflare & Deploy
`cloudflare.ts`, `cloudflarePagesClient.ts` (5KB), `cloudflareRegistrar.ts` (13KB), `siteVersiyonlari.ts` (5KB)

### AI & İçerik
`geminiClient.ts`, `visionZeka.ts`, `aiUrunAsistani.ts` (8KB), `otonomCmoClient.ts` (12KB)

### CRM & Müşteri
`musteriAjani.ts`, `musteriCRM.ts` (5KB), `rfmSegmentasyon.ts` (6KB), `rfmConfig.ts`, `sadakatProgrami.ts` (6KB)

### E-Ticaret & Stok
`magazaDB.ts` (13KB), `stokMotoru.ts` (11KB), `stokYonetici.ts` (7KB), `stokZekasi.ts` (5KB), `urunImportExport.ts` (18KB), `dijitalUrun.ts` (5KB), `kargoAdapter.ts` (11KB), `kuponMotoru.ts` (6KB), `terkSepetKurtarma.ts` (7KB), `googleMerchant.ts` (8KB)

### Restoran Sistemi
`restoran/tipler.ts` (9KB), `restoran/utils.ts` (3KB), `restoran/MasaTypes.ts` (7KB), `restoran/b2bTipler.ts` (5KB), `garsonDispatcher.ts` (9KB)

### Emlak Sistemi
`emlak/EmlakTypes.ts` (18KB), `emlak/degerlemMotoru.ts` (8KB), `emlak/ilanSendikasyonu.ts` (13KB), `emlak/musteriEslestirme.ts` (11KB)

### Reklam & Analytics
`metaAds.ts` (9KB), `metaAdsClient.ts` (8KB), `metaGraphClient.ts`, `googleAdsClient.ts` (5KB), `googleBusinessClient.ts`, `gmbClient.ts`, `instagramScraper.ts`, `analitiMotoru.ts` (4KB), `kpiHesaplayici.ts` (8KB)

### Altyapı & Güvenlik
`rateLimiter.ts`, `errorHandler.ts`, `circuitBreaker.ts` (5KB), `fetchWithRetry.ts` (5KB), `idempotency.ts`, `islemKuyrugu.ts`, `cloudTasksClient.ts`, `alertLogger.ts` (4KB), `fraudDetection.ts` (7KB), `zodSemalar.ts` (13KB)

### Diğer
`esnafHafiza.ts`, `esnafAgi.ts`, `kolektifZeka.ts` (8KB), `sesTranscript.ts`, `vapiClient.ts`, `utils.ts`

---

## 7. Utility Dosyaları (src/utils/ — 36 Dosya)

| Dosya | Boyut | Açıklama |
|-------|-------|----------|
| `demoHtmlUretici.ts` | **59KB** | 34 sektör demo HTML üretici (3 kategori) |
| `siteUreticisi.ts` | 17KB | AI web sitesi üretim motoru |
| `icerikUretici.ts` | 13KB | İçerik üretim motoru |
| `paketSenaryosu.ts` | 8KB | Ödeme sonrası aktivasyon akışı |
| `kanalOrkestrasyonu.ts` | 8KB | Çoklu kanal mesaj dağıtımı |
| `kaliteKontrol.ts` | 7KB | İçerik kalite kontrol |
| `kampanyaMotoru.ts` | 7KB | Otomatik kampanya |
| `siteSablonlari.ts` | 6KB | Site şablon verileri |
| `quotaManager.ts` | 4KB | Paket kota kontrolü |
| `reklamPerformans.ts` | 4KB | Reklam performans |
| `gelirTahmini.ts` | 4KB | AI gelir tahmini |
| `iyzico.ts` | 4KB | İyzico yardımcılar |
| `abTest.ts` | 3KB | A/B test yönetimi |
| `dinamikFiyat.ts` | 3KB | Dinamik fiyat hesaplama |
| `beforeAfterUretici.ts` | 3KB | Görseller |
| `sesProfilegitici.ts` | 3KB | Ses profili |
| `lookalike.ts` | 3KB | Benzer hedef kitle |
| `esnafSaglik.ts` | 3KB | Dijital sağlık skoru |
| `tahsilatMotoru.ts` | 3KB | Tahsilat hatırlatma |
| `buyumeSkoru.ts` | 2KB | Büyüme metrikleri |
| `kampanyaPerformansHasatcisi.ts` | 2KB | Kampanya metrikleri |
| `icerikPerformansHasatcisi.ts` | 2KB | İçerik metrikleri |
| `itirazHasatcisi.ts` | 2KB | İtiraz analizi |
| `butceDanismani.ts` | 2KB | Bütçe optimizasyon |
| `yeniEsnafHizlandirici.ts` | 2KB | Yeni esnaf hızlandırıcı |
| `hrManager.ts` | 2KB | İK fonksiyonları |
| `platformZekasiPrompt.ts` | 2KB | Platform zekası prompt |
| `konusmaOzeti.ts` | 2KB | Konuşma özeti |
| `esnafAgi.ts` | 2KB | Esnaf ağı |
| `kapasiteAnaliz.ts` | 1KB | Kapasite analizi |
| `logger.ts` | 1KB | Ajan log kaydı |
| `churnHasatcisi.ts` | 1KB | Churn sinyali |
| `icerikUreticisi.ts` | 1KB | İçerik üretici (eski) |
| `anonimize.ts` | 1KB | KVKK anonimizasyon |
| `medyaOkuyucu.ts` | 1KB | Medya okuma |
| `slugUtils.ts` | 0.5KB | URL slug |

---

## 8. Bileşen Yapısı (50+ Bileşen)

### Landing Page Sections (14)
| Bileşen | Boyut | Açıklama |
|---------|-------|----------|
| `HeroSection.tsx` | 19KB | 3D tilt hero |
| `SablonMarket.tsx` | 29KB | Şablon market |
| `ModulMarket.tsx` | 24KB | Modül market |
| `PricingSection.tsx` | 15KB | 3D metalik fiyat kartları |
| `PowerFeaturesSection.tsx` | 16KB | The Closer + Sesli Asistan |
| `WebsiteShowcase.tsx` | 15KB | Website showcase |
| `FooterTrustSection.tsx` | 10KB | Footer + güven |
| `FeaturesSection.tsx` | 8KB | Özellik kartları |
| `TestimonialsSection.tsx` | 8KB | Sosyal kanıt |
| `ProblemSolutionSection.tsx` | 6KB | Problem/çözüm |
| `SSSSection.tsx` | 6KB | SSS accordion |
| `SectorCarousel.tsx` | 5KB | Sektör karuseli |
| `TedarikSection.tsx` | 5KB | Tedarik ağı |
| `PartnersSection.tsx` | 4KB | Partner marquee |

### Layout (3)
`Navbar.tsx` (17KB, 4 gruplu mega dropdown), `AdminSidebar.tsx` (3KB), `CookieBanner.tsx` (3KB)

### UI (10)
`Button.tsx`, `card.tsx`, `sonner.tsx`, `KopyalaButon.tsx`, `MetrikSkeleton.tsx`, `OfflineToast.tsx`, `BentoGrid.tsx`, `DashboardMockup.tsx` (5KB), `PricingCard.tsx` (4KB), `WhatsAppMockup.tsx` (7KB)

### Onboarding (2)
`OnboardingWizard.tsx` (**70KB** — 9 adımlı kayıt sihirbazı), `RenkPaletiSecici.tsx` (5KB)

### Dashboard (6)
`AiRoiChart.tsx` (6KB), `OmnichannelPieChart.tsx` (4KB), `SentimentTrendLine.tsx` (5KB), `PaletDegistir.tsx` (6KB), `GamificationWidget.tsx` (3KB), `VersiyonGecmisi.tsx` (11KB)

### Admin (5)
`AdminCharts.tsx`, `ChurnAlarm.tsx`, `InfraSummary.tsx`, `KPIBar.tsx`, `SystemLogs.tsx`

### Restoran (4)
`AlmanUsuluHesap.tsx` (10KB), `BahsisBilesen.tsx` (7KB), `CanliTakipPanel.tsx` (10KB), `UpsellBottomSheet.tsx` (6KB)

### B2B (3)
`B2BKilitEkrani.tsx`, `SiparisKarti.tsx`, `ToptanciKarti.tsx`

### Landing (2)
`MegaNavbar.tsx` (9KB), `PartnersSection.tsx` (4KB)

### Diğer
`Analytics.tsx`, `PageTransition.tsx`, `PushPermissionModal.tsx` (9KB), `ThemeProvider.tsx`, `ThemeToggle.tsx`

---

## 9. Data Dosyaları

### Çekirdek Veriler
| Dosya | Boyut | İçerik |
|-------|-------|--------|
| `moduller.ts` | **190KB** | 72 modül tanımı + HTML şablonları |
| `sektorler.ts` | 63KB | 28 sektör detaylı veri |
| `sektorKatalogu.ts` | 35KB | Sektör katalog |
| `demoIcerikleri.ts` | 34KB | Demo içerik verileri |
| `demoVitrinData.ts` | 18KB | Demo vitrin görsel/açıklama |
| `temalar.ts` | 9KB | Tema tanımları |
| `renkPaletleri.ts` | 8KB | Renk paleti seçenekleri |
| `sektorlerServer.ts` | 4KB | Server-side sektör yardımcıları |
| `sezonlar.ts` | 4KB | Mevsimsel veriler |
| `paketler.ts` | 3KB | 5 paket tanımı |
| `partners.ts` | 2KB | 8 çözüm ortağı |

### Sektörel Know-How (Reçeteler — 9 Grup)
`data/sektorel_knowhow/` altında restoran sektörüne özel reçete modülleri:
- `master_receteler.ts` (36KB) — Ana reçete havuzu
- `grup1_fastfood_receteler.ts` (43KB) — Fast food
- `grup2_kebap_receteler.ts` (41KB) — Kebap
- `grup3_kafe_receteler.ts` (35KB) — Kafe
- `grup4_tatli_receteler.ts` (37KB) — Tatlı
- `grup5_pizza_pasta_receteler.ts` (39KB) — Pizza/Pasta
- `grup6_ev_yemekleri_receteler.ts` (42KB) — Ev yemekleri
- `grup7_salata_meze_deniz_receteler.ts` (39KB) — Salata/Meze/Deniz
- `grup8_kahvalti_alkol_receteler.ts` (29KB) — Kahvaltı/Alkol

### Şablon Dosyaları (21 şablon)
`data/sablonlar/` altında paket ve sektör bazlı şablonlar:
- **Paket bazlı:** `temel.ts`, `standart.ts`, `buyume.ts`, `premium.ts`, `ortak.ts`, `index.ts`
- **Sektör bazlı (15):** restoran, güzellik, sağlık, hukuk, eğitim, e-ticaret, hizmet, inşaat, kurumsal, market, otel, otomotiv, spor, ajans, vitrin

---

## 10. Paket Sistemi

### 5 Paket
| Paket | Aylık | Yıllık/Ay | AI Kredi | Teknoloji |
|-------|-------|-----------|----------|-----------|
| TEMEL | ₺399 | ₺339 | 100/ay | Statik HTML |
| STANDART | ₺799 | ₺679 | 250/ay | Statik HTML |
| BÜYÜME | ₺1.499 | ₺1.274 | 750/ay | Next.js Dinamik |
| PREMIUM | ₺2.999 | ₺2.549 | 2.000/ay | 3D & Parallax |
| PREMIUM PLUS | ₺4.499 | ₺3.824 | 5.000/ay | Özel 3D Matrix |

---

## 11. Ödeme Akışı

```
Kullanıcı → /onboarding → Paket seç → /odeme
  → POST /api/payment/create
  → İyzico 3D Secure formu açılır
  → Banka doğrulama
  → POST /api/payment/callback
  → paketSenaryosuCalistir(esnafId, paket, odemeId)
    → Firestore: durum='aktif', paket=..., aktifModuller=[...]
    → AI web sitesi üretimi (fire-and-forget)
    → WhatsApp hoşgeldin mesajı
    → Hoşgeldin e-postası
    → Telegram operatör bildirimi
    → PREMIUM: Domain hediye akışı
  → Redirect: /odeme/basarili
```

---

## 12. Tasarım Sistemi

### Renkler (Tailwind Custom Tokens)
| Token | Kullanım |
|-------|----------|
| `ink` | Koyu arka plan |
| `cream` | Açık metin |
| `rust` | CTA butonları, vurgu |
| `stone` | İkincil metin |
| `dgray` | Kart arka planı |
| `warm` | Hover efektleri |
| `sage` | Başarı durumu |
| `steel` | Bilgi |
| `gold` | Premium vurgu |

### Fontlar
- **Syne**: Başlıklar (font-syne)
- **Inter + Plus Jakarta Sans**: Gövde metni

### 3D / Animasyon Deseni
- Framer Motion `perspective`, `rotateX/Y` tilt efektleri
- Glassmorphism (backdrop-blur-xl, bg-white/5, border-white/10)
- Metalik gradient kartlar (bronz/gümüş/altın)
- Scroll-triggered entrance animations

---

## 13. Deployment

### Docker + Cloud Run
`Dockerfile` + `cloudbuild.yaml` ile Google Cloud Build tetiklenir.

### Vercel (Cron Jobs)
`vercel.json` ile zamanlanan cron görevleri.

### Cloudflare Pages (Esnaf Siteleri)
Her esnaf için ayrı Cloudflare Pages projesi. Subdomain: `isletme.kepenk.ai`. Premium: Custom domain.

---

## 14. SEO
- `robots.ts` — robots.txt oluşturucu
- `sitemap.ts` — 100+ URL dinamik sitemap
- `(seo)/[sektor]/page.tsx` — 28 sektör × ilçeler = 400+ SEO sayfası
- Open Graph + Twitter Card metadata

---

## 15. PWA
- `public/sw.js` — Service Worker
- `public/offline.html` — Çevrimdışı sayfası
- `OfflineToast.tsx` — Çevrimdışı bildirimi
- `PushPermissionModal.tsx` — Push notification izni

---

## 16. Ortam Değişkenleri
```env
# Firebase
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=

# İyzico
IYZICO_API_KEY=
IYZICO_SECRET_KEY=
IYZICO_BASE_URL=

# Google AI (ADK + Gemini)
GOOGLE_API_KEY=
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=

# Cloudflare
CF_PAGES_TOKEN=
CF_ACCOUNT_ID=

# Meta
META_ACCESS_TOKEN=
META_APP_SECRET=

# Telegram
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# VAPI (Sesli AI)
VAPI_API_KEY=

# NetGSM
NETGSM_USERCODE=
NETGSM_PASSWORD=

# App
NEXT_PUBLIC_APP_URL=
ADMIN_PASSWORD=
CRON_SECRET=
```

---

## 17. Sprint Geçmişi (Son Revizyonlar)

| Sprint | Tarih | Özet |
|--------|-------|------|
| 1 | 2026-03-11 | Preview kartları, şablon redesign, Hero 3D tilt, metalik fiyatlama kartları |
| 2 | 2026-03-11 | İç sayfalar 3D revizyonu (Sektörler, Hakkımızda) |
| 3 | 2026-03-11 | Özgün şablon tasarımları, partner marquee, 4 dropdown navbar |
| 4 | 2026-03-11 | Modül varyantları, toggle mekanizması |
| 5 | 2026-03-11 | Freemium akış (ücretsiz editör + deploy paywall) |
| 6 | 2026-03-11 | Onboarding 3D glassmorphism revizyonu |
| 7 | 2026-03-12 | Dashboard + Editör glassmorphism |
| 8 | 2026-03-12 | Dinamik tema, 3D entegrasyon, scroll animasyonları |
| 9 | 2026-03-12 | Ortak kalıpları yıkma: Yerel Esnaf, Profesyonel, Sağlık kategorileri için benzersiz HTML/CSS |
| 10 | 2026-03-12 | Fonksiyonel demolar: modal, smooth scroll, WhatsApp widget, hamburger menü |
| 11 | 2026-03-12 | Gap Analysis düzeltmeleri: demo lead API, SSE inbox, FCM push backend |
| 12 | 2026-03-12 | Kolektif öğrenme otonom prompt, iframe postMessage, Google API rate tiers, e-fatura Paraşüt, kargo real API |
| 13 | 2026-03-13 | Vitest test altyapısı: 14 test dosyası, 171 test (rateLimiter, efatura, kargo, JWT, circuitBreaker, KVKK, slug, apiGuard, paketler, kaliteKontrol, agentRunner, sesProfili, demoHTML, leadForm API) |

---

## 18. Eksik ve Yarım Kalan Özellikler (Gap Analysis)

### ✅ Tamamı Çözüldü

| # | Eksiklik | Çözüm |
|---|----------|-------|
| 1 | ~~OTP Depolama~~ | `sessionManager.ts` → Firestore `otp_sessions` + JWT HttpOnly cookie |
| 2 | ~~Demo Lead Formları~~ | `DEMO_SCRIPT` → `/api/lead/demo-form` + postMessage bridge |
| 3 | ~~Ödeme → Kota~~ | `quotaManager.ts` → Firestore `runTransaction` atomic |
| 4 | ~~A2A Haberleşme~~ | `/api/a2a/route.ts` → JSON-RPC 2.0 + OrchestratorAgent |
| 5 | ~~Gerçek Zamanlı Inbox~~ | `konusmalar/page.tsx` → SSE `EventSource` listener |
| 6 | ~~Push Notification~~ | `pushGonder.ts` → FCM v1 + `cron/morning-message` |
| 7 | ~~Kolektif Öğrenme~~ | Cron → `platform_insights/{sektor}` yazıyor, `agentRunner.ts` Faz 44 otonom enjeksiyon |
| 8 | ~~Modül HTML~~ | `moduller.ts` tarandı — "YAKINDA" etiketi bulunamadı, tüm modüller HTML'li |
| 9 | ~~Iframe Sandbox~~ | `DEMO_SCRIPT` → `postMessage` + `DemoCard.tsx` listener |
| 10 | ~~Google API Rate Limits~~ | `rateLimiter.ts` → `gemini_api`, `google_ads`, `google_gmb` tier'leri |
| 11 | ~~E-fatura GİB~~ | `efatura.ts` → Paraşüt OAuth2 + E-Arşiv API (env-based, mock fallback) |
| 12 | ~~Kargo Entegrasyonu~~ | `kargoAdapter.ts` → Yurtiçi `isReal` getter + env-based real API |

---

## 19. Test Altyapısı

**Framework:** Vitest 4.1.0 + @vitejs/plugin-react 6.0.0  
**Komut:** `pnpm test` (apps/web) | `pnpm test:watch` (watch mode)  
**Config:** `apps/web/vitest.config.ts` — path alias `@/` → `./src/`

### Test Dosyaları (14 dosya, 171 test)

| Dosya | Test | Kapsam |
|-------|------|--------|
| `rateLimiter.test.ts` | 9 | Token bucket, tüm tier'ler (public, ai, gemini, ads, gmb), cost, retryAfter |
| `efatura.test.ts` | 7 | KDV hesaplama %1/%8/%18/%20, miktar 0, kuruş yuvarlama |
| `kargoAdapter.test.ts` | 11 | 4 adapter registry, mock fiyat, gönderi oluşturma, aggregate sıralama |
| `sessionManager.test.ts` | 8 | JWT oluştur/doğrula, token manipülasyonu reddi, farklı secret, roundtrip |
| `circuitBreaker.test.ts` | 17 | CLOSED→OPEN→HALF_OPEN state machine, hata eşiği, özel config, HTTP status |
| `anonimize.test.ts` | 13 | KVKK — ad/işletme, telefon (+90, 05xx, formatlı), e-posta, null edge |
| `slugUtils.test.ts` | 11 | Türkçe karakter (ğüşıöç), 30 char limit, özel karakter, boş input |
| `apiGuard.test.ts` | 13 | 3 auth modu (cron, admin, ADK), çoklu guard, eksik/geçersiz token |
| `paketler.test.ts` | 16 | 5 paket integrity, fiyat sıralaması, indirim, kota, backward compat |
| `kaliteKontrol.test.ts` | 16 | 12-madde HTML QA: lorem ipsum, img alt, responsive, z-index, overlay |
| `agentRunner.test.ts` | 27 | 18 ajan promptu yapısal: fiyat bilgisi, yönlendirme, SPIN, puanlama |
| `sesProfili.test.ts` | 10 | Ses profili prompt, null/boş profil, eksik alanlar, KURAL blokları |
| `demoHtmlUretici.test.ts` | 8 | DEMO_SCRIPT: submitForm, postMessage, fetch, modal, FormData |
| `demoLeadForm.test.ts` | 5 | API route: başarılı kayıt, telefon validasyonu, CORS OPTIONS |

### Mock Yardımcıları

| Dosya | Açıklama |
|-------|----------|
| `__tests__/helpers/mockFirestore.ts` | In-memory Firestore mock (collection/doc/get/set/runTransaction) |

---

## 20. Proje İstatistikleri

| Metrik | Değer |
|--------|-------|
| Toplam Kaynak Dosya | 300+ |
| API Route Klasörü | 46 |
| API Endpoint (tahmini) | 80+ |
| Sayfa | 40+ |
| Çekirdek AI Ajan | 21 |
| ADK Otonom Modül | 11 |
| Cron Job | 26 |
| Kütüphane (lib) | 76 |
| Utility | 36 |
| React Bileşen | 50+ |
| **Test Dosyası** | **14** |
| **Toplam Test** | **171** |
| Landing Section | 14 |
| Sektör | 28 |
| Demo Vitrin | 34 sektör |
| Site Şablonu | 21 |
| Reçete Know-How Grubu | 9 |
| Modül | 72 |
| Paket | 5 |
| Çözüm Ortağı | 8 |
