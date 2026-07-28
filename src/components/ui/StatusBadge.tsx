const STATUS_STYLES: Record<string, string> = {
  // order status
  quote_sent: "bg-brand text-brand-foreground",
  approved: "bg-green-600 text-white",
  in_progress: "bg-brand text-brand-foreground",
  delivered: "bg-green-600 text-white",
  // payment status
  pending: "bg-brand text-brand-foreground",
  paid: "bg-green-600 text-white",
  overdue: "bg-red-600 text-white",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-ink/10 text-ink";
  const label = status.replace(/_/g, " ");

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${style}`}
    >
      {label}
    </span>
  );
}
