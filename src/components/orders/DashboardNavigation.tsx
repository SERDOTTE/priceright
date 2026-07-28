// app/projects/layout.tsx
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useMediaQuery from '../useMediaQuery';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navItems = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/customers", label: "Customers" },
    { href: "/dashboard/orders", label: "Create Order" },
    { href: "/dashboard/edit", label: "View/Edit Orders" },
];

export default function OrderNavLinks() {
    const pathname = usePathname();
    const isMobile = useMediaQuery('(max-width: 768px)');


    return (
        !isMobile ? (
            <>
                <div className="flex sm:w-52">
                    <section
                        style={{ backgroundColor: "#1A1A1A" }}
                        className="w-52 h-auto m-1 rounded-2xl text-white shadow-sm"
                    >
                        <nav className="p-2">
                            <ul className="flex flex-col items-center gap-1.5 py-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href || (item.href === "/dashboard/customers" && pathname.startsWith("/dashboard/customers/edit/"));;
                                    return (
                                        <li key={item.href} className="w-full">
                                            <Link
                                                href={item.href}
                                                aria-current={isActive ? 'page' : undefined}
                                                style={{
                                                    backgroundColor: isActive ? "#FFC200" : "transparent",
                                                    color: isActive ? "#1A1A1A" : "#FFFFFF"
                                                }}
                                                className={`block px-4 py-3.5 w-full text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-white ${isActive ? 'shadow-sm' : 'text-white/80'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </section>
                </div>
            </>
        ) : (
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                        <NavigationMenuContent className={`bg-ink rounded-xl`}>
                            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href || (item.href === "/dashboard/customers" && pathname.startsWith("/dashboard/customers/edit/"));
                                     return (
                                        <li key={item.href} className="w-full">
                                            <Link
                                                href={item.href}
                                                aria-current={isActive ? 'page' : undefined}
                                                style={{
                                                    backgroundColor: isActive ? "#FFC200" : "transparent",
                                                    color: isActive ? "#1A1A1A" : "#FFFFFF"
                                                }}
                                                className={`block px-4 py-3.5 w-full text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-white ${isActive ? 'shadow-sm' : 'text-white/80'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        )
    );
}