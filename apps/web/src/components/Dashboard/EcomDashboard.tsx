/**
 * Dashboard E-Commerce Widgets
 * ─────────────────────────────
 * Admin dashboard components for order management and analytics.
 */

'use client'

import React, { useState, useEffect } from 'react'

/* ═══════════════════════════════════════════════
   ORDER STATUS BADGE
   ═══════════════════════════════════════════════ */

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Beklemede', color: '#f59e0b', bg: '#fffbeb' },
  confirmed: { label: 'Onaylandı', color: '#3b82f6', bg: '#eff6ff' },
  processing: { label: 'Hazırlanıyor', color: '#8b5cf6', bg: '#f5f3ff' },
  shipped: { label: 'Kargoda', color: '#06b6d4', bg: '#ecfeff' },
  delivered: { label: 'Teslim Edildi', color: '#10b981', bg: '#ecfdf5' },
  cancelled: { label: 'İptal Edildi', color: '#ef4444', bg: '#fef2f2' },
  returned: { label: 'İade Edildi', color: '#64748b', bg: '#f1f5f9' },
}

export function OrderStatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: 6,
      fontSize: 11, fontWeight: 800,
      color: config.color, backgroundColor: config.bg,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: config.color }} />
      {config.label}
    </span>
  )
}

/* ═══════════════════════════════════════════════
   ECOM STATS CARDS
   ═══════════════════════════════════════════════ */

interface EcomStats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  lowStockProducts: number
}

export function EcomStatsCards({ stats }: { stats: EcomStats }) {
  const cards = [
    { label: 'Toplam Sipariş', value: stats.totalOrders, icon: '📦', color: '#3b82f6' },
    { label: 'Toplam Gelir', value: `₺${stats.totalRevenue.toLocaleString('tr-TR')}`, icon: '💰', color: '#10b981' },
    { label: 'Bekleyen Sipariş', value: stats.pendingOrders, icon: '⏳', color: '#f59e0b' },
    { label: 'Düşük Stok', value: stats.lowStockProducts, icon: '⚠️', color: '#ef4444' },
  ]

  return (
    <>
      <style>{`
        .ke-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 768px) { .ke-stats { grid-template-columns: repeat(2, 1fr); } }
        .ke-stat { padding: 20px; border-radius: 12px; background: #fff; border: 1px solid #e8ecf1; }
        .ke-stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .ke-stat-label { font-size: 12px; font-weight: 700; color: #64748b; }
        .ke-stat-icon { font-size: 20px; }
        .ke-stat-value { font-size: 24px; font-weight: 900; color: #0f172a; }
      `}</style>
      <div className="ke-stats">
        {cards.map(c => (
          <div key={c.label} className="ke-stat">
            <div className="ke-stat-top">
              <span className="ke-stat-label">{c.label}</span>
              <span className="ke-stat-icon">{c.icon}</span>
            </div>
            <div className="ke-stat-value">{c.value}</div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════
   ORDER LIST TABLE
   ═══════════════════════════════════════════════ */

interface OrderListItem {
  id: string
  orderNumber: string
  buyer: { firstName: string; lastName: string }
  priceSummary: { total: number }
  status: string
  paymentStatus: string
  createdAt: string
  lineItems: any[]
}

interface OrderListProps {
  orders: OrderListItem[]
  onSelectOrder: (orderId: string) => void
}

export function OrderListTable({ orders, onSelectOrder }: OrderListProps) {
  return (
    <>
      <style>{`
        .ke-olt { width: 100%; border-collapse: separate; border-spacing: 0; }
        .ke-olt th { padding: 10px 14px; font-size: 11px; font-weight: 800; color: #64748b; text-align: left; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e8ecf1; }
        .ke-olt td { padding: 12px 14px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9; }
        .ke-olt tr { cursor: pointer; transition: background 0.1s; }
        .ke-olt tbody tr:hover td { background: #f8fafc; }
        .ke-olt-num { font-weight: 700; color: #0f172a; }
        .ke-olt-cust { font-weight: 600; }
        .ke-olt-price { font-weight: 800; }
        .ke-olt-date { font-size: 12px; color: #94a3b8; }
        .ke-olt-items { font-size: 12px; color: #64748b; }
      `}</style>
      <table className="ke-olt">
        <thead>
          <tr>
            <th>Sipariş</th>
            <th>Müşteri</th>
            <th>Tutar</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th>Ürün</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} onClick={() => onSelectOrder(order.id)}>
              <td className="ke-olt-num">{order.orderNumber}</td>
              <td className="ke-olt-cust">{order.buyer.firstName} {order.buyer.lastName}</td>
              <td className="ke-olt-price">₺{order.priceSummary.total.toLocaleString('tr-TR')}</td>
              <td><OrderStatusBadge status={order.status} /></td>
              <td className="ke-olt-date">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</td>
              <td className="ke-olt-items">{order.lineItems?.length || 0} ürün</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

/* ═══════════════════════════════════════════════
   REVENUE CHART (Simple bar chart)
   ═══════════════════════════════════════════════ */

interface RevenueDay {
  date: string
  revenue: number
  orders: number
}

export function RevenueChart({ data }: { data: RevenueDay[] }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1)

  return (
    <>
      <style>{`
        .ke-rc { padding: 20px; background: #fff; border-radius: 12px; border: 1px solid #e8ecf1; }
        .ke-rc-title { font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 16px; }
        .ke-rc-bars { display: flex; align-items: end; gap: 4px; height: 120px; }
        .ke-rc-bar { flex: 1; border-radius: 4px 4px 0 0; background: linear-gradient(to top, #3b82f6, #60a5fa); transition: height 0.3s; position: relative; min-width: 8px; }
        .ke-rc-bar:hover { opacity: 0.85; }
        .ke-rc-labels { display: flex; gap: 4px; margin-top: 6px; }
        .ke-rc-labels span { flex: 1; text-align: center; font-size: 9px; color: #94a3b8; }
      `}</style>
      <div className="ke-rc">
        <h4 className="ke-rc-title">📊 Son 7 Gün Gelir</h4>
        <div className="ke-rc-bars">
          {data.map(d => (
            <div
              key={d.date}
              className="ke-rc-bar"
              style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
              title={`${d.date}: ₺${d.revenue.toLocaleString('tr-TR')} (${d.orders} sipariş)`}
            />
          ))}
        </div>
        <div className="ke-rc-labels">
          {data.map(d => <span key={d.date}>{d.date.split('-')[2]}</span>)}
        </div>
      </div>
    </>
  )
}
