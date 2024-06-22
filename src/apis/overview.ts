// import { authInstance } from './utils'

import projectList from '../json/getProjectList.json'

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