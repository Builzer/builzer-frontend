import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist();

/**
 * 헤더 메뉴
 */
export const headerMenuState = atom({
    key: "headerMenuState",
    default: 0,
    effects_UNSTABLE: [persistAtom]
})