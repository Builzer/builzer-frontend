import { useMutation, useQuery } from "react-query";
import {
  getNotificationSetting,
  modifyNotificationSetting,
} from "../../apis/setting";
import {
  Button,
  Checkbox,
  CheckboxProps,
  InputNumber,
  InputNumberProps,
  notification,
} from "antd";
import { notificationSetting } from "../../types/project";
import { useEffect, useState } from "react";

export default function ProjectNotification({ ...props }) {
  const { projectSpecId, project } = props;
  const [toast, contextHolder] = notification.useNotification();

  const [notificationSetting, setNotificationSetting] =
    useState<notificationSetting>({
      projectId: 0,
      isOtherDeployNotification: true,
      isServerErrorNotification: true,
      isUsageOverNotification: true,
      vcpuUsage: 10,
      memUsage: 20,
      isCreditUsageNotification: true,
      isPaymentNotification: true,
    });

  const { data, isLoading } = useQuery({
    queryKey: ["getNotificationSetting", projectSpecId],
    queryFn: () => getNotificationSetting(projectSpecId),
  });

  const handlePaymentNoti: CheckboxProps["onChange"] = (e) => {
    setNotificationSetting((prev) => ({
      ...prev,
      isPaymentNotification: e.target.checked,
    }));
  };

  const handleDeployDoneNoti: CheckboxProps["onChange"] = (e) => {
    setNotificationSetting((prev) => ({
      ...prev,
      isOtherDeployNotification: e.target.checked,
    }));
  };

  const handleDeployErrorNoti: CheckboxProps["onChange"] = (e) => {
    setNotificationSetting((prev) => ({
      ...prev,
      isServerErrorNotification: e.target.checked,
    }));
  };

  const handleCreditNoti: CheckboxProps["onChange"] = (e) => {
    setNotificationSetting((prev) => ({
      ...prev,
      isCreditUsageNotification: e.target.checked,
    }));
  };

  const handleUsageNoti: CheckboxProps["onChange"] = (e) => {
    setNotificationSetting((prev) => ({
      ...prev,
      isUsageOverNotification: e.target.checked,
    }));
  };

  const handleCpuUsage: InputNumberProps["onChange"] = (value) => {
    if (value !== null) {
      setNotificationSetting((prev) => ({
        ...prev,
        vcpuUsage: Number(value),
      }));
    }
  };

  const handleMemUsage: InputNumberProps["onChange"] = (value) => {
    if (value !== null) {
      setNotificationSetting((prev) => ({
        ...prev,
        memUsage: Number(value),
      }));
    }
  };

  const saveNotification = useMutation(
    ["saveNotificationSetting"],
    () => modifyNotificationSetting(notificationSetting),
    {
      onSuccess: () => {
        toast["success"]({
          message: "설정 정보가 저장되었습니다.",
        });
      },
      onError: () => {
        toast["error"]({
          message: "오류가 발생했습니다. 잠시후 다시 시도해주세요.",
        });
      },
    }
  );
  useEffect(() => {
    if (data) {
      setNotificationSetting(data);
    }
  }, [data]);

  if (!data || isLoading || !notificationSetting) return <></>;

  return (
    <div className="w-full h-full px-10 overflow-auto">
      {contextHolder}
      <p className="text-3xl font-bold">프로젝트 알림</p>
      <div className="flex flex-row gap-3 justify-end pb-3 border-b-[1px] border-gray1" />
      <div className="flex flex-col gap-8 p-5">
        <Checkbox
          disabled={project.projectInfo.authority === "owner" ? false : true}
          checked={notificationSetting.isPaymentNotification}
          onChange={handlePaymentNoti}
        >
          결제 예정일 알림
        </Checkbox>
        <Checkbox
          checked={notificationSetting.isOtherDeployNotification}
          onChange={handleDeployDoneNoti}
        >
          배포 완료 알림(본인 제외)
        </Checkbox>
        <Checkbox
          checked={notificationSetting.isServerErrorNotification}
          onChange={handleDeployErrorNoti}
        >
          배포 오류 알림
        </Checkbox>
        <div>
          <Checkbox
            checked={notificationSetting.isUsageOverNotification}
            onChange={handleUsageNoti}
          >
            사용량 초과 알림
          </Checkbox>
          <div className="flex flex-row gap-5 pt-3">
            <div>
              <p className="text-sm text-gray8 pb-2">CPU</p>
              <InputNumber
                disabled={
                  notificationSetting.isUsageOverNotification ? false : true
                }
                value={notificationSetting.vcpuUsage}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace("%", "") as unknown as number}
                onChange={handleCpuUsage}
              />
            </div>
            <div>
              <p className="text-sm text-gray8 pb-2">MEMORY</p>
              <InputNumber
                disabled={
                  notificationSetting.isUsageOverNotification ? false : true
                }
                value={notificationSetting.memUsage}
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace("%", "") as unknown as number}
                onChange={handleMemUsage}
              />
            </div>
          </div>
        </div>
        <Checkbox
          checked={notificationSetting.isCreditUsageNotification}
          onChange={handleCreditNoti}
        >
          크레딧 결제 완료 알림
        </Checkbox>
      </div>
      <div className="relative">
        <Button
          size="large"
          className="bg-black absolute left-80"
          type="primary"
          onClick={() => saveNotification.mutate()}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
