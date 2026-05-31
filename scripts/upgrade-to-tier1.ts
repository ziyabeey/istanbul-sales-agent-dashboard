import * as fs from 'fs';
import * as path from 'path';

const CONFIG_DIR = path.join(__dirname, '../packages/templates/src/themes/configs');

function determineVibe(id: string): 'asymmetric' | 'editorial' | 'bento' {
  const parts = id.split('-');
  const suffix = parts[parts.length - 1]; // e.g. 'sade', 'lux', 'blade', 'su'
  
  // Asymmetric (Dark/Neon)
  if (['blade', 'gece', 'acil', 'endustriyel', 'motorsiklet'].includes(suffix)) return 'asymmetric';
  
  // Editorial (Luxury/Earthy/Art)
  if (['lux', 'elite', 'prestige', 'premium', 'studio', 'narin', 'doga', 'organik', 'sanat'].includes(suffix)) return 'editorial';
  
  // Bento (Corporate/Standard/Clean)
  return 'bento';
}

function getTier1SectionsString(vibe: 'asymmetric' | 'editorial' | 'bento', businessRef: string) {
  if (vibe === 'asymmetric') {
    return `[
        {
          id: 'hero',
          type: 'hero',
          variant: 'tier1_asymmetric_hero',
          order: 1,
          required: true,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, removable: false, animation: 'none' },
          defaultContent: { badge: 'VİZYON', title: ${businessRef}.name, subtitle: ${businessRef}.slogan },
          editableFields: []
        },
        {
          id: 'hakkimizda',
          type: 'about',
          variant: 'tier1_asymmetric_about',
          order: 2,
          required: true,
          settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 2, removable: true, animation: 'none' },
          defaultContent: { title: 'Fark Yaratan Vizyon' },
          editableFields: []
        },
        {
          id: 'hizmetler',
          type: 'services',
          variant: 'tier1_asymmetric_services',
          order: 3,
          required: true,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 3, removable: false, animation: 'none' },
          defaultContent: { badge: 'OPERASYON', title: 'Çözüm Odaklı Yaklaşım' },
          editableFields: []
        },
        {
          id: 'iletisim',
          type: 'contact',
          variant: 'tier1_asymmetric_contact',
          order: 4,
          required: true,
          settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 4, removable: false, animation: 'none' },
          defaultContent: { title: 'Bağlantı Kurun' },
          editableFields: []
        }
      ]`;
  }

  if (vibe === 'editorial') {
    return `[
        {
          id: 'hero',
          type: 'hero',
          variant: 'tier1_editorial_hero',
          order: 1,
          required: true,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, removable: false, animation: 'none' },
          defaultContent: { badge: 'ÖZEL KONSEPT', title: ${businessRef}.name, subtitle: ${businessRef}.slogan },
          editableFields: []
        },
        {
          id: 'hakkimizda',
          type: 'about',
          variant: 'tier1_editorial_about',
          order: 2,
          required: true,
          settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 2, removable: true, animation: 'none' },
          defaultContent: { title: 'Felsefemiz' },
          editableFields: []
        },
        {
          id: 'hizmetler',
          type: 'services',
          variant: 'tier1_editorial_services',
          order: 3,
          required: true,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 3, removable: false, animation: 'none' },
          defaultContent: { badge: 'ATELIER', title: 'Seçkin Koleksiyon' },
          editableFields: []
        },
        {
          id: 'iletisim',
          type: 'contact',
          variant: 'tier1_editorial_contact',
          order: 4,
          required: true,
          settings: { bgMode: 'text', paddingY: 'none', containerWidth: 'full', visible: true, order: 4, removable: false, animation: 'none' },
          defaultContent: { title: 'Randevu & Danışmanlık' },
          editableFields: []
        }
      ]`;
  }

  return `[
        {
          id: 'hero',
          type: 'hero',
          variant: 'tier1_bento_hero',
          order: 1,
          required: true,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 1, removable: false, animation: 'none' },
          defaultContent: { badge: 'GÜVENAL A.Ş.', title: ${businessRef}.name, subtitle: ${businessRef}.slogan },
          editableFields: []
        },
        {
          id: 'hakkimizda',
          type: 'gallery',
          variant: 'tier1_bento_gallery',
          order: 2,
          required: true,
          settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 2, removable: true, animation: 'none' },
          defaultContent: { badge: 'VİTRİN', title: 'KURUMSAL KİMLİK' },
          editableFields: []
        },
        {
          id: 'hizmetler',
          type: 'services',
          variant: 'tier1_bento_services',
          order: 3,
          required: true,
          settings: { bgMode: 'default', paddingY: 'none', containerWidth: 'full', visible: true, order: 3, removable: false, animation: 'none' },
          defaultContent: { badge: 'YETKİNLİKLER', title: 'Sektörel Çözümler' },
          editableFields: []
        },
        {
          id: 'iletisim',
          type: 'contact',
          variant: 'tier1_bento_contact',
          order: 4,
          required: true,
          settings: { bgMode: 'surface', paddingY: 'none', containerWidth: 'full', visible: true, order: 4, removable: false, animation: 'none' },
          defaultContent: { badge: 'İLETİŞİM', title: 'Görüşme Ayarla' },
          editableFields: []
        }
      ]`;
}

function processAll() {
  const files = fs.readdirSync(CONFIG_DIR).filter(f => f.endsWith('.ts'));
  let updatedCount = 0;

  for (const file of files) {
    const p = path.join(CONFIG_DIR, file);
    let content = fs.readFileSync(p, 'utf-8');

    // Only skip our North Star specific configs manually crafted with non-generated structures
    if (file.includes('berber-blade-config') || file.includes('berber-gentleman-config') || file.includes('oto-vip-config')) {
      continue;
    }

    const themeId = file.replace('-config.ts', '');
    const vibe = determineVibe(themeId);

    // Business Data Reference extraction (e.g. KARGO_DOSYA_BUSINESS)
    const businessMatch = content.match(/export const ([A-Z0-9_]+_BUSINESS) = \{/);
    if (!businessMatch) continue;
    
    const businessRef = businessMatch[1];
    const newSectionsString = getTier1SectionsString(vibe, businessRef);

    // Replace the sections array block inside pages
    // We look for:
    //       sections: [
    //         ...
    //       ],
    //     },
    //   ],
    // } as unknown as ThemeConfig
    
    // Split on 'sections: [' and replace everything until '     },' that closes the page
    // Actually, Regex with dotall might be tricky. Let's do a more robust string replacement
    const startIdx = content.indexOf('sections: [');
    if (startIdx === -1) continue;

    const sectionsEndSignature = `      ],\n    },\n  ],\n} as unknown as ThemeConfig`;
    const sectionsEndSignatureAlt = `      ]\n    }\n  ]\n} as unknown as ThemeConfig`; 
    
    // Just find the last '] } ] }' logic roughly
    let endIdx = content.indexOf(`],\n    },`, startIdx);
    if (endIdx === -1) endIdx = content.indexOf(`]\n    },`, startIdx);

    if (endIdx !== -1) {
       const before = content.substring(0, startIdx);
       const after = content.substring(endIdx + 1); // keep the ',\n    },'
       
       const newContent = `${before}sections: ${newSectionsString}${after}`;
       
       if (newContent !== content) {
          fs.writeFileSync(p, newContent, 'utf-8');
          updatedCount++;
       }
    }
  }

  console.log(`Upgraded to Tier-1 Sections for ${updatedCount} config files.`);
}

processAll();
