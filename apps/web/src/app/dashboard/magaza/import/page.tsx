'use client'

import React, { useState, useRef } from 'react'
import { Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertTriangle, Download, ArrowRight, RefreshCw, Eye, FileText } from 'lucide-react'

type ImportStep = 'upload' | 'validating' | 'preview' | 'importing' | 'done'

interface ImportRowResult {
  row: number; status: 'success' | 'warning' | 'error'; field?: string; message: string
}
interface ValidationReport {
  total: number; success: number; warnings: number; errors: number
  rows: ImportRowResult[]; preview: any[]
}

const PRESETS = [
  { id: 'standard', ad: 'Antigravity Standart', aciklama: 'Varsayılan format' },
  { id: 'woocommerce', ad: 'WooCommerce', aciklama: 'WooCommerce export CSV uyumlu' },
  { id: 'trendyol', ad: 'Trendyol', aciklama: 'Trendyol export formatı' },
  { id: 'hepsiburada', ad: 'Hepsiburada', aciklama: 'HB export formatı' },
]

export default function ImportPage() {
  const [step, setStep] = useState<ImportStep>('upload')
  const [preset, setPreset] = useState('standard')
  const [csvData, setCsvData] = useState('')
  const [fileName, setFileName] = useState('')
  const [report, setReport] = useState<ValidationReport | null>(null)
  const [importSonuc, setImportSonuc] = useState<{ eklenen: number; atlanan: number } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setCsvData(text)
    }
    reader.readAsText(file, 'utf-8')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => setCsvData(ev.target?.result as string)
    reader.readAsText(file, 'utf-8')
  }

  const doValidate = async () => {
    setStep('validating')
    // Demo validasyon raporu
    setTimeout(() => {
      const demoReport: ValidationReport = {
        total: 25, success: 22, warnings: 2, errors: 1,
        rows: [
          { row: 8, status: 'error', field: 'fiyat', message: 'Fiyat boş bırakılamaz' },
          { row: 12, status: 'warning', field: 'gorsel', message: 'Görsel URL erişilemiyor, ürün görselsiz eklenecek' },
          { row: 19, status: 'warning', field: 'barkod', message: 'Barkod formatı hatalı: ABC123' },
        ],
        preview: [
          { ad: 'Organik Zeytinyağı 1L', sku: 'ZYT-001', fiyat: 34990, stok: { miktar: 100 } },
          { ad: 'El Yapımı Sabun Seti', sku: 'SAB-002', fiyat: 14990, stok: { miktar: 250 } },
          { ad: 'Karadeniz Tereyağı', sku: 'TRY-003', fiyat: 17990, stok: { miktar: 80 } },
        ],
      }
      setReport(demoReport)
      setStep('preview')
    }, 1500)
  }

  const doImport = () => {
    setStep('importing')
    setTimeout(() => {
      setImportSonuc({ eklenen: report?.success || 0, atlanan: report?.errors || 0 })
      setStep('done')
    }, 2000)
  }

  const resetAll = () => {
    setStep('upload'); setCsvData(''); setFileName(''); setReport(null); setImportSonuc(null)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black flex items-center gap-2">📥 Toplu Ürün İmport</h1>
          <p className="text-white/40 text-sm mt-1">CSV veya Excel dosyasından ürünleri tek seferde yükleyin</p>
        </div>

        {/* İlerleme Adımları */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { id: 'upload', ad: '1. Yükle' },
            { id: 'preview', ad: '2. Doğrula' },
            { id: 'done', ad: '3. İmport' },
          ].map((s, i) => {
            const aktif = step === s.id || (step === 'validating' && s.id === 'preview') || (step === 'importing' && s.id === 'done')
            const tamamlandi = (s.id === 'upload' && step !== 'upload') || (s.id === 'preview' && (step === 'importing' || step === 'done'))
            return (
              <React.Fragment key={s.id}>
                {i > 0 && <div className={`flex-1 h-0.5 ${tamamlandi ? 'bg-green-500' : 'bg-white/10'}`} />}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${aktif ? 'bg-white/10 text-white' : tamamlandi ? 'text-green-400' : 'text-white/20'}`}>
                  {tamamlandi ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : null}
                  {s.ad}
                </div>
              </React.Fragment>
            )
          })}
        </div>

        {/* Adım 1: Yükle */}
        {step === 'upload' && (
          <div>
            {/* Format Seçimi */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3">Kaynak Format</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESETS.map(p => (
                  <button key={p.id} onClick={() => setPreset(p.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${preset === p.id ? 'border-green-500 bg-green-500/10' : 'border-white/[0.06] bg-[#111] hover:bg-white/[0.03]'}`}>
                    <div className="text-xs font-bold">{p.ad}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{p.aciklama}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dosya Yükleme */}
            <div onDrop={handleDrop} onDragOver={e => e.preventDefault()}
              className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-green-500/30 transition-colors cursor-pointer"
              onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls,.tsv" onChange={handleFile} className="hidden" />
              {fileName ? (
                <div>
                  <FileSpreadsheet className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="font-bold">{fileName}</p>
                  <p className="text-xs text-white/30 mt-1">{csvData.split('\n').length - 1} satır algılandı</p>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-white/15 mx-auto mb-3" />
                  <p className="font-bold text-white/40">CSV veya Excel dosyasını sürükleyin</p>
                  <p className="text-xs text-white/20 mt-1">ya da tıklayıp dosya seçin</p>
                </div>
              )}
            </div>

            {/* Şablon İndirme */}
            <div className="flex items-center gap-3 mt-4">
              <a href={`/api/shop/products/import?preset=${preset}`}
                className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300">
                <Download className="w-3.5 h-3.5" /> Şablon İndir ({PRESETS.find(p => p.id === preset)?.ad})
              </a>
              {fileName && (
                <button onClick={doValidate}
                  className="ml-auto flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                  Doğrula & Önizle <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Adım 2: Doğrulama */}
        {step === 'validating' && (
          <div className="text-center py-16">
            <RefreshCw className="w-10 h-10 text-green-400 mx-auto mb-4 animate-spin" />
            <p className="font-bold">Doğrulanıyor...</p>
            <p className="text-xs text-white/30 mt-1">Satır satır kontrol ediliyor</p>
          </div>
        )}

        {/* Adım 3: Önizleme */}
        {step === 'preview' && report && (
          <div>
            {/* Rapor Kartları */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { baslik: 'Toplam', deger: report.total, renk: '#6b7280', ikon: <FileText className="w-4 h-4" /> },
                { baslik: 'Başarılı', deger: report.success, renk: '#22c55e', ikon: <CheckCircle2 className="w-4 h-4" /> },
                { baslik: 'Uyarı', deger: report.warnings, renk: '#f59e0b', ikon: <AlertTriangle className="w-4 h-4" /> },
                { baslik: 'Hata', deger: report.errors, renk: '#ef4444', ikon: <XCircle className="w-4 h-4" /> },
              ].map(m => (
                <div key={m.baslik} className="bg-[#111] border border-white/[0.06] rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1" style={{ color: m.renk }}>{m.ikon}<span className="text-[10px] uppercase font-bold">{m.baslik}</span></div>
                  <div className="text-2xl font-black">{m.deger}</div>
                </div>
              ))}
            </div>

            {/* Hata/Uyarı Listesi */}
            {report.rows.length > 0 && (
              <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 mb-6">
                <h3 className="text-sm font-bold mb-3">Sorunlar</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {report.rows.map((r, i) => (
                    <div key={i} className={`flex items-center gap-3 text-xs p-2 rounded-lg ${r.status === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                      {r.status === 'error' ? <XCircle className="w-3.5 h-3.5 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
                      <span className="font-mono text-white/40">Satır {r.row}</span>
                      <span className="font-bold">{r.field}</span>
                      <span className="text-white/50">{r.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ürün Önizleme */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5 mb-6">
              <h3 className="text-sm font-bold mb-3 flex items-center gap-1.5"><Eye className="w-4 h-4 text-blue-400" /> Önizleme (İlk 3 ürün)</h3>
              <div className="space-y-2">
                {report.preview.map((u: any, i: number) => (
                  <div key={i} className="flex items-center justify-between bg-white/[0.02] rounded-lg p-3">
                    <div>
                      <div className="text-sm font-bold">{u.ad}</div>
                      <div className="text-[10px] text-white/30 font-mono">SKU: {u.sku}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-400">{(u.fiyat / 100).toFixed(2)} ₺</div>
                      <div className="text-[10px] text-white/30">Stok: {u.stok?.miktar}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={resetAll} className="text-xs text-white/30 hover:text-white/60 px-4 py-2">← Geri Dön</button>
              <button onClick={doImport}
                className="ml-auto flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-40"
                disabled={report.errors > 0 && report.success === 0}>
                {report.success} Ürünü İmport Et <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Adım 4: İmport */}
        {step === 'importing' && (
          <div className="text-center py-16">
            <RefreshCw className="w-10 h-10 text-green-400 mx-auto mb-4 animate-spin" />
            <p className="font-bold">İmport ediliyor...</p>
            <p className="text-xs text-white/30 mt-1">Ürünler Firestore&apos;a yazılıyor</p>
          </div>
        )}

        {/* Adım 5: Sonuç */}
        {step === 'done' && importSonuc && (
          <div className="text-center py-16">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-2">İmport Tamamlandı! 🎉</h2>
            <p className="text-white/40 text-sm mb-6">{importSonuc.eklenen} ürün başarıyla eklendi{importSonuc.atlanan > 0 ? `, ${importSonuc.atlanan} atlandı` : ''}</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={resetAll}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                <Upload className="w-4 h-4" /> Yeni İmport
              </button>
              <a href="/dashboard/magaza/urunler"
                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">
                Ürünleri Gör <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
