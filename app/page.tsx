import DatesCard from "./DatesCard";

import { fetchWeiboByDate } from "./lib/data";
import { Weibo } from "./lib/definitions";
import { defaultDate } from "./utils";
import dayjs from "dayjs";

/**
 * Removes duplicate Weibo objects from an array based on their content.
 * @param weibos - The array of Weibo objects.
 * @returns An array of Weibo objects with duplicates removed.
 */
function keepMultipleOnyOnce(weibos: Weibo[]): Weibo[] {
  const weiboMap = new Map<string, Weibo>();
  weibos.forEach((weibo) => {
    weiboMap.set(weibo.content, weibo);
  });
  return Array.from(weiboMap.values());
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    date?: string;
  };
}) {
  const queryDate = searchParams?.date || defaultDate();

  const currentDate = dayjs();
  const selectedDate = dayjs(queryDate, "YYYYMMDD");
  const result = await fetchWeiboByDate(queryDate);
  const weibos = keepMultipleOnyOnce(result);
  console.log(`show count:${weibos.length}, fetch count:${result.length}`);
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-none bg_header_color">
        <DatesCard />
      </div>
      <div className="grow flex justify-center bg-readable-color p-10 shadow-md rounded-md ">
        {selectedDate > currentDate ? (
          <h1 className="text-blue-500">This date is in the future</h1>
        ) : weibos.length === 0 ? (
          <h1 className="text-orange-500">404 - Weibos not found</h1>
        ) : (
          <WeiboList weibos={weibos} />
        )}
      </div>
    </main>
  );
}

function WeiboList({ weibos }: { weibos: Weibo[] }) {
  return (
    <ul className="flex gap-3 flex-row grow flex-wrap justify-start text-gray-700 list-decimal list-inside text-sm font-sanf italic">
      {weibos.map((d) => (
        <li className="w-80" key={d.id}>
          <a
            href={d.href}
            target="_blank"
            className="antialiased nav-link text-gray-950 hover:text-blue-800 font-serif not-italic text-base" // Added "italic" class
          >
            {d.content}
          </a>
        </li>
      ))}
    </ul>
  );
}
