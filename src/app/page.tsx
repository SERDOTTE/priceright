import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 shadow-sm text-xs font-semibold text-ink">
        <span className="h-2 w-2 rounded-full bg-action" />
        Streamline Your Workflow
      </div>
      <h1 className="font-heading text-4xl font-bold tracking-tight text-ink dark:text-white">
        PriceRight &amp; QuoteEasy
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        Price your work with confidence, manage orders from quote to delivery, and keep track of
        your cash flow.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        {user ? (
          <Link href="/dashboard" className={buttonVariants()}>
            Go to your workspace
          </Link>
        ) : (
          <>
            <Link href="/signup" className={buttonVariants()}>
              Create an account
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "outline" })}>
              Sign in
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
