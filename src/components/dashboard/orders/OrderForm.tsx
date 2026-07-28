"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { AlertCircle, Calendar, Check, ChevronsUpDown, DollarSign, FileText, User, Loader2, Tag, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  const [customerOpen, setCustomerOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("quote_sent");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [pricingSheetId, setPricingSheetId] = useState<string | null>(null);

  const selectedCustomer = customers.find((c) => c.id === customerId);

  const handlePricingSheetSelect = (sheetId: string | null) => {
    setPricingSheetId(sheetId);
    if (!sheetId) return;
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
          status,
          payment_status: paymentStatus,
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      {/* {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-red-600/25 bg-red-50 px-4 py-3.5 text-sm text-red-600 shadow-sm animate-in fade-in-50">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )} */}

      {/* Section 1: Client & Pricing Template */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
        <div className="border-b border-border pb-4">
          <h3 className="text-base font-semibold text-foreground">Client & Template Information</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Select the client for this order and optionally apply a preset pricing model.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2 flex flex-col">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              Customer <span className="text-red-600">*</span>
            </label>
            <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
              <PopoverTrigger render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={customerOpen}
                  className="w-full justify-between rounded-xl border-border bg-white px-3.5 text-sm font-normal shadow-xs transition-all hover:bg-muted/50 focus:border-ring focus:ring-2 focus:ring-ring/20"
                >
                  <span className="truncate">
                    {selectedCustomer
                      ? `${selectedCustomer.name} ${selectedCustomer.email ? `(${selectedCustomer.email})` : ""}`
                      : "Search or select a customer..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              }>
              </PopoverTrigger>
              <PopoverContent className="w-(--radix-popover-trigger-width) p-0 rounded-xl shadow-lg border-border">
                <Command>
                  <CommandInput placeholder="Search customer by name or email..." className="h-10 text-sm" />
                  <CommandList>
                    <CommandEmpty>
                      {customers.length === 0 ? "No customers found. Add one first." : "No matching customer found."}
                    </CommandEmpty>
                    <CommandGroup>
                      {customers.map((customer) => (
                        <CommandItem
                          key={customer.id}
                          value={`${customer.name} ${customer.email || ""}`}
                          onSelect={() => {
                            setCustomerId(customer.id);
                            setCustomerOpen(false);
                          }}
                          className="cursor-pointer text-sm py-2.5"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              customerId === customer.id ? "opacity-100 text-brand" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{customer.name}</span>
                            {customer.email && <span className="text-xs text-muted-foreground">{customer.email}</span>}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                Pricing Sheet Template
              </span>
              <span className="text-xs font-normal lowercase text-muted-foreground">Optional</span>
            </label>
            <Select value={pricingSheetId || undefined} onValueChange={(value) => handlePricingSheetSelect(value || "")}>
              <SelectTrigger className="h-11 w-full rounded-xl border-border bg-white pl-3.5 text-sm shadow-xs transition-all hover:bg-muted/50 focus:border-ring focus:ring-2 focus:ring-ring/20">
                <SelectValue placeholder="Load from pricing model..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border shadow-lg">
                {pricingSheets.map((sheet) => (
                  <SelectItem key={sheet.id} value={sheet.id} className="cursor-pointer">
                    {sheet.name} {sheet.suggested_price ? `• Ref: $${sheet.suggested_price}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Section 2: Project Scope & Description */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
        <div className="border-b border-border pb-4">
          <h3 className="text-base font-semibold text-foreground">Scope of Work</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Define deliverables, key milestones, and scope specifications.</p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Project Description <span className="text-red-600">*</span>
          </label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the scope, key milestones, inclusions, and deliverables..."
            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all shadow-xs resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Be specific about deliverables, milestones, and any project exclusions.
          </p>
        </div>
      </div>

      {/* Section 3: Commercial Terms & Tracking */}
{/* Section 3: Commercial Terms & Tracking */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
        <div className="border-b border-border pb-4">
          <h3 className="text-base font-semibold text-foreground">Commercial Terms</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Specify pricing metrics, deadlines, and operational statuses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              Total Price (USD) <span className="text-red-600">*</span>
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
                className="rounded-xl border-border bg-white pl-8 text-sm font-semibold tabular-nums shadow-xs transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Target Due Date <span className="text-red-600">*</span>
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-xl border-border bg-white text-sm shadow-xs transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              Initial Status
            </label>
            <Select value={status} onValueChange={(value) => setStatus(value as string)}>
              <SelectTrigger className="h-12 w-full rounded-xl border-border bg-white pl-3.5 text-sm shadow-xs transition-all hover:bg-muted/50 focus:border-ring focus:ring-2 focus:ring-ring/20">
                <SelectValue placeholder="Select status..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border shadow-lg">
                <SelectItem value="quote_sent" className="cursor-pointer">Quote Sent</SelectItem>
                <SelectItem value="approved" className="cursor-pointer">Approved</SelectItem>
                <SelectItem value="in_progress" className="cursor-pointer">In Progress</SelectItem>
                <SelectItem value="delivered" className="cursor-pointer">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5" />
              Payment Status
            </label>
            <Select value={paymentStatus} onValueChange={(paymentStatus) => setPaymentStatus(paymentStatus as string)}>
              <SelectTrigger className="h-12 w-full rounded-xl border-border bg-white pl-3.5 text-sm shadow-xs transition-all hover:bg-muted/50 focus:border-ring focus:ring-2 focus:ring-ring/20">
                <SelectValue placeholder="Select payment status..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border shadow-lg">
                <SelectItem value="pending" className="cursor-pointer">Pending</SelectItem>
                <SelectItem value="paid" className="cursor-pointer">Paid</SelectItem>
                <SelectItem value="overdue" className="cursor-pointer">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 px-6 rounded-xl bg-action text-white hover:bg-action/90 font-semibold shadow-xs transition-all cursor-pointer"
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