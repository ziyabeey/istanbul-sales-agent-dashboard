'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useEditorStore, type SiteData } from '../store/editor-store'
import { demoHtmlUret } from '@/utils/demoHtmlUretici'
import type { DemoSector } from '@/data/demoVitrinData'
import { PREMIUM_TEMPLATES, premiumIkame, premiumSablonBul } from '../data/premiumTemplates'
import { editorBridgeScript } from '../utils/editorBridge'

// Cache for fetched premium template HTML
const premiumCache: Record<string, string> = {}

/**
 * useEditorPreview — Watches siteData changes, generates HTML via demoHtmlUret
 * or fetches Premium+ template, and sets generatedHtml in the store.
 */
export function useEditorPreview() {
    const siteData = useEditorStore(s => s.siteData)
    const setGeneratedHtml = useEditorStore(s => s.setGeneratedHtml)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const generateStandard = useCallback((data: SiteData) => {
        const demoSector: DemoSector = {
            id: data.sektorId,
            ad: data.isletmeAdi,
            kategori: data.kategori as DemoSector['kategori'],
            bg: data.bg,
            accent: data.accent,
            text: data.text,
            font: data.font,
            unsplash: data.unsplash,
            heroBaslik: data.heroBaslik,
            heroAlt: data.heroAlt,
            hizmetler: data.hizmetler,
        }
        return demoHtmlUret(demoSector, data.moduller)
    }, [])

    const generatePremium = useCallback(async (data: SiteData): Promise<string | null> => {
        // Check if there's a selected premium template (stored in siteData)
        const templateId = (data as any).premiumTemplateId as string | undefined
        const template = templateId
            ? PREMIUM_TEMPLATES.find(t => t.id === templateId)
            : premiumSablonBul(data.kategori) // Try auto-match by sector

        if (!template) return null

        // Fetch HTML (with cache)
        let rawHtml = premiumCache[template.id]
        if (!rawHtml) {
            try {
                const res = await fetch(`/demos/${template.dosya}`)
                if (!res.ok) return null
                rawHtml = await res.text()
                premiumCache[template.id] = rawHtml
            } catch {
                return null
            }
        }

        // Apply substitutions
        return premiumIkame(rawHtml, template, {
            isletmeAdi: data.isletmeAdi,
            telefon: data.telefon,
            adres: data.adres,
            heroBaslik: data.heroBaslik,
            bg: data.bg,
            accent: data.accent,
            text: data.text,
            font: data.font,
        })
    }, [])

    /* Inject bridge script into HTML */
    const injectBridge = useCallback((html: string): string => {
        const bridge = editorBridgeScript()
        // Insert before </body> if present, otherwise append
        if (html.includes('</body>')) {
            return html.replace('</body>', bridge + '</body>')
        }
        return html + bridge
    }, [])

    const generateHtml = useCallback(async (data: SiteData) => {
        // Premium+ paket → try premium template first
        if (data.paket === 'PREMIUMPLUS' || (data as any).premiumTemplateId) {
            const premiumHtml = await generatePremium(data)
            if (premiumHtml) {
                setGeneratedHtml(injectBridge(premiumHtml))
                return
            }
        }

        // Standard template via demoHtmlUret
        const html = generateStandard(data)
        setGeneratedHtml(injectBridge(html))
    }, [generateStandard, generatePremium, setGeneratedHtml, injectBridge])

    useEffect(() => {
        if (!siteData) return

        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            generateHtml(siteData)
        }, 300)

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [siteData, generateHtml])

    // Generate immediately on first load
    useEffect(() => {
        if (siteData) {
            generateHtml(siteData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
