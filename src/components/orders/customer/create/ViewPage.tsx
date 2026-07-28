import { Suspense } from "react";
import { Customer } from "@/lib/orders/types";
import { selectAllCustomers } from "@/lib/orders/action";
import ViewEditCustomers from "@/components/orders/customer/create/ViewCustomers";
import Loading from "../../../AnimateSpin";

async function CustomersList() {
    const customers = await selectAllCustomers();
    await new Promise((res) => setTimeout(res, 5000)); 

    return <ViewEditCustomers customers={customers as Customer[]}
     fetch={async () => {
        'use server'
                const freshCustomers = await selectAllCustomers();
                return freshCustomers as Customer[];}}/>;
}

export default function CustomersPage() {
    return (
        <div className="max-w-full">
            <Suspense fallback={<Loading />}>
                <CustomersList />
            </Suspense>
        </div>
    );
}