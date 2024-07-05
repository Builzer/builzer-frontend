// import { authInstance } from "./utils"

import notification from "../json/getNotificationSetting.json";
import { notificationSetting } from "../types/project";

/**
 * 알림 설정 정보 조회
 */
export const getNotificationSetting = async (projectId: number) => {
  // const { data } = await authInstance.get(
  //     `notification/settings/${projectId}`
  // )
  // return data

  const data = notification;
  return data;
};

/**
 * 알림 설정
 */
export const modifyNotificationSetting = async (
  notificationSetting: notificationSetting
) => {
  // const { data } = await authInstance.put(
  //     'notification/settings', notificationSetting
  // )

  // return data

  const data = {
    code: 200,
    message: "OK",
  };
  return data;
};
