import { InfoCircleFilled } from '@ant-design/icons'
import { Button, Popconfirm, PopconfirmProps, Tooltip, message } from 'antd'
import { useMemo, useState } from 'react'
import CpuGraph from './item/CpuGraph'
import MemoryGraph from './item/MemoryGraph'

export default function MonitoringGraph({...props}) {
    const {project, projectId} = props
    const [arrow, setArrow] = useState('Show')

    // TODO: 프로젝트 업그레이드 처리
    const confirm: PopconfirmProps['onConfirm'] = () => {
        message.success('업그레이드 완료')
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

    return <div className='w-full h-full px-10 overflow-auto scrollbar-hide'>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-row gap-3'>
                <span className='text-3xl font-bold'>사용량 그래프</span>
                <span className='mt-3 cursor-pointer'>
                    <Tooltip placement='bottom' title={<p className='font-thin'>Pro버전 이용 시 <span className='font-regular text-[1.1rem]'>'커스텀 세팅'</span>을 설정할 수 있습니다.</p>} arrow={mergedArrow}>
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
        <div className='p-5 flex flex-col gap-3'>
            <div className='w-full h-[400px] border-[1px] border-gray1'>
                <CpuGraph project={project} projectId={projectId} />
            </div>
            <div className='w-full h-[400px] border-[1px] border-gray1'>
                <MemoryGraph project={project} projectId={projectId} />
            </div>
        </div>
    </div>
}