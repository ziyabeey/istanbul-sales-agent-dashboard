module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/XinXia/apps/web/src/auth.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$_lhqgqj4zls3jl5epnoaslsztyu$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next-auth@5.0.0-beta.30_next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19._lhqgqj4zls3jl5epnoaslsztyu/node_modules/next-auth/index.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$_lhqgqj4zls3jl5epnoaslsztyu$2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/next-auth@5.0.0-beta.30_next@16.1.6_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19._lhqgqj4zls3jl5epnoaslsztyu/node_modules/next-auth/providers/credentials.js [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$41$2e$0$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/node_modules/.pnpm/@auth+core@0.41.0/node_modules/@auth/core/providers/credentials.js [middleware] (ecmascript)");
;
;
// Secret from Env or fallback for local dev
const secret = process.env.AUTH_SECRET || "kepenk-ai-super-secret-key-12345";
const { handlers, signIn, signOut, auth } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_$40$opentelemetry$2b$api$40$1$2e$9$2e$0_react$2d$dom$40$19$2e$_lhqgqj4zls3jl5epnoaslsztyu$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    secret,
    session: {
        strategy: 'jwt'
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$node_modules$2f2e$pnpm$2f40$auth$2b$core$40$0$2e$41$2e$0$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"])({
            name: 'Credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Şifre",
                    type: "password"
                }
            },
            async authorize (credentials) {
                // MOCK LOGIN - Prod'da veritabanından çekilecek
                if (credentials?.email === 'admin@kepenk.ai' && credentials?.password === '123456') {
                    return {
                        id: 'merchant_123',
                        name: 'Ahmet Berber',
                        email: 'admin@kepenk.ai',
                        role: 'admin' // İstenirse role tabanlı yetki için
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    }
});
}),
"[project]/XinXia/apps/web/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$auth$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/XinXia/apps/web/src/auth.ts [middleware] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$XinXia$2f$apps$2f$web$2f$src$2f$auth$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["auth"])((req)=>{
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;
    // Admin koruması (Legacy from proxy.ts)
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const token = req.cookies.get('admin_token')?.value;
        if (token !== process.env.ADMIN_SECRET_TOKEN) {
            return Response.redirect(new URL('/admin/login', req.nextUrl));
        }
    }
    // Check if the route requires authentication (Dashboard)
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
            return Response.redirect(new URL(`/login?callbackUrl=${pathname}`, req.nextUrl));
        }
    }
    // Redirect logged-in users away from the login page
    if (pathname.startsWith("/login")) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/dashboard", req.nextUrl));
        }
    }
});
const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6566b1c9._.js.map