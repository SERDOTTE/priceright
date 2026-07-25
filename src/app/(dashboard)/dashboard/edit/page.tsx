'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Filter from '@/components/Filter';
import { Edit2, Trash2 } from 'lucide-react';

export const FilterList = [
  {
    title: "Order Status", label: "Status", htmlFor: "orderStatus", name: "status", id: "orderStatus",
    options: [
      { value: "all", label: "All Orders" },
      { value: "quote_sent", label: "Quote Sent" },
      { value: "in_progress", label: "In Progress" },
      { value: "completed", label: "Completed" },
    ]
  },
  {
    title: "Payment Status", label: "Payment", htmlFor: "paymentStatus", name: "payment_status", id: "paymentStatus",
    options: [
      { value: "all", label: "All Payments" },
      { value: "pending", label: "Pending" },
      { value: "paid", label: "Paid" },
    ]
  }
];

interface Order {
  id: string;
  customer_name: string;
  customer_email: string | null;
  description: string;
  price: number;
  due_date: string;
  status: string;
  payment_status: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    customer_name: "Acme Corp",
    customer_email: "billing@acme.com",
    description: "Full-stack web application revamp and dashboard integration.",
    price: 2500.00,
    due_date: "2026-08-15",
    status: "in_progress",
    payment_status: "pending",
  },
  {
    id: "2",
    customer_name: "Jane Doe",
    customer_email: "jane@example.com",
    description: "Brand identity design and landing page development.",
    price: 1200.50,
    due_date: "2026-08-01",
    status: "quote_sent",
    payment_status: "pending",
  },
];

export default function ViewEditOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = () => {
    router.push('/dashboard/orders');
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const filteredOrders = orders.filter(order => 
    order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ color: "#1A1A1A" }} className="min-h-screen w-full box-border m-1 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] bg-white">
      <main className="p-4 sm:p-8 w-full max-w-5xl mx-auto box-border">
        {/* Top Control Bar: Search & Create Button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center rounded-lg mb-6 shadow-md/20 p-4 w-full box-border">
          <div id="searchBoxContainer" className="w-full sm:flex-1 max-w-md">
            <div className="searchContainer flex items-center justify-between gap-2 h-9 w-full">
              <input
                type="search"
                id="search"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Orders..."
                style={{ borderColor: "#1A1A1A20", color: "#1A1A1A" }}
                className="w-full h-full text-xs rounded-lg border bg-transparent outline-none px-3 placeholder:opacity-40 focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all shadow-sm"
              />
              <div 
                style={{ backgroundColor: "#FF4A3C" }}
                className="search-icon flex justify-center items-center rounded-full size-9 hover:cursor-pointer hover:opacity-90 transition-all shrink-0 shadow-sm"
              >
                <button aria-label="button" className="hover:cursor-pointer flex items-center justify-center w-full h-full text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-3.5 fill-current">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleNavigation}
            style={{ backgroundColor: "#FFC200", color: "#1A1A1A" }}
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 hover:cursor-pointer transition-all shadow-sm h-9 flex items-center justify-center shrink-0"
          >
            + Create Order
          </button>
        </div>

        {/* Filter Component Section */}
        <div className="bg-muted shadow-md/20 rounded-lg w-full mb-6 p-2 box-border">
          <Filter filters={FilterList} />
        </div>
 
        {/* Orders Table Container */}
        <div className="bg-white rounded-xl border border-ink/10 shadow-sm w-full box-border">
          <div className="w-full box-border">
            <table className="w-full text-left border-collapse text-xs table-auto">
              <thead>
                <tr className="border-b border-ink/10 bg-ink/5 text-ink font-semibold">
                  <th className="p-3">Customer</th>
                  <th className="p-3 hidden md:table-cell">Description</th>
                  <th className="p-3">Price</th>
                  <th className="p-3 hidden sm:table-cell">Due Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-ink/60">
                      No orders found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-ink/5 transition-colors">
                      <td className="p-3 font-medium">
                        <div className="text-ink font-semibold">{order.customer_name}</div>
                        {order.customer_email && (
                          <div className="text-ink/60 text-[10px]">{order.customer_email}</div>
                        )}
                      </td>
                      <td className="p-3 text-ink/80 hidden md:table-cell max-w-50 truncate">
                        {order.description}
                      </td>
                      <td className="p-3 font-semibold tabular-nums text-ink">
                        ${order.price.toFixed(2)}
                      </td>
                      <td className="p-3 text-ink/80 tabular-nums hidden sm:table-cell">
                        {order.due_date}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand/20 text-ink capitalize">
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                        <Link
                          href={`/dashboard/edit/${order.id}`}
                          className="inline-flex items-center justify-center size-7 rounded-lg border border-ink/20 bg-white hover:bg-ink/10 text-ink transition-all"
                          title="View / Edit"
                        >
                          <Edit2 className="size-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(order.id)}
                          style={{ color: "#FF4A3C" }}
                          className="inline-flex items-center justify-center size-7 rounded-lg border border-action/30 bg-action/10 hover:bg-action/20 transition-all"
                          title="Delete Order"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}