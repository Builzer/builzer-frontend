import { Button, ConfigProvider } from 'antd'
import Logo from '../../../assets/images/Logo.svg'
import AutoTyping from '../../../assets/images/AutoTyping.gif'
import GitHubIcon from '@mui/icons-material/GitHub'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

export default function MainLeftSection() {
    return <div className="w-full h-full relative">
        <div className="absolute -rotate-45 left-[-60px] top-3 px-2 py-1 bg-white border-[0.5px] border-gray3 font-bold">TRY FOR FREE</div>
        <div className="font-extrabold text-right text-3xl p-5">
            THE EASIEST WAY TO
            <br />
            BUILDING YOUR PROJECT
        </div>
        <div className="border-b-[0.5px] border-gray1" />
        <div className="flex flex-row h-[340px]">
            <div className="flex flex-col w-1/2 border-r-[0.5px] border-gray1">
                <div className="relative h-1/2 text-xl m-auto mt-10 leading-8">
                    <span className="font-extrabold text-4xl">Builzer</span>는
                    <br />
                    <span className='absolute bg-[#FFE068] w-48 h-3 opacity-50 top-14 z-0'></span>
                    <span className='relative z-1'>백엔드 개발자들을 위한</span>
                    <br />자동배포 서비스입니다.
                </div>
                <div className="border-t-[0.5px] border-b-[0.5px] border-gray1 h-1/2">
                    <p className="font-extrabold text-3xl p-5 text-right">Ready to Start?</p>
                    <div className='w-60 m-auto'>
                        <Button type='primary' className='w-full h-12 font-bold text-xl bg-black'>시작하기</Button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 border-b-[0.5px] border-gray1 p-2">
                <img src={AutoTyping} alt="메인페이지 gif" className='w-full mt-8'/>
            </div>
        </div>
        <div className="w-full flex flex-row">
            <div className="w-1/3 border-r-[0.5px] border-gray1">
                <img src={Logo} alt="로고" className='w-32 h-32 m-auto'/>
                <div className='text-xs ml-4'>
                    <p>BUILZER</p>
                    <p>© 2024</p>
                </div>
            </div>
            <div className="w-1/3 border-r-[0.5px] border-gray1 flex flex-row">
                <div className="w-1/3 border-r-[0.5px] border-gray1">
                    <p className='-rotate-90 text-center mt-20 text-gray5 hover:font-medium cursor-pointer'>CONTACT</p>
                </div>
                <div className="w-1/3 border-r-[0.5px] border-gray1">
                    <p className='-rotate-90 text-center mt-20 text-gray5 hover:font-medium cursor-pointer'>ABOUT</p>
                </div>
                <div className="w-1/3">
                    <p className='-rotate-90 text-center mt-20 text-gray5 hover:font-medium cursor-pointer'>DOCS</p>
                </div>
            </div>
            <div className="w-1/3 p-2 hover:text-[#FFE068] cursor-pointer">
                <p className='font-extrabold text-2xl'>
                    Login with Github
                    <GitHubIcon className='ml-1 mt-[-5px]' />
                </p>
                <p className='my-4'>and</p>
                <p className='font-extrabold text-2xl'>
                    Try For Free
                    <ArrowOutwardIcon />
                </p>
            </div>
        </div>
    </div>
}