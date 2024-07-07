/**
 * 로그 파일 다운로드
 */
export const login = async () => {
  // const { data } = await defaultInstance.post(
  //     `/member/oauth/github`
  // )

  // return data

  const data = {
    gitEmail: "githubtest01@gmail.com",
    profileImage: 8,
    name: "githubNickName",
    totalCredit: 0,
    isInvited: true,
  };

  return data;
};
