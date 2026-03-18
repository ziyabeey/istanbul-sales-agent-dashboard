"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMapRenderer = exports.WorkingHoursRenderer = exports.ContactFormRenderer = exports.PriceTableRenderer = exports.WhatsAppCTARenderer = exports.HeroBannerRenderer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const layout_to_css_1 = require("../layout-to-css");
// ── HeroBanner ──
// Full-screen hero with background image, overlay, CTA
const HeroBannerRenderer = ({ node, isEditor, children, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("section", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            width: '100%',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            ...css,
        }, onClick: handleClick, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: data.overlayColor || 'rgba(0,0,0,0.45)',
                    zIndex: 0,
                } }), (0, jsx_runtime_1.jsx)("div", { style: { position: 'relative', zIndex: 1, padding: '40px 24px', maxWidth: '800px' }, children: children || ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", { style: {
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                fontWeight: 800,
                                color: '#ffffff',
                                marginBottom: '16px',
                                lineHeight: 1.15,
                                fontFamily: 'var(--font-heading, inherit)',
                            }, children: data.title || 'İşletmenize Hoş Geldiniz' }), (0, jsx_runtime_1.jsx)("p", { style: {
                                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                color: 'rgba(255,255,255,0.9)',
                                marginBottom: '32px',
                                lineHeight: 1.6,
                            }, children: data.subtitle || 'Profesyonel hizmet, güvenilir kalite' }), data.ctaText && ((0, jsx_runtime_1.jsx)("a", { href: isEditor ? '#' : (data.ctaLink || '#'), onClick: (e) => isEditor && e.preventDefault(), style: {
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 32px',
                                backgroundColor: 'var(--color-accent, #c84b31)',
                                color: '#ffffff',
                                borderRadius: '8px',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                textDecoration: 'none',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }, children: data.ctaText }))] })) })] }));
};
exports.HeroBannerRenderer = HeroBannerRenderer;
// ── WhatsAppCTA ──
// WhatsApp call-to-action button (compact/full/icon-only variants)
const WhatsAppCTARenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const variant = data.variant || 'full';
    const phone = data.phone || '';
    const message = data.message || 'Merhaba, bilgi almak istiyorum.';
    const text = data.text || 'WhatsApp ile Yazın';
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    const handleClick = (e) => {
        if (isEditor) {
            e.preventDefault();
            e.stopPropagation();
            onSelect?.(node.id);
        }
    };
    // Icon-only variant (floating button)
    if (variant === 'icon-only') {
        return ((0, jsx_runtime_1.jsx)("a", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, href: isEditor ? '#' : whatsappUrl, target: "_blank", rel: "noopener noreferrer", onClick: handleClick, style: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                color: '#ffffff',
                fontSize: '28px',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                ...css,
            }, "aria-label": "WhatsApp ile \u0130leti\u015Fim", children: "\uD83D\uDCAC" }));
    }
    // Compact variant
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("a", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, href: isEditor ? '#' : whatsappUrl, target: "_blank", rel: "noopener noreferrer", onClick: handleClick, style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#25D366',
                color: '#ffffff',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                ...css,
            }, children: ["\uD83D\uDCAC ", text] }));
    }
    // Full variant (default)
    return ((0, jsx_runtime_1.jsxs)("a", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, href: isEditor ? '#' : whatsappUrl, target: "_blank", rel: "noopener noreferrer", onClick: handleClick, style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            backgroundColor: '#25D366',
            color: '#ffffff',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            ...css,
        }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '1.3em' }, children: "\uD83D\uDCAC" }), text] }));
};
exports.WhatsAppCTARenderer = WhatsAppCTARenderer;
// ── PriceTable ──
// Categorized price list for service businesses
const PriceTableRenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const categories = data.categories || [];
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            width: '100%',
            ...css,
        }, onClick: handleClick, children: [categories.map((cat, ci) => ((0, jsx_runtime_1.jsxs)("div", { style: { marginBottom: '32px' }, children: [(0, jsx_runtime_1.jsx)("h3", { style: {
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--color-accent, #c84b31)',
                            marginBottom: '16px',
                            paddingBottom: '8px',
                            borderBottom: '2px solid var(--color-accent, #c84b31)',
                        }, children: cat.name }), cat.items.map((item, ii) => ((0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 0',
                            borderBottom: '1px solid #f0f0f0',
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600 }, children: item.name }), item.description && ((0, jsx_runtime_1.jsx)("span", { style: { display: 'block', fontSize: '0.85rem', color: '#888', marginTop: '2px' }, children: item.description }))] }), (0, jsx_runtime_1.jsx)("span", { style: {
                                    fontWeight: 700,
                                    color: 'var(--color-accent, #c84b31)',
                                    whiteSpace: 'nowrap',
                                    marginLeft: '16px',
                                }, children: item.price })] }, ii)))] }, ci))), categories.length === 0 && ((0, jsx_runtime_1.jsx)("p", { style: { textAlign: 'center', color: '#999', padding: '24px' }, children: "Fiyat listesi hen\u00FCz eklenmemi\u015F" }))] }));
};
exports.PriceTableRenderer = PriceTableRenderer;
// ── ContactForm ──
// Name, email, message form
const ContactFormRenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '1rem',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'border-color 0.2s',
    };
    return ((0, jsx_runtime_1.jsxs)("form", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, onSubmit: (e) => e.preventDefault(), style: {
            width: '100%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            ...css,
        }, onClick: handleClick, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }, children: "Ad\u0131n\u0131z Soyad\u0131n\u0131z" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Ali Y\u0131lmaz", style: inputStyle, readOnly: isEditor })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }, children: "Telefon" }), (0, jsx_runtime_1.jsx)("input", { type: "tel", placeholder: "0(5xx) xxx xx xx", style: inputStyle, readOnly: isEditor })] }), (data.showEmail !== false) && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }, children: "E-posta" }), (0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "ali@ornek.com", style: inputStyle, readOnly: isEditor })] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { style: { display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }, children: "Mesaj\u0131n\u0131z" }), (0, jsx_runtime_1.jsx)("textarea", { placeholder: "Mesaj\u0131n\u0131z\u0131 buraya yaz\u0131n...", rows: 4, style: { ...inputStyle, resize: 'vertical' }, readOnly: isEditor })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", style: {
                    padding: '14px 28px',
                    backgroundColor: 'var(--color-accent, #c84b31)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                }, children: data.buttonText || 'Gönder' })] }));
};
exports.ContactFormRenderer = ContactFormRenderer;
// ── WorkingHours ──
// Weekly hours table
const WorkingHoursRenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const dayLabels = {
        Monday: 'Pazartesi',
        Tuesday: 'Salı',
        Wednesday: 'Çarşamba',
        Thursday: 'Perşembe',
        Friday: 'Cuma',
        Saturday: 'Cumartesi',
        Sunday: 'Pazar',
    };
    const hours = data.hours || [];
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: { width: '100%', ...css }, onClick: handleClick, children: [(0, jsx_runtime_1.jsx)("table", { style: { width: '100%', borderCollapse: 'collapse' }, children: (0, jsx_runtime_1.jsx)("tbody", { children: hours.map((h, i) => ((0, jsx_runtime_1.jsxs)("tr", { style: { borderBottom: '1px solid #f0f0f0' }, children: [(0, jsx_runtime_1.jsx)("td", { style: { padding: '10px 0', fontWeight: 600 }, children: dayLabels[h.day] || h.day }), (0, jsx_runtime_1.jsx)("td", { style: { padding: '10px 0', textAlign: 'right' }, children: h.isClosed ? ((0, jsx_runtime_1.jsx)("span", { style: { color: '#c84b31' }, children: "Kapal\u0131" })) : ((0, jsx_runtime_1.jsxs)("span", { children: [h.opens, " - ", h.closes] })) })] }, i))) }) }), hours.length === 0 && ((0, jsx_runtime_1.jsx)("p", { style: { textAlign: 'center', color: '#999', padding: '16px' }, children: "\u00C7al\u0131\u015Fma saatleri hen\u00FCz eklenmemi\u015F" }))] }));
};
exports.WorkingHoursRenderer = WorkingHoursRenderer;
// ── GoogleMap ──
// Embedded Google Maps (sandbox iframe)
const GoogleMapRenderer = ({ node, isEditor, onSelect }) => {
    const css = (0, layout_to_css_1.nodeToCSS)(node.layout, node.style);
    const data = node.data || {};
    const address = data.address || 'İstanbul, Türkiye';
    const handleClick = (e) => {
        if (isEditor && onSelect) {
            e.stopPropagation();
            onSelect(node.id);
        }
    };
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
    return ((0, jsx_runtime_1.jsx)("div", { id: node.id, "data-component-type": node.type, "data-component-id": node.id, style: {
            width: '100%',
            height: '400px',
            borderRadius: '12px',
            overflow: 'hidden',
            ...css,
        }, onClick: handleClick, children: (0, jsx_runtime_1.jsx)("iframe", { src: mapUrl, width: "100%", height: "100%", style: { border: 0 }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", title: "Konum Haritas\u0131" }) }));
};
exports.GoogleMapRenderer = GoogleMapRenderer;
//# sourceMappingURL=Esnaf.js.map