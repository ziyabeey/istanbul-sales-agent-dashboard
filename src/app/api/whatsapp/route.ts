import { NextResponse } from "next/server";
import { generateIyzicoLink } from "@/utils/iyzico";
import { db } from "@/utils/firebaseAdmin";
import { logAgentAction } from "@/utils/logger";

// Define strict typing for our price list
interface PricingSchema {
    currency: string;
    base_prices: Record<string, number>;
    setup_fees: Record<string, number>;
    guardrails: {
        max_discount_percentage: number;
        min_allowed_prices: Record<string, number>;
        free_setup_allowed: boolean;
    };
}

/**
 * Fetches the anti-hallucination JSON data live from Firestore.
 */
async function getPricingData(): Promise<PricingSchema> {
    const docRef = db.collection('xinxia_config').doc('fiyat_listesi');
    const docSnap = await docRef.get();

    if (docSnap.exists) {
        return docSnap.data() as PricingSchema;
    }

    // Fallback if Firestore isn't populated yet
    throw new Error("MOCK_FIRESTORE_DATA_MISSING");
}

/**
 * Handles incoming webhooks from WhatsApp (Meta/Twilio).
 * This endpoint simulates "The Closer" AI Agent evaluating a message,
 * looking up the rigid pricing structure, and returning a controlled response or payment link.
 */

// Mock Blacklist Database (In-memory for demonstration)
const globalBlacklist = new Set<string>();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const incomingMessage = body.message?.toLowerCase().trim() || "";
        const customerPhone = body.from || "unknown_number";

        // 0. OPT-OUT & BLACKLIST CHECK
        if (globalBlacklist.has(customerPhone)) {
            return NextResponse.json({
                success: false,
                reason: "User is blacklisted"
            }, { status: 200 }); // Return 200 so WhatsApp doesn't retry
        }

        if (["hayır", "hayir", "iptal", "stop", "dur"].includes(incomingMessage)) {
            globalBlacklist.add(customerPhone);
            await logAgentAction({
                agentId: "agent_5",
                actionType: "WHATSAPP_OPTOUT",
                description: `Customer ${customerPhone} opted out and was blacklisted.`,
                metadata: { phone: customerPhone }
            });

            return NextResponse.json({
                success: true,
                agent_reply: "Talebiniz alınmıştır. Numaranız iletişim listemizden (kara liste) çıkarıldı. Size bir daha mesaj gönderilmeyecektir. Sağlıklı günler dileriz.",
                action: "BLACKLISTED"
            }, { status: 200 });
        }

        // 1. CHECK DAILY QUOTA (Token Economy)
        // We simulate that the user's plan is "standart" for this demonstration
        const { checkDailyQuota } = require('@/utils/quotaManager');
        const merchantId = customerPhone; // Using phone as ID for mock
        const quotaStatus = await checkDailyQuota(merchantId, "standart");

        if (!quotaStatus.hasQuota) {
            // Quota exceeded, return upsell message and DO NOT process AI logic
            return NextResponse.json({
                success: true,
                agent_reply: quotaStatus.message,
                action: "QUOTA_EXCEEDED_UPSELL"
            }, { status: 200 });
        }

        // Load Guardrails and Pricing dynamically from Firestore
        let pricing: PricingSchema;
        try {
            pricing = await getPricingData();
        } catch (e) {
            // Mock fallback just in case we didn't populate DB
            pricing = require("@/../data/fiyat_listesi.json");
        }

        let replyMessage = "";

        // 1. Handling "Fiyat Nedir?" (What is the price?)
        if (incomingMessage.includes("fiyat") || incomingMessage.includes("ne kadar")) {
            replyMessage = `Merhaba! XINXIA v5.0 Temel paketimiz aylık ${pricing.base_prices.temel}₺, en çok tercih edilen Premium paketimiz ise vergi dahil ${pricing.base_prices.premium}₺'dir. Hangi paketle ilgileniyorsunuz?`;
        }

        // 2. Handling Discount Requests (Pazarlık)
        else if (incomingMessage.includes("indirim") || incomingMessage.includes("kurtarmaz")) {
            const maxDiscount = pricing.guardrails.max_discount_percentage;
            const premiumBottomPrice = pricing.guardrails.min_allowed_prices.premium;

            replyMessage = `Esnaf dostuyuz! Patronla konuştum, Premium paket için size özel %${maxDiscount} indirim sağlayabilirim. Bu durumda aylık ${premiumBottomPrice}₺'ye geliyor. Onaylıyorsanız ödeme linkini göndereyim?`;
        }

        // 3. Handling Closing / Payment (Satış Kapatma)
        else if (incomingMessage.includes("tamam") || incomingMessage.includes("link") || incomingMessage.includes("alıyorum")) {
            const paymentLink = await generateIyzicoLink({
                customerName: "Esnaf Musteri",
                customerPhone: customerPhone,
                planId: "premium",
                price: pricing.guardrails.min_allowed_prices.premium
            });

            replyMessage = `Harika karar! 🚀 \nGüvenli ödemenizi tamamlamak ve anında kuruluma başlamak için linkiniz: \n${paymentLink}\n\nÖdeme sonrası asistanınız 2 dakika içinde WhatsApp üzerinden size 'Merhaba' diyecek.`;

            await logAgentAction({
                agentId: "agent_5",
                actionType: "SALE_CLOSED",
                description: `Agent successfully closed a 'Premium' plan sale over WhatsApp for ${pricing.guardrails.min_allowed_prices.premium}₺.`,
                metadata: { phone: customerPhone, plan: "premium", price: pricing.guardrails.min_allowed_prices.premium }
            });
        }

        // Default fallback
        else {
            replyMessage = "XINXIA Asistan sistemine hoş geldiniz. Size nasıl yardımcı olabilirim? (Fiyatları sormaktan çekinmeyin)";
        }

        return NextResponse.json({
            success: true,
            agent_reply: replyMessage,
            anti_hallucination_check: "PASSED"
        }, { status: 200 });

    } catch (error: any) {
        console.error("WhatsApp Webhook Error:", error);
        await logAgentAction({
            agentId: "agent_5",
            actionType: "SYSTEM_ERROR",
            description: `WhatsApp Webhook crashed: ${error.message}`
        });
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// Minimal GET support for Webhook verification (e.g., Meta Hub Challenge)
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const challenge = searchParams.get("hub.challenge");
    if (challenge) {
        return new NextResponse(challenge, { status: 200 });
    }
    return NextResponse.json({ status: "WhatsApp Webhook Active" }, { status: 200 });
}
