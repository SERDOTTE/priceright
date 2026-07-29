// types/database.ts

export interface User {
  id: string; // References auth.users.id
  email: string;
}

export interface Customer {
  id: string;
  user_id: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  created_at?: string | null;
}

export interface PricingSheet {
  id: string;
  user_id: string;
  name: string;
  target_salary: number;
  working_hours_per_month: number;
  margin_percent: number;
  cost_per_minute: number;
  suggested_price: number;
}

export interface Material {
  id: string;
  pricing_sheet_id: string;
  name: string;
  unit_cost: number;
  quantity: number;
}

export type OrderStatus = 'sent' | 'approved' | 'in_progress' | 'delivered';
export type PaymentStatus = 'pending' | 'paid' | 'overdue';

export interface Order {
  id: string;
  user_id: string;
  customer_id: string;
  description: string;
  status: OrderStatus;
  price: number;
  due_date: string; // ISO date string
  payment_status: PaymentStatus;
  paid_at?: string | null; // ISO timestamp
  created_at?: string | null;
}

export type QuoteStatus = 'pending' | 'approved';

export interface Quote {
  id: string;
  order_id: string;
  share_token: string;
  status: QuoteStatus;
  approved_at?: string | null;
}

export interface OrderRowsProps {
    customer: Customer;
    allOrders: Order;
}

