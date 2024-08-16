import React from "react";
import { fetchAllCount, fetchAllWeibos, fetchRandomWeibo } from "../lib/data";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // 导入插件
import utc from "dayjs/plugin/utc"; // 导入插件
import { formatTimeAgo } from "../utils";
import { redirect } from "next/navigation";
import Link from "next/link";
import WeiboItem from "../_components/weiboItem";

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
      <li key={weibo.id} className="list-none">
        <WeiboItem weibo={weibo} history={false} />
      </li>
    );
  });
  const randomWeibo = await fetchRandomWeibo();
  return (
    <div>
      {/* random weibo */}
      <div className="mb-4">
        <WeiboItem weibo={randomWeibo} history={true} />
      </div>
      <ul className="grid gap-4">{items}</ul>
      {PageNation(page, size, sum)}
    </div>
  );
};

export const revalidate = 10;

export default Page;
