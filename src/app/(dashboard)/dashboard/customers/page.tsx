import CustomerForm from "@/components/orders/CustomerForm";
import { createCustomer } from "@/lib/orders/action";

export default async function CustomerFormPage() {


  return (
        <div className="dark:bg-ink min-h-screen flex-1 w-auto m-1 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">Customers</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            View/Create Customers
          </h1>
          <p className="text-muted-foreground">
            Manage Clients/Customers
          </p>
        </div>

          <div className="px-6 sm:px-8 py-6">
            <CustomerForm  action={createCustomer}/>
          </div>
      </div>
    </div>
  );
}
