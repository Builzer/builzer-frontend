import { DownloadOutlined, InfoCircleFilled } from '@ant-design/icons'
import { useMutation } from 'react-query'
import { getLogFile, searchLogs } from '../../apis/monitoring'
import { Button, Input, Popconfirm, PopconfirmProps, Select, Tooltip, message } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SearchProps } from 'antd/es/input/Search'


export default function MonitoringLog({...props}) {
    const {project, projectId} = props
    const { Search } = Input

    const scrollRef = useRef<HTMLDivElement | null>(null)
    const [arrow, setArrow] = useState('Show')
    const [level, setLevel] = useState<string>()
    const [searchText, setSearchText] = useState<string>()

    const onSearch: SearchProps['onSearch'] = (value) => {
        setSearchText(value)
        const props = {
            word: value,
            level: level
        }
        searchLogMutation.mutate(props)
    }

    const items = [
        {
            value: undefined,
            label: '전체'
        },
        {
            value: 'INFO',
            label: 'INFO'
        },
        {
            value: 'WARNING',
            label: 'WARNING'
        },
        {
            value: 'ERROR',
            label: 'ERROR'
        }
    ]

    

    const handleLevel = (value: string) => {
        setLevel(value)
        const props = {
            word: searchText,
            level: value
        }
        searchLogMutation.mutate(props)

    }

    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            setArrow('Hide')
        return false
        }

        if (arrow === 'Show') {
            setArrow('Show')
            return true
        }

        return {
        pointAtCenter: true,
        }
    }, [arrow])

    const downloadMutation = useMutation(
        ['getLogFile'],
        () => getLogFile(projectId),
        {
            onSuccess: async (data) => {
                // // URL로 다운로드
                // const response = await fetch(data.url)
                // const arrayBuffer = await response.arrayBuffer()
                // const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' })
                // const blobUrl = URL.createObjectURL(blob)
                // const a = document.createElement('a')
                // a.href = blobUrl
                // a.style.display = 'none'
                // if (data.name && data.name.length) {
                //     a.download = data.name
                // }

                // document.body.appendChild(a)
                // a.click()
                // a.remove()

                // 데이터 자체
                const element = document.createElement('a')
                const text = data.url
                element.setAttribute('href', 'data:text/plaincharset=utf-8,' + encodeURIComponent(text))
                element.setAttribute('download', data.name)
                element.style.display = 'none'
                document.body.appendChild(element)
                element.click()
                element.remove()
            },
            onError: () => {

            }
        }
    )

    const searchLogMutation = useMutation(
        ['searchLog'],
        (props: any) => searchLogs(projectId, props), {
            onSuccess: () => {

            },
            onError: () => {

            }
        }
    )
    const handleDownload = () => {
        downloadMutation.mutate()
    }

    // TODO: 프로젝트 업그레이드 처리
    const confirm: PopconfirmProps['onConfirm'] = () => {
        message.success('업그레이드 완료')
    }


    useEffect(() => {
        const tmpLog = {
            version:'1',
            timestamp: '2024-06-03T12:00:10',
            level: 'INFO',
            message: 'logging error',
            loggerName: 'com/builzer/backend/BackendApplicationTests.kt'
        }

        let index = 0
        const stateIntervalId = setInterval(() => {
            index++

            if (index === 4) {
                clearTimeout(stateIntervalId)
            }
        }, 5000)

        const scriptIntervalId = setInterval(() => {
            let contentParent = document.getElementById('log-script')
            const newScript = document.createElement('p')
            newScript.innerText = `[${tmpLog.level}] ${tmpLog.message} ${tmpLog.loggerName}  ${tmpLog.timestamp}`

            contentParent?.appendChild(newScript)
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
            if (index === 4) {
                clearTimeout(scriptIntervalId)
            }
        }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div className='w-full h-full px-10 overflow-auto'>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-3'>
                <span className='text-3xl font-bold'>로그</span>
                <span className='mt-3 cursor-pointer'>
                    <Tooltip placement='bottom' title={<p className='font-thin'>Pro버전 이용 시 <span className='font-regular text-[1.1rem]'>'실시간 로그'</span>를 확인할 수 있습니다.</p>} arrow={mergedArrow}>
                        <InfoCircleFilled style={{ fontSize: 15 }} />
                    </Tooltip>
                </span>
            </div>
            {
                project.projectInfo.projectPlan === 'Lite' ?
                (<Popconfirm
                    title='PRO 버전으로 업그레이드'
                    description={<div className='w-[400px] mt-2'>PRO 버전으로 업그레이드 시 추가 서버 스펙 선택, 데이터베이스 설정이 가능합니다.<br /><p className='mt-4 font-medium'>⚠️ 추가 크레딧이 부과될 수 있습니다.</p ></div>}
                    onConfirm={confirm}
                    okText='업그레이드'
                    cancelText='취소'
                >
                    <Button className='ml-[41%] bg-black mt-2' size='large' type='primary'>PRO로 업그레이드</Button>
                </Popconfirm>)
                :
                (<></>)
            }
        </div>
        
        <div className='flex flex-row gap-3 justify-end pb-3 border-b-[1px] border-gray1' />
        <div className='p-5'>
        {
            project.projectInfo.projectPlan === 'Lite' ?
            (<></>)
            :
            (<div className='w-full flex flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                    <div className='w-2/3'>
                        <Search className='w-full' allowClear placeholder='🔎 검색어를 입력하세요' onSearch={onSearch} />
                    </div>
                    <div className='w-1/3'>
                        <Select className='w-full' defaultValue='필터' options={items} onChange={handleLevel}/>
                    </div>
                </div>
                <div ref={scrollRef} id='log-script' className='h-[400px] overflow-y-auto scrollbar-hide text-[0.8rem] font-thin bg-gray10 text-white px-2'></div>
            </div>)
        }
            <p className='mt-5'>
                <span className='text-2xl cursor-pointer hover:border-b-4 border-gray5' onClick={handleDownload}><DownloadOutlined /><span className='ml-5'>로그 다운로드</span></span> 
            </p>
        </div>
    </div>
}