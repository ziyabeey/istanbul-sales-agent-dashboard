import { Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface BilgiKutusuProps {
  tip?: 'info' | 'tip' | 'warning' | 'important'
  baslik?: string
  children: React.ReactNode
}

const STILLER: Record<string, { bg: string; border: string; Icon: LucideIcon; ikonRenk: string }> = {
  info:      { bg: 'bg-blue-50', border: 'border-blue-200', Icon: Info, ikonRenk: 'text-blue-600' },
  tip:       { bg: 'bg-emerald-50', border: 'border-emerald-200', Icon: Lightbulb, ikonRenk: 'text-emerald-600' },
  warning:   { bg: 'bg-amber-50', border: 'border-amber-200', Icon: AlertTriangle, ikonRenk: 'text-amber-600' },
  important: { bg: 'bg-rose-50', border: 'border-rose-200', Icon: AlertCircle, ikonRenk: 'text-rose-600' },
}

export default function BilgiKutusu({ tip = 'info', baslik, children }: BilgiKutusuProps) {
  const stil = STILLER[tip]

  return (
    <div className={`${stil.bg} ${stil.border} border rounded-xl p-5 my-6`}>
      <div className="flex gap-3">
        <stil.Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${stil.ikonRenk}`} />
        <div>
          {baslik && <p className={`font-semibold text-sm mb-1 ${stil.ikonRenk}`}>{baslik}</p>}
          <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
