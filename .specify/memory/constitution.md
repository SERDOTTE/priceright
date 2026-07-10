<!--
Sync Impact Report
- Version change: 0.0.0 -> 1.0.0
- Modified principles: none -> 5 principles
- Added sections: Additional Constraints, Development Workflow
- Removed sections: none
- Templates requiring updates: ✅ .specify/templates/plan-template.md, ✅ .specify/templates/spec-template.md, ✅ .specify/templates/tasks-template.md, ⚠ .specify/templates/commands/ (directory not present in repository)
- Follow-up TODOs: none
-->

# PriceRight & QuoteEasy Constitution

## Core Principles

### I. Accuracy Before Convenience
Every pricing calculation, quote, and order transition MUST reflect the real business rules and user intent. The product MUST help self-employed professionals price work correctly and track orders from quote to delivery without ambiguity. This principle is non-negotiable because trust in pricing and order data is the core value of the product.

### II. Type-Safe, Maintainable Implementation
All application code MUST use TypeScript in strict mode. The team MUST avoid `any` and prefer explicit types, interfaces, and discriminated unions for domain data and shared contracts. Any new data shape or API boundary MUST be typed centrally so logic remains understandable and regression-resistant.

### III. Tailwind-First UI, Minimal Styling Exceptions
User interface work MUST favor Tailwind utility classes and component composition over custom CSS. Custom CSS is allowed only when Tailwind cannot express the requirement clearly or when a third-party integration requires it. Styling changes MUST remain consistent, responsive, and easy to reason about.

### IV. Next.js App Router Discipline
Features MUST follow Next.js App Router conventions. Server components MUST be the default for data and rendering work, and client components MUST be used only when interactivity, browser APIs, or local state require them. Routes MUST be file-based, and data fetching or side effects MUST be placed in the appropriate server boundary.

### V. Verified Delivery Through Tests and Review
Meaningful changes MUST be covered by tests appropriate to the risk level. Business logic such as pricing rules and order-state transitions MUST have unit coverage, and user workflows such as quote creation, order updates, and delivery tracking MUST have integration or component coverage where practical. Changes MUST be reviewed collaboratively before merge and documented when behavior is not obvious.

### VI. Clear Naming and Shared Ownership
Components, routes, files, functions, and variables MUST use consistent naming conventions. React components MUST use PascalCase, functions and variables MUST use camelCase, route segments and files MUST use kebab-case, and immutable constants MUST use UPPER_CASE. Work MUST be easy to understand, easy to hand off, and reviewed with the same standards by every team member.

## Additional Constraints

The product MUST be built with the required stack: Next.js with the App Router, TypeScript, and Tailwind CSS. TypeScript MUST remain in strict mode with no use of `any`. Tailwind MUST remain the default styling approach, and custom CSS MUST be limited to justified exceptions. All new features MUST support the core user journey of pricing work correctly and managing orders from quote to delivery.

## Development Workflow

Features MUST begin with clear user value and acceptance criteria. Before implementation, the team MUST define the relevant business rules, edge cases, and user-visible outcomes. Pull requests MUST include a concise summary, the tests or verification performed, and any trade-offs or exceptions that affect the product. Documentation MUST be updated when behavior, contracts, or collaboration rules change.

## Governance

This constitution supersedes ad-hoc practices for PriceRight and QuoteEasy. Amendments MUST include a documented rationale, an impact review of affected templates and workflows, and approval from the maintainers before adoption. Any change that alters the required stack, TypeScript expectations, Tailwind usage, testing expectations, or collaboration rules MUST be reflected in the relevant planning, specification, and task artifacts before implementation proceeds. Compliance with this constitution is reviewed in pull requests and before release.

**Version**: 1.0.0 | **Ratified**: 2026-07-09 | **Last Amended**: 2026-07-09
