module.exports=[850336,a=>{"use strict";var b=a.i(888337),c=a.i(702015);function d({children:a,delay:d=0,className:e="",direction:f}){let{ref:g,visible:h}=function(){let a=(0,c.useRef)(null),[b,d]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{let b=a.current;if(!b)return;let c=new IntersectionObserver(([a])=>{a.isIntersecting&&(d(!0),c.unobserve(b))},{threshold:.15});return c.observe(b),()=>c.disconnect()},[]),{ref:a,visible:b}}();return(0,b.jsx)("div",{ref:g,className:e,style:{opacity:+!!h,transform:h?"none":"translateY(30px) scale(0.98)",transition:`all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) ${d}ms`},children:a})}let e=[{id:1,ad:"Siyez Unlu Ekşi Maya",desc:"12 yıllık özel mayamızdan, taş fırında.",fiyat:140,img:"🍞",etiket:"Çok Satan",bg:"#fef3c7"},{id:2,ad:"Datça Badem Ezmesi",desc:"Şekersiz, sadece Datça bademi ve bal.",fiyat:320,img:"🍯",etiket:null,bg:"#ffedd5"},{id:3,ad:"Organik Köy Yumurtası",desc:"Serbest gezen tavuklarımızdan, 15li paket.",fiyat:95,img:"🥚",etiket:"Taze Taze",bg:"#f3f4f6"},{id:4,ad:"Sızma Zeytinyağı 1L",desc:"Edremit körfezinden, soğuk sıkım erken hasat.",fiyat:650,img:"🫒",etiket:"Ödüllü",bg:"#ecfccb"},{id:5,ad:"Aydın Dağ İnciri",desc:"Güneşte kurutulmuş, iri boy ve doğal.",fiyat:280,img:"🌿",etiket:null,bg:"#fee2e2"},{id:6,ad:"Toprak Çömlek Yoğurt",desc:"Jersey inek sütüyle, geleneksel maya.",fiyat:110,img:"🥛",etiket:null,bg:"#e0f2fe"}];function f(){let[a,f]=(0,c.useState)([]),[g,h]=(0,c.useState)(!1),[i,j]=(0,c.useState)(""),k=a=>{j(a),setTimeout(()=>j(""),3e3)},l=a.reduce((a,b)=>a+b.fiyat*b.qty,0),m=a.reduce((a,b)=>a+b.qty,0);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Quicksand:wght@400;500;600;700&display=swap');
        .org-d * { margin:0; padding:0; box-sizing:border-box; }
        .org-d { font-family: 'Quicksand', sans-serif; background: #fdfbf7; color: #4a3b32; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .org-serif { font-family: 'Fraunces', serif; }
        .org-d a { text-decoration: none; color: inherit; }
        .org-btn { cursor: pointer; border: none; font-family: inherit; font-weight: 700; transition: 0.3s; outline: none; }
        
        /* BLOBS & SHAPES */
        .org-blob-1 { position: absolute; top: -10vw; right: -10vw; width: 50vw; height: 50vw; background: #e8f3e5; border-radius: 43% 57% 55% 45% / 37% 50% 50% 63%; z-index: 0; filter: blur(40px); animation: morph 12s infinite alternate ease-in-out; }
        .org-blob-2 { position: absolute; bottom: 10vw; left: -15vw; width: 60vw; height: 40vw; background: #fef0db; border-radius: 65% 35% 37% 63% / 54% 43% 57% 46%; z-index: 0; filter: blur(60px); animation: morph 15s infinite alternate-reverse ease-in-out; }
        @keyframes morph { 0% { border-radius: 43% 57% 55% 45% / 37% 50% 50% 63%; transform: scale(1); } 50% { border-radius: 65% 35% 37% 63% / 54% 43% 57% 46%; transform: scale(1.05); } 100% { border-radius: 35% 65% 46% 54% / 46% 54% 46% 54%; transform: scale(0.95) rotate(10deg); } }

        /* HEADER */
        .org-nav { position: relative; z-index: 100; padding: 24px 5%; display: flex; justify-content: space-between; align-items: center; }
        .org-logo { font-size: 2rem; font-weight: 700; color: #37533c; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px; }
        .org-logo-icon { background: #8fbc8f; width: 40px; height: 40px; border-radius: 50% 50% 50% 50% / 60% 40% 60% 40%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.2rem; }
        .org-menu { display: flex; gap: 40px; }
        .org-menu a { font-size: 1.1rem; font-weight: 600; color: #6b5c51; transition: 0.2s; }
        .org-menu a:hover { color: #d2691e; }
        .org-cart-btn { background: #fff; border: 2px solid #8fbc8f; color: #37533c; padding: 10px 24px; border-radius: 99px; font-size: 1.1rem; box-shadow: 0 4px 12px rgba(143,188,143,0.15); }
        .org-cart-btn:hover { background: #8fbc8f; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 16px rgba(143,188,143,0.25); }

        /* HERO */
        .org-hero { position: relative; min-height: 85vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 5%; z-index: 2; }
        .org-pill { background: #fff; border: 1px solid #e2dcd3; color: #d2691e; padding: 8px 20px; border-radius: 99px; font-size: 1rem; font-weight: 700; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
        .org-hero h1 { font-size: clamp(3.5rem, 8vw, 6rem); line-height: 1.1; color: #2d452b; margin-bottom: 32px; max-width: 900px; text-shadow: 0 4px 24px rgba(253,251,247,0.8); }
        .org-hero p { font-size: clamp(1.2rem, 3vw, 1.5rem); color: #6b5c51; max-width: 600px; margin-bottom: 48px; line-height: 1.6; font-weight: 500; }
        .org-cta { background: #d2691e; color: #fff; font-size: 1.2rem; padding: 18px 40px; border-radius: 50px 50px 50px 50px / 60% 40% 60% 40%; box-shadow: 0 10px 24px rgba(210,105,30,0.3); }
        .org-cta:hover { background: #b85718; transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 32px rgba(210,105,30,0.4); }

        /* STORY SECTION */
        .org-story { padding: 120px 5%; background: #e8f3e5; position: relative; z-index: 2; border-radius: 60px 60px 0 0; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .org-s-img { background: #8fbc8f; border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 10rem; position: relative; }
        .org-s-img::after { content: '🚜'; position: absolute; bottom: 20px; right: 20px; font-size: 5rem; background: #fff; border-radius: 50%; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .org-s-txt h2 { font-size: 3.5rem; color: #2d452b; margin-bottom: 24px; line-height: 1.1; }
        .org-s-txt p { font-size: 1.2rem; color: #4a3b32; line-height: 1.8; margin-bottom: 24px; }

        /* PRODUCTS */
        .org-shop { padding: 120px 5%; background: #fdfbf7; position: relative; z-index: 2; }
        .org-sec-head { text-align: center; margin-bottom: 80px; }
        .org-sec-head h2 { font-size: 3.5rem; color: #2d452b; margin-bottom: 16px; }
        .org-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; max-width: 1300px; margin: 0 auto; }
        .org-card { background: #fff; padding: 16px; border-radius: 40px; box-shadow: 0 10px 30px rgba(74,59,50,0.05); transition: 0.4s cubic-bezier(0.16,1,0.3,1); position: relative; text-align: center; }
        .org-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(74,59,50,0.1); }
        .org-c-img-wrap { background: #fef3c7; height: 260px; border-radius: 32px; display: flex; align-items: center; justify-content: center; font-size: 6rem; margin-bottom: 24px; transition: 0.4s; }
        .org-card:hover .org-c-img-wrap { transform: scale(0.95); border-radius: 40px; }
        .org-c-tag { position: absolute; top: 32px; left: 32px; background: #fff; color: #d2691e; padding: 6px 16px; border-radius: 99px; font-size: 0.9rem; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.05); z-index: 2; }
        .org-c-tit { font-size: 1.5rem; color: #2d452b; margin-bottom: 8px; }
        .org-c-desc { font-size: 1.05rem; color: #8e8071; margin-bottom: 24px; line-height: 1.4; padding: 0 16px; }
        .org-c-pri { font-size: 1.8rem; font-weight: 700; color: #d2691e; }
        .org-c-bot { display: flex; justify-content: space-between; align-items: center; padding: 0 16px 16px; }
        .org-add { background: #fdfbf7; border: 2px solid #e2dcd3; color: #4a3b32; width: 48px; height: 48px; border-radius: 50%; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; }
        .org-add:hover { background: #8fbc8f; border-color: #8fbc8f; color: #fff; transform: rotate(90deg); }

        /* FOOTER */
        .org-foot { background: #2d452b; color: #e8f3e5; padding: 80px 5% 40px; border-radius: 60px 60px 0 0; }
        .org-f-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; max-width: 1300px; margin: 0 auto 60px; }
        .org-f-logo { font-size: 2.5rem; font-weight: 700; margin-bottom: 24px; color: #fff; }
        .org-f-txt { font-size: 1.1rem; line-height: 1.6; opacity: 0.8; max-width: 300px; }
        .org-f-col h4 { font-size: 1.2rem; font-family: 'Fraunces', serif; margin-bottom: 24px; color: #8fbc8f; letter-spacing: 0.05em; }
        .org-f-col ul { list-style: none; }
        .org-f-col li { margin-bottom: 16px; }
        .org-f-col a { transition: 0.2s; font-size: 1.1rem; }
        .org-f-col a:hover { color: #fff; padding-left: 8px; }
        .org-f-bot { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; text-align: center; font-size: 1rem; opacity: 0.6; }

        /* CART FLOATING SIDEBAR (BLOBBY) */
        .org-cart-ov { position: fixed; inset: 0; background: rgba(74,59,50,0.4); backdrop-filter: blur(4px); z-index: 2000; opacity: 0; pointer-events: none; transition: 0.4s; }
        .org-cart-ov.open { opacity: 1; pointer-events: all; }
        .org-cart { position: fixed; top: 16px; right: -420px; width: 400px; max-width: calc(100vw - 32px); height: calc(100vh - 32px); background: #fdfbf7; z-index: 2001; transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; flex-direction: column; border-radius: 40px; box-shadow: -10px 10px 40px rgba(0,0,0,0.1); overflow: hidden; }
        .org-cart.open { right: 16px; }
        .org-c-head { padding: 32px; background: #e8f3e5; display: flex; justify-content: space-between; align-items: center; border-radius: 40px 40px 0 0; }
        .org-c-head h3 { font-size: 2rem; color: #2d452b; }
        .org-c-close { background: #fff; width: 40px; height: 40px; border-radius: 50%; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; color: #4a3b32; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .org-c-close:hover { background: #fef0db; color: #d2691e; }
        .org-c-items { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
        .org-c-item { display: flex; gap: 16px; align-items: center; background: #fff; padding: 16px; border-radius: 24px; box-shadow: 0 4px 12px rgba(74,59,50,0.05); }
        .org-c-i-img { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
        .org-c-i-info { flex: 1; }
        .org-c-i-info h4 { font-size: 1.1rem; color: #2d452b; margin-bottom: 4px; }
        .org-c-i-info p { font-size: 0.95rem; color: #8e8071; }
        .org-c-i-pri { font-size: 1.1rem; font-weight: 700; color: #d2691e; }
        .org-c-del { font-size: 1.2rem; color: #ccc; cursor: pointer; padding: 8px; }
        .org-c-del:hover { color: #ef4444; background: #fee2e2; border-radius: 50%; }
        .org-c-foot { padding: 32px; background: #fff; border-top: 2px dashed #e2dcd3; border-radius: 0 0 40px 40px; }
        .org-c-tot { display: flex; justify-content: space-between; font-size: 1.5rem; font-family: 'Fraunces', serif; color: #2d452b; margin-bottom: 24px; }
        .org-c-btn { width: 100%; background: #8fbc8f; color: #fff; font-size: 1.2rem; padding: 20px; border-radius: 99px; box-shadow: 0 10px 24px rgba(143,188,143,0.3); }
        .org-c-btn:hover { background: #2d452b; box-shadow: 0 10px 24px rgba(45,69,43,0.3); transform: translateY(-2px); }

        .org-toast { position: fixed; top: 32px; left: 50%; transform: translate(-50%, -100px); background: #fef0db; color: #d2691e; font-weight: 700; font-size: 1.1rem; padding: 16px 32px; border-radius: 99px; box-shadow: 0 10px 30px rgba(210,105,30,0.15); z-index: 3000; transition: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); border: 2px solid #fae4c3; }
        .org-toast.show { transform: translate(-50%, 0); }

        @media(max-width: 900px) {
          .org-story { grid-template-columns: 1fr; border-radius: 40px 40px 0 0; text-align: center; gap: 40px; }
          .org-hero h1, .org-s-txt h2, .org-sec-head h2 { font-size: 3rem; }
          .org-f-grid { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .org-f-txt { margin: 0 auto; }
          .org-menu { display: none; }
          .org-logo span { display: none; }
        }
      `}),(0,b.jsxs)("div",{className:"org-d",children:[(0,b.jsx)("div",{className:"org-blob-1"}),(0,b.jsx)("div",{className:"org-blob-2"}),(0,b.jsxs)("nav",{className:"org-nav",children:[(0,b.jsxs)("div",{className:"org-logo",children:[(0,b.jsx)("div",{className:"org-logo-icon",children:"🌿"}),(0,b.jsx)("span",{className:"org-serif",children:"Bizim Çiftlik"})]}),(0,b.jsxs)("div",{className:"org-menu",children:[(0,b.jsx)("a",{href:"#",children:"Taze Ürünler"}),(0,b.jsx)("a",{href:"#",children:"Kilerimiz"}),(0,b.jsx)("a",{href:"#",children:"Hikayemiz"})]}),(0,b.jsxs)("button",{className:"org-btn org-cart-btn",onClick:()=>h(!0),children:["Sepetim 🧺 ",(0,b.jsx)("span",{style:{background:"#fef0db",color:"#d2691e",padding:"2px 8px",borderRadius:"12px",marginLeft:"6px"},children:m})]})]}),(0,b.jsxs)("section",{className:"org-hero",children:[(0,b.jsx)(d,{children:(0,b.jsx)("div",{className:"org-pill",children:"Doğadan Kapınıza • Ücretsiz Teslimat"})}),(0,b.jsx)(d,{delay:100,children:(0,b.jsxs)("h1",{className:"org-serif",children:["Toprağın şifası,",(0,b.jsx)("br",{}),"sofranızın neşesi."]})}),(0,b.jsx)(d,{delay:200,children:(0,b.jsx)("p",{children:"Kimyasal ilaç kullanmadan, ata tohumlarıyla yetiştirdiğimiz ürünlerimizi en taze haliyle, doğrudan tarladan kapınıza getiriyoruz."})}),(0,b.jsx)(d,{delay:300,children:(0,b.jsx)("button",{className:"org-btn org-cta",onClick:()=>document.getElementById("dukkan")?.scrollIntoView({behavior:"smooth"}),children:"Dükkanı Gez 🛒"})})]}),(0,b.jsxs)("section",{className:"org-story",children:[(0,b.jsx)(d,{direction:"left",className:"org-s-img",children:"🌾"}),(0,b.jsxs)(d,{direction:"right",className:"org-s-txt",children:[(0,b.jsx)("h2",{className:"org-serif",children:"Dalından koptuğu gibi taptaze."}),(0,b.jsx)("p",{children:"Her sabah gün doğumuyla beraber tarlamıza iniyor, sadece o gün olgunlaşan sebze ve meyveleri topluyoruz. Hiçbir ürünü depolamıyor, doğrudan size yolluyoruz."}),(0,b.jsx)("p",{children:"Toptancı yok, komisyoncu yok, beklemek yok. Sadece gerçek, lezzetli ve besleyici gıda var."})]})]}),(0,b.jsxs)("section",{className:"org-shop",id:"dukkan",children:[(0,b.jsx)(d,{children:(0,b.jsxs)("div",{className:"org-sec-head",children:[(0,b.jsx)("h2",{className:"org-serif",children:"Bu Haftanın Tazeleri"}),(0,b.jsx)("p",{style:{fontSize:"1.2rem",color:"#6b5c51"},children:"Sınırlı hasat, gerçek lezzet."})]})}),(0,b.jsx)("div",{className:"org-grid",children:e.map((a,c)=>(0,b.jsxs)(d,{delay:100*c,className:"org-card",children:[a.etiket&&(0,b.jsx)("div",{className:"org-c-tag",children:a.etiket}),(0,b.jsx)("div",{className:"org-c-img-wrap",style:{background:a.bg},children:a.img}),(0,b.jsx)("h3",{className:"org-c-tit org-serif",children:a.ad}),(0,b.jsx)("p",{className:"org-c-desc",children:a.desc}),(0,b.jsxs)("div",{className:"org-c-bot",children:[(0,b.jsxs)("div",{className:"org-c-pri",children:[a.fiyat," ₺"]}),(0,b.jsx)("button",{className:"org-btn org-add",onClick:()=>{f(b=>b.find(b=>b.id===a.id)?b.map(b=>b.id===a.id?{...b,qty:b.qty+1}:b):[...b,{id:a.id,ad:a.ad,fiyat:a.fiyat,img:a.img,bg:a.bg,qty:1}]),k(`Sepete usulca bırakıldı: ${a.ad} 🌱`),h(!0)},children:"+"})]})]},a.id))})]}),(0,b.jsxs)("footer",{className:"org-foot",children:[(0,b.jsxs)("div",{className:"org-f-grid",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"org-f-logo org-serif",children:"🌿 Bizim Çiftlik"}),(0,b.jsx)("p",{className:"org-f-txt",children:"Gelecek nesillere bereketli topraklar bırakmak için onarıcı tarım yapıyoruz."})]}),(0,b.jsxs)("div",{className:"org-f-col",children:[(0,b.jsx)("h4",{children:"Çiftlik"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"Hasat Takvimi"})}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"Tarlamızı Ziyaret Et"})}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"Ata Tohumu Projesi"})}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"Blog"})})]})]}),(0,b.jsxs)("div",{className:"org-f-col",children:[(0,b.jsx)("h4",{children:"Müşteri"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"Teslimat Bölgeleri"})}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"Sık Sorulanlar"})}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"İade Şartları"})}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"İletişim"})})]})]}),(0,b.jsxs)("div",{className:"org-f-col",children:[(0,b.jsx)("h4",{children:"Üyelikler"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"Haftalık Kutu Aboneliği"})}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"İndirim Kulübü"})}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{href:"#",children:"Kurumsal Hediye"})})]})]})]}),(0,b.jsx)("div",{className:"org-f-bot",children:(0,b.jsx)("p",{children:"Demo Sistemi • kepenk.ai Organik Tarım Modülü © 2026"})})]}),(0,b.jsx)("div",{className:`org-cart-ov${g?" open":""}`,onClick:()=>h(!1)}),(0,b.jsxs)("div",{className:`org-cart${g?" open":""}`,children:[(0,b.jsxs)("div",{className:"org-c-head",children:[(0,b.jsx)("h3",{className:"org-serif",children:"Sepetiniz"}),(0,b.jsx)("button",{className:"org-btn org-c-close",onClick:()=>h(!1),children:"✕"})]}),(0,b.jsx)("div",{className:"org-c-items",children:0===a.length?(0,b.jsx)("div",{style:{textAlign:"center",marginTop:"40px",color:"#8e8071",fontSize:"1.2rem"},children:"Sepetiniz maalesef boş. 🍂"}):a.map((a,c)=>(0,b.jsxs)("div",{className:"org-c-item",children:[(0,b.jsx)("div",{className:"org-c-i-img",style:{background:a.bg},children:a.img}),(0,b.jsxs)("div",{className:"org-c-i-info",children:[(0,b.jsx)("h4",{className:"org-serif",children:a.ad}),(0,b.jsxs)("p",{children:[a.qty," Adet"]})]}),(0,b.jsxs)("div",{className:"org-c-i-pri",children:[a.fiyat*a.qty," ₺"]}),(0,b.jsx)("div",{className:"org-c-del",onClick:()=>{let b;return b=a.id,f(a=>a.filter(a=>a.id!==b))},children:"✕"})]},c))}),(0,b.jsxs)("div",{className:"org-c-foot",children:[(0,b.jsxs)("div",{className:"org-c-tot",children:[(0,b.jsx)("span",{children:"Toplam"}),(0,b.jsxs)("span",{children:[l," ₺"]})]}),(0,b.jsx)("button",{className:"org-btn org-c-btn",onClick:()=>{a.length>0&&(k("🌿 Siparişiniz yola çıkmaya hazırlanıyor!"),f([]),h(!1))},children:"Siparişi Tamamla"})]})]}),(0,b.jsx)("div",{className:`org-toast${i?" show":""}`,children:i})]})]})}a.s(["default",()=>f])}];

//# sourceMappingURL=XinXia_apps_web_src_app_demolar_organik_page_tsx_3d3abee9._.js.map