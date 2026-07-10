# PriceRight & QuoteEasy Specification

**Feature Branch**: `001-pricing-order-management`  
**Created**: 2026-07-09  
**Status**: Draft  
**Input**: User description: "Create a project specification for PriceRight & QuoteEasy, a pricing and order management web app."

## User Scenarios & Testing

### User Story 1 - Secure Business Account Access (Priority: MVP)

A self-employed professional creates an account and signs in so their business data stays private and they can return to pricing and order work safely.

**Why this priority**: User accounts are the foundation for private pricing data, order history, and secure access to business records.

**Independent Test**: A new user can create an account, sign in, and view a personalized dashboard without seeing another user's data.

**Acceptance Scenarios**:

1. **Given** a new visitor has not created an account, **When** they complete sign-up with a valid email and password, **Then** their account is created and they are signed in.
2. **Given** an existing user, **When** they sign in with the correct credentials, **Then** they access their own workspace and data.
3. **Given** a user enters invalid credentials, **When** they attempt to sign in, **Then** they receive an error message and are not granted access.

---

### User Story 2 - Build a Pricing Workspace with Cost and Margin Guidance (Priority: MVP)

A professional enters their target salary, working hours, material costs, and desired profit margin so the app can calculate a realistic cost-per-minute rate and suggest an ideal selling price.

**Why this priority**: Correct pricing is the core value of the product and the main pain point described by the target audience.

**Independent Test**: A user can enter pricing inputs and receive a recommended selling price and cost breakdown without needing any other feature.

**Acceptance Scenarios**:

1. **Given** a user has a target annual salary and weekly working hours, **When** they enter those values, **Then** the app calculates a cost-per-minute rate.
2. **Given** a user adds registered materials or inputs, **When** they save the pricing sheet, **Then** the app includes those items in the pricing recommendation.
3. **Given** a user sets a target profit margin, **When** they review the recommendation, **Then** the system shows a suggested selling price that reflects labor, materials, and margin.

---

### User Story 3 - Create and Manage Orders Through a Simple Status Workflow (Priority: MVP)

A professional creates an order, tracks its current stage, and updates the stage as work progresses from quote to delivery.

**Why this priority**: Order tracking is essential for reducing missed deadlines, billing errors, and lost visibility across the workflow.

**Independent Test**: A user can create an order, change its stage, and view the updated status in the dashboard.

**Acceptance Scenarios**:

1. **Given** a user is signed in, **When** they create a new order with an initial quote stage, **Then** the order appears in the dashboard.
2. **Given** an existing order, **When** the user changes the stage using the status control, **Then** the order status updates immediately.
3. **Given** an order has reached delivery, **When** the user marks it paid or delivered, **Then** the status reflects the final stage clearly.

---

### User Story 4 - Share a Quote Page With a Customer for Approval (Priority: MVP)

A professional shares a publicly viewable quote page with a customer so the customer can review the quote summary and approve it without needing an account.

**Why this priority**: Shareable quotes directly support the quote-to-approval workflow and reduce friction in customer communication.

**Independent Test**: A customer can open a quote link, review the quote summary, and approve it to update the order status.

**Acceptance Scenarios**:

1. **Given** a user has created a quote, **When** they generate a shareable link, **Then** a public quote page is created.
2. **Given** a customer opens the quote page, **When** they view the summary, **Then** they can clearly understand the quoted value and scope.
3. **Given** a customer approves the quote, **When** the approval is submitted, **Then** the linked order status updates accordingly.

---

### User Story 5 - Review Cash Flow and Payment Health (Priority: MVP)

A professional views monthly revenue, short-term receivables, and overdue payment indicators so they can make better cash-flow decisions.

**Why this priority**: Cash-flow visibility is a central outcome of the product and supports healthier business operations.

**Independent Test**: A user can view summary charts and payment flags for their open orders.

**Acceptance Scenarios**:

1. **Given** a user has completed and unpaid orders, **When** they open the cash flow dashboard, **Then** they see monthly revenue trends and receivables summaries.
2. **Given** an order has an overdue payment, **When** the dashboard is viewed, **Then** the client appears in the overdue or pending payment list.
3. **Given** there are no pending receivables, **When** the dashboard is viewed, **Then** the app displays an empty or neutral state clearly.

---

### User Story 6 - Manage Pricing and Order Records (Priority: Stretch)

A professional creates, reads, updates, and deletes pricing sheets and orders as their business needs evolve.

**Why this priority**: CRUD support is important for long-term usability, but the core MVP can be delivered with a narrower workflow if time is limited.

