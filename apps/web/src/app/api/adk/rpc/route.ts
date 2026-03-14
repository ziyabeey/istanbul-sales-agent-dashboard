import { NextResponse } from 'next/server'
import { handleRpc as kaporaRpc } from '@/agents/adk_modules/OtonomKaporaAgent'
import { handleRpc as trendyolRpc } from '@/agents/adk_modules/TrendyolAgent'
import { handleRpc as yemeksepetiRpc } from '@/agents/adk_modules/YemeksepetiAgent'
import { handleRpc as parasutRpc } from '@/agents/adk_modules/ParasutAgent'
import { handleRpc as armutRpc } from '@/agents/adk_modules/ArmutAgent'
import { handleRpc as lsaRpc } from '@/agents/adk_modules/LsaAgent'
import { handleRpc as tiktokRpc } from '@/agents/adk_modules/TikTokAgent'

// JSON-RPC 2.0 A2A (Agent-to-Agent) Dispatcher
// Bu Uç nokta (Endpoint), orkestratörün (kolektifZeka veya router) ADK modülleriyle haberleştiği köprüdür.
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { jsonrpc, method, params, id, module } = body

        if (jsonrpc !== '2.0') {
            return NextResponse.json({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request' }, id }, { status: 400 })
        }

        let result = null

        // Modüle göre router yönlendirmesi
        switch (module) {
            case 'iyzico_kapora_agent':
                result = await kaporaRpc(method, params)
                break
            case 'trendyol_agent':
                result = await trendyolRpc(method, params)
                break
            case 'yemeksepeti_agent':
                result = await yemeksepetiRpc(method, params)
                break
            case 'parasut_agent':
                result = await parasutRpc(method, params)
                break
            case 'armut_agent':
                result = await armutRpc(method, params)
                break
            case 'lsa_agent':
                result = await lsaRpc(method, params)
                break
            case 'tiktok_agent':
                result = await tiktokRpc(method, params)
                break
            default:
                return NextResponse.json({ jsonrpc: '2.0', error: { code: -32601, message: 'Module/Method not found' }, id }, { status: 404 })
        }

        return NextResponse.json({
            jsonrpc: '2.0',
            result,
            id
        })

    } catch (e: any) {
        return NextResponse.json({
            jsonrpc: '2.0',
            error: { code: -32000, message: e.message || 'Server Error' },
            id: null
        }, { status: 500 })
    }
}
