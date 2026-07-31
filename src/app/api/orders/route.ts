import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const OrderInputSchema = z.object({
  customer_id: z.string().min(1, "Customer is required."),
  description: z.string().trim().min(1, "Description is required.").max(2000),
  price: z.number().positive("Price must be greater than zero."),
  due_date: z.string().min(1, "Due date is required."),
  status: z.enum(["quote_sent", "approved", "in_progress", "delivered"]),
  payment_status: z.enum(["pending", "paid", "overdue"]),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized: you must be logged in." }, { status: 401 });
  }

  const body = await request.json();
  const parsed = OrderInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid order input." },
      { status: 400 },
    );
  }

  const { customer_id, description, price, due_date, status, payment_status } = parsed.data;
  const paidAt = payment_status === "paid" ? new Date().toISOString() : null;

  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_id,
      description,
      price,
      due_date,
      status,
      payment_status,
      paid_at: paidAt,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error (orders):", error.message, error.details, error.hint, error.code);
    return NextResponse.json({ message: "Database error: failed to create order." }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
