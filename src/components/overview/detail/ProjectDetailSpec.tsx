import { useQuery } from 'react-query'
import { getProjectDetailInfo } from '../../../apis/overview'
import { Button, Input } from 'antd'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined'
import CreditImg from '../../../assets/images/Credit.svg'


export default function ProjectDetailSpec({...props}) {
    const {projectId} = props
    
    const { data, isLoading } = useQuery({
        queryKey: ['getProjectDetailInfo', projectId],
        queryFn: () => getProjectDetailInfo(projectId)
    })

    if (!data || isLoading) return <></>
    return <div>
        <div className='flex justify-between mt-2'>
            <p className='font-bold text-2xl'>Settings</p>
            <div className='flex flex-row gap-2'>
                <Button disabled className='font-thin'>
                    <RouteOutlinedIcon />
                    <p>{data.projectSepc.branch}</p>
                </Button>
                <Button disabled className='font-thin'>
                    <FolderOutlinedIcon />
                    <p>{data.projectSepc.rootPath}</p>
                </Button>
            </div>
        </div>
        <div className='flex flex-row gap-10 mt-2'>
            <div>
                <p>언어/버전</p>
                <div className='flex flex-row gap-2'>
                    <Input className='font-thin' style={{width: 168}} disabled defaultValue={data.projectSepc.language.name} />
                    <Input className='font-thin' style={{width: 168}} disabled defaultValue={data.projectSepc.language.version}/>
                </div>
            </div>
            <div>
                <p>빌드 도구</p>
                <div className='flex flex-row gap-2'>
                    <Input className='font-thin' style={{width: 168}} disabled defaultValue={data.projectSepc.language.buildTools} />
                </div>
            </div>
        </div>
        <div className='mt-4'>
            <p>서버 스펙</p>
            <div className='text-[#00000040] flex flex-row px-2 py-1 rounded-lg bg-[#0000000a] justify-between border-[1px] border-[#d9d9d9]'>
                <div>{data.projectSepc.serverSpec.name}</div>
                <div className='flex flex-row gap-8 font-light'>
                    <p className='font-thin'>{data.projectSepc.serverSpec.cpu}</p>
                    <p className='font-thin'>{data.projectSepc.serverSpec.memory}</p>
                    <p className='flex flex-row gap-1 font-regular'>
                        <img className='w-5' src={CreditImg} alt='크레딧 이미지' />
                        <span>{data.projectSepc.serverSpec.cost}</span>
                    </p>
                </div>
            </div>
        </div>
        <div className='mt-4'>
            <p>데이터베이스</p>
            <div className='flex flex-row gap-5'>
                <Input className='font-thin w-1/2' disabled defaultValue={data.projectSepc.dbSpec.dbType} />
                <Input className='font-thin w-1/2' disabled defaultValue={data.projectSepc.dbSpec.dbVersion} />
            </div>
            <div className='flex flex-row gap-5 mt-2'>
                <div className='w-1/2'>
                    <p className='text-sm text-gray5'>username</p>
                    <Input className='font-thin w-full' disabled defaultValue={data.projectSepc.dbSpec.dbId} />
                </div>
                <div className='w-1/2'>
                    <p className='text-sm text-gray5'>password</p>
                    <Input className='font-thin w-full' disabled defaultValue={data.projectSepc.dbSpec.dbPw} />
                </div>
            </div>
        </div>
    </div>
}