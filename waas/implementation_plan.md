# Implementation Plan - Waas Project

## Project Overview
**Name**: Waas (Website as a Service)
**Description**: Multi-tenant, drag-and-drop editor, real-time preview, auto-publish platform.
**Stack**:
- **Frontend**: Next.js 15, React, Craft.js, Tailwind, dnd-kit
- **Backend**: NestJS 14
- **Database**: PostgreSQL (Prisma), MongoDB (Mongoose/NoSQL for JSONB), Redis (Cache)
- **Auth**: Clerk
- **Payments**: Stripe
- **Storage**: S3
- **DevOps**: Docker Compose, Helm, GitHub Actions

## Architecture (High-Level)

### C4 Context
- **User**: Interacts with the Frontend Editor.
- **Waas System**: The core platform.
  - **Frontend (Next.js)**: Drag-and-drop interface, real-time preview, dashboard.
  - **Backend (NestJS)**: API Gateway, User Management, Site Management, Subscription handling.
  - **Databases**: Postgres (Relational data: Users, Subscriptions), MongoDB (Page schemas, JSON content), Redis (Session/Cache).
  - **External Services**: Clerk (Auth), Stripe (Payments), AWS S3 (Media), Vercel/Netlify (Deployment targets).

## Modules & Roles

### 1. Frontend (Next.js 15)
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS.
- **Core Libs**:
  - `@craftjs/core`: For the drag-and-drop visual editing logic.
  - `@dnd-kit/core`: For complex drag-and-drop interactions.
- **Components**:
  - `Editor`: The main canvas.
  - `Toolbox`: Draggable components (Button, Text, Image, Container).
  - `SettingsPanel`: Properties editor for selected component.
  - `Preview`: Live view of the site.
- **Integration**:
  - Clerk for Authentication (Sign-in/Sign-up).
  - Stripe Customer Portal integration.

### 2. Backend (NestJS 14)
- **Framework**: NestJS 14.
- **Database Access**:
  - `PrismaService`: For PostgreSQL (Users, Sites, Domains).
  - `MongooseModule`: For MongoDB (Page Content, Versioning).
- **Modules**:
  - `AuthModule`: Integration with Clerk (Webhooks, JWT verification).
  - `SitesModule`: CRUD for websites.
  - `PagesModule`: Content management (JSON storage).
  - `SubscriptionModule`: Stripe Webhooks and logic.
  - `MediaModule`: S3 Presigned URLs for uploads.
  - `PublishModule`: Logic to trigger builds/deployments (Vercel API).

### 3. DevOps & Deployment
- **Docker**: Multi-stage builds for Frontend and Backend.
- **Docker Compose**: Orchestration for local development (Postgres, Mongo, Redis).
- **CI/CD**: GitHub Actions for testing and linting.

## Step-by-Step Implementation

### Phase 1: Foundation (Current)
1.  **Scaffold Project Structure**: Monorepo-like structure (`apps/frontend`, `apps/backend`).
2.  **Docker Setup**: `docker-compose.yml` for database dependencies.

### Phase 2: Backend Core
1.  Initialize NestJS application.
2.  Setup Prisma (Postgres) and Mongoose (MongoDB) connections.
3.  Implement Clerk Auth Guard.
4.  Create `Sites` and `Pages` CRUD APIs.

### Phase 3: Frontend Core
1.  Initialize Next.js application.
2.  Setup Tailwind CSS.
3.  Integrate Clerk Provider.
4.  Implement Basic Dashboard (List sites).
5.  Implement Editor Shell (Craft.js setup).

### Phase 4: Editor Features
1.  Build primitive components (Button, Container, Text).
2.  Implement Drag-and-Drop (Toolbox -> Canvas).
3.  Implement Properties Panel (Edit text, colors).
4.  Save/Load logic (connect to Backend API).

### Phase 5: Polish & Integration
1.  Real-time preview (Iframe).
2.  Stripe Integration.
3.  Deploy pipelines.

## Next Steps
- Create directory structure.
- Initialize `docker-compose.yml`.
- Initialize `apps/backend`.
- Initialize `apps/frontend`.
