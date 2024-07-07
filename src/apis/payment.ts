import paymentList from "../json/getPaymentList.json";

export const getPaymentList = async (
  range: Array<string>,
  sort: string,
  page: number,
  size: number
) => {
  // const { data } = await authInstance.get(
  //     `/payments/history?startDate=${range[0]}&endDate=${range[1]}&sort=${sort}&page=${page}&size=${size}`
  // )

  // return data
  const data = paymentList;
  return data;
};
