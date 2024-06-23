import { useRecoilState } from 'recoil'
import { projectList } from '../../../types/project'
import { selectedProjectState } from '../../../recoil/atoms/common'

export default function ProjectMenuList({...props}) {
    const [selectedProjectId, setSelectedProjectId] = useRecoilState<string>(selectedProjectState)

    const {projects} = props

    const handleProjectId = (id: string) => {
        console.log(id)
        setSelectedProjectId(id)
    }
    
    return <div className='mt-2 h-[170px] border-b-2 border-gray1 overflow-y-auto pb-2'>
        {projects.map((project: projectList, index: number) => (
            <div key={index} className={`p-1 cursor-pointer hover:bg-gray1 ${selectedProjectId === project.projectId ? 'bg-gray2 hover:bg-gray2' : ''}`} onClick={() => handleProjectId(project.projectId)}>{project.projectName}</div>
        ))}
    </div>
}