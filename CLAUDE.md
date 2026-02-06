# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BajraGuru is a full-stack e-commerce platform for traditional Buddhist products (meditation bowls, incense, statues, decor, ritual items, edibles). The full specification lives in `bajraguru-spec.md`.

## Tech Stack

- **Frontend:** React 18+ with Vite, React Router v6, Tailwind CSS, React Query, Lucide React icons
- **Backend:** Node.js 18+ with Express.js
- **Database:** SQLite with Prisma or Drizzle ORM
- **Image processing:** Sharp (resize, WebP conversion)
- **File uploads:** Multer middleware
- **Auth:** Simple password gate with JWT (24h expiry), no user accounts

## Architecture

Monorepo with two packages: a Vite React frontend (`src/`) and an Express backend (`server/`).

**Frontend** uses React Context + useReducer for cart state and React Query for server state. Admin routes should be lazy-loaded for code splitting.

**Backend** follows routes → controllers → services pattern. Auth middleware protects admin endpoints (`POST/PUT/DELETE` on products, contact message listing). Public endpoints (product listing/detail, feedback submission, contact submission) require no auth.

**Database** has four tables: `products`, `product_images`, `feedback`, `contact_messages`. Product images are stored on the local filesystem under `/uploads/products/{productId}/` with original and thumbnail variants.

## API Structure

All API routes are prefixed with `/api/`:
- `/api/products` — CRUD + image upload (admin writes protected)
- `/api/feedback` — public GET (approved only) and POST
- `/api/contact` — public POST, admin GET (protected)
- `/api/auth/login` and `/api/auth/verify` — admin authentication

Product listing supports query params: `category`, `minPrice`, `maxPrice`, `search`, `sort` (price_asc, price_desc, popularity, newest), `featured`, `page`, `limit`.

## Design System

- **Aesthetic:** Modern editorial, minimalistic — heavy whitespace (80px+ section padding), soft curves, organic SVG blobs
- **Colors:** Sage Green `#9DB4A0`, Warm Sand `#F5F0E8`, Muted Gold `#C9A86C`, Charcoal text `#2D2D2D`, Off-White bg `#FDFBF7`, Soft Terracotta accent `#D4A59A`
- **Typography:** Serif headings (Playfair Display or Cormorant Garamond), sans-serif body (Inter or DM Sans)
- **Cards:** 16px border-radius, soft shadows, hover scale 1.02–1.05
- **Approach:** Mobile-first responsive design

## Environment Variables

```
PORT=3001
DATABASE_URL=./database.sqlite
ADMIN_PASSWORD=<secure password>
JWT_SECRET=<256-bit secret>
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

## Key Implementation Notes

- Product categories are a fixed set: `decor`, `meditation`, `incense`, `statues`, `ritual`, `edibles`
- Images are processed through Sharp: resize to max 1200px, create 300px thumbnails, convert to WebP
- Cart is client-side only (no server-side cart persistence)
- Admin auth is a single shared password, not per-user accounts
- All images should lazy-load below the fold with blur placeholders
