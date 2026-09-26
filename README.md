# kepenk.ai

Türk esnafı için yapay zeka destekli SaaS web platformu. AI ajanları, site oluşturucu, CRM, e-ticaret modülleri ve sürükle-bırak editör ile küçük işletmelere dijital dönüşüm sağlar.

> **Geliştirici:** Yusuf Ziya Terzioğlu

---

## 🏗 Mimari

```
kepenk.ai/
├── apps/
│   ├── web/              # Next.js 16 Frontend (React, TypeScript)
│   └── sites/            # Esnaf siteleri (dinamik subdomain)
├── packages/
│   ├── @kepenk/agents    # ADK AI Ajanları
│   ├── @kepenk/db        # Veritabanı modülleri
│   ├── @kepenk/ui        # Ortak UI bileşenleri
│   ├── @kepenk/config    # Paylaşılan yapılandırma
│   ├── @kepenk/cloudflare # DNS yönetimi
│   └── @kepenk/shared    # Paylaşılan yardımcılar
├── Dockerfile            # Cloud Run konteyner
├── cloudbuild.yaml       # GCP CI/CD pipeline
└── pnpm-lock.yaml        # Bağımlılık kilidi
```

## ⚙️ Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS + CSS Custom Properties |
| **Auth** | Kepenk Core BFF + Supabase; Firebase Auth staging'de provision edilmedi |
| **Backend** | Next.js API Routes, NestJS (mikro servisler) |
| **AI** | Google ADK (Agent Development Kit) |
| **Veritabanı** | Supabase/Randevu canonical domain + Firestore projection/cache |
| **Ödeme** | iyzico (iyzipay) |
| **SMS** | Netgsm |
| **E-posta** | Twilio |
| **CDN/DNS** | Cloudflare |
| **Hosting** | Google Cloud Run (europe-west3) |
| **CI/CD** | GitHub/Depot CI + manuel Cloud Build no-traffic canary (WIF bekliyor) |
| **Registry** | GCP Artifact Registry |

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 20+
- pnpm 8+

### Kurulum

```bash
# Depoyu klonla
git clone https://github.com/kepenkai/kepenk-ai.git
cd kepenk-ai

# Bağımlılıkları yükle
pnpm install

# Ortam değişkenlerini ayarla
cp .env.example .env.local
# .env.local dosyasını düzenle

# Geliştirme sunucusunu başlat
pnpm dev
```

### Ortam Değişkenleri

```env
# Auth
AUTH_SECRET=your-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Google runtime / Firestore
FIREBASE_PROJECT_ID=cs-project-ljhot8la
GOOGLE_CLOUD_PROJECT=cs-project-ljhot8la
# Cloud Run uses ADC via kepenk-web-runtime; do not store Firebase Admin private keys.

# Ödeme
IYZIPAY_API_KEY=your-api-key
IYZIPAY_SECRET_KEY=your-secret-key

# SMS
NETGSM_USERCODE=your-usercode
NETGSM_PASSWORD=your-password

# DNS
CF_API_TOKEN=your-cloudflare-token
CF_ZONE_ID=your-zone-id

# Admin
ADMIN_SECRET_TOKEN=your-admin-token
```

## 📦 Modüller

### Dashboard (`manage.kepenk.ai`)
| Modül | Açıklama |
|-------|----------|
| **Ana Sayfa** | KPI kartları, öneri motoru, aktivite akışı |
| **Satış** | Sipariş yönetimi, ödeme takibi, sepet kurtarma |
| **Katalog** | Ürün, stok, kupon ve kategori yönetimi |
| **Blog** | AI destekli içerik üretimi ve yayınlama |
| **CMS** | Koleksiyon bazlı içerik yönetimi |
| **CRM** | Müşteri ilişkileri, segment analizi |
| **Gelen Kutusu** | Çok kanallı mesajlaşma (E-posta, WhatsApp, SMS) |
| **Pazarlama** | E-posta kampanyaları, şablon galeri |
| **AI Temsilciler** | Pazarlama + Görev yürütücü ajanlar |
| **Analizler** | Trafik, gelir, dönüşüm grafikleri |
| **Otomasyonlar** | Tetikleyici tabanlı iş akışları |
| **Ayarlar** | İşletme bilgisi, domain, roller, SEO |

