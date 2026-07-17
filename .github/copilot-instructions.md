# PriceRight & QuoteEasy — Copilot Instructions

## Project Overview

PriceRight & QuoteEasy is a web application for self-employed professionals and micro-entrepreneurs to price their work, manage orders from quote to delivery, share public quote pages with customers, and track cash flow. The full specification lives in `specs/001-pricing-order-management/spec.md` — treat it as the source of truth for features and scope.

## Tech Stack

- Next.js 16 (App Router) with React 19 and the React Compiler enabled
- TypeScript in strict mode — no `any`, prefer explicit types on exported functions
- Tailwind CSS v4 (CSS-based `@theme` config, there is no `tailwind.config.js`)
- shadcn/ui for UI primitives (Button, Input, Card, Select, Dialog)
- Supabase: PostgreSQL as the database and Supabase Auth for authentication
- ESLint 9 + Prettier — code must pass `yarn lint`

On this team, use `yarn` for scripts and `pnpm dlx` for one-off CLIs (for example `pnpm dlx shadcn@latest add button`). Do not suggest `npm` or `npx` commands.

## Architecture Conventions

- Server Components by default; add `"use client"` only when the component needs interactivity (forms, drag-and-drop, event handlers).
- Data access goes through Supabase from the server (Server Components or route handlers). Never expose the Supabase service key to the client.
- API route handlers live under `app/api/` and follow the endpoint list in the spec (`/api/pricing-sheets`, `/api/orders`, `/api/quotes/:token`, `/api/dashboard/finance`, auth routes).
- The public quote page (`/api/quotes/:token`, quote view) must work for visitors without an account; everything else requires an authenticated user.
- Users only ever see their own data: every query on user-owned tables filters by the authenticated user (enforced with Supabase Row Level Security).

## Component Structure

- shadcn/ui primitives live in `components/ui/` (kebab-case files, as generated).
- Custom reusable components live in `components/` grouped by feature (`components/orders/`, `components/pricing/`, `components/quotes/`, `components/finance/`, `components/layout/`).
- Core reusable components: `Header`, `Footer`, `EmptyState`, `StatusBadge`, `PricingSheetForm`, `MaterialsList`, `PriceSummary`, `OrderList`, `OrderCard`, `OrderForm`, `StatusSelector`, `FilterBar`, `QuoteView`, `ApproveQuoteButton`, `StatCard`, `OverdueIndicator`. Reuse these instead of creating near-duplicates.
- `StatusBadge` is the single component for rendering order/payment status everywhere (lists, detail, quote page).

## Data Model (Supabase / PostgreSQL)

Six tables, snake_case names and columns:

- `users` — managed by Supabase Auth (`id`, `email`, `name`)
- `customers` — `id`, `user_id`, `name`, `email`, `phone`
- `pricing_sheets` — `id`, `user_id`, `name`, `target_salary`, `working_hours_per_month`, `margin_percent`, `cost_per_minute`, `suggested_price`
- `materials` — `id`, `pricing_sheet_id`, `name`, `unit_cost`, `quantity`
- `orders` — `id`, `user_id`, `customer_id`, `description`, `status` (`quote_sent` | `approved` | `in_progress` | `delivered`), `price`, `due_date`, `payment_status` (`pending` | `paid` | `overdue`), `paid_at`
- `quotes` — `id`, `order_id`, `share_token` (unique, used in the public URL), `status` (`pending` | `approved`), `approved_at`

Relationships: users 1:N customers, pricing_sheets, orders; pricing_sheets 1:N materials; customers 1:N orders; orders 1:1 quotes. The finance dashboard has no table of its own — revenue, receivables, and overdue are SQL aggregations over `orders`.

## Naming Conventions

- React components: PascalCase (`OrderCard.tsx`); hooks: `useCamelCase`
- Variables and functions: camelCase; module-level constants: UPPER_SNAKE_CASE
- Route folders under `app/`: lowercase kebab-case
- Database tables and columns: snake_case (tables plural)
- TypeScript types/interfaces: PascalCase, no `I` prefix (`Order`, not `IOrder`)

## Design System

- Brand colors are Tailwind theme tokens, never hardcoded hex in components: `brand` `#FFC200` (primary actions, highlights), `action` `#FF4A3C` (CTAs and quote approval only), `ink` `#1A1A1A` (text).
- Text on `brand` yellow is always `ink` black (white fails contrast). Errors use `red-600`, never `action` — CTAs and errors must not look alike.
- Status colors: `green-600` paid/approved, `brand` yellow pending, `red-600` overdue.
- Neutrals: `slate` scale (`slate-50` page background, white cards with `rounded-xl border shadow-sm`, `slate-200` borders).
- Typography via `next/font`: Poppins for headings, Inter for body; currency values always use `tabular-nums`.
- Spacing in multiples of 4 from the Tailwind scale (`p-4`, `p-6`, `gap-6`, `space-y-8`); no arbitrary values like `p-[13px]`.

## Testing

Pricing calculations, order status transitions, and the quote approval flow require unit/integration tests. Pure business logic (for example price calculation) lives in plain TypeScript functions separated from components so it can be tested without rendering.
