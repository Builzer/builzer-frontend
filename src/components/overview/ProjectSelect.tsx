import {useEffect, useState} from 'react'
import {Input, Select} from 'antd'
import { useQuery } from 'react-query'
import { getProjectList } from '../../apis/overview'
import ProjectPlanButton from '../base/common/ProjectPlanButton'
import ProjectAuthorityButton from '../base/common/ProjectAuthorityButton'
import { projectList } from '../../types/project'

export default function ProjectSelect({...props}) {
    const {projectId, setProjectId} = props
    const [plan, setPlan] = useState<string>('')
    const [authority, setAuthority] = useState<string>('')
    const [projectList, setProjectList] = useState<Array<projectList>>([])
    const [searchInput, setSearchInput] = useState<string>('')

    const { data, isLoading } = useQuery({
        queryKey: ['getProjectList'],
        queryFn: () => getProjectList()
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchInput(e.target.value)
        if (data) {
            let tmpProjectList = data.projects
            const result: Array<projectList> = []
            const searchText = e.target.value.toLocaleLowerCase().split(' ').join('')

            //플랜 필터 선택 시
            if (plan !== '') {
                tmpProjectList = tmpProjectList.filter((item) => item.projectPlan === plan)
            }

            // 권한 필터 선택 시
            if (authority !== '') {
                tmpProjectList = tmpProjectList.filter((item) => item.authority === authority)
            }

            tmpProjectList.forEach((project) => {
                if (project.projectName.toLocaleLowerCase().split(' ').join('').includes(searchText)) {
                    result.push(project)
                }
            })
            setProjectList(result)
        }
    }

    const handlePlanFilter = (value: string) => {
        setPlan(value)
        if (data) {
            let tmpProjectList = data.projects
            const result: Array<projectList> = []
            const searchText = searchInput.toLocaleLowerCase().split(' ').join('')

            //플랜 필터 선택 시
            if (value !== '') {
                tmpProjectList = tmpProjectList.filter((item) => item.projectPlan === value)
                console.log(tmpProjectList)
            }

            // 권한 필터 선택 시
            if (authority !== '') {
                tmpProjectList = tmpProjectList.filter((item) => item.authority === authority)
            }

            tmpProjectList.forEach((project) => {
                if (project.projectName.toLocaleLowerCase().split(' ').join('').includes(searchText)) {
                    result.push(project)
                }
            })

            setProjectList(result)
        }
    }

    const handleAuthorityFilter = (value: string) => {
        setAuthority(value)
        if (data) {
            let tmpProjectList = data.projects
            const result: Array<projectList> = []
            const searchText = searchInput.toLocaleLowerCase().split(' ').join('')

            //플랜 필터 선택 시
            if (plan !== '') {
                tmpProjectList = tmpProjectList.filter((item) => item.projectPlan === plan)
            }

            // 권한 필터 선택 시
            if (value !== '') {
                tmpProjectList = tmpProjectList.filter((item) => item.authority === value)
            }

            tmpProjectList.forEach((project) => {
                if (project.projectName.toLocaleLowerCase().split(' ').join('').includes(searchText)) {
                    result.push(project)
                }
            })
            setProjectList(result)
        }
    }

    useEffect(() => {
        if (data) {
            setProjectList(data.projects)
        }
    }, [data])
    if (!data || isLoading) return <></>

    return <div className='w-full h-full p-2'>
        <div className='mt-12'>
            <div className='flex flex-row gap-1'>
                <Input placeholder='🔎 프로젝트명으로 검색' allowClear onChange={handleSearch} />
                <Select
                    defaultValue=''
                    options={[
                        { value: '', label: '플랜' },
                        { value: 'lite', label:'LITE' },
                        { value: 'pro', label:'PRO' },
                    ]}
                    style={{ width: 130 }}
                    onChange={handlePlanFilter}
                />
                <Select
                    defaultValue=''
                    options={[
                        { value: '', label: '권한' },
                        { value: 'owner', label:'OWNER' },
                        { value: 'developer', label:'DEVELOPER' },
                    ]}
                    style={{ width: 180 }}
                    onChange={handleAuthorityFilter}
                />
            </div>
            <div className=' h-[500px] bg-white mt-2 rounded-md overflow-y-auto p-2'>
                {projectList.map((project, index) => (
                    <div key={index} className={`cursor-pointer px-2 py-2 flex flex-row justify-between hover:bg-gray1 ${projectId === project.projectSpecId ? 'bg-gray2 hover:bg-gray2' : ''}`} onClick={() => setProjectId(project.projectSpecId)}>
                        <div className='flex flex-row gap-3'>
                            <p>{project.projectName}</p>
                            <ProjectPlanButton plan={project.projectPlan} />
                            <ProjectAuthorityButton authority={project.authority} />
                        </div>
                        <div className='font-light text-sm mt-1'>{project.createdAt}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}