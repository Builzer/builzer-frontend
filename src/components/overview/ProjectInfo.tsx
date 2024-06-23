import LoadingImage from '../../assets/images/overview/Loading.svg'
import LoadingGif from '../../assets/images/overview/Loading.gif'
import { Button } from 'antd'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import ProjectDetailSpec from './detail/ProjectDetailSpec'
import ProjectDetailInfo from './detail/ProjectDetailInfo'
import ProjectDetailCollaborators from './detail/ProjectDetailCollaborators'

export default function ProjectInfo({...props}) {
    const {projectId} = props

    return <div className='w-full h-full relative mt-14'>
        <Button type='primary' className='w-[580px] ml-2 font-bold'>
            <p>신규 프로젝트 생성</p>
            <ControlPointIcon />
        </Button>
        {projectId === '' ?
            <div>
                <div className='absolute left-[225px] top-[335px]'>
                    <p className='text-center font-bold'>Uploading...</p>
                    <img className='w-32' src={LoadingGif} alt='로딩바' />
                </div>
                <img className='m-auto mt-16 w-[400px]' src={LoadingImage} alt='로딩 이미지' />
            </div>
            : 
            <div className='mt-2 px-2 w-[590px] h-[500px] bg-white rounded-md'>
                <div className='w-full py-2 border-b-[1px] border-gray1'>
                    <ProjectDetailInfo projectId={projectId} />
                </div>
                <div className='w-full h-[420px] overflow-auto p-2'>
                    <ProjectDetailSpec projectId={projectId} />
                    <div className='mt-4'>
                        <ProjectDetailCollaborators projectId={projectId} />
                    </div>
                </div>
            </div>
        }
    </div>
}