/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
    dest: 'public',
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: process.env.NODE_ENV === 'development',
    workboxOptions: {
        disableDevLogs: true,
    },
});

const nextConfig = {
    output: 'standalone' as const,
    serverExternalPackages: ['iyzipay', 'firebase-admin', '@google-cloud/tasks', 'twilio', 'puppeteer-core'],
    transpilePackages: [
        "@kepenk/ui",
        "@kepenk/config",
        "@kepenk/agents",
        "@kepenk/db",
        "@kepenk/cloudflare",
        "@kepenk/shared"
    ],
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "storage.googleapis.com" },
            { protocol: "https", hostname: "firebasestorage.googleapis.com" }
        ],
    },
    turbopack: {}
};

export default withPWA(nextConfig);
