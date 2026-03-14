module.exports=[527417,a=>{"use strict";var b=a.i(74623);let c=["TEMEL","STANDART","BUYUME","PREMIUM","PREMIUMPLUS"];function d(a,b){let d=f.find(b=>b.id===a);return!!d&&c.indexOf(b)>=c.indexOf(d.minPaket)}function e(a,c){let e=(0,b.sektorBul)(a);return e?e.moduller.map(a=>f.find(b=>b.id===a)).filter(a=>!!a&&d(a.id,c)):[]}let f=[{id:"iletisim-formu",ad:"İletişim Formu",aciklama:"Ziyaretçi mesaj gönderebilir, WhatsApp'a iletilir",minPaket:"TEMEL",htmlBlok:"İletişim formu bölümü — ad, telefon, mesaj, WhatsApp'a gönder butonu",geminiTalimat:"Site sonuna iletişim formu ekle. Form alanları: Ad Soyad, Telefon, Mesaj. Gönder butonu wa.me linki açsın.",htmlSablon:`<section id="iletisim" style="padding:100px 20px; background:var(--renk-kart); position:relative; overflow:hidden;">
  <div style="position:absolute; top:0; right:0; width:50%; height:100%; background:radial-gradient(circle at right, rgba(var(--renk-vurgu-rgb, 255,255,255), 0.05) 0%, transparent 60%); pointer-events:none;"></div>
  <div style="max-width:600px; margin:0 auto; position:relative; z-index:2;">
    <div style="text-align:center; margin-bottom:40px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 2.8rem); margin-bottom:12px;">Bize Ulaşın</h2>
      <p style="color:var(--renk-alt); font-size:1.1rem;">Sorularınız veya talepleriniz i\xe7in formu doldurun, size hemen d\xf6n\xfcş yapalım.</p>
    </div>
    <div style="background:var(--renk-arkaplan); padding:40px; border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.05); border:1px solid rgba(255,255,255,0.03);">
      <div style="display:grid; gap:20px;">
        <div>
          <input type="text" id="if-ad" placeholder="Adınız Soyadınız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s, box-shadow 0.3s; font-weight:600;" onfocus="this.style.borderColor='var(--renk-vurgu)';this.style.boxShadow='0 0 0 4px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1)';" onblur="this.style.borderColor='transparent';this.style.boxShadow='none';" />
        </div>
        <div>
          <input type="tel" id="if-tel" placeholder="Telefon Numaranız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s, box-shadow 0.3s; font-weight:600;" onfocus="this.style.borderColor='var(--renk-vurgu)';this.style.boxShadow='0 0 0 4px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1)';" onblur="this.style.borderColor='transparent';this.style.boxShadow='none';" />
        </div>
        <div>
          <textarea id="if-mesaj" placeholder="Mesajınız..." rows="4" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s, box-shadow 0.3s; font-weight:600; resize:vertical;" onfocus="this.style.borderColor='var(--renk-vurgu)';this.style.boxShadow='0 0 0 4px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1)';" onblur="this.style.borderColor='transparent';this.style.boxShadow='none';"></textarea>
        </div>
        <button onclick="ifGonder()" style="width:100%; background:var(--renk-metin); color:var(--renk-arkaplan); border:none; padding:20px; border-radius:16px; font-weight:800; font-size:1.15rem; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s; box-shadow:0 10px 20px rgba(0,0,0,0.1);" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 15px 30px rgba(0,0,0,0.2)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 10px 20px rgba(0,0,0,0.1)';">
          📩 Mesajı G\xf6nder
        </button>
      </div>
    </div>
  </div>
</section>
<script>
  function ifGonder(){
    var a=document.getElementById('if-ad').value;
    var t=document.getElementById('if-tel').value;
    var m=document.getElementById('if-mesaj').value;
    if(!a||!t||!m){alert('L\xfctfen t\xfcm alanları doldurun.');return;}
    var txt = encodeURIComponent('İletişim Formu:
Ad: '+a+'
Tel: '+t+'
Mesaj: '+m);
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+txt, '_blank');
  }
</script>`},{id:"acil-buton",ad:"7/24 Acil Buton",aciklama:"Sayfanın sağ alt köşesinde sabit acil çağrı butonu",minPaket:"TEMEL",htmlBlok:"Sabit pozisyonlu, animasyonlu acil çağrı FAB butonu",geminiTalimat:'Sayfanın sağ alt köşesine fixed position, pulse animasyonlu "🚨 Acil" butonu ekle. Tıklandığında tel: numarasını arasın.',htmlSablon:`<a href="tel:TELEFON" id="acil-buton-fab" style="position:fixed; bottom:30px; left:30px; width:64px; height:64px; border-radius:32px; background:#ea004b; display:flex; align-items:center; justify-content:center; text-decoration:none; box-shadow:0 10px 30px rgba(234,0,75,0.4); z-index:9999; animation:pulse-red 2s infinite; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.1)';" onmouseout="this.style.transform='scale(1)';">
  <span style="font-size:32px;">🚨</span>
</a>
<style>
@keyframes pulse-red {
  0% { box-shadow:0 0 0 0 rgba(234,0,75,0.6); }
  70% { box-shadow:0 0 0 20px rgba(234,0,75,0); }
  100% { box-shadow:0 0 0 0 rgba(234,0,75,0); }
}
</style>`},{id:"galeri",ad:"Fotoğraf Galerisi",aciklama:"Tamamlanan işlerin fotoğrafları (önce/sonra)",minPaket:"STANDART",htmlBlok:"Responsive masonry galeri bölümü",geminiTalimat:"Galeri bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="galeri" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:1200px; margin:0 auto; text-align:center;">
    <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">Fotoğraf Galerisi</h2>
    <p style="color:var(--renk-alt); font-size:1.15rem; margin-bottom:50px;">\xd6zenle tamamladığımız \xe7alışmalardan bazı kareler.</p>
    <div style="column-count:3; column-gap:20px; padding-bottom:20px;">
      <!-- JavaScript will generate images here. For demo, we insert 6 images via script -->
    </div>
  </div>
  <style>
    @media (max-width: 900px) { #galeri div > div { column-count: 2; } }
    @media (max-width: 600px) { #galeri div > div { column-count: 1; } }
  </style>
</section>
<script>
  setTimeout(function(){
    var g=document.querySelector('#galeri div > div');
    if(!g) return;
    var imgs=['https://images.unsplash.com/photo-1542044896530-05d3c054e223?w=500&q=80', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80', 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&q=80', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80', 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=500&q=80'];
    g.innerHTML=imgs.map(function(src){
      return '<div style="margin-bottom:20px; border-radius:16px; overflow:hidden; transform:translateY(0); transition:transform 0.3s, box-shadow 0.3s; cursor:pointer;" onmouseover="this.style.transform=\\'translateY(-5px)\\';this.style.boxShadow=\\'0 15px 30px rgba(0,0,0,0.15)\\';" onmouseout="this.style.transform=\\'none\\';this.style.boxShadow=\\'none\\';"><img src="'+src+'" style="width:100%; display:block; object-fit:cover;" alt="Galeri G\xf6rseli"/></div>';
    }).join('');
  }, 100);
</script>`},{id:"hizmet-fiyat-listesi",ad:"Hizmet & Fiyat Listesi",aciklama:"Şeffaf fiyatlandırma tablosu",minPaket:"STANDART",htmlBlok:"Hizmet ve fiyat kartları grid",geminiTalimat:"Hizmet/Fiyat listesi bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="fiyatlar" style="padding:100px 20px; background:var(--renk-kart);">
  <div style="max-width:1000px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">Hizmetlerimiz ve Fiyatlar</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Şeffaf fiyatlandırma politikamızla s\xfcrpriz maliyetlere yer yok.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:24px;" id="fl-grid">
      <!-- Generated by JS -->
    </div>
  </div>
</section>
<script>
  setTimeout(function(){
    var flG=document.getElementById('fl-grid');
    if(!flG) return;
    var fData=[
      {h:'Standart Bakım/Hizmet', f:'1.500 ₺', a:'Genel kontroller ve standart işlemler dahildir.'},
      {h:'Detaylı Onarım/Hizmet', f:'3.250 ₺', a:'Kapsamlı işlem veya uzun s\xfcreli projeleri kapsar.'},
      {h:'Premium Paket', f:'Teklif Alın', a:'Size \xf6zel ihtiya\xe7lara g\xf6re projelendirilip fiyatlandırılır.'}
    ];
    flG.innerHTML=fData.map(function(d){
      return '<div style="background:var(--renk-arkaplan); border-radius:24px; padding:32px; border:1px solid rgba(255,255,255,0.05); transition:transform 0.3s; cursor:default; display:flex; flex-direction:column;" onmouseover="this.style.transform=\\'translateY(-5px)\\'" onmouseout="this.style.transform=\\'translateY(0)\\'"><h3 style="color:var(--renk-metin); font-family:var(--font-baslik); font-size:1.4rem; margin:0 0 12px;">'+d.h+'</h3><div style="color:var(--renk-vurgu); font-size:2rem; font-weight:800; margin-bottom:16px;">'+d.f+'</div><p style="color:var(--renk-alt); font-size:1rem; line-height:1.6; margin:0 0 24px; flex:1;">'+d.a+'</p><button style="width:100%; background:var(--renk-kart); color:var(--renk-metin); border:2px solid var(--renk-vurgu); padding:16px; border-radius:12px; font-weight:700; font-size:1rem; cursor:pointer; transition:background 0.3s;" onmouseover="this.style.background=\\'var(--renk-vurgu)\\'; this.style.color=\\'#fff\\';" onmouseout="this.style.background=\\'var(--renk-kart)\\'; this.style.color=\\'var(--renk-metin)\\';" onclick="window.open(\\'https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent('Merhaba, '+d.h+' hakkında bilgi almak istiyorum.')+'\\',\\'_blank\\')">Hemen Bilgi Al</button></div>';
    }).join('');
  }, 100);
</script>`},{id:"ucretsiz-kesif",ad:"Ücretsiz Keşif Talebi",aciklama:"Ücretsiz keşif/muayene talebi formu",minPaket:"STANDART",htmlBlok:"Öne çıkan ücretsiz keşif CTA bölümü",geminiTalimat:'"Ücretsiz Keşif İste" CTA bölümü ekle. Vurgulu tasarım, form: İsim + Telefon + Adres + Tercih tarih.'},{id:"hizmet-bolgeleri",ad:"Hizmet Bölgeleri",aciklama:"Hangi ilçelere hizmet verildiği",minPaket:"STANDART",htmlBlok:"Hizmet bölgeleri etiketi listesi",geminiTalimat:"Hizmet bölgeleri bölümü ekle. Esnafın ilçesi ve çevresindeki 5-8 ilçe etiketi olarak listele."},{id:"randevu",ad:"Online Randevu Sistemi",aciklama:"Müşteri doğrudan siteden randevu alabilir",minPaket:"PREMIUM",htmlBlok:"Randevu formu — tarih, saat, hizmet seçimi",geminiTalimat:'Randevu bölümü için aşağıdaki htmlSablon şablonunu kullan. HIZMET_OPTIONS yerine esnafın sektörüne uygun hizmet seçeneklerini <option> olarak yaz. FORM_INPUT_STYLE: "width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.07);color:var(--renk-metin);font-size:1rem;outline:none". WHATSAPP_NUMARA: esnafın telefonTemiz değeri (5XXXXXXXXX formatında). CSS değişkenleri :root içinde tanımla. KEPENK_API_URL ve ESNAF_ID placeholderlarını doldur.',htmlSablon:`<section id="randevu" class="parallax-bg" style="padding:100px 20px; background-image:url('https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=1600&q=80'); position:relative;">
  <div style="position:absolute; inset:0; background:rgba(0,0,0,0.6); z-index:1;"></div>
  <div style="max-width:760px; margin:0 auto; position:relative; z-index:2; background:rgba(20,20,20,0.7); backdrop-filter:blur(15px); -webkit-backdrop-filter:blur(15px); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:50px; box-shadow:0 30px 60px rgba(0,0,0,0.3);">
    <div style="text-align:center; margin-bottom:40px;">
      <h2 style="font-family:var(--font-baslik); color:#fff; font-size:2.5rem; margin-bottom:12px; line-height:1.2;">Hemen Randevu Alın</h2>
      <p style="color:rgba(255,255,255,0.7); font-size:1.05rem; letter-spacing:0.02em;">Size en uygun zamanı se\xe7in, gerisini bize bırakın.</p>
    </div>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
      <div style="grid-column: 1 / -1;">
        <select id="r-hizmet" style="width:100%; padding:16px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:#fff; font-size:1rem; outline:none; appearance:none; transition:border-color 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='rgba(255,255,255,0.15)'">
          <option value="" style="color:#000">Hangi hizmeti almak istersiniz?</option>
          HIZMET_OPTIONS
        </select>
      </div>
      <div>
        <label style="color:rgba(255,255,255,0.6); font-size:0.8rem; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:8px; margin-left:4px;">Tarih</label>
        <input type="date" id="r-tarih" style="width:100%; padding:16px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:#fff; font-size:1rem; outline:none; transition:border-color 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='rgba(255,255,255,0.15)'" />
      </div>
      <div>
        <label style="color:rgba(255,255,255,0.6); font-size:0.8rem; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:8px; margin-left:4px;">Saat</label>
        <select id="r-saat" style="width:100%; padding:16px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:#fff; font-size:1rem; outline:none; appearance:none; transition:border-color 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='rgba(255,255,255,0.15)'">
          <option value="" style="color:#000">Saat Se\xe7in</option>
          <option style="color:#000">09:00</option><option style="color:#000">09:30</option><option style="color:#000">10:00</option><option style="color:#000">10:30</option>
          <option style="color:#000">11:00</option><option style="color:#000">11:30</option><option style="color:#000">12:00</option><option style="color:#000">12:30</option>
          <option style="color:#000">13:00</option><option style="color:#000">13:30</option><option style="color:#000">14:00</option><option style="color:#000">14:30</option>
          <option style="color:#000">15:00</option><option style="color:#000">15:30</option><option style="color:#000">16:00</option><option style="color:#000">16:30</option>
          <option style="color:#000">17:00</option><option style="color:#000">17:30</option><option style="color:#000">18:00</option>
        </select>
      </div>
      <div>
        <input type="text" id="r-ad" placeholder="Adınız Soyadınız" style="width:100%; padding:16px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:#fff; font-size:1rem; outline:none; transition:border-color 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='rgba(255,255,255,0.15)'" />
      </div>
      <div>
        <input type="tel" id="r-tel" placeholder="Telefon Numaranız" style="width:100%; padding:16px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:#fff; font-size:1rem; outline:none; transition:border-color 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='rgba(255,255,255,0.15)'" />
      </div>
      <div style="grid-column: 1 / -1; margin-top:10px;">
        <input type="email" id="r-email" placeholder="E-posta (İsteğe Bağlı)" style="width:100%; padding:16px 20px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.05); color:#fff; font-size:1rem; outline:none; transition:border-color 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='rgba(255,255,255,0.15)'" />
      </div>
      <div style="grid-column: 1 / -1; margin-top:20px;">
        <div id="r-mesaj" style="display:none; padding:16px; border-radius:12px; text-align:center; font-size:1rem; font-weight:500; margin-bottom:20px;"></div>
        <button id="r-btn" onclick="randevuGonder()" class="hover-pulse" style="width:100%; background:var(--renk-vurgu); color:#fff; border:none; padding:18px; border-radius:12px; font-size:1.1rem; font-weight:700; cursor:pointer; letter-spacing:0.05em; transition:all 0.3s;">📅 Randevuyu Onayla</button>
      </div>
    </div>
  </div>
  <style>
    @media (max-width: 600px) {
      #randevu > div > div > div { grid-column: 1 / -1; }
    }
  </style>
</section>
<script>
  document.getElementById('r-tarih').min = new Date().toISOString().split('T')[0];
  function randevuGonder() {
    var h=document.getElementById('r-hizmet').value,
        t=document.getElementById('r-tarih').value,
        s=document.getElementById('r-saat').value,
        a=document.getElementById('r-ad').value,
        tel=document.getElementById('r-tel').value,
        email=document.getElementById('r-email').value,
        btn=document.getElementById('r-btn'),
        mesajDiv=document.getElementById('r-mesaj');
    if(!h||!t||!s||!a||!tel){alert('L\xfctfen zorunlu alanları doldurun');return;}
    btn.disabled=true; btn.textContent='İşleniyor...';
    fetch('KEPENK_API_URL/api/randevu',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({esnafId:'ESNAF_ID',musteriAd:a,musteriTel:tel,musteriEmail:email||null,hizmet:h,tarih:t,saat:s})
    }).then(function(r){return r.json()}).then(function(data){
      if(data.randevuId){
        mesajDiv.style.display='block';
        mesajDiv.style.background='rgba(0,200,83,0.2)';
        mesajDiv.style.border='1px solid rgba(0,200,83,0.4)';
        mesajDiv.style.color='#4ade80';
        mesajDiv.textContent='✅ '+data.mesaj;
        btn.style.display='none';
      } else { throw new Error(data.error); }
    }).catch(function(){
      var d=new Date(t).toLocaleDateString('tr-TR');
      var msg=encodeURIComponent('Randevu talebim:\\nHizmet: '+h+'\\nTarih: '+d+' - '+s+'\\nAd: '+a+'\\nTel: '+tel);
      window.open('https://wa.me/90WHATSAPP_NUMARA?text='+msg,'_blank');
      btn.disabled=false; btn.textContent='📅 Tekrar Dene';
    });
  }
</script>`},{id:"menu",ad:"Dijital Menü",aciklama:"Kategorili dijital menü — fiyatlı veya fiyatsız",minPaket:"BUYUME",htmlBlok:"Sekmeli kategorili menü listesi",geminiTalimat:'Dijital menü bölümü için aşağıdaki htmlSablon şablonunu kullan. MENU_JSON_PLACEHOLDER yerine sektöre uygun gerçek menü verisi yaz — format: {"Kategori":[{"ad":"...","aciklama":"...","fiyat":XX},...]}. Fiyatlar gerçekçi ₺ değerleri olsun. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="menu" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:1080px; margin:0 auto">
    <div style="text-align:center; margin-bottom:60px;">
      <span style="color:var(--renk-vurgu); font-size:0.9rem; font-weight:700; letter-spacing:0.3em; text-transform:uppercase;">Lezzetlerimiz</span>
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2.5rem, 5vw, 3.5rem); margin-top:12px;">Men\xfcy\xfc Keşfedin</h2>
    </div>
    <div id="menu-sekmeler" style="display:flex; gap:16px; overflow-x:auto; padding-bottom:16px; margin-bottom:50px; justify-content:center; scrollbar-width:none;"></div>
    <div id="menu-icerik" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(380px, 1fr)); gap:30px;"></div>
  </div>
</section>
<style>
  #menu-sekmeler::-webkit-scrollbar { display: none; }
  .menu-sekme-btn { flex-shrink:0; padding:14px 28px; border-radius:30px; border:2px solid transparent; cursor:pointer; font-weight:700; font-size:1rem; transition:all 0.3s; letter-spacing:0.05em; }
  .menu-sekme-btn.aktif { background:var(--renk-vurgu); color:#fff; box-shadow:0 10px 20px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.2); border-color:var(--renk-vurgu); }
  .menu-sekme-btn.pasif { background:var(--renk-kart); color:var(--renk-alt); box-shadow:0 4px 10px rgba(0,0,0,0.03); border-color:var(--renk-kart); }
  .menu-sekme-btn.pasif:hover { border-color:var(--renk-vurgu); color:var(--renk-vurgu); }
  .menu-kart { background:var(--renk-kart); border-radius:16px; padding:30px; box-shadow:0 15px 40px rgba(0,0,0,0.04); transition:transform 0.3s, border-color 0.3s; border:1px solid rgba(255,255,255,0.05); }
  .menu-kart:hover { transform:translateY(-8px); box-shadow:0 20px 50px rgba(0,0,0,0.08); border-color:var(--renk-vurgu); }
</style>
<script>
var MENU=MENU_JSON_PLACEHOLDER;
var aktif=Object.keys(MENU)[0];
function menuRender(){
  var sek=document.getElementById('menu-sekmeler');
  var ic=document.getElementById('menu-icerik');
  sek.innerHTML=Object.keys(MENU).map(function(k){
    var cls = k===aktif ? 'menu-sekme-btn aktif' : 'menu-sekme-btn pasif';
    return '<button onclick="menuSec(\\''+k+'\\')" class="'+cls+'">'+k+'</button>';
  }).join('');
  ic.innerHTML=MENU[aktif].map(function(item){
    return '<div class="menu-kart">'+
      '<div style="flex:1">'+
        '<div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:12px; border-bottom:1px dashed rgba(255,255,255,0.1); padding-bottom:12px;">'+
          '<h3 style="color:var(--renk-metin); font-weight:700; font-size:1.25rem; margin:0">'+item.ad+'</h3>'+
          (item.fiyat?'<span style="color:var(--renk-vurgu); font-weight:800; font-size:1.3rem; margin-left:16px; flex-shrink:0;">₺'+item.fiyat+'</span>':'')+
        '</div>'+
        (item.aciklama?'<p style="color:var(--renk-alt); font-size:0.95rem; line-height:1.7; margin:0">'+item.aciklama+'</p>':'')+
      '</div>'+
    '</div>';
  }).join('');
}
function menuSec(k){aktif=k;menuRender();}
menuRender();
</script>`},{id:"paket-listesi",ad:"Hizmet Paketleri",aciklama:"Fiyatlandırılmış paket karşılaştırma tablosu",minPaket:"BUYUME",htmlBlok:"3 sütunlu paket karşılaştırma kartları",geminiTalimat:'Hizmet paketleri bölümü ekle. 3 paket: Temel, Standart, Premium. Her pakette ne var, fiyat aralığı. Orta paketi "Önerilen" olarak vurgula.'},{id:"online-rezervasyon",ad:"Takvim Rezervasyonu",aciklama:"Takvim görünümlü rezervasyon sistemi",minPaket:"BUYUME",htmlBlok:"Mini takvim + saat seçimi rezervasyon",geminiTalimat:"Rezervasyon bölümü için aşağıdaki htmlSablon şablonunu kullan. WHATSAPP_NUMARA placeholder'ını doldur. CSS :root ayarlarını koru.",htmlSablon:`<section id="rezervasyon" style="padding:100px 20px; background:var(--renk-kart);">
  <div style="max-width:800px; margin:0 auto">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:12px;">Masanızı Ayırtın</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Misafirimiz olun, en g\xfczel masayı sizin i\xe7in hazırlayalım.</p>
    </div>
    
    <div style="background:var(--renk-arkaplan); border:1px solid rgba(255,255,255,0.05); border-radius:32px; padding:50px 40px; box-shadow:0 25px 50px rgba(0,0,0,0.06);">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:24px; margin-bottom:32px;">
          <div>
            <label style="color:var(--renk-alt); font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:10px; font-weight:800; padding-left:4px;">Kişi Sayısı</label>
            <select id="rz-kisi" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s, box-shadow 0.3s; font-weight:700; cursor:pointer;" onfocus="this.style.borderColor='var(--renk-vurgu)';this.style.boxShadow='0 0 0 4px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1)';" onblur="this.style.borderColor='transparent';this.style.boxShadow='none';">
              <option value="1">1 Kişi</option><option value="2">2 Kişi</option><option value="3">3 Kişi</option><option value="4" selected>4 Kişi</option><option value="5">5 Kişi</option><option value="6+">6+ Kişi</option>
            </select>
          </div>
          <div>
            <label style="color:var(--renk-alt); font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:10px; font-weight:800; padding-left:4px;">Tarih</label>
            <input type="date" id="rz-tarih" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s, box-shadow 0.3s; font-weight:700;" onfocus="this.style.borderColor='var(--renk-vurgu)';this.style.boxShadow='0 0 0 4px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1)';" onblur="this.style.borderColor='transparent';this.style.boxShadow='none';" />
          </div>
          <div>
            <label style="color:var(--renk-alt); font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:10px; font-weight:800; padding-left:4px;">Saat</label>
            <input type="time" id="rz-saat" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s, box-shadow 0.3s; font-weight:700;" onfocus="this.style.borderColor='var(--renk-vurgu)';this.style.boxShadow='0 0 0 4px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1)';" onblur="this.style.borderColor='transparent';this.style.boxShadow='none';" />
          </div>
        </div>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; margin-bottom:40px;">
            <input type="text" id="rz-ad" placeholder="Adınız Soyadınız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s, box-shadow 0.3s; font-weight:600;" onfocus="this.style.borderColor='var(--renk-vurgu)';this.style.boxShadow='0 0 0 4px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1)';" onblur="this.style.borderColor='transparent';this.style.boxShadow='none';" />
            <input type="tel" id="rz-tel" placeholder="Telefon Numaranız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s, box-shadow 0.3s; font-weight:600;" onfocus="this.style.borderColor='var(--renk-vurgu)';this.style.boxShadow='0 0 0 4px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1)';" onblur="this.style.borderColor='transparent';this.style.boxShadow='none';" />
        </div>

        <button onclick="rzGonder()" style="width:100%; background:var(--renk-metin); color:var(--renk-arkaplan); border:none; padding:22px; border-radius:20px; font-weight:800; font-size:1.25rem; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s; box-shadow:0 15px 30px rgba(0,0,0,0.15);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 20px 40px rgba(0,0,0,0.25)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 15px 30px rgba(0,0,0,0.15)';">
          🎯 Rezervasyonu Tamamla
        </button>
    </div>
  </div>
  <style>
    @media (max-width: 600px) {
      #rezervasyon > div > div:nth-child(2) { padding: 30px 20px; border-radius:24px; }
    }
  </style>
</section>
<script>
  document.getElementById('rz-tarih').min = new Date().toISOString().split('T')[0];
  function rzGonder(){
    var k=document.getElementById('rz-kisi').value;
    var t=document.getElementById('rz-tarih').value;
    var s=document.getElementById('rz-saat').value;
    var a=document.getElementById('rz-ad').value;
    var tel=document.getElementById('rz-tel').value;
    if(!t||!s||!a||!tel){alert('L\xfctfen eksik alanları doldurun.');return;}
    var d=new Date(t).toLocaleDateString('tr-TR');
    var txt = encodeURIComponent('Rezervasyon Talebi:\\nMisafir: '+a+'\\nİletişim: '+tel+'\\nKişi Sayısı: '+k+'\\nTarih & Saat: '+d+' - '+s);
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+txt, '_blank');
  }
</script>`},{id:"instagram-feed",ad:"Instagram Bağlantısı",aciklama:"Instagram profiline yönlendirme + son gönderim önizlemesi",minPaket:"PREMIUM",htmlBlok:"Instagram CTA bölümü",geminiTalimat:'Instagram bölümü ekle. "@kullanici" büyük göster, "Instagram\'da Takip Et" butonu. Son 6 gönderi için placeholder kareler (gradient bg).'},{id:"santiye-gunlugu",ad:"Şantiye Günlüğü",aciklama:"Devam eden projelerin günlük ilerleme takibi",minPaket:"PREMIUM",htmlBlok:"Proje ilerleme takip bölümü",geminiTalimat:"Şantiye günlüğü bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="santiye" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:900px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">Şantiye G\xfcnl\xfcğ\xfc</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Devam eden projelerimizdeki ilerlemeyi adım adım takip edin.</p>
    </div>
    <div style="display:grid; gap:30px;">
      <!-- Project 1 -->
      <div style="background:var(--renk-kart); border-radius:24px; padding:32px; box-shadow:0 20px 40px rgba(0,0,0,0.05); border:1px solid rgba(255,255,255,0.02); display:flex; flex-wrap:wrap; gap:30px; align-items:center;">
        <div style="flex:1; min-width:280px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
            <div>
              <h3 style="color:var(--renk-metin); font-family:var(--font-baslik); font-size:1.5rem; margin:0 0 6px;">Sunset Vadi Evleri</h3>
              <p style="color:var(--renk-alt); font-size:0.95rem; margin:0;">📍 Beylikd\xfcz\xfc, İstanbul</p>
            </div>
            <span style="background:rgba(234,179,8,0.15); color:#eab308; padding:6px 14px; border-radius:20px; font-weight:800; font-size:0.8rem;">Devam Ediyor</span>
          </div>
          <p style="color:var(--renk-metin); opacity:0.85; line-height:1.6; font-size:0.95rem; margin-bottom:24px;">Temel atma işlemleri tamamlandı. Zemin kat kolon kalıpları d\xf6k\xfcl\xfcyor.</p>
          <div style="background:rgba(255,255,255,0.05); border-radius:8px; height:12px; overflow:hidden; margin-bottom:12px; position:relative;">
            <div style="width:35%; height:100%; background:linear-gradient(90deg, var(--renk-vurgu), #4ade80); border-radius:8px;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; color:var(--renk-alt); font-size:0.85rem; font-weight:600;">
            <span>Tamamlanma: %35</span>
            <span>Tahmini Bitiş: Aralık 2024</span>
          </div>
        </div>
        <div style="width:200px; height:200px; border-radius:16px; overflow:hidden; flex-shrink:0;">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Şantiye"/>
        </div>
      </div>
      <!-- Project 2 -->
      <div style="background:var(--renk-kart); border-radius:24px; padding:32px; box-shadow:0 20px 40px rgba(0,0,0,0.05); border:1px solid rgba(255,255,255,0.02); display:flex; flex-wrap:wrap; gap:30px; align-items:center;">
        <div style="flex:1; min-width:280px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
            <div>
              <h3 style="color:var(--renk-metin); font-family:var(--font-baslik); font-size:1.5rem; margin:0 0 6px;">Merkez Ofis Plazası</h3>
              <p style="color:var(--renk-alt); font-size:0.95rem; margin:0;">📍 Levent, İstanbul</p>
            </div>
            <span style="background:rgba(74,222,128,0.15); color:#4ade80; padding:6px 14px; border-radius:20px; font-weight:800; font-size:0.8rem;">İnce İş\xe7ilikte</span>
          </div>
          <p style="color:var(--renk-metin); opacity:0.85; line-height:1.6; font-size:0.95rem; margin-bottom:24px;">Dış cephe cam kaplamaları bitmek \xfczere. İ\xe7 mekan elektrik tesisatı \xe7ekiliyor.</p>
          <div style="background:rgba(255,255,255,0.05); border-radius:8px; height:12px; overflow:hidden; margin-bottom:12px; position:relative;">
            <div style="width:82%; height:100%; background:linear-gradient(90deg, var(--renk-vurgu), #4ade80); border-radius:8px;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; color:var(--renk-alt); font-size:0.85rem; font-weight:600;">
            <span>Tamamlanma: %82</span>
            <span>Tahmini Bitiş: Ağustos 2024</span>
          </div>
        </div>
        <div style="width:200px; height:200px; border-radius:16px; overflow:hidden; flex-shrink:0;">
          <img src="https://images.unsplash.com/photo-1541888086050-8b9eeb257b4c?w=400&q=80" style="width:100%; height:100%; object-fit:cover;" alt="Plaza İnşaat"/>
        </div>
      </div>
    </div>
  </div>
  <style>
    @media (max-width: 600px) { #santiye > div > div > div > div:last-child { width:100%; height:200px; } }
  </style>
</section>`},{id:"proje-portfoy",ad:"Proje Portföyü",aciklama:"Tamamlanan projelerin detaylı portföyü",minPaket:"PREMIUM",htmlBlok:"Filtrelenebilir proje grid",geminiTalimat:"Portföy bölümü ekle.",htmlSablon:`<section id="portfoy" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:1200px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">Projelerimiz</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Ge\xe7mişten bug\xfcne imza attığımız başarılı \xe7alışmalar.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:30px;" id="portfoy-grid">
      <!-- Generated by JS -->
    </div>
  </div>
</section>
<script>
  setTimeout(function(){
    var pGrid = document.getElementById('portfoy-grid');
    if(!pGrid) return;
    var pData = [
      { ad:'Modern Villa Kompleksi', yer:'Bodrum', t:'2023', img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
      { ad:'Şehir K\xfct\xfcphanesi', yer:'Ankara', t:'2022', img:'https://images.unsplash.com/photo-1541123437800-141315757912?w=600&q=80' },
      { ad:'Ekolojik Yaşam Merkezi', yer:'İzmir', t:'2024', img:'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80' }
    ];
    pGrid.innerHTML = pData.map(function(p){
      return '<div style="border-radius:24px; overflow:hidden; position:relative; cursor:pointer;" onmouseover="this.children[1].style.opacity=\\'1\\'; this.children[0].style.transform=\\'scale(1.05)\\';" onmouseout="this.children[1].style.opacity=\\'0\\'; this.children[0].style.transform=\\'scale(1)\\';"><img src="'+p.img+'" style="width:100%; height:320px; object-fit:cover; transition:transform 0.5s;"/><div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%); opacity:0; transition:opacity 0.4s; display:flex; flex-direction:column; justify-content:flex-end; padding:30px;"><h3 style="color:#fff; font-size:1.4rem; margin:0 0 8px; font-family:var(--font-baslik); transform:translateY(20px); transition:transform 0.4s;">'+p.ad+'</h3><p style="color:rgba(255,255,255,0.8); margin:0; font-size:0.95rem; transform:translateY(20px); transition:transform 0.4s; transition-delay:0.1s;">📍 '+p.yer+' • '+p.t+'</p></div></div>';
    }).join('');
  }, 100);
</script>`},{id:"nobet-takvimi",ad:"Nöbet Takvimi",aciklama:"Eczane için haftalık nöbet durumu",minPaket:"TEMEL",htmlBlok:"Bu hafta nöbet durumu bölümü",geminiTalimat:'Nöbet takvimi bölümü ekle. "Bu hafta nöbet: [gün] [gün]" şeklinde. İletişim telefonu büyük göster.'},{id:"online-danisma",ad:"Online Danışma",aciklama:"Uzaktan danışma talebi ve bilgi formu",minPaket:"STANDART",htmlBlok:"Online danışma talep formu",geminiTalimat:"Online danışma bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="danisma" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:960px; margin:0 auto; display:flex; flex-wrap:wrap; gap:50px; align-items:center;">
    <div style="flex:1; min-width:300px;">
      <span style="background:rgba(var(--renk-vurgu-rgb, 255,255,255), 0.1); color:var(--renk-vurgu); padding:8px 18px; border-radius:30px; font-weight:800; font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase;">İlk G\xf6r\xfcşme \xdccretsiz</span>
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 4vw, 3.2rem); margin:20px 0 16px; line-height:1.2;">Hemen Online Danışma Alın</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem; line-height:1.7; margin-bottom:20px;">Sorunlarınızı dinlemek ve \xe7\xf6z\xfcm \xfcretmek i\xe7in buradayız. Formu doldurun, uzmanlarımız en hızlı şekilde \xe7\xf6z\xfcm bulmak ve sizi y\xf6nlendirmek i\xe7in iletişime ge\xe7sin.</p>
    </div>
    <div style="flex:1; min-width:340px; background:var(--renk-kart); padding:40px; border-radius:32px; box-shadow:0 25px 50px rgba(0,0,0,0.06); border:1px solid rgba(255,255,255,0.03);">
      <div style="display:grid; gap:20px;">
        <input type="text" id="od-ad" placeholder="Adınız Soyadınız" style="padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.05rem; outline:none; transition:border 0.3s; font-weight:600;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
        <input type="tel" id="od-tel" placeholder="Telefon Numaranız" style="padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.05rem; outline:none; transition:border 0.3s; font-weight:600;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
        <textarea id="od-konu" placeholder="Danışmak İstediğiniz Konu..." rows="3" style="padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.05rem; outline:none; transition:border 0.3s; resize:vertical; font-weight:600;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'"></textarea>
        <button onclick="odGonder()" style="background:var(--renk-vurgu); color:#fff; border:none; padding:20px; border-radius:16px; font-weight:800; font-size:1.15rem; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s; margin-top:10px; box-shadow:0 15px 30px rgba(var(--renk-vurgu-rgb,0,0,0), 0.2);" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 20px 40px rgba(var(--renk-vurgu-rgb,0,0,0), 0.3)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 15px 30px rgba(var(--renk-vurgu-rgb,0,0,0), 0.2)';">
          📞 Sizi Arayalım
        </button>
      </div>
    </div>
  </div>
</section>
<script>
  function odGonder(){
    var a=document.getElementById('od-ad').value;
    var t=document.getElementById('od-tel').value;
    var k=document.getElementById('od-konu').value;
    if(!a||!t||!k){alert('L\xfctfen formdaki t\xfcm alanları doldurun.');return;}
    var txt = encodeURIComponent('Online Danışma Talebi:\\nAd: '+a+'\\nTel: '+t+'\\nKonu: '+k);
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+txt, '_blank');
  }
</script>`},{id:"uyelik-paketleri",ad:"Üyelik Paketleri",aciklama:"Aylık/yıllık üyelik seçenekleri",minPaket:"BUYUME",htmlBlok:"Toggle aylık/yıllık üyelik kartları",geminiTalimat:"Üyelik bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="uyelik" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:1200px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">Avantajlı \xdcyelik Paketleri</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem; margin-bottom:30px;">İhtiyacınıza en uygun planı se\xe7in, ayrıcalıklardan hemen faydalanın.</p>
    </div>
    <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:30px; align-items:stretch;" id="up-grid">
      <!-- Generated by JS -->
    </div>
  </div>
</section>
<script>
  setTimeout(function(){
    var upG=document.getElementById('up-grid');
    if(!upG) return;
    var upData=[
      {n:'Başlangı\xe7', p:'499 ₺', per:'/ay', f:['Haftada 2 G\xfcn Hizmet', 'Standart Erişim', 'Aylık Raporlama'], v:false},
      {n:'Standart', p:'899 ₺', per:'/ay', f:['Sınırsız Giriş', 'T\xfcm Alanlara Erişim', '\xd6zel Danışmanlık', '\xd6ncelikli Destek'], v:true},
      {n:'Premium', p:'1.499 ₺', per:'/ay', f:['7/24 VIP Kullanım', '\xd6zel Uzman Ataması', 'Detaylı Analizler', 'Tam Kapsamlı Mod\xfcl'], v:false}
    ];
    upG.innerHTML=upData.map(function(d){
      var isV = d.v;
      var bg = isV ? 'var(--renk-vurgu)' : 'var(--renk-kart)';
      var cText = isV ? '#fff' : 'var(--renk-metin)';
      var cAlt = isV ? 'rgba(255,255,255,0.8)' : 'var(--renk-alt)';
      var scale = isV ? 'scale(1.05)' : 'scale(1)';
      var border = isV ? 'none' : '1px solid rgba(255,255,255,0.05)';
      var btnBg = isV ? '#fff' : 'rgba(var(--renk-vurgu-rgb, 255,255,255), 0.1)';
      var btnC = isV ? 'var(--renk-vurgu)' : 'var(--renk-vurgu)';
      var badge = isV ? '<div style="position:absolute; top:0; right:30px; transform:translateY(-50%); background:#000; color:#fff; padding:6px 16px; border-radius:20px; font-size:0.8rem; font-weight:800; letter-spacing:0.05em;">EN \xc7OK TERCİH EDİLEN</div>' : '';
      
      var feats = d.f.map(function(feat){
        return '<li style="display:flex; align-items:center; gap:12px; margin-bottom:16px; color:'+cText+'; font-size:0.95rem;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:'+(isV?'#fff':'var(--renk-vurgu)')+'"><polyline points="20 6 9 17 4 12"></polyline></svg> '+feat+'</li>';
      }).join('');
      
      return '<div style="flex:1; min-width:300px; max-width:380px; position:relative; background:'+bg+'; border-radius:32px; padding:40px; border:'+border+'; box-shadow:0 25px 50px rgba(0,0,0,0.1); transform:'+scale+'; display:flex; flex-direction:column; transition:transform 0.3s;" onmouseover="this.style.transform=\\'translateY(-10px) '+(isV?scale:'')+'\\'" onmouseout="this.style.transform=\\''+scale+'\\'">'+badge+'<h3 style="color:'+cText+'; font-family:var(--font-baslik); font-size:1.6rem; margin:0 0 8px;">'+d.n+'</h3><div style="display:flex; align-items:baseline; gap:4px; margin-bottom:30px;"><span style="color:'+cText+'; font-size:3rem; font-weight:900;">'+d.p+'</span><span style="color:'+cAlt+'; font-weight:600;">'+d.per+'</span></div><ul style="list-style:none; padding:0; margin:0 0 40px; flex:1;">'+feats+'</ul><button style="width:100%; background:'+btnBg+'; color:'+btnC+'; border:none; padding:18px; border-radius:16px; font-weight:800; font-size:1.1rem; cursor:pointer; transition:opacity 0.3s;" onmouseover="this.style.opacity=\\'0.8\\'" onmouseout="this.style.opacity=\\'1\\'" onclick="window.open(\\'https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent('Merhaba, '+d.n+' paketiyle ilgileniyorum.')+'\\',\\'_blank\\')">Paketi Se\xe7</button></div>';
    }).join('');
  }, 100);
</script>`},{id:"ders-programi",ad:"Ders Programı",aciklama:"Haftalık ders/etkinlik takvimi",minPaket:"STANDART",htmlBlok:"Haftalık takvim grid",geminiTalimat:"Haftalık ders programı bölümü ekle. 7 gün × saat dilimleri grid. Her ders: renk kodlu, isim, saat. Örnek dersler ile doldur."},{id:"siparis-linki",ad:"Sipariş Entegrasyonu",aciklama:"Yemeksepeti / Getir / Trendyol linki",minPaket:"TEMEL",htmlBlok:"Sipariş platformları butonları",geminiTalimat:'Sipariş bölümü için aşağıdaki htmlSablon şablonunu kullan. Yemeksepeti/Getir/Trendyol butonlarına esnafın geçerli linklerini "/#" yerine ekle. Linki olmayan platformun <a> etiketini çıkart. Her zaman CSS değişkenlerini :root içinde tanımla.',htmlSablon:`<section id="siparis" style="padding:80px 20px; text-align:center; background:linear-gradient(135deg, var(--renk-kart), var(--renk-arkaplan));">
  <div style="max-width:600px; margin:0 auto">
    <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 4vw, 2.5rem); margin-bottom:16px;">Hemen Sipariş Verin</h2>
    <p style="color:var(--renk-alt); font-size:1.1rem; margin-bottom:40px;">Favori platformunuzu se\xe7in, lezzet kapınıza gelsin.</p>
    <div style="display:flex; flex-direction:column; gap:16px;">
      <a href="/#" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:12px; background:#ea004b; color:#fff; text-decoration:none; padding:18px; border-radius:16px; font-weight:800; font-size:1.2rem; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 10px 20px rgba(234,0,75,0.3);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 15px 30px rgba(234,0,75,0.4)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 10px 20px rgba(234,0,75,0.3)';">
        🛒 Yemeksepeti
      </a>
      <a href="/#" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:12px; background:#5d3ebc; color:#fff; text-decoration:none; padding:18px; border-radius:16px; font-weight:800; font-size:1.2rem; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 10px 20px rgba(93,62,188,0.3);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 15px 30px rgba(93,62,188,0.4)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 10px 20px rgba(93,62,188,0.3)';">
        🛵 GetirYemek
      </a>
      <a href="/#" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:12px; background:#f27a1a; color:#fff; text-decoration:none; padding:18px; border-radius:16px; font-weight:800; font-size:1.2rem; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 10px 20px rgba(242,122,26,0.3);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 15px 30px rgba(242,122,26,0.4)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 10px 20px rgba(242,122,26,0.3)';">
        🛍️ Trendyol Yemek
      </a>
      <a href="https://wa.me/90WHATSAPP_NUMARA?text=Merhaba,%20sipari%C5%9F%20vermek%20istiyorum." target="_blank" style="display:flex; align-items:center; justify-content:center; gap:12px; background:#25d366; color:#fff; text-decoration:none; padding:18px; border-radius:16px; font-weight:800; font-size:1.2rem; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 10px 20px rgba(37,211,102,0.3); margin-top:8px;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 15px 30px rgba(37,211,102,0.4)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 10px 20px rgba(37,211,102,0.3)';">
        💬 WhatsApp'tan Sipariş Ver
      </a>
    </div>
  </div>
</section>`},{id:"katalog",ad:"Ürün Kataloğu",aciklama:"Ürün/seri kataloğu sayfası",minPaket:"BUYUME",htmlBlok:"Katalog grid veya liste",geminiTalimat:"Katalog bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="katalog" style="padding:100px 20px; background:var(--renk-kart);">
  <div style="max-width:1200px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">\xdcr\xfcn Kataloğumuz</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">En yeni serilerimizi ve pop\xfcler \xfcr\xfcnlerimizi keşfedin.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:30px;" id="kat-grid">
      <!-- Generated by JS -->
    </div>
    <div style="text-align:center; margin-top:50px;">
      <button onclick="window.open('https://wa.me/90WHATSAPP_NUMARA?text=Merhaba,%20t%C3%BCm%20%C3%BCr%C3%BCn%20katalo%C4%9Funuzu%20iletebilir%20misiniz?','_blank')" style="background:var(--renk-vurgu); color:#fff; border:none; padding:18px 40px; border-radius:50px; font-weight:800; font-size:1.1rem; cursor:pointer; box-shadow:0 15px 30px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.3); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">📥 Tam Kataloğu WhatsApp'tan İste</button>
    </div>
  </div>
</section>
<script>
  setTimeout(function(){
    var katG = document.getElementById('kat-grid');
    if(!katG) return;
    var kData = [
      { ad:'Premium Seri', desc:'En y\xfcksek kalite standartları', img:'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80' },
      { ad:'Eco Seri', desc:'Doğa dostu ve ekonomik \xe7\xf6z\xfcmler', img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80' },
      { ad:'Business Seri', desc:'Kurumsal firmalar i\xe7in \xf6zel \xfcretim', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80' }
    ];
    katG.innerHTML = kData.map(function(k){
      return '<div style="background:var(--renk-arkaplan); border-radius:24px; overflow:hidden; border:1px solid rgba(255,255,255,0.05); transition:transform 0.3s; cursor:pointer;" onmouseover="this.style.transform=\\'translateY(-8px)\\'; this.querySelector(\\'img\\').style.transform=\\'scale(1.05)\\';" onmouseout="this.style.transform=\\'none\\'; this.querySelector(\\'img\\').style.transform=\\'none\\';"><div style="width:100%; height:240px; overflow:hidden;"><img src="'+k.img+'" style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s;"/></div><div style="padding:24px;"><h3 style="color:var(--renk-metin); font-family:var(--font-baslik); font-size:1.4rem; margin:0 0 8px;">'+k.ad+'</h3><p style="color:var(--renk-alt); font-size:0.95rem; margin:0 0 20px;">'+k.desc+'</p><a href="https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent('Merhaba, '+k.ad+' ile ilgili fiyat bilgisi alabilir miyim?')+'" target="_blank" style="display:inline-block; color:var(--renk-vurgu); font-weight:700; text-decoration:none; font-size:0.95rem;">Fiyat Sor →</a></div></div>';
    }).join('');
  }, 100);
</script>`},{id:"evrak-listesi",ad:"Gerekli Belgeler Listesi",aciklama:"Hizmet için gereken evrak listesi",minPaket:"STANDART",htmlBlok:"Evrak/belge listesi bölümü",geminiTalimat:"Gerekli belgeler bölümü ekle. Madde madde liste (örn. kimlik, vergi levhası, sözleşme). Sektöre uygun belgeler yaz."},{id:"fiyat-hesaplayici",ad:"Fiyat Hesaplayıcı",aciklama:"Anlık fiyat hesaplama (nakliye vb.)",minPaket:"BUYUME",htmlBlok:"Basit hesaplama formu",geminiTalimat:"Fiyat hesaplama bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="hesaplayici" style="padding:100px 20px; background:linear-gradient(135deg, var(--renk-arkaplan), var(--renk-kart));">
  <div style="max-width:600px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:40px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 2.8rem); margin-bottom:12px;">Hızlı Fiyat Hesapla</h2>
      <p style="color:var(--renk-alt); font-size:1.1rem;">İhtiyacınız olan detayları se\xe7in, yaklaşık maliyeti anında g\xf6r\xfcn.</p>
    </div>
    <div style="background:var(--renk-kart); padding:40px; border-radius:32px; box-shadow:0 25px 50px rgba(0,0,0,0.1); border:1px solid rgba(255,255,255,0.05);">
      <div style="margin-bottom:24px;">
        <label style="display:block; color:var(--renk-metin); font-weight:700; margin-bottom:12px; font-size:1.05rem;">Hizmet T\xfcr\xfc</label>
        <select id="fh-tur" style="width:100%; padding:16px 20px; border-radius:12px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.05rem; outline:none; font-weight:600; cursor:pointer;" onchange="fhHesapla()">
          <option value="1000">Standart İşlem (Baz: 1.000₺)</option>
          <option value="2500">Detaylı İşlem (Baz: 2.500₺)</option>
          <option value="5000">VIP Komple \xc7\xf6z\xfcm (Baz: 5.000₺)</option>
        </select>
      </div>
      <div style="margin-bottom:30px;">
        <label style="display:flex; justify-content:space-between; color:var(--renk-metin); font-weight:700; margin-bottom:12px; font-size:1.05rem;"><span>Adet / m\xb2 / S\xfcre \xc7arpanı</span> <span id="fh-kapsam-deger">1</span></label>
        <input type="range" id="fh-kapsam" min="1" max="10" value="1" style="width:100%; cursor:ew-resize;" oninput="document.getElementById('fh-kapsam-deger').textContent=this.value; fhHesapla()"/>
      </div>
      <div style="background:rgba(var(--renk-vurgu-rgb, 255,255,255), 0.1); padding:24px; border-radius:20px; text-align:center; margin-bottom:24px;">
        <p style="color:var(--renk-alt); font-size:0.95rem; font-weight:600; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.05em;">Tahmini Tutar</p>
        <div id="fh-sonuc" style="color:var(--renk-vurgu); font-size:2.5rem; font-weight:900; font-family:var(--font-baslik);">1.000 ₺</div>
      </div>
      <button onclick="fhGonder()" style="width:100%; background:var(--renk-metin); color:var(--renk-arkaplan); border:none; padding:20px; border-radius:16px; font-weight:800; font-size:1.15rem; cursor:pointer; box-shadow:0 15px 30px rgba(0,0,0,0.15); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">Detaylı Fiyat İ\xe7in Bize Ulaşın</button>
    </div>
  </div>
</section>
<script>
  function fhHesapla(){
    var t=parseInt(document.getElementById('fh-tur').value);
    var k=parseInt(document.getElementById('fh-kapsam').value);
    var x=t*k;
    document.getElementById('fh-sonuc').textContent = x.toLocaleString('tr-TR') + ' ₺';
  }
  function fhGonder(){
    var res=document.getElementById('fh-sonuc').textContent;
    var txt=encodeURIComponent('Merhaba, sitenizdeki hesaplayıcıdan '+res+' tahmini tutar \xe7ıkardım. Durumu netleştirmek ve detaylı teklif almak istiyorum.');
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+txt, '_blank');
  }
  fhHesapla();
</script>`},{id:"gunun-ozel",ad:"Günün Özel Menüsü",aciklama:"Günlük özel menü / kampanya alanı",minPaket:"STANDART",htmlBlok:"Vurgulu günün özelü alanı",geminiTalimat:'"Günün Özelü" bölümü için aşağıdaki htmlSablon şablonunu kullan.',htmlSablon:`<section id="firsat" style="padding:100px 20px; background:var(--renk-vurgu); color:#fff; position:relative; overflow:hidden;">
  <div style="position:absolute; top:-20%; right:-10%; width:500px; height:500px; background:radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%); pointer-events:none;"></div>
  <div style="max-width:1000px; margin:0 auto; display:flex; flex-wrap:wrap; gap:50px; align-items:center; position:relative; z-index:2;">
    <div style="flex:1; min-width:300px;">
      <div style="display:inline-block; background:rgba(0,0,0,0.2); padding:8px 16px; border-radius:20px; font-weight:800; font-size:0.85rem; letter-spacing:0.1em; margin-bottom:20px; backdrop-filter:blur(5px);">🔥 SADECE BUG\xdcNE \xd6ZEL</div>
      <h2 style="font-family:var(--font-baslik); font-size:clamp(2.5rem, 5vw, 4rem); margin:0 0 16px; line-height:1.1; color:#fff;">Fırsatı Ka\xe7ırmayın!</h2>
      <p style="font-size:1.2rem; line-height:1.6; opacity:0.9; margin-bottom:30px;">Hizmetlerimiz i\xe7in bug\xfcn \xf6zel olarak net %30'a varan indirim uyguluyoruz. Kontenjanlar dolmadan hemen faydalanın.</p>
      <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
        <button onclick="window.open('https://wa.me/90WHATSAPP_NUMARA?text=Merhaba,%20sitenizdeki%20g%C3%BCn%C3%BCn%20%C3%B6zel%20f%C4%B1rsat%C4%B1ndan%20yararlanmak%20istiyorum.','_blank')" style="background:#fff; color:#000; border:none; padding:18px 32px; border-radius:16px; font-weight:800; font-size:1.1rem; cursor:pointer; box-shadow:0 15px 30px rgba(0,0,0,0.2); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">Fırsatı Yakala →</button>
        <span style="font-size:0.9rem; opacity:0.8; font-weight:600;">* Sadece bug\xfcn saat 23:59'a kadar ge\xe7erli.</span>
      </div>
    </div>
    <div style="width:400px; flex-shrink:0; position:relative;">
      <img src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&q=80" style="width:100%; aspect-ratio:1; object-fit:cover; border-radius:32px; box-shadow:0 30px 60px rgba(0,0,0,0.3); transform:rotate(3deg);" alt="G\xfcn\xfcn Fırsatı"/>
      <div style="position:absolute; bottom:-20px; left:-20px; background:#ea004b; color:#fff; width:100px; height:100px; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; box-shadow:0 10px 20px rgba(234,0,75,0.4); transform:rotate(-15deg); font-family:var(--font-baslik);">
        <span style="font-size:1.8rem; font-weight:900; line-height:1;">%30</span>
        <span style="font-size:0.85rem; font-weight:700;">İNDİRİM</span>
      </div>
    </div>
  </div>
  <style>
    @media (max-width: 900px) { #firsat > div > div:first-child { text-align:center; } #firsat > div > div:first-child > div { justify-content:center; } }
    @media (max-width: 600px) { #firsat > div > div:last-child { width:100%; } }
  </style>
</section>`},{id:"arac-sorgulama",ad:"Araç Servis Sorgulama",aciklama:"Araç plaka ile servis geçmişi bilgisi",minPaket:"BUYUME",htmlBlok:"Plaka girişi + bilgi alanı",geminiTalimat:"Araç sorgulama bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="sorgulama" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:600px; margin:0 auto; text-align:center;">
    <div style="text-align:center; margin-bottom:40px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 2.8rem); margin-bottom:12px;">Ara\xe7 Servis Ge\xe7mişi</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Plakanızı girerek aracınızın servisimizde yapılan son işlemlerini anında sorgulayın.</p>
    </div>
    <div style="background:var(--renk-kart); padding:40px; border-radius:32px; box-shadow:0 25px 50px rgba(0,0,0,0.05); border:1px solid rgba(255,255,255,0.03);">
        <div style="display:flex; margin-bottom:24px; background:var(--renk-arkaplan); border-radius:16px; border:2px solid transparent; overflow:hidden; transition:border 0.3s;" id="as-wrapper">
          <div style="background:#0033a0; color:#fff; padding:0 20px; display:flex; flex-direction:column; justify-content:center; align-items:center; font-weight:900; font-size:1rem;">
            <span>TR</span>
          </div>
          <input type="text" id="as-plaka" placeholder="34 XXX 34" style="flex:1; padding:20px; background:transparent; border:none; color:var(--renk-metin); font-size:1.4rem; font-weight:800; text-align:center; outline:none; text-transform:uppercase;" onfocus="document.getElementById('as-wrapper').style.borderColor='var(--renk-vurgu)'" onblur="document.getElementById('as-wrapper').style.borderColor='transparent'" />
        </div>
        <button onclick="asSorgula()" style="width:100%; background:var(--renk-vurgu); color:#fff; border:none; padding:20px; border-radius:16px; font-weight:800; font-size:1.2rem; cursor:pointer; box-shadow:0 15px 30px rgba(var(--renk-vurgu-rgb,0,0,0), 0.2); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">🔍 Hemen Sorgula</button>
        <p id="as-sonuc" style="display:none; color:var(--renk-alt); margin-top:24px; font-size:1.05rem; line-height:1.6;"></p>
    </div>
  </div>
</section>
<script>
  function asSorgula(){
    var p=document.getElementById('as-plaka').value.trim().toUpperCase();
    if(!p){alert('L\xfctfen ge\xe7erli bir plaka girin.');return;}
    var s=document.getElementById('as-sonuc');
    s.style.display='block';
    s.innerHTML='<strong style="color:var(--renk-metin); font-size:1.2rem;">'+p+'</strong> plakalı aracınızın detaylı ge\xe7miş kayıtlarına WhatsApp destek hattımız \xfczerinden, KVKK kapsamında anında ulaşabilirsiniz.<br><br><a href="https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent('Merhaba, '+p+' plakalı aracımın g\xfcncel servis ge\xe7mişini sorgulamak istiyorum.')+'" target="_blank" style="display:inline-block; background:#25d366; color:#fff; padding:14px 28px; border-radius:16px; font-weight:800; text-decoration:none; margin-top:12px; transition:transform 0.2s;" onmouseover="this.style.transform=\\'scale(1.05)\\';" onmouseout="this.style.transform=\\'none\\';">💬 WhatsApp ile \xd6ğren</a>';
  }
</script>`},{id:"kayit-formu",ad:"Kayıt / Başvuru Formu",aciklama:"Kurs veya etkinlik kayıt formu",minPaket:"STANDART",htmlBlok:"Kayıt formu bölümü",geminiTalimat:"Kayıt/Başvuru bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="kayit" style="padding:100px 20px; background:var(--renk-kart);">
  <div style="max-width:700px; margin:0 auto">
    <div style="text-align:center; margin-bottom:40px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 2.8rem); margin-bottom:12px;">Hemen Kayıt Olun</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Geleceğe yatırım yapın, programlarımıza yerinizi ayırtın.</p>
    </div>
    <div style="background:var(--renk-arkaplan); padding:40px 50px; border-radius:32px; box-shadow:0 25px 50px rgba(0,0,0,0.05); border:1px solid rgba(255,255,255,0.03);">
        <input type="text" id="kf-ad" placeholder="Adı Soyadı" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; margin-bottom:20px; font-weight:600; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); gap:20px; margin-bottom:20px;">
            <input type="tel" id="kf-tel" placeholder="Telefon Numarası" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; font-weight:600; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
            <input type="email" id="kf-email" placeholder="E-posta" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; font-weight:600; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
        </div>

        <select id="kf-program" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; margin-bottom:30px; font-weight:600; cursor:pointer; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'">
          <option value="" style="color:#000">İlgilendiğiniz Program / Hizmet</option>
          <option style="color:#000">Genel Başvuru</option>
          <option style="color:#000">\xd6zel Ders / Danışmanlık</option>
          <option style="color:#000">Kayıt G\xf6r\xfcşmesi</option>
        </select>

        <button onclick="kfGonder()" style="width:100%; background:var(--renk-vurgu); color:#fff; border:none; padding:22px; border-radius:16px; font-weight:800; font-size:1.2rem; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s; box-shadow:0 15px 30px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.2);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 20px 40px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.3)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 15px 30px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.2)';">
          📝 Başvuruyu İlet
        </button>
    </div>
  </div>
  <style>
    @media (max-width: 600px) { #kayit > div > div:nth-child(2) { padding: 30px 20px; } }
  </style>
</section>
<script>
  function kfGonder(){
    var a=document.getElementById('kf-ad').value;
    var t=document.getElementById('kf-tel').value;
    var e=document.getElementById('kf-email').value;
    var p=document.getElementById('kf-program').value;
    if(!a||!t||!p){alert('L\xfctfen isim, telefon ve program bilgisini girin.');return;}
    var txt = encodeURIComponent('Program Kayıt Talebi:\\nAd: '+a+'\\nTel: '+t+'\\nE-posta: '+e+'\\nSe\xe7ilen: '+p);
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+txt, '_blank');
  }
</script>`},{id:"recete-iletme",ad:"Online Reçete İletme Formu",aciklama:"Eczane: Reçete fotoğrafı veya bilgisi gönderme",minPaket:"STANDART",htmlBlok:"Reçete yükleme / iletişim formu",geminiTalimat:'Eczane için "Reçetenizi İletin" bölümü ekle.',htmlSablon:`<section id="recete" style="padding:100px 20px; background:var(--renk-kart); position:relative; overflow:hidden;">
  <div style="max-width:600px; margin:0 auto; position:relative; z-index:2;">
    <div style="text-align:center; margin-bottom:40px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 2.8rem); margin-bottom:12px;">Re\xe7etenizi İletin</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Re\xe7etenizi online olarak yollayın, ila\xe7larınızı hemen hazırlayalım.</p>
    </div>
    <div style="background:var(--renk-arkaplan); padding:40px; border-radius:32px; box-shadow:0 25px 50px rgba(0,0,0,0.05); border:1px solid rgba(255,255,255,0.03);">
        <input type="text" id="ri-ad" placeholder="Adınız Soyadınız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; margin-bottom:16px; font-weight:600; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
        
        <input type="tel" id="ri-tel" placeholder="Telefon Numaranız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1.1rem; outline:none; margin-bottom:16px; font-weight:600; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />

        <div style="border:2px dashed rgba(var(--renk-vurgu-rgb, 255,255,255), 0.3); border-radius:16px; padding:30px; text-align:center; margin-bottom:24px; background:rgba(var(--renk-vurgu-rgb, 255,255,255), 0.02);">
          <span style="font-size:3rem; margin-bottom:10px; display:block;">📸</span>
          <p style="color:var(--renk-metin); font-weight:700; margin-bottom:8px; font-size:1.1rem;">Re\xe7ete Fotoğrafı</p>
          <p style="color:var(--renk-alt); font-size:0.95rem; margin:0;">Re\xe7etenizin net bir fotoğrafını WhatsApp \xfczerinden g\xf6ndereceksiniz.</p>
        </div>

        <button onclick="riGonder()" style="width:100%; background:#25d366; color:#fff; border:none; padding:22px; border-radius:16px; font-weight:800; font-size:1.2rem; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s; box-shadow:0 15px 30px rgba(37,211,102, 0.2);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 20px 40px rgba(37,211,102, 0.3)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 15px 30px rgba(37,211,102, 0.2)';">
          💬 WhatsApp ile G\xf6nder
        </button>
        <p style="color:var(--renk-alt); font-size:0.8rem; text-align:center; margin-top:20px; opacity:0.8;">🛡️ Bilgileriniz KVKK kapsamında yalnızca sağlık ama\xe7lı işlenir.</p>
    </div>
  </div>
</section>
<script>
  function riGonder(){
    var a=document.getElementById('ri-ad').value;
    var t=document.getElementById('ri-tel').value;
    if(!a||!t){alert('L\xfctfen ad ve telefon bilginizi girin.');return;}
    var txt = encodeURIComponent('Merhaba, Re\xe7etemi iletmek istiyorum.\\nAd: '+a+'\\nTel: '+t+'\\n(Re\xe7ete fotoğrafımı birazdan g\xf6ndereceğim)');
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+txt, '_blank');
  }
</script>`},{id:"ilac-hatirlatici",ad:"İlaç Hatırlatıcı",aciklama:"Eczane: İlaç saatini hatırlatma bilgi alanı",minPaket:"STANDART",htmlBlok:"İlaç hatırlatıcı tanıtım + CTA",geminiTalimat:'İlaç hatırlatıcı bölümü ekle. Kısa açıklama: "Kronik ilaç kullanıyorsanız hatırlatma hizmetimizden faydalanabilirsiniz." CTA butonu: "Hatırlatıcı Kaydı İçin WhatsApp" wa.me linki. Görsel olarak basit bir saat veya takvim ikonu kullan. Form yok; sadece bilgilendirme ve yönlendirme.'},{id:"sasi-parca-sorgulama",ad:"Şasi No ile Parça Sorgulama",aciklama:"Oto servis: Şasi/VIN ile parça bilgisi (placeholder)",minPaket:"BUYUME",htmlBlok:"Şasi/VIN input + sorgula CTA",geminiTalimat:'Oto servis için "Parça Sorgulama" bölümü ekle. Başlık: "Şasi numaranızla parça sorgulayın". Input: Şasi/VIN (17 karakter placeholder). "Sorgula" butonu. Alt metin: "Sorgulama sonucu için size dönüş yapacağız" ve "WhatsApp ile Sorgula" wa.me butonu. Gerçek API bağlantısı yok; sadece form ve CTA.'},{id:"qr-menu",ad:"QR Menü Entegrasyonu",aciklama:"Restoran/Kafe: QR ile menüye yönlendirme",minPaket:"STANDART",htmlBlok:"QR menü CTA + menü linki alanı",geminiTalimat:"QR Menü bölümü için aşağıdaki htmlSablon şablonunu kullan.",htmlSablon:`<section id="qr-menu" style="padding:100px 20px; background:var(--renk-kart); position:relative; overflow:hidden;">
  <div style="position:absolute; top:-50%; left:-10%; width:60%; height:200%; background:radial-gradient(ellipse at center, rgba(var(--renk-metin-rgb, 255,255,255), 0.03) 0%, transparent 70%); transform:rotate(-15deg); pointer-events:none;"></div>
  <div style="max-width:900px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:50px; text-align:center;">
    <div style="background:#fff; padding:24px; border-radius:36px; box-shadow:0 30px 60px rgba(0,0,0,0.15); transform:rotate(-4deg); transition:transform 0.4s;" onmouseover="this.style.transform='rotate(0deg) scale(1.05)';" onmouseout="this.style.transform='rotate(-4deg) scale(1)';">
      <div style="width:220px; height:220px; background:repeating-linear-gradient(45deg, #000, #000 12px, #fff 12px, #fff 24px); border-radius:24px; display:flex; align-items:center; justify-content:center; position:relative;">
        <div style="position:absolute; inset:24px; background:#fff; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:3.5rem; font-weight:900; color:#000;">QR</div>
      </div>
    </div>
    <div style="flex:1; min-width:300px; text-align:left; max-width:440px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 2.8rem); margin-bottom:16px; line-height:1.2;">Dijital Men\xfcm\xfcz\xfc Keşfedin</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem; line-height:1.6; margin-bottom:30px;">Kameranızı a\xe7ın, masanızdaki QR kodu okutun veya hemen aşağıdaki butona tıklayarak en g\xfcncel lezzetlerimize anında ulaşın.</p>
      <a href="#menu" style="display:inline-block; background:var(--renk-metin); color:var(--renk-arkaplan); text-decoration:none; padding:18px 40px; border-radius:50px; font-weight:800; font-size:1.1rem; transition:transform 0.3s, box-shadow 0.3s; box-shadow:0 15px 30px rgba(0,0,0,0.2);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 15px 30px rgba(0,0,0,0.2)';">
        Men\xfcy\xfc İncele →
      </a>
    </div>
  </div>
  <style>
    @media (max-width: 768px) { #qr-menu > div > div:nth-child(2) { text-align:center !important; } }
  </style>
</section>`},{id:"masadan-siparis",ad:"Masadan Sipariş Linki",aciklama:"Restoran/Kafe: Masadaki müşteri sipariş için link",minPaket:"STANDART",htmlBlok:"Masadan sipariş CTA butonları",geminiTalimat:'"Masadan Sipariş" bölümü için aşağıdaki htmlSablon şablonunu kullan. WHATSAPP_NUMARA bilgisini unutma.',htmlSablon:`<section id="masadan-siparis" style="padding:80px 20px; margin:40px 20px; background:linear-gradient(135deg, var(--renk-vurgu), rgba(0,0,0,0.8)); border-radius:40px; text-align:center; position:relative; overflow:hidden; box-shadow:0 30px 60px rgba(0,0,0,0.15);">
  <div style="max-width:600px; margin:0 auto; position:relative; z-index:2;">
    <h2 style="font-family:var(--font-baslik); color:#fff; font-size:clamp(2rem, 4vw, 2.8rem); margin-bottom:12px;">Masadan Sipariş Ver</h2>
    <p style="color:rgba(255,255,255,0.85); font-size:1.15rem; margin-bottom:40px;">Sıra beklemeden, masa numaranızı yazarak siparişinizi anında mutfağa iletin.</p>
    
    <div style="background:rgba(255,255,255,0.1); backdrop-filter:blur(10px); padding:8px; border-radius:24px; display:flex; margin-bottom:30px; border:1px solid rgba(255,255,255,0.2);">
      <input type="text" id="ms-masa" placeholder="Masa No (\xd6rn: 12)" style="flex:1; background:transparent; border:none; color:#fff; font-size:1.2rem; padding:12px 20px; outline:none; text-align:center; font-weight:800;" />
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:20px;">
      <button onclick="msWhatsApp()" style="background:#25d366; color:#fff; border:none; padding:18px; border-radius:20px; font-weight:800; font-size:1.1rem; cursor:pointer; transition:transform 0.3s; box-shadow:0 15px 30px rgba(37,211,102,0.3);" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
        💬 WhatsApp ile Sipariş
      </button>
      <button onclick="msGarson()" style="background:#fff; color:#000; border:none; padding:18px; border-radius:20px; font-weight:800; font-size:1.1rem; cursor:pointer; transition:transform 0.3s; box-shadow:0 15px 30px rgba(0,0,0,0.15);" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
        🙋 Garson \xc7ağır
      </button>
    </div>
  </div>
</section>
<script>
  function msWhatsApp(){
    var m=document.getElementById('ms-masa').value;
    if(!m){alert('L\xfctfen masa numaranızı girin.');return;}
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent('Merhaba, Masa '+m+' i\xe7in sipariş vermek istiyorum.'),'_blank');
  }
  function msGarson(){
    var m=document.getElementById('ms-masa').value;
    if(!m){alert('L\xfctfen masa numaranızı girin.');return;}
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent('Merhaba, Masa '+m+' ile ilgilenebilir misiniz? L\xfctfen garson y\xf6nlendirin.'),'_blank');
  }
</script>`},{id:"seviye-tespit-formu",ad:"Ücretsiz Seviye Tespit Sınavı",aciklama:"Eğitim: Seviye tespit / deneme sınavı formu",minPaket:"STANDART",htmlBlok:"Seviye tespit başvuru formu",geminiTalimat:'Kurs/eğitim için "Ücretsiz Seviye Tespit" bölümü ekle.',htmlSablon:`<section id="seviye-tespit" style="padding:100px 20px; background:linear-gradient(135deg, var(--renk-kart), var(--renk-arkaplan));">
  <div style="max-width:640px; margin:0 auto">
    <div style="text-align:center; margin-bottom:40px;">
      <span style="background:rgba(var(--renk-vurgu-rgb, 255,255,255), 0.1); color:var(--renk-vurgu); padding:6px 16px; border-radius:20px; font-weight:800; font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase;">\xdccretsiz Analiz</span>
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 2.8rem); margin:16px 0 12px;">Seviye Tespit Sınavı</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Mevcut durumunuzu analiz edip size en uygun yol haritasını \xfccretsiz \xe7izelim.</p>
    </div>
    <div style="background:var(--renk-kart); padding:40px; border-radius:32px; box-shadow:0 25px 50px rgba(0,0,0,0.08); border:1px solid rgba(255,255,255,0.05);">
        <input type="text" id="st-ad" placeholder="Adınız Soyadınız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.1rem; outline:none; margin-bottom:16px; font-weight:600; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
        
        <input type="tel" id="st-tel" placeholder="Telefon Numaranız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.1rem; outline:none; margin-bottom:16px; font-weight:600; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />

        <select id="st-alan" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.1rem; outline:none; margin-bottom:24px; font-weight:600; cursor:pointer; box-sizing:border-box; transition:border 0.3s;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'">
          <option value="" style="color:#000">Hangi Alan/Branş?</option>
          <option style="color:#000">Yabancı Dil Eğitimleri</option>
          <option style="color:#000">Sınav Hazırlık Grubu</option>
          <option style="color:#000">Genel Değerlendirme</option>
        </select>

        <button onclick="stGonder()" style="width:100%; background:var(--renk-metin); color:var(--renk-arkaplan); border:none; padding:22px; border-radius:16px; font-weight:800; font-size:1.2rem; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s; box-shadow:0 15px 30px rgba(0,0,0, 0.15);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 20px 40px rgba(0,0,0, 0.25)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 15px 30px rgba(0,0,0, 0.15)';">
          🎓 Talebi G\xf6nder
        </button>
        <p style="color:var(--renk-alt); font-size:0.9rem; text-align:center; margin-top:20px; font-weight:500;">Uzmanlarımız en kısa s\xfcrede sizinle iletişime ge\xe7ecek.</p>
    </div>
  </div>
</section>
<script>
  function stGonder(){
    var a=document.getElementById('st-ad').value;
    var t=document.getElementById('st-tel').value;
    var c=document.getElementById('st-alan').value;
    if(!a||!t||!c){alert('L\xfctfen ad, telefon ve alan bilgisini girin.');return;}
    var txt = encodeURIComponent('\xdccretsiz Seviye Tespit Talebi:\\nAd: '+a+'\\nTel: '+t+'\\nAlan: '+c);
    window.open('https://wa.me/90WHATSAPP_NUMARA?text='+txt, '_blank');
  }
</script>`},{id:"oncesi-sonrasi-slider",ad:"Öncesi / Sonrası (Before/After) Slider",aciklama:"Güzellik/Kuaför: Önce-sonra görsel karşılaştırma",minPaket:"STANDART",htmlBlok:"Before/After slider bölümü",geminiTalimat:"Önce/Sonra (Before/After) slider bölümü ekle.",htmlSablon:`<section id="oncesi-sonrasi" style="padding:100px 20px; background:var(--renk-kart);">
  <div style="max-width:800px; margin:0 auto; text-align:center;">
    <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">Değişimi G\xf6r\xfcn</h2>
    <p style="color:var(--renk-alt); font-size:1.15rem; margin-bottom:50px;">\xd6ncesi ve sonrası d\xf6n\xfcş\xfcmlerimiz.</p>
    
    <div style="position:relative; width:100%; max-width:800px; aspect-ratio:16/9; border-radius:24px; overflow:hidden; box-shadow:0 30px 60px rgba(0,0,0,0.15);" id="ba-container">
      <img src="https://images.unsplash.com/photo-1562282247-a8b2dfa4db95?w=800&q=80" alt="\xd6ncesi" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; pointer-events:none; filter:grayscale(0.8);"/>
      <div id="ba-after" style="position:absolute; top:0; left:0; height:100%; width:50%; overflow:hidden; border-right:4px solid #fff; pointer-events:none;">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Sonrası" style="height:100%; width:800px; max-width:800px; object-fit:cover;"/>
      </div>
      <div id="ba-handle" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:48px; height:48px; background:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 20px rgba(0,0,0,0.3); pointer-events:none; z-index:10;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg); position:absolute;"><path d="M15 18l-6-6 6-6"/></svg>
      </div>
      <input type="range" min="0" max="100" value="50" id="ba-slider" style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; cursor:ew-resize;" oninput="document.getElementById('ba-after').style.width=this.value+'%'; document.getElementById('ba-handle').style.left=this.value+'%';"/>
    </div>
  </div>
</section>`},{id:"canli-destek",ad:"Hızlı Canlı Destek Butonu",aciklama:"Kayan, her sayfada görünen canlı destek/soru balonu",minPaket:"TEMEL",htmlBlok:"Sabit pozisyonlu canlı destek CTA",geminiTalimat:"Canlı destek widget'ını ekle.",htmlSablon:`<div id="canli-destek-widget" style="position:fixed; bottom:30px; right:30px; z-index:9998; font-family:var(--font-metin);">
  <!-- Chat Popup -->
  <div id="cd-popup" style="display:none; width:320px; background:var(--renk-kart); border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.05); overflow:hidden; margin-bottom:16px; transform-origin:bottom right; animation:pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
    <div style="background:var(--renk-vurgu); padding:20px; color:#fff; display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; align-items:center; gap:12px;">
        <div style="width:10px; height:10px; background:#4ade80; border-radius:50%; box-shadow:0 0 10px #4ade80;"></div>
        <h3 style="margin:0; font-size:1.1rem; font-weight:800;">Canlı Destek</h3>
      </div>
      <button onclick="document.getElementById('cd-popup').style.display='none'" style="background:transparent; border:none; color:#fff; font-size:1.5rem; cursor:pointer; opacity:0.8;">\xd7</button>
    </div>
    <div style="padding:24px;">
      <p style="color:var(--renk-metin); font-size:0.95rem; line-height:1.5; margin:0 0 20px;">Merhaba! 👋<br>Size nasıl yardımcı olabiliriz?<br/>Hemen uzmanımızla g\xf6r\xfcş\xfcn.</p>
      <a href="https://wa.me/90WHATSAPP_NUMARA?text=Merhaba,%20sitenizden%20ula%C5%9F%C4%B1yorum" target="_blank" style="display:block; background:#25d366; color:#fff; text-align:center; padding:14px; border-radius:12px; font-weight:800; text-decoration:none; font-size:1rem; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        💬 WhatsApp ile Sor
      </a>
      <p style="text-align:center; color:var(--renk-alt); font-size:0.75rem; margin:16px 0 0;">Ortalama yanıt s\xfcresi: <strong style="color:var(--renk-metin);">5 dakika</strong></p>
    </div>
  </div>
  <!-- Floating Button -->
  <button onclick="var p=document.getElementById('cd-popup'); p.style.display=p.style.display==='none'?'block':'none';" style="width:64px; height:64px; border-radius:32px; background:var(--renk-vurgu); color:#fff; display:flex; align-items:center; justify-content:center; text-decoration:none; box-shadow:0 10px 30px rgba(var(--renk-vurgu-rgb, 0,0,0), 0.4); border:none; cursor:pointer; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.1)';" onmouseout="this.style.transform='scale(1)';">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"></path></svg>
  </button>
</div>
<style>
@keyframes pop-in { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
</style>`},{id:"sss-genis",ad:"Sıkça Sorulan Sorular (SSS)",aciklama:"Müşterilerinizin en çok merak ettiği soruların akordiyon menüsü",minPaket:"STANDART",htmlBlok:"Akordiyon tabanlı SSS bölümü",geminiTalimat:"SSS bölümü (Sıkça Sorulan Sorular) ekle.",htmlSablon:`<section id="sss" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:800px; margin:0 auto">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">Sık\xe7a Sorulan Sorular</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Merak ettiğiniz t\xfcm detaylar i\xe7in hızlı yanıtlar.</p>
    </div>
    <div style="display:grid; gap:16px;" id="sss-listesi">
      <!-- Generated by JS -->
    </div>
  </div>
</section>
<script>
  setTimeout(function(){
    var sssList=document.getElementById('sss-listesi');
    if(!sssList) return;
    var sssData=[
      {s:'Hizmet s\xfcreci nasıl işliyor?', c:'İlk g\xf6r\xfcşme sonrasında detaylı ihtiya\xe7 analizi yapıyoruz. Onayınız ile birlikte projelendirme aşamasına ge\xe7iyor ve taahh\xfct ettiğimiz tarihte işleme başlıyoruz.'},
      {s:'\xdccretlendirme politikalarınız nelerdir?', c:'Fiyatlandırmamız projenin kapsamına, kullanılacak materyale ve s\xfcreye g\xf6re tamamen şeffaf bir şekilde belirlenir.'},
      {s:'Ne kadar s\xfcrede teslimat veya işlem yapıyorsunuz?', c:'Standart teslimatlar ortalama 1-5 iş g\xfcn\xfc i\xe7erisinde, daha profesyonel hizmetler ise karşılıklı belirlenen iş planı doğrultusunda tamamlanır.'}
    ];
    sssList.innerHTML = sssData.map(function(item, idx){
      return '<div style="background:var(--renk-kart); border-radius:16px; border:1px solid rgba(255,255,255,0.03); overflow:hidden;"><button onclick="var d=this.nextElementSibling; var i=this.querySelector(\\'svg\\'); if(d.style.maxHeight){d.style.maxHeight=null; i.style.transform=\\'rotate(0deg)\\';}else{d.style.maxHeight=d.scrollHeight+\\'px\\'; i.style.transform=\\'rotate(180deg)\\';}" style="width:100%; display:flex; justify-content:space-between; align-items:center; padding:24px; background:transparent; border:none; color:var(--renk-metin); font-size:1.1rem; font-weight:700; cursor:pointer; text-align:left;"><span>'+item.s+'</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transition:transform 0.3s;"><path d="M6 9l6 6 6-6"/></svg></button><div style="max-height:0; overflow:hidden; transition:max-height 0.3s ease-out;"><div style="padding:0 24px 24px 24px; color:var(--renk-alt); line-height:1.6; font-size:0.95rem;">'+item.c+'</div></div></div>';
    }).join('');
  }, 100);
</script>`},{id:"ekip-uyeleri",ad:"Ekibimiz & Ustalarımız",aciklama:"Çalışan personeli veya ustaları tanıtan güven verici profil kartları",minPaket:"BUYUME",htmlBlok:"Fotoğraflı ekip biyografi gridi",geminiTalimat:'"Ekibimiz" bölümü ekle.',htmlSablon:`<section id="ekip" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:1200px; margin:0 auto;">
    <div style="text-align:center; margin-bottom:50px;">
      <span style="background:rgba(var(--renk-vurgu-rgb, 255,255,255), 0.1); color:var(--renk-vurgu); padding:6px 16px; border-radius:20px; font-weight:800; font-size:0.85rem; text-transform:uppercase;">Uzman Kadromuz</span>
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin:16px 0 12px;">Ekibimizle Tanışın</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Her biri alanında deneyimli, işini severek yapan uzmanlarımız.</p>
    </div>
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:30px;" id="ekip-grid">
      <!-- Generated by JS -->
    </div>
  </div>
</section>
<script>
  setTimeout(function(){
    var eGrid = document.getElementById('ekip-grid');
    if(!eGrid) return;
    var eData = [
      { n:'Ahmet Yılmaz', role:'Baş Uzman / Kurucu', img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
      { n:'Ayşe Demir', role:'Kıdemli Uzman', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
      { n:'Can Kaya', role:'Proje Y\xf6neticisi', img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' }
    ];
    eGrid.innerHTML = eData.map(function(k){
      return '<div style="background:var(--renk-kart); border-radius:32px; padding:30px; text-align:center; box-shadow:0 20px 40px rgba(0,0,0,0.05); transition:transform 0.3s; cursor:default;" onmouseover="this.style.transform=\\'translateY(-10px)\\'" onmouseout="this.style.transform=\\'translateY(0)\\'"><div style="width:160px; height:160px; border-radius:50%; overflow:hidden; margin:0 auto 20px; border:4px solid rgba(255,255,255,0.05);"><img src="'+k.img+'" style="width:100%; height:100%; object-fit:cover;" alt="'+k.n+'"/></div><h3 style="color:var(--renk-metin); font-size:1.4rem; font-family:var(--font-baslik); margin:0 0 6px;">'+k.n+'</h3><p style="color:var(--renk-vurgu); font-weight:700; font-size:0.95rem; margin:0;">'+k.role+'</p></div>';
    }).join('');
  }, 100);
</script>`},{id:"harita-yol-tarifi",ad:"Harita & Yol Tarifi",aciklama:"Google Maps harita + tek tıkla yol tarifi butonu",minPaket:"TEMEL",htmlBlok:"Harita embed + yol tarifi CTA",geminiTalimat:"Harita ve yol tarifi bölümü için aşağıdaki htmlSablon şablonunu kullan. ISLETME_ADI, ADRES_METNI ve HARITA_QUERY değerlerini esnafın bilgileriyle doldur. HARITA_QUERY: işletme adı + şehir + ilçe (URL encoded). CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="konum" style="padding:60px 20px">
  <div style="max-width:640px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">📍 Bizi Bulun</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:24px;font-size:0.95rem">ADRES_METNI</p>
    <div style="border-radius:14px;overflow:hidden;margin-bottom:16px;border:2px solid rgba(255,255,255,0.08)">
      <iframe src="https://www.google.com/maps?q=HARITA_QUERY&output=embed" width="100%" height="300" style="border:0" loading="lazy" allowfullscreen></iframe>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="https://www.google.com/maps/search/?api=1&query=HARITA_QUERY" target="_blank" style="background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:700;font-size:0.95rem">🗺️ Yol Tarifi Al</a>
      <a href="tel:TELEFON" style="background:rgba(255,255,255,0.1);color:var(--renk-metin);text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:700;font-size:0.95rem">📞 Hemen Ara</a>
    </div>
  </div>
</section>`},{id:"calisma-saatleri",ad:"Çalışma Saatleri",aciklama:'Haftalık çalışma saatleri + canlı "Açık/Kapalı" göstergesi',minPaket:"TEMEL",htmlBlok:"Haftalık saat tablosu + canlı durum badge",geminiTalimat:'Çalışma saatleri bölümü için aşağıdaki htmlSablon şablonunu kullan. SAATLER_JSON: sektöre uygun gerçekçi çalışma saatleri JSON verisi — format: [{"gun":"Pazartesi","acilis":"09:00","kapanis":"18:00"},{"gun":"Pazar","acilis":null,"kapanis":null}]. Pazar genelde kapalı. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="saatler" style="padding:60px 20px">
  <div style="max-width:480px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">⏰ \xc7alışma Saatleri</h2>
    <div id="acik-kapali" style="text-align:center;margin-bottom:20px"></div>
    <div id="saat-listesi" style="display:grid;gap:6px"></div>
  </div>
</section>
<script>
var SAATLER=SAATLER_JSON;
var gunler=['Pazar','Pazartesi','Salı','\xc7arşamba','Perşembe','Cuma','Cumartesi'];
var bugun=new Date().getDay();
var bugunAdi=gunler[bugun];
function saatKontrol(){
  var s=SAATLER.find(function(x){return x.gun===bugunAdi;});
  var badge=document.getElementById('acik-kapali');
  if(!s||!s.acilis){badge.innerHTML='<span style="background:#c62828;color:#fff;padding:6px 16px;border-radius:20px;font-size:0.85rem;font-weight:700">🔴 Bug\xfcn Kapalı</span>';return;}
  var simdi=new Date();
  var saat=String(simdi.getHours()).padStart(2,'0')+':'+String(simdi.getMinutes()).padStart(2,'0');
  var acik=saat>=s.acilis&&saat<=s.kapanis;
  badge.innerHTML=acik?'<span style="background:#2e7d32;color:#fff;padding:6px 16px;border-radius:20px;font-size:0.85rem;font-weight:700">🟢 Şu An A\xe7ık — '+s.kapanis+"'e kadar</span>":'<span style="background:#c62828;color:#fff;padding:6px 16px;border-radius:20px;font-size:0.85rem;font-weight:700">🔴 Şu An Kapalı</span>';
}
function saatListeRender(){
  var el=document.getElementById('saat-listesi');
  el.innerHTML=SAATLER.map(function(s){
    var aktif=s.gun===bugunAdi;
    return '<div style="display:flex;justify-content:space-between;padding:10px 14px;border-radius:8px;'+(aktif?'background:rgba(255,255,255,0.08);border-left:3px solid var(--renk-vurgu)':'')+'">'+'<span style="color:'+(aktif?'var(--renk-metin)':'var(--renk-alt)')+';font-weight:'+(aktif?'700':'400')+'">'+s.gun+'</span>'+'<span style="color:'+(s.acilis?'var(--renk-metin)':'var(--renk-alt)')+';font-weight:'+(aktif?'700':'400')+'">'+(s.acilis?s.acilis+' — '+s.kapanis:'Kapalı')+'</span></div>';
  }).join('');
}
saatKontrol();saatListeRender();
</script>`},{id:"whatsapp-teklif",ad:"WhatsApp Teklif Al",aciklama:'Sabit "Ücretsiz Teklif Al" butonu — tek tıkla WhatsApp',minPaket:"TEMEL",htmlBlok:"Sticky bottom teklif CTA",geminiTalimat:"WhatsApp teklif butonu için aşağıdaki htmlSablon şablonunu kullan. WHATSAPP_NUMARA: esnafın telefonTemiz değeri. HIZMET_DROPDOWN: sektöre uygun 4-6 hizmet seçeneği <option> olarak. ISLETME_ADI: esnaf adı. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<div id="teklif-bar" style="position:fixed;bottom:0;left:0;right:0;background:var(--renk-kart);border-top:1px solid rgba(255,255,255,0.1);padding:12px 16px;z-index:999;display:flex;gap:8px;align-items:center;justify-content:center;backdrop-filter:blur(10px)">
  <select id="tb-hizmet" style="flex:1;max-width:200px;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.07);color:var(--renk-metin);font-size:0.85rem">
    <option value="Genel Bilgi">Hizmet Se\xe7in</option>
    HIZMET_DROPDOWN
  </select>
  <button onclick="teklifGonder()" style="background:var(--renk-vurgu);color:#fff;border:none;padding:10px 20px;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer;white-space:nowrap">💰 Teklif Al</button>
</div>
<div style="height:60px"></div>
<script>
function teklifGonder(){
  var h=document.getElementById('tb-hizmet').value;
  var msg=encodeURIComponent('Merhaba, ISLETME_ADI hakkında bilgi almak istiyorum.
İlgilendiğim hizmet: '+h);
  window.open('https://wa.me/90WHATSAPP_NUMARA?text='+msg,'_blank');
}
</script>`},{id:"google-yorumlar",ad:"Google Yorum Widget",aciklama:"Mevcut müşteri yorumları + Google'da yorum bırakma CTA",minPaket:"STANDART",htmlBlok:"Yorum kartları carousel + değerlendirme CTA",geminiTalimat:'Google yorum widget bölümü için aşağıdaki htmlSablon şablonunu kullan. YORUMLAR_JSON: sektöre uygun 4-6 adet gerçekçi müşteri yorumu — format: [{"ad":"Ahmet K.","yildiz":5,"yorum":"...","sure":"2 hafta önce"},{...}]. Yıldızlar 4 veya 5 olsun. GMB_LINK: esnafın Google Places ID\'sine göre yorum bırakma linki (yoksa # koy). CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="yorumlar" style="padding:60px 20px">
  <div style="max-width:720px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:4px">⭐ M\xfcşterilerimiz Ne Diyor?</h2>
    <div id="yorum-puan" style="text-align:center;margin-bottom:24px"></div>
    <div id="yorum-kartlari" style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))"></div>
    <div style="text-align:center;margin-top:24px">
      <a href="GMB_LINK" target="_blank" style="background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:700;font-size:0.95rem;display:inline-block">⭐ Google'da Bizi Değerlendirin</a>
    </div>
  </div>
</section>
<script>
var YORUMLAR=YORUMLAR_JSON;
function yorumRender(){
  var ort=(YORUMLAR.reduce(function(t,y){return t+y.yildiz;},0)/YORUMLAR.length).toFixed(1);
  document.getElementById('yorum-puan').innerHTML='<span style="color:var(--renk-vurgu);font-size:1.4rem;font-weight:700">'+ort+'</span><span style="color:var(--renk-alt);font-size:0.9rem"> / 5 — '+YORUMLAR.length+' değerlendirme</span>';
  document.getElementById('yorum-kartlari').innerHTML=YORUMLAR.map(function(y){
    var yildizlar='';
    for(var i=0;i<5;i++) yildizlar+=i<y.yildiz?'⭐':'';
    return '<div style="background:var(--renk-kart);border-radius:14px;padding:20px">'+'<div style="display:flex;justify-content:space-between;margin-bottom:8px">'+'<span style="color:var(--renk-metin);font-weight:700;font-size:0.9rem">'+y.ad+'</span>'+'<span style="font-size:0.75rem">'+yildizlar+'</span></div>'+'<p style="color:var(--renk-alt);font-size:0.85rem;margin:0 0 6px;line-height:1.5">"'+y.yorum+'"</p>'+'<p style="color:var(--renk-alt);font-size:0.7rem;margin:0;opacity:0.6">'+y.sure+'</p></div>';
  }).join('');
}
yorumRender();
</script>`},{id:"kampanya-afisi",ad:"Kampanya & İndirim Afişi",aciklama:"Dinamik kampanya banner + geri sayım + WhatsApp CTA",minPaket:"STANDART",htmlBlok:"Vurgulu kampanya kartı ve sayaç",geminiTalimat:"Kampanya afişi bölümü için aşağıdaki htmlSablon şablonunu kullan. KAMPANYA_BASLIK, KAMPANYA_ACIKLAMA, INDIRIM_YUZDESI değerlerini sektöre uygun gerçekçi bir kampanyayla doldur. BITIS_TARIHI: bugünden 7-14 gün sonrası ISO format (YYYY-MM-DD). WHATSAPP_NUMARA ve ISLETME_ADI: esnaf bilgileri. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="kampanya" style="padding:40px 20px">
  <div style="max-width:580px;margin:0 auto;background:linear-gradient(135deg,var(--renk-vurgu),rgba(192,75,30,0.7));border-radius:18px;padding:28px;text-align:center;position:relative;overflow:hidden">
    <div style="position:absolute;top:-20px;right:-20px;width:100px;height:100px;background:rgba(255,255,255,0.1);border-radius:50%"></div>
    <p style="font-size:2.5rem;font-weight:900;color:#fff;margin:0 0 4px">%INDIRIM_YUZDESI</p>
    <h3 style="color:#fff;font-size:1.3rem;font-weight:700;margin:0 0 8px">KAMPANYA_BASLIK</h3>
    <p style="color:rgba(255,255,255,0.85);font-size:0.9rem;margin:0 0 20px">KAMPANYA_ACIKLAMA</p>
    <div id="kmp-sayac" style="display:flex;gap:12px;justify-content:center;margin-bottom:20px"></div>
    <button onclick="kampanyaTeklif()" style="background:#fff;color:var(--renk-vurgu);border:none;padding:14px 32px;border-radius:12px;font-weight:800;font-size:1rem;cursor:pointer">🎯 Kampanyadan Faydalanın</button>
  </div>
</section>
<script>
var bitisTarihi=new Date('BITIS_TARIHI').getTime();
function sayacGuncelle(){
  var fark=bitisTarihi-Date.now();
  if(fark<=0){document.getElementById('kmp-sayac').innerHTML='<span style="color:#fff;font-weight:700">Kampanya Sona Erdi</span>';return;}
  var g=Math.floor(fark/86400000),s=Math.floor((fark%86400000)/3600000),d=Math.floor((fark%3600000)/60000);
  var kutu=function(v,l){return '<div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:10px 14px;min-width:60px"><p style="color:#fff;font-size:1.4rem;font-weight:900;margin:0">'+v+'</p><p style="color:rgba(255,255,255,0.7);font-size:0.65rem;margin:2px 0 0">'+l+'</p></div>';};
  document.getElementById('kmp-sayac').innerHTML=kutu(g,'G\xdcN')+kutu(s,'SAAT')+kutu(d,'DAK');
}
setInterval(sayacGuncelle,60000);sayacGuncelle();
function kampanyaTeklif(){
  var msg=encodeURIComponent('Merhaba, ISLETME_ADI kampanyasından faydalanmak istiyorum!
Kampanya: KAMPANYA_BASLIK');
  window.open('https://wa.me/90WHATSAPP_NUMARA?text='+msg,'_blank');
}
</script>`},{id:"musteri-referanslari",ad:"Müşteri Referansları",aciklama:"Memnun müşteri yorumları — güven artıran sosyal kanıt",minPaket:"STANDART",htmlBlok:"Testimonial kartları carousel",geminiTalimat:'Müşteri referansları bölümü için aşağıdaki htmlSablon şablonunu kullan. REFERANSLAR_JSON: sektöre uygun 4-6 adet gerçekçi müşteri referansı — format: [{"ad":"Mehmet Y.","konum":"Kadıköy","yorum":"...","hizmet":"..."}]. Yorumlar samimi, inandırıcı ve sektöre özel olsun. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="referanslar" style="padding:60px 20px">
  <div style="max-width:720px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">💬 M\xfcşterilerimizden</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:28px;font-size:0.95rem">Bize g\xfcvenen m\xfcşterilerimizin g\xf6r\xfcşleri</p>
    <div id="ref-kartlari" style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))"></div>
  </div>
</section>
<script>
var REFERANSLAR=REFERANSLAR_JSON;
document.getElementById('ref-kartlari').innerHTML=REFERANSLAR.map(function(r){
  return '<div style="background:var(--renk-kart);border-radius:14px;padding:22px;border-left:3px solid var(--renk-vurgu)">'+'<p style="color:var(--renk-alt);font-size:0.9rem;line-height:1.6;margin:0 0 14px;font-style:italic">"'+r.yorum+'"</p>'+'<div style="display:flex;justify-content:space-between;align-items:center">'+'<div><p style="color:var(--renk-metin);font-weight:700;font-size:0.85rem;margin:0">'+r.ad+'</p>'+'<p style="color:var(--renk-alt);font-size:0.75rem;margin:2px 0 0">📍 '+r.konum+'</p></div>'+'<span style="background:rgba(255,255,255,0.08);padding:4px 10px;border-radius:8px;font-size:0.7rem;color:var(--renk-alt)">'+r.hizmet+'</span></div></div>';
}).join('');
</script>`},{id:"hakkimizda-hikaye",ad:"Hakkımızda & Hikayemiz",aciklama:"İşletme hikayesi, misyon ve kurucu bilgisi — güven inşa eder",minPaket:"TEMEL",htmlBlok:"Hikaye anlatımı + zaman çizgisi",geminiTalimat:"Hakkımızda bölümü için aşağıdaki htmlSablon şablonunu kullan. ISLETME_ADI, KURUCU_ADI, KURULUS_YILI, HIKAYE_METNI (2-3 cümle samimi hikaye), MISYON_METNI (1 cümle) değerlerini sektöre uygun gerçekçi içerikle doldur. Kuruluş yılı 2005-2020 arası olsun. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="hakkimizda" style="padding:60px 20px">
  <div style="max-width:640px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">Hikayemiz</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:32px;font-size:0.95rem">KURULUS_YILI'den beri hizmetinizdeyiz</p>
    <div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">
      <div style="flex:1;min-width:250px">
        <div style="width:64px;height:64px;border-radius:50%;background:var(--renk-vurgu);display:flex;align-items:center;justify-content:center;margin-bottom:16px">
          <span style="font-size:28px">🏠</span>
        </div>
        <h3 style="color:var(--renk-metin);font-size:1.1rem;margin:0 0 8px">ISLETME_ADI</h3>
        <p style="color:var(--renk-alt);font-size:0.9rem;line-height:1.7;margin:0 0 16px">HIKAYE_METNI</p>
        <div style="border-left:3px solid var(--renk-vurgu);padding-left:14px;margin-bottom:16px">
          <p style="color:var(--renk-metin);font-size:0.85rem;font-style:italic;margin:0">"MISYON_METNI"</p>
          <p style="color:var(--renk-alt);font-size:0.8rem;margin:6px 0 0">— KURUCU_ADI, Kurucu</p>
        </div>
      </div>
      <div style="flex:0 0 auto;display:grid;gap:10px">
        <div style="background:var(--renk-kart);border-radius:12px;padding:16px 20px;text-align:center">
          <p style="color:var(--renk-vurgu);font-size:1.8rem;font-weight:900;margin:0" id="yil-sayac">0</p>
          <p style="color:var(--renk-alt);font-size:0.75rem;margin:4px 0 0">Yıllık Tecr\xfcbe</p>
        </div>
        <div style="background:var(--renk-kart);border-radius:12px;padding:16px 20px;text-align:center">
          <p style="color:var(--renk-vurgu);font-size:1.8rem;font-weight:900;margin:0">⭐</p>
          <p style="color:var(--renk-alt);font-size:0.75rem;margin:4px 0 0">M\xfcşteri Memnuniyeti</p>
        </div>
      </div>
    </div>
  </div>
</section>
<script>
var yil=new Date().getFullYear()-KURULUS_YILI;
document.getElementById('yil-sayac').textContent=yil+'+';
</script>`},{id:"rakamlarla-biz",ad:"Rakamlarla Biz",aciklama:"Animasyonlu istatistik sayacı — müşteri sayısı, yıl, proje",minPaket:"STANDART",htmlBlok:"İstatistik kutusu gridi + sayma animasyonu",geminiTalimat:'Rakamlarla biz istatistik bölümü için aşağıdaki htmlSablon şablonunu kullan. ISTATISTIKLER_JSON: sektöre uygun 4 adet istatistik — format: [{"deger":500,"etiket":"Mutlu Müşteri","ikon":"👥"},{"deger":15,"etiket":"Yıl Tecrübe","ikon":"🏆"},...]. Rakamlar gerçekçi olsun. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="istatistikler" style="padding:60px 20px;background:var(--renk-kart)">
  <div style="max-width:720px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:32px">📊 Rakamlarla Biz</h2>
    <div id="stat-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px"></div>
  </div>
</section>
<script>
var STATS=ISTATISTIKLER_JSON;
function animasyonluSayac(el,hedef){
  var baslangic=0,sure=1500,adim=Math.ceil(hedef/60);
  var interval=setInterval(function(){
    baslangic+=adim;
    if(baslangic>=hedef){baslangic=hedef;clearInterval(interval);}
    el.textContent=baslangic.toLocaleString('tr-TR')+'+';  
  },sure/60);
}
var grid=document.getElementById('stat-grid');
grid.innerHTML=STATS.map(function(s,i){
  return '<div style="text-align:center;background:rgba(255,255,255,0.03);border-radius:14px;padding:24px 12px">'+'<p style="font-size:2rem;margin:0 0 4px">'+s.ikon+'</p>'+'<p class="stat-num" data-hedef="'+s.deger+'" style="color:var(--renk-vurgu);font-size:2rem;font-weight:900;margin:0">0</p>'+'<p style="color:var(--renk-alt);font-size:0.8rem;margin:6px 0 0">'+s.etiket+'</p></div>';
}).join('');
var gozlemci=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      document.querySelectorAll('.stat-num').forEach(function(el){
        animasyonluSayac(el,parseInt(el.dataset.hedef));
      });
      gozlemci.disconnect();
    }
  });
},{threshold:0.3});
gozlemci.observe(document.getElementById('stat-grid'));
</script>`},{id:"video-tanitim",ad:"Video Tanıtım",aciklama:"YouTube veya tanıtım videosu embed — dikkat çeker",minPaket:"STANDART",htmlBlok:"Video embed + başlık",geminiTalimat:'Video tanıtım bölümü için aşağıdaki htmlSablon şablonunu kullan. VIDEO_BASLIK ve VIDEO_ACIKLAMA: sektöre uygun başlık ve açıklama yaz. VIDEO_URL: placeholder olarak "https://www.youtube.com/embed/dQw4w9WgXcQ" kullan (işletme kendi videosunu sonra değiştirecek). CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="video" style="padding:60px 20px">
  <div style="max-width:640px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">🎥 VIDEO_BASLIK</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:24px;font-size:0.95rem">VIDEO_ACIKLAMA</p>
    <div style="position:relative;padding-bottom:56.25%;height:0;border-radius:14px;overflow:hidden;border:2px solid rgba(255,255,255,0.08)">
      <iframe src="VIDEO_URL" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy"></iframe>
    </div>
  </div>
</section>`},{id:"sertifika-belgeler",ad:"Sertifika & Belgeler",aciklama:"Yetkinlik belgeleri ve sertifikalar — profesyonellik kanıtı",minPaket:"BUYUME",htmlBlok:"Sertifika kartları gridi",geminiTalimat:'Sertifika ve belgeler bölümü için aşağıdaki htmlSablon şablonunu kullan. SERTIFIKALAR_JSON: sektöre uygun 3-5 adet sertifika — format: [{"baslik":"ISO 9001 Kalite Belgesi","kurum":"","yil":"2023","ikon":"🏅"}]. Sektöre göre gerçekçi belgeler kullan (usta belgesi, hijyen sertifikası, mesleki yeterlilik vb.). CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="sertifikalar" style="padding:60px 20px">
  <div style="max-width:640px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">🏅 Sertifika & Belgelerimiz</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:28px;font-size:0.95rem">Profesyonelliğimizin kanıtı</p>
    <div id="sertifika-grid" style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))"></div>
  </div>
</section>
<script>
var SERTIFIKALAR=SERTIFIKALAR_JSON;
document.getElementById('sertifika-grid').innerHTML=SERTIFIKALAR.map(function(s){
  return '<div style="background:var(--renk-kart);border-radius:14px;padding:20px;display:flex;gap:14px;align-items:center">'+'<div style="width:48px;height:48px;border-radius:12px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;flex-shrink:0">'+'<span style="font-size:24px">'+s.ikon+'</span></div>'+'<div><p style="color:var(--renk-metin);font-weight:700;font-size:0.9rem;margin:0">'+s.baslik+'</p>'+(s.kurum?'<p style="color:var(--renk-alt);font-size:0.75rem;margin:4px 0 0">'+s.kurum+'</p>':'')+'<p style="color:var(--renk-alt);font-size:0.7rem;margin:2px 0 0;opacity:0.7">📅 '+s.yil+'</p></div></div>';
}).join('');
</script>`},{id:"duyuru-bandi",ad:"Üst Duyuru Bandı",aciklama:"Sayfanın üstünde dikkat çeken duyuru bandı",minPaket:"TEMEL",htmlBlok:"Sabit üst banner + kapatma butonu",geminiTalimat:'Duyuru bandı için aşağıdaki htmlSablon şablonunu kullan. DUYURU_METNI: sektöre uygun kısa ve dikkat çekici duyuru (ör: "🎉 Yeni açıldık! İlk 50 müşteriye %20 indirim"). DUYURU_LINK: WhatsApp veya ilgili sayfa linki. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<div id="duyuru-bar" style="background:var(--renk-vurgu);color:#fff;text-align:center;padding:10px 40px 10px 16px;font-size:0.85rem;font-weight:600;position:relative;z-index:1000">
  <a href="DUYURU_LINK" style="color:#fff;text-decoration:none">DUYURU_METNI →</a>
  <button onclick="this.parentElement.style.display='none'" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;font-size:1.1rem">\xd7</button>
</div>`},{id:"eposta-bulteni",ad:"E-posta Bülteni",aciklama:"E-posta adresi toplama formu — müşteri listesi oluştur",minPaket:"BUYUME",htmlBlok:"Newsletter kaydı + başarı mesajı",geminiTalimat:"E-posta bülteni kayıt bölümü için aşağıdaki htmlSablon şablonunu kullan. BULTEN_BASLIK ve BULTEN_ACIKLAMA: sektöre uygun başlık ve açıklama. ESNAF_ID: esnaf ID. KEPENK_API_URL: API base URL. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="bulten" style="padding:60px 20px;background:var(--renk-kart)">
  <div style="max-width:480px;margin:0 auto;text-align:center">
    <p style="font-size:2.2rem;margin:0 0 8px">✉️</p>
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.5rem;margin:0 0 8px">BULTEN_BASLIK</h2>
    <p style="color:var(--renk-alt);font-size:0.9rem;margin:0 0 20px">BULTEN_ACIKLAMA</p>
    <div style="display:flex;gap:8px">
      <input type="email" id="bulten-email" placeholder="E-posta adresiniz" style="flex:1;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.07);color:var(--renk-metin);font-size:0.9rem;outline:none" />
      <button id="bulten-btn" onclick="bultenKayit()" style="background:var(--renk-vurgu);color:#fff;border:none;padding:12px 20px;border-radius:10px;font-weight:700;font-size:0.85rem;cursor:pointer;white-space:nowrap">📨 Abone Ol</button>
    </div>
    <div id="bulten-mesaj" style="display:none;margin-top:12px;padding:10px;border-radius:8px;font-size:0.85rem"></div>
  </div>
</section>
<script>
function bultenKayit(){
  var email=document.getElementById('bulten-email').value;
  var btn=document.getElementById('bulten-btn');
  var mesaj=document.getElementById('bulten-mesaj');
  if(!email||!email.includes('@')){alert('Ge\xe7erli bir e-posta girin');return;}
  btn.disabled=true;btn.textContent='Kaydediliyor...';
  fetch('KEPENK_API_URL/api/bulten',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({esnafId:'ESNAF_ID',email:email})
  }).then(function(r){return r.json()}).then(function(d){
    mesaj.style.display='block';
    mesaj.style.background='rgba(0,200,83,0.15)';mesaj.style.color='#00c853';
    mesaj.textContent='✅ Başarıyla abone oldunuz!';
    btn.textContent='✅ Kayıtlı';
  }).catch(function(){
    mesaj.style.display='block';
    mesaj.style.background='rgba(200,0,0,0.15)';mesaj.style.color='#ff5252';
    mesaj.textContent='Bir hata oluştu, tekrar deneyin.';
    btn.disabled=false;btn.textContent='📨 Abone Ol';
  });
}
</script>`},{id:"kvkk-gizlilik",ad:"KVKK & Gizlilik Politikası",aciklama:"Yasal zorunluluk — kişisel verilerin korunması metni",minPaket:"TEMEL",htmlBlok:"KVKK aydınlatma metni + gizlilik politikası",geminiTalimat:"KVKK ve gizlilik politikası bölümü için aşağıdaki htmlSablon şablonunu kullan. ISLETME_ADI ve ISLETME_ADRESI değerlerini esnaf bilgileriyle doldur. KVKK metnini Türk hukuk mevzuatına uygun şekilde yaz: veri sorumlusu, işlenen veriler, amaç, hukuki dayanak, haklar. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="kvkk" style="padding:60px 20px">
  <div style="max-width:640px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.5rem;text-align:center;margin-bottom:24px">🛡️ Gizlilik & KVKK Aydınlatma Metni</h2>
    <div style="background:var(--renk-kart);border-radius:14px;padding:24px;font-size:0.85rem;line-height:1.8;color:var(--renk-alt)">
      <h3 style="color:var(--renk-metin);font-size:1rem;margin:0 0 12px">Veri Sorumlusu</h3>
      <p>ISLETME_ADI (“Veri Sorumlusu”) olarak kişisel verilerinizin g\xfcvenliğine \xf6nem veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında bilgilendirilmeniz ama\xe7lanmaktadır.</p>
      <h3 style="color:var(--renk-metin);font-size:1rem;margin:16px 0 8px">İşlenen Kişisel Veriler</h3>
      <p>Ad-soyad, telefon numarası, e-posta adresi, adres bilgileri, hizmet talep detayları.</p>
      <h3 style="color:var(--renk-metin);font-size:1rem;margin:16px 0 8px">İşleme Ama\xe7ları</h3>
      <ul style="padding-left:18px;margin:0"><li>Hizmet taleplerinin karşılanması</li><li>Randevu ve iletişim y\xf6netimi</li><li>İletişim ve bilgilendirme</li><li>Yasal y\xfck\xfcml\xfcl\xfcklerin yerine getirilmesi</li></ul>
      <h3 style="color:var(--renk-metin);font-size:1rem;margin:16px 0 8px">Haklarınız</h3>
      <p>KVKK’nın 11. maddesi gereği; kişisel verilerinizin işlenip işlenmediğini \xf6ğrenme, d\xfczeltilmesini veya silinmesini isteme, \xfc\xe7\xfcnc\xfc kişilere aktarılıp aktarılmadığını \xf6ğrenme haklarına sahipsiniz.</p>
      <p style="margin-top:16px;font-size:0.8rem;opacity:0.7">İletişim: destek@kepenk.ai | ISLETME_ADRESI</p>
    </div>
  </div>
</section>`},{id:"cerez-bildirimi",ad:"Çerez Onay Bandı",aciklama:"Yasal zorunluluk — çerez kullanım onayı (GDPR/KVKK)",minPaket:"TEMEL",htmlBlok:"Altında çerez onay barı",geminiTalimat:"Çerez onay bandı için aşağıdaki htmlSablon şablonunu kullan. Değişiklik yapmadan direkt kullan, sadece CSS değişkenlerinin :root ile uyumlu olduğunu kontrol et.",htmlSablon:`<div id="cerez-bar" style="display:none;position:fixed;bottom:0;left:0;right:0;background:rgba(14,13,11,0.97);border-top:1px solid rgba(255,255,255,0.1);padding:16px 20px;z-index:9999;backdrop-filter:blur(12px)">
  <div style="max-width:720px;margin:0 auto;display:flex;gap:16px;align-items:center;flex-wrap:wrap">
    <p style="flex:1;color:var(--renk-alt);font-size:0.82rem;margin:0;min-width:200px">🍪 Bu site deneyiminizi geliştirmek i\xe7in \xe7erezler kullanır. Devam ederek <a href="#kvkk" style="color:var(--renk-vurgu);text-decoration:underline">gizlilik politikamızı</a> kabul etmiş sayılırsınız.</p>
    <div style="display:flex;gap:8px">
      <button onclick="cerezKabul()" style="background:var(--renk-vurgu);color:#fff;border:none;padding:8px 18px;border-radius:8px;font-weight:700;font-size:0.8rem;cursor:pointer">Kabul Et</button>
      <button onclick="cerezReddet()" style="background:rgba(255,255,255,0.08);color:var(--renk-alt);border:none;padding:8px 18px;border-radius:8px;font-size:0.8rem;cursor:pointer">Sadece Gerekli</button>
    </div>
  </div>
</div>
<script>
function cerezKabul(){localStorage.setItem('cerez_onay','kabul');document.getElementById('cerez-bar').style.display='none';}
function cerezReddet(){localStorage.setItem('cerez_onay','gerekli');document.getElementById('cerez-bar').style.display='none';}
if(!localStorage.getItem('cerez_onay')){document.getElementById('cerez-bar').style.display='block';}
</script>`},{id:"sosyal-medya",ad:"Sosyal Medya Bağlantıları",aciklama:"Tüm sosyal medya hesapları — tek yerden erişim",minPaket:"TEMEL",htmlBlok:"Sosyal medya ikon grid",geminiTalimat:"Sosyal medya bölümü için aşağıdaki htmlSablon şablonunu kullan. INSTAGRAM_URL, FACEBOOK_URL, YOUTUBE_URL, TIKTOK_URL, TWITTER_URL değerlerini esnaf bilgilerinden al. Yoksa # koy. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="sosyal" style="padding:40px 20px">
  <div style="max-width:480px;margin:0 auto;text-align:center">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.3rem;margin-bottom:16px">Bizi Takip Edin</h2>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <a href="INSTAGRAM_URL" target="_blank" style="width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:22px;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">📸</a>
      <a href="FACEBOOK_URL" target="_blank" style="width:50px;height:50px;border-radius:14px;background:#1877f2;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:22px;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">👤</a>
      <a href="YOUTUBE_URL" target="_blank" style="width:50px;height:50px;border-radius:14px;background:#ff0000;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:22px;transition:transform 0.2s" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">▶️</a>
      <a href="TIKTOK_URL" target="_blank" style="width:50px;height:50px;border-radius:14px;background:#010101;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:22px;border:1px solid rgba(255,255,255,0.15);transition:transform 0.2s" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">🎵</a>
      <a href="TWITTER_URL" target="_blank" style="width:50px;height:50px;border-radius:14px;background:#000;display:flex;align-items:center;justify-content:center;text-decoration:none;font-size:20px;font-weight:900;color:#fff;border:1px solid rgba(255,255,255,0.15);transition:transform 0.2s" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">𝕏</a>
    </div>
  </div>
</section>`},{id:"whatsapp-canli",ad:"WhatsApp Canlı Chat",aciklama:"Sabit yeşil WhatsApp balonu — 1 tıkla mesaj",minPaket:"TEMEL",htmlBlok:"Floating WhatsApp chat butonu",geminiTalimat:"WhatsApp canlı chat butonu için aşağıdaki htmlSablon şablonunu kullan. WHATSAPP_NUMARA: esnafın telefonTemiz değeri. ISLETME_ADI: esnaf adı. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<a id="wa-bubble" href="https://wa.me/90WHATSAPP_NUMARA?text=Merhaba%2C%20ISLETME_ADI%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum" target="_blank" style="position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.4);z-index:998;text-decoration:none;font-size:28px;transition:transform 0.2s,box-shadow 0.2s;animation:waPulse 2s infinite" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">💬</a>
<style>@keyframes waPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.4)}50%{box-shadow:0 4px 30px rgba(37,211,102,0.7)}}</style>`},{id:"blog-makaleler",ad:"Blog & Makaleler",aciklama:"SEO güçlendiren içerik bölümü — makale kartları",minPaket:"BUYUME",htmlBlok:"Blog yazı kartları gridi",geminiTalimat:'Blog bölümü için aşağıdaki htmlSablon şablonunu kullan. MAKALELER_JSON: sektöre uygun 3 adet blog makale özeti — format: [{"baslik":"...","ozet":"2 cümle","tarih":"10 Mart 2026","etiket":"Rehber","ikon":"📖"}]. Gerçekçi, sektörel ve SEO dostu başlıklar kullan. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="blog" style="padding:60px 20px">
  <div style="max-width:720px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">📝 Blog & Rehber</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:28px;font-size:0.95rem">Sekt\xf6r\xfcm\xfczden faydalı bilgiler</p>
    <div id="blog-kartlari" style="display:grid;gap:16px"></div>
  </div>
</section>
<script>
var MAKALELER=MAKALELER_JSON;
document.getElementById('blog-kartlari').innerHTML=MAKALELER.map(function(m){
  return '<article style="background:var(--renk-kart);border-radius:14px;padding:22px;cursor:pointer;transition:transform 0.2s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">'+'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'+'<span style="background:rgba(255,255,255,0.08);padding:4px 10px;border-radius:8px;font-size:0.7rem;color:var(--renk-vurgu)">'+m.etiket+'</span>'+'<span style="color:var(--renk-alt);font-size:0.7rem">'+m.tarih+'</span></div>'+'<h3 style="color:var(--renk-metin);font-size:1.05rem;font-weight:700;margin:0 0 8px">'+m.ikon+' '+m.baslik+'</h3>'+'<p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6;margin:0">'+m.ozet+'</p></article>';
}).join('');
</script>`},{id:"teklif-formu",ad:"Detaylı Teklif Formu",aciklama:"Kapsamlı teklif talebi formu — hizmet, bütçe, tarih",minPaket:"STANDART",htmlBlok:"Çok adımlı teklif formu",geminiTalimat:'Detaylı teklif formu bölümü için aşağıdaki htmlSablon şablonunu kullan. HIZMET_OPTIONS: sektöre uygun hizmet seçenekleri <option> olarak. WHATSAPP_NUMARA: esnafın telefonTemiz değeri. ESNAF_ID ve KEPENK_API_URL: esnaf bilgileri. CSS değişkenleri :root içinde tanımla. FORM_INPUT_STYLE: "width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.07);color:var(--renk-metin);font-size:0.9rem;outline:none".',htmlSablon:`<section id="teklif" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:800px; margin:0 auto">
    <div style="text-align:center; margin-bottom:50px;">
      <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">\xdccretsiz Teklif Alın</h2>
      <p style="color:var(--renk-alt); font-size:1.15rem;">Detayları bizimle paylaşın, ihtiyacınıza \xf6zel en uygun teklifi anında hazırlayalım.</p>
    </div>
    <div style="background:var(--renk-kart); padding:50px; border-radius:32px; box-shadow:0 25px 50px rgba(0,0,0,0.08); border:1px solid rgba(255,255,255,0.03);">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; margin-bottom:24px;">
        <input type="text" id="tf-ad" placeholder="Adınız Soyadınız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s; font-weight:600; box-sizing:border-box;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
        <input type="tel" id="tf-tel" placeholder="Telefon Numaranız" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s; font-weight:600; box-sizing:border-box;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'" />
      </div>
      
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px; margin-bottom:24px;">
        <select id="tf-hizmet" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s; font-weight:600; cursor:pointer; box-sizing:border-box;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'">
          <option value="" style="color:#000">İhtiyacınız Olan Hizmet</option>
          HIZMET_OPTIONS
        </select>
        <select id="tf-butce" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s; font-weight:600; cursor:pointer; box-sizing:border-box;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'">
          <option value="" style="color:#000">Yaklaşık B\xfct\xe7e Planınız</option>
          <option style="color:#000">5.000₺ - 15.000₺</option>
          <option style="color:#000">15.000₺ - 50.000₺</option>
          <option style="color:#000">50.000₺ +</option>
          <option style="color:#000">Fikrim Yok / Danışmak İstiyorum</option>
        </select>
      </div>

      <textarea id="tf-detay" placeholder="Detaylı a\xe7ıklamalarınızı ve \xf6zel isteklerinizi buraya yazabilirsiniz..." rows="4" style="width:100%; padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-arkaplan); color:var(--renk-metin); font-size:1.1rem; outline:none; transition:border 0.3s; font-weight:600; margin-bottom:30px; resize:vertical; box-sizing:border-box;" onfocus="this.style.borderColor='var(--renk-vurgu)'" onblur="this.style.borderColor='transparent'"></textarea>

      <button id="tf-btn" onclick="teklifFormGonder()" style="width:100%; background:var(--renk-metin); color:var(--renk-arkaplan); border:none; padding:22px; border-radius:16px; font-weight:800; font-size:1.2rem; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s; box-shadow:0 15px 30px rgba(0,0,0, 0.15);" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 20px 40px rgba(0,0,0, 0.25)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 15px 30px rgba(0,0,0, 0.15)';">
        📩 Teklif Talebini İlet
      </button>
      <div id="tf-mesaj" style="display:none; padding:16px; border-radius:12px; text-align:center; font-size:1.05rem; font-weight:700; margin-top:20px;"></div>
    </div>
  </div>
  <style>
    @media (max-width: 600px) { #teklif > div > div:nth-child(2) { padding: 30px 20px; } }
  </style>
</section>
<script>
function teklifFormGonder(){
  var ad=document.getElementById('tf-ad').value,
      tel=document.getElementById('tf-tel').value,
      hizmet=document.getElementById('tf-hizmet').value,
      butce=document.getElementById('tf-butce').value,
      detay=document.getElementById('tf-detay').value,
      btn=document.getElementById('tf-btn'),
      mesaj=document.getElementById('tf-mesaj');
  if(!ad||!tel||!hizmet){alert('Ad, telefon ve hizmet se\xe7imi zorunludur.');return;}
  btn.disabled=true;btn.textContent='G\xf6nderiliyor...';
  var msg=encodeURIComponent('Teklif Talebi:\\nAd: '+ad+'\\nTel: '+tel+'\\nHizmet: '+hizmet+(butce?'\\nB\xfct\xe7e: '+butce:'')+(detay?'\\nDetay: '+detay:''));
  window.open('https://wa.me/90WHATSAPP_NUMARA?text='+msg,'_blank');
  mesaj.style.display='block';
  mesaj.style.background='rgba(0,200,83,0.15)';mesaj.style.color='#00c853';
  mesaj.textContent='✅ Teklif talebiniz başarıyla alındı. M\xfcşteri temsilcimiz size ulaşacaktır.';
  btn.style.display='none';
}
</script>`},{id:"kariyer-ilanlari",ad:"Kariyer & İş İlanları",aciklama:"İşe alım ilanları — büyüyen işletmeler için",minPaket:"PREMIUM",htmlBlok:"İş ilanı kartları",geminiTalimat:'Kariyer bölümü için aşağıdaki htmlSablon şablonunu kullan. ILANLAR_JSON: sektöre uygun 2-3 adet iş ilanı — format: [{"pozisyon":"...","tur":"Tam Zamanlı","konum":"...","aciklama":"1-2 cümle"}]. BASVURU_LINK: WhatsApp linki. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="kariyer" style="padding:60px 20px">
  <div style="max-width:640px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">🚀 Ekibimize Katılın</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:28px;font-size:0.95rem">B\xfcy\xfcyen ekibimiz i\xe7in yetenekli arkadaşlar arıyoruz</p>
    <div id="ilan-kartlari" style="display:grid;gap:14px"></div>
  </div>
</section>
<script>
var ILANLAR=ILANLAR_JSON;
document.getElementById('ilan-kartlari').innerHTML=ILANLAR.map(function(ilan){
  return '<div style="background:var(--renk-kart);border-radius:14px;padding:22px">'+'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">'+'<h3 style="color:var(--renk-metin);font-size:1rem;font-weight:700;margin:0">'+ilan.pozisyon+'</h3>'+'<span style="background:rgba(255,255,255,0.08);padding:4px 10px;border-radius:8px;font-size:0.7rem;color:var(--renk-vurgu)">'+ilan.tur+'</span></div>'+'<p style="color:var(--renk-alt);font-size:0.85rem;margin:0 0 12px">📍 '+ilan.konum+' • '+ilan.aciklama+'</p>'+'<a href="BASVURU_LINK" target="_blank" style="background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:8px 16px;border-radius:8px;font-size:0.8rem;font-weight:700;display:inline-block">Başvur →</a></div>';
}).join('');
</script>`},{id:"sikca-arananlar",ad:"Popüler Hizmetler",aciklama:"En çok talep edilen hizmetlere hızlı erişim kartları",minPaket:"TEMEL",htmlBlok:"Hizmet ikon grid + WhatsApp yönlendirme",geminiTalimat:'Popüler hizmetler bölümü için aşağıdaki htmlSablon şablonunu kullan. HIZMETLER_JSON: sektöre uygun 6-8 adet popüler hizmet — format: [{"ad":"...","ikon":"","aciklama":"1 cümle"}]. WHATSAPP_NUMARA: esnafın telefonTemiz değeri. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="populer" style="padding:60px 20px">
  <div style="max-width:720px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">⭐ Pop\xfcler Hizmetlerimiz</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:28px;font-size:0.95rem">En \xe7ok tercih edilen hizmetlerimiz</p>
    <div id="hizmet-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px"></div>
  </div>
</section>
<script>
var HIZMETLER=HIZMETLER_JSON;
document.getElementById('hizmet-grid').innerHTML=HIZMETLER.map(function(h){
  return '<a href="https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent('Merhaba, '+h.ad+' hizmeti hakkında bilgi almak istiyorum')+'" target="_blank" style="background:var(--renk-kart);border-radius:14px;padding:20px;text-align:center;text-decoration:none;transition:transform 0.2s,border-color 0.2s;border:1px solid transparent;cursor:pointer" onmouseover="this.style.transform='translateY(-3px)';this.style.borderColor='var(--renk-vurgu)'" onmouseout="this.style.transform='translateY(0)';this.style.borderColor='transparent'">'+'<p style="font-size:2rem;margin:0 0 8px">'+h.ikon+'</p>'+'<p style="color:var(--renk-metin);font-weight:700;font-size:0.85rem;margin:0 0 4px">'+h.ad+'</p>'+'<p style="color:var(--renk-alt);font-size:0.7rem;margin:0">'+h.aciklama+'</p></a>';
}).join('');
</script>`},{id:"online-odeme",ad:"Online Ödeme Linki",aciklama:"Müşteriye ödeme linki gönder — iyzico / PayTR / Papara",minPaket:"PREMIUM",htmlBlok:"Ödeme butonu + link kopyalama",geminiTalimat:"Online ödeme bölümü için aşağıdaki htmlSablon şablonunu kullan. ODEME_LINK ve WHATSAPP_NUMARA placeholder’larını esnaf bilgileriyle doldur. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="odeme" style="padding:60px 20px;background:var(--renk-kart)">
  <div style="max-width:480px;margin:0 auto;text-align:center">
    <p style="font-size:2.5rem;margin:0 0 8px">💳</p>
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.5rem;margin:0 0 8px">G\xfcvenli Online \xd6deme</h2>
    <p style="color:var(--renk-alt);font-size:0.9rem;margin:0 0 24px">Hizmet bedelini g\xfcvenle online \xf6deyin</p>
    <div style="display:grid;gap:12px">
      <button onclick="linkKopyala()" style="background:var(--renk-vurgu);color:#fff;border:none;padding:14px 28px;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer">🔗 \xd6deme Linki Al</button>
      <a href="https://wa.me/90WHATSAPP_NUMARA?text=\xd6deme+linki+almak+istiyorum" target="_blank" style="background:rgba(255,255,255,0.07);color:var(--renk-alt);text-decoration:none;padding:12px;border-radius:12px;font-size:0.9rem;display:block">veya 💬 WhatsApp’tan isteyin</a>
    </div>
    <div id="kopyalandi" style="display:none;margin-top:12px;color:#00c853;font-size:0.85rem">✅ Link kopyalandı!</div>
  </div>
</section>
<script>
function linkKopyala(){
  navigator.clipboard.writeText('ODEME_LINK').then(function(){
    document.getElementById('kopyalandi').style.display='block';
    setTimeout(function(){document.getElementById('kopyalandi').style.display='none';},3000);
  }).catch(function(){window.open('ODEME_LINK','_blank');});
}
</script>`},{id:"anket-form",ad:"Müşteri Memnuniyet Anketi",aciklama:"Yıldız puanlamalı anket + Firestore’a kaydet",minPaket:"STANDART",htmlBlok:"Yıldız anket formu",geminiTalimat:'Müşteri memnuniyet anketi bölümü için aşağıdaki htmlSablon şablonunu kullan. ESNAF_ID ve KEPENK_API_URL placeholder’larını esnaf bilgileriyle doldur. ANKET_SORULARI_JSON: sektöre uygun 3-4 anket sorusu — format: [{"id":"genel","soru":"Genel deneyiminiz?"},{...}]. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="anket" style="padding:60px 20px">
  <div style="max-width:480px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.5rem;text-align:center;margin-bottom:6px">📊 Deneyiminizi Paylaşın</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:24px;font-size:0.9rem">Hizmetimizi değerlendirin</p>
    <div id="anket-sorular" style="display:grid;gap:16px"></div>
    <div id="anket-mesaj" style="display:none;margin-top:16px;padding:14px;border-radius:10px;text-align:center;font-size:0.9rem"></div>
    <button id="anket-btn" onclick="anketGonder()" style="margin-top:16px;width:100%;background:var(--renk-vurgu);color:#fff;border:none;padding:14px;border-radius:10px;font-size:1rem;font-weight:700;cursor:pointer">📨 Değerlendirmeyi G\xf6nder</button>
  </div>
</section>
<script>
var SORULAR=ANKET_SORULARI_JSON;
var cevaplar={};
var el=document.getElementById('anket-sorular');
el.innerHTML=SORULAR.map(function(s){
  return '<div style="background:var(--renk-kart);border-radius:12px;padding:16px">'+'<p style="color:var(--renk-metin);font-weight:700;font-size:0.9rem;margin:0 0 10px">'+s.soru+'</p>'+'<div style="display:flex;gap:8px">'+'12345'.split('').map(function(n){return '<button onclick="puan(''+s.id+'','+n+',this)" style="width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:var(--renk-alt);cursor:pointer;font-weight:700;font-size:0.85rem;transition:all 0.2s">'+n+'</button>';}).join('')+'</div></div>';
}).join('');
function puan(id,n,btn){
  cevaplar[id]=n;
  btn.parentElement.querySelectorAll('button').forEach(function(b){b.style.background='transparent';b.style.color='var(--renk-alt)'});
  btn.style.background='var(--renk-vurgu)';btn.style.color='#fff';
}
function anketGonder(){
  if(Object.keys(cevaplar).length<SORULAR.length){alert('L\xfctfen t\xfcm soruları cevaplayın');return;}
  var btn=document.getElementById('anket-btn');
  btn.disabled=true;btn.textContent='G\xf6nderiliyor...';
  fetch('KEPENK_API_URL/api/anket',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({esnafId:'ESNAF_ID',cevaplar:cevaplar})})
  .then(function(){
    var mesaj=document.getElementById('anket-mesaj');
    mesaj.style.display='block';mesaj.style.background='rgba(0,200,83,0.15)';mesaj.style.color='#00c853';
    mesaj.textContent='✅ Teşekk\xfcrler! Değerlendirmeniz kaydedildi.';
    btn.style.display='none';
  }).catch(function(){btn.disabled=false;btn.textContent='📨 Tekrar Dene';});
}
</script>`},{id:"geri-sayim",ad:"Etkinlik Geri Sayımı",aciklama:"Açılış, etkinlik veya kampanya geri sayımı",minPaket:"STANDART",htmlBlok:"Geri sayım sayacı + açıklama",geminiTalimat:"Etkinlik geri sayım bölümü için aşağıdaki htmlSablon şablonunu kullan. ETKINLIK_ADI, ETKINLIK_TARIHI (ISO format YYYY-MM-DDThh:mm), ETKINLIK_ACIKLAMA değerlerini sektöre uygun gerçekçi bir etkinlikle doldur. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="etkinlik" style="padding:60px 20px;text-align:center">
  <div style="max-width:540px;margin:0 auto">
    <p style="font-size:2.5rem;margin:0 0 8px">🎉</p>
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;margin:0 0 8px">ETKINLIK_ADI</h2>
    <p style="color:var(--renk-alt);font-size:0.9rem;margin:0 0 28px">ETKINLIK_ACIKLAMA</p>
    <div id="gs-sayac" style="display:flex;gap:12px;justify-content:center;margin-bottom:24px"></div>
    <div id="gs-bitti" style="display:none;background:var(--renk-vurgu);color:#fff;padding:16px;border-radius:14px;font-size:1.1rem;font-weight:700">🎉 Etkinlik Başladı!</div>
  </div>
</section>
<script>
var bitisTarihi=new Date('ETKINLIK_TARIHI').getTime();
function gsGuncelle(){
  var fark=bitisTarihi-Date.now();
  if(fark<=0){
    document.getElementById('gs-sayac').style.display='none';
    document.getElementById('gs-bitti').style.display='block';
    return;
  }
  var g=Math.floor(fark/86400000),s=Math.floor((fark%86400000)/3600000),d=Math.floor((fark%3600000)/60000),sn=Math.floor((fark%60000)/1000);
  var kutu=function(v,l){return '<div style="background:var(--renk-kart);border-radius:14px;padding:16px 20px;min-width:70px"><p style="color:var(--renk-vurgu);font-size:2rem;font-weight:900;margin:0">'+String(v).padStart(2,'0')+'</p><p style="color:var(--renk-alt);font-size:0.65rem;margin:4px 0 0">'+l+'</p></div>';};
  document.getElementById('gs-sayac').innerHTML=kutu(g,'G\xdcN')+kutu(s,'SAAT')+kutu(d,'DAK')+kutu(sn,'SAN');
}
setInterval(gsGuncelle,1000);gsGuncelle();
</script>`},{id:"urun-listesi",ad:"Ürün & Stok Kataloğu",aciklama:"rün/stok kartları — fotoğ, fiyat, WhatsApp sipariş",minPaket:"BUYUME",htmlBlok:"Ürün kartları gridi",geminiTalimat:'Ürün kataloğu bölümü için aşağıdaki htmlSablon şablonunu kullan. URUNLER_JSON: sektöre uygun 4-6 ürün — format: [{"ad":"...","fiyat":"150₺","aciklama":"1 cümle","stok":true,"ikon":""}]. WHATSAPP_NUMARA: esnafın telefonTemiz değeri. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="urunler" style="padding:60px 20px">
  <div style="max-width:720px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">🛎️ \xdcr\xfcnlerimiz</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:28px;font-size:0.95rem">Hizmet ve \xfcr\xfcnlerimizi keşfedin</p>
    <div id="urun-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px"></div>
  </div>
</section>
<script>
var URUNLER=URUNLER_JSON;
document.getElementById('urun-grid').innerHTML=URUNLER.map(function(u){
  return '<div style="background:var(--renk-kart);border-radius:14px;padding:20px;display:flex;flex-direction:column">'+'<p style="font-size:2rem;margin:0 0 10px">'+u.ikon+'</p>'+'<h3 style="color:var(--renk-metin);font-size:0.95rem;font-weight:700;margin:0 0 6px">'+u.ad+'</h3>'+'<p style="color:var(--renk-alt);font-size:0.8rem;margin:0 0 auto;line-height:1.5">'+u.aciklama+'</p>'+'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px">'+'<span style="color:var(--renk-vurgu);font-size:1.1rem;font-weight:900">'+u.fiyat+'</span>'+'<a href="https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent(u.ad+' sipariş etmek istiyorum')+'" target="_blank" style="background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:6px 12px;border-radius:8px;font-size:0.75rem;font-weight:700;opacity:'+(u.stok?'1':'0.5')+';pointer-events:'+(u.stok?'auto':'none')+'">'+(u.stok?'Sipariş':'T\xfckendi')+'</a></div></div>';
}).join('');
</script>`},{id:"indirim-kuponu",ad:"Dijital İndirim Kuponu",aciklama:"Kopyalanabilir kupon kodu + geçerlilik süresi",minPaket:"PREMIUM",htmlBlok:"Kupon kartı + kopyala butonu",geminiTalimat:"Dijital indirim kuponu bölümü için aşağıdaki htmlSablon şablonunu kullan. KUPON_KODU (ör: KEPENK20), INDIRIM_MIKTARI (ör: %20 veya 100₺), KUPON_SART (ör: 500₺ üzeri alışverişlerde), KUPON_BITIS (YYYY-MM-DD format) değerlerini sektöre uygun doldurun. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="kupon" style="padding:60px 20px">
  <div style="max-width:440px;margin:0 auto">
    <div style="background:linear-gradient(135deg,var(--renk-vurgu),rgba(180,60,20,0.7));border-radius:20px;padding:28px;text-align:center;position:relative">
      <div style="position:absolute;left:-12px;top:50%;transform:translateY(-50%);width:24px;height:24px;border-radius:50%;background:var(--renk-arkaplan)"></div>
      <div style="position:absolute;right:-12px;top:50%;transform:translateY(-50%);width:24px;height:24px;border-radius:50%;background:var(--renk-arkaplan)"></div>
      <div style="border-bottom:2px dashed rgba(255,255,255,0.3);padding-bottom:20px;margin-bottom:20px">
        <p style="color:rgba(255,255,255,0.8);font-size:0.85rem;margin:0 0 6px">Size \xf6zel indirim</p>
        <p style="color:#fff;font-size:3rem;font-weight:900;margin:0">INDIRIM_MIKTARI</p>
        <p style="color:rgba(255,255,255,0.8);font-size:0.8rem;margin:4px 0 0">KUPON_SART</p>
      </div>
      <div style="background:rgba(0,0,0,0.3);border-radius:10px;padding:12px;cursor:pointer" onclick="kupunaKopyala()">
        <p style="color:rgba(255,255,255,0.6);font-size:0.7rem;margin:0 0 4px">KUPON KODUNUZ</p>
        <p id="kupon-kod" style="color:#fff;font-size:1.4rem;font-weight:900;letter-spacing:4px;margin:0">KUPON_KODU</p>
        <p style="color:rgba(255,255,255,0.6);font-size:0.7rem;margin:6px 0 0">📋 kopyalamak i\xe7in tıkla</p>
      </div>
      <p id="kupon-kopyalandi" style="display:none;color:#fff;font-size:0.8rem;margin:8px 0 0">✅ Kopyalandı!</p>
      <p style="color:rgba(255,255,255,0.6);font-size:0.7rem;margin:12px 0 0">Son kullanma: KUPON_BITIS</p>
    </div>
  </div>
</section>
<script>
function kupunaKopyala(){
  navigator.clipboard.writeText('KUPON_KODU').then(function(){
    document.getElementById('kupon-kopyalandi').style.display='block';
    setTimeout(function(){document.getElementById('kupon-kopyalandi').style.display='none';},2000);
  });
}
</script>`},{id:"musteri-anketi",ad:"Hizmet Sonrası Anket",aciklama:"NPS puanlı hizmet sonrası değerlendirme",minPaket:"STANDART",htmlBlok:"NPS yapılı mini anket",geminiTalimat:"Hizmet sonrası anket bölümü için aşağıdaki htmlSablon şablonunu kullan. ISLETME_ADI ve WHATSAPP_NUMARA placeholder’larını doldur. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<section id="hizmet-anket" style="padding:60px 20px;background:var(--renk-kart)">
  <div style="max-width:480px;margin:0 auto;text-align:center">
    <p style="font-size:2rem;margin:0 0 8px">📝</p>
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.4rem;margin:0 0 6px">Hizmetimizi değerlendirin</h2>
    <p style="color:var(--renk-alt);font-size:0.85rem;margin:0 0 24px">ISLETME_ADI olarak sizin g\xf6r\xfcş\xfcn\xfcz \xf6nemli</p>
    <div id="nps-adim1">
      <p style="color:var(--renk-metin);font-size:0.9rem;margin:0 0 12px">Bizi arkadaşlarınıza tavsiye eder miydiniz?</p>
      <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:16px">
        <span style="color:var(--renk-alt);font-size:0.7rem">🙁 Hi\xe7</span>
        {'0123456789'.split('').map(function(n){return '<button onclick="npsSec('+n+',this)" style="width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:var(--renk-alt);cursor:pointer;font-weight:700;font-size:0.8rem;transition:all 0.2s">'+n+'</button>';}).join('')}
        <span style="color:var(--renk-alt);font-size:0.7rem">Kesinlikle 😄</span>
      </div>
      <input type="text" id="nps-yorum" placeholder="Yorumunuz (isteğe bağlı)..." style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.05);color:var(--renk-metin);font-size:0.85rem;outline:none;box-sizing:border-box" />
      <button onclick="npsGonder()" id="nps-btn" style="margin-top:12px;background:var(--renk-vurgu);color:#fff;border:none;padding:12px 28px;border-radius:10px;font-weight:700;cursor:pointer;width:100%">G\xf6nder</button>
    </div>
    <div id="nps-tesekkur" style="display:none">
      <p style="color:#00c853;font-size:1.1rem;font-weight:700;margin:0 0 8px">✅ Teşekk\xfcrler!</p>
      <p style="color:var(--renk-alt);font-size:0.85rem">G\xf6r\xfcş\xfcn\xfcz i\xe7in teşekk\xfcr ederiz. Sizi tekrar g\xf6rmek i\xe7in sabrırsızık!</p>
      <a href="https://wa.me/90WHATSAPP_NUMARA" target="_blank" style="display:inline-block;margin-top:12px;background:#25d366;color:#fff;text-decoration:none;padding:10px 20px;border-radius:10px;font-size:0.85rem;font-weight:700">💬 Bize yazın</a>
    </div>
  </div>
</section>
<script>
var secilenNps=null;
function npsSec(n,btn){
  secilenNps=n;
  btn.closest('div').querySelectorAll('button').forEach(function(b){b.style.background='transparent';b.style.color='var(--renk-alt)'});
  btn.style.background='var(--renk-vurgu)';btn.style.color='#fff';
}
function npsGonder(){
  if(secilenNps===null){alert('L\xfctfen bir puan se\xe7in');return;}
  document.getElementById('nps-adim1').style.display='none';
  document.getElementById('nps-tesekkur').style.display='block';
}
</script>`},{id:"yol-haritasi",ad:"Süreç & Adım Haritası",aciklama:"Hizmet süreci adımları — müşteriye güven verir",minPaket:"TEMEL",htmlBlok:"Numeralı adım haritası",geminiTalimat:'Süreç adım haritası bölümü için aşağıdaki htmlSablon şablonunu kullan. ADIMLAR_JSON: sektöre uygun 4-5 adım — format: [{"numara":1,"baslik":"...","aciklama":"1-2 cümle","ikon":""}]. CSS değişkenleri :root içinde tanımla.',htmlSablon:`<section id="surec" style="padding:60px 20px">
  <div style="max-width:640px;margin:0 auto">
    <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.8rem;text-align:center;margin-bottom:8px">🗺️ Nasıl \xc7alışırız?</h2>
    <p style="color:var(--renk-alt);text-align:center;margin-bottom:32px;font-size:0.95rem">Baştan sona her adımı sizinle birlikte atıyoruz</p>
    <div id="adim-listesi" style="display:grid;gap:0"></div>
  </div>
</section>
<script>
var ADIMLAR=ADIMLAR_JSON;
document.getElementById('adim-listesi').innerHTML=ADIMLAR.map(function(a,i){
  var sonAdim=i===ADIMLAR.length-1;
  return '<div style="display:flex;gap:16px">'+'<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">'+'<div style="width:44px;height:44px;border-radius:50%;background:var(--renk-vurgu);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.9rem;color:#fff">'+a.numara+'</div>'+(sonAdim?'':'<div style="width:2px;flex:1;background:rgba(255,255,255,0.1);margin:4px 0"></div>')+'</div>'+'<div style="padding-bottom:'+(sonAdim?'0':'24px')+'">'+'<p style="color:var(--renk-metin);font-weight:700;font-size:0.95rem;margin:0 0 4px">'+a.ikon+' '+a.baslik+'</p>'+'<p style="color:var(--renk-alt);font-size:0.85rem;line-height:1.6;margin:0">'+a.aciklama+'</p></div></div>';
}).join('');
</script>`},{id:"bize-ulasin-sticky",ad:"Sabit İletişim Çubuğu",aciklama:"Altında sabit kalıcı telefon+WhatsApp barı",minPaket:"TEMEL",htmlBlok:"Sticky alt iletişim barı",geminiTalimat:"Sabit iletişim çubuğu için aşağıdaki htmlSablon şablonunu kullan. WHATSAPP_NUMARA ve TELEFON placeholder’larını esnaf bilgileriyle doldur. CSS değişkenleri :root içinde tanımla.",htmlSablon:`<div id="iletisim-bar" style="position:fixed;bottom:0;left:0;right:0;background:rgba(0,0,0,0.92);backdrop-filter:blur(12px);border-top:1px solid rgba(255,255,255,0.08);padding:10px 16px;z-index:990;display:flex;gap:10px;justify-content:center">
  <a href="tel:TELEFON" style="flex:1;max-width:160px;background:var(--renk-vurgu);color:#fff;text-decoration:none;padding:10px 0;border-radius:10px;font-weight:700;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px">📞 Hemen Ara</a>
  <a href="https://wa.me/90WHATSAPP_NUMARA?text=Merhaba,+bilgi+almak+istiyorum" target="_blank" style="flex:1;max-width:160px;background:#25d366;color:#fff;text-decoration:none;padding:10px 0;border-radius:10px;font-weight:700;font-size:0.85rem;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px">💬 WhatsApp</a>
</div>
<div style="height:64px"></div>`},{id:"eticaret-vitrin",ad:"E-Ticaret Vitrini",aciklama:"Kapsamlı ürün vitrini — sepet, kategori filtre, WhatsApp checkout",minPaket:"BUYUME",htmlBlok:"Ürün grid + kategori tab + sepet + checkout",geminiTalimat:'E-Ticaret vitrin modülü. URUNLER_ETICARET_JSON: sektöre uygun 8-12 ürün — format: [{"id":1,"ad":"...","fiyat":199,"indirimliFiyat":149,"kategori":"...","resim":"https://images.unsplash.com/...","bedenler":["S","M","L"],"stok":true,"yeni":true}]',htmlSablon:`<section id="vitrin" style="padding:80px 20px;background:var(--renk-arkaplan)">
  <div style="max-width:1200px;margin:0 auto">
    <div style="text-align:center;margin-bottom:40px">
      <h2 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:clamp(1.8rem,4vw,2.8rem);margin:0 0 12px">🛍️ \xdcr\xfcnlerimiz</h2>
      <p style="color:var(--renk-alt);font-size:1rem;max-width:500px;margin:0 auto">Koleksiyonumuzu keşfedin, beğendiğinizi sepete ekleyin</p>
    </div>
    <!-- Kategori Tabları -->
    <div id="vt-tabs" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:32px"></div>
    <!-- \xdcr\xfcn Grid -->
    <div id="vt-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px"></div>
  </div>
  <!-- Sepet Butonu (Sticky) -->
  <button id="vt-sepet-btn" onclick="vtSepetAc()" style="position:fixed;bottom:80px;right:20px;width:60px;height:60px;border-radius:50%;background:var(--renk-vurgu);color:#fff;border:none;font-size:1.5rem;cursor:pointer;box-shadow:0 8px 25px rgba(0,0,0,0.3);z-index:980;display:none;transition:all 0.3s" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">🛒<span id="vt-badge" style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:0.7rem;font-weight:900;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center">0</span></button>
  <!-- Sepet Drawer -->
  <div id="vt-drawer" style="position:fixed;top:0;right:-400px;width:380px;max-width:90vw;height:100vh;background:var(--renk-kart);z-index:999;transition:right 0.35s ease;box-shadow:-10px 0 40px rgba(0,0,0,0.5);display:flex;flex-direction:column">
    <div style="padding:20px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:center">
      <h3 style="font-family:var(--font-baslik);color:var(--renk-metin);font-size:1.3rem;margin:0">🛒 Sepetim</h3>
      <button onclick="vtSepetKapat()" style="background:none;border:none;color:var(--renk-alt);font-size:1.5rem;cursor:pointer">✕</button>
    </div>
    <div id="vt-sepet-icerik" style="flex:1;overflow-y:auto;padding:16px"></div>
    <div id="vt-sepet-footer" style="padding:16px;border-top:1px solid rgba(255,255,255,0.08)">
      <div style="display:flex;justify-content:space-between;margin-bottom:16px">
        <span style="color:var(--renk-metin);font-weight:700;font-size:1.1rem">Toplam</span>
        <span id="vt-toplam" style="color:var(--renk-vurgu);font-weight:900;font-size:1.3rem">0₺</span>
      </div>
      <button onclick="vtWhatsAppCheckout()" style="width:100%;background:#25d366;color:#fff;border:none;padding:14px;border-radius:12px;font-size:1rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">💬 WhatsApp ile Sipariş Ver</button>
      <p style="text-align:center;color:var(--renk-alt);font-size:0.75rem;margin:8px 0 0">Siparişiniz WhatsApp \xfczerinden onaylanacaktır</p>
    </div>
  </div>
  <div id="vt-overlay" onclick="vtSepetKapat()" style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:998;display:none;transition:opacity 0.3s"></div>
</section>
<script>
var vtSepet=JSON.parse(localStorage.getItem('vtSepet')||'[]');
var vtUrunler=URUNLER_ETICARET_JSON;
var vtAktifKat='T\xfcm\xfc';
function vtRender(){
  // Kategorileri \xe7ıkar
  var katSet={}; vtUrunler.forEach(function(u){katSet[u.kategori]=true;});
  var kategoriler=['T\xfcm\xfc'].concat(Object.keys(katSet));
  var tabsEl=document.getElementById('vt-tabs');
  tabsEl.innerHTML=kategoriler.map(function(k){
    var aktif=k===vtAktifKat;
    return '<button onclick="vtFiltre(''+k+'')" style="padding:8px 20px;border-radius:20px;border:1px solid '+(aktif?'var(--renk-vurgu)':'rgba(255,255,255,0.1)')+';background:'+(aktif?'var(--renk-vurgu)':'transparent')+';color:'+(aktif?'#fff':'var(--renk-alt)')+';font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.2s">'+k+'</button>';
  }).join('');
  // \xdcr\xfcnleri filtrele
  var filtered=vtAktifKat==='T\xfcm\xfc'?vtUrunler:vtUrunler.filter(function(u){return u.kategori===vtAktifKat;});
  var gridEl=document.getElementById('vt-grid');
  gridEl.innerHTML=filtered.map(function(u){
    var indirim=u.indirimliFiyat&&u.indirimliFiyat<u.fiyat;
    var yuzde=indirim?Math.round((1-u.indirimliFiyat/u.fiyat)*100):0;
    var fiyatGosterim=indirim?'<span style="text-decoration:line-through;color:var(--renk-alt);font-size:0.8rem;margin-right:6px">'+u.fiyat+'₺</span><span style="color:var(--renk-vurgu);font-weight:900;font-size:1.1rem">'+u.indirimliFiyat+'₺</span>':'<span style="color:var(--renk-vurgu);font-weight:900;font-size:1.1rem">'+u.fiyat+'₺</span>';
    var badges='';
    if(u.yeni) badges+='<span style="position:absolute;top:12px;left:12px;background:var(--renk-vurgu);color:#fff;font-size:0.65rem;font-weight:800;padding:4px 10px;border-radius:6px">YENİ</span>';
    if(indirim) badges+='<span style="position:absolute;top:12px;right:12px;background:#ef4444;color:#fff;font-size:0.65rem;font-weight:800;padding:4px 10px;border-radius:6px">%'+yuzde+' İND.</span>';
    var bedenHtml='';
    if(u.bedenler&&u.bedenler.length>0) bedenHtml='<div style="display:flex;gap:4px;margin:8px 0">'+u.bedenler.map(function(b){return '<span style="padding:3px 8px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;font-size:0.65rem;color:var(--renk-alt)">'+b+'</span>';}).join('')+'</div>';
    return '<div style="background:var(--renk-kart);border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.04);transition:all 0.3s" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 30px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='none';this.style.boxShadow='none'">'+
      '<div style="position:relative;aspect-ratio:1/1;overflow:hidden">'+
        '<img src="'+u.resim+'" style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" alt="'+u.ad+'"/>'+
        badges+
      '</div>'+
      '<div style="padding:14px">'+
        '<h3 style="color:var(--renk-metin);font-size:0.9rem;font-weight:700;margin:0 0 4px;line-height:1.3">'+u.ad+'</h3>'+
        '<p style="color:var(--renk-alt);font-size:0.75rem;margin:0 0 6px">'+u.kategori+'</p>'+
        bedenHtml+
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">'+
          '<div>'+fiyatGosterim+'</div>'+
          '<button onclick="vtSepeteEkle('+u.id+')" style="background:var(--renk-vurgu);color:#fff;border:none;width:36px;height:36px;border-radius:10px;font-size:1rem;cursor:pointer;transition:all 0.2s;opacity:'+(u.stok?'1':'0.4')+';pointer-events:'+(u.stok?'auto':'none')+'" title="Sepete Ekle">+</button>'+
        '</div>'+
      '</div>'+
    '</div>';
  }).join('');
  vtSepetGuncelle();
}
function vtFiltre(kat){vtAktifKat=kat;vtRender();}
function vtSepeteEkle(id){
  var u=vtUrunler.find(function(x){return x.id===id;});
  if(!u)return;
  var mevcut=vtSepet.find(function(x){return x.id===id;});
  if(mevcut){mevcut.adet++;}else{vtSepet.push({id:id,ad:u.ad,fiyat:u.indirimliFiyat||u.fiyat,adet:1});}
  localStorage.setItem('vtSepet',JSON.stringify(vtSepet));
  vtSepetGuncelle();
  // Mini animasyon
  var btn=document.getElementById('vt-sepet-btn');
  btn.style.transform='scale(1.2)';setTimeout(function(){btn.style.transform='scale(1)';},200);
}
function vtSepettenCikar(id){
  vtSepet=vtSepet.filter(function(x){return x.id!==id;});
  localStorage.setItem('vtSepet',JSON.stringify(vtSepet));
  vtSepetGuncelle();vtSepetIcerikGuncelle();
}
function vtAdetDegistir(id,delta){
  var item=vtSepet.find(function(x){return x.id===id;});
  if(!item)return;
  item.adet+=delta;
  if(item.adet<=0){vtSepettenCikar(id);return;}
  localStorage.setItem('vtSepet',JSON.stringify(vtSepet));
  vtSepetGuncelle();vtSepetIcerikGuncelle();
}
function vtSepetGuncelle(){
  var toplam=vtSepet.reduce(function(s,x){return s+x.adet;},0);
  var btn=document.getElementById('vt-sepet-btn');
  var badge=document.getElementById('vt-badge');
  btn.style.display=toplam>0?'block':'none';
  badge.textContent=toplam;
  var tutar=vtSepet.reduce(function(s,x){return s+x.fiyat*x.adet;},0);
  document.getElementById('vt-toplam').textContent=tutar.toLocaleString('tr-TR')+'₺';
}
function vtSepetIcerikGuncelle(){
  var el=document.getElementById('vt-sepet-icerik');
  if(vtSepet.length===0){el.innerHTML='<div style="text-align:center;padding:40px 0"><p style="font-size:2rem;margin:0 0 8px">🛒</p><p style="color:var(--renk-alt);font-size:0.9rem">Sepetiniz boş</p></div>';return;}
  el.innerHTML=vtSepet.map(function(item){
    return '<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05)">'+
      '<div style="flex:1"><p style="color:var(--renk-metin);font-size:0.85rem;font-weight:600;margin:0">'+item.ad+'</p><p style="color:var(--renk-alt);font-size:0.75rem;margin:4px 0 0">'+item.fiyat+'₺ x '+item.adet+'</p></div>'+
      '<div style="display:flex;align-items:center;gap:6px">'+
        '<button onclick="vtAdetDegistir('+item.id+',-1)" style="width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--renk-alt);cursor:pointer;font-weight:700">−</button>'+
        '<span style="color:var(--renk-metin);font-weight:700;min-width:20px;text-align:center;font-size:0.85rem">'+item.adet+'</span>'+
        '<button onclick="vtAdetDegistir('+item.id+',1)" style="width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--renk-alt);cursor:pointer;font-weight:700">+</button>'+
      '</div>'+
      '<button onclick="vtSepettenCikar('+item.id+')" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:1rem">🗑</button>'+
    '</div>';
  }).join('');
}
function vtSepetAc(){
  vtSepetIcerikGuncelle();
  document.getElementById('vt-drawer').style.right='0';
  document.getElementById('vt-overlay').style.display='block';
  document.body.style.overflow='hidden';
}
function vtSepetKapat(){
  document.getElementById('vt-drawer').style.right='-400px';
  document.getElementById('vt-overlay').style.display='none';
  document.body.style.overflow='';
}
function vtWhatsAppCheckout(){
  if(vtSepet.length===0){alert('Sepetiniz boş');return;}
  var toplam=vtSepet.reduce(function(s,x){return s+x.fiyat*x.adet;},0);
  var mesaj='🛒 Yeni Sipariş:

';
  vtSepet.forEach(function(item){mesaj+=item.adet+'x '+item.ad+' — '+(item.fiyat*item.adet)+'₺
';});
  mesaj+='
💰 Toplam: '+toplam.toLocaleString('tr-TR')+'₺';
  window.open('https://wa.me/90WHATSAPP_NUMARA?text='+encodeURIComponent(mesaj),'_blank');
}
vtRender();
</script>`},{id:"ai-randevu-botu",ad:"AI Randevu Botu",aciklama:"WhatsApp üzerinden AI destekli otomatik randevu planlama",kategori:"donusum",minPaket:"BUYUME",htmlBlok:"AI randevu botu CTA kartı — WhatsApp entegrasyonu",geminiTalimat:"AI randevu botu bölümü ekle. WhatsApp üzerinden otonom randevu oluşturma özelliğini tanıtan CTA bölüm.",htmlSablon:`<section id="ai-randevu" style="padding:100px 20px; background:linear-gradient(135deg, var(--renk-arkaplan), var(--renk-kart));">
  <div style="max-width:800px; margin:0 auto; text-align:center;">
    <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(var(--renk-vurgu-rgb, 0,0,0), 0.1); padding:8px 20px; border-radius:30px; margin-bottom:30px;">
      <span style="font-size:1.2rem;">🤖</span>
      <span style="color:var(--renk-vurgu); font-weight:800; font-size:0.85rem; letter-spacing:0.1em; text-transform:uppercase;">AI Destekli</span>
    </div>
    <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">7/24 Randevu Alın</h2>
    <p style="color:var(--renk-alt); font-size:1.15rem; margin-bottom:40px; max-width:600px; margin-left:auto; margin-right:auto;">WhatsApp'tan mesaj g\xf6nderin, yapay zeka asistanımız size en uygun saati bulup randevunuzu hemen oluştursun.</p>
    <a href="https://wa.me/90WHATSAPP_NUMARA?text=Randevu%20almak%20istiyorum" target="_blank" style="display:inline-flex; align-items:center; gap:12px; background:#25d366; color:#fff; text-decoration:none; padding:20px 40px; border-radius:16px; font-weight:800; font-size:1.2rem; box-shadow:0 15px 30px rgba(37,211,102,0.3); transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">💬 WhatsApp'tan Randevu Al</a>
  </div>
</section>`},{id:"otonom-kapora",ad:"Otonom Kapora Alma",aciklama:"Online ön ödeme / kapora tahsilat formu",kategori:"donusum",minPaket:"PREMIUM",htmlBlok:"Kapora ödeme CTA bölümü",geminiTalimat:"Kapora alma bölümü ekle. Güven veren rozet ve ödeme güvenliği mesajıyla ön ödeme talebi.",htmlSablon:`<section id="kapora" style="padding:100px 20px; background:var(--renk-kart);">
  <div style="max-width:600px; margin:0 auto; background:var(--renk-arkaplan); padding:50px 40px; border-radius:32px; border:1px solid rgba(255,255,255,0.05); text-align:center;">
    <div style="font-size:3rem; margin-bottom:20px;">🔒</div>
    <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(1.8rem, 4vw, 2.5rem); margin-bottom:12px;">Yerinizi Garantileyin</h2>
    <p style="color:var(--renk-alt); font-size:1.05rem; margin-bottom:30px;">K\xfc\xe7\xfck bir kapora ile randevunuzu veya siparişinizi g\xfcvence altına alın.</p>
    <div style="display:grid; gap:16px; margin-bottom:30px;">
      <input type="text" placeholder="Adınız Soyadınız" style="padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1rem; outline:none; font-weight:600;" />
      <input type="tel" placeholder="Telefon Numaranız" style="padding:18px 24px; border-radius:16px; border:2px solid transparent; background:var(--renk-kart); color:var(--renk-metin); font-size:1rem; outline:none; font-weight:600;" />
    </div>
    <button onclick="window.open('https://wa.me/90WHATSAPP_NUMARA?text=Kapora%20%C3%B6demek%20istiyorum','_blank')" style="width:100%; background:var(--renk-vurgu); color:#fff; border:none; padding:20px; border-radius:16px; font-weight:800; font-size:1.15rem; cursor:pointer; box-shadow:0 15px 30px rgba(var(--renk-vurgu-rgb,0,0,0), 0.3);">💳 Kapora \xd6de</button>
    <div style="display:flex; justify-content:center; gap:24px; margin-top:20px;">
      <span style="color:var(--renk-alt); font-size:0.8rem;">🛡️ G\xfcvenli \xd6deme</span>
      <span style="color:var(--renk-alt); font-size:0.8rem;">↩️ İade Garantisi</span>
    </div>
  </div>
</section>`},{id:"whatsapp-hizli-fiyat",ad:"WhatsApp Hızlı Fiyat",aciklama:"Tek tıkla WhatsApp'tan fiyat teklifi iste",kategori:"donusum",minPaket:"TEMEL",htmlBlok:"Hızlı fiyat teklifi CTA bölümü",geminiTalimat:"WhatsApp hızlı fiyat teklifi bölümü ekle. Tek butonla fiyat sorun.",htmlSablon:`<section id="hizli-fiyat" style="padding:80px 20px; background:var(--renk-arkaplan); text-align:center;">
  <div style="max-width:500px; margin:0 auto;">
    <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(1.8rem, 4vw, 2.5rem); margin-bottom:12px;">Anında Fiyat Alın</h2>
    <p style="color:var(--renk-alt); font-size:1.05rem; margin-bottom:30px;">WhatsApp'tan 30 saniyede fiyat teklifi g\xf6nderin. Hızlı, kolay, \xfccretsiz.</p>
    <a href="https://wa.me/90WHATSAPP_NUMARA?text=Fiyat%20bilgisi%20almak%20istiyorum" target="_blank" style="display:inline-flex; align-items:center; gap:10px; background:#25d366; color:#fff; text-decoration:none; padding:18px 36px; border-radius:50px; font-weight:800; font-size:1.1rem; box-shadow:0 10px 20px rgba(37,211,102,0.3); transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">💬 Hemen Fiyat Sor</a>
  </div>
</section>`},{id:"oncesi-sonrasi-karsilastirma",ad:"Öncesi/Sonrası Karşılaştırma",aciklama:"Gelişmiş sürükleme çubuğu ile öncesi-sonrası görseli",kategori:"guven",minPaket:"STANDART",htmlBlok:"Gelişmiş öncesi/sonrası karşılaştırma slider",geminiTalimat:"Öncesi/Sonrası karşılaştırma bölümü ekle. Sürükle-bırak slider ile iki durumu karşılaştır.",lazyLoad:!0,htmlSablon:`<section id="oncesi-sonrasi" style="padding:100px 20px; background:var(--renk-kart);">
  <div style="max-width:800px; margin:0 auto; text-align:center;">
    <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:16px;">\xd6ncesi vs Sonrası</h2>
    <p style="color:var(--renk-alt); font-size:1.15rem; margin-bottom:40px;">İşlerimizin kalitesini kendi g\xf6zlerinizle g\xf6r\xfcn.</p>
    <div id="os-slider" style="position:relative; border-radius:24px; overflow:hidden; cursor:col-resize; user-select:none;">
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" style="width:100%; display:block;" alt="Sonrası" />
      <div id="os-overlay" style="position:absolute; top:0; left:0; width:50%; height:100%; overflow:hidden;">
        <img src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80" style="width:800px; max-width:none; height:100%; object-fit:cover;" alt="\xd6ncesi" />
      </div>
      <div id="os-handle" style="position:absolute; top:0; left:50%; width:4px; height:100%; background:var(--renk-vurgu); transform:translateX(-50%); z-index:2;">
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:40px; height:40px; background:var(--renk-vurgu); border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 15px rgba(0,0,0,0.3);">
          <span style="color:#fff; font-weight:900; font-size:1.2rem;">⟷</span>
        </div>
      </div>
    </div>
  </div>
</section>
<script>
var osSlider=document.getElementById('os-slider');
var osOverlay=document.getElementById('os-overlay');
var osHandle=document.getElementById('os-handle');
var osDragging=false;
osSlider.addEventListener('mousedown',function(){osDragging=true;});
document.addEventListener('mouseup',function(){osDragging=false;});
osSlider.addEventListener('mousemove',function(e){
  if(!osDragging)return;
  var rect=osSlider.getBoundingClientRect();
  var pct=Math.max(0,Math.min(100,((e.clientX-rect.left)/rect.width)*100));
  osOverlay.style.width=pct+'%';
  osHandle.style.left=pct+'%';
});
osSlider.addEventListener('touchmove',function(e){
  var rect=osSlider.getBoundingClientRect();
  var pct=Math.max(0,Math.min(100,((e.touches[0].clientX-rect.left)/rect.width)*100));
  osOverlay.style.width=pct+'%';
  osHandle.style.left=pct+'%';
});
</script>`},{id:"instagram-canli-akis",ad:"Instagram Canlı Akış",aciklama:"Instagram profilinden canlı gönderi akışı",kategori:"gorsel",minPaket:"PREMIUM",htmlBlok:"Instagram canlı akış grid bölümü",geminiTalimat:"Instagram canlı akış bölümü ekle. Takip et CTA butonu ile birlikte.",lazyLoad:!0,htmlSablon:`<section id="ig-feed" style="padding:100px 20px; background:var(--renk-arkaplan);">
  <div style="max-width:1000px; margin:0 auto; text-align:center;">
    <h2 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(2rem, 5vw, 3rem); margin-bottom:12px;">📸 Instagram'da Biz</h2>
    <p style="color:var(--renk-alt); font-size:1.1rem; margin-bottom:40px;">@INSTAGRAM_USERNAME ile g\xfcnl\xfck paylaşımlarımızı takip edin.</p>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:40px;" id="ig-grid"></div>
    <a href="https://instagram.com/INSTAGRAM_USERNAME" target="_blank" style="display:inline-flex; align-items:center; gap:10px; background:linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color:#fff; text-decoration:none; padding:16px 32px; border-radius:50px; font-weight:800; font-size:1rem;">Takip Et →</a>
  </div>
</section>
<script>
setTimeout(function(){
  var igGrid=document.getElementById('ig-grid');
  if(!igGrid)return;
  var imgs=['https://images.unsplash.com/photo-1542044896530-05d3c054e223?w=400&q=80','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80','https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&q=80','https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80','https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=400&q=80'];
  igGrid.innerHTML=imgs.map(function(src){
    return '<div style="aspect-ratio:1; border-radius:16px; overflow:hidden; cursor:pointer; transition:transform 0.3s;" onmouseover="this.style.transform=\\'scale(1.05)\\'" onmouseout="this.style.transform=\\'scale(1)\\'"><img src="'+src+'" style="width:100%; height:100%; object-fit:cover;" alt="IG Post"/></div>';
  }).join('');
}, 100);
</script>`},{id:"3d-hero-elements",ad:"3D Hero Elementleri",aciklama:"Premium 3D CSS elementleri ile etkileyici hero bölümü",kategori:"gorsel",minPaket:"PREMIUMPLUS",htmlBlok:"3D parallax hero elementleri",geminiTalimat:"3D hero bölümü ekle. CSS 3D transforms ve perspective kullanarak dönen kart veya parallax hero oluştur.",lazyLoad:!0,htmlSablon:`<section id="hero-3d" style="padding:120px 20px; background:var(--renk-arkaplan); perspective:1200px; overflow:hidden;">
  <div style="max-width:1100px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:center; gap:60px;">
    <div style="flex:1; min-width:300px;">
      <h1 style="font-family:var(--font-baslik); color:var(--renk-metin); font-size:clamp(3rem, 7vw, 5rem); line-height:1.1; margin-bottom:24px;">Premium<br><span style="color:var(--renk-vurgu);">Deneyim</span></h1>
      <p style="color:var(--renk-alt); font-size:1.2rem; line-height:1.7; margin-bottom:40px;">Sekt\xf6r\xfcn\xfczde fark yaratan, dikkat \xe7eken, akılda kalan premium web varlığınız.</p>
    </div>
    <div id="hero3d-card" style="flex:1; min-width:300px; height:400px; position:relative; transform-style:preserve-3d; transition:transform 0.1s;">
      <div style="position:absolute; inset:0; border-radius:32px; overflow:hidden; box-shadow:0 40px 80px rgba(0,0,0,0.3); transform:translateZ(40px);">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" style="width:100%; height:100%; object-fit:cover;" alt="3D Hero" />
        <div style="position:absolute; inset:0; background:linear-gradient(135deg, rgba(var(--renk-vurgu-rgb,0,0,0),0.3) 0%, transparent 60%);"></div>
      </div>
    </div>
  </div>
</section>
<script>
var h3d=document.getElementById('hero3d-card');
if(h3d){
  h3d.parentElement.addEventListener('mousemove',function(e){
    var rect=h3d.parentElement.getBoundingClientRect();
    var x=(e.clientX-rect.left)/rect.width-0.5;
    var y=(e.clientY-rect.top)/rect.height-0.5;
    h3d.style.transform='rotateY('+x*20+'deg) rotateX('+(-y*20)+'deg)';
  });
  h3d.parentElement.addEventListener('mouseleave',function(){
    h3d.style.transform='rotateY(0) rotateX(0)';
  });
}
</script>`}];a.s(["MODULLER",0,f,"esnafModulleri",()=>e,"modulKullanilabilir",()=>d])}];

//# sourceMappingURL=XinXia_apps_web_src_data_moduller_ts_c97e4578._.js.map