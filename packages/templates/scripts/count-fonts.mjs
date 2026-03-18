import { readdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dir = join(__dirname, '..', 'src', 'themes')
const files = readdirSync(dir).filter(f =>
  /^p[0-3]/.test(f) && f.endsWith('.ts') && !f.includes('themes.ts') && !f.includes('demo') && !f.includes('font')
)

const allFonts = []
for (const file of files) {
  const content = readFileSync(join(dir, file), 'utf-8')
  const re = /heading:\s*\{\s*family:\s*'([^']+)'/g
  let m
  while ((m = re.exec(content)) !== null) allFonts.push(m[1])
}

const counts = {}
allFonts.forEach(f => { counts[f] = (counts[f] || 0) + 1 })
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
console.log(`Unique heading fonts: ${sorted.length} (was 11)`)
sorted.forEach(([f, c]) => console.log(`  ${f}: ${c}`))
