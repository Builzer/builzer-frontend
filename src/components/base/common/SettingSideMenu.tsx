import { Button, message } from 'antd'
import { useMutation } from 'react-query'
import { startDeploy } from '../../../apis/overview'

export default function SettingSideMenu({...props}) {
    const {menuList, setMenu, menu, isButton, project, isUseDb} = props

    const handleStartDeploy = () => {
        if (isUseDb && !project.projectSpec.dbSpec.dbId) {
            message.error('데이터베이스 아이디를 입력해주세요.')
        } else if (isUseDb && !project.projectSpec.dbSpec.dbPw) {
            message.error('데이터베이스 비밀번호를 입력해주세요.')
        } else {
            startDeployMutation.mutate()
        }
    }

    const startDeployMutation = useMutation(
        ['startDeploy'],
        () => startDeploy(project),
        {
            onSuccess: () => {
                window.location.href = '/overview/deploy'
            },
            onError: () => {

            }
        }
    )

    return <div className='border-[1px] border-gray1 rounded-lg px-2 py-5 flex flex-col gap-10 shadow-lg'>
        {
            menuList.map((item: string) => (
                <div className={`${menu === item ? 'font-bold' : 'font-thin'} cursor-pointer`} key={item} onClick={() => setMenu(item)}>{item}</div>
            ))
        }
        {
            isButton ?
            (<Button className='bg-black' type='primary' onClick={handleStartDeploy}>재배포하기</Button>)
            :
            (<></>)
        }
    </div>
}