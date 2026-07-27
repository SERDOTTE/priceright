import { Customer } from "@/lib/orders/types";
import { createCustomer, selectAllCustomers } from "@/lib/orders/action";
import CustomerForm from "@/components/orders/customer/CustomerForm";
import ViewEditCustomers from "@/components/orders/customer/ViewCustomers";

async function fetchCustomers(): Promise<Customer[]> {
    const customers = await selectAllCustomers();
    return customers as Customer[];    console.log(customers);
}

export default async function CustomersPage() {
    const customers = await fetchCustomers();

    return (
    <div className="max-w-full">
        <ViewEditCustomers customers={customers}/>
    </div>
    )
}
