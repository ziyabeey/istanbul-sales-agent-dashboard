#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# kepenk.ai — Google Cloud Scheduler Cron Jobs Setup
# ═══════════════════════════════════════════════════════════════════════════════
# Vercel Cron'ları tamamen SİLİNDİ. Tüm zamanlı görevler Cloud Scheduler ile.
#
# Kullanım:
#   chmod +x scripts/setup-crons.sh
#   ./scripts/setup-crons.sh
#
# Gereksinimler:
#   - gcloud CLI yüklü ve login olmuş
#   - GCP_PROJECT_ID ve CLOUD_RUN_URL set edilmiş
# ═══════════════════════════════════════════════════════════════════════════════

set -euo pipefail

# ── Değişkenler ──────────────────────────────────────────────────────────────
PROJECT_ID="${GCP_PROJECT_ID:-sales-agent-a6269}"
REGION="${GCP_REGION:-europe-west1}"
CLOUD_RUN_URL="${CLOUD_RUN_URL:-https://kepenk.ai}"
SERVICE_ACCOUNT="${GCP_SERVICE_ACCOUNT_EMAIL:-firebase-adminsdk-fbsvc@${PROJECT_ID}.iam.gserviceaccount.com}"
TIMEZONE="Europe/Istanbul"

echo "🚀 kepenk.ai Cloud Scheduler Kurulumu"
echo "   Proje: ${PROJECT_ID}"
echo "   Bölge: ${REGION}"
echo "   URL:   ${CLOUD_RUN_URL}"
echo "──────────────────────────────────────────"

# ── Yardımcı fonksiyon ──────────────────────────────────────────────────────
create_or_update_job() {
    local JOB_NAME=$1
    local SCHEDULE=$2
    local URL_PATH=$3
    local DESCRIPTION=$4
    local METHOD=${5:-GET}

    local FULL_URL="${CLOUD_RUN_URL}${URL_PATH}"

    # Mevcut job varsa güncelle, yoksa oluştur
    if gcloud scheduler jobs describe "${JOB_NAME}" \
        --project="${PROJECT_ID}" \
        --location="${REGION}" &>/dev/null; then
        echo "🔄 Güncelleniyor: ${JOB_NAME}"
        gcloud scheduler jobs update http "${JOB_NAME}" \
            --project="${PROJECT_ID}" \
            --location="${REGION}" \
            --schedule="${SCHEDULE}" \
            --uri="${FULL_URL}" \
            --http-method="${METHOD}" \
            --time-zone="${TIMEZONE}" \
            --description="${DESCRIPTION}" \
            --oidc-service-account-email="${SERVICE_ACCOUNT}" \
            --oidc-token-audience="${CLOUD_RUN_URL}" \
            --attempt-deadline="300s" \
            --quiet
    else
        echo "✅ Oluşturuluyor: ${JOB_NAME}"
        gcloud scheduler jobs create http "${JOB_NAME}" \
            --project="${PROJECT_ID}" \
            --location="${REGION}" \
            --schedule="${SCHEDULE}" \
            --uri="${FULL_URL}" \
            --http-method="${METHOD}" \
            --time-zone="${TIMEZONE}" \
            --description="${DESCRIPTION}" \
            --oidc-service-account-email="${SERVICE_ACCOUNT}" \
            --oidc-token-audience="${CLOUD_RUN_URL}" \
            --attempt-deadline="300s" \
            --quiet
    fi
}

# ═══════════════════════════════════════════════════════════════════════════════
# CRON JOB TANIMLARI
# ═══════════════════════════════════════════════════════════════════════════════

# ── 1. Kuyruk Worker (Her 30 saniye) ─────────────────────────────────────────
create_or_update_job \
    "kepenk-worker" \
    "*/1 * * * *" \
    "/api/cron/worker" \
    "Kuyruk tüketici worker — bekleyen görevleri işler"

# ── 2. Sabah Mesajı Publisher (Hergün 08:00 TR) ─────────────────────────────
create_or_update_job \
    "kepenk-sabah-mesaji" \
    "0 8 * * *" \
    "/api/cron/morning-message" \
    "Sabah mesajı publisher — esnafları kuyruğa ekler"

# ── 3. KVKK Temizleme (Her ayın 1'i, gece 03:00) ───────────────────────────
create_or_update_job \
    "kepenk-kvkk-purge" \
    "0 3 1 * *" \
    "/api/cron/kvkk-purge" \
    "KVKK kişisel veri temizleme"

# ── 4. Data Purge (Her Pazar, gece 03:00) ───────────────────────────────────
create_or_update_job \
    "kepenk-data-purge" \
    "0 3 * * 0" \
    "/api/cron/data-purge" \
    "Eski log ve geçici veri temizleme"

# ── 5. Abonelik Yenileme Hatırlatıcı (Hergün 10:00) ────────────────────────
create_or_update_job \
    "kepenk-yenileme-hatirlatici" \
    "0 10 * * *" \
    "/api/cron/yenileme-hatirlatici" \
    "Abonelik yenileme hatırlatma mesajları"

# ── 6. Churn Scan (Hergün 09:00) ────────────────────────────────────────────
create_or_update_job \
    "kepenk-churn-scan" \
    "0 9 * * *" \
    "/api/cron/churn-scan" \
    "Churn riski tespiti — inaktif esnaf tarama"

# ── 7. Haftalık Rapor (Her Pazartesi 07:00) ─────────────────────────────────
create_or_update_job \
    "kepenk-weekly-report" \
    "0 7 * * 1" \
    "/api/cron/weekly-report" \
    "Haftalık performans raporu üretimi"

# ── 8. Sağlık Skor (Hergün 06:00) ──────────────────────────────────────────
create_or_update_job \
    "kepenk-saglik-skor" \
    "0 6 * * *" \
    "/api/cron/saglik-skor" \
    "Esnaf sağlık skoru hesaplama"

# ── 9. Konuşma Özeti (Hergün 23:00) ─────────────────────────────────────────
create_or_update_job \
    "kepenk-konusma-ozeti" \
    "0 23 * * *" \
    "/api/cron/konusma-ozeti" \
    "Günlük konuşma özetleri üretimi"

# ── 10. Sezon Uyarı (Hergün 11:00) ──────────────────────────────────────────
create_or_update_job \
    "kepenk-sezon-uyari" \
    "0 11 * * *" \
    "/api/cron/sezon-uyari" \
    "Sektörel sezon uyarıları"

# ── 11. Rakip Analiz (Her gün 14:00) ────────────────────────────────────────
create_or_update_job \
    "kepenk-rakip-analiz" \
    "0 14 * * *" \
    "/api/cron/rakip-analiz" \
    "Rakip analizi ve fiyat izleme"

# ── 12. Kuyruk İşleyici (Eski — backward compat) ────────────────────────────
create_or_update_job \
    "kepenk-kuyruk-isleyici" \
    "*/2 * * * *" \
    "/api/cron/kuyruk-isleyici" \
    "Eski kuyruk işleyici (backward compat)"

echo ""
echo "══════════════════════════════════════════"
echo "✅ Toplam 12 Cloud Scheduler job oluşturuldu/güncellendi"
echo "🔐 Tüm job'lar OIDC token ile korunuyor"
echo "⏱  Attempt deadline: 300s (5dk)"
echo "══════════════════════════════════════════"
