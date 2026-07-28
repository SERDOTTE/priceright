'use client';

import { Suspense, use, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/AnimateSpin';
import CustomerRows from './CustomerRows';
import { Customer } from '@/lib/orders/types';
import Filter from '@/components/Filter';


export const FilterList = [
    {
        title: 'Order Status',
        label: 'Status',
        htmlFor: 'orderStatus',
        name: 'status',
        id: 'orderStatus',
        options: [
            { value: 'all', label: 'All Orders' },
            { value: 'quote_sent', label: 'Quote Sent' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
        ],
    },
    {
        title: 'Payment Status',
        label: 'Payment',
        htmlFor: 'paymentStatus',
        name: 'payment_status',
        id: 'paymentStatus',
        options: [
            { value: 'all', label: 'All Payments' },
            { value: 'pending', label: 'Pending' },
            { value: 'paid', label: 'Paid' },
        ],
    },
];

export default function ViewCustomers({
    customersPromise,
}: {
    customersPromise: Promise<Customer[]>;
}) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        router.refresh();
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <main className="w-auto max-w-5xl mx-auto box-border">
            {/* Top Control Bar: Search & Refresh — renders immediately, never suspends */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center rounded-lg mb-6 shadow-md/20 p-4 w-full box-border dark:bg-muted">
                <div id="searchBoxContainer" className="w-full sm:flex-1 sm:max-w-[50%]">
                    <div className="searchContainer flex items-center justify-between gap-2 h-9 w-full">
                        <input
                            type="search"
                            id="search"
                            name="q"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, country, or date..."
                            className="dark:bg-ink w-full h-full text-xs rounded-lg border outline-none px-3 placeholder:opacity-40 focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-sm"
                        />
                    </div>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-ink/20 bg-white hover:bg-ink/5 dark:bg-muted dark:border-muted-foreground text-sm font-medium disabled:opacity-50"
                >
                    <RefreshCw className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                </button>
            </div>

            {/* Filter Component Section */}
            <div className="bg-muted shadow-md/20 rounded-lg w-full mb-6 p-2 box-border">
                <Filter filters={FilterList} />
            </div>

            {/* Orders Table — only this section suspends while data loads.
                    `use(promise)` triggers the Suspense fallback until the data resolves. */}
            <Suspense fallback={<Loading />}>
                <CustomersTable customersPromise={customersPromise} searchQuery={searchQuery} />
            </Suspense>
        </main>
    );
}

function CustomersTable({
    customersPromise,
    searchQuery,
}: {
    customersPromise: Promise<Customer[]>;
    searchQuery: string;
}) {
    const customers = use(customersPromise);

    return (
        <div className="rounded-xl border border-ink/10 shadow-sm box-border max-h-170 flex flex-col overflow-hidden">
            <div className="w-full box-border overflow-y-auto scroll-fade scrollbar-thin scroll-smooth">
                <table className="w-full text-left border-collapse text-sm table-auto">
                    <thead>
                        <tr className="border-b border-ink/10 dark:bg-muted dark:text-gray-400 bg-ink/5 font-semibold">
                            <th className="p-3">Name</th>
                            <th className="p-3 hidden md:table-cell">Country</th>
                            <th className="p-3 hidden sm:table-cell truncate">Date Created</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/10">
                        <CustomerRows customers={customers} searchQuery={searchQuery} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}