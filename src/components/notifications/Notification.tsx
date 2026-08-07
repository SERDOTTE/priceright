'use client';
import Link from 'next/link';

export interface Notification {
  id: number;
  message: string;
  link: string;
}

const NotificationsPage = (notifications: Notification[]) => {


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 bg-white rounded-lg shadow">
            <Link href={notification.link} className="text-blue-500 hover:underline">
              {notification.message}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
