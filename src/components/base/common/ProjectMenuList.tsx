import { useRecoilState } from 'recoil'
import { projectInfoSimple, projectList } from '../../../types/project'
import { selectedProjectState } from '../../../recoil/atoms/common'

export default function ProjectMenuList({...props}) {
    const [selectedProject, setSelectedProject] = useRecoilState<projectInfoSimple>(selectedProjectState)

    const {projects} = props

    const handleProjectId = (id: string, name: string) => {
        setSelectedProject({
            projectId: id,
            projectName: name
        })
    }
    
    return <div className='mt-2 h-[170px] border-b-2 border-gray1 overflow-y-auto pb-2'>
        {projects.map((project: projectList, index: number) => (
            <div key={index} className={`p-1 cursor-pointer hover:bg-gray1 ${selectedProject.projectName === project.projectName ? 'bg-gray2 hover:bg-gray2' : ''}`} onClick={() => handleProjectId(project.projectSpecId, project.projectName)}>{project.projectName}</div>
        ))}
    </div>
}