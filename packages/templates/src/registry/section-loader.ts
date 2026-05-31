/**
 * @kepenk/templates — Sector-based Section Loader
 *
 * Dynamically imports universal + sector-specific section components.
 * Each import triggers self-registration via registerSection() side-effects.
 * Used by the dynamic demo route to load only the sections a theme needs.
 */

type LazyImport = () => Promise<unknown>

// ─────────────────────────────────────────────
// Universal sections (always loaded)
// ─────────────────────────────────────────────

const UNIVERSAL_IMPORTS: LazyImport[] = [
  () => import('../sections/header/HeaderMinimalSticky'),
  () => import('../sections/hero/HeroFullscreenOverlay'),
  () => import('../sections/services/ServicesCardGrid'),
  () => import('../sections/footer/FooterSections'),
  () => import('../sections/global/GlobalSections'),
  () => import('../sections/common/CommonSections'),
  () => import('../sections/common/MapFullWidth'),
  () => import('../sections/plan-variants'),
  () => import('../sections/tier1/Tier1Asymmetric'),
  () => import('../sections/tier1/Tier1Editorial'),
  () => import('../sections/tier1/Tier1Bento'),
  () => import('../sections/asansor/AsansorApexSections'),
]

// ─────────────────────────────────────────────
// Sector → section file mapping
// ─────────────────────────────────────────────

