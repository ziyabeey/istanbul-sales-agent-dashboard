import { NextResponse } from "next/server";
import { logAgentAction } from "@/utils/logger";

/**
 * Agent 15: Reklam Asistanı (Ads Manager)
 * 
 * Manages Server-Side tracking and Retargeting via Meta Conversions API (CAPI)
 * and Google Ads Offline Conversions.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { merchantId, eventName, value, currency, userEmail, userPhone } = body;

        if (!merchantId || !eventName) {
            return NextResponse.json({ error: "Missing required tracking parameters" }, { status: 400 });
        }

        console.log(`[Agent 15 - Ads Manager] Received Event: ${eventName} for Merchant: ${merchantId}`);

        // 1. Meta Conversions API (CAPI) Mock Dispatch
        const metaApiUrl = `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID || 'mock_pixel'}/events`;
        console.log(`[Agent 15] Dispatching Server Event to Meta CAPI: ${metaApiUrl}`);

        // In production: Hash userEmail and userPhone using SHA-256 before sending to Meta

        // 2. Google Ads Server-Side Tracking Mock Dispatch
        console.log(`[Agent 15] Dispatching Server Event to Google Ads CAPI`);

        // 3. Log to Agent 10 (Operational Brain)
        await logAgentAction({
            agentId: "agent_15",
            actionType: "SALE_CLOSED", // Triggers on critical revenue events like Purchase or Subscribing
            description: `Ads CAPI executed for event: ${eventName}. Value: ${value} ${currency || 'TRY'}`,
            metadata: { merchantId, eventName, value }
        });

        return NextResponse.json({
            success: true,
            message: "Server-side tracking events dispatched to ad networks successfully.",
            details: {
                meta_dispatched: true,
                google_dispatched: true,
                event: eventName
            }
        }, { status: 200 });

    } catch (error: any) {
        console.error("Agent 15 CAPI Error:", error);

        await logAgentAction({
            agentId: "agent_15",
            actionType: "SYSTEM_ERROR",
            description: `Failed to dispatch CAPI events: ${error.message}`
        });

        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
