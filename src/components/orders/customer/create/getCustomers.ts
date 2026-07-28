import { Customer } from '@/lib/supabase/types';
import { selectAllCustomers } from '@/lib/customers/action';
import { promise } from 'zod';

export default async function getCustomers(): Promise<Customer[]> {
    const customers = await selectAllCustomers();
    // await new Promise((resolve) => setTimeout(resolve, 100000));
    return (customers ?? []) as Customer[];
}