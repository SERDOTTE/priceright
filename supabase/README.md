# Supabase SQL setup

This repo does not run migrations automatically. Apply these scripts in the
shared Supabase **SQL Editor** before testing share-quote flows.

Run in order:

1. `quote_rpc.sql` — public token RPCs + unique indexes on `quotes`
2. `orders_quotes_rls.sql` — owner-scoped RLS for `orders` / `quotes`
3. `fix_order_status_check.sql` — allow `quote_sent` status values

Idempotent: safe to re-run (`CREATE OR REPLACE` / `DROP POLICY IF EXISTS`).
