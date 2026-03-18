/**
 * @kepenk/templates — Sector Registry (8 Sektör)
 */

import type { SectorConfig } from '../types/template'
import { berberTemplates } from './berber'
import { restoranTemplates } from './restoran'
import { doktorTemplates } from './doktor'
import { guzellikTemplates } from './guzellik'
import { avukatTemplates } from './avukat'
import { disTemplates } from './dis'
import { otoTemplates } from './oto'
import { sporTemplates } from './spor'

export const SECTORS: SectorConfig[] = [
  {
    id: 'berber',
    name: 'Berber & Kuaför',
    icon: 'Scissors',
    description: 'Erkek kuaförü, berber dükkanı',
    color: '#C9A84C',
    templates: berberTemplates,
  },
  {
    id: 'restoran',
    name: 'Restoran & Kafe',
    icon: 'UtensilsCrossed',
    description: 'Restoran, kafe, pastane, fast food',
    color: '#C84B31',
    templates: restoranTemplates,
  },
  {
    id: 'doktor',
    name: 'Doktor & Klinik',
    icon: 'Stethoscope',
    description: 'Doktor muayenehanesi, özel klinik',
    color: '#0077B6',
    templates: doktorTemplates,
  },
  {
    id: 'guzellik',
    name: 'Güzellik Salonu',
    icon: 'Sparkles',
    description: 'Güzellik merkezi, cilt bakımı, spa',
    color: '#BE185D',
    templates: guzellikTemplates,
  },
  {
    id: 'avukat',
    name: 'Avukat & Hukuk',
    icon: 'Scale',
    description: 'Hukuk bürosu, avukatlık',
    color: '#D4AF37',
    templates: avukatTemplates,
  },
  {
    id: 'dis',
    name: 'Diş Kliniği',
    icon: 'HeartPulse',
    description: 'Diş hekimliği, ağız sağlığı',
    color: '#06B6D4',
    templates: disTemplates,
  },
  {
    id: 'oto',
    name: 'Oto Tamir & Servis',
    icon: 'Wrench',
    description: 'Oto tamir, yedek parça, servis',
    color: '#DC2626',
    templates: otoTemplates,
  },
  {
    id: 'spor',
    name: 'Spor Salonu & Fitness',
    icon: 'Dumbbell',
    description: 'Fitness, gym, yoga, pilates',
    color: '#7C3AED',
    templates: sporTemplates,
  },
]
