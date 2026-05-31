import React from 'react'
import PublicPageShell from '@/components/layout/PublicPageShell'

export default function IadeKosullariPage() {
    return (
        <PublicPageShell>

            <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="mb-12">
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-muted-foreground bg-warm mb-6">
                        Son Güncelleme: 08.03.2026
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold font-syne text-foreground mb-6">
                        İptal ve İade <span className="text-rust">Koşulları</span>
                    </h1>
                    <p className="text-muted-foreground text-lg font-lora italic leading-relaxed">
                        yzt.digital (kepenk.ai) olarak sunduğumuz dijital asistan ve web sitesi oluşturma
                        hizmetlerinde yasal sınırlar ve müşteri memnuniyeti ilkelerimiz çerçevesinde iade
                        prosesimiz aşağıda özetlenmiştir.
                    </p>
                </div>

                <div className="col-span-1 border-t border-border/20 pt-8 mt-12 mb-8"></div>

                <div className="prose prose-stone max-w-none space-y-8 text-muted-foreground">
                    <div>
                        <h2 className="text-2xl font-bold font-syne text-foreground mb-4">1. Dijital İçeriklerde İade ve Cayma Hakkı</h2>
                        <p className="leading-relaxed">
                            kepenk.ai, kullanıcıya veya esnafa tahsis edilen ve anında kullanıma sunulan bulut ve yapay zeka
                            tabanlı bir servis (SaaS) sunar. 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
                            Sözleşmeler Yönetmeliği Madde 15/1-ğ bendi uyarınca <strong>dijital içeriklerde teslim ve ifa
                                ile birlikte cayma (koşulsuz iade) hakkı bulunmamaktadır.</strong>
                        </p>
                        <p className="leading-relaxed mt-2">
                            Kullanıcı (ALICI), abonelik sözleşmesini onaylayarak ödeme işlemini tamamladığında kurulum anında
                            gerçekleştirildiği için standart cayma hakkından feragat ettiğini önceden bilmektedir.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold font-syne text-foreground mb-4">2. Abonelik İptali ve Sonlandırma</h2>
                        <p className="leading-relaxed">
                            kepenk.ai sisteminde <strong>taahhüt zorunluluğu yoktur.</strong> Kullandığınız ay kadar ödeme yaparsınız
                            (Aylık abonelikler için geçerlidir).
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>Müşteri paneliniz üzerinden veya WhatsApp asistanınızdan dilediğiniz zaman aboneliğinizi <strong>iptal edebilirsiniz.</strong></li>
                            <li>İptal işleminiz halinde bir sonraki fatura döneminizde kredi kartınızdan çekim yapılmaz.</li>
                            <li>İptal edilen aya ait peşin ödenmiş kullanım bedeli iade edilmez; ancak oluşturulmuş web siteniz ve asistan haklarınız dönemin sonuna kadar aktif kalmaya devam eder.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold font-syne text-foreground mb-4">3. Teknik Aksaklık Nedeniyle İade</h2>
                        <p className="leading-relaxed">
                            Sistemsel hatalardan kaynaklanan (kepenk.ai sunucularının 48 saatten uzun süre kapalı kalması,
                            satın alınan planın özelliklerinin teknik hatadan ötürü devrede olmaması vb.) ve satıcı
                            yzt.digital tarafından çözülemeyen teknik aksaklıklarda; kusurlu gün kadar iade
                            veyahut kullanıcının talebiyle (Eğer hizmet hiç sağlanamamışsa) <strong>tam iade</strong> yapılmaktadır.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold font-syne text-foreground mb-4">4. Ulaşım ve Talep Oluşturma</h2>
                        <p className="leading-relaxed">
                            Şikayet veya iptal talepleriniz için bize <strong>destek@kepenk.ai</strong> e-posta adresi üzerinden
                            veya <strong>WhatsApp destek hattımız</strong> üzerinden yazılı olarak
                            ulaşabilirsiniz. İadeye hak kazanılan durumlarda, ödeme yapılan kredi kartına iade işlemi
                            banka süreçlerine bağlı olarak genellikle 3 ila 7 iş günü sürmektedir.
                        </p>
                    </div>
                </div>
            </section>

        </PublicPageShell>
    )
}
