'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

function NewLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
    const pathname = usePathname();
    return (
      <Link href={href} className={`text-gray-600 font-semibold text-lg underline-offset-4 transition hover:underline-offset-4 hover:text-black  ${pathname == href ? "underline " : "text-gray-400"}`}>{children}</Link>
    );
  }
  
  export default function Navi() {
    return (
      //add bottom shadow
        <header className="shadow bg-white mx-auto py-6 px-10 flex flex-row gap-4 top-0 w-full z-10 fixed left-0 right-0">
            <NewLink href="/people">people</NewLink>
            <NewLink href="/">events</NewLink>
          </header>
    );
  }