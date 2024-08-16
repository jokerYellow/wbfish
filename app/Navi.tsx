"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NewLink({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`text-gray-600 font-semibold text-lg underline-offset-4 transition hover:underline-offset-4 hover:text-black  ${
        pathname == href ? "underline " : "text-gray-400"
      }`}
    >
      {children}
    </Link>
  );
}

function SearchBar() {
  return (
    <form className="flex mb-4 justify-center" action="/people">
      <input
        name="search"
        type="text"
        className="rounded-md text-gray-700 px-2 bg-gray-100 text-sm border-gray-600 border-1 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-transparent shadow-sm transition duration-200 ease-in-out p-1"
        placeholder={"search weibos"}
        defaultValue={useSearchParams().get("search") || ""}
      />
    </form>
  );
}

export default function Navi() {
  return (
    <header className=" bg-white mx-auto py-6 px-10 flex flex-row gap-4 top-0 w-full z-10 left-0 right-0 ">
      <NewLink href="/people">people</NewLink>
      <NewLink href="/">events</NewLink>
      <div className="flex-grow"></div>
      <Suspense fallback={<div>loading...</div>}>
        <SearchBar />
      </Suspense>
    </header>
  );
}
