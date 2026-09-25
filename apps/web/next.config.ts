/** @type {import('next').NextConfig} */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
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

const nextConfig: NextConfig = {
    output: 'standalone' as const,
    outputFileTracingRoot: workspaceRoot,
    serverExternalPackages: ['iyzipay', 'firebase-admin', '@google-cloud/tasks', 'twilio', 'puppeteer-core'],
    transpilePackages: [
        "@kepenk/ui",
        "@kepenk/config",
        "@kepenk/agents",
        "@kepenk/action-card-schema",
        "@kepenk/db",
        "@kepenk/cloudflare",
        "@kepenk/shared",
        "@kepenk/templates"
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
    webpack: (config, { dev }) => {
        if (dev) {
            config.watchOptions = {
                ...(config.watchOptions ?? {}),
                ignored: [
                    '**/node_modules/**',
                    '**/.next/**',
                    '**/.turbo/**',
                    '**/dist/**',
                    '**/out/**',
                    '**/coverage/**',
                ],
            };
        }

        return config;
    },
};

export default withPWA(nextConfig);
