import Filter from '@/components/Filter';
import Name from '@/components/Names';
import Link from 'next/link'
import { createClient } from "@/lib/supabase/server";

export const FilterList = [
  {
    title: "Support Status", label: "Ticket Status", htmlFor: "ticketStatus", name: "status", id: "ticketStatus",
    options: [
      { value: "all", label: "All Tickets" },
      { value: "open", label: "Open / Unassigned" },
      { value: "pending", label: "Pending Client Action" },
      { value: "resolved", label: "Resolved" }
    ]
  },
  {
    title: "Priority Level", label: "Urgency", htmlFor: "urgencyLevel", name: "priority", id: "urgencyLevel",
    options: [
      { value: "high", label: "High Priority (24hr)" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" }
    ]
  },
  {
    title: "Record Type", label: "Document Category", htmlFor: "docCategory", name: "document_type", id: "docCategory",
    options: [
      { value: "invoice", label: "Invoices" },
      { value: "contract", label: "Service Contracts" },
      { value: "intake", label: "Client Intake Forms" }
    ]
  }
];

export default async function OrdersDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user)

  return (
    <div
      className="dark:bg-ink min-h-screen text-ink dark:white  flex-1 w-auto m-1 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.2)] bg-white"
    >

      <main className="p-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold font-heading text-ink dark:text-white">
            {/* If full_name is undefined, it will pass "Guest" instead */}
            Welcome, <Name username={user?.user_metadata?.name || "Guest"} fullname={false} />
          </h1>
          <p className="text-sm text-muted-foreground">
            This is your private workspace. Your data is visible only to you.
          </p>
        </div>
        <span className='border-t border-gray-200 my-4  block'></span>
        <div className="flex max-sm:flex-col max-sm:gap-3 max-sm:items-start sm:max-w-250 my-0 mx-auto justify-between items-center rounded-lg mb-6 shadow-md/20 p-4">
          <div id="searchBoxContainer" className="w-full sm:w-[50%] max-w-md mr-4">
            <div className="searchContainer flex items-center justify-between gap-2 h-9">
              <input
                type="search"
                id="search"
                name="q"
                placeholder="Search Orders"
                style={{ borderColor: "#1A1A1A20", color: "#1A1A1A" }}
                className="w-full h-full text-xs rounded-lg border bg-transparent outline-none px-3 placeholder:opacity-40 focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all shadow-sm"
              />
            </div>
          </div>
          <Link
            href={'/dashboard/orders'}
            style={{ backgroundColor: "#FFC200", color: "#1A1A1A" }}
            className="px-4 py-2 rounded-lg text-sm hover:opacity-90 hover:cursor-pointer transition-all shadow-sm h-9 flex items-center justify-center shrink-0 max-sm:mx-auto"
          >
            + Create Order
          </Link>
        </div>

        <div className='bg-muted p-2 shadow-md/20 rounded-lg sm:max-w-250 my-0 mx-auto mb-6'>
          <Filter filters={FilterList} />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden sm:max-w-250 mx-auto">
          {/* ... table content ... */}
        </div>
      </main>
    </div>
  );
}