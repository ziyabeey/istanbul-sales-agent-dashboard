import * as templates from '../src/index'

async function auditThemes() {
  const configs = Object.values(templates).filter((val: any) => val && val.id && val.pages && val.cssVariables && val.sectorId) as any[]
  
  console.log(`--RAPOR_BASLANGICI--`)
  console.log(`Toplam tema sayisi: ${configs.length}`)
  
  const sectionOrders = new Set<string>()
  const variants = new Set<string>()
  
  for (const config of configs) {
    if (config.pages && config.pages[0] && config.pages[0].sections) {
      const order = config.pages[0].sections.map((s: any) => `${s.type}::${s.variant}`).join(' -> ')
      sectionOrders.add(order)
      
      config.pages[0].sections.forEach((s: any) => {
        variants.add(`${s.type}::${s.variant}`)
      })
    }
  }
  
  console.log(`Benzersiz section sirasi sayisi: ${sectionOrders.size}`)
  console.log(`Kullanilan variant cesitliligi: ${variants.size}`)
  console.log(`--RAPOR_BITISI--`)
}

auditThemes().catch(console.error)
