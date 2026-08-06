"use client"

import * as React from "react"
import {
    useTable,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
    type RowData
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, RefreshCcw, Loader } from "lucide-react"
import { features, type DataTableFeatures } from "./data-table-features"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


interface DataTableProps<TData extends RowData> {
    columns: ColumnDef<DataTableFeatures, TData>[]
    data: TData[]
}

export function DataTable<TData extends RowData>({
    columns,
    data,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({})
    const [isRefreshing, setIsRefreshing] = useState(false);
    const router = useRouter();

    const table = useTable({
        features,
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

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
        <div className="space-y-4 dark:border">
            {/* Toolbar: Search Input and Columns Dropdown */}
            <div className="flex justify-between items-center m-2">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="flex flex-row gap-2 items-center">
                    <Button
                    variant={"outline"}
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border  hover:bg-ink/5 dark:bg-muted text-sm font-medium disabled:opacity-50"
                    >
                        <RefreshCcw className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger render={
                            <Button variant="outline" className="ml-auto">
                                Columns
                                <ChevronDown className="size-5" />
                            </Button>
                        }>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize cursor-pointer"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id === "created_at" ? "Date Created" : column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden lg:rounded-md border lg:m-2 scrollbar-thin">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="text-left">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-left">
                                            {header.isPlaceholder ? null : (
                                                <table.FlexRender header={header} />
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className=" hover:bg-ink/5 dark:hover:bg-ink/10 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="p-0">
                                            <table.FlexRender cell={cell} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-ink/60">
                                    No Customers found. Refresh or create a new Customer.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}