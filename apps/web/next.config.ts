/** @type {import('next').NextConfig} */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import createPWA from '@ducanh2912/next-pwa';

const withPWA = createPWA({
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

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const nextConfig = {
    output: 'standalone' as const,
    outputFileTracingRoot: workspaceRoot,
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
    turbopack: {
        root: workspaceRoot,
    },
    typescript: {
        // TODO: Pre-existing TS errors in demo/template files — fix incrementally
        ignoreBuildErrors: true,
    },
};

export default withPWA(nextConfig);
