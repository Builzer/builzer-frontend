import { useRecoilState, useRecoilValue } from 'recoil'
import GitRepositoryInfo from '../../components/overview/setting/GitRepositoryInfo'
import GitRepositoryFolder from '../../components/overview/setting/item/GitRepositoryFolder'
import { projectBuildInfo } from '../../types/project'
import { projectBuildState, projectCollaboratorsState } from '../../recoil/atoms/project'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import { Select, notification } from 'antd'
import { useState } from 'react'
import { selectItem } from '../../types/common'

export default function OverviewSettingPage() {
    const [api, contextHolder] = notification.useNotification()
    const projectBuildInfo = useRecoilValue<projectBuildInfo>(projectBuildState)
    const [projectCollaborators, setProjectCollaborators] = useRecoilState<Array<selectItem>>(projectCollaboratorsState)
    const [value, setValue] = useState<string>('')
    const [options, setOptions] = useState<Array<selectItem>>(projectCollaborators)

    const emailCheck = (value: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
        if (!emailRegex.test(value)) {
            return false
        } else {
            return true
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.code === 'Enter') {
            if (emailCheck(value)) {
                const tmpOption = {
                    value: value,
                    label: value
                }
    
                setOptions([...options, tmpOption])
                setProjectCollaborators([...projectCollaborators, tmpOption])
                setValue('')
            } else {
                api['warning']({
                    message: '입력값이 유효하지 않습니다.',
                    description: '올바른 이메일 형식을 입력해주세요.'
                  })
            }
            
        }
    }

    const handleSearch = (value: string) => {
        setValue(value)
    }

    const handleDeSelect = (value: any) => {
        setOptions(options.filter((option) => option.value !== value))
        setProjectCollaborators(projectCollaborators.filter((option) => option !== value))
    }

    return <div className='w-full h-full relative'>
        {contextHolder}
        <div className='w-full h-[200px] bg-black' />
        <p className='absolute text-2xl top-3 left-40 text-white font-light'>단계에 따라 프로젝트를 구성하고 배포해보세요!</p>
        <div className='flex flex-row gap-2 justify-between p-2'>
        <div className='p-5 mt-[-140px] rounded-md border-[1px] border-gray1 w-[350px] h-[200px] bg-white'>
            <GitRepositoryInfo />
            <GitRepositoryFolder branch={projectBuildInfo.projectSpec.branch} />
        </div>
        <div className='absolute right-2 top-28 w-[400px]'>
            <p className='text-white text-lg'>
                <PersonAddAlt1OutlinedIcon />
                <span className='ml-2'>팀원 추가</span>
            </p>
            <Select
                className='w-[390px] mt-2'
                mode='multiple'
                options={options}
                defaultValue={options}
                showSearch
                defaultActiveFirstOption={false}
                notFoundContent={null}
                onKeyDown={handleKeyDown}
                onSearch={handleSearch}
                onDeselect={handleDeSelect}
            />
        </div>
        <div className='w-full h-[100px] bg-gray1'></div>
        </div>
    </div>
}