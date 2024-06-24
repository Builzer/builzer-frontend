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
    languageSpec: string
    buildTools: string
    serverSpec: string
    dbSpec: string | null
}