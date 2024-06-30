import { BrowserView } from 'react-device-detect'
import ProjectDeployLog from '../../components/overview/deploy/ProjectDeployLog'
import ProjectDeployHandle from '../../components/overview/deploy/ProjectDeployHandle'

export default function OverviewDeployPage() {
    return <div>
        <BrowserView className='w-full h-[620px] flex flex-row gap-2'>
            <div className='w-3/4 h-full p-2 ml-40'>
                <ProjectDeployLog />
            </div>
            <div className='w-[150px] h-full p-2'>
                <ProjectDeployHandle />
            </div>
        </BrowserView>
    </div>
}