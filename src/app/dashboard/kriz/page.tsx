"use client";

import React, { useState } from "react";
import { AlertCircle, Star, MessageSquareX, Check, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockReviews = [
    {
        id: 1,
        author: "Mehmet K.",
        rating: 2,
        comment: "Siparişim 45 dakika geç geldi ve yemekler soğuktu. Hiç memnun kalmadım.",
        aiResponse: "Merhaba Mehmet Bey, yaşadığınız bu gecikme ve olumsuz deneyim için çok özür dileriz. Yoğunluktan dolayı yaşanan bu aksaklığı telafi etmek isteriz. Bir sonraki siparişinizde size özel ikramımız olacaktır. Anlayışınız için teşekkür ederiz."
    },
    {
        id: 2,
        author: "Ayşe Y.",
        rating: 3,
        comment: "Lezzet fena değildi ama porsiyonlar beklentimin altındaydı. Daha büyük olabilirdi.",
        aiResponse: "Ayşe Hanım merhaba, değerli geri bildiriminiz için teşekkür ederiz. Porsiyon standartlarımızı gözden geçireceğiz. Sizi tekrar ağırlamaktan mutluluk duyarız."
    }
];

export default function KrizPage() {
    const [reviews, setReviews] = useState(mockReviews);

    const handleApprove = (id: number) => {
        // İlgili yorumu listeden kaldır (Onaylandı simülasyonu)
        setReviews(reviews.filter(r => r.id !== id));
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-2 text-red-500" />
                    Kriz Merkezi
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    3 yıldız ve altı alan olumsuz yorumlar asistanınız tarafından yanıtlandı. Kontrol edip onaylayın.
                </p>
            </div>

            {reviews.length === 0 ? (
                <div className="bg-green-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-green-100 min-h-[300px]">
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Harika! Bekleyen Kriz Yok</h3>
                    <p className="text-green-600">Müşterileriniz mutlu görünuyor. Yeni bir olumsuz yorum geldiğinde burada göreceksiniz.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>

                            {/* Review Content */}
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-slate-800 text-lg">{review.author}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-600 italic text-sm md:text-base bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    "{review.comment}"
                                </p>
                            </div>

                            {/* AI Generated Response */}
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-4">
                                <div className="flex items-center text-orange-600 font-bold mb-2 text-sm">
                                    <MessageSquareX className="w-4 h-4 mr-2" />
                                    Asistanın Yanıt Önerisi
                                </div>
                                <p className="text-slate-800 md:text-lg">
                                    {review.aiResponse}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button
                                    variant="primary"
                                    className="flex-1 w-full justify-center h-12 bg-red-500 hover:bg-red-600 focus:ring-red-500"
                                    onClick={() => handleApprove(review.id)}
                                >
                                    <Check className="w-5 h-5 mr-2" /> Onayla ve Yayınla
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 w-full justify-center h-12"
                                >
                                    <Edit2 className="w-5 h-5 mr-2" /> Yanıtı Düzenle
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
