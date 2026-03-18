import {
  Rocket,
  Pencil,
  LayoutGrid,
  Package,
  Store,
  MessageCircle,
  Star,
  CreditCard,
  TrendingUp,
  KeyRound,
  Globe,
  Link2,
  Info,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Wrench,
  HelpCircle,
  TicketCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const DESTEK_ICON_MAP: Record<string, LucideIcon> = {
  rocket: Rocket,
  pencil: Pencil,
  grid: LayoutGrid,
  package: Package,
  store: Store,
  message: MessageCircle,
  star: Star,
  credit: CreditCard,
  trending: TrendingUp,
  key: KeyRound,
  globe: Globe,
  link: Link2,
  wrench: Wrench,
  info: Info,
  lightbulb: Lightbulb,
  warning: AlertTriangle,
  alert: AlertCircle,
  thumbsup: ThumbsUp,
  thumbsdown: ThumbsDown,
  help: HelpCircle,
  ticket: TicketCheck,
}

interface DestekIkonProps {
  ad: string
  className?: string
}

export default function DestekIkon({ ad, className = 'w-5 h-5' }: DestekIkonProps) {
  const Icon = DESTEK_ICON_MAP[ad]
  if (!Icon) return null
  return <Icon className={className} />
}
