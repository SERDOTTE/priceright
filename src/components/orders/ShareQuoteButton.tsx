"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateQuoteLink } from "@/lib/orders/action";

interface ShareQuoteButtonProps {
  orderId: string;
}

export function ShareQuoteButton({ orderId }: ShareQuoteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setError(null);
    startTransition(async () => {
      const result = await generateQuoteLink(orderId);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setLink(`${window.location.origin}/quote/${result.token}`);
    });
  };

  const handleCopy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (link) {
    return (
      <div className="flex items-center gap-2">
        <Input readOnly value={link} className="h-8 text-xs w-48" />
        <Button type="button" size="sm" onClick={handleCopy} className="h-8">
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        size="sm"
        onClick={handleClick}
        disabled={isPending}
        className="h-8 bg-action text-action-foreground"
      >
        {isPending ? "Generating..." : "Share quote"}
      </Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
