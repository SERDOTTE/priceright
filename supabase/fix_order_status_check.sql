-- Align orders.status check constraint with the app/spec values.
-- Older schemas only allowed 'sent'; current UI uses 'quote_sent'.

ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE orders
  ADD CONSTRAINT orders_status_check
  CHECK (status IN ('quote_sent', 'approved', 'in_progress', 'delivered'));
