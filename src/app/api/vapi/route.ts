import { NextResponse } from "next/server";
import { db } from "@/utils/firebaseAdmin";
import { logAgentAction } from "@/utils/logger";

/**
 * Handles 'Server URL / Custom Functions' callbacks from Vapi.ai
 * Vapi will hit this endpoint when the voice assistant needs dynamic data 
 * mid-conversation (e.g., checking price array or checking calendar availability).
 */
export async function POST(req: Request) {
    try {
        const payload = await req.json();

        // Vapi sends a functionCall payload when triggering custom tools
        if (payload.message?.type === "function-call") {
            const functionCall = payload.message.functionCall;

            // Anti-Hallucination: Assistant asks for actual pricing data
            if (functionCall.name === "get_pricing_details") {

                let pricingData: any;
                const docRef = db.collection('xinxia_config').doc('fiyat_listesi');
                const docSnap = await docRef.get();
                if (docSnap.exists) {
                    pricingData = docSnap.data();
                } else {
                    // Mock fallback
                    pricingData = require("@/../data/fiyat_listesi.json");
                }

                // Log that voice agent fetched pricing
                // We log it asynchronously
                logAgentAction({
                    agentId: "vapi_voice_assistant",
                    actionType: "SYSTEM_ERROR", // Just a debug tag for now or we could use custom tag
                    description: "Vapi fetched real-time pricing data via custom function.",
                });

                return NextResponse.json({
                    results: [
                        {
                            toolCallId: functionCall.id,
                            result: `Premium+ Sesli asistan paketi aylık ${pricingData.base_prices.premium_plus} TL'dir. Kurulum ücreti ise ${pricingData.setup_fees.premium_plus} TL'dir. Sistem promptu: ${pricingData.system_prompt_instruction}`
                        }
                    ]
                }, { status: 200 });
            }

            // Mock: Checking Schedule Availability
            if (functionCall.name === "check_calendar_availability") {
                return NextResponse.json({
                    results: [
                        {
                            toolCallId: functionCall.id,
                            result: "Evet, patronun yarın öğleden sonra saat 14:00 ve 16:00'da dükkanda boşluğu var. Randevu oluşturabilirim."
                        }
                    ]
                }, { status: 200 });
            }
        }

        // Default Vapi Response
        return NextResponse.json({ status: "Received, no function matched" }, { status: 200 });

    } catch (error: any) {
        console.error("Vapi Webhook Error:", error);
        await logAgentAction({
            agentId: "vapi_voice_assistant",
            actionType: "VAPI_API_DELAY",
            description: `Vapi API crashed or delayed: ${error.message}`
        });
        return NextResponse.json({ error: "Failed to process Vapi request" }, { status: 500 });
    }
}
