import nextBilling from "../json/getNextBilling.json";

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
