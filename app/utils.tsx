import dayjs from "dayjs";

function currentDate() {
    return dayjs().format('YYYYMMDD');
}

export const defaultDate = currentDate;