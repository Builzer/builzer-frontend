import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'
import { projectInfoSimple } from '../../types/project'

const {persistAtom} = recoilPersist()

/**
 * 사용자 깃 계정 정보
 */
export const userGitNameState = atom({
    key: 'userGitNameState',
    default: 'indl1670',
    effects_UNSTABLE: [persistAtom]
})

/**
 * 선택된 프로젝트
 */
export const selectedProjectState = atom<projectInfoSimple>({
    key: 'selectedProjectState',
    default: {
        projectId: "",
        projectName: ""
    },
    effects_UNSTABLE: [persistAtom]
})