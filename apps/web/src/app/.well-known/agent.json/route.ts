import { NextResponse } from 'next/server'

// Mimarideki otonom ADK ajanlarının (Marketplace/Growth modülleri) Next.js orkestratörü tarafından
// dinamik keşfedilebilmesini sağlayan standart Agent-to-Agent (A2A) manifesto dosyası.
export async function GET() {
    const manifest = {
        "schema_version": "1.0",
        "agent_name": "kepenk-master-orchestrator",
        "description": "Kepenk.ai esnaf ekosistemindeki tüm modüler ADK ajanlarını bağlayan merkezi A2A JSON-RPC 2.0 köprüsü.",
        "protocols": ["json-rpc-2.0"],
        "modules": [
            {
                "id": "trendyol_agent",
                "status": "ready",
                "capabilities": ["sync_inventory", "fetch_orders"],
                "required_tier": "PREMIUM"
            },
            {
                "id": "yeksepeti_agent",
                "status": "ready",
                "capabilities": ["manage_catalog", "refresh_oauth"],
                "required_tier": "PREMIUM"
            },
            {
                "id": "parasut_agent",
                "status": "ready",
                "capabilities": ["ocr_invoice", "human_in_the_loop_approval"],
                "required_tier": "PREMIUM"
            },
            {
                "id": "iyzico_kapora_agent",
                "status": "ready",
                "capabilities": ["suspend_deal_until_payment", "generate_link"],
                "required_tier": "BÜYÜME"
            },
            {
                "id": "armut_agent",
                "status": "ready",
                "capabilities": ["bid_lead"],
                "required_tier": "BÜYÜME"
            },
            {
                "id": "lsa_agent",
                "status": "ready",
                "capabilities": ["json_feed"],
                "required_tier": "BÜYÜME"
            },
            {
                "id": "tiktok_agent",
                "status": "ready",
                "capabilities": ["direct_post"],
                "required_tier": "BÜYÜME"
            }
        ],
        "endpoints": {
            "rpc": "/api/adk/rpc",
            "health": "/api/adk/health"
        }
    }

    return NextResponse.json(manifest, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
}
