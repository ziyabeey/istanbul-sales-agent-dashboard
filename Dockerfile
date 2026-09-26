# ── Build Stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

# ── Dependencies ─────────────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app

# node-canvas falls back to a native build on Alpine/musl x64.
# Keep compiler/header packages out of the production runner image.
RUN apk add --no-cache \
    build-base \
    python3 \
    pkgconf \
    cairo-dev \
    pango-dev \
    pixman-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev

# Monorepo manifest dosyaları (pnpm cache katmanı)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY apps/sites/package.json apps/sites/package.json
COPY packages/agents/package.json packages/agents/package.json
COPY packages/action-card-schema/package.json packages/action-card-schema/package.json
COPY packages/booking-schema/package.json packages/booking-schema/package.json
COPY packages/cloudflare/package.json packages/cloudflare/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/crm-schema/package.json packages/crm-schema/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/ecom-schema/package.json packages/ecom-schema/package.json
COPY packages/publish-engine/package.json packages/publish-engine/package.json
COPY packages/renderer/package.json packages/renderer/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/site-schema/package.json packages/site-schema/package.json
COPY packages/templates/package.json packages/templates/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN pnpm install --frozen-lockfile

# ── Builder ──────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

# Bağımlılıkları kopyala
COPY --from=deps /app/ ./

# Kaynak kodu kopyala
COPY . .

# Build-time env
ENV NEXT_TELEMETRY_DISABLED=1

# Keep the existing Webpack/PWA plugin chain on Next.js 16.
RUN pnpm --filter @kepenk/web build --webpack

# ── Runner (Production) ─────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Native node-canvas runtime libraries only; compiler toolchain stays in deps.
RUN apk add --no-cache \
    cairo \
    pango \
    pixman \
    libjpeg-turbo \
    giflib \
    librsvg

# Güvenlik: root olmayan kullanıcı
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Sadece gerekli dosyalar (minimal imaj)
COPY --from=builder /app/apps/web/public ./public

# Standalone output — tüm bağımlılıklar dahil
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

# Data klasörü (sektör şablonları vb.)
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q --spider http://localhost:8080/api/health || exit 1

USER nextjs
EXPOSE 8080

# Cloud Run graceful shutdown sinyali
STOPSIGNAL SIGTERM

CMD ["node", "server.js"]
