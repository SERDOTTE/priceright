import { OrderList } from "@/components/orders/OrderList";
import { listOrders } from "@/lib/orders/action";

export default async function OrdersListPage() {
  const orders = await listOrders();

  return (
    <div className="min-h-screen w-full m-1 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] bg-white">
      <main className="p-4 sm:p-8 max-w-3xl mx-auto">
        <h1 className="font-heading text-2xl font-bold text-ink mb-6">Your Orders</h1>
        <OrderList orders={orders} />
      </main>
    </div>
  );
}
