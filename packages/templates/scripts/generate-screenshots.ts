import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Bu script dev-server'ın çalıştığı varsayılarak (http://localhost:3000) çalıştırılır.
const THEMES = [
  { id: 'tesisatci-su', sector: 'tesisatci' },
  { id: 'tesisatci-kombi', sector: 'tesisatci' },
  { id: 'tesisatci-kalorifer', sector: 'tesisatci' },
  { id: 'tesisatci-dogalgaz', sector: 'tesisatci' },
  { id: 'tesisatci-lux', sector: 'tesisatci' }
];

const BASE_URL = 'http://localhost:3000/demolar';
const OUT_DIR = path.join(__dirname, '../../../../apps/web/public/templates');

async function run() {
  console.log('🚀 Otomatik screenshot alma işlemi başlıyor...');
  const browser = await puppeteer.launch({ headless: true });
  
  for (const theme of THEMES) {
    const url = `${BASE_URL}/${theme.id}`;
    const targetDir = path.join(OUT_DIR, theme.sector);
    
    // Klasör yoksa oluştur
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const page = await browser.newPage();
    console.log(`📸 Yükleniyor: ${url}`);
    
    try {
      // Sayfayı aç ve yüklenmesini bekle (networkidle0 Next.js dev server WebSocket'ine takılır)
      await page.goto(url, { waitUntil: 'load', timeout: 120000 });
      
      // Hook ve Fontların yüklenmesi için 10 saniye net bekle (ilk derleme yavaş olabilir)
      await new Promise(r => setTimeout(r, 10000));
      
      // Thumbnail (1280x960) çekimi
      await page.setViewport({ width: 1280, height: 960 });
      const thumbPath = path.join(targetDir, `${theme.id}-thumb.jpg`);
      await page.screenshot({ path: thumbPath, type: 'jpeg', quality: 90, clip: { x: 0, y: 0, width: 1280, height: 960 } });
      console.log(`   ✅ Thumbnail: ${thumbPath}`);

      // Fullpage çekimi
      // Gerçek yüksekliği hesapla
      const bodyHandle = await page.$('body');
      if (bodyHandle) {
        const boundingBox = await bodyHandle.boundingBox();
        if (boundingBox) {
          const height = Math.max(Math.ceil(boundingBox.height), 960);
          await page.setViewport({ width: 1280, height: height });
          // Scroll aşağı yukarı yapıp tembel yüklenen (lazy load) görselleri tetikleyelim
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await new Promise(r => setTimeout(r, 1000));
          await page.evaluate(() => window.scrollTo(0, 0));
          await new Promise(r => setTimeout(r, 1000));

          const previewPath = path.join(targetDir, `${theme.id}-preview.jpg`);
          await page.screenshot({ path: previewPath, type: 'jpeg', quality: 80, fullPage: true });
          console.log(`   ✅ Fullpage: ${previewPath}`);
        }
      }
    } catch (err) {
      console.error(`❌ Hata (${theme.id}):`, err);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('🎉 Tüm screenshotlar başarıyla oluşturuldu!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
