import { useSetRecoilState } from "recoil";
import { userLoginInfo } from "../types/common";
import { userInfoState } from "../recoil/atoms/common";
import { useMutation } from "react-query";
import { login } from "../apis/auth";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function LoginCallbackPage() {
  const setUserInfo = useSetRecoilState<userLoginInfo>(userInfoState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [param, setParam] = useSearchParams();

  const loginMutation = useMutation(["userLogin"], (code: any) => login(code), {
    onSuccess: (data) => {
      console.log(data);
      setUserInfo(data);
      //   window.location.href = "/overview";
    },
    onError: () => {},
  });

  useEffect(() => {
    const code = {
      code: param.get("code"),
    };
    loginMutation.mutate(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}
