# PriceRight & QuoteEasy

## Project Title & Description
PriceRight & QuoteEasy is a web application for self-employed professionals and micro-entrepreneurs who need to price their work correctly and manage orders from quote to delivery. The product helps users replace spreadsheets, notebooks, and chat messages with one clear workspace for pricing, quoting, order tracking, and cash-flow visibility.

The initial release focuses on the core business workflow: secure accounts, pricing calculations, order status tracking, quote sharing, and a simple financial dashboard.

## Purpose & Target Audience
- Audience: self-employed professionals, freelancers, artisans, and micro-entrepreneurs who underprice their work or manage orders informally.
- Purpose: help them price services accurately, reduce billing mistakes, improve deadline tracking, and understand short-term cash flow.

## User Stories

### 1. Create an account and sign in (Priority: MVP)
As a professional, I want to create an account and sign in so that my business data stays private and secure.

**Acceptance Criteria**
- Given a new user, when they submit valid registration information, then the system creates an account and signs them in.
- Given an existing user, when they enter the correct credentials, then the system grants access to their workspace.
- Given invalid credentials, when the sign-in form is submitted, then the system shows an error message and blocks access.

### 2. Create a pricing sheet and calculate a recommended price (Priority: MVP)
As a professional, I want to enter my labor assumptions, materials, and target margin so that I can get a realistic selling price.

**Acceptance Criteria**
- Given a user enters their target salary and working hours, when they save the pricing sheet, then the system calculates a cost-per-minute rate.
- Given a user adds materials or inputs, when they save the sheet, then the system includes them in the recommendation.
- Given a user sets a desired profit margin, when they review the result, then the system shows a suggested selling price that reflects labor, materials, and margin.

### 3. Create and read orders from a simple dashboard (Priority: MVP)
As a professional, I want to create and view orders so that I can track work from quote to delivery in one place.

**Acceptance Criteria**
- Given a signed-in user, when they create a new order, then the order appears in the dashboard with an initial status.
- Given an existing order, when the user opens the dashboard, then they can see the latest order details and status.
- Given an order with missing required information, when the user tries to save it, then the system blocks submission and highlights the issue.

### 4. Update order status through a simple workflow (Priority: MVP)
As a professional, I want to update an order stage so that I can reflect progress and keep the team informed.

**Acceptance Criteria**
- Given an existing order, when the user changes its stage, then the status updates immediately.
- Given the order reaches a later stage, when the user saves the change, then the new stage is visible in the dashboard and in related records.
- Given the user selects an invalid stage, when the action is submitted, then the system prevents the change and shows an error.

### 5. Delete outdated pricing or order records (Priority: Stretch)
As a professional, I want to remove outdated records so that the workspace stays clean and accurate.

**Acceptance Criteria**
- Given an existing pricing sheet or order, when the user confirms deletion, then the record is removed from the workspace.
- Given a deleted record, when the user refreshes the page, then the record no longer appears in lists or summaries.

### 6. Share a quote page with a customer for approval (Priority: MVP)
As a professional, I want to share a quote with a customer so that they can review it and approve it without creating an account.

**Acceptance Criteria**
- Given a saved quote, when the user generates a share link, then a public quote page is created.
- Given a customer opens the quote page, when they view the summary, then they can understand the value and scope of the offer.
- Given the customer approves the quote, when the approval is submitted, then the linked order status updates accordingly.

### 7. Review cash flow and payment status (Priority: MVP)
As a professional, I want to view monthly revenue, receivables, and overdue payments so that I can make better cash-flow decisions.

**Acceptance Criteria**
- Given completed or unpaid orders, when the user opens the dashboard, then they see summaries for revenue, receivables, and payment health.
- Given a client has an overdue invoice, when the dashboard is viewed, then the user sees a clear overdue or pending payment indicator.
- Given no pending payments, when the dashboard is viewed, then the app displays a neutral or empty state clearly.

### 8. Use a drag-and-drop order board (Priority: Stretch)
As a professional, I want to move orders visually between workflow stages so that the order board feels faster and more intuitive.

**Acceptance Criteria**
- Given multiple active orders, when the user drags one to another stage, then the order status changes.
- Given the board is refreshed, when the user returns to the page, then the latest stage assignments remain visible.

## Technical Requirements
- Framework: Next.js App Router
- Language: TypeScript in strict mode
- Styling: Tailwind CSS with utility-first styling and minimal custom CSS
- Architecture: server components by default, with client components only where interactivity is required
- Authentication: secure sign-up and sign-in for private business data
- Testing: unit and integration coverage for pricing logic, order status updates, and quote approval flows

## Core API Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/pricing-sheets
- POST /api/pricing-sheets
- GET /api/pricing-sheets/:id
- PATCH /api/pricing-sheets/:id
- DELETE /api/pricing-sheets/:id
- GET /api/orders
- POST /api/orders
- GET /api/orders/:id
- PATCH /api/orders/:id
- DELETE /api/orders/:id
- GET /api/quotes/:token
- POST /api/quotes/:token/approve
- GET /api/dashboard/finance

## Implementation Priority
- MVP: sign up and login, pricing calculator, order creation and status updates, public quote approval, cash-flow dashboard
- Stretch: delete workflows, drag-and-drop kanban board, richer reporting, and automation features
