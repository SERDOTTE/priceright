import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-auto bg-background text-gray-100 flex justify-between items-center ">
      <div id="navigationContainer" className="relative w-full">
        <div className="mx-auto flex w-full items-center justify-between">
          <div className="flex items-center justify-center p-4 px-8 bg-header">
            <Link
              href="/"
              id="header-title"
              className="link rounded-md text-2xl font-bold tracking-tight "
            >
              Price<span className='bg-black p-1 ml-0.5'>Right</span>
            </Link>
          </div>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-1 sm:gap-2 px-4 text-sm text-black">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/tracker', label: 'Tracker' }
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-button font-medium text-brand-text transition hover:bg-brand-secondary hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}