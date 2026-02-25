import { NextResponse } from 'next/server';

export async function GET() {
    const agentCard = {
        name: "kepenk.ai Orchestrator",
        description: "Kepenk AI Multi-Agent System handling sales negotiations and churn analysis for SMEs.",
        version: "1.0.0",
        capabilities: [
            "orchestration",
            "sales_negotiation",
            "churn_risk_analysis"
        ],
        protocols: {
            a2a: {
                endpoint: "/api/a2a",
                format: "json-rpc-2.0",
                auth_type: "Bearer Token"
            }
        },
        contact: {
            email: "hello@kepenk.ai"
        }
    };

    return NextResponse.json(agentCard, {
        headers: {
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
