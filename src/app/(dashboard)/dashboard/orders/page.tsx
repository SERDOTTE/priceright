import OrdersPage from "@/components/dashboard/orders/edit/ViewPage";
import Link from "next/link";

export default function OrderPage() {
    return (
        <div className="dark:bg-ink min-h-screen flex-1 w-auto m-1 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                {/* Page Header */}
                <div className="flex flex-row justify-between w-full">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span><Link href={"/dashboard"} className="underline underline-offset-2">Dashboard</Link></span>
                            <span className="text-border">/</span>
                            <span className="text-foreground font-medium">Orders</span>
                        </div>
                        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                            View & Adjust orders
                        </h1>
                        <p className="text-muted-foreground">
                            Review active client orders, monitor <span>PriceRight</span> automated pricing rules, and manage adjustments.
                        </p>
                    </div>
                </div>


                {/* Quick Summary Metrics */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Orders Processed</p>
                        <p className="text-2xl font-semibold text-foreground mt-2">1,248</p>
                        <span className="text-xs text-emerald-500 font-medium">↑ 12% from last month</span>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dynamic Pricing Adjustments</p>
                        <p className="text-2xl font-semibold text-foreground mt-2">342</p>
                        <span className="text-xs text-muted-foreground font-medium">Auto-optimized via PriceRight</span>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pending Margin Reviews</p>
                        <p className="text-2xl font-semibold text-foreground mt-2">14</p>
                        <span className="text-xs text-amber-500 font-medium">Requires manual attention</span>
                    </div>
                </div> */}

                {/* Your Existing Table Component */}
                <div className="pt-2">
                    <OrdersPage />
                </div>
            </main>
        </div>
    )
}