/**
 * MOCK Iyzico Payment Link Generator
 * 
 * In a real-world scenario, this utility would make an authenticated HTTP POST request
 * to the Iyzico API (or another payment gateway) to generate a secure checkout link.
 */

interface PaymentDetails {
    customerName: string;
    customerPhone: string;
    planId: string;
    price: number;
}

export async function generateIyzicoLink(details: PaymentDetails): Promise<string> {
    // Simulate network latency (e.g., 800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // In production, this would be an actual Iyzico Checkout Form URL
    const mockToken = Math.random().toString(36).substring(2, 15);
    const baseUrl = "https://sandbox-api.iyzipay.com/checkout";

    return `${baseUrl}?token=xinxia_${mockToken}&amount=${details.price}&plan=${details.planId}`;
}
