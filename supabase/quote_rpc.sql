-- Public quote RPCs used by /quote/[token] and POST /api/quotes/[token]/approve.
-- Run in the Supabase SQL editor (SECURITY DEFINER so anon can resolve a single token).

CREATE UNIQUE INDEX IF NOT EXISTS quotes_order_id_unique ON quotes (order_id);
CREATE UNIQUE INDEX IF NOT EXISTS quotes_share_token_unique ON quotes (share_token);

CREATE OR REPLACE FUNCTION get_quote_by_token(p_token text)
RETURNS TABLE (
  quote_status text,
  approved_at timestamptz,
  order_description text,
  order_price numeric,
  order_due_date date,
  order_status text,
  customer_name text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    q.status::text AS quote_status,
    q.approved_at,
    o.description AS order_description,
    o.price AS order_price,
    o.due_date AS order_due_date,
    o.status::text AS order_status,
    c.name AS customer_name
  FROM quotes q
  JOIN orders o ON o.id = q.order_id
  JOIN customers c ON c.id = o.customer_id
  WHERE q.share_token = p_token
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION approve_quote_by_token(p_token text)
RETURNS TABLE (
  quote_status text,
  approved_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH updated_quote AS (
    UPDATE quotes
    SET
      status = 'approved',
      approved_at = COALESCE(approved_at, now())
    WHERE share_token = p_token
    RETURNING status, approved_at, order_id
  ),
  _updated_order AS (
    UPDATE orders o
    SET status = 'approved'
    FROM updated_quote uq
    WHERE o.id = uq.order_id
      AND o.status IN ('quote_sent', 'sent')
    RETURNING o.id
  )
  SELECT uq.status::text, uq.approved_at
  FROM updated_quote uq;
END;
$$;

REVOKE ALL ON FUNCTION get_quote_by_token(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION approve_quote_by_token(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_quote_by_token(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION approve_quote_by_token(text) TO anon, authenticated;
