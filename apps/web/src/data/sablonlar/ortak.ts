export const ortakNav = `
<nav id="nav" style="position:fixed;top:0;left:0;right:0;z-index:var(--z-nav,100);background:rgba(0,0,0,0);backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);transition:all 0.3s;padding:var(--space-2) var(--space-3);display:flex;justify-content:space-between;align-items:center;height:var(--nav-height,72px)">
  <a href="#" style="font-family:var(--font-baslik);font-weight:900;font-size:1.1rem;color:var(--renk-vurgu);text-decoration:none">{{ISLETME_KISAADI}}</a>
  <div id="nav-linkler" style="display:flex;gap:var(--space-3);align-items:center">
    <a href="#hizmetler" class="nav-link" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:var(--fs-sm);font-weight:600">Hizmetler</a>
    <a href="#hakkimizda" class="nav-link" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:var(--fs-sm);font-weight:600">Hakkımızda</a>
    <a href="#iletisim" class="nav-link" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:var(--fs-sm);font-weight:600">İletişim</a>
    <a href="tel:{{TELEFON}}" class="buton-birincil" style="padding:var(--space-1) var(--space-2);font-size:var(--fs-xs)">📞 Ara</a>
  </div>
  <button id="hamburger-btn" aria-label="Menüyü aç" style="display:none;background:none;border:none;cursor:pointer;padding:8px;z-index:110">
    <span id="hamburger-icon" style="display:flex;flex-direction:column;gap:5px;width:24px">
      <span style="display:block;height:2px;background:#fff;border-radius:2px;transition:all 0.3s"></span>
      <span style="display:block;height:2px;background:#fff;border-radius:2px;transition:all 0.3s"></span>
      <span style="display:block;height:2px;background:#fff;border-radius:2px;transition:all 0.3s"></span>
    </span>
  </button>
</nav>
<!-- Mobile Drawer -->
<div id="mobile-drawer" style="position:fixed;top:0;right:-100%;width:280px;height:100vh;background:rgba(0,0,0,0.96);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:var(--z-modal,200);transition:right 0.35s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;padding:calc(var(--nav-height,72px) + var(--space-4)) var(--space-4) var(--space-4);gap:var(--space-1)">
  <a href="#hizmetler" class="mobile-link" onclick="closeMobileMenu()" style="color:#fff;text-decoration:none;font-size:var(--fs-lg);font-weight:700;padding:var(--space-2) 0;border-bottom:1px solid rgba(255,255,255,0.08);transition:color 0.2s">Hizmetler</a>
  <a href="#hakkimizda" class="mobile-link" onclick="closeMobileMenu()" style="color:#fff;text-decoration:none;font-size:var(--fs-lg);font-weight:700;padding:var(--space-2) 0;border-bottom:1px solid rgba(255,255,255,0.08);transition:color 0.2s">Hakkımızda</a>
  <a href="#iletisim" class="mobile-link" onclick="closeMobileMenu()" style="color:#fff;text-decoration:none;font-size:var(--fs-lg);font-weight:700;padding:var(--space-2) 0;border-bottom:1px solid rgba(255,255,255,0.08);transition:color 0.2s">İletişim</a>
  <a href="tel:{{TELEFON}}" class="buton-birincil" style="margin-top:var(--space-3);text-align:center;padding:var(--space-2);font-size:var(--fs-base)">📞 Hemen Ara</a>
  <a href="https://wa.me/{{WHATSAPP}}" target="_blank" class="buton-ikincil" style="text-align:center;padding:var(--space-2);font-size:var(--fs-base)">💬 WhatsApp</a>
</div>
<div id="mobile-overlay" onclick="closeMobileMenu()" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:calc(var(--z-modal,200) - 1);opacity:0;pointer-events:none;transition:opacity 0.3s"></div>
<script>
window.addEventListener('scroll',function(){
  var nav=document.getElementById('nav');
  if(window.scrollY>60){nav.style.background='rgba(0,0,0,0.92)';nav.style.backdropFilter='blur(16px)';nav.style.webkitBackdropFilter='blur(16px)';nav.style.borderBottom='1px solid rgba(255,255,255,0.08)';}
  else{nav.style.background='rgba(0,0,0,0)';nav.style.backdropFilter='blur(0px)';nav.style.webkitBackdropFilter='blur(0px)';nav.style.borderBottom='none';}
});
var hBtn=document.getElementById('hamburger-btn');
var drawer=document.getElementById('mobile-drawer');
var overlay=document.getElementById('mobile-overlay');
var isOpen=false;
function toggleMobileMenu(){
  isOpen=!isOpen;
  drawer.style.right=isOpen?'0':'-100%';
  overlay.style.opacity=isOpen?'1':'0';
  overlay.style.pointerEvents=isOpen?'auto':'none';
  var bars=document.querySelectorAll('#hamburger-icon span');
  if(isOpen){
    bars[0].style.transform='rotate(45deg) translate(5px,5px)';
    bars[1].style.opacity='0';
    bars[2].style.transform='rotate(-45deg) translate(5px,-5px)';
  } else {
    bars[0].style.transform='none';bars[1].style.opacity='1';bars[2].style.transform='none';
  }
}
function closeMobileMenu(){
  isOpen=false;
  drawer.style.right='-100%';
  overlay.style.opacity='0';overlay.style.pointerEvents='none';
  var bars=document.querySelectorAll('#hamburger-icon span');
  bars[0].style.transform='none';bars[1].style.opacity='1';bars[2].style.transform='none';
}
if(hBtn) hBtn.addEventListener('click',toggleMobileMenu);
</script>
<style>
@media(max-width:768px){
  #nav-linkler{display:none!important}
  #hamburger-btn{display:flex!important}
}
</style>`

