import { MinimalLayout } from '@/components/layout/MinimalLayout';
import { SectionRenderer } from '@/components/PreviewViewer';
import { HALIYIKAMA_ORGANIK_CONFIG, HALIYIKAMA_ORGANIK_BUSINESS } from '@xinxia/templates';

import { 
  HaliyikamaOrganikHero, 
  HaliyikamaOrganikAbout, 
  HaliyikamaOrganikServices, 
  HaliyikamaOrganikGallery, 
  HaliyikamaOrganikContact 
} from '@xinxia/templates';

const componentMap: Record<string, React.FC<any>> = {
  'haliyikama_organik_hero': HaliyikamaOrganikHero,
  'haliyikama_organik_about': HaliyikamaOrganikAbout,
  'haliyikama_organik_services': HaliyikamaOrganikServices,
  'haliyikama_organik_gallery': HaliyikamaOrganikGallery,
  'haliyikama_organik_contact': HaliyikamaOrganikContact
};

export default function HaliyikamaOrganikDemoClient() {
  const anasayfa = HALIYIKAMA_ORGANIK_CONFIG.pages.find((p: any) => p.id === 'anasayfa');
  if (!anasayfa) return <div>Sayfa bulunamadı</div>;

  return (
    <MinimalLayout themeConfig={HALIYIKAMA_ORGANIK_CONFIG} businessData={HALIYIKAMA_ORGANIK_BUSINESS}>
      <SectionRenderer 
        sections={anasayfa.sections} 
        componentMap={componentMap} 
        businessData={HALIYIKAMA_ORGANIK_BUSINESS} 
      />
    </MinimalLayout>
  );
}
