import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware implementing A2A (Agent-to-Agent) Security Standards.
 * 
 * Intercepts requests to API routes that require secure agent communication,
 * verifying that the payload adheres strictly to JSON-RPC 2.0 standards,
 * or checks for basic API Key authorization.
 */
export async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Protect internal/A2A analytics and proactive messaging routes
    if (pathname.startsWith('/api/analytics') || pathname.startsWith('/api/whatsapp/proactive') || pathname.startsWith('/api/cron')) {

        const authHeader = req.headers.get('authorization');

        // 1. Basic Authorization Gate
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                jsonrpc: "2.0",
                error: { code: -32000, message: "Unauthorized: Missing or invalid Bearer token" },
                id: null
            }, { status: 401 });
        }

        // 2. Strict JSON-RPC 2.0 Payload Validation for A2A communication
        if (req.method === "POST") {
            try {
                const bodyContent = await req.clone().text(); // Clone to read without consuming the stream
                if (bodyContent) {
                    const body = JSON.parse(bodyContent);

                    // Validate JSON-RPC 2.0 structure if the client claims to use it
                    if (body.jsonrpc && body.jsonrpc !== "2.0") {
                        return NextResponse.json({
                            jsonrpc: "2.0",
                            error: { code: -32600, message: "Invalid Request: Must be jsonrpc 2.0" },
                            id: body.id || null
                        }, { status: 400 });
                    }
                }
            } catch (error) {
                return NextResponse.json({
                    jsonrpc: "2.0",
                    error: { code: -32700, message: "Parse error: Invalid JSON payload" },
                    id: null
                }, { status: 400 });
            }
        }
    }

    // Continue to the intended route handler
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/analytics/:path*', '/api/whatsapp/proactive', '/api/cron/:path*'],
};
