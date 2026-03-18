import { NextResponse } from 'next/server';
import { CloudflareRegistrar } from '@kepenk/cloudflare/registrar';
import { CloudflareDNS } from '@kepenk/cloudflare/dns';
// import { adminDb } from '@kepenk/db'; // Mock for now

const registrar = new CloudflareRegistrar();
const dns = new CloudflareDNS();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { domain, merchantId } = body;

        if (!domain || !merchantId) {
            return NextResponse.json({ error: 'Domain ve merchantId gereklidir.' }, { status: 400 });
        }

        // 1. Check Availability
        const isAvailable = await registrar.checkAvailability(domain);
        if (!isAvailable) {
            return NextResponse.json({ error: 'Bu alan adı daha önce alınmış.' }, { status: 400 });
        }

        // 2. Register Domain (Mock if no API keys)
        if (process.env.CF_API_TOKEN === 'dummy' || !process.env.CF_API_TOKEN) {
            // console.log(`[Domain API] Mock Registration for ${domain} by merchant ${merchantId}`);
        } else {
            // Mock contact data for now, real app takes this from Onboarding Step 2
            await registrar.purchaseDomain({
                domain,
                years: 1,
                esnafId: merchantId,
                contact: {
                    first_name: "Admin", last_name: "Kepenk", email: "admin@kepenk.ai",
                    phone: "+905554443322", address: "Sisli", city: "Istanbul", state: "TR",
                    zip: "34000", country: "TR"
                }
            });
        }

        // 3. Set up DNS (CNAME pointing to sites.kepenk.ai)
        if (process.env.CF_API_TOKEN !== 'dummy' && process.env.CF_API_TOKEN) {
             // Mock target, in production we would get the custom domain's newly created Zone ID
             await dns.connectCustomDomain('mock-zone-id', domain, 'sites.kepenk.ai');
        }

        // 4. Update Merchant Database Document
        // await adminDb.collection('businesses').doc(merchantId).update({ customDomain: domain });

        return NextResponse.json({ 
            success: true, 
            message: `${domain} başarıyla tescil edildi ve bağlandı.`
        });
        
    } catch (error: any) {
        // console.error('[Domain API] Registration Error:', error);
        return NextResponse.json({ error: error.message || 'Kayıt işlemi başarısız.' }, { status: 500 });
    }
}
