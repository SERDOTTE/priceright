'use client'

import { useEffect, useState } from 'react'
import { Bell, X, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface Notification {
  id: string;
  message: string;
  link: string;
}

export default function NotificationIcon() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setNotifications(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const hasNotifications = notifications.length > 0;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
        aria-label="Toggle Notifications"
      >
        <Bell strokeWidth={1.5} className="size-5 text-gray-700 dark:text-gray-200" />

        {hasNotifications && (
          <span className="absolute top-0 right-1 flex size-2.5">
            {/* Animated pulsing outer ring */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-action opacity-75" />
            {/* Solid inner red dot */}
            <span className="relative inline-flex size-2.5 rounded-full bg-action" />
          </span>
        )}
      </button>
      {/* Backdrop Overlay (Starts below the header) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-16.25 bg-black/20 dark:bg-black/40 z-10 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Right Slide-over Drawer Panel */}
      <div
        className={`fixed top-16.25 right-0 bottom-0 z-10 w-90 sm:w-96 m-1 rounded-2xl bg-white dark:bg-ink border-l border-border shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0 [body:has(&)]:overflow-hidden' : 'translate-x-full'
          }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base text-ink dark:text-white">
              Notifications
            </h3>
            {hasNotifications && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-action/10 text-action dark:bg-red-950 dark:text-red-300">
                {notifications.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close panel"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Notifications Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!hasNotifications ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500 dark:text-gray-400">
              <CheckCircle2 className="size-8 mb-2 stroke-1 text-gray-400 dark:text-gray-500" />
              <p className="text-sm">You&apos;re all caught up!</p>
            </div>
          ) : (
            notifications.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="block p-3 rounded-xl border border-border bg-gray-50 dark:bg-neutral-900/60 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-4 text-action shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
                    {item.message}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}