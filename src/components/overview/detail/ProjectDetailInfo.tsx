import { useQuery } from 'react-query'
import { getProjectDetailInfo } from '../../../apis/overview'
import { Button } from 'antd'
import ProjectPlanButton from '../../base/common/ProjectPlanButton'
import ProjectAuthorityButton from '../../base/common/ProjectAuthorityButton'
import { NavLink } from 'react-router-dom'

export default function ProjectDetailInfo({...props}) {
    const {projectId} = props
    
    const { data, isLoading } = useQuery({
        queryKey: ['getProjectDetailInfo', projectId],
        queryFn: () => getProjectDetailInfo(projectId)
    })

    if (!data || isLoading) return <></>

    return <div className='flex justify-between'>
        <div>
            <div className='flex flex-row gap-2'>
                <p className='text-xl font-bold'>{data.projectInfo.projectName}</p>
                <ProjectPlanButton plan={data.projectInfo.projectPlan} />
                <ProjectAuthorityButton authority={data.projectInfo.authority} />
            </div>
            <p className='font-light text-gray5 mt-1'>{data.projectInfo.domain}</p>
        </div>
        <NavLink to='/manage'>
            <Button className='font-regular'>프로젝트 관리</Button>
        </NavLink>
    </div>
}