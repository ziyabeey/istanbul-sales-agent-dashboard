/**
 * e-Fatura / e-Arşiv Client
 * ──────────────────────────
 * Türkiye'de her satışta zorunlu e-belge.
 * - e-Fatura: Kayıtlı mükellefe (VKN ile)
 * - e-Arşiv: Kayıtsız müşteriye (TC Kimlik ile)
 * 
 * Provider options: Paraşüt, eLogo, EDM, Luca
 * NOTE: Mock implementation. Production → provider API integration.
 */

export interface InvoiceData {
  // Satıcı
  seller: {
    companyName: string
    taxId: string            // VKN
    taxOffice: string
    address: string
    city: string
    phone: string
    email: string
  }
  // Alıcı
  buyer: {
    type: 'individual' | 'corporate'
    name: string
    tcKimlik?: string        // Bireysel
    taxId?: string           // Kurumsal (VKN)
    taxOffice?: string
    companyName?: string
    address: string
    city: string
    phone: string
    email: string
  }
  // Fatura
  invoiceType: 'e_fatura' | 'e_arsiv'
  orderNumber: string
  lineItems: Array<{
    name: string
    quantity: number
    unitPrice: number         // KDV dahil birim fiyat
    totalPrice: number        // KDV dahil toplam
    taxRate: number           // 1, 10, or 20
    taxAmount: number         // Hesaplanan KDV tutarı
  }>
  shipping?: { description: string; price: number; taxRate: number }
  subtotalExcludingTax: number
  totalTax: number
  grandTotal: number
  currency: 'TRY'
  notes?: string
}

export interface InvoiceResult {
  ok: boolean
  invoiceNumber?: string
  pdfUrl?: string
  error?: string
}

/* ═══════ Tax Extraction ═══════ */

/**
 * Extract tax from KDV-inclusive price.
 * Formula: taxAmount = price - (price / (1 + rate/100))
 */
export function extractTax(priceInclTax: number, taxRate: number): { netPrice: number; taxAmount: number } {
  const netPrice = priceInclTax / (1 + taxRate / 100)
  const taxAmount = priceInclTax - netPrice
  return {
    netPrice: Math.round(netPrice * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
  }
}

/**
 * Build InvoiceData from an order document.
 */
export function buildInvoiceFromOrder(order: any, esnafProfile: any): InvoiceData {
  const buyer = order.buyer
  const isCorporate = order.invoice?.type === 'corporate'

  const lineItems = order.lineItems.map((item: any) => {
    const taxRate = item.taxRate || 20
    const { netPrice, taxAmount } = extractTax(item.lineTotal, taxRate)
    return {
      name: item.productName,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.lineTotal,
      taxRate,
      taxAmount,
    }
  })

  const totalTax = lineItems.reduce((sum: number, item: any) => sum + item.taxAmount, 0)
  const grandTotal = order.priceSummary.total

  return {
    seller: {
      companyName: esnafProfile.businessName || esnafProfile.name || '',
      taxId: esnafProfile.taxId || '',
      taxOffice: esnafProfile.taxOffice || '',
      address: esnafProfile.address || '',
      city: esnafProfile.city || '',
      phone: esnafProfile.phone || '',
      email: esnafProfile.email || '',
    },
    buyer: {
      type: isCorporate ? 'corporate' : 'individual',
      name: `${buyer.firstName} ${buyer.lastName}`,
      tcKimlik: buyer.tcKimlik,
      taxId: buyer.taxId,
      taxOffice: buyer.taxOffice,
      companyName: buyer.companyName,
      address: order.billingAddress?.addressLine1 || '',
      city: order.billingAddress?.city || '',
      phone: buyer.phone,
      email: buyer.email,
    },
    invoiceType: isCorporate && buyer.taxId ? 'e_fatura' : 'e_arsiv',
    orderNumber: order.orderNumber,
    lineItems,
    shipping: order.shipping?.price > 0 ? {
      description: `Kargo (${order.shipping.carrierName || 'Standart'})`,
      price: order.shipping.price,
      taxRate: 20,
    } : undefined,
    subtotalExcludingTax: Math.round((grandTotal - totalTax) * 100) / 100,
    totalTax: Math.round(totalTax * 100) / 100,
    grandTotal,
    currency: 'TRY',
  }
}

/**
 * Issue e-Fatura or e-Arşiv.
 * NOTE: Mock implementation. Production → Paraşüt/eLogo API.
 */
export async function issueInvoice(data: InvoiceData): Promise<InvoiceResult> {
  // Production: Call provider API
  // if (PROVIDER === 'parasut') return parasutIssue(data)
  // if (PROVIDER === 'elogo') return elogoIssue(data)

  // Mock: generate invoice number
  const prefix = data.invoiceType === 'e_fatura' ? 'EFT' : 'EAR'
  const year = new Date().getFullYear()
  const seq = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
  const invoiceNumber = `${prefix}${year}${seq}`

  return {
    ok: true,
    invoiceNumber,
    pdfUrl: `/api/v1/ecom/invoices/${invoiceNumber}/pdf`,
  }
}

/**
 * Cancel a previously issued invoice.
 */
export async function cancelInvoice(invoiceNumber: string): Promise<{ ok: boolean; error?: string }> {
  // Production: Call provider cancellation API
  return { ok: true }
}
