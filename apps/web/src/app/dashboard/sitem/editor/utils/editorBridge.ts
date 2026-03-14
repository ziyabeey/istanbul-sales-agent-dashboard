/**
 * Editor Bridge Script — Injected into iframe HTML
 * ─────────────────────────────────────────────────────────────────────────────
 * TRUE INLINE EDITING: clicking text makes it contentEditable directly.
 * IMAGE EDITING: clicking images sends ke-image-click to parent.
 * A mini floating toolbar appears above the element for quick actions.
 * On blur/Escape, changes are sent to parent via postMessage.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function editorBridgeScript(): string {
    return `
<script data-editor-bridge="true">
(function() {
    'use strict';

    const TEXT_TAGS = new Set(['H1','H2','H3','H4','H5','H6','P','SPAN','A','LI','LABEL','STRONG','EM','B','I','BLOCKQUOTE','FIGCAPTION','TD','TH','BUTTON','SMALL']);
    const IMG_TAGS = new Set(['IMG','VIDEO','PICTURE','FIGURE']);

    // ── State ──────────────────────────────────────────────────────────────
    let activeEl = null;
    let originalText = '';

    // ── Hover Overlay ──────────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id = '__ke_ov';
    overlay.style.cssText = 'position:absolute;pointer-events:none;z-index:99990;border:2px solid rgba(59,130,246,0.5);background:rgba(59,130,246,0.06);border-radius:3px;display:none;transition:all 0.08s ease;';
    document.body.appendChild(overlay);

    const tooltip = document.createElement('div');
    tooltip.id = '__ke_tip';
    tooltip.style.cssText = 'position:absolute;pointer-events:none;z-index:99991;background:#1e293b;color:#fff;font:600 10px/1.2 system-ui,sans-serif;padding:2px 8px;border-radius:4px;display:none;white-space:nowrap;';
    document.body.appendChild(tooltip);

    // ── Image Hover Overlay (camera badge) ─────────────────────────────────
    const imgOverlay = document.createElement('div');
    imgOverlay.id = '__ke_img_ov';
    imgOverlay.innerHTML = '<div style="display:flex;align-items:center;gap:5px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg><span>Değiştir</span></div>';
    imgOverlay.style.cssText = 'position:absolute;z-index:99992;display:none;background:rgba(245,158,11,0.9);color:#fff;font:700 11px/1 system-ui,sans-serif;padding:6px 10px;border-radius:8px;cursor:pointer;pointer-events:auto;box-shadow:0 4px 12px rgba(0,0,0,0.2);transition:all 0.12s ease;';
    document.body.appendChild(imgOverlay);

    // ── Floating Mini Toolbar ──────────────────────────────────────────────
    const toolbar = document.createElement('div');
    toolbar.id = '__ke_tb';
    toolbar.innerHTML = \`
        <style>
            #__ke_tb { position:absolute;z-index:99999;display:none;background:#1e293b;border-radius:10px;padding:4px 6px;box-shadow:0 8px 24px rgba(0,0,0,0.25);gap:2px;align-items:center;font-family:system-ui,sans-serif;animation:__keSlide 0.12s ease-out; }
            @keyframes __keSlide { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
            #__ke_tb button { background:transparent;border:none;color:#e2e8f0;cursor:pointer;padding:5px 8px;border-radius:6px;font-size:12px;font-weight:700;transition:0.1s;font-family:inherit;display:flex;align-items:center;gap:4px;white-space:nowrap; }
            #__ke_tb button:hover { background:rgba(255,255,255,0.15);color:#fff; }
            #__ke_tb .sep { width:1px;height:18px;background:rgba(255,255,255,0.15);margin:0 2px; }
            #__ke_tb .done { background:#22c55e!important;color:#fff;border-radius:6px;padding:5px 12px; }
            #__ke_tb .done:hover { background:#16a34a!important; }
            #__ke_tb .cancel { color:#94a3b8; }
            #__ke_tb .cancel:hover { color:#f87171;background:rgba(248,113,113,0.1); }

            /* Editing indicator */
            .__ke_editing { outline:2px solid #3b82f6!important;outline-offset:2px;border-radius:3px;background:rgba(59,130,246,0.04)!important;cursor:text!important;min-height:1em; }
            .__ke_editing:focus { outline-color:#2563eb!important;box-shadow:0 0 0 4px rgba(37,99,235,0.12); }

            /* Image selected indicator */
            .__ke_img_selected { outline:3px solid #f59e0b!important;outline-offset:2px;border-radius:3px;cursor:pointer!important; }
        </style>
        <button onclick="__keAction('done')" class="done" title="Kaydet (Enter)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Tamam</button>
        <div class="sep"></div>
        <button onclick="__keAction('cancel')" class="cancel" title="İptal (Esc)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    \`;
    document.body.appendChild(toolbar);

    // ── Helpers ─────────────────────────────────────────────────────────────
    function getFieldName(el) {
        if (el.dataset && el.dataset.field) return el.dataset.field;
        let node = el.parentElement;
        while (node && node !== document.body) {
            if (node.dataset && node.dataset.field) return node.dataset.field;
            node = node.parentElement;
        }
        if (el.tagName === 'H1') return 'hero-baslik';
        if (el.tagName === 'H2') {
            const allH2 = Array.from(document.querySelectorAll('h2'));
            if (allH2.indexOf(el) === 0) return 'hero-alt';
        }
        return '';
    }

    function getImageField(el) {
        // Check data attributes
        if (el.dataset && el.dataset.field) return el.dataset.field;
        let node = el.parentElement;
        while (node && node !== document.body) {
            if (node.dataset && node.dataset.field) return node.dataset.field;
            node = node.parentElement;
        }
        // Auto-detect hero images
        const src = el.src || el.style.backgroundImage || '';
        if (el.closest('[class*="hero"]') || el.closest('.hero') || el.closest('header')) {
            return 'hero-bg';
        }
        return 'image';
    }

    function getElementPath(el) {
        const parts = [];
        let node = el;
        while (node && node !== document.body) {
            let s = node.tagName.toLowerCase();
            if (node.id && !node.id.startsWith('__ke_')) s += '#' + node.id;
            parts.unshift(s);
            node = node.parentElement;
        }
        return parts.join(' > ');
    }

    // Find the actual IMG element from a container
    function findImg(el) {
        if (el.tagName === 'IMG') return el;
        if (el.tagName === 'PICTURE' || el.tagName === 'FIGURE') {
            return el.querySelector('img') || el;
        }
        return el;
    }

    function isImgElement(el) {
        if (IMG_TAGS.has(el.tagName)) return true;
        // Check background-image
        const style = window.getComputedStyle(el);
        if (style.backgroundImage && style.backgroundImage !== 'none') {
            const rect = el.getBoundingClientRect();
            if (rect.width > 100 && rect.height > 80) return true;
        }
        return false;
    }

    function showHover(el) {
        if (el === activeEl || el.id?.startsWith('__ke_')) return;
        const rect = el.getBoundingClientRect();
        const sx = window.scrollX, sy = window.scrollY;

        const isImg = isImgElement(el);
        const isText = TEXT_TAGS.has(el.tagName);

        // Main overlay
        overlay.style.left = (rect.left + sx - 2) + 'px';
        overlay.style.top = (rect.top + sy - 2) + 'px';
        overlay.style.width = (rect.width + 4) + 'px';
        overlay.style.height = (rect.height + 4) + 'px';
        overlay.style.display = 'block';

        if (isImg) {
            overlay.style.borderColor = 'rgba(245,158,11,0.6)';
            overlay.style.background = 'rgba(245,158,11,0.05)';
        } else {
            overlay.style.borderColor = 'rgba(59,130,246,0.5)';
            overlay.style.background = 'rgba(59,130,246,0.06)';
        }

        // Tooltip
        if (isImg) {
            tooltip.textContent = (el.tagName === 'IMG' ? 'img' : el.tagName.toLowerCase()) + ' · tıkla değiştir';
            tooltip.style.background = '#92400e';
        } else {
            tooltip.textContent = el.tagName.toLowerCase() + (isText ? ' · tıkla düzenle' : '');
            tooltip.style.background = '#1e293b';
        }
        tooltip.style.left = (rect.left + sx) + 'px';
        tooltip.style.top = Math.max(0, rect.top + sy - 22) + 'px';
        tooltip.style.display = 'block';

        // Camera badge for images
        if (isImg && rect.width > 60 && rect.height > 60) {
            imgOverlay.style.left = (rect.left + sx + rect.width/2 - 40) + 'px';
            imgOverlay.style.top = (rect.top + sy + rect.height/2 - 14) + 'px';
            imgOverlay.style.display = 'flex';
            imgOverlay.onclick = function(e) {
                e.stopPropagation();
                e.preventDefault();
                handleImageClick(el);
            };
        } else {
            imgOverlay.style.display = 'none';
        }
    }

    function hideHover() {
        overlay.style.display = 'none';
        tooltip.style.display = 'none';
        imgOverlay.style.display = 'none';
    }

    function showToolbar(el) {
        const rect = el.getBoundingClientRect();
        const sx = window.scrollX, sy = window.scrollY;
        toolbar.style.display = 'flex';
        toolbar.style.left = Math.max(4, rect.left + sx) + 'px';
        toolbar.style.top = Math.max(4, rect.top + sy - 40) + 'px';
    }

    function hideToolbar() {
        toolbar.style.display = 'none';
    }

    // ── Image Click Handler ─────────────────────────────────────────────────
    function handleImageClick(el) {
        const imgEl = findImg(el);
        const rect = imgEl.getBoundingClientRect();

        // Remove previous selection
        document.querySelectorAll('.__ke_img_selected').forEach(function(e) {
            e.classList.remove('__ke_img_selected');
        });
        imgEl.classList.add('__ke_img_selected');

        window.parent.postMessage({
            type: 'ke-image-click',
            src: imgEl.src || imgEl.currentSrc || '',
            alt: imgEl.alt || '',
            field: getImageField(imgEl),
            elementPath: getElementPath(imgEl),
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
        }, '*');

        hideHover();
    }

    // ── Start Editing ──────────────────────────────────────────────────────
    function startEdit(el) {
        if (activeEl) finishEdit(false);

        activeEl = el;
        originalText = el.textContent || '';
        el.contentEditable = 'true';
        el.classList.add('__ke_editing');
        el.focus();

        // Place cursor at end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);

        hideHover();
        showToolbar(el);

        // Notify parent we started editing
        window.parent.postMessage({ type: 'ke-edit-start', field: getFieldName(el) }, '*');
    }

    // ── Finish Editing ─────────────────────────────────────────────────────
    function finishEdit(save) {
        if (!activeEl) return;

        const el = activeEl;
        const newText = (el.textContent || '').trim();
        el.contentEditable = 'false';
        el.classList.remove('__ke_editing');
        hideToolbar();

        if (save && newText !== originalText) {
            window.parent.postMessage({
                type: 'ke-text-changed',
                field: getFieldName(el),
                text: newText,
                elementPath: getElementPath(el),
                tagName: el.tagName.toLowerCase(),
            }, '*');
        } else if (!save) {
            // Revert to original
            el.textContent = originalText;
        }

        activeEl = null;
        originalText = '';
    }

    // ── Global toolbar action handler ──────────────────────────────────────
    window.__keAction = function(action) {
        if (action === 'done') finishEdit(true);
        if (action === 'cancel') finishEdit(false);
    };

    // ── Events ─────────────────────────────────────────────────────────────
    document.addEventListener('mouseover', function(e) {
        if (e.target.id?.startsWith('__ke_')) return;
        if (e.target === activeEl) return;
        showHover(e.target);
    });

    document.addEventListener('mouseout', function() { hideHover(); });

    // Click handler — routes to text OR image editing
    document.addEventListener('click', function(e) {
        const el = e.target;
        if (el.id?.startsWith('__ke_') || el.closest('#__ke_tb')) return;
        e.preventDefault();
        e.stopPropagation();

        if (el === activeEl) return; // already editing this

        // Image click → open image editor
        if (isImgElement(el)) {
            if (activeEl) finishEdit(true);
            handleImageClick(el);
            return;
        }

        // Text click → inline edit
        if (TEXT_TAGS.has(el.tagName)) {
            startEdit(el);
        } else {
            // Clicked non-text/non-image → finish current edit
            if (activeEl) finishEdit(true);
        }
    }, true);

    // Right-click → context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const el = e.target;
        if (el.id?.startsWith('__ke_')) return;

        if (activeEl) finishEdit(true);

        window.parent.postMessage({
            type: 'ke-contextmenu',
            x: e.clientX,
            y: e.clientY,
            targetType: TEXT_TAGS.has(el.tagName) ? 'text' : isImgElement(el) ? 'image' : 'generic',
            targetTag: el.tagName.toLowerCase(),
            targetText: (el.textContent || '').trim().substring(0, 200),
            targetField: getFieldName(el),
            elementPath: getElementPath(el),
        }, '*');
    }, true);

    // Keyboard inside editing element
    document.addEventListener('keydown', function(e) {
        if (!activeEl) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            finishEdit(false);
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            finishEdit(true);
        }
        // Update toolbar position on content change
        requestAnimationFrame(function() {
            if (activeEl) showToolbar(activeEl);
        });
    });

    // Receive messages from parent
    window.addEventListener('message', function(e) {
        if (!e.data || !e.data.type) return;
        if (e.data.type === 'ke-deselect') {
            if (activeEl) finishEdit(true);
            document.querySelectorAll('.__ke_img_selected').forEach(function(el) {
                el.classList.remove('__ke_img_selected');
            });
            hideHover();
        }
        // Parent sends new image URL to replace
        if (e.data.type === 'ke-replace-image') {
            var imgs = document.querySelectorAll('img');
            imgs.forEach(function(img) {
                if (img.src === e.data.oldSrc || img.classList.contains('__ke_img_selected')) {
                    img.src = e.data.newSrc;
                    if (e.data.newAlt) img.alt = e.data.newAlt;
                    img.classList.remove('__ke_img_selected');
                }
            });
            // Also check background images
            if (e.data.field === 'hero-bg') {
                document.querySelectorAll('[style*="background"]').forEach(function(el) {
                    if (el.style.backgroundImage && el.style.backgroundImage.includes(e.data.oldSrc)) {
                        el.style.backgroundImage = 'url(' + e.data.newSrc + ')';
                    }
                });
            }
        }
    });

    // Prevent links and forms
    document.addEventListener('submit', function(e) { e.preventDefault(); }, true);
    document.querySelectorAll('a[href]').forEach(function(a) {
        a.addEventListener('click', function(e) { e.preventDefault(); }, true);
    });

    console.log('[Kepenk Editor] Inline editing + image editing active');
})();
<\\/script>`;
}
