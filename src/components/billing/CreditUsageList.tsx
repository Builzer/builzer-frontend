import { useQuery } from "react-query";
import { getCreditUsageList } from "../../apis/billing";
import { useState } from "react";
import {
  DatePicker,
  DatePickerProps,
  Pagination,
  PaginationProps,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import CreditImg from "../../assets/images/Credit.svg";

const date = new Date();
export const startDate =
  date.getFullYear() +
  "-" +
  ("0" + date.getMonth()).slice(-2) +
  "-" +
  ("0" + date.getDate()).slice(-2);
export const endDate =
  date.getFullYear() +
  "-" +
  ("0" + (1 + date.getMonth())).slice(-2) +
  "-" +
  ("0" + date.getDate()).slice(-2);
export const dateFormat = "YYYY/MM/DD";
export default function CreditUsageList() {
  const [range, setRange] = useState<Array<string>>([startDate, endDate]);
  const [sort, setSort] = useState<string>("asc");
  const [page, setPage] = useState<number>(0);
  const { RangePicker } = DatePicker;

  const { data, isLoading } = useQuery({
    queryKey: ["getCreditUsageList", range, sort, page],
    queryFn: () => getCreditUsageList(range, sort, page, 10),
  });

  const handleDateRange = (value: any, dateString: Array<string>) => {
    if (value === null) {
      setRange(["", ""]);
    } else {
      const start = new Date(dateString[0]);
      const end = new Date(dateString[1]);

      // 종료일이 오늘 날짜보다 뒷시간인 경우
      if (new Date(dateString[1]) > new Date(endDate)) {
        setRange([startDate, endDate]);
      } else if (Math.abs(start.getFullYear() - end.getFullYear()) > 2) {
        message.error("최근 2년 이내 내역만 조회 가능합니다.");
      }
    }
  };

  const disablePickerDate: DatePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const handleSort = (value: string) => {
    setSort(value);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setPage(page);
  };

  if (!data || isLoading) return <></>;

  return (
    <div>
      <div className="flex flex-row gap-2 justify-end">
        <RangePicker
          defaultValue={[
            dayjs(range[0], dateFormat),
            dayjs(range[1], dateFormat),
          ]}
          disabledDate={disablePickerDate}
          format={dateFormat}
          onChange={(value, dateString) => {
            handleDateRange(value, dateString);
          }}
        />
        <Select
          className="w-32"
          defaultValue="asc"
          value={sort}
          options={[
            {
              label: "최신순",
              value: "asc",
            },
            {
              label: "오래된순",
              value: "desc",
            },
          ]}
          onChange={handleSort}
        />
      </div>
      <div className="mt-5 w-full">
        {data.creditHistories.map((item, index) => (
          <div
            key={index}
            className="flex flex-row justify-between py-3 px-5 border-y-[1px] border-gray1"
          >
            <p className="text-xl flex flex-row gap-2">
              <img src={CreditImg} alt="크레딧 이미지" className="w-7" />
              {item.count}
            </p>
            <p className="font-light text-gray8">{item.eventDate}</p>
          </div>
        ))}
      </div>
      <Pagination
        className="mt-5 text-center"
        current={page}
        onChange={onChange}
        total={50}
      />
    </div>
  );
}
