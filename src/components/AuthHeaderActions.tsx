"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";

export function AuthHeaderActions({ isSignedIn }: { isSignedIn: boolean }) {
  const pathname = usePathname();
  const onAuthPage = pathname === "/login" || pathname === "/signup";

  if (isSignedIn) {
    return (
      <form action={signOut}>
        <button
          type="submit"
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-ink hover:bg-secondary dark:text-white"
        >
          Sign out
        </button>
      </form>
    );
  }

  // Already on login/signup — don't show a redundant Sign in link (Sunny).
  if (onAuthPage) {
    return null;
  }

  return (
    <Link
      href="/login"
      className="rounded-md px-3 py-1.5 text-sm font-semibold text-ink hover:bg-secondary dark:text-white"
    >
      Sign in
    </Link>
  );
}
