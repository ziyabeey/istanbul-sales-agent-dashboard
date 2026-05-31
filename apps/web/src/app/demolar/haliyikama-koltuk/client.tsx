import { MinimalLayout } from '@/components/layout/MinimalLayout';
import { SectionRenderer } from '@/components/PreviewViewer';
import { HALIYIKAMA_KOLTUK_CONFIG, HALIYIKAMA_KOLTUK_BUSINESS } from '@xinxia/templates';

import { 
  HaliyikamaKoltukHero, 
  HaliyikamaKoltukAbout, 
  HaliyikamaKoltukServices, 
  HaliyikamaKoltukGallery, 
  HaliyikamaKoltukContact 
} from '@xinxia/templates';

const componentMap: Record<string, React.FC<any>> = {
  'haliyikama_koltuk_hero': HaliyikamaKoltukHero,
  'haliyikama_koltuk_about': HaliyikamaKoltukAbout,
  'haliyikama_koltuk_services': HaliyikamaKoltukServices,
  'haliyikama_koltuk_gallery': HaliyikamaKoltukGallery,
  'haliyikama_koltuk_contact': HaliyikamaKoltukContact
};

export default function HaliyikamaKoltukDemoClient() {
  const anasayfa = HALIYIKAMA_KOLTUK_CONFIG.pages.find((p: any) => p.id === 'anasayfa');
  if (!anasayfa) return <div>Sayfa bulunamadı</div>;

  return (
    <MinimalLayout themeConfig={HALIYIKAMA_KOLTUK_CONFIG} businessData={HALIYIKAMA_KOLTUK_BUSINESS}>
      <SectionRenderer 
        sections={anasayfa.sections} 
        componentMap={componentMap} 
        businessData={HALIYIKAMA_KOLTUK_BUSINESS} 
      />
    </MinimalLayout>
  );
}
