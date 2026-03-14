module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/XinXia/apps/web/src/lib/geminiClient.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "geminiCalistir",
    ()=>geminiCalistir
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/@google+generative-ai@0.24.1/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
if (!process.env.GEMINI_API_KEY) {
    // Let it pass but console error to avoid breaking builds locally
    console.warn('GEMINI_API_KEY eksik, üretim ortamında hata verecektir.');
}
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GEMINI_API_KEY || 'mock_key');
async function geminiCalistir(model, sistemPrompt, userMesaj, options) {
    const { thinkingLevel = 'medium', maxOutputTokens = 8192 } = options ?? {};
    // Gemini 3.x modellerinde thinking budget sadece model 'gemini-3' ile başlıyorsa var
    const isGemini3 = model.startsWith('gemini-3');
    // Low: 1024, Medium: 4096, High: 8192
    const thinkingBudget = thinkingLevel === 'low' ? 1024 : thinkingLevel === 'medium' ? 4096 : 8192;
    const modelInstance = genAI.getGenerativeModel({
        model,
        systemInstruction: sistemPrompt,
        generationConfig: {
            maxOutputTokens,
            ...isGemini3 ? {
                thinkingConfig: {
                    thinkingBudget
                }
            } : {}
        },
        safetySettings: [
            {
                category: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmCategory"].HARM_CATEGORY_HARASSMENT,
                threshold: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmBlockThreshold"].BLOCK_NONE
            },
            {
                category: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmCategory"].HARM_CATEGORY_HATE_SPEECH,
                threshold: __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f40$google$2b$generative$2d$ai$40$0$2e$24$2e$1$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HarmBlockThreshold"].BLOCK_NONE
            }
        ]
    });
    const result = await modelInstance.generateContent([
        {
            text: userMesaj
        }
    ]);
    return result.response.text();
}
}),
"[project]/XinXia/apps/web/src/app/api/site/ai-icerik-uret/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$lib$2f$geminiClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/lib/geminiClient.ts [app-route] (ecmascript)");
;
;
async function POST(req) {
    try {
        const { isletmeAdi, sektor, ilce, sehir, telefon } = await req.json();
        if (!isletmeAdi) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'isletmeAdi zorunlu'
            }, {
                status: 400
            });
        }
        const sektorBilgi = sektor || 'genel hizmet';
        const konum = [
            ilce,
            sehir
        ].filter(Boolean).join(', ') || 'İstanbul';
        const sistem = `Sen Türkiye'deki küçük işletmeler için profesyonel web sitesi içerik yazarısın.
Verilen işletme bilgilerine göre web sitesi için zengin, özgün ve ikna edici Türkçe içerikler üretiyorsun.
Cevabını SADECE JSON formatında ver: { heroBaslik, heroSlogan, ctaBirincil, ctaIkincil, hizmetlerHtml, nedenBizHtml, yorumlarHtml, seoBaslik, seoAciklama, hikaye }
- heroBaslik: Güçlü, kısa (maks 8 kelime) ana başlık
- heroSlogan: Alt başlık slogan (1 cümle)
- ctaBirincil: Ana CTA buton metni (2-3 kelime)
- ctaIkincil: İkincil CTA buton metni (2-3 kelime)
- hizmetlerHtml: 3-4 hizmet kartı HTML'i. Her kart: <div class="hizmet-kart"><div class="hizmet-ikon">EMOJI</div><h3>BAŞLIK</h3><p>AÇIKLAMA</p></div> formatında
- nedenBizHtml: 3-4 özellik/avantaj kartı HTML'i. Her kart: <div class="avantaj-kart"><div class="avantaj-ikon">EMOJI</div><h3>BAŞLIK</h3><p>AÇIKLAMA</p></div> formatında
- yorumlarHtml: 3 müşteri yorumu HTML'i. Her yorum: <div class="yorum-kart"><p class="yorum-metin">"YORUM METNİ"</p><div class="yorum-yazar">İSİM</div><div class="yorum-puan">★★★★★</div></div> formatında
- seoBaslik: SEO başlığı (60 karakter)
- seoAciklama: Meta description (155 karakter)
- hikaye: Hakkımızda bölümü için 2-3 cümle
JSON dışında hiçbir şey yazma, yorum yazma, markdown formatı kullanma.`;
        const prompt = `İşletme: ${isletmeAdi}
Sektör: ${sektorBilgi}
Konum: ${konum}
${telefon ? `Telefon: ${telefon}` : ''}

Bu işletme için web sitesi içeriklerini üret.`;
        const sonuc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$lib$2f$geminiClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["geminiCalistir"])('gemini-3-flash-preview', sistem, prompt, {
            thinkingLevel: 'low',
            maxOutputTokens: 2048
        });
        // JSON parse
        const temiz = sonuc.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
        const json = JSON.parse(temiz);
        return __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            icerik: json
        });
    } catch (e) {
        console.error('[AI İÇERİK ÜRET HATA]', e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9b32e7ab._.js.map