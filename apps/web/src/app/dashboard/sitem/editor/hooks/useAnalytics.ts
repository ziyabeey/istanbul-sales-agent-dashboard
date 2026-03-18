'use client'

/**
 * useAnalytics — Track editor usage and site analytics.
 * Provides event tracking for editor interactions and 
 * published site analytics retrieval.
 */

import { useCallback, useRef, useEffect } from 'react'

type EditorEvent =
  | 'editor.open'
  | 'editor.save'
  | 'editor.publish'
  | 'editor.undo'
  | 'editor.redo'
  | 'node.select'
  | 'node.add'
  | 'node.delete'
  | 'node.move'
  | 'node.edit'
  | 'section.add'
  | 'ai.rewrite'
  | 'ai.improve'
  | 'ai.seo'
  | 'preview.device'
  | 'template.insert'

interface EventData {
  [key: string]: string | number | boolean | undefined
}

// Buffer events to batch-send
let eventBuffer: Array<{ event: EditorEvent; data?: EventData; ts: number }> = []
let flushTimer: NodeJS.Timeout | null = null

function queueEvent(event: EditorEvent, data?: EventData) {
  eventBuffer.push({ event, data, ts: Date.now() })

  // Flush every 10 seconds or when buffer reaches 20 events
  if (eventBuffer.length >= 20) {
    flushEvents()
  } else if (!flushTimer) {
    flushTimer = setTimeout(flushEvents, 10000)
  }
}

async function flushEvents() {
  if (flushTimer) {
    clearTimeout(flushTimer)
    flushTimer = null
  }

  if (eventBuffer.length === 0) return

  const events = [...eventBuffer]
  eventBuffer = []

  try {
    await fetch('/api/analytics/editor-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events }),
    }).catch(() => {
      // Analytics is best-effort, never block the editor
    })
  } catch {
    // Silently fail
  }
}

export function useAnalytics() {
  const sessionStart = useRef(Date.now())

  // Track editor open on mount
  useEffect(() => {
    queueEvent('editor.open')
    return () => {
      // Flush remaining events on unmount
      flushEvents()
    }
  }, [])

  const track = useCallback((event: EditorEvent, data?: EventData) => {
    queueEvent(event, {
      ...data,
      sessionDuration: Math.round((Date.now() - sessionStart.current) / 1000),
    })
  }, [])

  return { track }
}

/* ═══════ Site Analytics — Retrieve published site stats ═══════ */

export interface SiteStats {
  pageViews: number
  uniqueVisitors: number
  avgTimeOnSite: number // seconds
  topPages: Array<{ path: string; views: number }>
  devices: { desktop: number; mobile: number; tablet: number }
  period: string // e.g. '7d', '30d'
}

/**
 * Fetch site analytics from the analytics API.
 */
export async function fetchSiteStats(period: '7d' | '30d' | '90d' = '7d'): Promise<SiteStats | null> {
  try {
    const res = await fetch(`/api/analytics/site-stats?period=${period}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.stats || null
  } catch {
    return null
  }
}
