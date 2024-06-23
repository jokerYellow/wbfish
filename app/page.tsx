import DatesCard from "./DatesCard";
import { dateToString, fetchDate, fetchDateCount, fetchWeiboByDate } from "./lib/data";
import clsx from 'clsx';

export default async function Page({searchParams,}:{
  searchParams?:{
    date?:string;
  }
}) {
  const queryDate = searchParams?.date || '2022-03-31';
  const weibos = await fetchWeiboByDate(queryDate)
  return (
    <main>
      <DatesCard/>
     <div>
        <ul className="flex gap-3 flex-row grow flex-wrap justify-start text-gray-700 list-decimal list-inside">
          {weibos.map((d)=>(
              <li className='w-80' key={d.id}>
              <a href={d.href} target="_blank" className="antialiased nav-link  hover:text-green-800">{d.content}</a>
              </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
