import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { projectInfoSimple } from "../../types/project";
import { userLoginInfo } from "../../types/common";

const { persistAtom } = recoilPersist();

/**
 * 사용자 깃 계정 정보
 */
export const userGitNameState = atom({
  key: "userGitNameState",
  default: "indl1670",
  effects_UNSTABLE: [persistAtom],
});

/**
 * 선택된 프로젝트
 */
export const selectedProjectState = atom<projectInfoSimple>({
  key: "selectedProjectState",
  default: {
    projectSpecId: undefined,
    projectName: "",
  },
  effects_UNSTABLE: [persistAtom],
});

/**
 * 사용자 계정 정보
 */
export const userInfoState = atom<userLoginInfo>({
  key: "userInfoState",
  default: {
    gitEmail: "",
    profileImage: 0,
    name: "",
    totalCredit: 0,
    isInvited: false,
  },
  effects_UNSTABLE: [persistAtom],
});

/**
 * 테마
 */
export const isLightModeState = atom({
  key: "isLightModeState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
