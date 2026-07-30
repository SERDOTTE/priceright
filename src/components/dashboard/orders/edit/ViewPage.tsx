import getOrders from '@/components/dashboard/orders/edit/getOrders';
import ViewOrders from './ViewOrders';

export default function OrdersPage() {
    // Start the promise on the server without awaiting — it will be unwrapped on the client via `use()`.
    const ordersPromise = getOrders();

    return <ViewOrders ordersPromise={ordersPromise} />;
}