import { PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons'

export default function ProjectDeployHandle() {
    return <div className='flex flex-row gap-5 mt-10'>
        <PlayCircleFilled className='text-gray10 hover:text-black cursor-pointer' style={{ fontSize: 40 }} />
        <PauseCircleFilled className='text-gray10 hover:text-black cursor-pointer' style={{ fontSize: 40 }} />
    </div>
}