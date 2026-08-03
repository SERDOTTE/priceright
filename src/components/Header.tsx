import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AuthHeaderActions } from "./AuthHeaderActions";
import ThemeToggleIcon from "./ThemeIconButton";

// Server component: reads the auth session so the header can show a sign-out
// button for signed-in users, or a sign-in link for visitors.
export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="fixed w-full z-20 border-b border-border bg-white dark:bg-ink dark:text-white">
      <div className="mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-ink dark:text-white">
          <span className="rounded-lg bg-brand px-1.5 py-0.5 text-black shadow-sm">Price</span>
          Right
        </Link>
        <div className="flex flex-row justify-center items-center gap-2">
          {!user && <ThemeToggleIcon />}
          <AuthHeaderActions isSignedIn={!!user} user={user}/>
        </div>
      </div>
    </header>
  );
}
