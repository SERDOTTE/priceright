-- Scoped RLS for orders and quotes (owner = auth.uid() via orders.user_id).
-- Public quote access goes through SECURITY DEFINER RPCs in quote_rpc.sql, not table grants.

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS orders_select_own ON orders;
DROP POLICY IF EXISTS orders_insert_own ON orders;
DROP POLICY IF EXISTS orders_update_own ON orders;
DROP POLICY IF EXISTS orders_delete_own ON orders;

CREATE POLICY orders_select_own ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY orders_insert_own ON orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY orders_update_own ON orders
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY orders_delete_own ON orders
  FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS quotes_select_own ON quotes;
DROP POLICY IF EXISTS quotes_insert_own ON quotes;
DROP POLICY IF EXISTS quotes_update_own ON quotes;
DROP POLICY IF EXISTS quotes_delete_own ON quotes;

CREATE POLICY quotes_select_own ON quotes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM orders o
      WHERE o.id = quotes.order_id
        AND o.user_id = auth.uid()
    )
  );

CREATE POLICY quotes_insert_own ON quotes
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM orders o
      WHERE o.id = quotes.order_id
        AND o.user_id = auth.uid()
    )
  );

CREATE POLICY quotes_update_own ON quotes
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM orders o
      WHERE o.id = quotes.order_id
        AND o.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM orders o
      WHERE o.id = quotes.order_id
        AND o.user_id = auth.uid()
    )
  );

CREATE POLICY quotes_delete_own ON quotes
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM orders o
      WHERE o.id = quotes.order_id
        AND o.user_id = auth.uid()
    )
  );
