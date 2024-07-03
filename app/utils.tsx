import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone' // 导入插件
import utc from 'dayjs/plugin/utc' // 导入插件

function currentDate() {
    dayjs.extend(timezone)
    dayjs.extend(utc)
    return dayjs().tz("Asia/Shanghai").format("YYYYMMDD");
}

export const defaultDate = currentDate;