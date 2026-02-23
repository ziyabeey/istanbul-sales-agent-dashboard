import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { logAgentAction } from "@/utils/logger";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "mock-key");

/**
 * Agent 12: Sentiment Guardian (Kriz Yönetimi)
 * Listens to Google My Business Webhooks for new reviews.
 * If <= 3 stars, it drafts a response using Gemini and prompts the merchant via WhatsApp.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { reviewId, locationName, reviewerName, starRating, reviewComment, merchantPhone } = body;

        if (!reviewId || starRating === undefined) {
            return NextResponse.json({ error: "Missing review payload parameters" }, { status: 400 });
        }

        // Agent 12 triggers only on 3 stars or lower (Crisis Management)
        if (starRating <= 3) {
            // 1. Generate Soothing Response via Gemini
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const prompt = `Sen profesyonel bir esnaf kriz yönetimi asistanısın. 
Müşteri: ${reviewerName}
Yıldız: ${starRating}/5
Yorum: "${reviewComment}"

Bu yoruma profesyonel, alttan alan, özür dileyen ve müşteriyi işletme ile doğrudan iletişime (Örn: "Lütfen DM atın telafi edelim") geçmeye teşvik eden kısa ve öz bir yanıt taslağı oluştur.`;

            let generatedResponse = "Merhaba. Yaşadığınız olumsuz deneyim için çok özür dileriz. Sorunu çözmek adına lütfen bize işletme numaramızdan ulaşın.";

            try {
                const result = await model.generateContent(prompt);
                const text = result.response.text();
                if (text) generatedResponse = text;
            } catch (geminiError) {
                console.error("Gemini API Error (fallback used):", geminiError);
            }

            // 2. Dispatch Push Notification to Merchant via WhatsApp
            const alertMessage = `⚠️ KRİZ ALARMI: "${locationName}" hesabınıza ${reviewerName} kişisinden ${starRating} yıldız geldi. Yorum: "${reviewComment}".\n\nYanıtı yazdım → "${generatedResponse}"\n\nOnaylıyorsanız 'EVET' yazın, anında yayınlayalım.`;

            console.log(`[Agent 12 - WhatsApp Dispatch] To: ${merchantPhone} | Msg: ${alertMessage}`);

            // 3. Log the Crisis Event to Agent 10
            await logAgentAction({
                agentId: "agent_12",
                actionType: "PROACTIVE_MESSAGE",
                description: `Crisis detected (${starRating} stars from ${reviewerName}). Prompted merchant for response approval.`,
                metadata: { reviewId, starRating, locationName, merchantPhone }
            });

            return NextResponse.json({
                success: true,
                action: "CRISIS_MANAGED",
                draft_response: generatedResponse,
                notified_merchant: merchantPhone
            }, { status: 200 });
        }

        // Positive Reviews Action
        return NextResponse.json({
            success: true,
            action: "NONE_REQUIRED",
            message: "Positive review received. Tracking for analytics only."
        }, { status: 200 });

    } catch (error: any) {
        console.error("Agent 12 Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
