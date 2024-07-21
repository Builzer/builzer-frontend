import { defaultInstance } from "./utils";

/**
 * 로그인
 */
export const login = async (code: any) => {
  console.log(code);
  const { data } = await defaultInstance.post(`/member/oauth/github`, code);

  // const data = {
  //   gitEmail: "githubtest01@gmail.com",
  //   profileImage: 8,
  //   name: "githubNickName",
  //   totalCredit: 0,
  //   isInvited: true,
  // };

  return data;
};
