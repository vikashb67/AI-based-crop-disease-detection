# AI Crop Disease Detection — Frontend MVP

This repository contains the frontend for the AI-based Crop Disease Detection web app (React). This README collects run/deploy instructions, environment variables, API contract expectations, and a clear per-role handoff checklist so teammates can pick up their tasks and complete integration.

---

## Project overview

High-level flow:
- Farmer opens frontend (React app hosted on Firebase Hosting)
- Farmer logs in with Firebase Authentication (Email/Password)
- Farmer uploads a leaf photo (client compress & preview)
- Image is saved to Firebase Storage (permanent copy)
- Frontend calls backend `/predict` endpoint (Abhinav's FastAPI)
- Backend runs the model (Pranav's predict.py) and returns JSON
- Frontend displays: disease, confidence, severity, description, treatment steps and overlay
- Result saved to Firestore for user's history
- Chatbot and translation (Hindi/Kannada) are optional follow-ups

---

## Repository layout (important paths)

- frontend/ — React app
  - public/ — static assets (put `logo.png` here)
  - src/ — React source files (pages, components, utils)
  - add-logo.ps1 — helper to copy a logo into public/
  - .env.template — template for required environment variables (placed here)

- README.md (this file)

---

## Prerequisites (for local development)

- Node.js 16+ and npm
- Git
- (Optional) Python/venv for backend & model testing
- Firebase project (for Auth/Storage/Firestore) — see next section

---

## Frontend — local dev (exact commands)

1. From the frontend folder, install dependencies:

   cd frontend
   npm install

2. Create a local environment file (copy values from Firebase console). Create `frontend/.env.local` with:

   REACT_APP_FIREBASE_API_KEY=<your_api_key>
   REACT_APP_FIREBASE_AUTH_DOMAIN=<your_project>.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=<your_project_id>
   REACT_APP_FIREBASE_STORAGE_BUCKET=<your_bucket>.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<messaging_sender_id>
   REACT_APP_FIREBASE_APP_ID=<app_id>
   REACT_APP_API_BASE_URL=http://localhost:8000

   Note: Do NOT commit `.env.local` to source control.

3. Start the dev server (create-react-app):

   npm start

4. Build for production:

   npm run build

---

## Backend — expected contract and local dev

Frontend expects the backend `/predict` endpoint to behave as follows (JSON response):

POST /predict
- Accepts multipart form file (field name `file`) or a JSON body with `imageUrl`.
- Returns JSON:
  {
    "disease": "TOMATO EARLY BLIGHT",
    "confidence": 0.94,
    "severity": "HIGH",        // LOW | MEDIUM | HIGH
    "description": "Simple plain-language description.",
    "treatment": ["1. Remove affected leaves", "2. Apply fungicide"],
    "overlayUrl": "https://..." // optional: mask/highlight image URL
  }

Local run (FastAPI example):

   # from backend root
   uvicorn main:app --reload --host 0.0.0.0 --port 8000

Or using Docker:

   docker build -t crop-backend .
   docker run -p 8000:8000 crop-backend

Important: enable CORS for the frontend origin (http://localhost:3000)

---

## Model & inference

Model should expose a callable interface used by the backend:
- `predict(image_path_or_bytes) -> dict` matching the JSON keys above.
- Optionally provide an overlay/mask image that the backend can upload to Storage and return the URL.

Provide:
- requirements.txt
- predict.py and test script (test_predict.py)
- model weights or a download script
- Dockerfile or conda env spec for reproducible inference

---

## Firebase setup (quick guide)

1. Create a Firebase project in the Firebase Console.
2. Register a Web App and copy the config object (API key + other values). Paste values into `frontend/.env.local`.
3. Enable Authentication → Sign-in method → Email/Password.
4. Create Firestore (for dev: test mode) and Storage bucket.
5. Security rules: restrict reads/writes to authenticated users and to user-owned documents (update before production).
6. Deploy frontend (when ready):

   npm run build
   npm i -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy --only hosting

---

## Per-role checklist (handoff for teammates)

Frontend (You — team lead)
- Add Firebase config to `.env.local` and restart dev server.
- Wire REACT_APP_API_BASE_URL to backend and test end-to-end.
- Verify Firestore writes and Storage uploads.
- Add final logo to `public/logo.png` and optimize images.

Data & Image Processing (Sanjana)
- Provide cleaned & labeled dataset, masks if available.
- Supply preprocessing and upload scripts, dataset manifest.

Backend (Abhinav)
- Implement `/predict` with the JSON contract above.
- Handle image input (multipart form or Storage URL) and return overlayUrl when available.
- Enable CORS and provide mock responses for frontend development.
- Provide deployment Dockerfile and run instructions.

Model (Pranav)
- Provide `predict.py` and weights.
- Provide a fast inference route and overlay generation method.
- Ensure deterministic outputs and document severity thresholds.

---

## Troubleshooting quick list

- Firebase API key error: ensure `REACT_APP_FIREBASE_API_KEY` in `.env.local` is correct and belongs to the same Firebase project.
- Auth errors: enable Email/Password provider in Firebase Console.
- CORS errors: backend must include `Access-Control-Allow-Origin: http://localhost:3000` (or production domain).
- Failed uploads: check Storage rules and that the user is authenticated before upload.

---

## Files added in this change

- frontend/.env.template (template for required env vars)
- README.md (this file)

---

## Acceptance test (run these before handing off)

1. Add Firebase config to `.env.local` and restart the frontend.
2. Register and login a test user.
3. Upload a leaf photo and press Analyse.
4. Confirm backend `/predict` is called and result displays.
5. Confirm saved result is visible in the History screen (Firestore document).

---
