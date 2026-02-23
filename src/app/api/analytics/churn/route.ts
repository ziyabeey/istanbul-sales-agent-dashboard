import { NextResponse } from "next/server";

/**
 * Agent 16: Churn Detective Analytics
 * 
 * Analyzes simulated user engagement metrics to predict churn probability
 * and generate actionable risk scores.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { customerId, daysSinceLastActivity, reportOpenRate, supportTickets } = body;

        if (!customerId) {
            return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
        }

        // Scoring Logic (0-100, where 100 is highly likely to churn)
        let riskScore = 0;

        // Lack of activity is a major churn indicator
        if (daysSinceLastActivity > 7) riskScore += 20;
        if (daysSinceLastActivity > 14) riskScore += 30;

        // Ignoring reports indicates disengagement
        if (reportOpenRate < 0.2) riskScore += 30;
        else if (reportOpenRate < 0.5) riskScore += 10;

        // High number of support tickets might indicate dissatisfaction (or high engagement, simplified here)
        if (supportTickets > 3) riskScore += 15;

        // Cap at 100
        riskScore = Math.min(riskScore, 100);

        let riskLevel = "LOW";
        if (riskScore >= 70) riskLevel = "HIGH";
        else if (riskScore >= 40) riskLevel = "MEDIUM";

        let recommendedAction = "Continue standard automated follow-ups.";
        if (riskLevel === "HIGH") {
            recommendedAction = "IMMEDIATE ACTION REQUIRED: Schedule a personal call from the account manager. Offer a complimentary consultancy session.";
        }

        return NextResponse.json({
            success: true,
            customer_id: customerId,
            churn_risk_score: riskScore,
            risk_level: riskLevel,
            recommended_action: recommendedAction,
            timestamp: new Date().toISOString()
        }, { status: 200 });

    } catch (error) {
        console.error("Churn Analytics Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
