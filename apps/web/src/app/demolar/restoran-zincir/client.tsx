'use client'
import { HeaderMinimalSticky as _h, HeroFullscreenOverlay as _hero, MenuVisualGrid as _menu, StatsAnimatedRow as _stats, DeliveryZoneMap as _dz, CTAFullWidthBanner as _cta, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _ck, ThemeRenderer, RESTORAN_ZINCIR_CONFIG, RESTORAN_ZINCIR_BUSINESS } from '@kepenk/templates'
void _h; void _hero; void _menu; void _stats; void _dz; void _cta; void _f; void _wa; void _ck
export default function Client() { const t = RESTORAN_ZINCIR_CONFIG; return <div lang="tr"><ThemeRenderer theme={t} page={t.pages[0]!} business={RESTORAN_ZINCIR_BUSINESS} /></div> }
