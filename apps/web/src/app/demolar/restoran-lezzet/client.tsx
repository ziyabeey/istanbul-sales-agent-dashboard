'use client'
import { HeaderMinimalSticky as _h, HeroFullscreenOverlay as _hero, MenuTabCategories as _menu, ReservationForm as _res, TestimonialsCarousel as _test, ContactSimpleForm as _contact, FooterMinimal as _f, WhatsAppFloating as _wa, CookieBannerBottomBar as _ck, ThemeRenderer, RESTORAN_LEZZET_CONFIG, RESTORAN_LEZZET_BUSINESS } from '@kepenk/templates'
void _h; void _hero; void _menu; void _res; void _test; void _contact; void _f; void _wa; void _ck
export default function Client() { const t = RESTORAN_LEZZET_CONFIG; return <div lang="tr"><ThemeRenderer theme={t} page={t.pages[0]!} business={RESTORAN_LEZZET_BUSINESS} /></div> }
