import { fetchDate, fetchDateCount, fetchWeiboByDate } from "./lib/data";

export default async function Page({searchParams,}:{
  searchParams?:{
    date?:string;
  }
}) {
  // const count = await fetchDateCount();
  // const dates = await fetchDate(1);
  const queryDate = searchParams?.date || '2022-03-31';
  const weibos = await fetchWeiboByDate(queryDate)
  return (
    <main>
      {/* <div>
      <p>sum days:{count}</p>
      {
        dates.map((d)=>(
          <div key={d.date.getTime()}>
            <p>{d.date.toLocaleDateString()}</p>
          </div>
        ))
      } 
      <h1>current {date.date.toLocaleDateString()}</h1>
      </div>  */}

     <div>
        <ul className="flex flex-col text-gray-700 list-decimal list-inside">
          {weibos.map((d)=>(
              <li key={d.id}>
              <a href={d.href} target="_blank" className="antialiased nav-link hover:text-green-800">{d.content}</a>
              </li>
          ))}
        </ul>
      </div>
      
      
    </main>
  );
}
