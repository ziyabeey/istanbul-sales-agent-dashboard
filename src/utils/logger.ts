import { db } from './firebaseAdmin';

export interface AgentLog {
    agentId: string;
    actionType: "SALE_CLOSED" | "WHATSAPP_OPTOUT" | "VAPI_API_DELAY" | "CHURN_RISK_ALERT" | "PROACTIVE_MESSAGE" | "SYSTEM_ERROR";
    description: string;
    metadata?: Record<string, any>;
}

/**
 * Agent 10: Operasyon Beyni Logger
 * 
 * Logs critical events to the `agent_logs` collection in Firestore. 
 * Allows Agent 10 to monitor operations, detect churn risks, or generate weekly reports.
 */
export async function logAgentAction(log: AgentLog) {
    try {
        const logData = {
            ...log,
            timestamp: new Date().toISOString(),
            createdAt: new Date()
        };

        // Asynchronously log to firestore without blocking the main request
        db.collection('agent_logs').add(logData).catch((err) => {
            console.error("Failed to write to agent_logs:", err);
        });

    } catch (error) {
        console.error("Agent 10 Logger Error:", error);
    }
}
