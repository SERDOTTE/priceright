import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OrderNavLinks from "@/components/orders/OrderNavLinks";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Protect the whole dashboard group: an unauthenticated visitor is sent to
  // login before they can see any dashboard or orders content.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen text-base">
      <div className="flex flex-col sm:flex-row w-full border-t border-border">
        <OrderNavLinks />
        {children}
      </div>
    </div>
  );
}
