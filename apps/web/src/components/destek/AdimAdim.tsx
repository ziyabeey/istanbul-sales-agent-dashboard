interface Adim {
  baslik: string
  aciklama: string
}

interface AdimAdimProps {
  adimlar: Adim[]
}

export default function AdimAdim({ adimlar }: AdimAdimProps) {
  return (
    <div className="space-y-6 my-8">
      {adimlar.map((adim, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm font-syne">
            {i + 1}
          </div>
          <div className="pt-1">
            <h4 className="text-foreground font-semibold mb-1">{adim.baslik}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{adim.aciklama}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
