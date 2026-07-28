"use server";

import { createClient } from "@/lib/supabase/server";
import type { Order } from "@/lib/orders/types";

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

export async function generateQuoteLink(orderId: string): Promise<{ token: string } | { error: string }> {
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
