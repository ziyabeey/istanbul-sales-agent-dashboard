/**
 * E-Commerce Unit Tests
 * ─────────────────────
 * Tests: cart calculation, coupon, installment, stock, order number
 */
import { describe, it, expect } from 'vitest'

// ─── Cart Price Calculation ───
describe('Cart Price Calculation', () => {
  function calculateCartTotal(items: { price: number; quantity: number; kdvRate?: number }[], coupon?: { type: string; value: number; minAmount?: number }) {
    let subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // KDV included in price (Turkish standard)
    const kdvTotal = items.reduce((sum, item) => {
      const rate = item.kdvRate ?? 20
      return sum + (item.price * item.quantity * rate) / (100 + rate)
    }, 0)

    let discount = 0
    if (coupon) {
      if (coupon.minAmount && subtotal < coupon.minAmount) { /* discount stays 0 */ }
      else if (coupon.type === 'percentage') discount = subtotal * coupon.value / 100
      else if (coupon.type === 'fixed') discount = coupon.value
    }
    const total = Math.max(subtotal - discount, 0)
    return { subtotal, kdvTotal: Math.round(kdvTotal * 100) / 100, discount, total }
  }

  it('should calculate total for single item', () => {
    const result = calculateCartTotal([{ price: 250, quantity: 1 }])
    expect(result.total).toBe(250)
  })

  it('should calculate total for multiple items', () => {
    const result = calculateCartTotal([
      { price: 250, quantity: 2 },
      { price: 450, quantity: 1 },
    ])
    expect(result.total).toBe(950) // 500 + 450
  })

  it('should include KDV in price (Turkish tax-inclusive)', () => {
    const result = calculateCartTotal([{ price: 120, quantity: 1, kdvRate: 20 }])
    expect(result.kdvTotal).toBe(20) // 120 * 20/120 = 20
    expect(result.total).toBe(120) // Price already includes KDV
  })

  it('should apply percentage coupon correctly', () => {
    const result = calculateCartTotal([{ price: 200, quantity: 1 }], { type: 'percentage', value: 10 })
    expect(result.discount).toBe(20)
    expect(result.total).toBe(180)
  })

  it('should apply fixed coupon correctly', () => {
    const result = calculateCartTotal([{ price: 300, quantity: 1 }], { type: 'fixed', value: 50 })
    expect(result.discount).toBe(50)
    expect(result.total).toBe(250)
  })

  it('should not apply coupon below minimum amount', () => {
    const result = calculateCartTotal([{ price: 50, quantity: 1 }], { type: 'percentage', value: 10, minAmount: 100 })
    expect(result.discount).toBe(0)
    expect(result.total).toBe(50)
  })

  it('should not go below zero total', () => {
    const result = calculateCartTotal([{ price: 30, quantity: 1 }], { type: 'fixed', value: 100 })
    expect(result.total).toBe(0)
  })

  it('should handle empty cart gracefully', () => {
    const result = calculateCartTotal([])
    expect(result.total).toBe(0)
    expect(result.subtotal).toBe(0)
  })
})

// ─── Installment Calculation ───
describe('Installment Calculation', () => {
  function calculateInstallment(total: number, installments: number, interestRate: number = 0) {
    const totalWithInterest = total * (1 + interestRate / 100)
    const monthly = totalWithInterest / installments
    return {
      installments,
      monthlyPayment: Math.round(monthly * 100) / 100,
      totalPayment: Math.round(totalWithInterest * 100) / 100,
      interestAmount: Math.round((totalWithInterest - total) * 100) / 100,
    }
  }

  it('should calculate single payment (no installment)', () => {
    const result = calculateInstallment(1000, 1)
    expect(result.monthlyPayment).toBe(1000)
    expect(result.totalPayment).toBe(1000)
    expect(result.interestAmount).toBe(0)
  })

  it('should calculate 3 installments with 3.5% interest', () => {
    const result = calculateInstallment(1000, 3, 3.5)
    expect(result.totalPayment).toBe(1035)
    expect(result.monthlyPayment).toBe(345)
    expect(result.interestAmount).toBe(35)
  })

  it('should handle interest-free installments', () => {
    const result = calculateInstallment(900, 3, 0)
    expect(result.monthlyPayment).toBe(300)
    expect(result.interestAmount).toBe(0)
  })
})

// ─── Variant Cartesian Product ───
describe('Variant Cartesian Product', () => {
  function generateVariants(options: { name: string; values: string[] }[]): Record<string, string>[] {
    if (options.length === 0) return [{}]
    const [first, ...rest] = options
    const restCombos = generateVariants(rest)
    return first.values.flatMap(val => restCombos.map(combo => ({ [first.name]: val, ...combo })))
  }

  it('should generate 12 variants for 3 colors × 4 sizes', () => {
    const variants = generateVariants([
      { name: 'renk', values: ['Kırmızı', 'Mavi', 'Yeşil'] },
      { name: 'beden', values: ['S', 'M', 'L', 'XL'] },
    ])
    expect(variants.length).toBe(12)
  })

  it('should generate 1 variant for empty options', () => {
    expect(generateVariants([])).toEqual([{}])
  })

  it('should generate correct keys', () => {
    const [first] = generateVariants([{ name: 'renk', values: ['Kırmızı'] }, { name: 'beden', values: ['M'] }])
    expect(first).toEqual({ renk: 'Kırmızı', beden: 'M' })
  })
})

// ─── Order Number Generation ───
describe('Order Number Generation', () => {
  function generateOrderNumber(sequence: number, year: number = new Date().getFullYear()): string {
    return `KPN-${year}-${String(sequence).padStart(5, '0')}`
  }

  it('should generate KPN-YYYY-XXXXX format', () => {
    const num = generateOrderNumber(1, 2026)
    expect(num).toBe('KPN-2026-00001')
  })

  it('should pad to 5 digits', () => {
    expect(generateOrderNumber(42, 2026)).toBe('KPN-2026-00042')
  })

  it('should handle large numbers', () => {
    expect(generateOrderNumber(99999, 2026)).toBe('KPN-2026-99999')
  })
})

// ─── Turkish Slug ───
describe('Turkish Slug Generation', () => {
  function turkishSlug(text: string): string {
    return text.toLowerCase()
      .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
      .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  it('should convert Turkish chars correctly', () => {
    expect(turkishSlug('Çiğ Köfte Şırdan Güneş')).toBe('cig-kofte-sirdan-gunes')
  })

  it('should handle spaces and special chars', () => {
    expect(turkishSlug('Dana Kıyma - %100 Taze!')).toBe('dana-kiyma-100-taze')
  })

  it('should trim leading/trailing hyphens', () => {
    expect(turkishSlug('  test  ')).toBe('test')
  })
})
