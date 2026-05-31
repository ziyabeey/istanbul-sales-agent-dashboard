import * as fs from 'fs';
import * as path from 'path';

const CONFIG_DIR = path.join(__dirname, '../packages/templates/src/themes/configs');

function processAll() {
  const files = fs.readdirSync(CONFIG_DIR).filter(f => f.endsWith('.ts'));
  let updatedCount = 0;

  for (const file of files) {
    const p = path.join(CONFIG_DIR, file);
    let content = fs.readFileSync(p, 'utf-8');

    // Add general editable fields to Tier-1 sections statically in the files.
    // Replace `editableFields: []` with appropriate fields depending on the variant.

    let modified = false;

    // HERO (Asymmetric, Editorial, Bento)
    if (content.includes("type: 'hero',") && content.includes("variant: 'tier1_")) {
        content = content.replace(/editableFields: \[\]([^\]]*?id: 'hakkimizda')/s, 
        `editableFields: [
            { path: 'badge', label: 'Rozet / Etiket', type: 'text' },
            { path: 'title', label: 'Ana Başlık', type: 'text' },
            { path: 'subtitle', label: 'Açıklama / Slogan', type: 'textarea' },
            { path: 'cta1.text', label: 'Buton Yazısı', type: 'text' }
          ]$1`);
        modified = true;
    }

    // ABOUT / GALLERY (Asymmetric, Editorial, Bento)
    if (content.includes("id: 'hakkimizda'") && content.includes("variant: 'tier1_")) {
        content = content.replace(/editableFields: \[\]([^\]]*?id: 'hizmetler')/s, 
        `editableFields: [
            { path: 'badge', label: 'Rozet', type: 'text' },
            { path: 'title', label: 'Bölüm Başlığı', type: 'text' },
            { path: 'description', label: 'Açıklama Metni', type: 'textarea' }
          ]$1`);
        modified = true;
    }

    // SERVICES (Asymmetric, Editorial, Bento)
    if (content.includes("id: 'hizmetler'") && content.includes("variant: 'tier1_")) {
        content = content.replace(/editableFields: \[\]([^\]]*?id: 'iletisim')/s, 
        `editableFields: [
            { path: 'badge', label: 'Servis Rozeti', type: 'text' },
            { path: 'title', label: 'Servis Başlığı', type: 'text' }
          ]$1`);
        modified = true;
    }

    // CONTACT (Asymmetric, Editorial, Bento)
    if (content.includes("id: 'iletisim'") && content.includes("variant: 'tier1_")) {
        content = content.replace(/editableFields: \[\](\s*\}\s*\])/s, 
        `editableFields: [
            { path: 'badge', label: 'İletişim Rozeti', type: 'text' },
            { path: 'title', label: 'İletişim Başlığı', type: 'text' }
          ]$1`);
        modified = true;
    }

    if (modified) {
       fs.writeFileSync(p, content, 'utf-8');
       updatedCount++;
    }
  }

  console.log(`Upgraded editableFields for ${updatedCount} config files.`);
}

processAll();
