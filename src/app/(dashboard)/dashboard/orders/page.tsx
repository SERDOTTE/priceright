import OrderForm from "@/components/orders/OrderForm";

export default function OrderFormPage() {
  return (
        <div className="min-h-screen flex-1 w-full m-1 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <span>Dashboard</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-medium">Create Order</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create New Order
          </h1>
          <p className="mt-2 text-slate-500">
            Capture client requirements and generate a quote.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="px-6 sm:px-8 py-6">
            <OrderForm customers={[]} pricingSheets={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
