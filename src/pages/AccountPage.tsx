import { BrowserView } from "react-device-detect";
import { useRecoilValue } from "recoil";
import { userLoginInfo } from "../types/common";
import { userInfoState } from "../recoil/atoms/common";
import { Button } from "antd";
import PaymentList from "../components/payment/PaymentList";

export default function AccountPage() {
  const userInfo = useRecoilValue<userLoginInfo>(userInfoState);

  const profileBgList = [
    "from-amber-500 to-pink-500",
    "from-violet-200 to-pink-200",
    "from-teal-400 to-yellow-200",
    "from-indigo-400 to-cyan-400",
    "from-fuchsia-600 to-pink-600",
    "from-emerald-500 to-emerald-900",
    "from-slate-300 to-slate-500",
    "from-violet-600 to-blue-600",
    "from-blue-200 to-cyan-200",
    "from-fuchsia-500 to-cyan-500",
  ];

  return (
    <div>
      <BrowserView>
        <div className="w-full h-[620px] flex flex-row gap-5 p-2">
          <div className="ml-40 pt-5 w-full h-full px-10 overflow-auto">
            <p className="text-3xl font-bold">계정 설정</p>
            <div className="gap-3 pb-3 w-full border-b-[1px] border-gray1" />
            <div className="p-5">
              <div className="flex flex-row justify-between">
                <div className="flex flex-orow gap-3">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br cursor-pointer ${
                      profileBgList[userInfo.profileImage]
                    }`}
                  />
                  <p className="text-xl pt-2">{userInfo.gitEmail}</p>
                </div>
                <Button size="large">로그아웃</Button>
              </div>
              <div className="mt-10">
                <p className="text-2xl font-bold">결제 수단</p>
              </div>
              <div className="mt-10">
                <p className="text-2xl font-bold">결제내역 상세</p>
                <PaymentList />
              </div>
            </div>
          </div>
        </div>
      </BrowserView>
    </div>
  );
}
