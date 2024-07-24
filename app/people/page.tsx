import React from "react";
import { fetchAllWeibos } from "../lib/data";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // 导入插件
import utc from "dayjs/plugin/utc"; // 导入插件
import { formatTimeAgo } from "../utils";

const Page = async () => {
  const weibos = await fetchAllWeibos();
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
            <span className="text-xs text-gray-500">{formatTimeAgo(weibo.date)}</span>
            <div className="grow"></div>
            <a href={weibo.href} target="_blank" className="text-xs text-gray-500">
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

  return <div className="grid gap-4">{items}</div>;
};

export const revalidate = 10;

export default Page;
