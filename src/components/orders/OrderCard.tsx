import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ShareQuoteButton } from "@/components/orders/ShareQuoteButton";
import type { Order } from "@/lib/orders/types";

interface OrderCardProps {
  order: Order & { customer_name: string };
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="border-ink/10">
      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-ink truncate">{order.customer_name}</p>
          <p className="text-sm text-ink/60 truncate">{order.description}</p>
          <p className="text-xs text-ink/50 mt-1">Due {order.due_date}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-semibold tabular-nums">${order.price.toFixed(2)}</span>
          <StatusBadge status={order.status} />
          <ShareQuoteButton orderId={order.id} />
        </div>
      </CardContent>
    </Card>
  );
}
