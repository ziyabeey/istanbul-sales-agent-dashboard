'use client'
import { HeaderMinimalSticky as _h, HeroFullscreenOverlay as _hero, MenuTabCategories as _menu, ReservationForm as _res, AboutSplitLeft as _about, FooterWarmColumns as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _ck, ThemeRenderer, RESTORAN_TABLEDOT_CONFIG, RESTORAN_TABLEDOT_BUSINESS } from '@kepenk/templates'
void _h; void _hero; void _menu; void _res; void _about; void _f; void _wa; void _ck
export default function Client() { const t = RESTORAN_TABLEDOT_CONFIG; return <div lang="tr"><ThemeRenderer theme={t} page={t.pages[0]!} business={RESTORAN_TABLEDOT_BUSINESS} /></div> }
