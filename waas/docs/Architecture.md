# System Architecture

## Overview
The Waas platform is built using a Microservices-inspired architecture, although currently monolithic per service (Frontend + Backend).

## Components

### Frontend (Next.js)
- **Editor**: Built with Craft.js, handles Drag-and-Drop.
- **State Management**: React Context + Craft Internal State.
- **Styling**: Tailwind CSS.
- **Authentication**: Clerk (Client-side).

### Backend (NestJS)
- **API Gateway**: REST API for Sites, Pages, Subscriptions.
- **Database Layer**:
  - **Prisma**: PostgreSQL access for relational data (User, Site).
  - **Mongoose**: MongoDB access for document data (Page Schema).
- **Services**:
  - `SitesService`: Core logic.
  - `SubscriptionService`: Stripe integration.

## Interfaces
- **Frontend -> Backend**: REST API calls (axios/fetch).
- **Backend -> Database**: TCP connections via Prisma/Mongoose.
- **Backend -> Stripe**: HTTPS Webhooks.

## Deployment
- **Docker**: Containerized services.
- **CI/CD**: GitHub Actions pipeline.
