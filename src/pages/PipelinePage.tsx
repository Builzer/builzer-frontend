import { BrowserView } from 'react-device-detect'
import { useRecoilValue } from 'recoil'
import { projectInfoSimple } from '../types/project'
import { selectedProjectState } from '../recoil/atoms/common'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getPipelineList } from '../apis/pipelines'
import { CalendarOutlined, CheckCircleFilled, ClockCircleOutlined, CloseCircleFilled, LoadingOutlined, PauseCircleFilled, PlayCircleFilled, SmileOutlined } from '@ant-design/icons'
import { Button, Pagination, PaginationProps } from 'antd'

export default function PipelinePage() {
    const selectedProject = useRecoilValue<projectInfoSimple>(selectedProjectState)
    const [current, setCurrent] = useState(0)

    const { data, isLoading } = useQuery({
        queryKey: ['getPipelineList', selectedProject.projectId],
        queryFn: () => getPipelineList(selectedProject.projectId)
    })

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page)
    }

    useEffect(() => {
        if (!selectedProject.projectId) {
            alert('관리할 프로젝트를 선택해주세요')
            window.location.href = '/overview'
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!data || isLoading || !selectedProject.projectId) return <></>

    return <div>
        <BrowserView>
            <div className='w-full h-[620px] p-3 flex flex-col gap-3'>
                <div className='w-full min-h-[520px] mt-10'>
                    {
                        data.map((item, index) => (
                            <div key={index} className='w-full flex flex-row gap-3 px-3 py-2 border-[1px] border-gray1'>
                                <div className='mt-2'>
                                    {
                                        item.status === 'ing' ?
                                        (<LoadingOutlined style={{ fontSize: 30 }} />)
                                        :
                                        item.status === 'success' ?
                                        (<CheckCircleFilled className='text-green' style={{ fontSize: 30 }} />)
                                        :
                                        (<CloseCircleFilled className='text-red' style={{ fontSize: 30 }} />)
                                    }
                                </div>
                                <div className='w-[700px]'>
                                    <p className='font-bold text-lg'>{item.lastCommit}</p>
                                    <p className='truncate ... w-full font-thin text-gray8 text-[0.8rem]'>{item.commitInfo + item.commitInfo + item.commitInfo}</p>
                                </div>
                                <div>
                                    <Button className='mt-3' size='small' disabled>{item.branch}</Button>
                                </div>
                                <p className='w-[130px] mt-3 font-thin text-center truncate ...'>
                                    <span className='mt-1 mr-2'><SmileOutlined /></span>{item.executor}
                                </p>
                                <div className='font-thin w-[100px]'>
                                    <p><span className='mt-1 mr-2'><CalendarOutlined /></span>{item.date}</p>
                                    <p><span className='mt-1 mr-2'><ClockCircleOutlined /></span>{item.buildTime}</p>
                                </div>
                                <div className='flex flex-row gap-2 mt-2'>
                                    <p><PlayCircleFilled className={`${item.status === 'ing' ? 'text-gray5' : 'text-gray10 hover:text-black cursor-pointer'}`} style={{ fontSize: 30 }} /></p>
                                    <p><PauseCircleFilled className='text-gray10 hover:text-black cursor-pointer' style={{ fontSize: 30 }} /></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-full text-center'>
                <Pagination defaultPageSize={8} current={current} onChange={onChange} total={50} />
                </div>
            </div>
        </BrowserView>
    </div>
}