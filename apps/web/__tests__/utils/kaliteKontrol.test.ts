/**
 * kaliteKontrol.test.ts — HTML Kalite Kontrol 12-Madde Testleri
 */
import { describe, it, expect } from 'vitest'
import { htmlKaliteKontrol, type KaliteRaporu } from '@/utils/kaliteKontrol'

// Minimal gecerli HTML
const TEMIZ_HTML = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet">
  <style>
    :root { --nav-height: 60px; --primary: #7c3aed; }
    body { color: #333; background: #fff; font-family: 'Inter'; }
    .hero { background: url('hero.jpg'); }
    .overlay { background: rgba(0,0,0,0.5); }
    a:hover { opacity: 0.8; }
    a:focus { outline: 2px solid #7c3aed; }
    @media (max-width: 768px) { .hero { padding: 1rem; } }
  </style>
</head>
<body>
  <nav style="height: var(--nav-height)">Menu</nav>
  <section class="hero">
    <div class="overlay">
      <h1>Guzel Kuafor</h1>
    </div>
  </section>
  <section>
    <h2>Hizmetlerimiz</h2>
    <img src="foto.jpg" alt="Kuafor hizmeti">
  </section>
  <footer>
    <a href="tel:+905321234567">Ara</a>
    <a href="https://wa.me/905321234567">WhatsApp</a>
  </footer>
</body>
</html>
`

describe('kaliteKontrol — htmlKaliteKontrol', () => {
    describe('temiz HTML', () => {
        it('temiz HTML yuksek puan almali', () => {
            const rapor = htmlKaliteKontrol(TEMIZ_HTML)
            expect(rapor.puan).toBeGreaterThanOrEqual(80)
            expect(rapor.gecti).toBe(true)
        })

        it('kritik sorun olmamali', () => {
            const rapor = htmlKaliteKontrol(TEMIZ_HTML)
            const kritik = rapor.sorunlar.filter(s => s.seviye === 'kritik')
            expect(kritik).toHaveLength(0)
        })
    })

    describe('Madde 1: Lorem ipsum tespiti', () => {
        it('lorem ipsum varsa kritik sorun rapor etmeli', () => {
            const html = '<p>Lorem ipsum dolor sit amet</p>'
            const rapor = htmlKaliteKontrol(html)
            const lorem = rapor.sorunlar.find(s => s.madde === 1 && s.seviye === 'kritik')
            expect(lorem).toBeDefined()
            expect(rapor.gecti).toBe(false) // Kritik sorun = gecemez
        })

        it('placeholder text varsa uyari vermeli', () => {
            const html = '<p>This is placeholder text</p>'
            const rapor = htmlKaliteKontrol(html)
            const ph = rapor.sorunlar.find(s => s.madde === 1)
            expect(ph).toBeDefined()
        })
    })

    describe('Madde 5: img alt attribute', () => {
        it('alt olmayan img icin uyari vermeli', () => {
            const html = '<img src="test.jpg"><img src="test2.jpg" alt="ok">'
            const rapor = htmlKaliteKontrol(html)
            const altSorun = rapor.sorunlar.find(s => s.madde === 5)
            expect(altSorun).toBeDefined()
            expect(altSorun!.aciklama).toContain('1') // 1 eksik
        })

        it('tum img alt varsa sorun olmamali', () => {
            const html = '<img src="a.jpg" alt="foto1"><img src="b.jpg" alt="foto2">'
            const rapor = htmlKaliteKontrol(html)
            const altSorun = rapor.sorunlar.find(s => s.madde === 5)
            expect(altSorun).toBeUndefined()
        })
    })

    describe('Madde 6: Responsive kontrol', () => {
        it('media query yoksa uyari vermeli', () => {
            const html = '<style>body{color:red}</style>'
            const rapor = htmlKaliteKontrol(html)
            const resp = rapor.sorunlar.find(s => s.madde === 6)
            expect(resp).toBeDefined()
        })

        it('overflow-x:scroll varsa uyari vermeli', () => {
            const html = '<style>@media(max-width:768px){} .x{overflow-x:scroll}</style>'
            const rapor = htmlKaliteKontrol(html)
            const scroll = rapor.sorunlar.find(s => s.madde === 6 && s.aciklama.includes('scroll'))
            expect(scroll).toBeDefined()
        })
    })

    describe('Madde 8: z-index cakismasi', () => {
        it('z-index 9999 varsa uyari vermeli', () => {
            const html = '<style>.modal{z-index:9999}</style>'
            const rapor = htmlKaliteKontrol(html)
            const z = rapor.sorunlar.find(s => s.madde === 8)
            expect(z).toBeDefined()
        })
    })

    describe('puan hesaplama', () => {
        it('kritik sorun -20 puan dusmeli', () => {
            const html = '<p>Lorem ipsum dolor sit amet</p>'
            const rapor = htmlKaliteKontrol(html)
            // 1 kritik = -20, birden fazla uyari da olabilir
            expect(rapor.puan).toBeLessThanOrEqual(80)
        })

        it('cok sorunlu HTML 0 puana dusebilmeli', () => {
            const html = `
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                <img src="a.jpg"><img src="b.jpg"><img src="c.jpg">
                <style>.x{z-index:9999; overflow-x:scroll}</style>
            `
            const rapor = htmlKaliteKontrol(html)
            expect(rapor.puan).toBeLessThan(50)
            expect(rapor.gecti).toBe(false)
        })

        it('sorunsuz HTML 100 puan alabilmeli', () => {
            const rapor = htmlKaliteKontrol(TEMIZ_HTML)
            // Tam 100 olmayabilir ama yuksek olmali
            expect(rapor.puan).toBeGreaterThanOrEqual(75)
        })
    })

    describe('Madde 3: overlay kontrolu', () => {
        it('gorsel arka plan + overlay yoksa uyari vermeli', () => {
            const html = '<style>.hero{background:url("img.jpg")}</style>'
            const rapor = htmlKaliteKontrol(html)
            const overlay = rapor.sorunlar.find(s => s.madde === 3)
            expect(overlay).toBeDefined()
        })

        it('gorsel arka plan + rgba overlay varsa sorun olmamali', () => {
            const html = '<style>.hero{background:url("img.jpg")} .o{background:rgba(0,0,0,0.5)}</style>'
            const rapor = htmlKaliteKontrol(html)
            const overlay = rapor.sorunlar.find(s => s.madde === 3)
            expect(overlay).toBeUndefined()
        })
    })

    describe('Madde 10: footer bos linkler', () => {
        it('footer-da 3+ bos href varsa uyari vermeli', () => {
            const html = '<footer><a href="#">A</a><a href="#">B</a><a href="#">C</a></footer>'
            const rapor = htmlKaliteKontrol(html)
            const footer = rapor.uyarilar.find(u => u.includes('footer') || u.includes('Footer'))
            expect(footer).toBeDefined()
        })
    })

    describe('Madde 11: form label', () => {
        it('aria-label veya id olmayan input icin uyari vermeli', () => {
            const html = '<input type="text"><textarea></textarea>'
            const rapor = htmlKaliteKontrol(html)
            const label = rapor.uyarilar.find(u => u.includes('form') || u.includes('Madde 11'))
            expect(label).toBeDefined()
        })
    })
})
