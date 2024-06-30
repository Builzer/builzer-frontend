import { BrowserView } from 'react-device-detect'
import BackgroundImg from '../../assets/images/Background.svg'
import DeployDoneImg from '../../assets/images/overview/DeployDone.svg'
import { LineChartOutlined, MergeOutlined, RightCircleOutlined, SettingOutlined } from '@ant-design/icons'

export default function OverviewDeployDonePage() {
    return <div>
        <BrowserView>
            <div className='w-full h-full'>
                <img className='rotate-180 -scale-x-100 absolute top-0' src={BackgroundImg} alt='배경 이미지' />
                <p className='absolute text-2xl top-3 left-40 text-white font-light'>배포 완료!</p>
                <div className='w-full flex flex-row p-5 gap-5'>
                    <div className='w-2/5 relative z-10 h-[500px] mt-20 border-[1px] border-gray1 rounded-lg bg-white p-5'>
                        <p className='font-bold text-xl pb-3 border-b-[1px] border-gray1'>배포 이후 단계</p>
                        <div className='mt-10 w-full flex flex-col gap-14'>
                            <div>
                                <div className='flex flex-row gap-5'>
                                    <div className='w-10 h-10 bg-black rounded-full'>
                                        <MergeOutlined className='rotate-180 mt-2 ml-[6px]' style={{ fontSize: 25, color: '#FFF' }}/>
                                    </div>
                                    <span className='mt-2 font-medium'>
                                        인스턴트 미리보기
                                    </span>
                                </div>
                                <p className='mt-4 font-thin text-gray8'>변경 사항을 미리 보려면 새 인스턴스를 누르세요</p>
                            </div>
                            <div>
                                <div className='flex flex-row gap-5'>
                                    <div className='w-10 h-10 bg-black rounded-full'>
                                        <SettingOutlined className='mt-2 ml-[7px]' style={{ fontSize: 25, color: '#FFF' }}/>
                                    </div>
                                    <div className='flex flex-row'>
                                        <span className='font-medium mt-2'>프로젝트 추가 관리</span>
                                        <RightCircleOutlined className='ml-5 mt-[2px] hover:text-gray8 cursor-pointer' style={{ fontSize: 18 }} onClick={() => window.location.href = '/management'} />
                                    </div>
                                </div>
                                <p className='mt-4 font-thin text-gray8'>프로젝트를 추가로 관리할 수 있어요</p>
                            </div>
                            <div>
                                <div className='flex flex-row gap-5'>
                                    <div className='w-10 h-10 bg-black rounded-full'>
                                        <LineChartOutlined className='mt-2 ml-[7px]' style={{ fontSize: 25, color: '#FFF' }}/>
                                    </div>
                                    <div className='flex flex-row'>
                                        <span className='font-medium mt-2'>프로젝트 모니터링</span>
                                        <RightCircleOutlined className='ml-5 mt-[2px] hover:text-gray8 cursor-pointer' style={{ fontSize: 18 }} onClick={() => window.location.href = '/monitoring'} />
                                    </div>
                                </div>
                                <p className='mt-4 font-thin text-gray8'>사용자가 사이트를 어떻게 경험하는지 확인할 수 있어요</p>
                            </div>
                        </div>
                    </div>
                    <img className='w-3/5 relative z-10 mt-32' src={DeployDoneImg} alt='배포완료 이미지' />
                </div>
            </div>
        </BrowserView>
    </div>
}