"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Order } from "@/lib/orders/types";

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
};

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
      message: "Missing or invalid fields. Failed to create order.",
    };
  }

  const { customer_id, description, price, due_date, status, payment_status } = parsed.data;

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return { message: "Unauthorized: You must be logged in." };
    }

    const paidAt = payment_status === "paid" ? new Date().toISOString() : null;

    const { error } = await supabase.from("orders").insert({
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
      return { message: "Database error: Failed to create order." };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Order created successfully!" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { message: "Database Error: Failed to create order." };
  }
}

export async function listOrders(): Promise<Array<Order & { customer_name: string }>> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*, customers(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase select error (orders):", error.message);
    return [];
  }

  return (data ?? []).map((row) => {
    const { customers, ...order } = row as Order & { customers: { name: string } | null };
    return { ...order, customer_name: customers?.name ?? "Unknown customer" };
  });
}

export async function generateQuoteLink(
  orderId: string,
): Promise<{ token: string } | { error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized: you must be logged in." };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (orderError || !order) {
    return { error: "Order not found." };
  }

  const { data: existingQuote, error: existingError } = await supabase
    .from("quotes")
    .select("share_token")
    .eq("order_id", orderId)
    .maybeSingle();

  if (existingError) {
    console.error("Supabase select error (quotes):", existingError.message);
    return { error: "Failed to generate quote link." };
  }

  if (existingQuote) {
    return { token: existingQuote.share_token };
  }

  const token = crypto.randomUUID();

  const { error: insertError } = await supabase
    .from("quotes")
    .insert({ order_id: orderId, share_token: token, status: "pending" });

  if (insertError) {
    console.error("Supabase insert error (quotes):", insertError.message);
    return { error: "Failed to generate quote link." };
  }

  return { token };
}

export async function selectAllOrders() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized: User not logged in.");
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
                *,
                customers ( id, name, email )
            `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    if (error) throw error;

    if (!data) {
      return [];
    }

    const mappedData = data.map((order) => {
      const { customers, ...allOrders } = order;
      return {
        allOrders,
        customer: customers,
      };
    });
    return mappedData;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}

export async function deleteOrder(id: string | number) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized: User not logged in.");
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)
      .select();

    if (error) {
      console.error("Supabase delete error:", error);
      return { success: false, message: "Database error: Failed to delete Order. Try again later." };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        message: "Order not found or you do not have permission to delete it.",
      };
    }

    revalidatePath("/dashboard/orders");
    return { success: true, message: "Order deleted successfully!" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      message: "Database Error: Failed to delete Order.",
    };
  }
}

export async function updateOrder(id: string | number, prevState: OrderState, formData: FormData) {
    const supabase = await createClient(); 
    const parsed = OrderFormSchema.safeParse(getOrderData(formData));

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to update Order.',
        };
    }

    const { customer_id, description, price, status, payment_status } = parsed.data;

    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return { message: 'Unauthorized: You must be logged in.' };
        }

        const { error } = await supabase
            .from('orders')
            .update({
                customer_id,
                description,
                price,
                status,
                payment_status,
            })
            .eq('id', id);

        if (error) {
            console.error("Supabase update error:", error);
            return { message: 'Database error: Failed to update order.' };
        }

        revalidatePath('/dashboard/orders');
        return { success: true, message: 'Order updated successfully!' };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            message: 'Database Error: Failed to update order.'
        };
    }
}