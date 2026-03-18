/**
 * Installment Options API — Fetch taksit seçenekleri
 * ───────────────────────────────────────────────────
 * POST /api/v1/ecom/installments
 * 
 * Body:
 *   - binNumber: string (ilk 6 hane)
 *   - amount: number (₺)
 *   - esnafId: string
 * 
 * Returns: InstallmentOption[] for native taksit table UI
 * 
 * NOTE: This is a mock implementation. In production,
 * this calls İyzico or PayTR API with the BIN number.
 */

import { NextResponse } from 'next/server'

interface InstallmentOption {
  installmentCount: number
  installmentAmount: number
  totalAmount: number
  interestRate: number
  bankName: string
  cardType: string
  isInterestFree: boolean
}

// BIN → Bank mapping (common Turkish banks)
const BIN_BANKS: Record<string, { name: string; type: string }> = {
  '454360': { name: 'İş Bankası', type: 'Visa' },
  '540667': { name: 'Yapı Kredi', type: 'Mastercard' },
  '549220': { name: 'Garanti', type: 'Mastercard' },
  '428220': { name: 'Akbank', type: 'Visa' },
  '413226': { name: 'QNB Finansbank', type: 'Visa' },
  '526911': { name: 'Halkbank', type: 'Mastercard' },
  '589004': { name: 'Vakıfbank', type: 'Troy' },
  '979204': { name: 'Ziraat Bankası', type: 'Troy' },
}

function generateInstallmentOptions(
  amount: number,
  bankName: string,
  cardType: string
): InstallmentOption[] {
  const options: InstallmentOption[] = [
    // Tek çekim — always available
    {
      installmentCount: 1,
      installmentAmount: amount,
      totalAmount: amount,
      interestRate: 0,
      bankName,
      cardType,
      isInterestFree: true,
    },
  ]

  // Taksit seçenekleri: 2, 3, 6, 9, 12
  const installmentConfigs = [
    { count: 2, rate: 0, free: true },
    { count: 3, rate: 0, free: true },      // Faizsiz 3 taksit kampanyası
    { count: 6, rate: 3.99, free: false },
    { count: 9, rate: 7.49, free: false },
    { count: 12, rate: 11.99, free: false },
  ]

  for (const config of installmentConfigs) {
    const totalWithInterest = config.free ? amount : amount * (1 + config.rate / 100)
    const installmentAmount = totalWithInterest / config.count

    options.push({
      installmentCount: config.count,
      installmentAmount: Math.round(installmentAmount * 100) / 100,
      totalAmount: Math.round(totalWithInterest * 100) / 100,
      interestRate: config.rate,
      bankName,
      cardType,
      isInterestFree: config.free,
    })
  }

  return options
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { binNumber, amount, esnafId } = body

    if (!binNumber || !amount || !esnafId) {
      return NextResponse.json({ error: 'binNumber, amount ve esnafId gerekli' }, { status: 400 })
    }

    if (binNumber.length < 6) {
      return NextResponse.json({ error: 'BIN numarası en az 6 hane olmalı' }, { status: 400 })
    }

    const bin6 = binNumber.substring(0, 6)

    // In production: call İyzico/PayTR API here
    // const iyzicoResponse = await iyzico.getInstallmentInfo({ binNumber: bin6, price: amount })

    // Mock: use BIN mapping or default
    const bank = BIN_BANKS[bin6] || { name: 'Banka', type: 'Visa' }
    const options = generateInstallmentOptions(amount, bank.name, bank.type)

    return NextResponse.json({
      ok: true,
      binNumber: bin6,
      bank: bank.name,
      cardType: bank.type,
      options,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Taksit seçenekleri getirilemedi', detay: error.message }, { status: 500 })
  }
}
