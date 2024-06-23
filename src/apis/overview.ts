// import { authInstance } from './utils'

import projectList from '../json/getProjectList.json'
import projectInfo from '../json/getProjectDetail.json'
import collaborators from '../json/getCollaborators.json'

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