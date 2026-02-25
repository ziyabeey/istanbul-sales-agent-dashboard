import { NextResponse } from 'next/server';
import { runAdkOrchestrator } from '@/agents/OrchestratorAgent';

export async function POST(request: Request) {
    try {
        // 1. Authentication Check
        const authHeader = request.headers.get('authorization');
        if (!authHeader || authHeader !== 'Bearer A2A_SECRET_TOKEN') {
            return NextResponse.json(
                { jsonrpc: '2.0', error: { code: -32000, message: 'Unauthorized. Invalid Bearer token.' }, id: null },
                { status: 401 }
            );
        }

        // 2. Body Parsing & JSON-RPC 2.0 Validation
        const body = await request.json();
        if (body.jsonrpc !== '2.0' || !body.method) {
            return NextResponse.json(
                { jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request. Protocol JSON-RPC 2.0 is expected.' }, id: body.id || null },
                { status: 400 }
            );
        }

        // 3. Delegation to Google ADK Orchestrator
        const sessionId = `a2a_${body.id || Date.now()}`;
        const instructionStr = body.params?.instruction || body.method;
        const result = await runAdkOrchestrator(sessionId, instructionStr);

        // 4. Return successful JSON-RPC payload
        return NextResponse.json({
            jsonrpc: '2.0',
            id: body.id,
            result: result
        });

    } catch (error: any) {
        console.error('[A2A Protcol Error]:', error);
        return NextResponse.json(
            { jsonrpc: '2.0', error: { code: -32603, message: 'Internal error processing the agent task.' }, id: null },
            { status: 500 }
        );
    }
}
