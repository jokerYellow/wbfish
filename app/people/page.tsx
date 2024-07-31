import React from "react";
import { fetchAllCount, fetchAllWeibos } from "../lib/data";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // 导入插件
import utc from "dayjs/plugin/utc"; // 导入插件
import { formatTimeAgo } from "../utils";
import { redirect } from "next/navigation";
import Link from "next/link";

function PageNation(page: number, size: number, sum: any) {
  return (
    <div className="flex justify-center gap-4 mt-3 mb-20 md:mb-3 text-gray-500">
      {page > 1 ? (
        <Link href={`?page=${page - 1}&size=${size}`} className="text-gray-600">
          上一页
        </Link>
      ) : (
        <span className="text-gray-400 cursor-not-allowed">上一页</span>
      )}
      <span className="">
        第{page}/{Math.ceil(sum / size)}页
      </span>
      <span className="">每页 {size} 条</span>
      <span className="">
        总共 <code>{sum}</code> 条
      </span>
      {page < Math.ceil(sum / size) ? (
        <Link href={`?page=${page + 1}&size=${size}`} className="text-gray-600">
          下一页
        </Link>
      ) : (
        <span className="text-gray-400 cursor-not-allowed">下一页</span>
      )}
    </div>
  );
}

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  let page = parseInt(searchParams["page"] ?? "1", 10);
  let size = parseInt(searchParams["size"] ?? "10", 10);
  let searchValue = searchParams["search"] ?? "";
  if (page < 1 || size < 1) {
    redirect("/people?page=1");
  }
  const weibos = await fetchAllWeibos(page - 1, size, searchValue);
  const sum = await fetchAllCount(searchValue);
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const items = weibos.map((weibo) => {
    return (
      <li
        key={weibo.id}
        className="list-none bg-slate-100 transition duration-200 ease-in-out hover:bg-blue-100 p-2 rounded-sm font-sans antialiased text-gray-700 group"
      >
        <div className="relative grid gap-1">
          <div className="flex justify-start content-start items-baseline gap-3">
            <a
              href={"https://weibo.com/u/" + weibo.authorId}
              className="text-gray-800 font-bold"
            >
              {weibo.authorName}{" "}
            </a>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(weibo.date)}
            </span>
            <div className="grow"></div>
            <a
              href={weibo.href}
              target="_blank"
              className="text-xs text-gray-500"
            >
              原微博
            </a>
          </div>
          <p className="text-base">
            {weibo.content.endsWith("Translate content")
              ? weibo.content.slice(0, -"Translate content".length)
              : weibo.content}
          </p>
        </div>

        {weibo.retweetContent && (
          <div className="grid gap-1 bg-slate-200 last:group-hover:bg-blue-200 p-2 rounded-sm mt-2 transition duration-200 ease-in-out">
            <p className="text-gray-800 font-bold">{weibo.retweetAuthor}</p>
            <p className=" text-base ">{weibo.retweetContent}</p>
          </div>
        )}
      </li>
    );
  });

  const change = (e: any) => {
    e.preventDefault();
    const search = e.target.search.value;
    redirect("/people?search=" + search);
  };

  return (
    <div>
      <form className="flex mb-4 justify-center" action="/people">
        <input
          name="search"
          type="text"
          className="rounded-md text-gray-500 p-2 border-gray-800  border-2 "
          placeholder={"bling"}
          defaultValue={searchValue}
        />
      </form>
      <ul className="grid gap-4">{items}</ul>
      {PageNation(page, size, sum)}
    </div>
  );
};

export const revalidate = 10;

export default Page;
