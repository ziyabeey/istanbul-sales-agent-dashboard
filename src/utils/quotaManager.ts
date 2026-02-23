import { db } from "@/utils/firebaseAdmin";

export type PlanType = "temel" | "standart" | "buyume" | "premium";

export interface QuotaStatus {
    hasQuota: boolean;
    message: string;
    isUpsell?: boolean;
}

const DAILY_LIMITS: Record<PlanType, number> = {
    temel: 5,
    standart: 10,
    buyume: 25,
    premium: 9999 // Unlimited
};

/**
 * Validates if the merchant has enough daily quota to continue chatting with the assistant.
 * Enforces the Token Economy logic and generates upsell moments when limits are reached.
 */
export async function checkDailyQuota(merchantId: string, plan: PlanType): Promise<QuotaStatus> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const docRef = db.collection('merchant_quotas').doc(`${merchantId}_${today}`);

    try {
        const docSnap = await docRef.get();
        let currentUsage = 0;

        if (docSnap.exists) {
            currentUsage = docSnap.data()?.messages_sent || 0;
        }

        const limit = DAILY_LIMITS[plan] || 5;

        // Check if limit exceeded
        if (currentUsage >= limit) {
            return {
                hasQuota: false,
                isUpsell: true,
                message: `Bugünlük ${limit} mesajlık ${plan.toUpperCase()} paketi limitimizi doldurduk. Patron, benim de mesaim bitti, yarın devam edelim. Ancak işleri büyütmek ve sınırsız 7/24 konuşmak istersen PREMIUM pakete geçebiliriz: https://xinxia.co/upgrade`
            };
        }

        // Increment usage
        await docRef.set({
            merchantId,
            date: today,
            messages_sent: currentUsage + 1,
            last_updated: new Date().toISOString()
        }, { merge: true });

        return {
            hasQuota: true,
            message: "OK"
        };

    } catch (error) {
        console.error("Quota Manager Error:", error);
        // Fail open if database is down so we don't block users completely, 
        // but in a strict token economy we might want to fail closed. We'll fail open for UX.
        return { hasQuota: true, message: "OK" };
    }
}
