// import { authInstance } from './utils'

import projectList from '../json/getProjectList.json'
import projectInfo from '../json/getProjectDetail.json'
import collaborators from '../json/getCollaborators.json'
import organizations from '../json/getGitOrganizations.json'
import repositoryList from '../json/getGitRepositoryList.json'
import recentSettingList from '../json/getProjectRecentSettings.json'
import gitBranchList from '../json/getBranchList.json'
import gitFolderList from '../json/getFolderList.json'
import languageList from '../json/getLanguageList.json'
import specList from '../json/getSpecList.json'
import dbList from '../json/getDatabaseList.json'
import { projectBuildInfo } from '../types/project'

/**
 * 본인이 속한 프로잭트 정보
 */
export const getProjectList = async() => {
    // const { data } = await authInstance.get(
    //     '/project'
    // )

    const data = projectList
    return data
}

/**
 * 프로젝트 정보 상세
 */
export const getProjectDetailInfo = async(id: number | undefined) => {
    if (id) {
        // const { data } = await authInstance.get(
        //     `/projects/${id}`
        // )

        // return data
        const data = projectInfo
        return data
    } else {
        return null
    }
}

/**
 * 프로젝트 공동작업자
 */
export const getProjectCollaborators = async(id: string) => {
    // const { data } = await authInstance.get(
    //     `/${id}/members`
    // )

    const data = collaborators
    return data
}

/**
 * 깃허브 조직
 */
export const getGitOrganizations = async() => {
    // const { data } = await authInstance.get(
    //     '/projects/repos'
    // )

    const data = organizations
    return data
}

/**
 * 레포지토리 목록
 */
export const getGitRepositoryList = async(orgName: string, per: number, page: number) => {
    // const { data } = await authInstance.get(
    //     `/projects/repos?possession=${orgName}&per=${per}&page=${page}`
    // )

    const data = repositoryList
    return data
}

/**
 * 플랜 정보(서버 스펙 + 최근 세팅)
 */
export const getProjectRecentSettings = async() => {
    // const { data } = await authInstance.get(
    //     '/projects/settings'
    // )

    const data = recentSettingList
    return data
}

/**
 * 깃 브랜치 목록
 */
export const getGitBranchList = async(repoNm: string) => {
    // const { data } = await authInstance.get(
    //     `/projects/${repoNm}/branches`
    // )

    const data = gitBranchList
    return data
}

/**
 * 깃 레포 폴더 목록
 */
export const getGitFolderList = async(repoNm: string, value: string) => {
    // const { data } = await authInstance.get(
    //     `/projects/${repoNm}/folders/${value}`
    // )

    const data = gitFolderList
    return data
}

/**
 * 도메인 유효성 체크
 */
export const checkProjectDomain = async(domain: string) => {
    // return await authInstance.get(
    //     `/projects/check-domain?domainName=${domain}`
    // )

    if (domain === 'duplicate') {
        return {
            code: 409,
            message: 'Conflict',
            data: 'Duplicated Domain URL'
        }
    } else if (domain === 'fail') {
        return {
            code: 400,
            message: 'Bad Request',
            data: 'Unavailable Domain URL'
        }
    } else {
        return {
            code: 200,
            message: 'OK',
            data: 'Available Domain URL'
        }
    }
}

/**
 * 지원 언어 목록
 */
export const getLanguageList = async() => {
    // const { data } = await authInstance.get(
    //     'projects/languages'
    // )

    // return data

    const data = languageList
    return data
}
/**
 * 지원 스펙 목록
 */
export const getSpecList = async() => {
    // const { data } = await authInstance.get(
    //     'projects/languages'
    // )

    // return data

    const data = specList
    return data
}

/**
 * 지원 DB 목록
 */
export const getDatabaseList = async() => {
    // const { data } = await authInstance.get(
    //     'projects/languages'
    // )

    // return data

    const data = dbList
    return data
}

/**
 * 팀원 초대
 */
export const inviteCollaborators = async(projectId: number, list: Array<string>) => {
    // const { data } = await authInstance.post(
    //     `/projects/${projectId}/invitation`,
    //     {
    //         memberEmails: list
    //     }
    // )

    // return data

    const data = {
        code: 200,
        message: 'Success',
        data: 1
    }

    return data
}

/**
 * 신규 배포 시작
 */
export const startDeploy = async(projectInfo: projectBuildInfo) => {
    // const { data } = await authInstance.post(
    //     '/projects/runs', projectInfo
    // )

    // return data

    const data = {
        code: 201,
        message: 'Created',
        data: 2
    }

    return data
}