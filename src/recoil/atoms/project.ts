import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'
import { projectDefaultInfo } from '../../types/project'

const {persistAtom} = recoilPersist()

export const projectDefaultInfoState = atom<projectDefaultInfo>({
    key: 'projectDefaultInfoState',
    default: {
        gitRepository: '',
        projectPlan: '',
        projectSpecId: 0
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