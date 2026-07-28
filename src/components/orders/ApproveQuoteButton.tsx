"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ApproveQuoteButton({ token }: { token: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleApprove = () => {
    setError(null);
    startTransition(async () => {
      const response = await fetch(`/api/quotes/${token}/approve`, { method: "POST" });
      if (!response.ok) {
        setError("Could not approve this quote. Please try again.");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button type="button" onClick={handleApprove} disabled={isPending} className="bg-action text-action-foreground">
        {isPending ? "Approving..." : "Approve quote"}
      </Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
