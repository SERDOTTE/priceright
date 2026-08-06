'use client';

import { Suspense, use, useEffect, useState } from 'react';
import { RefreshCw, Loader, Columns } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/AnimateSpin';
import CustomerRows from './CustomerRows';
import { Customer } from '@/lib/supabase/types';
import Filter from '@/components/Filter';
import { toast } from 'sonner';



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
    onDelete,
}: {
    customersPromise: Promise<Customer[]>;
    onDelete?: () => void;
}) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        router.refresh();
        setTimeout(() => setIsRefreshing(false), 500);
    };

    useEffect(() => {
        if (isRefreshing) {
            toast("Refreshing data...", {
                icon: <Loader className='animate-spin size-5' />
            })
        }
    }, [isRefreshing])

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
                <CustomersTable customersPromise={customersPromise} searchQuery={searchQuery} onDelete={() => onDelete}/>
            </Suspense>
        </main>
    );
}

function CustomersTable({
    customersPromise,
    searchQuery,
    onDelete,
}: {
    customersPromise: Promise<Customer[]>;
    searchQuery: string;
    onDelete?: (customerId: string) => void;
}) {
    const customers = use(customersPromise);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        country: true,
        dateCreated: true,
        phone: true,
        actions: true,
    });

    const toggleColumn = (column: keyof typeof visibleColumns) => {
        setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
    };

    return (
        <div className="rounded-xl border border-ink/10 shadow-sm box-border max-h-170 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-ink/10 dark:border dark:border-muted-foreground">
                <details className="relative flex text-left w-auto">
                    <summary className="cursor-pointer inline-flex gap-1 justify-center w-auto rounded-md border border-gray-300 shadow-sm px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand">
                        <Columns className='size-5' /> Columns
                    </summary>
                    <div className="absolute left-0 mt-12 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">                        
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {Object.keys(visibleColumns).map((column) => (
                            <label key={column} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={visibleColumns[column as keyof typeof visibleColumns]}
                                    onChange={() => toggleColumn(column as keyof typeof visibleColumns)}
                                />
                                {column.charAt(0).toUpperCase() + column.slice(1)}
                            </label>
                        ))}
                    </div>
                    </div>
                </details>
            </div>
            <div className=" box-border overflow-y-auto overflow-x-auto scroll-fade scrollbar-thin scroll-smooth">
                <table className="w-full text-left border-collapse text-sm table-auto">
                    <thead>
                        <tr className="border-b border-ink/10 dark:bg-muted dark:text-gray-400 bg-ink/5 font-semibold">
                            {visibleColumns.name && <th className="p-3">Name</th>}
                            {visibleColumns.country && <th className="p-3 hidden md:table-cell">Country</th>}
                            {visibleColumns.dateCreated && <th className="p-3 hidden sm:table-cell truncate">Date Created</th>}
                            {visibleColumns.phone && <th className="p-3">Phone</th>}
                            {visibleColumns.actions && <th className="p-3 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/10">
                        <CustomerRows customers={customers} searchQuery={searchQuery} visibleColumns={visibleColumns}/>
                    </tbody>
                </table>
            </div>
        </div>
    );
}