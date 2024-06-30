import { useEffect, useState } from 'react'
import { BrowserView } from 'react-device-detect'
import { useRecoilValue } from 'recoil'
import { projectBuildInfo, projectInfoSimple } from '../types/project'
import { selectedProjectState } from '../recoil/atoms/common'
import SettingSideMenu from '../components/base/common/SettingSideMenu'
import { useQuery } from 'react-query'
import { getProjectDetailInfo } from '../apis/overview'
import ManagementProjectSetting from '../components/management/ManagementProjectSetting'

export default function ManagementPage() {
    const selectedProject = useRecoilValue<projectInfoSimple>(selectedProjectState)
    const [managementMenu, setManagementMenu] = useState<string>('프로젝트 세팅')
    const [projectSetting, setProjectSetting] = useState<projectBuildInfo>()
    const [isUseDb, setIsUseDb] = useState<boolean>(false)


    const { data, isLoading } = useQuery({
        queryKey: ['getProjectDetailInfo', selectedProject.projectId],
        queryFn: () => getProjectDetailInfo(selectedProject.projectId)
    })

    useEffect(() => {
        if (!selectedProject.projectId) {
            alert('관리할 프로젝트를 선택해주세요')
            window.location.href = '/overview'
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (data) {
            setProjectSetting({
                projectInfo: {
                    projectName: data.projectInfo.projectName,
                    projectPlan: data.projectInfo.projectPlan,
                    domain: data.projectInfo.domain,
                    gitRepository: data.projectInfo.gitRepository
                },
                projectSpec: data.projectSpec
            })
            setIsUseDb(data.projectSpec.dbSpec.dbId === '' ? false : true)
        }
    }, [data])

    if (!data || isLoading || !projectSetting) return <></>

    return <div>
        <BrowserView>
            <div className='w-full h-[620px] flex flex-row gap-5 p-2'>
                <div className='w-1/5 mt-20 pl-5'>
                    <SettingSideMenu menuList={['프로젝트 세팅', '환경변수 세팅']} setMenu={setManagementMenu} menu={managementMenu} isButton={true} project={projectSetting} isUseDb={isUseDb} />
                </div>
                <div className='w-4/5 pt-5'>
                    {
                        managementMenu === '프로젝트 세팅' ?
                        (<ManagementProjectSetting project={projectSetting} setProject={setProjectSetting} isUseDb={isUseDb} setIsUseDb={setIsUseDb} />)
                        :
                        ('환경변수 세팅')
                    }
                </div>
            </div>
        </BrowserView>
    </div>
}