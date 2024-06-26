import { useQuery } from 'react-query'
import { getProjectRecentSettings } from '../../../apis/overview'
import { useState } from 'react'
import { projectDefaultInfo, recentSettingInfo } from '../../../types/project'
import PlanBg from '../../../assets/images/overview/PlanBg.svg'
import CreditImg from '../../../assets/images/Credit.svg'
import { Button, Empty, notification } from 'antd'
import { useRecoilState } from 'recoil'
import { projectDefaultInfoState } from '../../../recoil/atoms/project'
import { useNavigate } from 'react-router-dom'

export default function SelectProjectTemplate() {
    const [plan, setPlan] = useState<string>('')
    const [projectSpecId, setProjectSpecId] = useState<number>()
    const [setting, setSetting] = useState<recentSettingInfo>()
    const [projectDefaultInfo, setProjectDefaultInfo] = useRecoilState<projectDefaultInfo>(projectDefaultInfoState)
    const [toast, contextHolder] = notification.useNotification()
    const navigate = useNavigate()

    const { data, isLoading } = useQuery({
        queryKey: ['getProjectRecentSettings'],
        queryFn: () => getProjectRecentSettings()
    })

    const handlePlan = (plan: string) => {
        setPlan(plan)
        setProjectDefaultInfo((prev) => ({
            ...prev,
            projectPlan: plan
        }))
    }
    const handleRecentSetting = (item: recentSettingInfo) => {
        setProjectSpecId(item.projectSpecId)
        setSetting(item)
        setProjectDefaultInfo((prev) => ({
            ...prev,
            projectSpecId: item.projectSpecId
        }))
    }

    const handleGoProjectSetting = () => {
        if (projectDefaultInfo.gitRepository === '') {
            toast['warning']({
                message: '깃 레포를 선택해주세요.',
            })
        } else if (setting || projectDefaultInfo.projectPlan === '') {
            toast['warning']({
                message: '프로젝트 플랜을 선택해주세요.',
            })
        } else {
            navigate('/overview/setting')
        }
    }

    if (!data || isLoading) return <></>

    return <div className='w-full h-full p-2'>
        {contextHolder}
        <div>
            <p className='text-xl font-bold'>플랜</p>
            <div className='flex flex-row gap-3 mt-2'>
                <div className={`w-1/2 rounded-md relative cursor-pointer ${plan === 'Lite' ? 'border-2 border-black' : 'shadow-lg'}`} onClick={() => handlePlan(data[0].plan.planName)}>
                    <img className='m-auto mt-2' src={PlanBg} alt='플랜 배경' />
                    <p className='absolute font-bold text-3xl top-8 left-[46%] text-white'>L</p>
                    <p className='text-center mt-2 text-xl font-medium'>LITE</p>
                    <p className='px-2 mt-1 font-light'>{data[0].plan.planExplain}</p>
                    <div className='flex flex-row gap-2 float-right p-3'>
                        <img className='w-6' src={CreditImg} alt='크레딧 이미지' />
                        <p className='text-xl'>{data[0].plan.planPrice}</p>
                    </div>
                </div>
                <div className={`w-1/2 rounded-md relative cursor-pointer ${plan === 'Pro' ? 'border-2 border-black' : 'shadow-lg'}`} onClick={() => handlePlan(data[1].plan.planName)}>
                    <img className='m-auto mt-2' src={PlanBg} alt='플랜 배경' />
                    <p className='absolute font-bold text-3xl top-8 left-[46%] text-white'>P</p>
                    <p className='text-center mt-2 text-xl font-medium'>PRO</p>
                    <p className='px-2 mt-1 font-light'>{data[1].plan.planExplain}</p>
                    <div className='flex flex-row gap-2 float-right p-3'>
                        <img className='w-6' src={CreditImg} alt='크레딧 이미지' />
                        <p className='text-xl'>{data[1].plan.planPrice}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-5'>
            <p className='text-xl font-bold'>최근 세팅</p>
            <div className='w-full p-2 my-2 rounded-md border-[1px] border-gray1 overflow-x-auto'>
                {
                    plan === 'Lite' ? (
                        <div className='flex flex-row gap-2'>
                            {
                                data[0].setting.map((item, index) => (
                                    <div key={index} className={`w-[200px] h-[133px] p-2 rounded-md cursor-pointer ${projectSpecId === item.projectSpecId ? 'border-2 border-black' : 'shadow-lg'}`} onClick={() => handleRecentSetting(item)}>
                                        <p className='w-[180px]'>Setting {index+1}</p>
                                        <div className='w-[180px] font-light text-sm mt-2'>
                                            <p>🌐{item.languageSpec}</p>
                                            <p>⚙️{item.buildTools}</p>
                                            <p>💻{item.serverSpec}</p>
                                            <br />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : plan === 'Pro' ? (
                        <div className='flex flex-row gap-2'>
                            {
                                data[1].setting.map((item, index) => (
                                    <div key={index} className={`w-[200px] h-[133px] p-2 rounded-md cursor-pointer ${projectSpecId === item.projectSpecId ? 'border-2 border-black' : 'shadow-lg'}`} onClick={() => handleRecentSetting(item)}>
                                        <p className='w-[180px]'>Setting {index+1}</p>
                                        <div className='w-[180px] font-light text-sm mt-2'>
                                            <p>🌐{item.languageSpec}</p>
                                            <p>⚙️{item.buildTools}</p>
                                            <p>💻{item.serverSpec}</p>
                                            <p>🐬{item.dbSpec}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className='h-[136px]'>
                            <Empty />
                        </div>
                    )
                }
            </div>
        </div>
        <Button className='w-full mt-2 bg-black' type='primary' onClick={() => handleGoProjectSetting()}>프로젝트 세팅 설정</Button>
    </div>
}