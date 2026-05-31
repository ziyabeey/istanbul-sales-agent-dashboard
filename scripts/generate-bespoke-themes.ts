import { Anthropic } from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

// Usage: node scripts/generate-bespoke-themes.js <sector_id> <SectorName>
// Example: node scripts/generate-bespoke-themes.js klinik Klinik

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateBespokeTheme(sectorId: string, sectorName: string) {
    console.log(`[AI Coder] Generating bespoke Awwwards-level theme for sector: ${sectorName} (${sectorId})...`);

    const systemPrompt = `
        Sen dünyanın en iyi front-end mühendisi ve Awwwards kazanan web tasarımcısısın.
        Görevin: Verilen sektör için TAMAMEN BENZERSİZ, kopyala-yapıştır gridler içermeyen, olağanüstü estetiğe sahip React (Tailwind + Framer Motion) bileşenleri yazmak.

        Kullanılacak teknolojiler: 
        - React (import React)
        - Framer Motion (motion, useScroll, useTransform vs.)
        - Lucide Icons
        - TailwindCSS (Utility classes)

        ŞARTLAR:
        1. Standart Bento Grid KULLANMA. O sektöre uygun çok farklı bir UX tasarla. (Örn: Dişçi için temiz maskelenmiş yatay scroll, Nakliyat için sert endüstriyel clip-path blokları).
        2. Yazdığın kod "packages/templates/src/sections/${sectorId}/${sectorName}BespokeSections.tsx" dosyasına kaydedilecek.
        3. Dosyanın içinde mutlaka şu 4 section olmalı ve register edilmeli:
           - hero::${sectorId}_bespoke_hero
           - about::${sectorId}_bespoke_about
           - services::${sectorId}_bespoke_services
           - contact::${sectorId}_bespoke_contact
        4. "registerSection" fonksiyonunu kullanarak export et:
           import { registerSection, type SectionProps } from '../../registry'
        5. Lütfen SADECE TypeScript/React kodunu dön. Hiçbir Markdown açıklaması ekleme (\`\`\`tsx veya \`\`\` sil). Başında ve sonunda açıklama metni olmasın, sadece saf kod.
    `;

    const userPrompt = `
        Sektör: ${sectorName}
        Bu sektör için Awwwards seviyesinde, bugüne kadar yaptıklarından yapısal olarak farklı (unique layout, unique animations) 4 adet section (Hero, About, Services, Contact) içeren React dosyasını üret.
    `;

    try {
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4000,
            temperature: 0.8,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }]
        });

        const contentBlock = response.content.find(block => block.type === 'text');
        if (!contentBlock || contentBlock.type !== 'text') {
            throw new Error('Invalid response type from Claude');
        }

        let code = contentBlock.text.trim();
        
        // Temizlik: Bazen Claude markdown blokları ekleyebilir
        if (code.startsWith('\`\`\`tsx')) code = code.substring(6);
        if (code.startsWith('\`\`\`typescript')) code = code.substring(13);
        if (code.startsWith('\`\`\`')) code = code.substring(3);
        if (code.endsWith('\`\`\`')) code = code.substring(0, code.length - 3);
        
        code = code.trim();

        const targetDir = path.join(__dirname, `../packages/templates/src/sections/${sectorId}`);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const targetFile = path.join(targetDir, `${sectorName}BespokeSections.tsx`);
        fs.writeFileSync(targetFile, code, 'utf-8');

        console.log(`[Başarılı] ${sectorName} sektörü için benzersiz tema üretildi: ${targetFile}`);

    } catch (error) {
        console.error('[Hata] AI kod üretimi başarısız:', error);
    }
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Kullanım: node generate-bespoke-themes.js <sector_id> <SectorName>');
    process.exit(1);
}

generateBespokeTheme(args[0], args[1]);
