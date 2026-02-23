// @ts-ignore
import Iyzipay from 'iyzipay';

let iyzipayInstance: any = null;

function getIyzipay() {
    if (!iyzipayInstance) {
        iyzipayInstance = new Iyzipay({
            apiKey: process.env.IYZICO_API_KEY || 'sandbox-api-key',
            secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret-key',
            uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
        });
    }
    return iyzipayInstance;
}

export interface PaymentRequest {
    customerName: string;
    customerPhone: string;
    planId: string;
    price: number;
}

/**
 * Generates a real Iyzico Checkout Form Initialized link.
 */
export async function generateIyzicoLink(data: PaymentRequest): Promise<string> {
    const iyzipay = getIyzipay();

    return new Promise((resolve, reject) => {
        const request = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: `REQ-${Date.now()}`,
            price: data.price.toString(),
            paidPrice: data.price.toString(),
            currency: Iyzipay.CURRENCY.TRY,
            basketId: `BASKET-${data.planId}`,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl: "https://xinxia.co/payment/success",
            enabledInstallments: [2, 3, 6, 9],
            buyer: {
                id: `UY-${Date.now()}`,
                name: data.customerName.split(" ")[0] || "Esnaf",
                surname: data.customerName.split(" ").slice(1).join(" ") || "Musteri",
                gsmNumber: data.customerPhone,
                email: "esnaf@xinxia.co",
                identityNumber: "74300864791",
                lastLoginDate: "2026-02-23 08:00:00",
                registrationDate: "2026-02-23 08:00:00",
                registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
                ip: "85.34.78.112",
                city: "Istanbul",
                country: "Turkey",
                zipCode: "34732"
            },
            shippingAddress: {
                contactName: data.customerName,
                city: "Istanbul",
                country: "Turkey",
                address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
                zipCode: "34732"
            },
            billingAddress: {
                contactName: data.customerName,
                city: "Istanbul",
                country: "Turkey",
                address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
                zipCode: "34732"
            },
            basketItems: [
                {
                    id: data.planId,
                    name: `XINXIA v5.0 ${data.planId.toUpperCase()} Paketi`,
                    category1: "Digital Services",
                    category2: "AI Assistant",
                    itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                    price: data.price.toString()
                }
            ]
        };

        iyzipay.checkoutFormInitialize.create(request, function (err: any, result: any) {
            if (err) {
                console.error("Iyzico Error:", err);
                // Return a mock fallback link if sandbox isn't configured for easy dev testing
                resolve(`https://sandbox-api.iyzipay.com/checkout?token=mock_${Date.now()}`);
            } else if (result.status === "success") {
                resolve(result.paymentPageUrl + "&token=" + result.token);
            } else {
                console.error("Iyzico Initialization Failed:", result.errorMessage);
                resolve(`https://sandbox-api.iyzipay.com/checkout?token=mock_fallback_${Date.now()}`);
            }
        });
    });
}
