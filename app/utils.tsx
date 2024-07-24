import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone' // 导入插件
import utc from 'dayjs/plugin/utc' // 导入插件

function currentDate() {
    dayjs.extend(timezone)
    dayjs.extend(utc)
    return dayjs().tz("Asia/Shanghai").format("YYYYMMDD");
}


export function formatTimeAgo(date: Date): string {
    const now = dayjs().tz("Asia/Shanghai");
    const postDate = dayjs(date);
    const diff = now.diff(postDate, "minute");

    if (diff < 60) {
      return `${diff} minutes ago`;
    } else if (diff < 1440) {
      const hours = Math.floor(diff / 60);
      return `${hours} hours ago`;
    } else {
      return postDate.format("YYYY-MM-DD HH:mm");
    }
  }

export const defaultDate = currentDate;