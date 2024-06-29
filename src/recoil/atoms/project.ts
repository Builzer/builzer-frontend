import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'
import { projectDefaultInfo } from '../../types/project'
import { selectItem } from '../../types/common'

const {persistAtom} = recoilPersist()

export const projectDefaultInfoState = atom<projectDefaultInfo>({
    key: 'projectDefaultInfoState',
    default: {
        gitRepository: '',
        projectPlan: '',
        projectSpecId: undefined
    },
    effects_UNSTABLE: [persistAtom]
})

// 신규 프로젝트 배포 정보
export const projectBuildState = atom({
    key: 'projectBuildInfoState',
    default: {
        projectInfo: {
            projectName: '',
            projectPlan: '',
            domain: '',
            gitRepository: ''
        },
        projectSpec: {
            branch: '',
            rootPath: '',
            buildTools: '',
            language: {
                type: '',
                version: '',
                provider: ''
            },
            serverSpec: {
                name: '',
                cpu: '',
                memory: '',
                cloudProvider: '',
                credit: 0
            },
            dbSpec: {
                dbType: '',
                dbVersion: '',
                dbId: '',
                dbPw: ''
            },
            isRunTest: true,
            envList: []
        }
    },
    effects_UNSTABLE: [persistAtom]
})

/**
 * 신규 프로젝트 팀원
 */
export const projectCollaboratorsState = atom<Array<selectItem>>({
    key: 'projectCollaboratorsState',
    default: [],
    effects_UNSTABLE: [persistAtom]
})