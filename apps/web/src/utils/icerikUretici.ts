/**
 * icerikUretici.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Gemini'ye sadece içerik JSON'ı ürettirir.
 * Token kullanımı: ~800-1200 token (eski ~16000 token yerine)
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { geminiCalistir } from '@/lib/geminiClient'
import { sektorProfiliBul } from '@/data/sektorKatalogu'

export interface HizmetItem {
    ad: string
    aciklama: string
    ikon: string
}

export interface NedenBizItem {
    baslik: string
    aciklama: string
    ikon: string
}

export interface YorumItem {
    yazar: string
    metin: string
    yildiz: number
    sure?: string
}

export interface SaatItem {
    gun: string
    acilis: string | null
    kapanis: string | null
}

export interface IstatistikItem {
    deger: number
    etiket: string
    ikon: string
}

export interface AdimItem {
    numara: number
    baslik: string
    aciklama: string
    ikon: string
}

export interface BlogItem {
    baslik: string
    ozet: string
    tarih: string
    etiket: string
    ikon: string
}

export interface HizmetSayfasi {
    ad: string
    aciklama: string
    detay?: string
}

export interface SiteIcerigi {
    heroBaslik: string
    heroSlogan: string
    heroCTABirincil: string
    heroCTAIkincil: string
    waMesaj: string
    hizmetler: HizmetItem[]
    nedenBiz: NedenBizItem[]
    kampanya?: { baslik: string; aciklama: string; indirim: string }
    saatler?: SaatItem[]
    istatistikler?: IstatistikItem[]
    adimlar?: AdimItem[]
    bloglar?: BlogItem[]
    ilanlar?: { pozisyon: string; tur: string; konum: string; aciklama: string }[]
    seoBaslik: string
    seoAciklama: string
    hikayeMetni?: string
    misyonMetni?: string
    duyuruMetni?: string
}

const ICERIK_SISTEM = `Sen kepenk.ai'nin üst düzey içerik yazarısın.
Türk esnafları için web sitesi içeriği üretiyorsun.
SADECE JSON çıktısı ver. Başka hiçbir şey yazma. JSON geçerli ve eksiksiz olmalı.

KRİTİK KURALLAR:
1. "Lorem ipsum" veya herhangi bir placeholder metin KESİNLİKLE YASAKTIR.
   Her metin, buton etiketi ve açıklama sektöre özgü, gerçekçi Türkçe içerik olmalı.
2. İşletme adını, sloganı ve lokasyonu başlıklara doğal şekilde entegre et.
3. Sayısal veriler (fiyat, istatistik, puan, yıl) sektörle tutarlı ve gerçekçi aralıklarda olmalı.
4. Tüm içerik SEO dostu, H1 benzersiz ve açıklayıcı olmalı.
5. Emoji kullanımı dolu ama dengeli — her hizmet/değer kartı için 1 ilgili emoji.
6. Müşteri yorumları gerçek kişi isimleri ve doğal dille yazılmalı; aşırı övgüden kaçın.
7. CTA metinleri sektöre uygun ve aksiyon odaklı olmalı (ör: "Randevu Al" vs "Teklif İste" vs "Hemen Ara").
8. Hizmet/ürün açıklamaları minimum 2 tam cümle içermeli.
9. Görsel URL'ķleri: https://source.unsplash.com/1200x700/?{{SEKTOR_EN}} formatında.
10. Avatarlar: https://i.pravatar.cc/80?u={{RASTGELE}} formatında.
11. Fiyatlar Türk Lirası (₺) cinsinden, KDV dahil.
12. Çalışma saatleri Türkiye saatine göre.`

export async function icerikUret(
    esnaf: any,
    yorumlar: { yazar: string; metin: string; yildiz: number }[],
    paket: string
): Promise<SiteIcerigi> {
    const ozelHizmetler: string[] = esnaf.sesProfili?.ozelHizmetler ?? []
    const hizmetMetni = ozelHizmetler.join(', ') || 'Profesyonel hizmetler'
    const ton = (esnaf.sesProfili?.kisilikTonu ?? 'samimi') as string
    const isBuyumeOrMore = ['BUYUME', 'PREMIUM', 'PREMIUMPLUS'].includes(paket?.toUpperCase())
    const isPremium = ['PREMIUM', 'PREMIUMPLUS'].includes(paket?.toUpperCase())

    // Sektör profili özel içerik notu
    const profil = sektorProfiliBul(esnaf.sektor || '')
    const ozelIcerikNotu = profil?.ozelIcerik || ''

    const tarlihMesaj = yorumlar.length > 0
        ? yorumlar.map(y => `- "${y.metin?.substring(0, 80)}" — ${y.yazar}`).join('\n')
        : 'Henüz yorum yok'

    const prompt = `
İŞLETME:
- Ad: ${esnaf.isletmeAdiTam || esnaf.ad}
- Sektör: ${esnaf.sektor}
- Lokasyon: ${esnaf.ilce}, ${esnaf.sehir}
- Hizmetler: ${hizmetMetni}
- Ton: ${ton}
- Rakipten fark: ${esnaf.sesProfili?.rakiptenFark ?? ''}
- Müşteri kitlesi: ${esnaf.sesProfili?.musterKitlesi ?? 'genel'}

MÜŞTERİ YORUMLARI:
${tarlihMesaj}

Şu JSON yapısını doldur. Tüm alanları ${esnaf.sektor} sektörüne uygun, gerçekçi ve özgün içerikle doldur.
Ton: ${ton === 'samimi' ? 'sıcak ve doğal Türkçe, "biz" dili' : ton === 'resmi' ? 'kurumsal ve profesyonel' : ton === 'esprili' ? 'hafif esprili ama güvenilir' : ton === 'otoriter' ? 'güven veren, rakamlarla destekli' : 'sıcak ve samimi'}

{
  "heroBaslik": "Lokasyona özel, güçlü H1 başlık (örn: Kadıköy'ün En İyi Elektrikçisi)",
  "heroSlogan": "2-3 cümle, hizmet özeti ve fark",  
  "heroCTABirincil": "Sektöre uygun CTA (örn: Hemen Ara / Randevu Al / Teklif Al)",
  "heroCTAIkincil": "WhatsApp CTA metni",
  "waMesaj": "URL-encoded WhatsApp mesajı",
  "hizmetler": [
    {"ad":"hizmet adı","aciklama":"1-2 cümle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 cümle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 cümle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 cümle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 cümle","ikon":"emoji"},
    {"ad":"hizmet adı","aciklama":"1-2 cümle","ikon":"emoji"}
  ],
  "nedenBiz": [
    {"baslik":"kısa başlık","aciklama":"1 cümle","ikon":"emoji"},
    {"baslik":"kısa başlık","aciklama":"1 cümle","ikon":"emoji"},
    {"baslik":"kısa başlık","aciklama":"1 cümle","ikon":"emoji"},
    {"baslik":"kısa başlık","aciklama":"1 cümle","ikon":"emoji"}
  ],
  "kampanya": {"baslik":"kampanya adı","aciklama":"detay","indirim":"%20"},
  "saatler": [
    {"gun":"Pazartesi","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Salı","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Çarşamba","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Perşembe","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Cuma","acilis":"09:00","kapanis":"18:00"},
    {"gun":"Cumartesi","acilis":"10:00","kapanis":"15:00"},
    {"gun":"Pazar","acilis":null,"kapanis":null}
  ],
  ${isBuyumeOrMore ? `
  "istatistikler": [
    {"deger":500,"etiket":"Mutlu Müşteri","ikon":"👥"},
    {"deger":10,"etiket":"Yıl Tecrübe","ikon":"🏆"},
    {"deger":1000,"etiket":"Tamamlanan İş","ikon":"✅"},
    {"deger":98,"etiket":"Memnuniyet %","ikon":"⭐"}
  ],
  "adimlar": [
    {"numara":1,"baslik":"İletişim","aciklama":"bize ulaşın","ikon":"📞"},
    {"numara":2,"baslik":"Keşif","aciklama":"ücretsiz değerlendirme","ikon":"🔍"},
    {"numara":3,"baslik":"Uygulama","aciklama":"profesyonel hizmet","ikon":"🔧"},
    {"numara":4,"baslik":"Teslim","aciklama":"garantili sonuç","ikon":"✅"}
  ],
  "bloglar": [
    {"baslik":"SEO dostu blog başlığı","ozet":"2 cümle özet","tarih":"10 Mart 2026","etiket":"Rehber","ikon":"📖"},
    {"baslik":"SEO dostu blog başlığı","ozet":"2 cümle özet","tarih":"5 Mart 2026","etiket":"Haber","ikon":"📰"},
    {"baslik":"SEO dostu blog başlığı","ozet":"2 cümle özet","tarih":"1 Mart 2026","etiket":"İpucu","ikon":"💡"}
  ],
  "hikayeMetni": "İşletmenin kuruluş hikayesi, 3-4 cümle",
  "misyonMetni": "Misyon cümlesi",
  "duyuruMetni": "Güncel duyuru veya kampanya mesajı",
  ` : '"istatistikler":[],"adimlar":[],"bloglar":[],"duyuruMetni":"",'}
  ${isPremium ? `
  "ilanlar": [
    {"pozisyon":"pozisyon adı","tur":"Tam Zamanlı","konum":"${esnaf.ilce}","aciklama":"kısa açıklama"},
    {"pozisyon":"pozisyon adı","tur":"Part-time","konum":"${esnaf.ilce}","aciklama":"kısa açıklama"}
  ],
  ` : '"ilanlar":[],'}
  "seoBaslik": "${esnaf.isletmeAdiTam || esnaf.ad} | ${esnaf.sektor} ${esnaf.ilce}",
  "seoAciklama": "150 karakter SEO açıklaması"
}

KURALLAR:
- Gerçekçi ve sektöre özgü içerik üret (Lorem ipsum YASAK)
- Her hizmet ${esnaf.sektor} sektörüne ait olsun
- Lokasyonu (${esnaf.ilce}) başlıklara dahil et
- Emoji'leri bol kullan
- JSON dışında hiçbir şey yazma
${ozelIcerikNotu ? `
SEKTÖRE ÖZEL NOT:
${ozelIcerikNotu}` : ''}
`

    const raw = await geminiCalistir(
        'gemini-3-flash-preview',   // Hızlı ve ucuz model — sadece JSON
        ICERIK_SISTEM,
        prompt,
        { thinkingLevel: 'low', maxOutputTokens: 4096 }
    )

    // JSON'ı temizle ve parse et
    const jsonStr = raw
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()

    try {
        return JSON.parse(jsonStr) as SiteIcerigi
    } catch {
        console.error('[İÇERİK ÜRETİCİ] JSON parse hatası, fallback kullanılıyor')
        // Fallback: minimal içerik
        return {
            heroBaslik: `${esnaf.ilce}'nin ${esnaf.sektor} Uzmanı`,
            heroSlogan: `${ozelHizmetler.slice(0, 3).join(', ')} hizmetlerinde uzman ekibimizle yanınızdayız.`,
            heroCTABirincil: 'Hemen Ara',
            heroCTAIkincil: 'WhatsApp\'tan Yaz',
            waMesaj: 'Merhaba%2C%20bilgi%20almak%20istiyorum',
            hizmetler: ozelHizmetler.slice(0, 6).map(h => ({
                ad: h, aciklama: 'Profesyonel hizmet', ikon: '⭐'
            })),
            nedenBiz: [
                { baslik: 'Güvenilir', aciklama: 'Yıllardır aynı kalite', ikon: '🏆' },
                { baslik: 'Hızlı', aciklama: '7/24 ulaşılabilir', ikon: '⚡' },
                { baslik: 'Uygun Fiyat', aciklama: 'Şeffaf fiyatlandırma', ikon: '💰' },
                { baslik: 'Garantili', aciklama: 'Sonuçlarımız garantili', ikon: '✅' },
            ],
            saatler: [
                { gun: 'Pazartesi', acilis: '09:00', kapanis: '18:00' },
                { gun: 'Salı', acilis: '09:00', kapanis: '18:00' },
                { gun: 'Çarşamba', acilis: '09:00', kapanis: '18:00' },
                { gun: 'Perşembe', acilis: '09:00', kapanis: '18:00' },
                { gun: 'Cuma', acilis: '09:00', kapanis: '18:00' },
                { gun: 'Cumartesi', acilis: '10:00', kapanis: '15:00' },
                { gun: 'Pazar', acilis: null, kapanis: null },
            ],
            istatistikler: [],
            adimlar: [],
            bloglar: [],
            ilanlar: [],
            seoBaslik: `${esnaf.isletmeAdiTam || esnaf.ad} | ${esnaf.sektor} ${esnaf.ilce}`,
            seoAciklama: `${esnaf.ilce}'de ${esnaf.sektor} hizmetleri. ${esnaf.isletmeAdiTam || esnaf.ad} - Güvenilir ve hızlı hizmet.`,
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML RENDER FONKSİYONLARI (İçerik JSON → HTML parçaları)
// ─────────────────────────────────────────────────────────────────────────────

export function hizmetlerHtmlUret(hizmetler: HizmetItem[]): string {
    return hizmetler.map(h => `
<div class="kart" style="display:flex;flex-direction:column;gap:12px">
  <div style="font-size:2rem">${h.ikon}</div>
  <h3 style="font-size:1rem;font-weight:700;color:var(--renk-metin)">${h.ad}</h3>
  <p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6;flex:1">${h.aciklama}</p>
  <div style="height:2px;background:var(--renk-vurgu);width:32px;border-radius:1px;opacity:0.6"></div>
</div>`).join('')
}

export function nedenBizHtmlUret(nedenBiz: NedenBizItem[]): string {
    return nedenBiz.map(n => `
<div style="display:flex;gap:14px;align-items:flex-start;padding:16px;background:rgba(255,255,255,0.04);border-radius:14px;border:1px solid rgba(255,255,255,0.06)">
  <div style="width:42px;height:42px;border-radius:12px;background:var(--renk-vurgu);opacity:0.9;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${n.ikon}</div>
  <div>
    <h3 style="font-size:0.95rem;font-weight:700;color:var(--renk-metin);margin-bottom:4px">${n.baslik}</h3>
    <p style="color:var(--renk-alt);font-size:0.82rem;line-height:1.5">${n.aciklama}</p>
  </div>
</div>`).join('')
}

export function yorumlarHtmlUret(
    yorumlar: { yazar: string; metin?: string; yildiz: number; sure?: string }[]
): string {
    if (!yorumlar.length) return ''
    return yorumlar.map(y => `
<div class="kart" style="display:flex;flex-direction:column;gap:12px">
  <div style="display:flex;gap:2px">${'⭐'.repeat(Math.min(y.yildiz ?? 5, 5))}</div>
  <p style="color:var(--renk-metin);font-size:0.9rem;line-height:1.6;flex:1">"${y.metin ?? ''}${y.metin ? '"' : ''}</p>
  <div style="display:flex;justify-content:space-between;align-items:center">
    <span style="color:var(--renk-metin);font-weight:700;font-size:0.85rem">${y.yazar}</span>
    ${y.sure ? `<span style="color:var(--renk-alt);font-size:0.75rem">${y.sure}</span>` : ''}
  </div>
</div>`).join('')
}
