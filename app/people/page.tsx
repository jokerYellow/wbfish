import React from "react";
import { fetchAllWeibos } from "../lib/data";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // 导入插件
import utc from "dayjs/plugin/utc"; // 导入插件

const Page: React.FC = async () => {
  const weibos = await fetchAllWeibos();
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const refreshTime = dayjs().tz("Asia/Shanghai").format("YYYYMMDD HH:mm:ss");
  const items = weibos.reverse().map((weibo) => {
    return (
      <div
        key={weibo.id}
        className="bg-slate-100 p-2 rounded-lg font-sans antialiased  text-gray-800"
      >
        <div className="text-black text-lg relative mb-3">
          <a href={"https://weibo.com/u/" + weibo.authorId}>
            {weibo.authorName}{" "}
          </a>
          <span className=" text-xs inline-block">
            {weibo.date.toLocaleString()}
          </span>
          <a
            href={weibo.href}
            target="_blank"
            className="absolute text-xs inline-block right-0"
          >
            原微博
          </a>
          <p className=" text-base">{weibo.content}</p>
        </div>

        {weibo.retweetContent && (
          <div className="grid gap-1 bg-slate-200 p-3 rounded-lg">
            <p className="text-black">{weibo.retweetAuthor}</p>
            <p className=" text-base ">{weibo.retweetContent}</p>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="grid gap-4">
      <p className="text-black">{refreshTime}</p>
      {items}
    </div>
  );
};

export const revalidate = 10;

export default Page;
