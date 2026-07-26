"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Calendar, DollarSign, FileText, User, Loader2 } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string | null;
}

interface PricingSheet {
  id: string;
  name: string;
  suggested_price: number | null;
}

interface OrderFormProps {
  customers: Customer[];
  pricingSheets: PricingSheet[];
}

export default function OrderForm({ customers, pricingSheets }: OrderFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [customerId, setCustomerId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pricingSheetId, setPricingSheetId] = useState<string | null>(null);

  const handlePricingSheetSelect = (sheetId: string | null) => {
    setPricingSheetId(sheetId);
    const selected = pricingSheets.find((s) => s.id === sheetId);
    if (selected && selected.suggested_price) {
      setPrice(selected.suggested_price.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (!customerId) {
      setErrorMessage("Please select a customer for this order.");
      setIsLoading(false);
      return;
    }
    if (!description.trim()) {
      setErrorMessage("Please provide a description of the work.");
      setIsLoading(false);
      return;
    }
    if (!price || Number(price) <= 0) {
      setErrorMessage("Please enter a valid price greater than zero.");
      setIsLoading(false);
      return;
    }
    if (!dueDate) {
      setErrorMessage("Please select a target due date.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customerId,
          description: description.trim(),
          price: parseFloat(price),
          due_date: dueDate,
          status: "quote_sent",
          payment_status: "pending",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 ">
      {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-red-600/20 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Customer <span className="text-red-500">*</span>
          </label>
          <Select value={customerId} onValueChange={(value) => setCustomerId(value || "")}>
            <SelectTrigger className="h-11 w-full rounded-xl border-border bg-white pl-3.5 text-sm shadow-sm transition-all focus:border-ring focus:ring-2 focus:ring-ring/20">
              <SelectValue placeholder="Select a customer..." />
            </SelectTrigger>
            <SelectContent>
              {customers.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground text-center">No customers found. Add one first.</div>
              ) : (
                customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} {customer.email ? `(${customer.email})` : ""}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Pricing Sheet Template
            <span className="text-xs font-normal text-muted-foreground">Optional</span>
          </label>
          <Select value={pricingSheetId || undefined} onValueChange={(value) => handlePricingSheetSelect(value || "")}>
            <SelectTrigger className="h-11 w-full rounded-xl border-border bg-white pl-3.5 text-sm shadow-sm transition-all focus:border-ring focus:ring-2 focus:ring-ring/20">
              <SelectValue placeholder="Load from pricing model..." />
            </SelectTrigger>
            <SelectContent>
              {pricingSheets.map((sheet) => (
                <SelectItem key={sheet.id} value={sheet.id}>
                  {sheet.name} {sheet.suggested_price ? `• Ref: $${sheet.suggested_price}` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          Project Description
          <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the scope, key milestones, inclusions, and deliverables..."
          className="w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all shadow-sm resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Be specific about deliverables, milestones, and any exclusions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            Total Price (USD)
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-muted-foreground">
              $
            </span>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="h-11 rounded-xl border-border bg-white pl-8 text-sm font-semibold tabular-nums shadow-sm transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Target Due Date
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="h-11 rounded-xl border-border bg-white text-sm shadow-sm transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="h-11 rounded-xl border-border text-foreground hover:bg-muted font-medium"
          >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 rounded-xl bg-action text-white hover:bg-action font-semibold shadow-sm transition-all"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Order...
            </>
          ) : (
            "Save & Generate Quote"
          )}
        </Button>
      </div>
    </form>
  );
}
