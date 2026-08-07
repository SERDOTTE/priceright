# PriceRight & QuoteEasy

A full-stack web application that helps micro-entrepreneurs, artisans and independent
professionals price their work and manage the order workflow from the first quote to
final delivery. The app calculates a recommended selling price from real costs
(materials, labour and a target profit margin), then tracks each order through its
stages and reports on cash flow. The goal is to turn financial management for
self-employed workers into a simple, visual process instead of a tangle of spreadsheets.

Built for WDD 430, Web Full-Stack Development, at BYU-Idaho.

## Team members

- Nick Daniel Alejandro Granados Lares
- Rodrigo Serdotte Freitas
- Osamagumwende Flourish Idahosa-Sunny

## Live application

Production deployment: **https://priceright-chi.vercel.app**

## Tech stack

- **Next.js 16** with the App Router, React 19 and TypeScript
- **Supabase** for PostgreSQL and authentication, accessed through `@supabase/ssr`
- **Tailwind CSS** with shadcn/ui components, plus TanStack Table for data grids
- **Vercel** for hosting

## Getting started

### Prerequisites

- Node.js 20 or newer
- A Supabase project (the team shares a single instance)

### Environment variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Both values come from your Supabase project under **Project Settings → API**. The anon
key is safe to expose to the browser; never put the service role key in this file.

### Install and run

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.

### Database setup

The schema lives in the shared Supabase instance and is managed from the Supabase
dashboard rather than through migration files. The one SQL file checked into the repo is
`supabase/testimonials.sql`, which creates the `testimonials` table and its row-level
security policies. Run it in the Supabase SQL editor if you are setting up a fresh
project.

Core tables: `customers`, `orders`, `order_material_items`, `quotes`, `material_costs`,
`labor_costs`, `target_profits` and `testimonials`.

## Deployment

The app is deployed on Vercel from the `master` branch.

1. Import the repository into Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment
   variables for the Production, Preview and Development environments.
3. Vercel detects Next.js automatically, so the default build command (`next build`) and
   output settings need no changes.

Every push to `master` triggers a production deployment, and every pull request gets its
own preview deployment.

## API routes

The app is mostly built on React Server Components and server actions. Two REST route
handlers exist for the flows that need to be called from client code.

### `POST /api/orders`

Creates an order for the signed-in user. Requires an authenticated session; the
`user_id` is taken from the session, never from the request body.

Request body:

```json
{
  "customer_id": "uuid",
  "description": "string",
  "price": 100.0,
  "due_date": "2026-09-15",
  "status": "quote_sent | approved | in_progress | delivered",
  "payment_status": "pending | paid | overdue"
}
```

Responses: `201` with the created order, `400` on validation failure, `401` when not
signed in, `500` on a database error. When `payment_status` is `paid`, the handler stamps
`paid_at` with the current timestamp, which is what the cash flow dashboard reads to
total revenue for the month.

### `POST /api/quotes/[token]/approve`

Approves a shared quote from its public link. Deliberately unauthenticated, because the
customer receiving the quote does not have an account. The share token is the
capability: it is looked up through the `approve_quote_by_token` database function, which
performs the update server-side.

Responses: `200` with `{ status, approvedAt }`, or `404` when the token does not match a
quote.

## Project structure

```
src/
  app/
    (auth)/           login and signup routes
    (dashboard)/      authenticated area, guarded by proxy.ts
      dashboard/
        orders/       order list, creation form and drag-and-drop board
        customers/    customer list and editing
        costs/        materials, labour and target profit
    api/              route handlers
    quote/[token]/    public quote approval page
  components/         reusable UI and feature components
  lib/                server actions, Supabase clients and shared types
```

Route groups keep the auth pages and the dashboard on separate layouts. Server components
handle data fetching and client components are used only where interactivity requires
them, such as forms, tables and the drag-and-drop board.

## Known issues and opportunities

- **Cost tables are shared across all users.** `material_costs`, `labor_costs` and
  `target_profits` have no `user_id` column and no row-level security, so every user sees
  and edits the same cost catalogue. Customers, orders and quotes are correctly scoped per
  user. Making costs private per user, or explicitly scoping them to an organisation, is
  the most important outstanding fix.
- **The testimonials write policy is too broad.** The row-level security policy on
  `testimonials` allows any authenticated user to insert, update or delete rows, including
  the testimonials shown on the public home page. It should be narrowed to the service
  role.
- **No automated tests.** There is no test runner in the project. Features are verified
  manually and the steps are recorded in pull request descriptions. Adding Vitest with
  React Testing Library would be the natural first step.
- **No migration tooling.** Schema changes are applied by hand in the Supabase dashboard,
  which has already caused drift between the database and the code. Adopting the Supabase
  CLI and versioned migrations would prevent it.
- **Dead code.** Several `deprecated/` folders and files ending in `Depr` remain in the
  tree and are not imported anywhere. Git history already preserves them, so they can be
  deleted.
- **Drag-and-drop is pointer only.** The order board uses native HTML5 drag events, which
  do not fire on touch screens. Each card carries a stage selector that performs the same
  move, so the feature remains usable, but a library such as dnd-kit would give proper
  touch and keyboard support.
