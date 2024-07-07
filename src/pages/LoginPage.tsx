import Login01 from "../assets/images/login/Login01.svg";
import CreditImg from "../assets/images/Credit.svg";
import { Button } from "antd";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useMutation } from "react-query";
import { login } from "../apis/auth";
import { useSetRecoilState } from "recoil";
import { userLoginInfo } from "../types/common";
import { userInfoState } from "../recoil/atoms/common";

export default function LoginPage() {
  const setUserInfo = useSetRecoilState<userLoginInfo>(userInfoState);

  const loginMutation = useMutation(["userLogin"], () => login(), {
    onSuccess: (data) => {
      console.log(data);
      setUserInfo(data);
      window.location.href = "/overview";
    },
    onError: () => {},
  });

  return (
    <div className="w-full h-full relative">
      <div className="w-[80%] mx-auto py-10">
        <div className="w-80 mx-auto text-center px-3 py-1 flex flex-row bg-gradient-to-r from-[#ABECD6] to-[#FBED96] rounded-lg">
          <p className="w-64 text-m font-bold mt-2">
            로그인하고 10크레딧 받아가세요
          </p>
          <img src={CreditImg} alt="크레딧 이미지" className="w-10" />
        </div>
        <p className="text-center font-extrabold text-3xl my-5">
          Login to Builzer
        </p>
        <div className="w-80 mx-auto my-5">
          <Button
            type="primary"
            className="w-full h-12 font-bold text-xl bg-black"
            onClick={() => loginMutation.mutate()}
          >
            <GitHubIcon className="ml-1" />
            Continue With Github
          </Button>
        </div>
        <img src={Login01} alt="로그인 이미지" className="mt-20" />
      </div>
    </div>
  );
}
