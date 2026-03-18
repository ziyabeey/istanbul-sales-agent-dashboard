/**
 * @kepenk/templates — P2+P3 Demo Business Data
 * 20 sectors × 5 businesses = 100 businesses
 */
import type { BusinessData } from '../types/section-types'

type BD = Partial<BusinessData>

// ═══ P2 SECTORS (10) ═══

export const PSIKOLOG_DEMOS: Record<string, BD> = {
  huzur: { name: 'Psikolog Elif Nur', ownerName: 'Psk. Elif Nur Kaya', slogan: 'Kendinizi dinlemeye başlayın', phone: '0532 400 11 22', phoneClean: '905324001122', address: 'Akarsu Sokak No:8, Cihangir', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0336, lng: 28.9840 }, sectorId: 'psikolog' },
  denge: { name: 'Denge Psikoloji', ownerName: 'Psk. Selin Aydın', slogan: 'Zihinsel dengeniz için', phone: '0216 340 33 44', phoneClean: '902163403344', address: 'Moda Cad. No:60, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9850, lng: 29.0280 }, sectorId: 'psikolog' },
  icgoru: { name: 'İçgörü Terapi Merkezi', ownerName: 'Dr. Psk. Ahmet Demir', slogan: 'İçe bakış, dışa dönüşüm', phone: '0212 230 55 66', phoneClean: '902122305566', address: 'Halaskargazi Cad. No:95, Şişli', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0555, lng: 28.9880 }, sectorId: 'psikolog' },
  bilinc: { name: 'Dr. Kerem Bilinç', ownerName: 'Dr. Kerem Bilinç', slogan: 'Bilinçli farkındalık', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Teşvikiye Cad. No:40, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'psikolog' },
  merkez: { name: 'PsikoMerkez Türkiye', ownerName: 'Dr. Canan Arslan', slogan: 'Online ve yüz yüze terapi ağı', phone: '0850 444 75 46', phoneClean: '908504447546', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'psikolog' },
}

export const FASTFOOD_DEMOS: Record<string, BD> = {
  lokma: { name: 'Lokma Dürüm', ownerName: 'Mustafa Koç', slogan: 'Dürümün ustası', phone: '0216 345 11 22', phoneClean: '902163451122', address: 'Bahariye Cad. No:45, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9899, lng: 29.0263 }, sectorId: 'fastfood' },
  kombo: { name: 'Kombo Burger', ownerName: 'Emre Şen', slogan: 'Kombola hayat!', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:20, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'fastfood' },
  ekspres: { name: 'Ekspres Pizza', ownerName: 'Ali Kara', slogan: '30 dakikada kapınızda', phone: '0212 570 55 66', phoneClean: '902125705566', address: 'İncirli Cad. No:50, Bakırköy', city: 'İstanbul', district: 'Bakırköy', coordinates: { lat: 40.9783, lng: 28.8715 }, sectorId: 'fastfood' },
  lezzet: { name: 'Lezzet Kitchen', ownerName: 'Can Arslan', slogan: 'Hızlı ama kaliteli', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Valikonağı Cad. No:15, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'fastfood' },
  franchise: { name: 'BurgerLab Franchise', ownerName: 'Tolga Yılmaz', slogan: 'Lab\'dan sofraya', phone: '0850 333 28 74', phoneClean: '908503332874', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'fastfood' },
}

export const BAR_DEMOS: Record<string, BD> = {
  kadeh: { name: 'Kadeh Meyhane', ownerName: 'Arif Usta', slogan: 'Mezenin en iyisi', phone: '0212 252 11 22', phoneClean: '902122521122', address: 'Nevizade Sokak No:5, Beyoğlu', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0335, lng: 28.9770 }, sectorId: 'bar' },
  kokteyl: { name: 'Kokteyl Bar 34', ownerName: 'Deniz Çelik', slogan: 'İstanbul\'un kokteyl adresi', phone: '0212 243 33 44', phoneClean: '902122433344', address: 'Kemankeş Cad. No:30, Karaköy', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0230, lng: 28.9770 }, sectorId: 'bar' },
  sahne: { name: 'Sahne Live Music', ownerName: 'Kaan Volkan', slogan: 'Her gece canlı sahne', phone: '0216 345 55 66', phoneClean: '902163455566', address: 'Kadife Sokak No:10, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9870, lng: 29.0265 }, sectorId: 'bar' },
  lounge: { name: 'Lounge No.7', ownerName: 'Cem Yalçın', slogan: 'Premium kokteyl deneyimi', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Abdi İpekçi Cad. No:7, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0493, lng: 28.9930 }, sectorId: 'bar' },
  zincir: { name: 'BarHouse Group', ownerName: 'Burak Kılıç', slogan: 'Her mahallede iyi zaman', phone: '0850 444 22 77', phoneClean: '908504442277', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'bar' },
}

