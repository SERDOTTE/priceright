'use client';

import Link from 'next/link';
import { OrderRowsProps } from '@/lib/supabase/types';
import { Edit2 } from 'lucide-react';
import Delete from '../edit/DeleteOrder';
import { orderStatusColors, paymentStatusColors } from '@/lib/supabase/types';


export default function OrderRows({
    orders,
    searchQuery,
    visibleColumns,
}: {
    orders: OrderRowsProps[];
    searchQuery: string;
    visibleColumns: {
        customer: boolean,
        description: boolean,
        price: boolean,
        dueDate: boolean,
        status: boolean,
        paymentStatus: boolean,
        actions: boolean,
        createdAt: boolean,
    };
}) {
    const q = searchQuery.trim().toLowerCase();

    const filtered = q
        ? orders.filter((item) => {
            const order = item.allOrders;
            const dateString = order.created_at
                ? new Date(order.created_at).toLocaleDateString('en-US')
                : '';

            return (
                order.description?.toLowerCase().includes(q) ||
                order.status?.toLowerCase().includes(q) ||
                dateString.toLowerCase().includes(q) ||
                item.customer.name?.toLowerCase().includes(q)
            );
        })
        : orders;

    if (filtered.length === 0) {
        return (
            <tr>
                <td colSpan={Object.values(visibleColumns).filter(Boolean).length} className="p-6 text-center text-ink/60">
                    No orders found matching your criteria.
                </td>
            </tr>
        );
    }

    return (
        <>
            {filtered.map((order) => (
                <tr key={order.allOrders.id} className="hover:bg-ink/5 transition-colors">
                    {visibleColumns.customer && (
                        <td className="p-3 font-medium">
                            <div className="text-ink dark:text-white font-semibold">{order.customer?.name}</div>
                            {order.customer?.email && (
                                <div className="text-ink/60 dark:text-gray-400 text-[10px]">{order.customer?.email}</div>
                            )}
                        </td>
                    )}
                    {visibleColumns.description && (
                        <td className="p-3 text-ink/80 dark:text-gray-400 md:table-cell max-w-50 truncate">
                            {order.allOrders.description}
                        </td>
                    )}
                    {visibleColumns.price && (
                        <td className="p-3 font-medium tabular-nums text-ink dark:text-gray-200">
                            ${order.allOrders.price.toFixed(2)}
                        </td>
                    )}
                    {visibleColumns.dueDate && (
                        <td className="p-3 text-ink/80 tabular-nums sm:table-cell dark:text-gray-400">
                            {order.allOrders.due_date}
                        </td>
                    )}
                    {visibleColumns.status && (
                        <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${orderStatusColors[order.allOrders.status] || 'bg-gray-500/20 text-gray-700'}`}>
                                {order.allOrders.status.replace('_', ' ')}
                            </span>
                        </td>
                    )}
                    {visibleColumns.paymentStatus && (
                        <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${order.allOrders.payment_status ? paymentStatusColors[order.allOrders.payment_status] : 'bg-gray-500/20 text-gray-700'}`}>
                                {order.allOrders.payment_status?.replace('_', ' ') || 'N/A'}
                            </span>
                        </td>
                    )}
                    {visibleColumns.createdAt && (
                        <td className="p-3 text-ink/80 truncate tabular-nums dark:text-gray-400  sm:table-cell">
                            {order.allOrders.created_at
                                ? new Date(order.allOrders.created_at).toLocaleDateString('en-US')
                                : 'N/A'}
                        </td>
                    )}
                    {visibleColumns.actions && (
                        <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <Link
                                href={`/dashboard/edit/${order.customer.id}`}
                                className="inline-flex items-center justify-center size-7 rounded-lg border border-ink/20 bg-white hover:bg-ink/10 text-ink dark:text-gray-400 transition-all"
                                title="View / Edit"
                            >
                                <Edit2 className="size-3.5" />
                            </Link>
                            <Delete id={order.allOrders?.id} />
                        </td>
                    )}
                </tr>
            ))}
        </>
    );
}

// {/* Orders Table Container */}
// <div className="bg-white rounded-xl border border-ink/10 shadow-sm w-full box-border overflow-hidden">
//     <div className="w-full box-border overflow-x-auto">
//         <table className="w-full text-left border-collapse text-xs table-auto">

//             <tbody className="divide-y divide-ink/10">
//                 {filteredOrders.length === 0 ? (
//                     <tr>
//                         <td colSpan={6} className="p-6 text-center text-ink/60">
//                             No orders found matching your criteria.
//                         </td>
//                     </tr>
//                 ) : (
//                     filteredOrders.map((order) => (
//                         <tr key={order.id} className="hover:bg-ink/5 transition-colors">
//                             <td className="p-3 font-medium">
//                                 <div className="text-ink font-semibold">{order.customer_name}</div>
//                                 {order.customer_email && (
//                                     <div className="text-ink/60 text-[10px]">{order.customer_email}</div>
//                                 )}
//                             </td>
//                             <td className="p-3 text-ink/80 hidden md:table-cell max-w-50 truncate">
//                                 {order.description}
//                             </td>
//                             <td className="p-3 font-semibold tabular-nums text-ink">
//                                 ${order.price.toFixed(2)}
//                             </td>
//                             <td className="p-3 text-ink/80 tabular-nums hidden sm:table-cell">
//                                 {order.due_date}
//                             </td>
//                             <td className="p-3">
//                                 <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand/20 text-ink capitalize">
//                                     {order.status.replace('_', ' ')}
//                                 </span>
//                             </td>
//                             <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
//                                 <Link
//                                     href={`/dashboard/edit/${order.id}`}
//                                     className="inline-flex items-center justify-center size-7 rounded-lg border border-ink/20 bg-white hover:bg-ink/10 text-ink transition-all"
//                                     title="View / Edit"
//                                 >
//                                     <Edit2 className="size-3.5" />
//                                 </Link>
//                                 <button
//                                     onClick={() => handleDelete(order.id)}
//                                     style={{ color: "#FF4A3C" }}
//                                     className="inline-flex items-center justify-center size-7 rounded-lg border border-action/30 bg-action/10 hover:bg-action/20 transition-all"
//                                     title="Delete Order"
//                                 >
//                                     <Trash2 className="size-3.5" />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))
//                 )}
//             </tbody>
//         </table>
//     </div>
// </div>