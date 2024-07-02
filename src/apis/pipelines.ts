// import { authInstance } from './utils'

import pipelineList from '../json/getBuildList.json'

/**
 * 빌드 내역
 */
export const getPipelineList = async(projectId: number | undefined) => {
    // const { data } = await authInstance.get(
    //     `/logging/projects/${projectId}/logs/download`
    // )

    // return data

    const data = pipelineList

    return data
}