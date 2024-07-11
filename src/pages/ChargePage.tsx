import { BrowserView } from "react-device-detect";
import BgImage from "../assets/images/Background.svg";
import CreditImg from "../assets/images/Credit.svg";
import { useRecoilValue } from "recoil";
import { userLoginInfo } from "../types/common";
import { userInfoState } from "../recoil/atoms/common";
import { Button, ConfigProvider, InputNumber, InputNumberProps } from "antd";
import { useState } from "react";
import { valueType } from "antd/es/statistic/utils";

export default function ChargePage() {
  const userInfo = useRecoilValue<userLoginInfo>(userInfoState);
  const [selectedAmount, setSelectedAmount] = useState<string>("5");
  const [etcValue, setEtcValue] = useState<valueType | null>();

  const creditAmount = ["5", "10", "20", "30", "40", "50", "기타"];

  const handleEtcValue: InputNumberProps["onChange"] = (value) => {
    setEtcValue(value);
  };

  return (
    <div>
      <BrowserView>
        <div className="relative w-full h-[620px] flex flex-row gap-5">
          <img src={BgImage} alt="배경 이미지" className="absolute bottom-0" />
          <div className="relative z-20 ml-40 pt-5 w-full h-full px-10 overflow-auto">
            <p className="text-3xl font-bold">크레딧 충전</p>
            <div className="w-full flex flex-row gap-5 mt-3">
              <div className="w-1/2 h-[520px] border-[1px] border-gray1 bg-white p-2">
                <p className="text-2xl font-bold">일반 충전</p>
                <div className="mt-3 flex flex-row gap-2">
                  <p>보유 크레딧</p>
                  <img src={CreditImg} alt="크레딧 이미지" className="w-6" />
                  <p className="font-bold">{userInfo.totalCredit}</p>
                </div>
                <div className="mt-3">
                  <p>충전금액</p>
                  <div className="flex flex-row flex-wrap gap-5 mt-3">
                    {creditAmount.map((amount, index) => (
                      <div
                        key={index}
                        className={`cursor-pointer flex flex-row gap-2 px-2 py-3 border-[1px] border-gray1 ${
                          amount === "기타" ? "w-[210px]" : "w-24"
                        } ${
                          selectedAmount === amount ? "bg-black text-white" : ""
                        }`}
                        onClick={() => setSelectedAmount(amount)}
                      >
                        <img
                          src={CreditImg}
                          alt="크레딧 이미지"
                          className="w-6"
                        />
                        {amount === "기타" ? (
                          <ConfigProvider
                            theme={{
                              token: {
                                colorPrimary:
                                  selectedAmount === "기타"
                                    ? "#000000"
                                    : "#666666",
                                colorBgBase:
                                  selectedAmount === "기타"
                                    ? "#000000"
                                    : "#FFFFFF",
                                colorTextPlaceholder:
                                  selectedAmount === "기타"
                                    ? "#999999"
                                    : "#666666",
                                colorTextBase:
                                  selectedAmount === "기타"
                                    ? "#FFFFFF"
                                    : "#000000",
                              },
                            }}
                          >
                            <InputNumber
                              placeholder={amount}
                              value={etcValue}
                              size="small"
                              className={`w-full ${
                                selectedAmount === "기타" ? "text-white" : ""
                              }`}
                              onChange={handleEtcValue}
                            />
                          </ConfigProvider>
                        ) : (
                          <p>{amount}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <p>결제방식</p>
                  <div className="h-20">결제방식 선택</div>
                </div>
                <div className="mt-3">
                  <p>총 결제금액</p>
                  <p className="font-bold text-xl">
                    {selectedAmount === "기타"
                      ? etcValue && !!etcValue
                        ? (Number(etcValue) * 1000).toLocaleString()
                        : 0
                      : (Number(selectedAmount) * 1000).toLocaleString()}
                    원
                  </p>
                </div>
                <div className="mt-5">
                  <p className="font-thin text-sm text-center text-gray8">
                    주문 내역을 확인했으며, 정보 제공에 동의합니다.
                  </p>
                  <Button
                    type="primary"
                    className="w-full bg-black mt-2"
                    size="large"
                  >
                    결제하기
                  </Button>
                </div>
              </div>
              <div className="w-1/2 h-[520px] border-[1px] border-gray1 bg-white p-2"></div>
            </div>
          </div>
        </div>
      </BrowserView>
    </div>
  );
}
