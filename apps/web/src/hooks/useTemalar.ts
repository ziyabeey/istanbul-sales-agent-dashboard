'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import type { TemaKartiItem, TemalarFiltreleri } from '@/types/temaKatalogu'
import { SAYFA_BOYUTU } from '@/data/temaKatalogu'

const BASLANGIC: TemalarFiltreleri = {
  arama: '',
  sektor: '',
  paket: '',
  stil: '',
  siteTipi: '',
  ozellik: '',
}

export function useTemalar(tumTemalar: TemaKartiItem[]) {
  const [filtreler, setFiltreler] = useState<TemalarFiltreleri>(BASLANGIC)
  const [debouncedArama, setDebouncedArama] = useState('')
  const [sayfa, setSayfa] = useState(1)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Arama debounce (300ms)
  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setDebouncedArama(filtreler.arama)
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [filtreler.arama])

  const filtreGuncelle = useCallback((key: keyof TemalarFiltreleri, value: string) => {
    setFiltreler(prev => {
      // Toggle: aynı değere tekrar tıklanırsa temizle (arama hariç)
      const yeniDeger = key !== 'arama' && prev[key] === value ? '' : value
      return { ...prev, [key]: yeniDeger }
    })
    if (key !== 'arama') setSayfa(1)
  }, [])

  const filtreleriSifirla = useCallback(() => {
    setFiltreler(BASLANGIC)
    setDebouncedArama('')
    setSayfa(1)
  }, [])

  const aktifFiltreSayisi = useMemo(() => {
    let sayi = 0
    if (filtreler.sektor) sayi++
    if (filtreler.paket) sayi++
    if (filtreler.stil) sayi++
    if (filtreler.siteTipi) sayi++
    if (filtreler.ozellik) sayi++
    return sayi
  }, [filtreler])

  const filtrelenmisTemalar = useMemo(() => {
    return tumTemalar.filter(t => {
      // Arama
      if (debouncedArama) {
        const q = debouncedArama.toLowerCase()
        const eslesme =
          t.ad.toLowerCase().includes(q) ||
          t.sektorAd.toLowerCase().includes(q) ||
          t.temaStilAd.toLowerCase().includes(q) ||
          t.etiketler.some(e => e.toLowerCase().includes(q))
        if (!eslesme) return false
      }
      // Sektör
      if (filtreler.sektor && t.sektorId !== filtreler.sektor) return false
      // Paket
      if (filtreler.paket && t.minPaket !== filtreler.paket) return false
      // Stil
      if (filtreler.stil && t.temaStilId !== filtreler.stil) return false
      // Site tipi
      if (filtreler.siteTipi && t.siteTipi !== filtreler.siteTipi) return false
      // Özellik
      if (filtreler.ozellik && !t.ozellikler.includes(filtreler.ozellik)) return false
      return true
    })
  }, [tumTemalar, debouncedArama, filtreler])

  const toplamSayfa = Math.ceil(filtrelenmisTemalar.length / SAYFA_BOYUTU)

  const sayfaliTemalar = useMemo(() => {
    const baslangic = (sayfa - 1) * SAYFA_BOYUTU
    return filtrelenmisTemalar.slice(baslangic, baslangic + SAYFA_BOYUTU)
  }, [filtrelenmisTemalar, sayfa])

  // Sektör bazlı tema sayıları (pill badge)
  const sektorSayilari = useMemo(() => {
    const sayilar: Record<string, number> = {}
    tumTemalar.forEach(t => {
      sayilar[t.sektorId] = (sayilar[t.sektorId] || 0) + 1
    })
    return sayilar
  }, [tumTemalar])

  return {
    filtreler,
    filtreGuncelle,
    filtreleriSifirla,
    aktifFiltreSayisi,
    filtrelenmisTemalar,
    sayfaliTemalar,
    sayfa,
    setSayfa,
    toplamSayfa,
    toplamSonuc: filtrelenmisTemalar.length,
    sektorSayilari,
  }
}
