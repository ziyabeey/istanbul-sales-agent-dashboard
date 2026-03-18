import type { DesignSettings } from '../store/editor-store'

/* ── Border Radius ── */

export interface BorderRadiusOption {
  id: DesignSettings['borderRadius']
  label: string
  value: string
  preview: string
}

export const BORDER_RADIUS_OPTIONS: readonly BorderRadiusOption[] = [
  { id: 'none', label: 'Keskin', value: '0px', preview: '0' },
  { id: 'small', label: 'Yumu\u015fak', value: '6px', preview: '6' },
  { id: 'medium', label: 'Yuvarlak', value: '12px', preview: '12' },
  { id: 'large', label: '\u00c7ok Yuvarlak', value: '20px', preview: '20' },
  { id: 'pill', label: 'Hap', value: '9999px', preview: '9999' },
] as const

/* ── Button Style ── */

export interface ButtonStyleOption {
  id: DesignSettings['buttonStyle']
  label: string
  description: string
}

export const BUTTON_STYLE_OPTIONS: readonly ButtonStyleOption[] = [
  { id: 'solid', label: 'Dolu', description: 'Arka plan dolgulu, beyaz metin' },
  { id: 'outline', label: 'Kenarl\u0131k', description: '\u015eeffaf arka plan, renkli kenarl\u0131k' },
  { id: 'ghost', label: 'Hayalet', description: 'Kenarl\u0131ks\u0131z, hover\'da dolgu' },
  { id: 'pill', label: 'Hap', description: 'Tam yuvarlak k\u00f6\u015feler, dolu' },
] as const

/* ── Shadow Presets ── */

export interface ShadowPreset {
  label: string
  value: string
}

export const SHADOW_PRESETS: Readonly<Record<DesignSettings['shadowLevel'], ShadowPreset>> = {
  none: { label: 'Yok', value: 'none' },
  subtle: { label: 'Hafif', value: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' },
  medium: { label: 'Orta', value: '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)' },
  strong: { label: 'G\u00fc\u00e7l\u00fc', value: '0 10px 40px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)' },
} as const

/* ── Animation Levels ── */

export interface AnimationLevelOption {
  id: DesignSettings['animationLevel']
  label: string
  description: string
  speed: string
}

export const ANIMATION_LEVELS: readonly AnimationLevelOption[] = [
  { id: 'none', label: 'Yok', description: 'Animasyon yok', speed: '0s' },
  { id: 'minimal', label: 'Minimal', description: 'Sadece fade ge\u00e7i\u015fleri', speed: '0.2s' },
  { id: 'standard', label: 'Standart', description: 'Slide + fade ge\u00e7i\u015fleri', speed: '0.35s' },
  { id: 'playful', label: 'Oyuncu', description: 'Bounce + spring efektleri', speed: '0.5s' },
] as const

/* ── Helper: Generate CSS Custom Properties ── */

export function getDesignCSSVariables(settings: {
  borderRadius?: DesignSettings['borderRadius']
  buttonStyle?: DesignSettings['buttonStyle']
  shadowLevel?: DesignSettings['shadowLevel']
  animationLevel?: DesignSettings['animationLevel']
}): Record<string, string> {
  const {
    borderRadius = 'medium',
    buttonStyle = 'solid',
    shadowLevel = 'subtle',
    animationLevel = 'standard',
  } = settings

  const radiusOption = BORDER_RADIUS_OPTIONS.find(o => o.id === borderRadius)
  const radiusValue = radiusOption?.value ?? '12px'

  const btnRadius = buttonStyle === 'pill' ? '9999px' : radiusValue

  const shadowPreset = SHADOW_PRESETS[shadowLevel]
  const shadowValue = shadowPreset?.value ?? 'none'

  const animOption = ANIMATION_LEVELS.find(o => o.id === animationLevel)
  const speedValue = animOption?.speed ?? '0.35s'

  return {
    '--radius': radiusValue,
    '--btn-radius': btnRadius,
    '--shadow-card': shadowValue,
    '--transition-speed': speedValue,
  }
}
