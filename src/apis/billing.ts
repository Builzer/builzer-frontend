import nextBilling from "../json/getNextBilling.json";
import creditUsage from "../json/getCreditUsageList.json";

/**
 * 다음달 예상 결제 내역 확인
 */
export const getNextBilling = async (projectId: number) => {
  // const { data } = await authInstance.get(
  //     `/payments/${projectId}/next`
  // )

  // return data

  const data = nextBilling;

  return data;
};

/**
 * 다음달 예상 결제 내역 확인
 */
export const getCreditUsageList = async (
  range: Array<string>,
  sort: string,
  page: number,
  size: number
) => {
  // const { data } = await authInstance.get(
  //     `/payments/credits/history?startDate=${range[0]}&endDate=${range[1]}&sort=${sort}&page=${page}&size=${size}`
  // )

  // return data

  const data = creditUsage;

  return data;
};
