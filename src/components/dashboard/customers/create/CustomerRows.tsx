'use client';

import Link from 'next/link';
import { Customer } from '@/lib/supabase/types';
import { Edit2 } from 'lucide-react';
import Delete from '../edit/DeleteCustomer';

export default function CustomerRows({
    customers,
    searchQuery,
    visibleColumns,
}: {
    customers: Customer[];
    searchQuery: string;
    visibleColumns: {
        name: boolean;
        country: boolean;
        dateCreated: boolean;
        phone: boolean;
        actions: boolean;
    };
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
                <td colSpan={Object.values(visibleColumns).filter(Boolean).length} className="p-6 text-center text-ink/60">
                    No Customers found. Refresh or create a new Customer
                </td>
            </tr>
        );
    }

    


    return (
        <>
            {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-ink/5 transition-colors">
                    {visibleColumns.name && (
                        <td className="p-3 font-medium">
                            <div className="text-ink dark:text-white font-semibold">{order.name}</div>
                            {order.email && (
                                <div className="text-ink/60 dark:text-gray-400 text-[10px]">{order.email}</div>
                            )}
                        </td>
                    )}
                    {visibleColumns.country && (
                        <td title={order.country} className="p-3 text-ink/80 dark:text-gray-400 hidden md:table-cell truncate text-ellipsis ">
                            {order.country}
                        </td>
                    )}
                    {visibleColumns.dateCreated && (
                        <td className="p-3 text-ink/80 truncate dark:text-gray-400 hidden sm:table-cell">
                            {order.created_at
                                ? new Date(order.created_at).toLocaleDateString('en-US')
                                : 'N/A'}
                        </td>
                    )}
                    {visibleColumns.phone && (
                        <td className="p-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-300/20 border-2 border-blue-300/50 dark:text-gray-200 text-ink capitalize truncate">
                                {order.phone}
                            </span>
                        </td>
                    )}
                    {visibleColumns.actions && (
                        <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <Link
                                href={`/dashboard/customers/edit/${order.id}`}
                                className="inline-flex items-center justify-center size-7 rounded-lg border border-ink/20 bg-white hover:bg-ink/10 dark:text-gray-400 text-ink transition-all"
                                title="View / Edit"
                            >
                                <Edit2 className="size-3.5" />
                            </Link>
                            <Delete id={order.id} />
                        </td>
                    )}
                </tr>
            ))}
        </>
    );
}