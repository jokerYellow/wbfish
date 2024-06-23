import Link from "next/link";
import { dateToString, fetchDate } from "./lib/data";
import clsx from 'clsx';
import { useSearchParams } from "next/navigation";

export default async function DatesCard({searchParams,}:{
    searchParams?:{
      date?:string;
    }
  }){
    const queryDate = searchParams?.date || '2022-03-31';
    const dates = await fetchDate(1);
    return <div >
        <div className="flex flex-row flex-wrap justify-start space-x-2 text-teal-600">
        {dates.map((d)=>{
            return <Link href={`/?date=${dateToString(d.date)}`} className={clsx(
                'hover:text-blue-400',
                {
                  'text-red-700': dateToString(d.date) == queryDate
                }
                )} key={d.date.toDateString()}>{dateToString(d.date)}</Link>
        })}
        </div>
        
    </div>;
}