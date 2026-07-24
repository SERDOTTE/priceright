import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/(auth)/actions";

// Server component: reads the auth session so the header can show a sign-out
// button for signed-in users, or a sign-in link for visitors.
export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-ink">
          {/* Brand yellow as a background chip with ink text (contrast-safe). */}
          <span className="rounded-md bg-brand px-1.5 py-0.5 text-ink">Price</span>
          Right
        </Link>

        {user ? (
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md px-3 py-1.5 text-sm font-semibold text-ink hover:bg-secondary"
            >
              Sign out
            </button>
          </form>
        ) : (
          <Link
            href="/login"
            className="rounded-md px-3 py-1.5 text-sm font-semibold text-ink hover:bg-secondary"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
