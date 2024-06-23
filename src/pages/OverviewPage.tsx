import {BrowserView} from 'react-device-detect'
import ProjectSelect from '../components/overview/ProjectSelect'
import ProjectInfo from '../components/overview/ProjectInfo'
import { useState } from 'react'

export default function OverviewPage() {
    const [projectId, setProjectId] = useState<string>('')

    return <div>
        <BrowserView className='w-full h-[620px] flex flex-row bg-gray1'>
            <div className='w-1/2 h-full border-r-[0.5px] border-gray1'>
                <ProjectSelect projectId={projectId} setProjectId={setProjectId} />
            </div>
            <div className='w-1/2 h-full overflow-hidden'>
                <ProjectInfo projectId={projectId} />
            </div>
        </BrowserView>
    </div>
}