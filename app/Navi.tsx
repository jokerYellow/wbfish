'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

function NewLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
    const pathname = usePathname();
    return (
      <Link href={href} className={`${pathname == href ? " text-white underline underline-offset-4 transition hover:underline-offset-4 hover:text-yellow-300 " : "text-white transition hover:underline-offset-4 hover:text-yellow-300 "}`}>{children}</Link>
    );
  }
  
  export default function Navi() {
    return (
        <header className="bg-blue-500 text-white text-center py-4 px-10 flex flex-row gap-4 top-0 w-full z-10">
            <NewLink href="/people">people</NewLink>
            <NewLink href="/">events</NewLink>
          </header>
    );
  }