export const ortakFooter = `
<footer style="background:#000;padding:var(--space-8) var(--space-3) var(--space-4);border-top:1px solid rgba(255,255,255,0.06)">
  <div style="max-width:1200px;margin:0 auto">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:var(--space-6);margin-bottom:var(--space-6)">
      <!-- Col 1: Brand -->
      <div>
        <p style="font-family:var(--font-baslik);font-weight:900;font-size:var(--fs-xl);color:var(--renk-vurgu);margin:0 0 var(--space-2)">{{ISLETME_ADI}}</p>
        <p style="color:rgba(255,255,255,0.5);font-size:var(--fs-sm);line-height:1.7;margin:0 0 var(--space-3);max-width:280px">{{SEKTOR}} · {{ILCE}}, {{SEHIR}}</p>
        <div style="display:flex;gap:var(--space-2)">
          <a href="https://wa.me/{{WHATSAPP}}" target="_blank" aria-label="WhatsApp" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.9rem;transition:all 0.2s;border:1px solid rgba(255,255,255,0.05)" onmouseover="this.style.background='#25d366';this.style.color='#fff';this.style.borderColor='#25d366'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.6)';this.style.borderColor='rgba(255,255,255,0.05)'">WA</a>
          <a href="{{INSTAGRAM_URL}}" target="_blank" aria-label="Instagram" style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.6);text-decoration:none;font-size:0.9rem;transition:all 0.2s;border:1px solid rgba(255,255,255,0.05)" onmouseover="this.style.background='var(--renk-vurgu)';this.style.color='#fff';this.style.borderColor='var(--renk-vurgu)'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.6)';this.style.borderColor='rgba(255,255,255,0.05)'">IG</a>
        </div>
      </div>
      <!-- Col 2: Quick Links -->
      <div>
        <h4 style="color:#fff;font-size:var(--fs-sm);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 var(--space-2)">Hızlı Linkler</h4>
        <ul style="list-style:none;padding:0;margin:0">
          <li style="margin-bottom:var(--space-1)"><a href="#hizmetler" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:var(--fs-sm);transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Hizmetler</a></li>
          <li style="margin-bottom:var(--space-1)"><a href="#hakkimizda" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:var(--fs-sm);transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Hakkımızda</a></li>
          <li style="margin-bottom:var(--space-1)"><a href="#iletisim" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:var(--fs-sm);transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">İletişim</a></li>
          <li><a href="{{GMB_LINK}}" target="_blank" style="color:rgba(255,255,255,0.5);text-decoration:none;font-size:var(--fs-sm);transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">Google Haritalar</a></li>
        </ul>
      </div>
      <!-- Col 3: Contact -->
      <div>
        <h4 style="color:#fff;font-size:var(--fs-sm);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 var(--space-2)">İletişim</h4>
        <ul style="list-style:none;padding:0;margin:0;color:rgba(255,255,255,0.5);font-size:var(--fs-sm);line-height:2.2">
          <li>📞 <a href="tel:{{TELEFON}}" style="color:inherit;text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">{{TELEFON_GOSTERIM}}</a></li>
          <li>💬 <a href="https://wa.me/{{WHATSAPP}}" target="_blank" style="color:inherit;text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">WhatsApp</a></li>
          <li>📍 {{ADRES_METNI}}</li>
        </ul>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:var(--space-3);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--space-2)">
      <p style="color:rgba(255,255,255,0.3);font-size:var(--fs-xs);margin:0">&copy; 2026 {{ISLETME_ADI}}. Tüm hakları saklıdır.</p>
      <div style="display:flex;gap:var(--space-3)">
        <a href="#kvkk" style="color:rgba(255,255,255,0.3);text-decoration:none;font-size:var(--fs-xs);transition:color 0.2s" onmouseover="this.style.color='rgba(255,255,255,0.6)'" onmouseout="this.style.color='rgba(255,255,255,0.3)'">Gizlilik Politikası</a>
        <a href="#kvkk" style="color:rgba(255,255,255,0.3);text-decoration:none;font-size:var(--fs-xs);transition:color 0.2s" onmouseover="this.style.color='rgba(255,255,255,0.6)'" onmouseout="this.style.color='rgba(255,255,255,0.3)'">KVKK Aydınlatma</a>
      </div>
      <p style="color:rgba(255,255,255,0.15);font-size:0.7rem;margin:0">Powered by <a href="https://kepenk.ai" style="color:rgba(255,255,255,0.25);text-decoration:none" target="_blank">kepenk.ai</a></p>
    </div>
  </div>
</footer>`

