import CreditImg from "../../assets/images/Credit.svg";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userLoginInfo } from "../../types/common";
import { isLightModeState, userInfoState } from "../../recoil/atoms/common";
import { useState } from "react";
import {
  LogoutOutlined,
  DollarOutlined,
  SettingOutlined,
  WalletOutlined,
} from "@ant-design/icons";

export default function SignedHeader() {
  const userInfo = useRecoilValue<userLoginInfo>(userInfoState);
  const [isMenuShow, setIsMenuShow] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] =
    useRecoilState<boolean>(isLightModeState);

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
    <div className="relative">
      <div className="w-full flex justify-between">
        <div className="flex flex-row gap-5">
          <NavLink
            to="/overview"
            style={({ isActive }) =>
              isActive
                ? { fontFamily: "bold", fontColor: "black" }
                : { color: "#CCCCCC" }
            }
          >
            OVERVIEW
          </NavLink>
          <NavLink
            to="/management"
            style={({ isActive }) =>
              isActive
                ? { fontFamily: "bold", color: "black" }
                : { color: "#CCCCCC" }
            }
          >
            MANAGEMENT
          </NavLink>
          <NavLink
            to="/monitoring"
            style={({ isActive }) =>
              isActive
                ? { fontFamily: "bold", color: "black" }
                : { color: "#CCCCCC" }
            }
          >
            MONITORING
          </NavLink>
          <NavLink
            to="/pipelines"
            style={({ isActive }) =>
              isActive
                ? { fontFamily: "bold", color: "black" }
                : { color: "#CCCCCC" }
            }
          >
            PIPELINES
          </NavLink>
          <NavLink
            to="/settings"
            style={({ isActive }) =>
              isActive
                ? { fontFamily: "bold", color: "black" }
                : { color: "#CCCCCC" }
            }
          >
            SETTINGS
          </NavLink>
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-row gap-1">
            <img className="w-6" src={CreditImg} alt="크레딧 이미지" />
            <span className="mt-[1px]">{userInfo.totalCredit}</span>
          </div>
          <div className="ml-2">
            <Badge badgeContent=" " color="warning" variant="dot">
              <NotificationsIcon fontSize="medium" />
            </Badge>
          </div>
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-br cursor-pointer ${
              profileBgList[userInfo.profileImage]
            }`}
            onClick={() => setIsMenuShow((prev) => !prev)}
          />
        </div>
      </div>
      {isMenuShow && (
        <div className="w-[250px] h-[250px] font-light bg-white z-20 mt-1 rounded-md p-2 shadow-lg absolute top-7 right-0">
          <p className="p-1 border-b-[1px] border-gray1">{userInfo.gitEmail}</p>
          <div
            className="flex justify-between p-1 cursor-pointer mt-2 hover:bg-gray1"
            onClick={() => {
              setIsMenuShow(false);
              window.location.href = "account";
            }}
          >
            <p>계정 관리</p>
            <p>
              <SettingOutlined />
            </p>
          </div>

          <div
            className="flex justify-between p-1 cursor-pointer mt-2 hover:bg-gray1"
            onClick={() => {
              setIsMenuShow(false);
              window.location.href = "billings";
            }}
          >
            <p>크레딧 결제내역</p>
            <p>
              <WalletOutlined />
            </p>
          </div>
          <div
            className="flex justify-between p-1 cursor-pointer mt-2 hover:bg-gray1"
            onClick={() => {
              setIsMenuShow(false);
              window.location.href = "charge";
            }}
          >
            <p>크레딧 충전</p>
            <DollarOutlined />
          </div>
          <div className="flex justify-between p-1 cursor-pointer mt-2">
            <p>테마</p>
            <div className="flex flex-row mt-1 gap-2 float-right">
              <div
                className={`w-6 h-6 cursor-pointer rounded-full text-center text-[1rem] ${
                  isLightMode ? "bg-gray1" : ""
                }`}
                onClick={() => setIsLightMode(true)}
              >
                🔅
              </div>
              /
              <div
                className={`w-6 h-6 cursor-pointer rounded-full text-center text-[1rem] ${
                  isLightMode ? "" : "bg-gray1"
                }`}
                onClick={() => setIsLightMode(false)}
              >
                🌙
              </div>
            </div>
          </div>
          <div className="flex justify-between p-1 cursor-pointer mt-2 hover:bg-gray1">
            <p>로그아웃</p>
            <LogoutOutlined />
          </div>
        </div>
      )}
    </div>
  );
}
