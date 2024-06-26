import { useQuery } from 'react-query'
import { getGitBranchList } from '../../../../apis/overview'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { projectBuildInfo, projectDefaultInfo } from '../../../../types/project'
import { projectBuildState, projectDefaultInfoState } from '../../../../recoil/atoms/project'
import { useEffect, useState } from 'react'
import { Select } from 'antd'

interface branchList {
    value: string
    label: string
}
export default function GitRepositoryBranch() {
    const projectDefaultInfo = useRecoilValue<projectDefaultInfo>(projectDefaultInfoState)
    const [branchList, setBranchList] = useState<Array<branchList>>([])
    const setProjectBuildInfo = useSetRecoilState<projectBuildInfo>(projectBuildState)

    const { data, isLoading } = useQuery({
        queryKey: ['getGitBranchList'],
        queryFn: () => getGitBranchList(projectDefaultInfo.gitRepository)
    })

    const handleBranch = (value: string) => {
        setProjectBuildInfo((prev) => ({
            ...prev,
            projectSpec: {
                ...prev.projectSpec,
                branch: value
            }
        }))
    }

    useEffect(() => {
        if (data) {
            const tmpBranchList: Array<branchList> = []

            data.forEach((item, index) => {
                if (index === 0) {
                    setProjectBuildInfo((prev) => ({
                        ...prev,
                        projectSpec: {
                            ...prev.projectSpec,
                            branch: item.branchName
                        }
                    }))
                }
                const tmpBranch = {
                    value: item.branchName,
                    label: item.branchName
                }
                tmpBranchList.push(tmpBranch)
            })
            
            setBranchList(tmpBranchList)
        }
    }, [data, setProjectBuildInfo])

    if (!data || isLoading) return <></>
    
    return <div className='mt-5'>
        {
            branchList.length > 0 ? (
                <Select
                    defaultValue={branchList[0].value}
                    options={branchList}
                    style={{width: 300}}
                    onChange={handleBranch}
                />
            ) : (<></>)
        }
    </div>
}