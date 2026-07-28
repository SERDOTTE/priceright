import OrderForm from "@/components/dashboard/orders/OrderForm";

export default async function OrderFormPage() {


  return (
        <div className="dark:bg-ink min-h-screen flex-1 w-auto m-1 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Create Order</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Create New Order
          </h1>
          <p className="text-muted-foreground">
            Capture client requirements and generate a quote.
          </p>
        </div>

        <div className="rounded-2xl border border-border shadow-sm">
          <div className="px-6 sm:px-8 py-6">
            <OrderForm customers={[]} pricingSheets={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
