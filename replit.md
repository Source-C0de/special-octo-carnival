# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- **Green Lab Client Portal** (`artifacts/green-lab-portal`, preview path `/`): frontend-only React/Vite client portal and compliance engine for a Saudi ISO/IEC 17025 analytical laboratory. Uses local mock data only; no backend/database calls are required for the portal experience. Includes public marketing/service pages, service detail pages, a mock client dashboard, compliance gap analysis, sample tracker, analytical trends, document export interactions, RTL language toggle, dark mode, quick quote/contact flows, and responsive mobile layouts.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend app**: React 18 + Vite, Tailwind CSS, shadcn/ui, Framer Motion, Recharts, Lucide React, wouter

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