export const ortakCSS = `
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    /* ── Renk Sistemi ── */
    --renk-arkaplan:{{CSS_ARKAPLAN}};
    --renk-kart:{{CSS_KART}};
    --renk-vurgu:{{CSS_VURGU}};
    --renk-hover:{{CSS_HOVER}};
    --renk-metin:{{CSS_METIN}};
    --renk-alt:{{CSS_ALT}};
    --renk-gradient:{{CSS_GRADIENT}};
    --font-baslik:'{{FONT_BASLIK}}',sans-serif;
    --font-metin:'{{FONT_METIN}}',sans-serif;

    /* ── Layout Tokens ── */
    --nav-height:72px;
    --max-width:1200px;
    --content-width:65ch;

    /* ── Spacing (8px Grid) ── */
    --space-1:8px;
    --space-2:16px;
    --space-3:24px;
    --space-4:32px;
    --space-5:40px;
    --space-6:48px;
    --space-8:64px;
    --space-10:80px;
    --space-12:96px;
    --space-16:128px;

    /* ── Type Scale (Modular 1.25) ── */
    --fs-xs:clamp(0.7rem, 0.65rem + 0.25vw, 0.8rem);
    --fs-sm:clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem);
    --fs-base:clamp(0.95rem, 0.88rem + 0.35vw, 1.05rem);
    --fs-lg:clamp(1.1rem, 1rem + 0.5vw, 1.25rem);
    --fs-xl:clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
    --fs-2xl:clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
    --fs-3xl:clamp(2rem, 1.5rem + 2.5vw, 3rem);
    --fs-4xl:clamp(2.5rem, 1.8rem + 3.5vw, 4rem);
    --fs-5xl:clamp(3rem, 2rem + 5vw, 5.5rem);

    /* ── Z-Index Hierarchy ── */
    --z-base:1;
    --z-sticky:50;
    --z-nav:100;
    --z-modal:200;
    --z-tooltip:300;
  }
  html{scroll-behavior:smooth}
  body{font-family:var(--font-metin);background:var(--renk-arkaplan);color:var(--renk-metin);overflow-x:hidden;font-size:var(--fs-base);line-height:1.65;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  h1,h2,h3,h4{font-family:var(--font-baslik);line-height:1.2}
  h1{font-size:var(--fs-5xl);font-weight:900}
  h2{font-size:var(--fs-3xl);font-weight:800}
  h3{font-size:var(--fs-xl);font-weight:700}
  p{max-width:var(--content-width);line-height:1.7}
  img{max-width:100%;height:auto;display:block}
  a{color:inherit;text-decoration:none}

  /* ── Utility Classes ── */
  .glass-panel {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  }
  .glass-panel-light {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }
  .parallax-bg {
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .overlay-dark { position: relative; }
  .overlay-dark::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.75));
    pointer-events: none; z-index: 1;
  }
  .overlay-light { position: relative; }
  .overlay-light::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.7));
    pointer-events: none; z-index: 1;
  }
  .overlay-content { position: relative; z-index: 2; }

  /* ── Animations ── */
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes pulseSoft {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255, 0.2); }
    70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(255,255,255, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,255,255, 0); }
  }
  .hover-pulse:hover { animation: pulseSoft 1.5s infinite; }

  /* Scroll-down ok animasyonu */
  @keyframes bounceDown {
    0%, 100% { transform: translateY(0); opacity: 0.6; }
    50% { transform: translateY(10px); opacity: 1; }
  }
  .scroll-down-ok {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    z-index: 3; color: #fff; font-size: 1.5rem; animation: bounceDown 2s infinite;
    cursor: pointer; text-decoration: none; opacity: 0.7;
    width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
    border-radius: 50%; background: rgba(255,255,255,0.08); backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.12); transition: background 0.2s;
  }
  .scroll-down-ok:hover { background: rgba(255,255,255,0.15); opacity: 1; }

  /* Focus Visible (WCAG) */
  :focus-visible { outline: 3px solid var(--renk-vurgu); outline-offset: 3px; border-radius: 4px; }
  button:focus-visible, a:focus-visible { outline: 3px solid var(--renk-vurgu); outline-offset: 3px; }

  /* Section Divider */
  .section-divider {
    height: 1px; border: none; margin: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent);
  }
  .section-alt { background: var(--renk-kart); }

  /* ── Component Styles ── */
  .kart{
    background:var(--renk-kart);
    border-radius:16px;
    padding:var(--space-3);
    transition:transform 0.35s cubic-bezier(0.4,0,0.2,1),box-shadow 0.35s,border-color 0.35s;
    border:1px solid rgba(255,255,255,0.05);
    min-width:0;
  }
  .kart:hover{
    transform:translateY(-6px);
    box-shadow:0 20px 50px rgba(0,0,0,0.25),0 0 0 1px rgba(255,255,255,0.1);
    border-color:var(--renk-vurgu);
  }

  .buton-birincil{
    display:inline-flex;align-items:center;gap:var(--space-1);
    background:var(--renk-vurgu);color:#fff;
    padding:14px 28px;border-radius:12px;
    text-decoration:none;font-weight:700;font-size:var(--fs-base);
    transition:all 0.2s;border:none;cursor:pointer;
    min-height:44px;
    position:relative;overflow:hidden;z-index:1;
  }
  .buton-birincil::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.1);z-index:-1;transform:scaleX(0);transform-origin:right;transition:transform 0.3s}
  .buton-birincil:hover::after{transform:scaleX(1);transform-origin:left}
  .buton-birincil:hover{transform:scale(1.02);background:var(--renk-hover)}

  .buton-ikincil{
    display:inline-flex;align-items:center;gap:var(--space-1);
    background:rgba(255,255,255,0.08);color:var(--renk-metin);
    padding:14px 28px;border-radius:12px;
    text-decoration:none;font-weight:600;font-size:var(--fs-base);
    transition:all 0.2s;border:1px solid rgba(255,255,255,0.15);
    min-height:44px;cursor:pointer;
  }
  .buton-ikincil:hover{background:rgba(255,255,255,0.14)}

  .bolum-baslik{text-align:center;margin-bottom:var(--space-5)}
  .bolum-baslik h2{font-size:var(--fs-3xl);font-weight:900;color:var(--renk-metin);margin-bottom:var(--space-1)}
  .bolum-baslik p{color:var(--renk-alt);font-size:var(--fs-base);max-width:var(--content-width);margin:0 auto;line-height:1.7}

  section{padding:var(--space-10) var(--space-3)}
  section:first-of-type{padding-top:calc(var(--nav-height) + var(--space-6))}
  .container{max-width:780px;margin:0 auto}
  .container-lg{max-width:var(--max-width);margin:0 auto}

  /* Grid/flex overflow prevention */
  .kart, [class*="grid"] > * { min-width: 0; }

  /* ── Mobile-First Responsive ── */
  @media(max-width:768px){
    section{padding:var(--space-6) var(--space-2)}
    section:first-of-type{padding-top:calc(var(--nav-height) + var(--space-4))}
    .buton-birincil,.buton-ikincil{padding:12px 20px;font-size:var(--fs-sm);width:100%;justify-content:center}
  }
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family={{FONT_BASLIK}}:wght@400;700;900&family={{FONT_METIN}}:wght@400;500;600&display=swap" rel="stylesheet">`
