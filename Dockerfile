# ── Build Stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

# ── Dependencies ─────────────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Builder ──────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

# Önce package dosyaları → npm ci (Docker cache katmanı)
COPY package.json package-lock.json ./
RUN npm ci

# Kaynak kodu kopyala
COPY . .

# Build-time env (telemetry kapat, public URL)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true

# Next.js standalone build
RUN npm run build

# ── Runner (Production) ─────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Güvenlik: root olmayan kullanıcı
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Sadece gerekli dosyalar (minimal imaj)
COPY --from=builder /app/public ./public

# Standalone output — tüm bağımlılıklar dahil (~150MB)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Data klasörü (sektör şablonları vb.)
COPY --from=builder --chown=nextjs:nodejs /app/data ./data 2>/dev/null || true

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q --spider http://localhost:8080/api/health || exit 1

USER nextjs
EXPOSE 8080

# Cloud Run graceful shutdown sinyali
STOPSIGNAL SIGTERM

CMD ["node", "server.js"]
