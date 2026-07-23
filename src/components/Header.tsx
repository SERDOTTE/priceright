import Link from 'next/link';
import NavPopUp from '@/components/NavPopUp';



export default function Header() {
  return (
    <header className="h-auto bg-white text-gray-100 flex justify-between items-center ">
      <div id="navigationContainer" className="relative w-full">
        <div className="mx-auto flex w-full items-center justify-between">
          <div className="flex items-center justify-center p-4  bg-header w-51 m-1 rounded-2xl">
            <Link
              href="/"
              id="header-title"
              className="link rounded-md text-2xl font-bold tracking-tight "
            >
              Price<span className='bg-black p-1 ml-0.5'>Right</span>
            </Link>
          </div>
          <div>
            <NavPopUp />
          </div>
        </div>
      </div>
    </header>
  );
}