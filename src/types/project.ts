export interface projectInfoSimple {
    projectId: string
    projectName: string
}
export interface projectList {
    authority: string
    createdAt: string
    lastBuild: string
    projectName: string
    projectPlan: string
    projectStatus: string
    projectId: string
}

export interface repositoryList {
    repoName: string
    isPrivate: boolean
    projectType: string
    updatedAt: string
}

export interface planInfo {
    planName: string
    planExplain: string
    planPrice: number
}

export interface recentSettingInfo {
    projectSpecId: number
    languageSpec: string
    buildTools: string
    serverSpec: string
    dbSpec: string | null
}

export interface projectDefaultInfo {
    gitRepository: string
    projectPlan: string
    projectSpecId: number
}

export interface projectBuildInfo {
    projectInfo: {
        projectName: string,
        projectPlan: string,
        domain: string,
        gitRepository: string
    },
    projectSpec: {
        branch: string,
        rootPath: string,
        buildTools: string,
        language: {
            type: string,
            version: string,
            provider: string
        },
        serverSpec: {
            name: string,
            cpu: string,
            memory: string,
            cloudProvider: string,
            credit: number
        },
        dbSpec: {
            dbType: string,
            dbVersion: string,
            dbId: string,
            dbPw: string
        },
        isRunTest: boolean,
        envList: Array<any>
    }
}