import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // 导入插件
import utc from "dayjs/plugin/utc"; // 导入插件

dayjs.extend(timezone);
dayjs.extend(utc);

const timeZone = process.env.TZ || "Asia/Shanghai"; // 从环境变量中获取时区，默认使用 UTC
const offset = process.env.offset || "0";

function currentDate() {
  return dayjs().tz(timeZone).format("YYYYMMDD");
}

export function formatTimeAgo(date: Date): string {
  const now = dayjs().tz(timeZone);
  
  const postDate = dayjs(date).tz(timeZone).add(Number(offset), "hour");
  const diff = now.diff(postDate, "minute");

  if (diff < 60) {
    return `${diff} minutes ago ${postDate.format("YYYY-MM-DD HH:mmZ[Z]")}`;
  } else if (diff < 1440) {
    const hours = Math.floor(diff / 60);
    return `${hours} hours ago ${postDate.format("YYYY-MM-DD HH:mmZ[Z]")}`;
  } else {
    return postDate.format("YYYY-MM-DD HH:mmZ[Z]");
  }
}

export const defaultDate = currentDate;
