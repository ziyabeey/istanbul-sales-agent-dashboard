/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        "@kepenk/ui",
        "@kepenk/config",
        "@kepenk/shared",
        "@kepenk/db"
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

export default nextConfig;
