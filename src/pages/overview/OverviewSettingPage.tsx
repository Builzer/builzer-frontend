import { useRecoilValue } from 'recoil'
import GitRepositoryInfo from '../../components/overview/setting/GitRepositoryInfo'
import GitRepositoryFolder from '../../components/overview/setting/item/GitRepositoryFolder'
import { projectBuildInfo } from '../../types/project'
import { projectBuildState } from '../../recoil/atoms/project'

export default function OverviewSettingPage() {
    const projectBuildInfo = useRecoilValue<projectBuildInfo>(projectBuildState)

    return <div className='w-full h-full relative'>
        <div className='w-full h-[200px] bg-black' />
        <p className='absolute text-2xl top-3 left-40 text-white font-light'>단계에 따라 프로젝트를 구성하고 배포해보세요!</p>
        <div className='flex flex-row gap-2 justify-between p-2'>
        <div className='p-5 mt-[-140px] rounded-md border-[1px] border-gray1 w-[350px] h-[200px] bg-white'>
            <GitRepositoryInfo />
            <GitRepositoryFolder branch={projectBuildInfo.projectSpec.branch} />
        </div>
        <div className='w-full h-[100px] bg-gray1'></div>
        </div>
    </div>
}