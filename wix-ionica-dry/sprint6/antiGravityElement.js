// ═══════════════════════════════════════════════════════════
// antiGravityElement.js — Custom Web Component
// ═══════════════════════════════════════════════════════════
// Wix: Ögeleri Ekle > Gömülü Kod > Özel Öge (Custom Element)
// Tag Name: anti-gravity-product
// Server URL: Wix Public dosyasından serve edilir
// ═══════════════════════════════════════════════════════════

class AntiGravityProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._animating = false;
    }

    connectedCallback() {
        this.render();
        this.initAnimation();
        this.initMouseTracking();
        this.initMessageListener();
    }

    disconnectedCallback() {
        if (this._observer) this._observer.disconnect();
    }

    static get observedAttributes() {
        return ['product-image', 'glow-color', 'float-height', 'particle-count', 'theme'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
            this.initAnimation();
            this.initMouseTracking();
        }
    }

    render() {
        const image = this.getAttribute('product-image') || '';
        const glowColor = this.getAttribute('glow-color') || '100,180,255';
        const floatHeight = parseInt(this.getAttribute('float-height') || '35');
        const particleCount = parseInt(this.getAttribute('particle-count') || '12');
        const theme = this.getAttribute('theme') || 'pro'; // 'gold' veya 'pro'

        // Dinamik parçacık oluşturma
        let particlesHTML = '';
        for (let i = 0; i < particleCount; i++) {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = 2.5 + Math.random() * 2;
            const size = 2 + Math.random() * 5;
            particlesHTML += `
                <div class="ag-particle" style="
                    left:${left}%; top:${top}%;
                    animation-delay:${delay}s;
                    animation-duration:${duration}s;
                    width:${size}px; height:${size}px;
                "></div>`;
        }

        // Su dalgaları
        let ripplesHTML = '';
        for (let i = 0; i < 3; i++) {
            ripplesHTML += `<div class="ag-ripple" style="animation-delay:${i}s"></div>`;
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .ag-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    perspective: 1500px;
                }

                /* ── Ürün Float ── */
                .ag-product-wrap {
                    position: relative;
                    z-index: 2;
                    transition: transform 0.12s ease-out;
                    transform-style: preserve-3d;
                }

                .ag-product {
                    animation: agFloat ${4 + Math.random()}s cubic-bezier(0.45, 0, 0.55, 1) infinite;
                    filter: drop-shadow(0 ${floatHeight}px 50px rgba(0,0,0,0.22));
                    will-change: transform;
                }

                .ag-product img {
                    max-width: 85%;
                    max-height: 85%;
                    object-fit: contain;
                    display: block;
                    margin: 0 auto;
                }

                @keyframes agFloat {
                    0%, 100% { transform: translateY(0px) rotateY(0deg); }
                    25%      { transform: translateY(-${floatHeight * 0.55}px) rotateY(1.5deg); }
                    50%      { transform: translateY(-${floatHeight}px) rotateY(0deg); }
                    75%      { transform: translateY(-${floatHeight * 0.35}px) rotateY(-1.5deg); }
                }

                /* ── Gölge ── */
                .ag-shadow {
                    position: absolute;
                    bottom: 6%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 55%;
                    height: 14px;
                    background: radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: agShadow ${4 + Math.random()}s cubic-bezier(0.45,0,0.55,1) infinite;
                }

                @keyframes agShadow {
                    0%, 100% { transform: translateX(-50%) scaleX(1); opacity: 0.3; }
                    50%      { transform: translateX(-50%) scaleX(0.45); opacity: 0.08; }
                }

                /* ── Glow ── */
                .ag-glow {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 75%;
                    height: 75%;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(${glowColor},0.08) 0%, transparent 60%);
                    animation: agGlow 5.5s ease-in-out infinite;
                    z-index: 0;
                    transition: left 0.2s, top 0.2s;
                }

                @keyframes agGlow {
                    0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.4; }
                    50%      { transform: translate(-50%,-50%) scale(1.2); opacity: 0.85; }
                }

                /* ── Parçacıklar ── */
                .ag-particle {
                    position: absolute;
                    background: rgba(${glowColor}, 0.45);
                    border-radius: 50%;
                    animation: agParticle 3s ease-in-out infinite;
                    z-index: 1;
                    pointer-events: none;
                }

                @keyframes agParticle {
                    0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
                    50%      { transform: translateY(-22px) scale(1.25); opacity: 0.9; }
                }

                /* ── Ripple (Su Dalgası) ── */
                .ag-ripple {
                    position: absolute;
                    bottom: 4%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 180px;
                    height: 180px;
                    border: 1.5px solid rgba(${glowColor}, 0.12);
                    border-radius: 50%;
                    animation: agRipple 3s ease-out infinite;
                    z-index: 0;
                    pointer-events: none;
                }

                @keyframes agRipple {
                    0%   { transform: translateX(-50%) scale(0.3); opacity: 0.5; }
                    100% { transform: translateX(-50%) scale(1.6); opacity: 0; }
                }

                /* ── "Sepete Ekle" Bounce ── */
                .ag-product-wrap.bounce {
                    animation: agBounce 0.6s ease;
                }

                @keyframes agBounce {
                    0%   { transform: scale(1); }
                    30%  { transform: scale(1.15) rotateY(10deg); }
                    60%  { transform: scale(0.92) rotateY(-5deg); }
                    100% { transform: scale(1) rotateY(0deg); }
                }

                /* ── Performans ── */
                @media (prefers-reduced-motion: reduce) {
                    .ag-product    { animation: none; transform: translateY(-12px); }
                    .ag-particle   { animation: none; opacity: 0; }
                    .ag-glow       { animation: none; }
                    .ag-shadow     { animation: none; }
                    .ag-ripple     { animation: none; opacity: 0; }
                }
            </style>

            <div class="ag-container" id="agContainer">
                <div class="ag-glow" id="agGlow"></div>
                ${ripplesHTML}
                ${particlesHTML}
                <div class="ag-product-wrap" id="agWrap">
                    <div class="ag-product" id="agProduct">
                        <img id="agImage" src="${image}" alt="Ionica Dry Ürünü" loading="lazy" />
                    </div>
                </div>
                <div class="ag-shadow"></div>
            </div>
        `;
    }

    initAnimation() {
        if (this._observer) this._observer.disconnect();
        this._observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const product = this.shadowRoot.getElementById('agProduct');
                if (product) {
                    product.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
                }
            });
        }, { threshold: 0.1 });
        this._observer.observe(this);
    }

    initMouseTracking() {
        const container = this.shadowRoot.getElementById('agContainer');
        const wrap = this.shadowRoot.getElementById('agWrap');
        const glow = this.shadowRoot.getElementById('agGlow');
        if (!container || !wrap) return;

        // Desktop
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            wrap.style.transform = `rotateX(${y * -14}deg) rotateY(${x * 14}deg)`;
            if (glow) {
                glow.style.left = `${50 + x * 12}%`;
                glow.style.top = `${50 + y * 12}%`;
            }
        });

        container.addEventListener('mouseleave', () => {
            wrap.style.transform = '';
            if (glow) { glow.style.left = '50%'; glow.style.top = '50%'; }
        });

        // Mobile touch
        if ('ontouchstart' in window) {
            container.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = container.getBoundingClientRect();
                const x = (touch.clientX - rect.left) / rect.width - 0.5;
                const y = (touch.clientY - rect.top) / rect.height - 0.5;
                wrap.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
            }, { passive: false });

            // Gyroscope
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', (e) => {
                    const tiltX = Math.min(Math.max(e.gamma || 0, -15), 15);
                    const tiltY = Math.min(Math.max((e.beta || 45) - 45, -15), 15);
                    wrap.style.transform = `rotateX(${tiltY * 0.4}deg) rotateY(${tiltX * 0.4}deg)`;
                });
            }

            // Mobilde parçacık azaltma
            const particles = this.shadowRoot.querySelectorAll('.ag-particle');
            particles.forEach((p, i) => { if (i > 5) p.style.display = 'none'; });
        }
    }

    initMessageListener() {
        window.addEventListener('message', (e) => {
            if (!e.data || !e.data.type) return;

            switch (e.data.type) {
                case 'updateProduct':
                case 'updateImage': {
                    const img = this.shadowRoot.getElementById('agImage');
                    if (img && e.data.imageUrl) img.src = e.data.imageUrl;
                    if (img && e.data.src) img.src = e.data.src;
                    break;
                }
                case 'setGlowColor': {
                    if (e.data.color) {
                        this.setAttribute('glow-color', e.data.color);
                    }
                    break;
                }
                case 'triggerBounce': {
                    const wrap = this.shadowRoot.getElementById('agWrap');
                    if (wrap) {
                        wrap.classList.remove('bounce');
                        void wrap.offsetWidth;
                        wrap.classList.add('bounce');
                        setTimeout(() => wrap.classList.remove('bounce'), 700);
                    }
                    break;
                }
            }
        });
    }
}

customElements.define('anti-gravity-product', AntiGravityProduct);
