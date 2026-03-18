"use strict";
/**
 * @kepenk/publish-engine — HTML Document Generator
 * React SSR → full static HTML document.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePageHtml = generatePageHtml;
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const renderer_1 = require("@kepenk/renderer");
const seo_1 = require("./seo");
/**
 * Generate a complete static HTML document from a page document.
 *
 * This is the core SSR function used by the publish pipeline.
 * It renders the React component tree to HTML and wraps it in a
 * full <!DOCTYPE html> shell with CSS variables, meta tags, and JSON-LD.
 */
function generatePageHtml(options) {
    const { manifest, page, pageRef, masterPage } = options;
    // 1. Generate CSS variables from brand colors and global styles
    const cssVariables = buildCSSVariables(manifest, masterPage);
    // 2. Render the React component tree to static HTML
    const bodyHtml = (0, server_1.renderToStaticMarkup)(react_1.default.createElement(renderer_1.SiteShell, {
        header: masterPage.header,
        footer: masterPage.footer,
        globalComponents: masterPage.globalComponents,
        isEditor: false,
    }, react_1.default.createElement(renderer_1.RenderTree, {
        node: page.root,
        isEditor: false,
    })));
    // 3. Build meta tags
    const metaTags = (0, seo_1.buildMetaTags)(pageRef, manifest);
    // 4. Build JSON-LD
    const jsonLd = (0, seo_1.buildJsonLd)(manifest);
    // 5. Build custom CSS
    const customCSS = [
        page.meta.customCSS || '',
        masterPage.globalStyles.customCSS || '',
    ].filter(Boolean).join('\n');
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
</html>`;
}
/**
 * Build CSS variable declarations from manifest and master page config.
 */
function buildCSSVariables(manifest, masterPage) {
    const vars = {
        '--color-primary': manifest.siteConfig.brandColors.primary,
        '--color-secondary': manifest.siteConfig.brandColors.secondary,
        '--color-accent': manifest.siteConfig.brandColors.accent,
        '--color-background': manifest.siteConfig.brandColors.background,
        '--color-text': manifest.siteConfig.brandColors.text,
        '--font-heading': `'${manifest.siteConfig.fonts.heading}', sans-serif`,
        '--font-body': `'${manifest.siteConfig.fonts.body}', sans-serif`,
        // Merge with master page custom variables
        ...masterPage.globalStyles.cssVariables,
    };
    return Object.entries(vars)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n        ');
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
`;
//# sourceMappingURL=generate.js.map