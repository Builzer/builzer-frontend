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

/**
 * 프로젝트 중단
 */
export const stopProject = async (id: number) => {
  // const { data } = await authInstance.post(
  //   `/projects/${id}/cancel`
  // )
  // return data

  const data = {
    code: 201,
    message: "Created",
    data: [],
  };

  return data;
};

/**
 * 프로젝트 삭제
 */
export const deleteProject = async (id: number) => {
  // const { data } = await authInstance.delete(
  //   `/projects/${id}`
  // )
  // return data

  const data = {
    code: 200,
    message: "OK",
  };
  return data;
};

/**
 * 프로젝트 재개
 */
export const restartProject = async (id: number) => {
  // const { data } = await authInstance.post(
  //   `/projects/${id}/cancel`
  // )
  // return data

  const data = {
    code: 200,
    message: "OK",
    data: [],
  };

  return data;
};