**Independent Test**: A user can create a record, edit it, and remove it without breaking the rest of the app.

**Acceptance Scenarios**:

1. **Given** a user has a pricing sheet or order, **When** they choose to edit it, **Then** they can update the relevant fields.
2. **Given** a user no longer needs a record, **When** they delete it, **Then** it is removed from the workspace and related summaries.
3. **Given** a user views a record, **When** they request it, **Then** the app displays the latest saved information.

---

### User Story 7 - Use a Kanban-Style Order Board (Priority: Stretch)

A professional uses a drag-and-drop board to move orders between stages for a more visual workflow.

**Why this priority**: The drag-and-drop experience improves usability, but the MVP can be achieved with a simple status control.

**Independent Test**: A user can move an order card between stages on a kanban board and see the update reflected in the system.

**Acceptance Scenarios**:

1. **Given** a user has multiple active orders, **When** they drag one to another stage, **Then** the order status changes.
2. **Given** a user views the board, **When** they refresh the page, **Then** the latest stage assignments remain visible.

---

### Edge Cases

- What happens when a user enters invalid pricing inputs such as zero hours or negative values?
- How does the system handle a share link for a quote that has already been approved or removed?
- What happens when a client approves a quote after the linked order has already been archived or completed?

## Requirements

### Functional Requirements

- **FR-001**: The system MUST allow users to create secure accounts and sign in to private workspaces.
- **FR-002**: The system MUST allow users to create and manage pricing sheets that calculate labor-based cost-per-minute rates.
- **FR-003**: The system MUST allow users to link materials or inputs to pricing calculations and derive a suggested selling price using a desired profit margin.
- **FR-004**: The system MUST allow users to create orders and track them through the stages Quote, Awaiting Deposit, In Production, Ready for Delivery, and Paid.
- **FR-005**: The system MUST allow users to update an order stage through a simple dropdown or action button in the MVP.
- **FR-006**: The system MUST generate a shareable quote page that shows a quote summary to customers without requiring an account.
- **FR-007**: The system MUST allow a customer to approve a quote through the public page and update the related order status.
- **FR-008**: The system MUST provide a cash flow dashboard with monthly revenue and receivable summaries.
- **FR-009**: The system MUST flag pending or overdue payments for clients in the dashboard.
- **FR-010**: The system MUST support creating, reading, updating, and deleting pricing and order records as part of the broader CRUD workflow.
- **FR-011**: The system MUST provide clear validation and error states for invalid inputs, missing data, and unavailable quote links.

### API Endpoints

- **GET /api/auth/signup**: Present sign-up form information for account creation.
- **POST /api/auth/signup**: Create a new account with secure credentials.
- **POST /api/auth/login**: Authenticate a user and create a session.
- **POST /api/auth/logout**: End the current user session.
- **GET /api/pricing-sheets**: Retrieve pricing sheets for the signed-in user.
- **POST /api/pricing-sheets**: Create a new pricing sheet.
- **GET /api/pricing-sheets/:id**: Retrieve a single pricing sheet.
- **PATCH /api/pricing-sheets/:id**: Update a pricing sheet.
- **DELETE /api/pricing-sheets/:id**: Delete a pricing sheet.
- **GET /api/orders**: Retrieve orders for the signed-in user.
- **POST /api/orders**: Create a new order.
- **GET /api/orders/:id**: Retrieve a single order.
- **PATCH /api/orders/:id**: Update order fields and status.
- **DELETE /api/orders/:id**: Delete an order.
- **GET /api/quotes/:token**: Retrieve public quote summary data for a customer.
- **POST /api/quotes/:token/approve**: Approve a quote and update the linked order status.
- **GET /api/dashboard/finance**: Retrieve cash flow dashboard summary data.

### Key Entities

- **User**: Represents a professional account owner with private business data and authentication details.
- **PricingSheet**: Represents a pricing workspace with labor assumptions, material inputs, and a recommended selling price.
- **Order**: Represents a customer job or service request with a status, customer details, and financial information.
- **Quote**: Represents a shareable summary of an order or proposal that can be approved by a customer.
- **PaymentRecord**: Represents invoice or payment status information associated with an order.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can create an account and reach their personal dashboard in under 3 minutes.
- **SC-002**: Users can create a pricing sheet and receive a recommended price in under 2 minutes.
- **SC-003**: Users can create and update an order stage without needing technical support.
- **SC-004**: At least 90 percent of MVP users can complete the core quote-to-order workflow successfully on first try.
- **SC-005**: The cash flow dashboard provides visibility into monthly revenue and overdue payments for at least 80 percent of active users.
