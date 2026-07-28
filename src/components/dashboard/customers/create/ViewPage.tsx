import getCustomers from '@/components/dashboard/customers/create/getCustomers';
import ViewCustomers from '@/components/dashboard/customers/create/ViewCustomers';

export default function CustomersPage() {
    // Start the promise on the server without awaiting — it will be unwrapped on the client via `use()`.
    const customersPromise = getCustomers();

    return <ViewCustomers customersPromise={customersPromise} />;
}