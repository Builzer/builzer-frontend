import { Input, Select } from 'antd'
import { useQuery } from 'react-query'
import { getGitOrganizations } from '../../apis/overview'
import { useEffect, useState } from 'react'
import GitRepositoryList from './repository/GitRepositoryList'
import { useRecoilValue } from 'recoil'
import { userGitNameState } from '../../recoil/atoms/common'

interface organizations {
    value: string
    label: string
}
export default function ProjectGitRepository() {
    const userGitName = useRecoilValue<string>(userGitNameState)
    const [organizations, setOrganizations] = useState<Array<organizations>>()
    const [selectedOrg, setSelectedOrg] = useState<string>('owner')
    const [searchText, setSearchText] = useState<string>('')

    const { data, isLoading } = useQuery({
        queryKey: ['getGitOrganizations'],
        queryFn: () => getGitOrganizations()
    })

    const handleOrganization = (value: string) => {
        setSelectedOrg(value)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(e.target.value.toLowerCase().replaceAll(' ', ''))
    }

    useEffect(() => {
        if (data) {
            const options: Array<organizations>  = []
            options.push({
                value: 'owner',
                label: userGitName
            })
            data.forEach((item) => {
                const tmpOption = {
                    value: item.orgName,
                    label: item.orgName
                }
                options.push(tmpOption)
            })
            setOrganizations(options)
        }
    }, [data, userGitName])

    if (!data || isLoading) return <></>

    return <div className='p-2 w-full'>
        <p className='font-bold text-xl'>깃 레포 선택</p>
        <div className='mt-2 w-full flex flex-row gap-2'>
            <div className='w-1/3'>
                {
                    organizations ? (
                        <Select 
                            className='w-full'
                            defaultValue={organizations[0].value}
                            options={organizations}
                            onChange={handleOrganization}
                        />
                    ) : (<></>)
                }
            </div>
            <div className='w-2/3'>
                <Input placeholder='🔎 깃 레포명으로 검색' allowClear onChange={handleSearch} />
            </div>
        </div>
        <GitRepositoryList orgName={selectedOrg} searchText={searchText} />
    </div>
}