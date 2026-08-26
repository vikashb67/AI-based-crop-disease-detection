#!/bin/bash
# Build and deploy backend to Cloud Run using Cloud Build
# Set PROJECT_ID and SA_EMAIL env vars before running
set -euo pipefail
PROJECT_ID=${PROJECT_ID:-"your-gcp-project-id"}
SERVICE_ACCOUNT=${SA_EMAIL:-"fastapi-sa@${PROJECT_ID}.iam.gserviceaccount.com"}
IMAGE=gcr.io/${PROJECT_ID}/fastapi-predict

# Build
gcloud builds submit --tag ${IMAGE}

# Deploy
gcloud run deploy fastapi-predict \
  --image ${IMAGE} \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --service-account ${SERVICE_ACCOUNT} \
  --set-env-vars GCS_BUCKET=${PROJECT_ID}.appspot.com,FRONTEND_URL=https://${PROJECT_ID}.web.app

echo "Deployed Cloud Run service fastapi-predict with image ${IMAGE}" 
