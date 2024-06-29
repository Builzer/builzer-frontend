import { useQuery } from 'react-query'
import { getSpecList } from '../../../apis/overview'
import { message, Button, Popconfirm, PopconfirmProps, Radio, RadioChangeEvent } from 'antd'
import { useEffect } from 'react'
import CreditImg from '../../../assets/images/Credit.svg'

export default function SelectServerSpec({...props}) {
    const {projectBuildInfo, setProjectBuildInfo} = props

    const { data, isLoading } = useQuery({
        queryKey: ['getSpecList'],
        queryFn: () => getSpecList()

    })

    const handleServerSpec = (e: RadioChangeEvent) => {
        if (data) {
            const index = data.findIndex((item) => item.name === e.target.value)
            setProjectBuildInfo(() => ({
                ...projectBuildInfo,
                projectSpec: {
                    ...projectBuildInfo.projectSpec,
                    serverSpec: data[index]
                }
            }))
        }
    }

    const confirm: PopconfirmProps['onConfirm'] = () => {
        setProjectBuildInfo(() => ({
            ...projectBuildInfo,
            projectInfo: {
                ...projectBuildInfo.projectInfo,
                projectPlan: 'Pro'
            }
        }))
        message.success('업그레이드 완료')
    }

    useEffect(() => {
        if (data) {
            if (projectBuildInfo.projectSpec.serverSpec.name === '') {
                setProjectBuildInfo(() => ({
                    ...projectBuildInfo,
                    projectSpec: {
                        ...projectBuildInfo.projectSpec,
                        serverSpec: {
                            name: data[0].name,
                            cpu: data[0].vCPU,
                            memory: data[0].memory,
                            credit: data[0].credit,
                            cloudProvider: data[0].cloudProvider
                        }
                    }
                }))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, projectBuildInfo])

    if (!data || isLoading) return <></>

    return <div className='w-full relative'>
        <Radio.Group
                className='flex flex-col px-2'
                onChange={handleServerSpec}
                value={projectBuildInfo.projectSpec.serverSpec.name}
            >
                {data.map((spec, index) => (
                    <Radio value={spec.name} key={index} disabled={projectBuildInfo.projectInfo.projectPlan === 'Lite' && index !== 0 ? true : false}>
                        <div className='w-full p-2 flex flex-row justify-between text-2xl'>
                            <div className='font-bold w-[400px]'>{spec.name}</div>
                            <div className='w-[110px] text-right'>{spec.memory}</div>
                            <div className='w-[110px] text-right'>{spec.vCPU}</div>
                            {
                                spec.credit === 0 ?
                                (
                                    <div className='w-[100px]' />
                                )
                                :
                                (
                                    <div className='w-[100px] flex flex-row gap-2 justify-end'>
                                        <img src={CreditImg} alt='크레딧 이미지' className='w-8' />
                                        <div>{spec.credit}</div>
                                    </div>
                                )
                            }
                        </div>
                    </Radio>
                ))}
            </Radio.Group>
            {
                projectBuildInfo.projectInfo.projectPlan === 'Lite' ? 
                (
                    <div>
                        <div className='absolute z-10 top-[48px] w-[805px] h-[288px] bg-gray10 opacity-50 rounded-md'>
                        
                        </div>
                        <div className='absolute w-full top-40 z-20'>
                            <p className='font-bold text-2xl text-center'>PRO 전용</p>
                            <Popconfirm
                                title='PRO 버전으로 업그레이드'
                                description={<div className='w-[400px] mt-2'>PRO 버전으로 업그레이드 시 추가 서버 스펙 선택, 데이터베이스 설정이 가능합니다.<br /><p className='mt-4 font-medium'>⚠️ 추가 크레딧이 부과될 수 있습니다.</p ></div>}
                                onConfirm={confirm}
                                okText='업그레이드'
                                cancelText='취소'
                            >
                                <Button className='ml-[41%] bg-black mt-2' type='primary'>PRO로 업그레이드</Button>
                            </Popconfirm>
                        </div>
                    </div>
                )
                :
                (
                    <></>
                )
            }
        </div>
}