'use client'

import { Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils";

export default function ThemeToggleDropDown({ className }: { className?: string }) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        setMounted(true)
        // Check local storage or system preference on mount
        const storedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    const setTheme = (dark: boolean) => {
        setIsDarkMode(dark)
        if (dark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    // Return a placeholder of the same size to prevent layout shift before hydration
    if (!mounted) return <div className="w-9 h-9" />

    return (
        <div className={cn("flex flex-col border-b p-2 gap-2 text-muted-foreground", className)}>
            <p className="text-xs text-muted-foreground">Theme</p>

            <button
                onClick={() => setTheme(true)}
                className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs transition-colors text-left",
                    "hover:bg-gray-200 dark:hover:bg-gray-800",
                    isDarkMode && "bg-gray-200 dark:bg-gray-800 font-medium"
                )}
                aria-label="Switch to dark theme"
            >
                <Moon className="w-4 h-4 text-muted-foreground" />
                <span>Dark</span>
            </button>

            <button
                onClick={() => setTheme(false)}
                className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs transition-colors text-left",
                    "hover:bg-gray-200 dark:hover:bg-gray-800",
                    !isDarkMode && "bg-gray-200 dark:bg-gray-800 font-medium"
                )}
                aria-label="Switch to light theme"
            >
                <Sun className="w-4 h-4 text-muted-foreground" />
                <span>Light</span>
            </button>
        </div>
    )
}