import { useSetRecoilState } from 'recoil'
import { projectBuildInfo } from '../../../../types/project'
import { projectBuildState } from '../../../../recoil/atoms/project'
import { useQuery } from 'react-query'
import { getGitFolderList } from '../../../../apis/overview'
import { TreeSelect } from 'antd'

export default function GitRepositoryFolder({...props}) {
    const {branch, value} = props
    const setProjectBuildInfo = useSetRecoilState<projectBuildInfo>(projectBuildState)

    const { data, isLoading } = useQuery({
        queryKey: ['getGitFilderList', branch],
        queryFn: () => getGitFolderList(branch, value)
    })

    const handleSelectFolder = (value: string) => {
        setProjectBuildInfo((prev) => ({
            ...prev,
            projectSpec: {
                ...prev.projectSpec,
                rootPath: value
            }
        }))
    }

    if (!data || isLoading || !value) return <></>

    return <div className='mt-5'>
        <TreeSelect
            placeholder='루트 폴더 선택'
            defaultValue='/'
            treeLine={true}
            treeData={data}
            style={{width: 300}}
            onChange={handleSelectFolder}
        />
    </div>
}