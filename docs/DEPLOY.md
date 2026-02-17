# Deploy

## Test ve build

```bash
npm run test    # 141 test
npm run build   # dist/ üretir
npm run preview # dist'i yerel sunar (http://localhost:4173 veya PORT)
```

## Vercel ile deploy

1. [vercel.com](https://vercel.com) hesabı açın, projeyi import edin (Git bağlayın veya `vercel` CLI).
2. Root directory: proje kökü. Build Command: `npm run build`. Output: `dist`.
3. Proje zaten `vercel.json` ile yapılandırıldı (SPA rewrite).
4. Ortam değişkenleri (isteğe bağlı): `API_KEY` (Gemini) — hassas anahtarları Vercel Environment’ta tanımlayın; uygulama ağırlıklı olarak tarayıcıda `localStorage` kullanır.

CLI ile:

```bash
npx vercel login
npx vercel        # preview
npx vercel --prod # production
```

Deploy sonrası ana sayfa ve `/leads`, `/mail` gibi sayfaların açıldığını kontrol edin (SPA asset yolları `base: '/'` ile ayarlı).

## Netlify

1. Netlify’da “Add new site” > “Import existing project”.
2. Build command: `npm run build`, Publish directory: `dist`.
3. “Redirects” ekleyin: `/* /index.html 200` (SPA).

## Statik sunucu (Node / nginx)

`dist/` klasörünü herhangi bir statik sunucuya kopyalayın. SPA için tüm route’lar `index.html`’e yönlendirilmeli.
