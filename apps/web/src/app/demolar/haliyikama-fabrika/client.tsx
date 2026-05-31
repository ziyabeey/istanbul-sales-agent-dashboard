import { MinimalLayout } from '@/components/layout/MinimalLayout';
import { SectionRenderer } from '@/components/PreviewViewer';
import { HALIYIKAMA_FABRIKA_CONFIG, HALIYIKAMA_FABRIKA_BUSINESS } from '@xinxia/templates';

import { 
  HaliyikamaFabrikaHero, 
  HaliyikamaFabrikaAbout, 
  HaliyikamaFabrikaServices, 
  HaliyikamaFabrikaGallery, 
  HaliyikamaFabrikaContact 
} from '@xinxia/templates';

const componentMap: Record<string, React.FC<any>> = {
  'haliyikama_fabrika_hero': HaliyikamaFabrikaHero,
  'haliyikama_fabrika_about': HaliyikamaFabrikaAbout,
  'haliyikama_fabrika_services': HaliyikamaFabrikaServices,
  'haliyikama_fabrika_gallery': HaliyikamaFabrikaGallery,
  'haliyikama_fabrika_contact': HaliyikamaFabrikaContact
};

export default function HaliyikamaFabrikaDemoClient() {
  const anasayfa = HALIYIKAMA_FABRIKA_CONFIG.pages.find((p: any) => p.id === 'anasayfa');
  if (!anasayfa) return <div>Sayfa bulunamadı</div>;

  return (
    <MinimalLayout themeConfig={HALIYIKAMA_FABRIKA_CONFIG} businessData={HALIYIKAMA_FABRIKA_BUSINESS}>
      <SectionRenderer 
        sections={anasayfa.sections} 
        componentMap={componentMap} 
        businessData={HALIYIKAMA_FABRIKA_BUSINESS} 
      />
    </MinimalLayout>
  );
}
