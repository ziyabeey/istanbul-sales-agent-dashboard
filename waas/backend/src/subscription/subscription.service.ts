import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
    private stripe: Stripe;

    constructor(private configService: ConfigService) {
        this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {
            apiVersion: '2026-01-28.clover', // Latest or pinned version
        });
    }

    async createCheckoutSession(userId: string, priceId: string) {
        const session = await this.stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${this.configService.get('FRONTEND_URL')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${this.configService.get('FRONTEND_URL')}/pricing`,
            client_reference_id: userId,
        });
        return { url: session.url };
    }

    async handleWebhook(signature: string, payload: Buffer) {
        const event = this.stripe.webhooks.constructEvent(
            payload,
            signature,
            this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!,
        );

        // Handle events
        switch (event.type) {
            case 'checkout.session.completed':
                // Update user subscription status in DB
                break;
        }
    }
}
