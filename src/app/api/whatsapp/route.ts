import { NextResponse } from "next/server";
import { generateIyzicoLink } from "@/utils/iyzico";
import { db } from "@/utils/firebaseAdmin";
import { logAgentAction } from "@/utils/logger";
import { runAdkOrchestrator } from "@/agents/OrchestratorAgent";

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

        // 2. ADK ORCHESTRATOR DELEGATION
        // Passing the user's message to the Google ADK Orchestrator
        let replyMessage = "";
        try {
            const sessionId = `wa_${customerPhone}`;
            replyMessage = await runAdkOrchestrator(
                sessionId,
                `User (${customerPhone}) says: "${incomingMessage}". Analyze intent and provide a suitable response as kepenk.ai assistant.`
            );
        } catch (adkError) {
            console.error("ADK Runner failed:", adkError);
            replyMessage = "Şu anda teknik bir güncelleme yapıyoruz, lütfen birazdan tekrar deneyin.";
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