const SECTOR_IMPORTS: Record<string, LazyImport[]> = {
  temizlik: [
    () => import('../sections/temizlik/TemizlikServices').then(m => m.TemizlikServices),
  ],
  organik: [
    () => import('../sections/organik/OrganikServices').then(m => m.OrganikServices),
  ],
  lastikci: [
    () => import('../sections/lastikci/LastikciServices').then(m => m.LastikciServices),
  ],
  boyaci: [
    () => import('../sections/boyaci/BoyaciDekoratifSections'),
    () => import('../sections/boyaci/BoyaciDisSections'),
    () => import('../sections/boyaci/BoyaciEndustriyelSections'),
    () => import('../sections/boyaci/BoyaciEvSections'),
    () => import('../sections/boyaci/BoyaciLuxSections'),
    () => import('../sections/boyaci/BoyaciServices').then(m => m.BoyaciServices),
  ],
  // P0
  berber: [
    () => import('../sections/berber/BerberServices').then(m => m.BerberServices),
    () => import('../sections/berber/BerberBladeSections'),
    () => import('../sections/berber/BerberGentlemanSections'),
    () => import('../sections/berber/BerberKlasikSections'),
    () => import('../sections/berber/BerberSadeSections'),
    () => import('../sections/berber/BerberStudioSections'),
  ],

  doktor: [() => import('../sections/doktor/DoktorSections')],
  guzellik: [
    () => import('../sections/guzellik/GuzellikSections'),
    () => import('../sections/guzellik/GuzellikAtelierSections'),
    () => import('../sections/guzellik/GuzellikBlancSections'),
    () => import('../sections/guzellik/GuzellikDermisSections'),
    () => import('../sections/guzellik/GuzellikGlowSections'),
    () => import('../sections/guzellik/GuzellikNarinSections'),
    () => import('../sections/guzellik/GuzellikServices').then(m => m.GuzellikServices),
  ],
  avukat: [() => import('../sections/avukat/AvukatSections')],
  disci: [() => import('../sections/dis/DisSections')],
  kargo: [
    () => import('../sections/kargo/KargoDosyaSections'),
    () => import('../sections/kargo/KargoMotoSections'),
    () => import('../sections/kargo/KargoMarketSections'),
    () => import('../sections/kargo/KargoAgirSections'),
    () => import('../sections/kargo/KargoLuxSections'),
  ],
  mobilya: [
    () => import('../sections/mobilya/MobilyaEvSections'),
    () => import('../sections/mobilya/MobilyaMutfakSections'),
    () => import('../sections/mobilya/MobilyaOfisSections'),
    () => import('../sections/mobilya/MobilyaOzelSections'),
    () => import('../sections/mobilya/MobilyaLuxSections'),
  ],
  muzik: [
    () => import('../sections/muzik/MuzikCocukSections'),
    () => import('../sections/muzik/MuzikKlasikSections'),
    () => import('../sections/muzik/MuzikPopSections'),
    () => import('../sections/muzik/MuzikRockSections'),
    () => import('../sections/muzik/MuzikLuxSections'),
  ],
  organizasyon: [
    () => import('../sections/organizasyon/OrganizasyonDogumSections'),
    () => import('../sections/organizasyon/OrganizasyonDugunSections'),
    () => import('../sections/organizasyon/OrganizasyonFirmaSections'),
    () => import('../sections/organizasyon/OrganizasyonKonserSections'),
    () => import('../sections/organizasyon/OrganizasyonLuxSections'),
  ],
  pastane: [
    () => import('../sections/pastane/PastaneSimitSections'),
    () => import('../sections/pastane/PastaneTatliSections'),
    () => import('../sections/pastane/PastanePastaSections'),
    () => import('../sections/pastane/PastaneVeganSections'),
    () => import('../sections/pastane/PastaneLuxSections'),
  ],
  restoran: [
    () => import('../sections/restoran/RestoranSections'),
    () => import('../sections/restoran/RestoranSofraSections'),
    () => import('../sections/restoran/RestoranLezzetSections'),
    () => import('../sections/restoran/RestoranNarSections'),
    () => import('../sections/restoran/RestoranTabledotSections'),
    () => import('../sections/restoran/RestoranZincirSections'),
    () => import('../sections/restoran/RestoranFineSections'),
    () => import('../sections/restoran/RestoranHizliSections'),
    () => import('../sections/restoran/RestoranKafeSections'),
    () => import('../sections/restoran/RestoranKlasikSections'),
  ],
  spor: [
    () => import('../sections/spor/SporIronSections'),
    () => import('../sections/spor/SporStudioSections'),
    () => import('../sections/spor/SporBeastSections'),
    () => import('../sections/spor/SporZenSections'),
    () => import('../sections/spor/SporEliteSections'),
    () => import('../sections/spor/SporSections'),
    () => import('../sections/fitness/FitnessSections')
  ],
  fitness: [
    () => import('../sections/fitness/FitnessServices').then(m => m.FitnessServices),
  ],
  oto: [
    () => import('../sections/oto/OtoSections'),
    () => import('../sections/oto/OtoVariantSections'),
    () => import('../sections/oto/OtoServices').then(m => m.OtoServices),
    () => import('../sections/oto/OtoservisServices').then(m => m.OtoservisServices),
    () => import('../sections/oto/OtoBakimSections'),
    () => import('../sections/oto/OtoDetaySections'),
    () => import('../sections/oto/OtoDinamikSections'),
    () => import('../sections/oto/OtoEksperSections'),
    () => import('../sections/oto/OtoElektrikSections'),
    () => import('../sections/oto/OtoFiloSections'),
    () => import('../sections/oto/OtoGuvenSections'),
    () => import('../sections/oto/OtoHizliSections'),
    () => import('../sections/oto/OtoKaportaSections'),
    () => import('../sections/oto/OtoLastikSections'),
    () => import('../sections/oto/OtoLuxSections'),
    () => import('../sections/oto/OtoMekanikSections'),
    () => import('../sections/oto/OtoPrestijSections'),
    () => import('../sections/oto/OtoVipSections'),
  ],
  hukuk: [() => import('../sections/hukuk/HukukSections'),
    () => import('../sections/hukuk/HukukServices').then(m => m.HukukServices),
  ],
  insaat: [() => import('../sections/insaat/InsaatSections'),
    () => import('../sections/insaat/InsaatServices').then(m => m.InsaatServices),
  ],

  // P1
  kahveci: [
    () => import('../sections/kahveci/KahveciSections'),
    () => import('../sections/kahveci/Kahveci3NesilSections'),
    () => import('../sections/kahveci/KahveciBrunchSections'),
    () => import('../sections/kahveci/KahveciKavurmaSections'),
    () => import('../sections/kahveci/KahveciLuxSections'),
    () => import('../sections/kahveci/KahveciTurkSections'),
    () => import('../sections/kahveci/KahveciServices').then(m => m.KahveciServices),
  ],
  firin: [() => import('../sections/pastane/PastaneSections')],
  eczane: [() => import('../sections/eczane/EczaneSections')],
  veteriner: [() => import('../sections/vet/VeterinerSections')],
  fotografci: [() => import('../sections/foto/FotografciSections')],
  dugun: [() => import('../sections/organizasyon/OrganizasyonSections')],
  elektrikci: [() => import('../sections/elektrikci/ElektrikciSections'),
    () => import('../sections/elektrikci/ElektrikciServices').then(m => m.ElektrikciServices),
  ],
  tesisatci: [() => import('../sections/tesisatci/TesisatciSections'),
    () => import('../sections/tesisatci/TesisatciServices').then(m => m.TesisatciServices),
  ],
  muhasebeci: [],  // uses universal sections
  emlakci: [() => import('../sections/emlak/EmlakSections')],
  ozelders: [
    () => import('../sections/ozelders/OzelDersAkademiSections'),
    () => import('../sections/ozelders/OzelDersKalemSections'),
    () => import('../sections/ozelders/OzelDersKampusSections'),
    () => import('../sections/ozelders/OzelDersKolejSections'),
    () => import('../sections/ozelders/OzelDersSinifSections'),
  ],
  kuyumcu: [() => import('../sections/kuyumcu/KuyumcuSections')],
  matbaa: [
    () => import('../sections/matbaa/MatbaaSections'),
    () => import('../sections/matbaa/MatbaaDijitalSections'),
    () => import('../sections/matbaa/MatbaaOfsetSections'),
    () => import('../sections/matbaa/MatbaaAmbalajSections'),
    () => import('../sections/matbaa/MatbaaReklamSections'),
    () => import('../sections/matbaa/MatbaaLuxSections'),
  ],
  nakliyat: [
    () => import('../sections/nakliyat/NakliyatSections'),
    () => import('../sections/nakliyat/NakliyatEvSections'),
    () => import('../sections/nakliyat/NakliyatOfisSections'),
    () => import('../sections/nakliyat/NakliyatParcaSections'),
    () => import('../sections/nakliyat/NakliyatSehirlerSections'),
    () => import('../sections/nakliyat/NakliyatLuxSections'),
  ],
  kres: [
    () => import('../sections/kres/KresSections'),
    () => import('../sections/kres/KresOyunSections'),
    () => import('../sections/kres/KresMontessoriSections'),
    () => import('../sections/kres/KresDogaSections'),
    () => import('../sections/kres/KresSanatSections'),
    () => import('../sections/kres/KresLuxSections'),
  ],
  otoyikama: [
    () => import('../sections/otoyikama/OtoYikamaSections'),
    () => import('../sections/otoyikama/OtoyikamaEkspresSections'),
    () => import('../sections/otoyikama/OtoyikamaOtoSections'),
    () => import('../sections/otoyikama/OtoyikamaDetaySections'),
    () => import('../sections/otoyikama/OtoyikamaFleetSections'),
    () => import('../sections/otoyikama/OtoyikamaLuxSections'),
  ],
  cicekci: [
    () => import('../sections/cicekci/CicekciMahalleSections'),
    () => import('../sections/cicekci/CicekciOnlineSections'),
    () => import('../sections/cicekci/CicekciDugunSections'),
    () => import('../sections/cicekci/CicekciTaziyeSections'),
    () => import('../sections/cicekci/CicekciLuxSections'),
  ],
  cilingir: [
    () => import('../sections/cilingir/CilingirSections'),
    () => import('../sections/cilingir/CilingirEvSections'),
    () => import('../sections/cilingir/CilingirOtoSections'),
    () => import('../sections/cilingir/CilingirCelikSections'),
    () => import('../sections/cilingir/CilingirKasaSections'),
    () => import('../sections/cilingir/CilingirLuxSections'),
  ],
  haliyikama: [
    () => import('../sections/haliyikama/HaliYikamaSections'),
    () => import('../sections/haliyikama/HaliyikamaEvSections'),
    () => import('../sections/haliyikama/HaliyikamaFabrikaSections'),
    () => import('../sections/haliyikama/HaliyikamaKoltukSections'),
    () => import('../sections/haliyikama/HaliyikamaOrganikSections'),
    () => import('../sections/haliyikama/HaliyikamaLuxSections'),
  ],
  peyzaj: [
    () => import('../sections/peyzaj/PeyzajSections'),
    () => import('../sections/peyzaj/PeyzajKlasikSections'),
    () => import('../sections/peyzaj/PeyzajModernSections'),
    () => import('../sections/peyzaj/PeyzajSulamaSections'),
    () => import('../sections/peyzaj/PeyzajOrganikSections'),
    () => import('../sections/peyzaj/PeyzajLuxSections'),
  ],
  vet: [
    () => import('../sections/vet/VetKlinikSections'),
    () => import('../sections/vet/VetCerrahiSections'),
    () => import('../sections/vet/VetEgzotikSections'),
    () => import('../sections/vet/VetPetshopSections'),
    () => import('../sections/vet/VetLuxSections'),
  ],
  foto: [
    () => import('../sections/foto/FotoDogumSections'),
    () => import('../sections/foto/FotoDugunSections'),
    () => import('../sections/foto/FotoPortreSections'),
    () => import('../sections/foto/FotoUrunSections'),
    () => import('../sections/foto/FotoLuxSections'),
  ],
  asansor: [
    () => import('../sections/asansor/AsansorSections'),
    () => import('../sections/asansor/AsansorBinaSections'),
    () => import('../sections/asansor/AsansorYukSections'),
    () => import('../sections/asansor/AsansorPanoramikSections'),
    () => import('../sections/asansor/AsansorEngelliSections'),
    () => import('../sections/asansor/AsansorLuxSections'),
  ],
  klinik: [
    () => import('../sections/klinik/KlinikSections'),
    () => import('../sections/klinik/KlinikSadeSections'),
    () => import('../sections/klinik/KlinikModernSections'),
    () => import('../sections/klinik/KlinikKurumsalSections'),
    () => import('../sections/klinik/KlinikEstetikSections'),
    () => import('../sections/klinik/KlinikVipSections'),
  ],

  // P2
  psikolog: [],  // uses universal + common sections
  fastfood: [() => import('../sections/restoran/RestoranSections')],
  bar: [() => import('../sections/restoran/RestoranSections')],
  telefon: [],  // uses universal sections
  klima: [],  // uses universal sections
  mimarlik: [
    () => import('../sections/mimarlik/MimarlikCizgiSections'),
    () => import('../sections/mimarlik/MimarlikPerspektifSections'),
    () => import('../sections/mimarlik/MimarlikStrukturSections'),
    () => import('../sections/mimarlik/MimarlikTasarimSections'),
    () => import('../sections/mimarlik/MimarlikYapiSections'),
  ],
  sigorta: [],  // uses universal sections
  surucu: [],  // uses universal sections
  dil: [],  // uses universal sections
  yoga: [() => import('../sections/fitness/FitnessSections')],

  // P3
  optik: [],  // uses universal sections
  petshop: [() => import('../sections/vet/VeterinerSections')],
  terzi: [
    () => import('../sections/terzi/TerziTadilatSections'),
    () => import('../sections/terzi/TerziGelinSections'),
    () => import('../sections/terzi/TerziErkekSections'),
    () => import('../sections/terzi/TerziGelenekselSections'),
    () => import('../sections/terzi/TerziLuxSections'),
  ],
  halisaha: [() => import('../sections/spor/SporSections')],
  yuzme: [() => import('../sections/fitness/FitnessSections')],
  catering: [() => import('../sections/restoran/RestoranSections')],
  kasap: [],  // uses universal sections

  // ── Extended Sectors ──
  // Sectors that have config files but were added to the catalog via extended-sector-themes.
  // Sectors map to existing section components where similar, or use universal sections.
  dis: [() => import('../sections/dis/DisSections')],
  emlak: [() => import('../sections/emlak/EmlakSections')],
  cambalkon: [() => import('../sections/cambalkon/CamBalkonSections')],
  mobilyaci: [() => import('../sections/mobilyaci/MobilyaciSections')],
  muhasebe: [() => import('../sections/muhasebeci')],
}

