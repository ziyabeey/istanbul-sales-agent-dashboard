import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import { generateAstSiteData } from './src/utils/ai/astGenerator'

const mockEsnaf = {
  isletmeAdiTam: 'Ahmet Berber Salonu',
  ad: 'Ahmet Berber',
  sektor: 'Berber',
  ilce: 'Kadıköy',
  sehir: 'İstanbul',
  paket: 'BUYUME'
}

const mockYorumlar = [
  { yazar: 'Caner D.', metin: 'Harika saç kesimi!', yildiz: 5 }
]

async function run() {
  console.log('Generating AST...')
  try {
    const ast = await generateAstSiteData(mockEsnaf, mockYorumlar)
    console.log(JSON.stringify(ast, null, 2))
  } catch (err) {
    console.error('Error generating AST:', err)
  }
}

run()
