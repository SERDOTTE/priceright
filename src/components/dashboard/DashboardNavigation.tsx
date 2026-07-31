// app/projects/layout.tsx
'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useMediaQuery from '../useMediaQuery';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ChevronDown, Hammer, LayoutDashboard, ListTodo, Percent, Plus, Users, WalletCards } from 'lucide-react';

type NavLeaf = {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

type NavGroup = {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    basePath: string;
    children: NavLeaf[];
};

type NavItem = NavLeaf | NavGroup;

const navItems: NavItem[] = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/customers", label: "Customers", icon: Users },
    { href: "/dashboard/orders/create", label: "Orders", icon: Plus },
    { href: "/dashboard/orders", label: "All Orders", icon: ListTodo },
    {
        label: "Costs Registration",
        icon: WalletCards,
        basePath: "/dashboard/costs",
        children: [
            { href: "/dashboard/costs/materials", label: "Material Costs", icon: Hammer },
            { href: "/dashboard/costs/labor", label: "Labor Costs", icon: Plus },
            { href: "/dashboard/costs/target-profit", label: "Target Profit", icon: Percent },
        ],
    },
];

function isGroup(item: NavItem): item is NavGroup {
    return "children" in item;
}

export default function OrderNavLinks() {
    const pathname = usePathname();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isCostsOpen, setIsCostsOpen] = useState(false);

    useEffect(() => {
        if (pathname.startsWith('/dashboard/costs')) {
            setIsCostsOpen(true);
        }
    }, [pathname]);

    return (
        !isMobile ? (
            <div className="flex sm:w-52 lg:w-67">
                <section
                    style={{ backgroundColor: "#1A1A1A" }}
                    className="w-full h-auto m-1 rounded-2xl text-white shadow-sm"
                >
                    <nav className="p-2">
                        <ul className="flex flex-col items-center gap-1.5 py-1">
                            {navItems.map((item) => {
                                if (!isGroup(item)) {
                                    const isActive = pathname === item.href || (item.href === "/dashboard/customers" && pathname.startsWith("/dashboard/customers/edit/"));
                                    const IconComponent = item.icon;
                                    return (
                                        <li key={item.href} className="w-full">
                                            <Link
                                                href={item.href}
                                                aria-current={isActive ? 'page' : undefined}
                                                style={{
                                                    backgroundColor: isActive ? "#FFC200" : "transparent",
                                                    color: isActive ? "#1A1A1A" : "#FFFFFF"
                                                }}
                                                className={`flex items-center gap-3 px-4 py-3.5 w-full text-sm rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-white ${
                                                    isActive ? 'shadow-sm' : 'text-white/80'
                                                }`}
                                            >
                                                <IconComponent className="size-5" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </li>
                                    );
                                }

                                const ParentIcon = item.icon;
                                const isGroupActive = pathname.startsWith(item.basePath);

                                return (
                                    <li key={item.basePath} className="w-full">
                                        <button
                                            type="button"
                                            aria-expanded={isCostsOpen}
                                            onClick={() => setIsCostsOpen((prev) => !prev)}
                                            style={{
                                                backgroundColor: isGroupActive ? "#FFC200" : "transparent",
                                                color: isGroupActive ? "#1A1A1A" : "#FFFFFF"
                                            }}
                                            className={`flex items-center justify-between gap-3 px-4 py-3.5 text-left  w-full text-sm sm:text-xs lg:text-sm rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-white ${
                                                isGroupActive ? 'shadow-sm' : 'text-white/80'
                                            }`}
                                        >
                                            <span className="flex items-center gap-3 truncate">
                                                <ParentIcon className="size-5" />
                                                <span>{item.label}</span>
                                            </span>
                                            <ChevronDown className={`size-4 transition-transform ${isCostsOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isCostsOpen && (
                                            <ul className={`mt-1 flex flex-col gap-1 pl-4 ${isCostsOpen ? 'animate-in slide-in-from-top-10' : 'animate-out slide-out-to-top-10'}`}>
                                                {item.children.map((child) => {
                                                    const isChildActive = pathname === child.href;
                                                    const ChildIcon = child.icon;
                                                    return (
                                                        <li key={child.href} className="w-full">
                                                            <Link
                                                                href={child.href}
                                                                aria-current={isChildActive ? 'page' : undefined}
                                                                style={{
                                                                    backgroundColor: isChildActive ? "#FFC200" : "transparent",
                                                                    color: isChildActive ? "#1A1A1A" : "#FFFFFF"
                                                                }}
                                                                className={`flex items-center gap-3 px-4 py-2.5 w-full text-sm rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-white ${
                                                                    isChildActive ? 'shadow-sm' : 'text-white/80'
                                                                }`}
                                                            >
                                                                <ChildIcon className="size-4" />
                                                                <span>{child.label}</span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </section>
            </div>
        ) : (
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-ink rounded-xl">
                            <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150 p-2">
                                {navItems.map((item) => {
                                    if (!isGroup(item)) {
                                        const isActive = pathname === item.href || (item.href === "/dashboard/customers" && pathname.startsWith("/dashboard/customers/edit/"));
                                        const IconComponent = item.icon;
                                        return (
                                            <li key={item.href} className="w-full">
                                                <Link
                                                    href={item.href}
                                                    aria-current={isActive ? 'page' : undefined}
                                                    style={{
                                                        backgroundColor: isActive ? "#FFC200" : "transparent",
                                                        color: isActive ? "#1A1A1A" : "#FFFFFF"
                                                    }}
                                                    className={`flex items-center gap-3 px-4 py-3.5 w-full text-sm rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-white ${
                                                        isActive ? 'shadow-sm' : 'text-white/80'
                                                    }`}
                                                >
                                                    <IconComponent className="size-5" />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </li>
                                        );
                                    }

                                    const ParentIcon = item.icon;
                                    const isGroupActive = pathname.startsWith(item.basePath);

                                    return (
                                        <li key={item.basePath} className="w-full md:col-span-2">
                                            <button
                                                type="button"
                                                aria-expanded={isCostsOpen}
                                                onClick={() => setIsCostsOpen((prev) => !prev)}
                                                style={{
                                                    backgroundColor: isGroupActive ? "#FFC200" : "transparent",
                                                    color: isGroupActive ? "#1A1A1A" : "#FFFFFF"
                                                }}
                                                className={`flex items-center justify-between gap-3 px-4 py-3.5 w-full text-sm rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-white ${
                                                    isGroupActive ? 'shadow-sm' : 'text-white/80'
                                                }`}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <ParentIcon className="size-5" />
                                                    <span>{item.label}</span>
                                                </span>
                                                <ChevronDown className={`size-4 transition-transform ${isCostsOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            {isCostsOpen && (
                                                <ul className="mt-1 flex flex-col gap-1 pl-4">
                                                    {item.children.map((child) => {
                                                        const ChildIcon = child.icon;
                                                        const isChildActive = pathname === child.href;
                                                        return (
                                                            <li key={child.href} className="w-full">
                                                                <Link
                                                                    href={child.href}
                                                                    aria-current={isChildActive ? 'page' : undefined}
                                                                    style={{
                                                                        backgroundColor: isChildActive ? "#FFC200" : "transparent",
                                                                        color: isChildActive ? "#1A1A1A" : "#FFFFFF"
                                                                    }}
                                                                    className={`flex items-center gap-3 px-4 py-2.5 w-full text-sm rounded-xl transition-all duration-200 hover:bg-brand/20 hover:text-white ${
                                                                        isChildActive ? 'shadow-sm' : 'text-white/80'
                                                                    }`}
                                                                >
                                                                    <ChildIcon className="size-4" />
                                                                    <span>{child.label}</span>
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        )
    );
}