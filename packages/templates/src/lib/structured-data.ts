/**
 * @kepenk/templates — JSON-LD Structured Data Generator
 *
 * Generates Schema.org structured data based on sector.
 * 40 sector → SchemaOrg type mapping.
 */

import type { BusinessData } from '../types/section-types'

export const SECTOR_SCHEMA_MAP: Record<string, string> = {
  berber: 'BarberShop',
  restoran: 'Restaurant',
  doktor: 'MedicalBusiness',
  guzellik: 'BeautySalon',
  avukat: 'LegalService',
  disci: 'Dentist',
  oto: 'AutoRepair',
  spor: 'SportsActivityLocation',
  kafe: 'CafeOrCoffeeShop',
  firin: 'Bakery',
  eczane: 'Pharmacy',
  veteriner: 'VeterinaryCare',
  fotografci: 'Photographer',
  dugun: 'EventPlanner',
  elektrikci: 'Electrician',
  tesisatci: 'Plumber',
  muhasebeci: 'AccountingService',
  emlakci: 'RealEstateAgent',
  ozelders: 'EducationalOrganization',
  kuyumcu: 'JewelryStore',
  psikolog: 'PsychologicalTreatment',
  fastfood: 'FastFoodRestaurant',
  bar: 'BarOrPub',
  telefon: 'ElectronicsStore',
  klima: 'HVACBusiness',
  mimarlik: 'Architect',
  sigorta: 'InsuranceAgency',
  surucu: 'DrivingSchool',
  dil: 'EducationalOrganization',
  yoga: 'SportsActivityLocation',
  optik: 'Optician',
  petshop: 'PetStore',
  cicekci: 'Florist',
  terzi: 'TailorShop',
  saha: 'SportsActivityLocation',
  yuzme: 'SportsActivityLocation',
  catering: 'FoodEstablishment',
  kasap: 'Butcher',
  cilingir: 'Locksmith',
  muzik: 'EducationalOrganization',
}

function capitalizeFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function generateStructuredData(
  business: BusinessData,
  seoSchemaType: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': seoSchemaType,
    name: business.name,
    description: business.slogan,
    telephone: `+${business.phoneClean}`,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.district,
      addressRegion: business.city,
      addressCountry: 'TR',
    },
    ...(business.coordinates && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.coordinates.lat,
        longitude: business.coordinates.lng,
      },
    }),
    ...(business.logoUrl && { logo: business.logoUrl }),
    ...(business.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: business.rating,
        reviewCount: business.reviewCount ?? 0,
        bestRating: 5,
      },
    }),
    openingHoursSpecification: (business.workingHours || [])
      .filter(h => h.open)
      .map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${capitalizeFirst(h.day)}`,
        opens: h.open,
        closes: h.close,
      })),
    url: business.website,
    sameAs: Object.values(business.socialMedia || {}).filter(Boolean),
  }
}
