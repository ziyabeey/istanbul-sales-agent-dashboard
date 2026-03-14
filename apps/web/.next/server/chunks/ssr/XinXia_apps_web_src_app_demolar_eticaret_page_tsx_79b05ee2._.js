module.exports=[919104,a=>{"use strict";var b=a.i(888337),c=a.i(702015);function d({children:a,delay:d=0,className:e=""}){let{ref:f,visible:g}=function(){let a=(0,c.useRef)(null),[b,d]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{let b=a.current;if(!b)return;let c=new IntersectionObserver(([a])=>{a.isIntersecting&&(d(!0),c.unobserve(b))},{threshold:.1});return c.observe(b),()=>c.disconnect()},[]),{ref:a,visible:b}}();return(0,b.jsx)("div",{ref:f,className:e,style:{opacity:+!!g,transform:g?"none":"translateY(40px)",transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${d}ms`},children:a})}let e=[{id:1,ad:"OVERSIZED BLAZER",fiyat:4950,resim:"🧥",beden:["S","M","L"]},{id:2,ad:"CARGO PANTS",fiyat:3200,resim:"👖",beden:["M","L","XL"]},{id:3,ad:"CHUNKY BOOTS",fiyat:6800,resim:"👢",beden:["40","41","42","43"]},{id:4,ad:"LEATHER TOTE",fiyat:5400,resim:"👜",beden:["ONE SIZE"]},{id:5,ad:"SILK SHIRT",fiyat:2800,resim:"👔",beden:["S","M"]},{id:6,ad:"HEAVYWEIGHT TEE",fiyat:1200,resim:"👕",beden:["S","M","L","XL"]}];function f(){let[a,f]=(0,c.useState)([]),[g,h]=(0,c.useState)(null),[i,j]=(0,c.useState)(""),[k,l]=(0,c.useState)(!1),[m,n]=(0,c.useState)(""),o=a=>{n(a),setTimeout(()=>n(""),2500)},p=a.reduce((a,b)=>a+b.fiyat*b.qty,0),q=a.reduce((a,b)=>a+b.qty,0);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .fw-d * { margin:0; padding:0; box-sizing:border-box; }
        .fw-d { font-family: 'Space Grotesk', sans-serif; background: #e5e5e5; color: #000; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .fw-d a { text-decoration: none; color: inherit; }
        .fw-btn { cursor: pointer; border: 2px solid #000; background: transparent; font-family: inherit; font-weight: 700; text-transform: uppercase; transition: transform 0.1s, background 0.3s, color 0.3s; }
        .fw-btn:hover { background: #000; color: #e5e5e5; }
        .fw-btn:active { transform: translateY(2px); }

        /* MARQUEE TOP */
        .fw-marq { width: 100%; overflow: hidden; background: #000; color: #fff; padding: 10px 0; border-bottom: 2px solid #000; font-weight: 700; font-size: 0.8rem; letter-spacing: 0.1em; display: flex; white-space: nowrap; }
        .fw-m-track { display: flex; animation: scrollX 20s linear infinite; }
        .fw-m-item { padding: 0 40px; }
        @keyframes scrollX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* HEADER */
        .fw-head { border-bottom: 4px solid #000; padding: 24px; display: flex; justify-content: space-between; align-items: center; background: #e5e5e5; position: sticky; top: 0; z-index: 100; }
        .fw-logo { font-size: 3rem; font-weight: 700; letter-spacing: -0.05em; line-height: 0.8; }
        .fw-logo span { border: 2px solid #000; padding: 0 4px; display: inline-block; transform: rotate(-2deg); background: #fff; }
        .fw-cart-t { font-size: 1.25rem; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .fw-cart-t span { background: #000; color: #fff; font-size: 0.8rem; padding: 2px 8px; border-radius: 99px; }

        /* HERO */
        .fw-hero { min-height: 80vh; display: grid; grid-template-columns: 1fr 1fr; border-bottom: 4px solid #000; }
        .fw-h-txt { padding: 48px; display: flex; flex-direction: column; justify-content: center; border-right: 4px solid #000; }
        .fw-h-txt h1 { font-size: clamp(4rem, 10vw, 8rem); line-height: 0.9; text-transform: uppercase; letter-spacing: -0.04em; margin-bottom: 40px; }
        .fw-h-txt p { font-size: 1.25rem; max-width: 400px; font-weight: 500; border-left: 4px solid #000; padding-left: 24px; margin-bottom: 40px; }
        .fw-h-btn { font-size: 1.5rem; padding: 24px 48px; border-radius: 0; width: fit-content; box-shadow: 8px 8px 0 #000; }
        .fw-h-btn:hover { transform: translate(4px, 4px); box-shadow: 4px 4px 0 #000; background: transparent; color: #000; }
        .fw-h-btn:active { transform: translate(8px, 8px); box-shadow: 0 0 0; }
        .fw-h-img { background: #d4d4d4; display: flex; align-items: center; justify-content: center; font-size: 15vw; position: relative; overflow: hidden; }
        .fw-h-img::after { content: 'NEW SEASON'; position: absolute; bottom: 24px; right: 24px; font-size: 2rem; font-weight: 700; mix-blend-mode: difference; color: #fff; }

        /* CATALOG (MASONRY-LIKE GRID) */
        .fw-sec-tit { padding: 40px 24px; font-size: 3rem; text-transform: uppercase; border-bottom: 4px solid #000; background: #fff; }
        .fw-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); border-bottom: 4px solid #000; }
        .fw-card { border-right: 4px solid #000; border-bottom: 4px solid #000; transition: background 0.3s; position: relative; display: flex; flex-direction: column; }
        .fw-card:nth-child(even) { border-right: none; }
        @media(min-width: 1024px) { .fw-card:nth-child(even) { border-right: 4px solid #000; } .fw-card:nth-child(3n) { border-right: none; } }
        .fw-card:hover { background: #fff; }
        .fw-c-img { height: 400px; display: flex; align-items: center; justify-content: center; font-size: 6rem; border-bottom: 4px solid #000; background: #f0f0f0; transition: 0.5s; cursor: pointer; }
        .fw-card:hover .fw-c-img { font-size: 7rem; }
        .fw-c-info { padding: 24px; display: flex; justify-content: space-between; align-items: flex-end; flex: 1; }
        .fw-c-ad { font-size: 1.5rem; font-weight: 700; text-transform: uppercase; line-height: 1.1; max-width: 70%; }
        .fw-c-pri { font-size: 1.25rem; font-weight: 600; }
        .fw-c-buy { position: absolute; top: 24px; right: 24px; border: 2px solid #000; background: #000; color: #fff; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; cursor: pointer; opacity: 0; transform: scale(0.5); transition: 0.3s; }
        .fw-card:hover .fw-c-buy { opacity: 1; transform: scale(1); }
        .fw-c-buy:hover { background: #fff; color: #000; }

        /* FOOTER */
        .fw-foot { background: #000; color: #e5e5e5; padding: 64px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .fw-f-tit { font-size: 5rem; font-weight: 700; line-height: 0.9; letter-spacing: -0.04em; margin-bottom: 40px; }
        .fw-f-links { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; font-size: 1.2rem; text-transform: uppercase; }
        .fw-f-links a:hover { text-decoration: line-through; }
        .fw-newsletter { border: 2px solid #e5e5e5; display: flex; margin-top: 40px; }
        .fw-newsletter input { flex: 1; background: transparent; border: none; padding: 16px; color: #fff; font-size: 1.1rem; outline: none; font-family: inherit; }
        .fw-newsletter button { background: #e5e5e5; color: #000; border: none; padding: 0 32px; font-weight: 700; font-family: inherit; font-size: 1.1rem; cursor: pointer; text-transform: uppercase; }

        /* VIEW MODAL (FULL SCREEN) */
        .fw-v-modal { position: fixed; inset: 0; background: #e5e5e5; z-index: 2000; display: flex; transform: translateY(100%); transition: transform 0.6s cubic-bezier(0.8,0,0.2,1); }
        .fw-v-modal.open { transform: translateY(0); }
        .fw-vm-close { position: absolute; top: 24px; right: 24px; font-size: 2rem; background: transparent; border: none; cursor: pointer; z-index: 2001; }
        .fw-vm-img { flex: 1; border-right: 4px solid #000; display: flex; align-items: center; justify-content: center; font-size: 15vw; background: #fff; }
        .fw-vm-info { flex: 1; padding: 64px; display: flex; flex-direction: column; justify-content: center; }
        .fw-vm-ad { font-size: 4rem; font-weight: 700; line-height: 1; text-transform: uppercase; margin-bottom: 24px; }
        .fw-vm-pri { font-size: 2.5rem; font-weight: 500; margin-bottom: 64px; }
        .fw-size-tit { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; }
        .fw-sizes { display: flex; gap: 16px; margin-bottom: 48px; }
        .fw-size-btn { border: 2px solid #000; background: transparent; padding: 16px 24px; font-size: 1.25rem; font-weight: 700; cursor: pointer; font-family: inherit; }
        .fw-size-btn.active { background: #000; color: #fff; box-shadow: -4px 4px 0 #000; transform: translate(4px, -4px); }
        .fw-add-btn { background: #000; color: #fff; border: 2px solid #000; padding: 24px; font-size: 1.5rem; font-weight: 700; font-family: inherit; text-transform: uppercase; cursor: pointer; transition: 0.2s; }
        .fw-add-btn:hover { background: #fff; color: #000; }

        /* CART SLIDER */
        .fw-cart-ov { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 3000; opacity: 0; pointer-events: none; transition: 0.4s; }
        .fw-cart-ov.open { opacity: 1; pointer-events: all; }
        .fw-cart { position: fixed; top: 0; right: 0; width: 500px; max-width: 100vw; height: 100vh; background: #fff; border-left: 4px solid #000; z-index: 3001; transform: translateX(100%); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; }
        .fw-cart.open { transform: translateX(0); }
        .fw-c-head { padding: 32px; border-bottom: 4px solid #000; display: flex; justify-content: space-between; align-items: center; }
        .fw-c-head h2 { font-size: 2.5rem; font-weight: 700; text-transform: uppercase; }
        .fw-c-list { flex: 1; overflow-y: auto; }
        .fw-c-item { display: flex; padding: 24px; border-bottom: 2px solid #000; justify-content: space-between; align-items: center; }
        .fw-c-item h4 { font-size: 1.25rem; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
        .fw-c-item p { font-weight: 500; font-size: 1rem; margin-bottom: 8px; }
        .fw-c-rem { color: #f00; font-weight: 700; text-decoration: underline; cursor: pointer; font-size: 0.9rem; }
        .fw-c-tot { padding: 32px; border-top: 4px solid #000; display: flex; justify-content: space-between; font-size: 2rem; font-weight: 700; }
        .fw-c-ck { width: 100%; border: none; background: #000; color: #fff; padding: 24px; font-size: 1.5rem; font-weight: 700; font-family: inherit; text-transform: uppercase; cursor: pointer; }
        .fw-c-ck:hover { background: #fff; color: #000; border-top: 4px solid #000; }

        .fw-toast { position: fixed; bottom: 40px; left: 40px; background: #000; color: #fff; padding: 24px; border: 4px solid #000; font-size: 1.25rem; font-weight: 700; text-transform: uppercase; z-index: 4000; opacity: 0; transform: translateY(40px); transition: 0.4s; box-shadow: 8px 8px 0 rgba(0,0,0,0.2); pointer-events: none; }
        .fw-toast.show { opacity: 1; transform: translateY(0); }

        @media(max-width: 900px) {
          .fw-hero, .fw-v-modal { grid-template-columns: 1fr; display: flex; flex-direction: column; }
          .fw-h-txt, .fw-vm-info { border-right: none; padding: 24px; }
          .fw-h-img { height: 400px; border-top: 4px solid #000; }
          .fw-vm-img { height: 40vh; border-right: none; border-bottom: 4px solid #000; }
          .fw-foot { grid-template-columns: 1fr; }
          .fw-f-tit { font-size: 3.5rem; }
        }
      `}),(0,b.jsxs)("div",{className:"fw-d",children:[(0,b.jsx)("div",{className:"fw-marq",children:(0,b.jsx)("div",{className:"fw-m-track",children:[...Array(6)].map((a,c)=>(0,b.jsx)("span",{className:"fw-m-item",children:"FREE WORLDWIDE SHIPPING ON ORDERS OVER ₺10.000 // AWWWARDS STYLE DEMO // POWERED BY KEPENK.AI // "},c))})}),(0,b.jsxs)("header",{className:"fw-head",children:[(0,b.jsxs)("div",{className:"fw-logo",children:["RAW",(0,b.jsx)("span",{children:"STUDIOS"})]}),(0,b.jsxs)("div",{className:"fw-cart-t",onClick:()=>l(!0),children:["CART ",(0,b.jsx)("span",{children:q})]})]}),(0,b.jsxs)("section",{className:"fw-hero",children:[(0,b.jsxs)("div",{className:"fw-h-txt",children:[(0,b.jsx)(d,{children:(0,b.jsxs)("h1",{children:["Redefining",(0,b.jsx)("br",{}),"Basics."]})}),(0,b.jsx)(d,{delay:150,children:(0,b.jsx)("p",{children:"SS26 COLLECTION. UNCOMPROMISING QUALITY FOR THE ARCHITECTURAL WARDROBE."})}),(0,b.jsx)(d,{delay:300,children:(0,b.jsx)("button",{className:"fw-btn fw-h-btn",onClick:()=>document.getElementById("shop")?.scrollIntoView({behavior:"smooth"}),children:"SHOP COLLECTION"})})]}),(0,b.jsx)("div",{className:"fw-h-img",children:(0,b.jsx)("span",{children:"🪨"})})]}),(0,b.jsxs)("section",{id:"shop",children:[(0,b.jsx)("div",{className:"fw-sec-tit",children:"Collection 001"}),(0,b.jsx)("div",{className:"fw-grid",children:e.map((a,c)=>(0,b.jsx)(d,{delay:100*c,className:"fw-card",children:(0,b.jsxs)("div",{onClick:()=>{h(a),j(a.beden[0])},children:[(0,b.jsx)("div",{className:"fw-c-img",children:a.resim}),(0,b.jsxs)("div",{className:"fw-c-info",children:[(0,b.jsx)("div",{className:"fw-c-ad",children:a.ad}),(0,b.jsxs)("div",{className:"fw-c-pri",children:["₺",a.fiyat.toLocaleString()]})]})]})},a.id))})]}),(0,b.jsxs)("footer",{className:"fw-foot",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"fw-f-tit",children:"JOIN THE RAW ARCHIVE"}),(0,b.jsxs)("div",{className:"fw-newsletter",children:[(0,b.jsx)("input",{type:"email",placeholder:"EMAIL ADDRESS"}),(0,b.jsx)("button",{children:"SUBSCRIBE"})]})]}),(0,b.jsxs)("div",{className:"fw-f-links",children:[(0,b.jsx)("a",{href:"#",children:"Shop"}),(0,b.jsx)("a",{href:"#",children:"Instagram"}),(0,b.jsx)("a",{href:"#",children:"About"}),(0,b.jsx)("a",{href:"#",children:"Twitter"}),(0,b.jsx)("a",{href:"#",children:"Journal"}),(0,b.jsx)("a",{href:"#",children:"Spotify"}),(0,b.jsx)("a",{href:"#",children:"Contact"}),(0,b.jsx)("a",{href:"#",children:"FAQ"})]})]}),(0,b.jsxs)("div",{className:`fw-v-modal${g?" open":""}`,children:[(0,b.jsx)("button",{className:"fw-vm-close",onClick:()=>h(null),children:"✕"}),(0,b.jsx)("div",{className:"fw-vm-img",children:g?.resim}),(0,b.jsxs)("div",{className:"fw-vm-info",children:[(0,b.jsx)("h2",{className:"fw-vm-ad",children:g?.ad}),(0,b.jsxs)("div",{className:"fw-vm-pri",children:["₺",g?.fiyat.toLocaleString()]}),(0,b.jsx)("div",{className:"fw-size-tit",children:"SELECT SIZE"}),(0,b.jsx)("div",{className:"fw-sizes",children:g?.beden.map(a=>(0,b.jsx)("button",{className:`fw-size-btn ${i===a?"active":""}`,onClick:()=>j(a),children:a},a))}),(0,b.jsx)("button",{className:"fw-add-btn",onClick:()=>{g&&(f(a=>a.find(a=>a.id===g.id&&a.beden===i)?a.map(a=>a.id===g.id&&a.beden===i?{...a,qty:a.qty+1}:a):[...a,{id:g.id,ad:g.ad,fiyat:g.fiyat,beden:i,qty:1}]),h(null),l(!0),o(`${g.ad} (${i}) ADDED TO CART`))},children:"ADD TO CART"})]})]}),(0,b.jsx)("div",{className:`fw-cart-ov${k?" open":""}`,onClick:()=>l(!1)}),(0,b.jsxs)("div",{className:`fw-cart${k?" open":""}`,children:[(0,b.jsxs)("div",{className:"fw-c-head",children:[(0,b.jsx)("h2",{children:"SHOPPING CART"}),(0,b.jsx)("button",{className:"fw-btn",style:{padding:"8px 16px"},onClick:()=>l(!1),children:"✕"})]}),(0,b.jsx)("div",{className:"fw-c-list",children:0===a.length?(0,b.jsx)("p",{style:{padding:"40px 32px",fontSize:"1.25rem",fontWeight:500},children:"YOUR CART IS EMPTY."}):a.map((a,c)=>(0,b.jsxs)("div",{className:"fw-c-item",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("h4",{children:a.ad}),(0,b.jsxs)("p",{children:["SIZE: ",a.beden," // QTY: ",a.qty]}),(0,b.jsx)("span",{className:"fw-c-rem",onClick:()=>{let b,c;return b=a.id,c=a.beden,f(a=>a.filter(a=>a.id!==b||a.beden!==c))},children:"REMOVE"})]}),(0,b.jsxs)("div",{style:{fontSize:"1.25rem",fontWeight:700},children:["₺",(a.fiyat*a.qty).toLocaleString()]})]},c))}),(0,b.jsxs)("div",{className:"fw-c-tot",children:[(0,b.jsx)("span",{children:"TOTAL"}),(0,b.jsxs)("span",{children:["₺",p.toLocaleString()]})]}),(0,b.jsx)("button",{className:"fw-c-ck",onClick:()=>{a.length>0&&(o("PROCEEDING TO CHECKOUT"),f([]),l(!1))},children:"CHECKOUT VIA KEPENK.AI"})]}),(0,b.jsx)("div",{className:`fw-toast${m?" show":""}`,children:m})]})]})}a.s(["default",()=>f])}];

//# sourceMappingURL=XinXia_apps_web_src_app_demolar_eticaret_page_tsx_79b05ee2._.js.map