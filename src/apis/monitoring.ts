// import { authInstance } from './utils'

/**
 * 로그 파일 다운로드
 */
export const getLogFile = async(projectId: number | undefined) => {
    // const { data } = await authInstance.get(
    //     `/logging/projects/${projectId}/logs/download`
    // )

    // return data

    const data = {
        url: 'https://www.log-url.com',
        name: '2024-07-01'
    }

    return data
}

/**
 * 실시간 로그 출력
 */
export const getLogScripts = async(projectId: number | undefined) => {
    // const { data } = await authInstance.get(
    //     `/logging/projects/${projectId}/logs/print`
    // )

    // return data

    const data = ''

    return data
}

/**
 * 로그 검색
 */
export const searchLogs = async(projectId: number | undefined, props: any) => {
    // const { data } = await authInstance.get(
    //     `/logging/projects/${projectId}/logs/search?level=${props.level}&word={props.value}`
    // )

    // return data

    const data = ''

    return data
}