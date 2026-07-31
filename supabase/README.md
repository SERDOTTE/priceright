# Supabase SQL setup

Already applied on the team's **shared** Supabase project. Teammates do **not**
need to run these again for normal development.

Re-run only if recreating the database (or spinning up a new Supabase project).
Order:

1. `quote_rpc.sql` — public token RPCs + unique indexes on `quotes`
2. `orders_quotes_rls.sql` — owner-scoped RLS for `orders` / `quotes`
3. `fix_order_status_check.sql` — allow `quote_sent` status values

Scripts are idempotent (`CREATE OR REPLACE` / `DROP POLICY IF EXISTS`).
