// import { authInstance } from './utils'

import projectList from '../json/getProjectList.json'
import projectInfo from '../json/getProjectDetail.json'
import collaborators from '../json/getCollaborators.json'
import organizations from '../json/getGitOrganizations.json'
import repositoryList from '../json/getGitRepositoryList.json'

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
export const getProjectDetailInfo = async(id: string) => {
    // const { data } = await authInstance.get(
    //     `/projects/${id}`
    // )

    const data = projectInfo
    return data
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