"use client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSearchParams } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { defaultDate } from "./utils";
import { Button } from "@mui/material";
import { useState } from "react";

export default function DatesCard() {
  const date = useSearchParams().get("date") || defaultDate();
  const router = useRouter();
  const [dj, setDJ] = useState(dayjs(date, "YYYYMMDD"));

  const onChange = (value: Dayjs) => {
    setDJ(value);
    router.push(`/?date=${value.format("YYYYMMDD")}`);
  };

  const preClick = () => {
    const nd = dj.subtract(1, "day");
    setDJ(nd);
    router.push(`/?date=${nd.format("YYYYMMDD")}`);
  };
  const nextClick = () => {
    const nd = dj.add(1, "day");
    setDJ(nd);
    router.push(`/?date=${nd.format("YYYYMMDD")}`);
  };
  return (
    <div className="flex flex-row justify-center items-center mt-10 mb-10 text-white">
      <Button
        onClick={() => {
          preClick();
        }}
        className="text-white"
      >
        pre
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={(x: any) => {
            onChange(x);
          }}
          value={dj}
          defaultValue={dj}
        />
      </LocalizationProvider>
      <Button
        onClick={() => {
          nextClick();
        }}
        className="text-white"
      >
        next
      </Button>
    </div>
  );
}
