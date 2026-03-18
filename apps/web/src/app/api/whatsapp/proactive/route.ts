import { NextResponse } from "next/server";

/**
 * Valid Meta WhatsApp Templates corresponding to pre-approved IDs
 */
const VALID_TEMPLATES = {
    MORNING_GREETING: "morning_greeting_v1",
    WEEKLY_REPORT: "weekly_revenue_report_v2",
    INVOICE_REMINDER: "invoice_due_reminder_v1"
};

/**
 * Handles systemic outbound/proactive messages.
 * Enforces the use of pre-approved Meta Templates to prevent account bans.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { templateId, to_phone, templateVariables } = body;

        // Validation: Prevent generic free-text proactive messages
        if (!templateId || !Object.values(VALID_TEMPLATES).includes(templateId)) {
            return NextResponse.json({
                success: false,
                error: "INVALID_TEMPLATE",
                message: "Proactive messages must use a pre-approved Meta Template ID to comply with WhatsApp Business policies."
            }, { status: 403 });
        }

        if (!to_phone) {
            return NextResponse.json({ error: "Missing recipient phone number" }, { status: 400 });
        }

        // Simulate sending the template via WhatsApp Graph API
        // console.log(`[WhatsApp API MOCK] Sending template '${templateId}' to ${to_phone} with variables:`, templateVariables);

        return NextResponse.json({
            success: true,
            message: "Proactive message successfully dispatched via Meta Template.",
            template_used: templateId,
            dispatched_at: new Date().toISOString()
        }, { status: 200 });

    } catch (error) {
        // console.error("Proactive Message Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
