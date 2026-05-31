import { MinimalLayout } from '@/components/layout/MinimalLayout';
import { SectionRenderer } from '@/components/PreviewViewer';
import { HALIYIKAMA_LUX_CONFIG, HALIYIKAMA_LUX_BUSINESS } from '@xinxia/templates';

import { 
  HaliyikamaLuxHero, 
  HaliyikamaLuxAbout, 
  HaliyikamaLuxServices, 
  HaliyikamaLuxGallery, 
  HaliyikamaLuxContact 
} from '@xinxia/templates';

const componentMap: Record<string, React.FC<any>> = {
  'haliyikama_lux_hero': HaliyikamaLuxHero,
  'haliyikama_lux_about': HaliyikamaLuxAbout,
  'haliyikama_lux_services': HaliyikamaLuxServices,
  'haliyikama_lux_gallery': HaliyikamaLuxGallery,
  'haliyikama_lux_contact': HaliyikamaLuxContact
};

export default function HaliyikamaLuxDemoClient() {
  const anasayfa = HALIYIKAMA_LUX_CONFIG.pages.find((p: any) => p.id === 'anasayfa');
  if (!anasayfa) return <div>Sayfa bulunamadı</div>;

  return (
    <MinimalLayout themeConfig={HALIYIKAMA_LUX_CONFIG} businessData={HALIYIKAMA_LUX_BUSINESS}>
      <SectionRenderer 
        sections={anasayfa.sections} 
        componentMap={componentMap} 
        businessData={HALIYIKAMA_LUX_BUSINESS} 
      />
    </MinimalLayout>
  );
}