### Site Editörü (`edit.kepenk.ai`)
- Sürükle-bırak bölüm editörü
- AI ile içerik üretimi
- Gerçek zamanlı önizleme
- Mobil uyumluluk kontrolleri
- Sektörel demo şablonları (7+)

### Site Oluşturucu (`/olustur`)
- 5 adımlı AI destekli form sihirbazı
- Şablon galerisi (arama, filtreleme, kategorizasyon)
- İlham verici şablon carousel

## 🌐 Subdomain Yapısı

| URL | Hedef |
|-----|-------|
| `kepenk.ai` | Ana sayfa (Landing) |
| `app.kepenk.ai` | Manage Dashboard |
| `manage.kepenk.ai` | Manage Dashboard |
| `edit.kepenk.ai` | Site Editörü |
| `{isletme}.kepenk.ai` | Esnaf sitesi |

## 🚢 Deploy

### Canonical staging canary

Staging is the private Cloud Run service `kepenk-web-staging` in
`cs-project-ljhot8la / europe-west3`. Production is not provisioned.

```bash
gcloud config set project cs-project-ljhot8la

gcloud builds submit \
  --project=cs-project-ljhot8la \
  --service-account=projects/cs-project-ljhot8la/serviceAccounts/kepenk-build@cs-project-ljhot8la.iam.gserviceaccount.com \
  --config=cloudbuild.yaml \
  --substitutions=_IMAGE_TAG="$(git rev-parse HEAD)" \
  .
```

`cloudbuild.yaml` builds and pushes
`europe-west3-docker.pkg.dev/cs-project-ljhot8la/kepenk/kepenk-web:<sha>`
and creates a tagged **no-traffic** revision of `kepenk-web-staging`.
It does not grant unauthenticated access or promote traffic.


## 📁 Proje Yapısı (Frontend)

```
apps/web/src/
├── app/
│   ├── page.tsx                    # Ana sayfa
│   ├── giris/                      # Giriş sayfası
│   ├── kayit/                      # Kayıt sayfası
│   ├── onboarding/                 # Yeni esnaf onboarding (4 adım)
│   ├── olustur/                    # AI site oluşturucu
│   ├── dashboard/
│   │   ├── manage/                 # 🎯 Ana dashboard
│   │   │   ├── components/         # Navbar, Sidebar
│   │   │   ├── kepenk-tokens.css   # Design system
│   │   │   ├── satis/              # Satış modülü
│   │   │   ├── katalog/            # Katalog modülü
│   │   │   ├── blog/               # Blog modülü
│   │   │   ├── crm/                # CRM modülü
│   │   │   └── ...                 # 15+ modül
│   │   └── sitem/
│   │       └── editor/             # Sürükle-bırak editör
│   ├── demolar/                    # 7 sektör demosu
│   ├── ozellikler/                 # Özellik sayfaları
│   └── api/                        # API routes
│       ├── auth/                   # Kimlik doğrulama
│       ├── esnaf/                  # Esnaf CRUD
│       ├── odeme/                  # Ödeme entegrasyonu
│       └── site/                   # Site yönetimi
├── components/                     # Paylaşılan bileşenler
├── lib/                            # İş mantığı servisleri
└── utils/                          # Yardımcı fonksiyonlar
```

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: yeni özellik eklendi'`)
4. Branch'i push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

### Commit Mesaj Formatı

```
feat: yeni özellik
fix: hata düzeltme
docs: dokümantasyon
style: stil değişikliği (çalışmayı etkilemez)
refactor: refaktöring
test: test ekleme
chore: genel bakım
```

## 📄 Lisans

Bu proje özel lisans altındadır. Tüm hakları saklıdır.

© 2026 kepenk.ai — Yusuf Ziya Terzioğlu
