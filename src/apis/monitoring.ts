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

/**
 * CPU 그래프
 */
export const getCpuUsageGraph = async(projectId: number | undefined, unit: string, range: Array<string>) => {
    // const { data } = await authInstance.get(
    //     `/monitoring/vcpu/projects/${projectId}?unit=${unit}&startDate=${range[0]}&endDate=${range[1]}`
    // )

    const data = [
        {
            "time": "2024-06-03T12:00:00",
            "usage": 10
        },
        {
            "time": "2024-06-03T12:00:30",
            "usage": 19
        },
        {
            "time": "2024-06-03T12:01:00",
            "usage": 50
        },
        {
            "time": "2024-06-03T12:01:30",
            "usage": 40
        },
        {
            "time": "2024-06-03T12:02:00",
            "usage": 30
        }
    ]

    return data
}

/**
 * Memory 그래프
 */
export const getMemoryUsageGraph = async(projectId: number | undefined, unit: string, range: Array<string>) => {
    // const { data } = await authInstance.get(
    //     `/monitoring/vcpu/projects/${projectId}?unit=${unit}&startDate=${range[0]}&endDate=${range[1]}`
    // )

    const data = [
        {
            "time": "2024-06-03T12:00:00",
            "usage": 10
        },
        {
            "time": "2024-06-03T12:00:30",
            "usage": 19
        },
        {
            "time": "2024-06-03T12:01:00",
            "usage": 50
        },
        {
            "time": "2024-06-03T12:01:30",
            "usage": 40
        },
        {
            "time": "2024-06-03T12:02:00",
            "usage": 30
        }
    ]

    return data
}