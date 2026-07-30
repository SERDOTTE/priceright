import { selectAllCustomers } from "@/lib/customers/action";
import OrderForm from "./OrderForm";
import { Customer } from "@/lib/supabase/types";

async function getCustomers() {
  const customers = await selectAllCustomers();
  return customers as Customer[];
}

export default async function OrderFormPage() {
    const customers = await getCustomers();
    return <OrderForm customers={customers} />;
}