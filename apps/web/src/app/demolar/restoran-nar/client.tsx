'use client'
import { HeaderMinimalSticky as _h, HeroFullscreenOverlay as _hero, MenuVisualGrid as _menu, ReservationForm as _res, StatsAnimatedRow as _stats, CTAFullWidthBanner as _cta, FooterMinimal as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _ck, ThemeRenderer, RESTORAN_NAR_CONFIG, RESTORAN_NAR_BUSINESS } from '@kepenk/templates'
void _h; void _hero; void _menu; void _res; void _stats; void _cta; void _f; void _wa; void _ck
export default function Client() { const t = RESTORAN_NAR_CONFIG; return <div lang="tr" style={{ background: '#0A0A0A', color: '#F5F5F5' }}><ThemeRenderer theme={t} page={t.pages[0]!} business={RESTORAN_NAR_BUSINESS} /></div> }
