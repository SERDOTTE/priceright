'use client'

import { useState, useRef, useEffect } from 'react'
import { SignOutButton } from './accounts/SignOutButton'
// import { DeleteButton } from './accounts/DeleteAccount'
import Name from './Names';
import ThemeToggleDropDown from "./ThemeDropDown";


export default function UserMenu({ user, children }: { user: any; children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  if (!user) return null

  const initials = user?.user_metadata?.name // Access the 'name' property from user_metadata
    ?.split(' ')
    .map((n: string) => n[0]) 
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U'

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group flex items-center p-1 rounded-full -mr-2 dark:bg-white/20 hover:bg-brand/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 dark:focus:ring-white/50 focus:ring-brand/50"
      >
        {/* Avatar / Initials container - ALWAYS VISIBLE */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/10 dark:bg-zinc-800 text-sm font-bold shadow-sm">
          {initials}
        </div>

        {/* Expanding text container - Slides out on click/open */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-w-xs opacity-100 pl-2 pr-3" : "max-w-0 opacity-0 px-0"
            }`}
        >
          <span className="text-sm font-medium sm:block whitespace-nowrap">
            <Name username={user?.user_metadata?.name || "Guest"} fullname={false} />
          </span>
        </div>
      </button>

      {isOpen && (
        <div className={`${isOpen ? ` animate-in fade-in zoom-in-50 top-full duration-300` : `animate-out fade-out zoom-out-50 duration-300`} absolute right-0 mt-2 -mr-3 w-56 rounded-xl bg-white dark:bg-ink  shadow-xl border  py-2 z-50`} role="menu" aria-orientation="vertical">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold  truncate">
              {user?.user_metadata?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {user?.user_metadata?.email}
            </p>
          </div>
          <ThemeToggleDropDown />
          {/* <DeleteButton /> */}
          <SignOutButton />
        </div>
      )}
    </div>
  )
}