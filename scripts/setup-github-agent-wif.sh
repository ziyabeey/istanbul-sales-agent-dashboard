#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-cs-project-ljhot8la}"
REPOSITORY="${REPOSITORY:-ziyabeey/istanbul-sales-agent-dashboard}"
POOL_ID="${POOL_ID:-kepenk-github}"
PROVIDER_ID="${PROVIDER_ID:-github}"
SERVICE_ACCOUNT_NAME="${SERVICE_ACCOUNT_NAME:-kepenk-github-agent}"

gcloud config set project "$PROJECT_ID" >/dev/null

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
PROVIDER_RESOURCE="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}"

gcloud services enable   iam.googleapis.com   iamcredentials.googleapis.com   sts.googleapis.com   aiplatform.googleapis.com   --project="$PROJECT_ID" >/dev/null

if ! gcloud iam service-accounts describe "$SERVICE_ACCOUNT_EMAIL"   --project="$PROJECT_ID" >/dev/null 2>&1; then
  gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME"     --project="$PROJECT_ID"     --display-name="Kepenk GitHub Gemini Worker"
fi

gcloud projects add-iam-policy-binding "$PROJECT_ID"   --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}"   --role="roles/aiplatform.user"   --condition=None >/dev/null

gcloud projects add-iam-policy-binding "$PROJECT_ID"   --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}"   --role="roles/serviceusage.serviceUsageConsumer"   --condition=None >/dev/null

if ! gcloud iam workload-identity-pools describe "$POOL_ID"   --project="$PROJECT_ID"   --location=global >/dev/null 2>&1; then
  gcloud iam workload-identity-pools create "$POOL_ID"     --project="$PROJECT_ID"     --location=global     --display-name="Kepenk GitHub Actions"
fi

if ! gcloud iam workload-identity-pools providers describe "$PROVIDER_ID"   --project="$PROJECT_ID"   --location=global   --workload-identity-pool="$POOL_ID" >/dev/null 2>&1; then
  gcloud iam workload-identity-pools providers create-oidc "$PROVIDER_ID"     --project="$PROJECT_ID"     --location=global     --workload-identity-pool="$POOL_ID"     --display-name="GitHub OIDC"     --issuer-uri="https://token.actions.githubusercontent.com"     --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner,attribute.ref=assertion.ref"     --attribute-condition="assertion.repository=='${REPOSITORY}'"
fi

MEMBER="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${REPOSITORY}"

gcloud iam service-accounts add-iam-policy-binding "$SERVICE_ACCOUNT_EMAIL"   --project="$PROJECT_ID"   --role="roles/iam.workloadIdentityUser"   --member="$MEMBER" >/dev/null

echo "WIF_READY=true"
echo "PROJECT_ID=$PROJECT_ID"
echo "PROJECT_NUMBER=$PROJECT_NUMBER"
echo "SERVICE_ACCOUNT=$SERVICE_ACCOUNT_EMAIL"
echo "WORKLOAD_IDENTITY_PROVIDER=$PROVIDER_RESOURCE"
