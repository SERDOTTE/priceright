import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface Notification {
  id: string;
  message: string;
  link: string;
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const notifications: Notification[] = [];
  const now = new Date().toISOString();

  // Parallel database execution using lightweight HEAD requests
  const [
    { count: overdueCount, error: overdueError },
    { count: customerCount, error: customerError },
    { count: orderCount, error: orderError }
  ] = await Promise.all([
    supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .neq('status', 'paid')
      .lt('due_date', now),

    supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id),

    supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
  ]);

  // Log failures for monitoring (e.g., Sentry / Datadog)
  if (overdueError) console.error('Error checking overdue orders:', overdueError);
  if (customerError) console.error('Error checking customer count:', customerError);
  if (orderError) console.error('Error checking order count:', orderError);

  // Safely check counts ONLY when query succeeds (!error)
  if (!overdueError && overdueCount !== null && overdueCount > 0) {
    notifications.push({
      id: 'overdue-payments',
      message: `You have ${overdueCount} overdue payment(s).`,
      link: '/dashboard/orders'
    });
  }

  if (!customerError && customerCount === 0) {
    notifications.push({
      id: 'no-customers',
      message: 'You have no customers. Add one to get started.',
      link: '/dashboard/customers'
    });
  }

  if (!orderError && orderCount === 0) {
    notifications.push({
      id: 'no-orders',
      message: 'You have no orders. Create one to get started.',
      link: '/dashboard/orders/create'
    });
  }
  console.log(notifications)
  return NextResponse.json(notifications, {
    headers: { 'Cache-Control': 'private, max-age=15, stale-while-revalidate=30' }
  });
}