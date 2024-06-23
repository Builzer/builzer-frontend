import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist()

/**
 * 선택된 프로젝트
 */
export const selectedProjectState = atom({
    key: 'selectedProjectState',
    default: '',
    effects_UNSTABLE: [persistAtom]
})