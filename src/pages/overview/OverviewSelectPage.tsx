import { BrowserView } from 'react-device-detect'
import BackgroundImg from '../../assets/images/Background.svg'
import ProjectGitRepository from '../../components/overview/ProjectGitRepository'
import SelectProjectTemplate from '../../components/overview/repository/SelectProjectTemplate'

export default function OverviewSelectPage() {
    return <div>
        <BrowserView className='w-full h-[620px] relative'>
            <div className='ml-40 mt-3'>
                <p className='text-3xl font-bold'>신규 프로젝트 배포</p>
                <p className='font-thin'>신규 배포를 위해 깃 레포를 선택하고, 템플릿을 선택해주세요.</p>
            </div>
            <div className='flex flex-row gap-2 px-2'>
                <div className='w-3/5'>
                    <div className='m-2'>
                        <div className='relative z-10 w-full h-[520px] border-[1px] border-gray1 rounded-md bg-white'>
                            <ProjectGitRepository />
                        </div>
                    </div>
                </div>
                <div className='w-2/5 m-2'>
                    <div className='relative z-10 bg-white w-full h-full border-[1px] border-gray1 rounded-md'>
                        <SelectProjectTemplate />
                    </div>
                </div>
            </div>
            <img className='z-0 w-full absolute bottom-3' src={BackgroundImg} alt='배경 이미지' />
        </BrowserView>
    </div>  
}