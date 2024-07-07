import CreditImg from "../../assets/images/Credit.svg";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Pagination,
  PaginationProps,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "react-query";
import { getPaymentList } from "../../apis/payment";

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

export default function PaymentList() {
  const [range, setRange] = useState<Array<string>>([startDate, endDate]);
  const [sort, setSort] = useState<string>("asc");
  const [page, setPage] = useState<number>(0);
  const { RangePicker } = DatePicker;

  const { data, isLoading } = useQuery({
    queryKey: ["getPaymentList", range, sort, page],
    queryFn: () => getPaymentList(range, sort, page, 10),
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
        {data.paymentHistories.map((item, index) => (
          <div
            key={index}
            className="border-[1px] border-gray1 p-5 flex flex-row justify-between"
          >
            <div className="flex flex-row gap-3">
              <img src={CreditImg} alt="크레딧 이미지" className="w-20" />
              <div>
                <p>{item.paymentState}</p>
                <p className="font-thin text-gray8">{item.eventDate}</p>
                <p
                  className={`mt-2 font-bold text-xl ${
                    item.paymentState === "buy" ? "text-red" : ""
                  }`}
                >
                  {item.paymentState === "buy" ? "-" : "+"}
                  {item.count}
                </p>
              </div>
            </div>
            <Button className="mt-5 bg-black" size="large" type="primary">
              결제내역 상세
            </Button>
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