export const TELEFON_DEMOS: Record<string, BD> = {
  ekran: { name: 'Ekran Doktoru', ownerName: 'Serkan Kaya', slogan: 'Ekranınız 15 dakikada yeni', phone: '0216 340 11 22', phoneClean: '902163401122', address: 'Bahariye Cad. No:80, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9899, lng: 29.0263 }, sectorId: 'telefon' },
  cip: { name: 'Çip Teknik Servis', ownerName: 'Murat Demir', slogan: 'Çip seviyesinde tamir', phone: '0216 450 33 44', phoneClean: '902164503344', address: 'Altunizade Mah. No:35, Üsküdar', city: 'İstanbul', district: 'Üsküdar', coordinates: { lat: 41.0233, lng: 29.0393 }, sectorId: 'telefon' },
  piksel: { name: 'Piksel Lab', ownerName: 'Emre Koç', slogan: 'Her marka, her model', phone: '0212 570 55 66', phoneClean: '902125705566', address: 'İncirli Cad. No:60, Bakırköy', city: 'İstanbul', district: 'Bakırköy', coordinates: { lat: 40.9783, lng: 28.8715 }, sectorId: 'telefon' },
  lab: { name: 'DataLab Recovery', ownerName: 'Dr. Ahmet Koç', slogan: 'Verileriniz güvende', phone: '0212 230 77 88', phoneClean: '902122307788', address: 'Halaskargazi Cad. No:140, Şişli', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0555, lng: 28.9880 }, sectorId: 'telefon' },
  servisplus: { name: 'ServisPlus Türkiye', ownerName: 'Tolga Arslan', slogan: 'Türkiye\'nin teknik servis ağı', phone: '0850 555 73 78', phoneClean: '908505557378', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'telefon' },
}

export const KLIMA_DEMOS: Record<string, BD> = {
  serinlik: { name: 'Serinlik Klima', ownerName: 'Hasan Usta', slogan: 'Serinliğin adresi', phone: '0216 345 11 22', phoneClean: '902163451122', address: 'Bağdat Cad. No:300, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9600, lng: 29.0700 }, sectorId: 'klima' },
  derece: { name: 'Derece Teknik', ownerName: 'Ali Demir', slogan: 'İdeal sıcaklık, her mevsim', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:45, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'klima' },
  iklim: { name: 'İklim Isıtma-Soğutma', ownerName: 'Burak Arslan', slogan: 'Isıtma-soğutma uzmanı', phone: '0216 570 55 66', phoneClean: '902165705566', address: 'Ataşehir Bulvarı No:70, Ataşehir', city: 'İstanbul', district: 'Ataşehir', coordinates: { lat: 40.9920, lng: 29.1145 }, sectorId: 'klima' },
  konfor: { name: 'Konfor HVAC Systems', ownerName: 'İbrahim Yılmaz', slogan: 'Endüstriyel klima çözümleri', phone: '0216 630 77 88', phoneClean: '902166307788', address: 'Alemdağ Cad. No:150, Ümraniye', city: 'İstanbul', district: 'Ümraniye', coordinates: { lat: 41.0300, lng: 29.1080 }, sectorId: 'klima' },
  termo: { name: 'TermoPlus Servis Grubu', ownerName: 'Kemal Tunç', slogan: 'Klima servis ağı', phone: '0850 444 83 76', phoneClean: '908504448376', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'klima' },
}

export const MIMARLIK_DEMOS: Record<string, BD> = {
  cizgi: { name: 'Çizgi Mimarlık', ownerName: 'Mimar Selin Ay', slogan: 'Her çizgi bir vizyon', phone: '0532 500 11 22', phoneClean: '905325001122', address: 'Moda Cad. No:35, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9850, lng: 29.0280 }, sectorId: 'mimarlik' },
  perspektif: { name: 'Perspektif Tasarım', ownerName: 'Mimar Deniz Çelik', slogan: 'Farklı bir perspektif', phone: '0212 243 33 44', phoneClean: '902122433344', address: 'Kemankeş Cad. No:25, Karaköy', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0230, lng: 28.9770 }, sectorId: 'mimarlik' },
  struktur: { name: 'STRÜKTÜR Architecture', ownerName: 'Mimar Can Arslan', slogan: 'Yapısal mükemmellik', phone: '0212 280 55 66', phoneClean: '902122805566', address: 'Büyükdere Cad. No:180, Levent', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0810, lng: 29.0125 }, sectorId: 'mimarlik' },
  tasarim: { name: 'Tasarım İç Mimarlık', ownerName: 'İç Mimar Ayşe Blanc', slogan: 'Mekanlar sanata dönüşür', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Teşvikiye Cad. No:55, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'mimarlik' },
  yapi: { name: 'YAPI Architecture Group', ownerName: 'Mimar Tolga Kara', slogan: 'Mimarlığın geleceği', phone: '0850 333 92 74', phoneClean: '908503339274', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'mimarlik' },
}

