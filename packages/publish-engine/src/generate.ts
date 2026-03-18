/**
 * @kepenk/publish-engine — HTML Document Generator
 * React SSR → full static HTML document.
 */

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { RenderTree, SiteShell } from '@kepenk/renderer'
import type { SiteManifest, PageDocument, MasterPageDocument, PageRef } from '@kepenk/site-schema'
import { buildMetaTags, buildJsonLd } from './seo'

interface GenerateOptions {
  /** The site manifest */
  manifest: SiteManifest
  /** The page document to render */
  page: PageDocument
  /** The page reference from the manifest */
  pageRef: PageRef
  /** The master page containing header, footer, globals */
  masterPage: MasterPageDocument
}

/**
 * Generate a complete static HTML document from a page document.
 * 
 * This is the core SSR function used by the publish pipeline.
 * It renders the React component tree to HTML and wraps it in a
 * full <!DOCTYPE html> shell with CSS variables, meta tags, and JSON-LD.
 */
export function generatePageHtml(options: GenerateOptions): string {
  const { manifest, page, pageRef, masterPage } = options

  // 1. Generate CSS variables from brand colors and global styles
  const cssVariables = buildCSSVariables(manifest, masterPage)

  // 2. Render the React component tree to static HTML
  const bodyHtml = renderToStaticMarkup(
    React.createElement(SiteShell, {
      header: masterPage.header,
      footer: masterPage.footer,
      globalComponents: masterPage.globalComponents,
      isEditor: false,
    },
      React.createElement(RenderTree, {
        node: page.root,
        isEditor: false,
      })
    )
  )

  // 3. Build meta tags
  const metaTags = buildMetaTags(pageRef, manifest)

  // 4. Build JSON-LD
  const jsonLd = buildJsonLd(manifest)

  // 5. Build custom CSS
  const customCSS = [
    page.meta.customCSS || '',
    masterPage.globalStyles.customCSS || '',
  ].filter(Boolean).join('\n')

  // 6. Assemble the full HTML document
  return `<!DOCTYPE html>
<html lang="tr" dir="ltr">
<head>
    ${metaTags}
    ${manifest.siteConfig.favicon?.url ? `<link rel="icon" href="${manifest.siteConfig.favicon.url}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(manifest.siteConfig.fonts.heading)}:wght@400;600;700;800&family=${encodeURIComponent(manifest.siteConfig.fonts.body)}:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
      :root {
        ${cssVariables}
      }
      ${BASE_STYLES}
      ${customCSS}
    </style>
    <script type="application/ld+json">
      ${JSON.stringify(jsonLd, null, 2)}
    </script>
</head>
<body>
    ${bodyHtml}
</body>
</html>`
}

/**
 * Build CSS variable declarations from manifest and master page config.
 */
function buildCSSVariables(manifest: SiteManifest, masterPage: MasterPageDocument): string {
  const vars: Record<string, string> = {
    '--color-primary': manifest.siteConfig.brandColors.primary,
    '--color-secondary': manifest.siteConfig.brandColors.secondary,
    '--color-accent': manifest.siteConfig.brandColors.accent,
    '--color-background': manifest.siteConfig.brandColors.background,
    '--color-text': manifest.siteConfig.brandColors.text,
    '--font-heading': `'${manifest.siteConfig.fonts.heading}', sans-serif`,
    '--font-body': `'${manifest.siteConfig.fonts.body}', sans-serif`,
    // Merge with master page custom variables
    ...masterPage.globalStyles.cssVariables,
  }

  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n        ')
}

/**
 * Base CSS reset and defaults for published sites.
 * Minimal, focused on esnaf sites — no JavaScript required.
 */
const BASE_STYLES = `
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      html {
        scroll-behavior: smooth;
        -webkit-text-size-adjust: 100%;
      }
      body {
        font-family: var(--font-body);
        color: var(--color-text);
        background-color: var(--color-background);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
        line-height: 1.2;
      }
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      a {
        color: var(--color-accent);
        text-decoration: none;
      }
      a:hover {
        opacity: 0.85;
      }
      button {
        cursor: pointer;
        font-family: inherit;
      }
      @media (max-width: 768px) {
        html { font-size: 15px; }
      }
      @media (max-width: 480px) {
        html { font-size: 14px; }
      }
`
