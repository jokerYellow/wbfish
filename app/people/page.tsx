import React from "react";
import { fetchAllCount, fetchAllWeibos } from "../lib/data";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // 导入插件
import utc from "dayjs/plugin/utc"; // 导入插件
import { formatTimeAgo } from "../utils";
import { redirect } from "next/navigation";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) => {
  let page = parseInt(searchParams["page"] ?? "1", 10);
  let size = parseInt(searchParams["size"] ?? "10", 10);
  if (page < 1 || size < 1) {
    redirect("/people?page=1");
  }
  const weibos = await fetchAllWeibos(page - 1, size);
  const sum = await fetchAllCount();
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const items = weibos.map((weibo) => {
    return (
      <div
        key={weibo.id}
        className="bg-slate-100 p-2 rounded-sm font-sans antialiased text-gray-700"
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
          <div className="grid gap-1 bg-slate-200 p-2 rounded-sm mt-2">
            <p className="text-gray-800 font-bold">{weibo.retweetAuthor}</p>
            <p className=" text-base ">{weibo.retweetContent}</p>
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      <div className="grid gap-4">{items}</div>
      <div className="flex justify-center gap-4 mt-3 mb-10">
        {page > 1 && <a href={`?page=${page - 1}&size=${size}`}>上一页</a>}
        <span className="text-blue-500">
          第{page}/{Math.ceil(sum / size)}页
        </span>
        <span className="text-blue-500">每页{size}条</span>
        <span className="text-blue-500">总共{sum}条</span>
        <a href={`?page=${page + 1}&size=${size}`}>下一页</a>
      </div>
    </div>
  );
};

export const revalidate = 10;

export default Page;
