import { logAgentAction } from "@/utils/logger";

export interface OKR {
    objective: string;
    progress: number;
    status: "ON_TRACK" | "AT_RISK" | "COMPLETED";
}

export interface EmployeeProfile {
    id: string;
    role: "Site Technician" | "Customer Success" | "Sales";
    name: string;
    okrs: OKR[];
}

/**
 * Agent 17: İK Ajanı (HR Manager)
 * 
 * Responsible for tracking human team performance, evaluating OKRs,
 * and sending automated reminders (like payroll on the 25th).
 */
export async function generateHRReport(employees: EmployeeProfile[]) {
    try {
        const atRiskCount = employees.flatMap(e => e.okrs).filter(o => o.status === "AT_RISK").length;

        const reportSummary = `HR Report Generated: ${employees.length} team members analyzed. ${atRiskCount} OKRs are currently AT RISK.`;

        await logAgentAction({
            agentId: "agent_17",
            actionType: "PROACTIVE_MESSAGE", // Re-using standard log tags
            description: reportSummary,
            metadata: { totalEmployees: employees.length, atRiskOkrs: atRiskCount }
        });

        return {
            success: true,
            summary: reportSummary,
            details: employees
        };

    } catch (error) {
        console.error("Agent 17 HR Error:", error);
        throw error;
    }
}

/**
 * Cron task simulation for Payroll Reminders
 * Triggers on the 25th of the month.
 */
export async function triggerPayrollReminder() {
    const today = new Date();
    if (today.getDate() !== 25) {
        return { action: "SKIPPED", reason: "Not the 25th of the month" };
    }

    const message = `🔔 Maaş Hatırlatması: Ayın 25'i geldi. Muhasebeye bordro talimatlarını iletin.`;

    await logAgentAction({
        agentId: "agent_17",
        actionType: "PROACTIVE_MESSAGE",
        description: "Sent monthly payroll reminder to finance channel."
    });

    return { action: "EXECUTED", message };
}