export const SIGORTA_DEMOS: Record<string, BD> = {
  kalkan: { name: 'Kalkan Sigorta', ownerName: 'Sigorta Exp. Mehmet Koç', slogan: 'Geleceğiniz güvende', phone: '0216 345 11 22', phoneClean: '902163451122', address: 'Bağdat Cad. No:240, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9680, lng: 29.0600 }, sectorId: 'sigorta' },
  police: { name: 'Poliçe Sigorta Acentesi', ownerName: 'Kemal Aydın', slogan: 'En uygun poliçe', phone: '0212 230 33 44', phoneClean: '902122303344', address: 'Halaskargazi Cad. No:110, Şişli', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0555, lng: 28.9880 }, sectorId: 'sigorta' },
  guvence: { name: 'Güvence Sigorta', ownerName: 'Sema Demir', slogan: 'Dijital sigorta çözümleri', phone: '0216 570 55 66', phoneClean: '902165705566', address: 'Ataşehir Bulvarı No:80, Ataşehir', city: 'İstanbul', district: 'Ataşehir', coordinates: { lat: 40.9920, lng: 29.1145 }, sectorId: 'sigorta' },
  koruma: { name: 'Koruma Sigorta Danışmanlığı', ownerName: 'Dr. Ahmet Yıldız', slogan: 'Bağımsız sigorta danışmanı', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Abdi İpekçi Cad. No:35, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0493, lng: 28.9930 }, sectorId: 'sigorta' },
  holding: { name: 'SigortaPlus Holding', ownerName: 'Tolga Arslan', slogan: 'Sigorta sektörünün geleceği', phone: '0850 444 74 48', phoneClean: '908504447448', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'sigorta' },
}

