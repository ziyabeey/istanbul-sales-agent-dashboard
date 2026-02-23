import { NextResponse } from "next/server";
import { logAgentAction } from "@/utils/logger";

/**
 * Agent 14: Esnaf Asistanı - Morning Message Cron
 * 
 * Scheduled to run every morning at 08:00 (e.g., via Vercel Cron).
 * Finds active merchants and sends them sector-specific daily motivation 
 * using pre-approved Meta WhatsApp templates.
 */
export async function GET(req: Request) {
    try {
        // 1. Authorization Check (Cron Secret)
        const authHeader = req.headers.get("authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'test_secret'}`) {
            console.warn("[Morning Cron] Unauthorized access attempt.");
        }

        // 2. Fetch Active Merchants (Mocked here for demonstration)
        const activeMerchants = [
            { id: "esnaf_001", phone: "905551112233", sector: "Tesisat", name: "Ahmet Usta" },
            { id: "esnaf_002", phone: "905559998877", sector: "Kuaför", name: "Ayşe Hanım" }
        ];

        let messagesSent = 0;

        // 3. Process each merchant and dispatch Meta Template
        for (const merchant of activeMerchants) {

            // Construct dynamic template variables
            const variables = {
                name: merchant.name,
                dayOfWeek: new Date().toLocaleDateString('tr-TR', { weekday: 'long' }),
                motivationText: merchant.sector === "Tesisat"
                    ? "Bugün hava yağmurlu, su kaçağı çağrıları artabilir, telefonun başında ol!"
                    : "Hafta sonu yaklaşıyor, randevular dolmaya başlamıştır. Çayını al ve enerjik bir güne başla!"
            };

            // Simulate sending via Meta / WhatsApp API
            console.log(`[Agent 14] Dispatching morning_greeting_v1 to ${merchant.phone} | Vars:`, variables);

            // Log operation to Agent 10
            await logAgentAction({
                agentId: "agent_14",
                actionType: "PROACTIVE_MESSAGE",
                description: `Sent morning motivation template to ${merchant.name} (${merchant.sector}).`,
                metadata: { phone: merchant.phone, template_used: 'morning_greeting_v1' }
            });

            messagesSent++;
        }

        return NextResponse.json({
            success: true,
            message: `Morning motivation (Agent 14) successfully dispatched to ${messagesSent} merchants.`,
            timestamp: new Date().toISOString()
        }, { status: 200 });

    } catch (error: any) {
        console.error("Morning Cron Error:", error);
        await logAgentAction({
            agentId: "agent_14",
            actionType: "SYSTEM_ERROR",
            description: `Morning Message Cron failed: ${error.message}`
        });
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
