'use client'

import { useState } from 'react';
import { Customer } from '@/lib/orders/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Filter from '@/components/Filter';
import { RefreshCw, Edit2, Trash2 } from 'lucide-react';

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

export default function ViewEditCustomers({ customers, fetch }: { customers: Customer[]; fetch: () => Promise<Customer[] | void> }) {
    const router = useRouter();
    const [orders, setOrders] = useState<Customer[]>(customers);
    const [searchQuery, setSearchQuery] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleNavigation = () => {
        router.push('/dashboard/orders');
    };

    const handleDelete = (id: string) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            const freshData = await fetch();
            if (freshData) {
                setOrders(freshData);
            }
            router.refresh();
        } catch (error) {
            console.error("Failed to refresh data:", error);
        } finally {
            setTimeout(() => setIsRefreshing(false), 500);
        }
    };

    const filteredOrders = orders.filter(order =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-auto box-border  rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)">
            <main className="w-auto max-w-5xl mx-auto box-border">
                {/* Top Control Bar: Search & Create Button */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center rounded-lg mb-6 shadow-md/20 p-4 w-full box-border dark:bg-muted">
                    <div id="searchBoxContainer" className="w-full sm:flex-1 sm:max-w-[50%]">
                        <div className="searchContainer flex items-center justify-between gap-2 h-9 w-full">
                            <input
                                type="search"
                                id="search"
                                name="q"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Orders..."
                                className="dark:bg-ink w-full h-full text-xs rounded-lg border outline-none px-3 placeholder:opacity-40 focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all shadow-sm"
                            />

                        </div>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-ink/20 bg-white hover:bg-ink/5 dark:bg-muted dark:text-gray-300 text-ink text-sm font-medium transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                </div>

                {/* Filter Component Section */}
                <div className="bg-muted shadow-md/20 rounded-lg w-full mb-6 p-2 box-border">
                    {/* <Filter filters={FilterList} /> */}
                </div>

                {/* Orders Table Container */}
                <div className=" rounded-xl border border-ink/10 shadow-sm  box-border max-h-200 flex flex-col overflow-hidden">
                    <div className="w-full box-border overflow-y-auto scroll-fade scrollbar-thin">
                        <table className="w-full text-left border-collapse text-sm table-auto">
                            <thead>
                                <tr className="border-b border-ink/10  dark:bg-muted dark:text-gray-400 bg-ink/5 font-semibold">
                                    <th className="p-3">Name</th>
                                    <th className="p-3 hidden md:table-cell">Country</th>
                                    <th className="p-3 hidden sm:table-cell truncate">Date Created</th>
                                    <th className="p-3 ">Phone</th>
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
                                                <div className="text-ink dark:text-white font-semibold">{order.name}</div>
                                                {order.email && (
                                                    <div className="text-ink/60 dark:text-gray-400 text-[10px]">{order.email}</div>
                                                )}
                                            </td>
                                            <td title={order.country} className="p-3 text-ink/80 dark:text-gray-400 hidden md:table-cell truncate text-ellipsis ">
                                                {order.country}
                                            </td>
                                            {/* <td className="p-3 font-semibold tabular-nums text-ink">
                                                ${order.price.toFixed(2)}
                                            </td> */}
                                            <td className="p-3 text-ink/80 truncate dark:text-gray-400 hidden sm:table-cell">
                                                {order.created_at
                                                    ? new Date(order.created_at).toLocaleDateString('en-US')
                                                    : 'N/A'}
                                            </td>
                                            <td className="p-3">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-300/40 dark:text-gray-200 text-ink capitalize truncate">
                                                    {order.phone}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                                                <Link
                                                    href={`/dashboard/customers/edit/${order.id}`}
                                                    className="inline-flex items-center justify-center size-7 rounded-lg border border-ink/20 bg-white hover:bg-ink/10 dark:text-gray-400 text-ink transition-all"
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