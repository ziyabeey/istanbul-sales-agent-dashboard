import { NextRequest, NextResponse } from 'next/server'
import { domainDurumKontrol } from '@/lib/cloudflareRegistrar'

export async function GET(req: NextRequest) {
    const domain = req.nextUrl.searchParams.get('domain')
    if (!domain) {
        return NextResponse.json({ error: 'domain parametresi gerekli' }, { status: 400 })
    }

    try {
        const durum = await domainDurumKontrol(domain)
        return NextResponse.json(durum)
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
