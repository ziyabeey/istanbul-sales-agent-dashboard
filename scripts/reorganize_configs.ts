import fs from 'fs'
import path from 'path'

const CONFIGS_DIR = path.resolve(__dirname, '../packages/templates/src/themes/configs')
const EXPORTS_FILE = path.resolve(__dirname, '../packages/templates/src/exports-configs-sections.ts')
const REGISTRY_DIR = path.resolve(__dirname, '../packages/templates/src/registry')

async function run() {
  console.log("🚀 Mimaride yapılandırma başladı: Tüm konfigler klasöre taşınıyor...")
  
  // Read only .ts files (not directories)
  const items = fs.readdirSync(CONFIGS_DIR, { withFileTypes: true })
  const files = items.filter(item => item.isFile() && item.name.endsWith('.ts') && item.name !== 'index.ts' && item.name !== 'theme-map.ts').map(item => item.name)

  files.sort() // Deterministic alphabetical ID assignment

  let exportContent = fs.readFileSync(EXPORTS_FILE, 'utf8')
  
  const mapEntries: string[] = []
  let count = 0

  files.forEach((file, index) => {
    const themeId = file.replace('-config.ts', '')
    const paddedId = (index + 1).toString().padStart(3, '0') // 001..295
    const folderName = `${paddedId}-${themeId}`
    
    const oldPath = path.join(CONFIGS_DIR, file)
    const newDirPath = path.join(CONFIGS_DIR, folderName)
    const newFilePath = path.join(newDirPath, 'index.ts')

    // Create the unique numbered folder
    if (!fs.existsSync(newDirPath)) {
      fs.mkdirSync(newDirPath, { recursive: true })
    }
    
    // Move the flat config file into the folder as index.ts
    fs.renameSync(oldPath, newFilePath)

    // Regex replacement for exports-configs-sections.ts
    // Looking for: from './themes/configs/themeId-config'
    // Replace with: from './themes/configs/001-themeId'
    const searchString = `./themes/configs/${themeId}-config`
    const replaceString = `./themes/configs/${folderName}`
    // Only replace if it actually exists in the file to prevent errors
    if (exportContent.includes(searchString)) {
      exportContent = exportContent.replace(new RegExp(searchString, 'g'), replaceString)
    }

    // Prepare Dynamic Map Entry for Webpack / Next.js lazy lazy loader
    mapEntries.push(`  '${themeId}': () => import('../themes/configs/${folderName}'),`)
    count++
  })

  // Save the updated large Barrel Export File
  fs.writeFileSync(EXPORTS_FILE, exportContent, 'utf8')
  console.log(`✅ [1/3] Barrel file güncellendi. Toplam ${count} dosya klasöre çevrildi.`)

  // Create the Theme Loader Map File
  const mapFileContent = `// Auto-generated dynamic import map - Global Registry\n\nexport const THEME_MAP: Record<string, () => Promise<any>> = {\n${mapEntries.join('\n')}\n};\n`
  fs.writeFileSync(path.join(REGISTRY_DIR, 'theme-map.ts'), mapFileContent, 'utf8')
  console.log(`✅ [2/3] Dinamik Theme-Map Registry zekası yaratıldı.`)

  // Safely inject THEME_MAP into config-loader.ts
  const loaderFile = path.join(REGISTRY_DIR, 'config-loader.ts')
  let loaderContent = fs.readFileSync(loaderFile, 'utf8')
  
  if (!loaderContent.includes('THEME_MAP')) {
    loaderContent = `import { THEME_MAP } from './theme-map'\n` + loaderContent
  }

  // Replace standard dynamic import with map
  const lazyImportStr = 'const mod: Record<string, any> = await import(`../themes/configs/${themeId}-config`)'
  const newImportLogic = `const importer = THEME_MAP[themeId]\n    if (!importer) return null\n    const mod: Record<string, any> = await importer()`
  
  if (loaderContent.includes(lazyImportStr)) {
    loaderContent = loaderContent.replace(lazyImportStr, newImportLogic)
    fs.writeFileSync(loaderFile, loaderContent, 'utf8')
    console.log(`✅ [3/3] Config Loader motoru statik mapping analizine güncellendi.`)
  } else {
    console.log(`⚠️ [3/3] Config Loader motorunda eski kod bloğu bulunamadı, elle kontrol edin.`)
  }

  console.log("🏁 Operasyon tamamlandı. Tüm temalar numaralandı ve ID klasörlendi.")
}

run().catch(err => console.error(err))
