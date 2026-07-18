// app/projects/layout.tsx
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/orders", label: "Create Order" },
    { href: "/dashboard/edit", label: "View/Edit Orders" },
];

export default function OrderNavLinks() {

    const pathname = usePathname();

    return (
        <div className='flex sm:w-[184.5]'>
            <section className='w-full h-auto bg-header2 text-white '>
                <nav>
                    <ul className="flex sm:flex-col items-center">
                        {navItems.map((item) => (
                            <li key={item.href} className='w-full'>
                                {(() => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            href={item.href}
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`block px-4 py-4 w-full text-button font-medium text-gray-100 transition duration-300 hover:bg-white hover:text-gray-900 ${isActive ? 'text-gray-700 bg-white' : ' '}`}>
                                            {item.label}
                                        </Link>
                                    );
                                })()}
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </div>
    );
}