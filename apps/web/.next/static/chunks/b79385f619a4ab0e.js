(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,197110,e=>{"use strict";var i=e.i(279918),a=e.i(664296),r=e.i(958587);function t({children:e,delay:r=0,className:t="",direction:n}){let{ref:s,visible:l}=function(e=.15){let i=(0,a.useRef)(null),[r,t]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let a=i.current;if(!a)return;let r=new IntersectionObserver(([e])=>{e.isIntersecting&&(t(!0),r.unobserve(a))},{threshold:e});return r.observe(a),()=>r.disconnect()},[e]),{ref:i,visible:r}}();return(0,i.jsx)("div",{ref:s,className:t,style:{opacity:+!!l,transform:l?"none":"translateY(40px)",transition:`all 0.9s cubic-bezier(0.16,1,0.3,1) ${r}ms`},children:e})}let n=[{num:"99.6%",label:"SpO2 Doğruluğu"},{num:"7 Gün",label:"Pil Ömrü"},{num:"2.8g",label:"Titanyum Gövde"},{num:"100m",label:"Suya Dayanıklılık"}];function s(){let[e,s]=(0,a.useState)(!1),[l,o]=(0,a.useState)(!1),[d,c]=(0,a.useState)([]),[p,x]=(0,a.useState)(""),[m,h]=(0,a.useState)("Titanium");(0,a.useEffect)(()=>{let e=()=>s(window.scrollY>40);return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]);let g=e=>{x(e),setTimeout(()=>x(""),2500)},y=d.reduce((e,i)=>e+i.price*i.qty,0),f=d.reduce((e,i)=>e+i.qty,0);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .ay-d * { margin:0; padding:0; box-sizing:border-box; }
        .ay-d { font-family: 'Inter', system-ui, sans-serif; background: #000; color: #f5f5f7; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .ay-d a { text-decoration: none; color: inherit; }
        .ay-d img { max-width: 100%; display: block; }
        .ay-glass { background: rgba(20,20,22,0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.08); }

        /* BUY BAR (Top) */
        .ay-buy-bar {
          position: fixed; top: 0; left: 0; right: 0; height: 50px; background: #1a1a1c; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between; padding: 0 5%;
          border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem;
        }
        .ay-bb-left { color: #86868b; }
        .ay-bb-left strong { color: #f5f5f7; margin-left: 6px; }
        .ay-bb-right a { color: #2997ff; cursor: pointer; transition: 0.2s; }
        .ay-bb-right a:hover { opacity: 0.8; }

        /* NAV */
        .ay-nav {
          position: fixed; top: 50px; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%; height: 60px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          background: rgba(0,0,0,0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
        }
        .ay-nav.scrolled { border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.8); }
        .ay-logo { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.02em; }
        .ay-logo span { color: #2997ff; }
        .ay-links { display: flex; gap: 32px; }
        .ay-links a { font-size: 0.85rem; font-weight: 400; color: #d2d2d7; transition: 0.2s; }
        .ay-links a:hover { color: #fff; }
        .ay-btn-wrap { display: flex; align-items: center; gap: 16px; }
        .ay-mini-cart { position: relative; cursor: pointer; color: #d2d2d7; }
        .ay-mini-cart:hover { color: #fff; }
        .ay-badge { position: absolute; top: -6px; right: -8px; background: #2997ff; color: #fff; font-size: 0.65rem; font-weight: 700; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }

        /* HERO */
        .ay-hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; overflow: hidden; padding-top: 110px; }
        .ay-glow-bg { position: absolute; top: 50%; left: 50%; width: 60vw; height: 60vw; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(41,151,255,0.15) 0%, rgba(0,0,0,0) 70%); z-index: 0; pointer-events: none; }
        .ay-hero-content { position: relative; z-index: 2; max-width: 800px; padding: 0 24px; }
        .ay-eyebrow { font-size: 0.9rem; font-weight: 600; color: #2997ff; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
        .ay-title { font-size: clamp(3.5rem, 8vw, 6.5rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.05; margin-bottom: 24px; background: linear-gradient(180deg, #fff 0%, #86868b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .ay-desc { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 400; color: #86868b; line-height: 1.4; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .ay-cta { display: inline-flex; background: #f5f5f7; color: #000; padding: 14px 32px; border-radius: 99px; font-size: 1rem; font-weight: 500; transition: 0.3s; cursor: pointer; border: none; font-family: inherit; }
        .ay-cta:hover { background: #fff; transform: scale(1.03); }

        /* PRODUCT VISUAL */
        .ay-ring-viz { position: relative; width: 320px; height: 320px; margin: 0 auto 40px; z-index: 2; }
        .ay-ring-outer { position: absolute; inset: 20px; border-radius: 50%; border: 24px solid; box-shadow: 0 0 60px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.5); transition: border-color 0.5s; }
        .color-Titanium { border-color: #d0d0d5; } .color-Stealth { border-color: #2c2c2e; } .color-Gold { border-color: #e3c498; }
        .ay-ring-inner { position: absolute; inset: 40px; border-radius: 50%; box-shadow: inset 0 0 20px rgba(0,0,0,0.8); }

        /* COLOR PICKER */
        .ay-colors { display: flex; gap: 16px; justify-content: center; position: relative; z-index: 2; margin-bottom: 60px; }
        .ay-color-btn { width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: 0.2s; padding: 2px; background-clip: content-box; }
        .ay-color-btn.active { border-color: #2997ff; transform: scale(1.1); }

        /* STATS BAR */
        .ay-stats { display: flex; gap: 40px; justify-content: center; flex-wrap: wrap; margin-top: 40px; }
        .ay-stat-item { text-align: center; }
        .ay-stat-num { font-size: 1.8rem; font-weight: 600; color: #f5f5f7; }
        .ay-stat-label { font-size: 0.8rem; color: #86868b; margin-top: 4px; font-weight: 500; }

        /* FEATURES (GLASSMOSPHISM CARDS) */
        .ay-features { padding: 120px 5%; max-width: 1200px; margin: 0 auto; }
        .ay-section-header { text-align: center; margin-bottom: 80px; }
        .ay-f-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .ay-f-card { border-radius: 32px; padding: 40px 32px; display: flex; flex-direction: column; position: relative; overflow: hidden; min-height: 380px; }
        .ay-f-icon { font-size: 2.5rem; margin-bottom: 24px; filter: drop-shadow(0 0 12px rgba(255,255,255,0.2)); }
        .ay-f-card h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 12px; }
        .ay-f-card p { font-size: 0.95rem; line-height: 1.6; color: #a1a1a6; }
        .ay-f-bg { position: absolute; right: -20%; bottom: -20%; width: 70%; height: 70%; border-radius: 50%; filter: blur(60px); opacity: 0.15; z-index: -1; }

        /* DEEP DIVE SECTIONS */
        .ay-deep-section { padding: 120px 5%; max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; border-top: 1px solid rgba(255,255,255,0.05); }
        .ay-split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .ay-split.reverse { direction: rtl; } .ay-split.reverse > * { direction: ltr; }
        .ay-split-img { background: #111113; border-radius: 40px; aspect-ratio: 1; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
        
        /* SLEEP CHART MOCKUP */
        .ay-chart-grid { width: 80%; height: 60%; display: flex; flex-direction: column; gap: 4px; justify-content: flex-end; }
        .ay-chart-row { display: flex; gap: 4px; align-items: stretch; height: 100%; border-radius: 8px; overflow: hidden; }
        .ay-c-bar { flex: 1; border-radius: 4px; background: rgba(255,255,255,0.05); position: relative; }
        .ay-c-fill { position: absolute; bottom: 0; left: 0; right: 0; border-radius: 4px; }
        .bg-rem { background: #2997ff; } .bg-light { background: #5e5ce6; } .bg-deep { background: #32ade6; }

        /* ACTIVITY MOCKUP */
        .ay-ring-charts { display: flex; gap: 24px; position: relative; }
        .ay-activity-ring { width: 120px; height: 120px; border-radius: 50%; border: 12px solid rgba(255,45,85,0.2); border-top-color: #ff2d55; border-right-color: #ff2d55; transform: rotate(45deg); }
        .ay-activity-ring-inner { position: absolute; top: 20px; left: 20px; width: 80px; height: 80px; border-radius: 50%; border: 12px solid rgba(52,199,89,0.2); border-top-color: #34c759; transform: rotate(-30deg); }

        /* PURCHASING */
        .ay-purchase { padding: 120px 5%; text-align: center; background: #0a0a0c; border-top: 1px solid rgba(255,255,255,0.05); position: relative; overflow: hidden; }
        .ay-glow-bot { position: absolute; bottom: 0; left: 50%; width: 100vw; height: 30vh; transform: translateX(-50%); background: radial-gradient(ellipse at bottom, rgba(41,151,255,0.1) 0%, transparent 70%); }
        .ay-p-card { max-width: 480px; margin: 0 auto; border-radius: 32px; padding: 48px; text-align: left; position: relative; z-index: 2; }
        .ay-p-card h3 { font-size: 2rem; font-weight: 600; margin-bottom: 8px; }
        .ay-p-card p { color: #86868b; margin-bottom: 32px; font-size: 1rem; line-height: 1.5; }
        .ay-price { font-size: 3.5rem; font-weight: 700; margin-bottom: 32px; display: flex; align-items: baseline; gap: 8px; letter-spacing: -0.04em; }
        .ay-price span { font-size: 1.2rem; color: #86868b; font-weight: 400; }
        .ay-p-btn { width: 100%; background: #fff; color: #000; border: none; padding: 20px; border-radius: 16px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: 0.2s; font-family: inherit; }
        .ay-p-btn:hover { background: #f5f5f7; transform: scale(1.02); }

        /* FOOTER */
        .ay-ft { padding: 60px 5%; background: #000; border-top: 1px solid rgba(255,255,255,0.1); color: #86868b; font-size: 0.8rem; }
        .ay-ft-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; max-width: 1200px; margin: 0 auto 40px; }
        .ay-ft-col h4 { color: #f5f5f7; font-size: 0.8rem; font-weight: 600; margin-bottom: 16px; }
        .ay-ft-col ul { list-style: none; }
        .ay-ft-col li { margin-bottom: 10px; }
        .ay-ft-col a { transition: 0.2s; } .ay-ft-col a:hover { color: #f5f5f7; }

        /* WINDOWS / OVERLAYS */
        .ay-cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); z-index: 2000; opacity: 0; pointer-events: none; transition: 0.3s; }
        .ay-cart-overlay.open { opacity: 1; pointer-events: all; }
        .ay-cart-drawer { position: fixed; top: 0; right: -420px; width: 400px; max-width: 100vw; height: 100vh; z-index: 2001; transition: 0.4s cubic-bezier(0.16,1,0.3,1); padding: 32px; display: flex; flex-direction: column; border-left: 1px solid rgba(255,255,255,0.1); }
        .ay-cart-drawer.open { right: 0; }
        .ay-c-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .ay-c-head h3 { font-size: 1.5rem; font-weight: 600; }
        .ay-c-close { background: none; border: none; font-size: 1.2rem; color: #86868b; cursor: pointer; transition: 0.2s; }
        .ay-c-close:hover { color: #fff; }
        .ay-c-items { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; padding-bottom: 24px; }
        .ay-c-item { display: flex; justify-content: space-between; align-items: flex-start; }
        .ay-c-info h4 { font-size: 1.05rem; font-weight: 500; margin-bottom: 4px; }
        .ay-c-info p { font-size: 0.85rem; color: #86868b; display: flex; gap: 8px; margin-bottom: 8px; }
        .ay-c-color-dot { display: inline-block; width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); }
        .ay-c-remove { background: none; border: none; color: #ff3b30; cursor: pointer; font-size: 0.8rem; font-weight: 500; }
        .ay-c-price { font-weight: 500; font-size: 1.1rem; }
        .ay-c-foot { margin-top: auto; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
        .ay-c-total { display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 600; margin-bottom: 24px; }

        .ay-toast { position: fixed; bottom: 32px; left: 50%; transform: translate(-50%, 100px); border-radius: 99px; padding: 14px 28px; font-size: 0.9rem; font-weight: 500; z-index: 3000; transition: 0.4s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 4px 24px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
        .ay-toast.show { transform: translate(-50%, 0); margin-bottom: env(safe-area-inset-bottom, 0); }

        @media(max-width: 768px) {
          .ay-title { font-size: 3rem; }
          .ay-split, .ay-split.reverse { grid-template-columns: 1fr; gap: 40px; }
          .ay-links { display: none; }
          .ay-stats { gap: 20px; flex-direction: column; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px; }
          .ay-p-card { padding: 32px 24px; }
        }
      `}),(0,i.jsxs)("div",{className:"ay-d",children:[(0,i.jsxs)("div",{className:"ay-buy-bar",children:[(0,i.jsxs)("div",{className:"ay-bb-left",children:["Demo Mağaza: ",(0,i.jsx)("strong",{children:"kepenk.ai Akıllı Yüzük Modülü"})]}),(0,i.jsx)("div",{className:"ay-bb-right",children:(0,i.jsx)(r.default,{href:"/onboarding",children:"Kendi Mağazanızı Açın →"})})]}),(0,i.jsxs)("nav",{className:`ay-nav${e?" scrolled":""}`,children:[(0,i.jsxs)("div",{className:"ay-logo",children:["HAL",(0,i.jsx)("span",{children:"kay"})," Pro"]}),(0,i.jsxs)("div",{className:"ay-links",children:[(0,i.jsx)("a",{href:"#genel",children:"Genel Bakış"}),(0,i.jsx)("a",{href:"#saglik",children:"Sağlık İzleme"}),(0,i.jsx)("a",{href:"#derin",children:"Derin Analiz"}),(0,i.jsx)("a",{href:"#satin-al",children:"Satın Al"})]}),(0,i.jsx)("div",{className:"ay-btn-wrap",children:(0,i.jsxs)("div",{className:"ay-mini-cart",onClick:()=>o(!0),children:[(0,i.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[(0,i.jsx)("path",{d:"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}),(0,i.jsx)("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),(0,i.jsx)("path",{d:"M16 10a4 4 0 0 1-8 0"})]}),f>0&&(0,i.jsx)("span",{className:"ay-badge",children:f})]})})]}),(0,i.jsxs)("section",{className:"ay-hero",id:"genel",children:[(0,i.jsx)("div",{className:"ay-glow-bg"}),(0,i.jsxs)("div",{className:"ay-hero-content",children:[(0,i.jsx)(t,{children:(0,i.jsx)("div",{className:"ay-eyebrow",children:"Yeni Nesil Sağlık Takibi"})}),(0,i.jsx)(t,{delay:100,children:(0,i.jsxs)("h1",{className:"ay-title",children:["Görünmez teknoloji.",(0,i.jsx)("br",{}),"Görünür sonuçlar."]})}),(0,i.jsx)(t,{delay:200,children:(0,i.jsx)("p",{className:"ay-desc",children:"Klinik düzeyde hassasiyet, ultra hafif titanyum gövde. Vücudunuzu daha önce hiç olmadığı kadar net bir şekilde anlayın."})}),(0,i.jsx)(t,{delay:300,children:(0,i.jsxs)("div",{className:"ay-ring-viz",children:[(0,i.jsx)("div",{className:`ay-ring-outer color-${m}`}),(0,i.jsx)("div",{className:"ay-ring-inner"})]})}),(0,i.jsx)(t,{delay:400,children:(0,i.jsx)("div",{className:"ay-colors",children:["Titanium","Stealth","Gold"].map(e=>(0,i.jsx)("button",{className:`ay-color-btn ${m===e?"active":""}`,style:{backgroundColor:"Titanium"===e?"#d0d0d5":"Stealth"===e?"#1c1c1e":"#e3c498"},onClick:()=>h(e)},e))})}),(0,i.jsx)(t,{delay:500,children:(0,i.jsx)("button",{className:"ay-cta",onClick:()=>document.getElementById("satin-al")?.scrollIntoView({behavior:"smooth"}),children:"Fiyatlandırmayı İncele"})}),(0,i.jsx)("div",{className:"ay-stats",children:n.map((e,a)=>(0,i.jsx)(t,{delay:600+100*a,children:(0,i.jsxs)("div",{className:"ay-stat-item",children:[(0,i.jsx)("div",{className:"ay-stat-num",children:e.num}),(0,i.jsx)("div",{className:"ay-stat-label",children:e.label})]})},a))})]})]}),(0,i.jsxs)("section",{className:"ay-features",id:"saglik",children:[(0,i.jsx)(t,{children:(0,i.jsxs)("div",{className:"ay-section-header",children:[(0,i.jsxs)("h2",{style:{fontSize:"clamp(2rem, 5vw, 3.5rem)",fontWeight:600,marginBottom:"16px",letterSpacing:"-0.02em"},children:["Sağlığınız, her saniye",(0,i.jsx)("br",{}),"kontrol altında."]}),(0,i.jsx)("p",{style:{color:"#86868b",fontSize:"1.2rem"},children:"Laboratuvar hassasiyetinde 6 eksenli sensör mimarisi."})]})}),(0,i.jsx)("div",{className:"ay-f-grid",children:[{i:"🤍",t:"Nabız ve HRV Analizi",d:"Optik sensör kümeleri ile 7/24 kesintisiz kalp ritmi ve kalp atış hızı değişkenliği (HRV) izleme. Stres seviyenizi anlık görün.",color:"#ff2d55"},{i:"🌡️",t:"Hassas Sıcaklık",d:"Uyku boyunca cilt sıcaklığı sapmalarını milimetrik hassasiyetle ölçer. Hastalık belirtilerini önceden tahmin edin.",color:"#ff9500"},{i:"🩸",t:"SpO2 Oksijen",d:"Gelişmiş kırmızı ve kızılötesi LED dizilimi ile gece boyunca kan oksijen doygunluğunu kesintisiz takip edin.",color:"#34c759"},{i:"🔋",t:"Optimum Verimlilik",d:"Kompakt pil teknolojisi sayesinde tek şarjla tam 1 hafta boyunca kesintisiz sensör takibi ve analiz yeteneği.",color:"#2997ff"}].map((e,a)=>(0,i.jsx)(t,{delay:150*a,children:(0,i.jsxs)("div",{className:"ay-f-card ay-glass",children:[(0,i.jsx)("div",{className:"ay-f-bg",style:{background:e.color}}),(0,i.jsx)("div",{className:"ay-f-icon",children:e.i}),(0,i.jsx)("h3",{children:e.t}),(0,i.jsx)("p",{children:e.d})]})},a))})]}),(0,i.jsxs)("section",{className:"ay-deep-section",id:"derin",children:[(0,i.jsxs)("div",{className:"ay-split",children:[(0,i.jsx)(t,{direction:"left",children:(0,i.jsx)("div",{className:"ay-split-img",children:(0,i.jsx)("div",{className:"ay-chart-grid",children:[40,60,80,50,90,70,85].map((e,a)=>(0,i.jsx)("div",{className:"ay-c-bar",children:(0,i.jsx)("div",{className:`ay-c-fill ${a%3==0?"bg-deep":a%2==0?"bg-rem":"bg-light"}`,style:{height:`${e}%`,transition:"1s ease",animation:`grow 1.5s ease ${.1*a}s forwards`}})},a))})})}),(0,i.jsx)(t,{direction:"right",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{style:{fontSize:"2.5rem",fontWeight:600,marginBottom:"24px",letterSpacing:"-0.02em"},children:"Uykunuzu baştan aşağı yorumlayın."}),(0,i.jsx)("p",{style:{color:"#86868b",fontSize:"1.1rem",lineHeight:"1.6",marginBottom:"24px"},children:'REM, derin ve hafif uyku evrelerinizi klinik doğrulukla ayrıştırın. Sabahları güne ne kadar hazır olduğunuzu gösteren "Kapsamlı Uyku Skoru" ile uyanın.'}),(0,i.jsxs)("ul",{style:{color:"#d2d2d7",listStyle:"none",lineHeight:"2"},children:[(0,i.jsx)("li",{children:"✓ Gelişmiş evre tespiti ve uyanıklık takibi"}),(0,i.jsx)("li",{children:"✓ Uykuda solunum analizi ve oksijen satürasyonu"}),(0,i.jsx)("li",{children:"✓ Sirkadiyen ritim hizalaması hedefleri"})]})]})})]}),(0,i.jsxs)("div",{className:"ay-split reverse",children:[(0,i.jsx)(t,{direction:"right",children:(0,i.jsx)("div",{className:"ay-split-img",style:{background:"linear-gradient(45deg, #111113, #1c1c1e)"},children:(0,i.jsxs)("div",{className:"ay-ring-charts",children:[(0,i.jsx)("div",{className:"ay-activity-ring"}),(0,i.jsx)("div",{className:"ay-activity-ring-inner"})]})})}),(0,i.jsx)(t,{direction:"left",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("h2",{style:{fontSize:"2.5rem",fontWeight:600,marginBottom:"24px",letterSpacing:"-0.02em"},children:"Aktivite ve Toparlanma."}),(0,i.jsx)("p",{style:{color:"#86868b",fontSize:"1.1rem",lineHeight:"1.6",marginBottom:"24px"},children:'Bugün antrenmanda sınırlarınızı zorlamalı mısınız, yoksa dinlenmeye mi ağırlık vermelisiniz? Halkay Pro, vücudunuzun biyometrik verilerini analiz ederek size günlük "Hazırlık Skoru" sunar.'}),(0,i.jsx)("button",{className:"ay-cta",style:{background:"#2997ff",color:"#fff"},onClick:()=>document.getElementById("satin-al")?.scrollIntoView({behavior:"smooth"}),children:"Yüzüğünüzü Seçin"})]})})]})]}),(0,i.jsxs)("section",{className:"ay-purchase",id:"satin-al",children:[(0,i.jsx)("div",{className:"ay-glow-bot"}),(0,i.jsx)(t,{children:(0,i.jsxs)("div",{className:"ay-p-card ay-glass",children:[(0,i.jsx)("h3",{children:"Halkay Pro Yüzük"}),(0,i.jsx)("p",{children:"Ömür boyu gelişmiş analitik üyeliği dahildir. Ekstra hiçbir aylık ücret ödemeyin."}),(0,i.jsx)("div",{style:{marginBottom:"40px",background:"rgba(255,255,255,0.03)",padding:"24px",borderRadius:"24px",border:"1px solid rgba(255,255,255,0.05)"},children:(0,i.jsxs)("div",{style:{paddingBottom:"20px"},children:[(0,i.jsx)("div",{style:{fontSize:"0.9rem",color:"#86868b",marginBottom:"16px",fontWeight:"500"},children:"Renk Kaplaması"}),(0,i.jsx)("div",{className:"ay-colors",style:{justifyContent:"flex-start",margin:0,gap:"20px"},children:["Titanium","Stealth","Gold"].map(e=>(0,i.jsx)("button",{className:`ay-color-btn ${m===e?"active":""}`,style:{width:"40px",height:"40px",backgroundColor:"Titanium"===e?"#d0d0d5":"Stealth"===e?"#1c1c1e":"#e3c498"},onClick:()=>h(e),title:e},e))}),(0,i.jsxs)("div",{style:{marginTop:"16px",fontSize:"0.9rem",color:"#f5f5f7"},children:["Seçilen kaplama: ",(0,i.jsxs)("strong",{style:{color:"#2997ff"},children:[m," Finish"]})]})]})}),(0,i.jsxs)("div",{className:"ay-price",children:[(0,i.jsx)("span",{children:"₺"})," ","Gold"===m?"8.999":"7.499"]}),(0,i.jsx)("button",{className:"ay-p-btn",onClick:()=>{var e,i;return e="Halkay Pro",i="Gold"===m?8999:7499,void(c(a=>a.find(i=>i.name===e&&i.color===m)?a.map(i=>i.name===e&&i.color===m?{...i,qty:i.qty+1}:i):[...a,{name:e,price:i,qty:1,color:m}]),g(`${e} sepete eklendi!`),o(!0))},children:"Sepete Ekle"}),(0,i.jsx)("div",{style:{textAlign:"center",marginTop:"16px",fontSize:"0.85rem",color:"#86868b"},children:"Aynı gün ücretsiz ve sigortalı teslimat."})]})})]}),(0,i.jsxs)("footer",{className:"ay-ft",children:[(0,i.jsxs)("div",{className:"ay-ft-grid",children:[(0,i.jsxs)("div",{className:"ay-ft-col",children:[(0,i.jsx)("h4",{children:"Halkay"}),(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Hakkımızda"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Teknoloji Ekibi"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Kariyer Fırsatları"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Basın Odası"})})]})]}),(0,i.jsxs)("div",{className:"ay-ft-col",children:[(0,i.jsx)("h4",{children:"Destek"}),(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Yardım Merkezi"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"İade ve Değişim"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Garanti Belgesi"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Sürdürülebilirlik"})})]})]}),(0,i.jsxs)("div",{className:"ay-ft-col",children:[(0,i.jsx)("h4",{children:"Yasal"}),(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Gizlilik Politikası"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Kullanım Şartları"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"KVKK Metni"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"#",children:"Çerez Politikası"})})]})]})]}),(0,i.jsxs)("div",{style:{textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"32px",display:"flex",flexDirection:"column",gap:"8px"},children:[(0,i.jsx)("span",{children:"© 2026 Halkay Technology Inc. Tüm hakları saklıdır."}),(0,i.jsx)("span",{style:{fontSize:"0.75rem",color:"#555"},children:"Design system powered by kepenk.ai E-Commerce Engine"})]})]}),(0,i.jsx)("div",{className:`ay-toast ay-glass${p?" show":""}`,children:p}),(0,i.jsx)("div",{className:`ay-cart-overlay${l?" open":""}`,onClick:()=>o(!1)}),(0,i.jsxs)("div",{className:`ay-cart-drawer ay-glass${l?" open":""}`,children:[(0,i.jsxs)("div",{className:"ay-c-head",children:[(0,i.jsx)("h3",{children:"Sepetiniz"}),(0,i.jsx)("button",{className:"ay-c-close",onClick:()=>o(!1),children:"✕"})]}),0===d.length?(0,i.jsx)("p",{style:{color:"#86868b",textAlign:"center",marginTop:"60px"},children:"Sepetiniz boş."}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{className:"ay-c-items",children:d.map(e=>(0,i.jsxs)("div",{className:"ay-c-item",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{className:"ay-c-info",children:e.name}),(0,i.jsxs)("p",{className:"ay-c-info",style:{alignItems:"center"},children:[(0,i.jsx)("span",{className:"ay-c-color-dot",style:{background:"Titanium"===e.color?"#d0d0d5":"Stealth"===e.color?"#1c1c1e":"#e3c498"}})," ",e.color,(0,i.jsx)("span",{style:{margin:"0 4px"},children:"·"})," Adet: ",e.qty]}),(0,i.jsx)("button",{className:"ay-c-remove",onClick:()=>{let i,a;return i=e.name,a=e.color,c(e=>e.filter(e=>e.name!==i||e.color!==a))},children:"Kaldır"})]}),(0,i.jsxs)("div",{className:"ay-c-price",children:[(e.price*e.qty).toLocaleString("tr-TR")," ₺"]})]},e.name+e.color))}),(0,i.jsxs)("div",{className:"ay-c-foot",children:[(0,i.jsxs)("div",{className:"ay-c-total",children:[(0,i.jsx)("span",{children:"Ara Toplam"}),(0,i.jsxs)("span",{style:{color:"#f5f5f7"},children:[y.toLocaleString("tr-TR")," ₺"]})]}),(0,i.jsx)("button",{className:"ay-p-btn",style:{background:"#fff",color:"#000"},onClick:()=>{g("💯 Siparişiniz alındı!"),c([]),o(!1)},children:"Güvenli Ödeme"})]})]})]})]})]})}e.s(["default",()=>s])}]);