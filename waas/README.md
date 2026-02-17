# Waas - Website as a Service

## Overview
A multi-tenant, drag-and-drop website builder platform.

## Structure
- `backend`: NestJS API Gateway (PostgreSQL + MongoDB).
- `frontend`: Next.js 15 App (Craft.js + Tailwind).

## Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (for DBs)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Databases**
   ```bash
   docker compose up -d
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npx prisma generate
   npm run start:dev
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Visit**
   - Dashboard: http://localhost:3000
   - API: http://localhost:3001

## Testing
- E2E Tests: `cd frontend && npx playwright test`
- Unit Tests: `cd backend && npm run test`
