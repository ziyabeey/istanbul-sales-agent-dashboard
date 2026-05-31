import React from 'react';
import { HardHat, Ruler, Phone, CheckCircle, ArrowRight, UserCheck, ShieldCheck, HelpCircle } from 'lucide-react';

interface SectionProps<T = any> {
  data: T;
  businessData?: any;
}

export const InsaatSadeHero: React.FC<SectionProps> = ({ data, businessData }) => {
  return (
    <section className="bg-white border-b border-gray-100 font-[family-name:var(--font-body)]">
       <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
                <span className="inline-block bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm mb-6 border border-blue-100">
                  {data?.badge || 'GÜVENLİ YAPILAR'}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] font-bold text-gray-900 leading-tight mb-6">
                  {data?.title || 'Temelden Çatıya İnşaat Çözümleri'}
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {businessData?.slogan || 'Arsanızı kat karşılığı değerlendiriyor, kentsel dönüşümle riskli yapılarınızı güvenli yuvalara dönüştürüyoruz.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                   <a href={`tel:${businessData?.phoneClean}`} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" /> Hemen Arayın
                   </a>
                   <a href="#hizmetler" className="bg-gray-50 text-gray-700 border border-gray-200 px-6 py-3 rounded hover:bg-gray-100 transition-colors font-semibold text-center">
                      Neler Yapıyoruz?
                   </a>
                </div>
                
                <div className="mt-10 pt-10 border-t border-gray-100 flex gap-8">
                   <div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">20+</div>
                      <div className="text-sm text-gray-500">Yıllık Tecrübe</div>
                   </div>
                   <div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                      <div className="text-sm text-gray-500">Müşteri Memnuniyeti</div>
                   </div>
                </div>
             </div>
             
             <div className="relative">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                   <HardHat className="w-24 h-24 text-gray-300" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl border border-gray-100 max-w-xs">
                   <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="w-8 h-8 text-green-500" />
                      <div className="font-bold text-gray-900">Depreme Dayanıklı</div>
                   </div>
                   <p className="text-sm text-gray-600">Tüm projelerimizde son yönetmeliklere uygun donatı kullanıyoruz.</p>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

export const InsaatSadeServices: React.FC<SectionProps> = () => {
  return (
    <section id="hizmetler" className="py-20 bg-gray-50">
       <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
             <p className="text-gray-600">Söz verdiğimiz zamanda, eksiksiz ve anahtar teslim projeler üretiyoruz.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { i: Ruler, t: 'Kat Karşılığı İnşaat', d: 'Arsanızı en verimli şekilde projelendirip, hak ettiğiniz değeri sunuyoruz.' },
               { i: HardHat, t: 'Kentsel Dönüşüm', d: 'Eski ve riskli binalarınızı yönetmeliklere uygun modern yapılara dönüştürüyoruz.' },
               { i: CheckCircle, t: 'Anahtar Teslim Taahhüt', d: 'Kaba inşaattan ince işçiliğe tüm süreci tek elden profesyonelce yönetiyoruz.' }
             ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-center group">
                   <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <s.i className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">{s.t}</h3>
                   <p className="text-gray-600 leading-relaxed mb-6">{s.d}</p>
                   <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800">
                      Detaylı Bilgi <ArrowRight className="w-4 h-4" />
                   </a>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

export const InsaatSadeTrust: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-20 bg-white border-y border-gray-200">
       <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
                <div className="aspect-square bg-blue-50 rounded p-6 flex flex-col justify-center items-center text-center">
                   <UserCheck className="w-10 h-10 text-blue-600 mb-4" />
                   <h4 className="font-bold text-gray-900">Müşteri Odaklı</h4>
                </div>
                <div className="aspect-square bg-gray-50 border border-gray-200 rounded p-6 flex flex-col justify-center items-center text-center">
                   <ShieldCheck className="w-10 h-10 text-gray-400 mb-4" />
                   <h4 className="font-bold text-gray-900">Garantili İşçilik</h4>
                </div>
                <div className="aspect-[2/1] col-span-2 bg-gray-100 rounded flex items-center justify-center p-6 border border-gray-200">
                   <p className="text-gray-600 font-medium italic text-center w-full">"Bize Güvenin, Gerisini Düşünmeyin"</p>
                </div>
             </div>
             <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-6">Neden Bizi Seçmelisiniz?</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Yılların verdiği tecrübe ile bölgesinde adından söz ettiren {businessData?.name || 'firmamız'}, tüm inşaat süreçlerinde şeffaflığı ve kaliteyi garanti eder. Malzeme seçiminden teslime kadar sürprizlere yer bırakmıyoruz.
                </p>
                <ul className="space-y-4">
                   {[
                     'Sözleşmeye sadık kalarak tam zamanında teslim',
                     'Sadece TSE belgeli birinci sınıf malzemeler',
                     'Tüm yasal izin ve ruhsat işlemlerinin profesyonel takibi',
                     'Düzenli saha bilgilendirmesi ve şeffaflık'
                   ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-700">
                         <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                         <span>{item}</span>
                      </li>
                   ))}
                </ul>
             </div>
          </div>
       </div>
    </section>
  );
};

export const InsaatSadeFaq: React.FC<SectionProps> = () => {
  return (
    <section className="py-20 bg-gray-50">
       <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-[family-name:var(--font-heading)] font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
               <HelpCircle className="w-8 h-8 text-blue-600" /> Sıkça Sorulan Sorular
             </h2>
             <p className="text-gray-600">Sürecin nasıl işlediği hakkında merak ettikleriniz.</p>
          </div>
          
          <div className="space-y-4">
             {[
               { q: 'Kat Karşılığı İnşaat süreci nasıl başlar?', a: 'Arsanızı yerinde inceler, imar durumunu kontrol eder ve size en uygun pay oranını sunarak sözleşme aşamasına geçeriz.' },
               { q: 'Kentsel Dönüşüm kira yardımı alabilir miyiz?', a: 'Evet, riskli yapı raporu alındıktan sonra devlet destekli kira yardımından faydalanmanız için gerekli yönlendirmeleri yapiyoruz.' },
               { q: 'İzin ve Ruhsatları kim alıyor?', a: 'Belediye ve ilgili kurumlardaki tüm yasal prosedürleri (Ruhsat, İskan vb.) biz takip ediyoruz, siz yorulmuyorsunuz.' }
             ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded border border-gray-200">
                   <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                   <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
};

export const InsaatSadeContact: React.FC<SectionProps> = ({ businessData }) => {
  return (
    <section className="py-20 bg-white">
       <div className="container mx-auto px-4 max-w-4xl bg-blue-600 rounded-xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] font-bold mb-4">Arsanızı Değerlendirmek İçin Arayın</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
             Alanında uzman ekibimiz arsanızı veya eski binanızı ücretsiz olarak incelesin, size en uygun teklifi hazırlayalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href={`tel:${businessData?.phoneClean}`} className="bg-white text-blue-600 px-8 py-4 rounded font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> {businessData?.phone || 'Bizi Arayın'}
             </a>
             <button className="border-2 border-white text-white px-8 py-4 rounded font-bold hover:bg-white/10 transition-colors">
                Whatsapp'tan Yazın
             </button>
          </div>
       </div>
    </section>
  );
};
