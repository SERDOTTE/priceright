'use client'

import { Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils";

export default function ThemeToggleIcon({ className }: { className?: string }) {
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
        <button
            onClick={() => setTheme(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-ink-dark"
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="w-5 h-5 text-white" />
            ) : (
                <Moon className="w-5 h-5 text-black" />
            )}
        </button>
    )
}