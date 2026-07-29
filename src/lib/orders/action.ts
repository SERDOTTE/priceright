'use server'

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const OrderFormSchema = z.object({
    customer_id: z.string().min(1, "Customer is required."),
    description: z.string().trim().min(1, "Project description is required."),
    price: z.coerce.number().positive("Price must be greater than zero."),
    due_date: z.string().min(1, "Target due date is required."),
    status: z.enum(["quote_sent", "approved", "in_progress", "delivered"], "Status is required."),
    payment_status: z.enum(["pending", "paid", "overdue"], "Payment status is required."),
});

export type OrderState = {
    errors?: {
        customer_id?: string[];
        description?: string[];
        price?: string[];
        due_date?: string[];
        status?: string[];
        payment_status?: string[];
    };
    message?: string | null;
    success?: boolean;
}

function getOrderData(formData: FormData) {
    return {
        customer_id: String(formData.get("customer_id") ?? ""),
        description: String(formData.get("description") ?? ""),
        price: formData.get("price"),
        due_date: String(formData.get("due_date") ?? ""),
        status: String(formData.get("status") ?? "quote_sent"),
        payment_status: String(formData.get("payment_status") ?? "pending"),
    };
}

export async function createOrder(prevState: OrderState, formData: FormData): Promise<OrderState> {
    const supabase = await createClient();
    const parsed = OrderFormSchema.safeParse(getOrderData(formData));

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create order.',
        };
    }

    const { customer_id, description, price, due_date, status, payment_status } = parsed.data;

    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return { message: 'Unauthorized: You must be logged in.' };
        }

        const paidAt = payment_status === 'paid' ? new Date().toISOString() : null;

        const { error } = await supabase
            .from('orders')
            .insert({
                user_id: user.id,
                customer_id,
                description,
                price,
                due_date,
                status,
                payment_status,
                paid_at: paidAt,
            });

        if (error) {
            console.error("Supabase insert error:", error);
            return { message: 'Database error: Failed to create order.' };
        }

        revalidatePath('/dashboard');
        return { success: true, message: 'Order created successfully!' };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { message: 'Database Error: Failed to create order.' };
    }
}

// export async function updateCustomer(id: string | number, prevState: State, formData: FormData): Promise<State> {

//     const supabase = await createClient();
//     const parsed = CustomerFormSchema.safeParse(getCustomerData(formData));

//     if (!parsed.success) {
//         return {
//             errors: parsed.error.flatten().fieldErrors,
//             message: 'Missing or invalid fields. Failed to update project.',
//         };
//     }

//     const { name, email, country, phone } = parsed.data;

//     try {
//         const { data: { user }, error: authError } = await supabase.auth.getUser();
//         if (authError || !user) {
//             return { message: 'Unauthorized: You must be logged in.' };
//         }
//         const { data, error } = await supabase
//             .from('customers')
//             .update({
//                 name,
//                 email,
//                 country,
//                 phone,
//             }).eq('id', id);
//         if (error) {
//             console.error("Supabase insert error:", error);
//             return { message: 'Database error: Failed to update customer.' };
//         }
//         revalidatePath('/dashboard/customers');
//         return { success: true, message: 'Customer updated successfully!' };
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return {
//             message: 'Database Error: Failed to Update customer.'
//         }
//     }
// }


// export async function deleteCustomer(id: string | number) {
//     const supabase = await createClient();
//     const { data: { user }, error: authError } = await supabase.auth.getUser();

//     if (authError || !user) {
//         throw new Error("Unauthorized: User not logged in.");
//     }

//     try {
//         const { error } = await supabase
//             .from('customers')
//             .delete()
//             .eq('id', id)
//         if (error) {
//             console.error("Supabase insert error:", error);
//             return { message: 'Database error: Failed to update customer.' };
//         }
//         revalidatePath('/dashboard/customers');
//         return { success: true, message: 'Customer deleted successfully!' };
//     }catch (error) {
//         console.error("Unexpected error:", error);
//         return {
//             message: 'Database Error: Failed to delete customer.'
//         }
//     }
// }
export async function selectAllOrders() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized: User not logged in.");
    }

    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                customers ( id, name, email )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });
        if (error) throw error;

        if (!data) {
            return [];
        }

        const mappedData = data.map(order => {
            const { customers, ...allOrders } = order;
            return {
                allOrders,
                customer: customers
            };
        });
        return mappedData;
    } catch (error) {
        console.error("Unexpected error:", error);
        return null;
    }
}

// export async function selectOneCustomer(id: string) {
//     const supabase = await createClient();
//     const { data: { user }, error: authError } = await supabase.auth.getUser();

//     if (authError || !user) {
//         throw new Error("Unauthorized: User not logged in.");
//     }

//     try {
//         const { data, error } = await supabase
//             .from('customers')
//             .select('*').eq('id', id).eq('user_id', user.id).single();
//         if (error) throw error;
//         return data;
//         console.log(data);
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return null;
//     }
// }

export async function deleteOrder(id: string | number) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Unauthorized: User not logged in.");
    }

    try {
        const { data, error } = await supabase
            .from('orders')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id)
            .select();

        if (error) {
            console.error("Supabase delete error:", error);
            return { success: false, message: 'Database error: Failed to delete Order. Try again later.' };
        }

        if (!data || data.length === 0) {
            return { success: false, message: 'Order not found or you do not have permission to delete it.' };
        }

        revalidatePath('/dashboard/orders');
        return { success: true, message: 'Order deleted successfully!' };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            success: false,
            message: 'Database Error: Failed to delete Order.'
        };
    }
}
