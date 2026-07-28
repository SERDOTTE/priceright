import { OrderCard } from "@/components/orders/OrderCard";
import type { Order } from "@/lib/orders/types";

interface OrderListProps {
  orders: Array<Order & { customer_name: string }>;
}

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return <p className="text-ink/60 text-sm">No orders yet.</p>;
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
