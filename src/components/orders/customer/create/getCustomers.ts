import { Customer } from '@/lib/orders/types';
import { selectAllCustomers } from '@/lib/orders/action';

export default async function getCustomers(): Promise<Customer[]> {
    const customers = await selectAllCustomers();
    return (customers ?? []) as Customer[];
}