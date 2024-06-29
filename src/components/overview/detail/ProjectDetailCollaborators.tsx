import { useQuery } from 'react-query'
import { getProjectCollaborators } from '../../../apis/overview'
import ProjectAuthorityButton from '../../base/common/ProjectAuthorityButton'

export default function ProjectDetailCollaborators({...props}) {
    const {projectId} = props
    
    const { data, isLoading } = useQuery({
        queryKey: ['getProjectCollaborators', projectId],
        queryFn: () => getProjectCollaborators(projectId)
    })

    if (!data || isLoading) return <></>

    return <div>
        <p>공동 작업자</p>
        <div className='flex flex-row flex-wrap p-1 rounded-lg justify-between border-[1px] border-[#d9d9d9]'>
            {data.projectMembers.map((collaborator, index) => (
                <div className={`w-[270px] flex flex-row p-1 justify-between border-[1px] border-gray1 rounded-lg ${collaborator.isAccepted === 'accept' ? '' : 'bg-gray1'}`} key={index}>
                    <p className='w-[140px] mt-1 font-thin text-sm text-ellipsis overflow-hidden ...'>{collaborator.gitEmail}</p>
                    <ProjectAuthorityButton authority={collaborator.authority} />
                </div>
            ))}
        </div>
    </div>
}