// ─────────────────────────────────────────────
// Loader
// ─────────────────────────────────────────────

const loadedSectors = new Set<string>()
let universalLoaded = false

/**
 * Register all section components needed for a given sector.
 * Safe to call multiple times — deduplicates internally.
 */
export async function registerSectorSections(sectorId: string): Promise<void> {
  // Load universal sections once
  if (!universalLoaded) {
    await Promise.all(UNIVERSAL_IMPORTS.map(fn => fn()))
    universalLoaded = true
  }

  // Load sector-specific sections once per sector
  if (!loadedSectors.has(sectorId)) {
    const imports = SECTOR_IMPORTS[sectorId] ?? []
    if (imports.length > 0) {
      await Promise.all(imports.map(fn => fn()))
    }
    loadedSectors.add(sectorId)
  }
}

/** Check if a sector's sections are already loaded */
export function isSectorLoaded(sectorId: string): boolean {
  return loadedSectors.has(sectorId) && universalLoaded
}

/** Load ALL sections (useful for editor or full preview) */
export async function registerAllSections(): Promise<void> {
  if (!universalLoaded) {
    await Promise.all(UNIVERSAL_IMPORTS.map(fn => fn()))
    universalLoaded = true
  }

  const allSectors = Object.keys(SECTOR_IMPORTS)
  const unloaded = allSectors.filter(s => !loadedSectors.has(s))

  for (const sectorId of unloaded) {
    const imports = SECTOR_IMPORTS[sectorId] ?? []
    if (imports.length > 0) {
      await Promise.all(imports.map(fn => fn()))
    }
    loadedSectors.add(sectorId)
  }
}