export const SURUCU_DEMOS: Record<string, BD> = {
  direksiyon: { name: 'Direksiyon Sürücü Kursu', ownerName: 'Hasan Kaya', slogan: 'İlk seferde ehliyet', phone: '0216 340 11 22', phoneClean: '902163401122', address: 'Bağdat Cad. No:200, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9720, lng: 29.0560 }, sectorId: 'surucu' },
  serit: { name: 'Şerit Sürücü Okulu', ownerName: 'Murat Demir', slogan: 'Güvenli sürüş eğitimi', phone: '0216 450 33 44', phoneClean: '902164503344', address: 'Altunizade Mah. No:40, Üsküdar', city: 'İstanbul', district: 'Üsküdar', coordinates: { lat: 41.0233, lng: 29.0393 }, sectorId: 'surucu' },
  pilot: { name: 'Pilot Sürücü Kursu', ownerName: 'Ali Şen', slogan: 'Yolun pilotu ol', phone: '0212 570 55 66', phoneClean: '902125705566', address: 'İncirli Cad. No:40, Bakırköy', city: 'İstanbul', district: 'Bakırköy', coordinates: { lat: 40.9783, lng: 28.8715 }, sectorId: 'surucu' },
  akademi: { name: 'Ehliyet Akademi', ownerName: 'Serkan Koç', slogan: 'Simülatörlü modern eğitim', phone: '0216 570 77 88', phoneClean: '902165707788', address: 'Ataşehir Bulvarı No:50, Ataşehir', city: 'İstanbul', district: 'Ataşehir', coordinates: { lat: 40.9920, lng: 29.1145 }, sectorId: 'surucu' },
  trafik: { name: 'Trafik Akademi Grubu', ownerName: 'Kemal Arslan', slogan: 'Trafik eğitiminde lider', phone: '0850 444 87 24', phoneClean: '908504448724', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'surucu' },
}

export const DIL_DEMOS: Record<string, BD> = {
  alfabe: { name: 'Alfabe Dil Akademisi', ownerName: 'Öğr. Zeynep Ak', slogan: 'İlk harften akıcılığa', phone: '0216 340 11 22', phoneClean: '902163401122', address: 'Bahariye Cad. No:65, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9899, lng: 29.0263 }, sectorId: 'dil' },
  kelime: { name: 'Kelime Dil Kursu', ownerName: 'Ahmet Yıldız', slogan: 'Her kelime bir kapı açar', phone: '0216 450 33 44', phoneClean: '902164503344', address: 'Altunizade Mah. No:30, Üsküdar', city: 'İstanbul', district: 'Üsküdar', coordinates: { lat: 41.0233, lng: 29.0393 }, sectorId: 'dil' },
  konus: { name: 'Konuş Language Lab', ownerName: 'Dr. Elif Demir', slogan: 'Dil öğren, dünyayı keşfet', phone: '0212 260 55 66', phoneClean: '902122605566', address: 'Ortabayır Mah. No:25, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0480, lng: 29.0050 }, sectorId: 'dil' },
  poliglot: { name: 'Poliglot Dil Merkezi', ownerName: 'Prof. Can Arslan', slogan: 'Çok dilli olmanın adresi', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Teşvikiye Cad. No:45, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'dil' },
  global: { name: 'GlobalTalk Dil Grubu', ownerName: 'Deniz Korkmaz', slogan: 'Dünyanın dili bizden sorulur', phone: '0850 444 35 56', phoneClean: '908504443556', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'dil' },
}

export const YOGA_DEMOS: Record<string, BD> = {
  nefes: { name: 'Nefes Yoga Stüdyo', ownerName: 'Yog. Eğt. Selin Ay', slogan: 'Nefes al, bırak', phone: '0532 600 11 22', phoneClean: '905326001122', address: 'Akarsu Sokak No:12, Cihangir', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0336, lng: 28.9840 }, sectorId: 'yoga' },
  asana: { name: 'Asana Yoga & Pilates', ownerName: 'Deniz Ergin', slogan: 'Her asanada bir keşif', phone: '0216 340 33 44', phoneClean: '902163403344', address: 'Moda Cad. No:50, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9850, lng: 29.0280 }, sectorId: 'yoga' },
  reformer: { name: 'Reformer Pilates Studio', ownerName: 'Ayşe Blanc', slogan: 'Reformer ile güçlen', phone: '0212 260 55 66', phoneClean: '902122605566', address: 'Barbaros Bulvarı No:90, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0450, lng: 29.0050 }, sectorId: 'yoga' },
  zen: { name: 'Zen Wellness Center', ownerName: 'Dr. Canan Yıldız', slogan: 'Beden, zihin, ruh dengesi', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Teşvikiye Cad. No:70, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'yoga' },
  akis: { name: 'Flow Yoga Group', ownerName: 'Kemal Tunç', slogan: 'Yoga zinciri', phone: '0850 444 96 42', phoneClean: '908504449642', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'yoga' },
}

// ═══ P3 SECTORS (10) ═══

export const OPTIK_DEMOS: Record<string, BD> = {
  gorus: { name: 'Görüş Optik', ownerName: 'Opt. Murat Çelik', slogan: 'Netliğinize odaklanıyoruz', phone: '0216 345 11 22', phoneClean: '902163451122', address: 'Bağdat Cad. No:260, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9660, lng: 29.0640 }, sectorId: 'optik' },
  cerceve: { name: 'Çerçeve Optik', ownerName: 'Selin Kaya', slogan: 'Markalar burada', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:30, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'optik' },
  lens: { name: 'Lens Optik Plus', ownerName: 'Ahmet Demir', slogan: 'Göz sağlığınız için', phone: '0212 570 55 66', phoneClean: '902125705566', address: 'İncirli Cad. No:70, Bakırköy', city: 'İstanbul', district: 'Bakırköy', coordinates: { lat: 40.9783, lng: 28.8715 }, sectorId: 'optik' },
  vizyon: { name: 'Vizyon Göz Merkezi', ownerName: 'Op. Dr. Kerem Koç', slogan: 'Premium göz bakımı', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Nişantaşı Cad. No:40, Şişli', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'optik' },
  optikplus: { name: 'OptikPlus Grubu', ownerName: 'Tolga Arslan', slogan: 'Her yere net bakış', phone: '0850 444 67 84', phoneClean: '908504446784', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'optik' },
}

export const PETSHOP_DEMOS: Record<string, BD> = {
  pati: { name: 'Pati Pet Shop', ownerName: 'Zeynep Kara', slogan: 'Dostlarınız için her şey', phone: '0216 340 11 22', phoneClean: '902163401122', address: 'Bahariye Cad. No:75, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9899, lng: 29.0263 }, sectorId: 'petshop' },
  yuva: { name: 'Yuva Pet Market', ownerName: 'Emre Şen', slogan: 'Kaliteli mama ve aksesuar', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:25, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'petshop' },
  dost: { name: 'Dost Pet & Grooming', ownerName: 'Canan Yıldız', slogan: 'Bakımlı dost mutlu dost', phone: '0212 570 55 66', phoneClean: '902125705566', address: 'İncirli Cad. No:45, Bakırköy', city: 'İstanbul', district: 'Bakırköy', coordinates: { lat: 40.9783, lng: 28.8715 }, sectorId: 'petshop' },
  salon: { name: 'Pati Salon Premium', ownerName: 'Ayşe Demir', slogan: 'Premium pet bakım', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Teşvikiye Cad. No:50, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'petshop' },
  zincir: { name: 'PetCity Mağazaları', ownerName: 'Tolga Kara', slogan: 'Pet mağaza zinciri', phone: '0850 444 73 82', phoneClean: '908504447382', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'petshop' },
}

export const CICEKCI_DEMOS: Record<string, BD> = {
  tomurcuk: { name: 'Tomurcuk Çiçekçi', ownerName: 'Gülşen Aktaş', slogan: 'Taze çiçek, mutlu anlar', phone: '0216 345 11 22', phoneClean: '902163451122', address: 'Bağdat Cad. No:230, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9690, lng: 29.0610 }, sectorId: 'cicekci' },
  buket: { name: 'Buket Çiçek Atölyesi', ownerName: 'Sema Yıldız', slogan: 'Her duyguya bir buket', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:35, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'cicekci' },
  sera: { name: 'Sera Flora', ownerName: 'Deniz Ergin', slogan: 'Seranın en tazesi', phone: '0212 570 55 66', phoneClean: '902125705566', address: 'İncirli Cad. No:55, Bakırköy', city: 'İstanbul', district: 'Bakırköy', coordinates: { lat: 40.9783, lng: 28.8715 }, sectorId: 'cicekci' },
  atolye: { name: 'Flora Atölye', ownerName: 'Ayşe Blanc', slogan: 'Çiçekte sanat', phone: '0212 243 77 88', phoneClean: '902122437788', address: 'Kemankeş Cad. No:18, Karaköy', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0230, lng: 28.9770 }, sectorId: 'cicekci' },
  bahce: { name: 'Bahçe Flora Group', ownerName: 'Tolga Yılmaz', slogan: 'Çiçekçi ağı', phone: '0850 444 25 63', phoneClean: '908504442563', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'cicekci' },
}

export const TERZI_DEMOS: Record<string, BD> = {
  igne: { name: 'İğne İplik Terzi', ownerName: 'Usta Hasan', slogan: 'Terzilik bir sanattır', phone: '0216 340 11 22', phoneClean: '902163401122', address: 'Bahariye Cad. No:95, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9899, lng: 29.0263 }, sectorId: 'terzi' },
  dikis: { name: 'Dikiş Atölye', ownerName: 'Selin Demir', slogan: 'Kişiye özel dikim', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:15, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'terzi' },
  kumas: { name: 'Kumaş & Stil', ownerName: 'Mimar Deniz', slogan: 'Kumaştan hayale', phone: '0212 243 55 66', phoneClean: '902122435566', address: 'Kemankeş Cad. No:22, Karaköy', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0230, lng: 28.9770 }, sectorId: 'terzi' },
  haute: { name: 'Haute Couture Istanbul', ownerName: 'Usta Kemal', slogan: 'Yüksek moda terzisi', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Abdi İpekçi Cad. No:40, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0493, lng: 28.9930 }, sectorId: 'terzi' },
  moda: { name: 'ModaFit Tadilat Grubu', ownerName: 'Tolga Arslan', slogan: 'Tadilat zinciri', phone: '0850 444 83 39', phoneClean: '908504448339', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'terzi' },
}

export const HALISAHA_DEMOS: Record<string, BD> = {
  saha: { name: 'Yeşil Saha', ownerName: 'Ali Kara', slogan: 'Maç var!', phone: '0216 345 11 22', phoneClean: '902163451122', address: 'Fenerbahçe Mah. No:10, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9780, lng: 29.0400 }, sectorId: 'halisaha' },
  gol: { name: 'Gol Spor Tesisi', ownerName: 'Emre Koç', slogan: 'Golün tadını çıkar', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:50, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'halisaha' },
  turnuva: { name: 'Turnuva Arena', ownerName: 'Burak Arslan', slogan: 'Profesyonel halı saha', phone: '0216 570 55 66', phoneClean: '902165705566', address: 'Ataşehir Bulvarı No:100, Ataşehir', city: 'İstanbul', district: 'Ataşehir', coordinates: { lat: 40.9920, lng: 29.1145 }, sectorId: 'halisaha' },
  arena: { name: 'Arena Spor Kompleksi', ownerName: 'Hasan Yılmaz', slogan: 'Çoklu spor merkezi', phone: '0216 630 77 88', phoneClean: '902166307788', address: 'Alemdağ Cad. No:200, Ümraniye', city: 'İstanbul', district: 'Ümraniye', coordinates: { lat: 41.0300, lng: 29.1080 }, sectorId: 'halisaha' },
  stadyum: { name: 'Stadyum Spor Grubu', ownerName: 'Kemal Tunç', slogan: 'Spor tesisi ağı', phone: '0850 444 72 84', phoneClean: '908504447284', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'halisaha' },
}

export const YUZME_DEMOS: Record<string, BD> = {
  dalga: { name: 'Dalga Yüzme Havuzu', ownerName: 'Eğt. Aylin Kaya', slogan: 'Yüzmenin keyfi', phone: '0216 340 11 22', phoneClean: '902163401122', address: 'Fenerbahçe Mah. No:20, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9780, lng: 29.0400 }, sectorId: 'yuzme' },
  havuz: { name: 'Havuz Spor Merkezi', ownerName: 'Murat Şen', slogan: 'Sağlıklı yüzme', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:40, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'yuzme' },
  aqua: { name: 'Aqua Fitness Club', ownerName: 'Canan Yıldız', slogan: 'Suda güçlen', phone: '0216 570 55 66', phoneClean: '902165705566', address: 'Ataşehir Bulvarı No:90, Ataşehir', city: 'İstanbul', district: 'Ataşehir', coordinates: { lat: 40.9920, lng: 29.1145 }, sectorId: 'yuzme' },
  okyanus: { name: 'Okyanus Spa & Pool', ownerName: 'Dr. Selin Ay', slogan: 'Premium yüzme ve spa', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Teşvikiye Cad. No:60, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'yuzme' },
  olimpik: { name: 'Olimpik Havuz Grubu', ownerName: 'Tolga Kara', slogan: 'Olimpik standartlarda', phone: '0850 444 96 85', phoneClean: '908504449685', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'yuzme' },
}

export const CATERING_DEMOS: Record<string, BD> = {
  sofra: { name: 'Sofra Catering', ownerName: 'Hasan Usta', slogan: 'Sofranıza lezzet getiriyoruz', phone: '0216 345 11 22', phoneClean: '902163451122', address: 'Bağdat Cad. No:290, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9640, lng: 29.0660 }, sectorId: 'catering' },
  ziyafet: { name: 'Ziyafet Events Catering', ownerName: 'Sema Koç', slogan: 'Her etkinliğe ziyafet', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:55, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'catering' },
  sef: { name: 'Şef\'s Kitchen Catering', ownerName: 'Şef Can Arslan', slogan: 'Şef kalitesinde catering', phone: '0532 700 55 66', phoneClean: '905327005566', address: 'Karaköy Mah. No:15, Beyoğlu', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0230, lng: 28.9770 }, sectorId: 'catering' },
  banket: { name: 'Banket Organizasyon', ownerName: 'Cem Yalçın', slogan: 'Büyük etkinliklerin tercihi', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Levent Mah. No:80, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0810, lng: 29.0125 }, sectorId: 'catering' },
  lojistik: { name: 'LezzetLojistik Grubu', ownerName: 'Tolga Yılmaz', slogan: 'Endüstriyel yemek hizmetleri', phone: '0850 444 53 72', phoneClean: '908504445372', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'catering' },
}

export const KASAP_DEMOS: Record<string, BD> = {
  bicak: { name: 'Bıçak Kasap', ownerName: 'Kasap Hasan', slogan: 'Taze kesim, kaliteli et', phone: '0216 340 11 22', phoneClean: '902163401122', address: 'Bahariye Cad. No:85, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9899, lng: 29.0263 }, sectorId: 'kasap' },
  tezgah: { name: 'Tezgah Et Market', ownerName: 'Mustafa Koç', slogan: 'Kaliteli et, uygun fiyat', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:12, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'kasap' },
  mangal: { name: 'Mangal Et & Şarküteri', ownerName: 'Ali Kara', slogan: 'Mangalın en güzeli', phone: '0212 570 55 66', phoneClean: '902125705566', address: 'İncirli Cad. No:30, Bakırköy', city: 'İstanbul', district: 'Bakırköy', coordinates: { lat: 40.9783, lng: 28.8715 }, sectorId: 'kasap' },
  ciftlik: { name: 'Çiftlik Et Butik', ownerName: 'İbrahim Yılmaz', slogan: 'Çiftlikten sofraya', phone: '0216 570 77 88', phoneClean: '902165707788', address: 'Ataşehir Bulvarı No:60, Ataşehir', city: 'İstanbul', district: 'Ataşehir', coordinates: { lat: 40.9920, lng: 29.1145 }, sectorId: 'kasap' },
  etplus: { name: 'Et+ Mağazaları', ownerName: 'Kemal Demir', slogan: 'Et mağaza zinciri', phone: '0850 444 38 28', phoneClean: '908504443828', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'kasap' },
}

export const CILINGIR_DEMOS: Record<string, BD> = {
  kilit: { name: 'Kilit Çilingir', ownerName: 'Murat Usta', slogan: '15 dakikada kapınızda', phone: '0532 100 11 22', phoneClean: '905321001122', address: 'Kadıköy Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9899, lng: 29.0263 }, sectorId: 'cilingir' },
  anahtar: { name: 'Anahtar Güvenlik', ownerName: 'Serkan Kaya', slogan: 'Güvenliğiniz bizden sorulur', phone: '0532 200 33 44', phoneClean: '905322003344', address: 'Üsküdar Merkez', city: 'İstanbul', district: 'Üsküdar', coordinates: { lat: 41.0233, lng: 29.0393 }, sectorId: 'cilingir' },
  guvenlik: { name: 'Güvenlik Kilit Sistemleri', ownerName: 'Burak Arslan', slogan: 'Akıllı kilit çözümleri', phone: '0212 570 55 66', phoneClean: '902125705566', address: 'Bakırköy Merkez', city: 'İstanbul', district: 'Bakırköy', coordinates: { lat: 40.9783, lng: 28.8715 }, sectorId: 'cilingir' },
  kasa: { name: 'Kasa Çelik Kasa & Kilit', ownerName: 'Hasan Demir', slogan: 'Endüstriyel güvenlik', phone: '0212 230 77 88', phoneClean: '902122307788', address: 'Şişli Merkez', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0555, lng: 28.9880 }, sectorId: 'cilingir' },
  yediyirmidort: { name: '7/24 Çilingir Ağı', ownerName: 'Tolga Arslan', slogan: 'Her an her yerde', phone: '0850 555 72 42', phoneClean: '908505557242', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'cilingir' },
}

export const MUZIK_DEMOS: Record<string, BD> = {
  nota: { name: 'Nota Müzik Kursu', ownerName: 'Öğr. Deniz Çelik', slogan: 'Müziğe ilk adım', phone: '0216 340 11 22', phoneClean: '902163401122', address: 'Bahariye Cad. No:60, Kadıköy', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9899, lng: 29.0263 }, sectorId: 'muzik' },
  akor: { name: 'Akor Müzik Okulu', ownerName: 'Kaan Volkan', slogan: 'Her akor bir dünya', phone: '0212 260 33 44', phoneClean: '902122603344', address: 'Beşiktaş Mah. No:28, Beşiktaş', city: 'İstanbul', district: 'Beşiktaş', coordinates: { lat: 41.0428, lng: 29.0070 }, sectorId: 'muzik' },
  studyo: { name: 'Stüdyo Müzik Lab', ownerName: 'Emre Arslan', slogan: 'Kayıt ve eğitim', phone: '0212 243 55 66', phoneClean: '902122435566', address: 'Kemankeş Cad. No:12, Karaköy', city: 'İstanbul', district: 'Beyoğlu', coordinates: { lat: 41.0230, lng: 28.9770 }, sectorId: 'muzik' },
  konservatuar: { name: 'Konservatuar Müzik Sanatları', ownerName: 'Prof. Can Arslan', slogan: 'Akademik müzik eğitimi', phone: '0212 240 77 88', phoneClean: '902122407788', address: 'Teşvikiye Cad. No:35, Nişantaşı', city: 'İstanbul', district: 'Şişli', coordinates: { lat: 41.0491, lng: 28.9935 }, sectorId: 'muzik' },
  armoni: { name: 'Armoni Müzik Grubu', ownerName: 'Kemal Tunç', slogan: 'Müzik okulu ağı', phone: '0850 444 68 74', phoneClean: '908504446874', address: 'İstanbul Genel Merkez', city: 'İstanbul', district: 'Kadıköy', coordinates: { lat: 40.9860, lng: 29.0300 }, sectorId: 'muzik' },
}

/** All P2+P3 demo businesses by sector */
export const P2P3_DEMO_BUSINESSES = {
  psikolog: PSIKOLOG_DEMOS, fastfood: FASTFOOD_DEMOS, bar: BAR_DEMOS,
  telefon: TELEFON_DEMOS, klima: KLIMA_DEMOS, mimarlik: MIMARLIK_DEMOS,
  sigorta: SIGORTA_DEMOS, surucu: SURUCU_DEMOS, dil: DIL_DEMOS, yoga: YOGA_DEMOS,
  optik: OPTIK_DEMOS, petshop: PETSHOP_DEMOS, cicekci: CICEKCI_DEMOS,
  terzi: TERZI_DEMOS, halisaha: HALISAHA_DEMOS, yuzme: YUZME_DEMOS,
  catering: CATERING_DEMOS, kasap: KASAP_DEMOS, cilingir: CILINGIR_DEMOS, muzik: MUZIK_DEMOS,
} as const
