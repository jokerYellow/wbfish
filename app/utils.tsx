import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"; // 导入插件
import utc from "dayjs/plugin/utc"; // 导入插件

function currentDate() {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  return dayjs().tz("Asia/Shanghai").format("YYYYMMDD");
}

export function formatTimeAgo(date: Date): string {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs().tz("Asia/Shanghai");
  const now = dayjs().utcOffset(8);
  const postDate = dayjs(date).utcOffset(8);
  const diff = now.diff(postDate, "minute");

  if (diff < 60) {
    return `${diff} minutes ago ${now.format("YYYY-MM-DD HH:mmZ[Z]")} ${postDate.format("YYYY-MM-DD HH:mmZ[Z]")}`;
  } else if (diff < 1440) {
    const hours = Math.floor(diff / 60);
    return `${hours} hours ago ${now.format("YYYY-MM-DD HH:mmZ[Z]")} ${postDate.format("YYYY-MM-DD HH:mmZ[Z]")}`;
  } else {
    return postDate.format("YYYY-MM-DD HH:mm");
  }
}

export const defaultDate = currentDate;
