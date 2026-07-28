'use client';

import Link from 'next/link';
import { Customer } from '@/lib/orders/types';
import { Edit2, Trash2 } from 'lucide-react';

export default function CustomerRows({
    customers,
    searchQuery,
}: {
    customers: Customer[];
    searchQuery: string;
}) {
    const q = searchQuery.trim().toLowerCase();

    const filtered = q
        ? customers.filter((order) => {
              const dateString = order.created_at
                  ? new Date(order.created_at).toLocaleDateString('en-US')
                  : '';
              return (
                  order.name.toLowerCase().includes(q) ||
                  order.country.toLowerCase().includes(q) ||
                  dateString.toLowerCase().includes(q)
              );
          })
        : customers;

    if (filtered.length === 0) {
        return (
            <tr>
                <td colSpan={6} className="p-6 text-center text-ink/60">
                    No orders found matching your criteria.
                </td>
            </tr>
        );
    }

    return (
        <>
            {filtered.map((order) => (
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
                            style={{ color: '#FF4A3C' }}
                            className="inline-flex items-center justify-center size-7 rounded-lg border border-action/30 bg-action/10 hover:bg-action/20 transition-all"
                            title="Delete Order"
                        >
                            <Trash2 className="size-3.5" />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}