import { StatusBadge } from "@/components/ui/StatusBadge";

export interface QuoteData {
  quoteStatus: "pending" | "approved";
  approvedAt: string | null;
  description: string;
  price: number;
  dueDate: string;
  orderStatus: string;
  customerName: string;
}

interface QuoteViewProps {
  quote: QuoteData;
  children?: React.ReactNode;
}

export function QuoteView({ quote, children }: QuoteViewProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10">
      <div className="rounded-xl border border-ink/10 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <p className="text-sm text-ink/60">Quote for</p>
          <h1 className="font-heading text-2xl font-bold text-ink">{quote.customerName}</h1>
        </div>

        <p className="text-ink/80">{quote.description}</p>

        <div className="flex items-center justify-between border-t border-ink/10 pt-4">
          <div>
            <p className="text-sm text-ink/60">Total price</p>
            <p className="text-2xl font-bold tabular-nums text-ink">${quote.price.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-ink/60">Due date</p>
            <p className="font-medium text-ink">{quote.dueDate}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-ink/10 pt-4">
          <StatusBadge status={quote.quoteStatus} />
          {quote.quoteStatus === "approved" ? (
            <p className="text-sm text-ink/60">
              Approved{quote.approvedAt ? ` on ${new Date(quote.approvedAt).toLocaleDateString()}` : ""}
            </p>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
