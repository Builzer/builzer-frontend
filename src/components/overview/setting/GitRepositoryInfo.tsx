import GitHubIcon from '@mui/icons-material/GitHub'
import { useRecoilValue } from 'recoil'
import { projectDefaultInfo } from '../../../types/project'
import { projectDefaultInfoState } from '../../../recoil/atoms/project'
import GitRepositoryBranch from './item/GitRepositoryBranch'

export default function GitRepositoryInfo() {
    const buildProjectDefaultInfo = useRecoilValue<projectDefaultInfo>(projectDefaultInfoState)

    return <div>
        <p className='font-bold'>깃 레포</p>
        <p className='mt-2'><GitHubIcon /> {buildProjectDefaultInfo.gitRepository}</p>
        <GitRepositoryBranch />
    </div>
}