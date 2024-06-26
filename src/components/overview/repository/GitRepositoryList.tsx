import { useQuery } from 'react-query'
import { getGitRepositoryList } from '../../../apis/overview'
import SpringImg from '../../../assets/images/overview/Spring.svg'
import LockImg from '../../../assets/images/overview/Lock.svg'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { projectDefaultInfo, repositoryList } from '../../../types/project'
import { useSetRecoilState } from 'recoil'
import { projectDefaultInfoState } from '../../../recoil/atoms/project'

export default function GitRepositoryList({...props}) {
    const { orgName, searchText } = props
    const [selectedRepo, setSelectedRepo] = useState<string>('')
    const [repoList, setRepoList] = useState<Array<repositoryList>>([])
    const setProjectDefaultInfo = useSetRecoilState<projectDefaultInfo>(projectDefaultInfoState)

    const { data, isLoading } = useQuery({
        queryKey: ['getGitRepositoryList', orgName],
        queryFn: () => getGitRepositoryList(orgName, 10, 0)
    })

    const handleRepository = (repoName: string) => {
        setSelectedRepo(repoName)
        
        setProjectDefaultInfo((prev) => ({
            ...prev,
            gitRepository: repoName
        }))
    }

    useEffect(() => {
        const tmpRepoList: Array<repositoryList> = []

        data?.forEach((item) => {
            if (item.repoName.toLocaleLowerCase().replaceAll(' ', '').includes(searchText)) {
                tmpRepoList.push(item)
            }
        })
        setRepoList(tmpRepoList)
    }, [data, searchText])

    if (!data || isLoading) return <></>

    return <div className='w-full h-full mt-2'> 
        {
            repoList.map((item, index) => (
                <div className={`flex justify-between w-full p-2 border-[1px] border-gray1 ${index === 0 ? 'rounded-t-md' : index === data.length-1 ? 'rounded-b-md' : ''}`} key={index}>
                    <div className='flex flex-row gap-3'>
                        {
                            item.projectType === 'spring' ? <img className='w-6' src={SpringImg} alt='스프링부트' /> : <div className='w-6 h-6 rounded-full border-[1px] border-gray1 mt-1'></div>
                        }
                        <p className='mt-1'>{item.repoName}</p>
                        {
                            item.isPrivate ? <img className='w-4' src={LockImg} alt='프라이빗' /> : <></>
                        }
                        <p className='mt-1 font-light text-gray10'>{item.updatedAt}</p>
                    </div>
                    <Button
                        className='bg-black'
                        type='primary'
                        onClick={() => handleRepository(item.repoName)}
                        disabled={selectedRepo === item.repoName}
                        style={{width: 100}}
                    >
                        {selectedRepo === item.repoName ? '선택됨' : '선택'}
                    </Button>
                </div>
            ))
        }
    </div>
}