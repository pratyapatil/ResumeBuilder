# Resume Builder (Frontend + AI Backend)

A resume builder with:
- React + Vite frontend
- FastAPI backend for AI resume analysis and Word export endpoint
- 14 resume templates (ATS-safe and designer styles)
- PDF and Word download support

## Features
- Form-based resume editor with live preview
- Paste-resume text parsing
- Layout section ordering + show/hide controls
- AI ATS-style analysis (streaming response)
- PDF export via browser print flow
- Word export via DOCX template generation

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Lucide React
- Export: html2pdf.js, docxtemplater, pizzip, file-saver
- Backend: FastAPI, Uvicorn, httpx, python-docx
- Infra: Docker, Nginx, Docker Compose

## Local Development

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

The Vite dev server proxies `/api/*` to `http://localhost:8000`.

### 2. Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Backend health endpoint:
`http://localhost:8000/health`

## Docker Run
```bash
docker compose up --build
```

Services:
- Frontend (Nginx): `http://localhost:5173`
- Backend (FastAPI): `http://localhost:8000`

## Build
```bash
cd frontend
npm run build
```

This also generates `public/template.docx` using `generate-template.js` before Vite build.

## Vercel Deployment

### Recommended setup
- Deploy the `frontend` folder to Vercel as a Vite app.
- Host the FastAPI backend separately unless you have already converted it to a Vercel Python function.
- Set `VITE_API_BASE_URL` in Vercel to your backend origin, for example `https://resume-api.example.com`.

### Important production notes
- The frontend currently uses `/api/analyze-resume-stream` and `/api/export-word`, so a frontend-only deploy will break AI analysis and Word export unless those endpoints exist in production.
- The backend default model host points to local Ollama via `host.docker.internal`, which will not work on Vercel. Use an externally reachable AI endpoint in production.
- Do not deploy `backend/.env`, `backend/ENV`, or `frontend/node_modules`.

### Vercel settings
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

### Environment variables
- `VITE_API_BASE_URL=https://your-backend.example.com`
- Backend should also have `MODEL_HOST_NAME`, `MODEL_NAME`, and `API_KEY` configured in its own hosting environment when AI analysis is enabled.
