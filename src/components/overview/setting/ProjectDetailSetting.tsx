import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { projectBuildInfo, projectDefaultInfo } from '../../../types/project'
import { projectBuildState, projectCollaboratorsState, projectDefaultInfoState } from '../../../recoil/atoms/project'
import { useMutation, useQuery } from 'react-query'
import { checkProjectDomain, getProjectDetailInfo, inviteCollaborators, startDeploy } from '../../../apis/overview'
import { useEffect, useState } from 'react'
import ProjectPlanButton from '../../base/common/ProjectPlanButton'
import ProjectSettingTitle from '../../base/project/ProjectSettingTitle'
import { Input, Form, Button, Radio, RadioChangeEvent, Checkbox, CheckboxProps, Popconfirm, PopconfirmProps, message } from 'antd'
import SelectLanguage from '../../base/project/SelectLanguage'
import SelectServerSpec from '../../base/project/SelectServerSpec'
import SelectDatabase from '../../base/project/SelectDatabase'
import { selectItem } from '../../../types/common'

export default function ProjectDetailSetting() {
    const projectDefaultValue = useRecoilValue<projectDefaultInfo>(projectDefaultInfoState)
    const [projectBuildInfo, setProjectBuildInfo] = useRecoilState<projectBuildInfo>(projectBuildState)
    const resetProjectBuildInfo = useResetRecoilState(projectBuildState)
    const projectCollaborators = useRecoilValue<Array<selectItem>>(projectCollaboratorsState)
    const [domain, setDomain] = useState<string>('')
    const [dbId, setDbId] = useState<string>()
    const [dbPw, setDbPw] = useState<string>()
    const [isDomainValid, setIsDomainValid] = useState<boolean>(false)
    const [isUseDb, setIsUseDb] = useState<boolean>(false)

    const { data, isLoading } = useQuery({
        queryKey: ['getProjectDetailInfo'],
        queryFn: () => getProjectDetailInfo(projectDefaultValue.projectSpecId)
    })

    const handleStartDeploy = () => {
        if (!isDomainValid) {
            message.error('도메인 유효성 검사를 진행해주세요.')
        } else if (isUseDb && !dbId) {
            message.error('데이터베이스 아이디를 입력해주세요.')
        } else if (isUseDb && !dbPw) {
            message.error('데이터베이스 비밀번호를 입력해주세요.')
        } else {
            startDeployMutation.mutate()
        }
    }

    const domainValidMutation = useMutation(
        ['checkDomainValid'],
        () => checkProjectDomain(domain),
        {
            onSuccess: (data) => {
                if (data.code === 409) {
                    message.error(data.message)
                    setIsDomainValid(false)
                } else if (data.code === 400) {
                    message.error(data.message)
                    setIsDomainValid(false)
                } else {
                    message.success(data.message)
                    setProjectBuildInfo((prev) => ({
                        ...prev,
                        projectInfo: {
                            ...prev.projectInfo,
                            domain: `https://${domain}.builzer.app`,
                            projectName: domain
                        }
                    }))
                    setIsDomainValid(true)
                }
            },
            onError: () => {

            }
        }

    )

    const startDeployMutation = useMutation(
        ['startDeploy'],
        () => startDeploy(projectBuildInfo),
        {
            onSuccess: (data) => {
                const tmpList: Array<string> = []
                projectCollaborators.forEach((collaborator) => {
                    tmpList.push(collaborator.value)
                })

                inviteCollaboratorsMutation.mutate({
                    projectId: data.data,
                    memberList: tmpList
                })
            },
            onError: () => {

            }
        }
    )

    const inviteCollaboratorsMutation = useMutation(
        ['inviteCollaborators'],
        (props: any) => inviteCollaborators(props.projectId, props.memberList),
        {
            onSuccess: () => {
                resetProjectBuildInfo()
                window.location.href = '/overview/deploy'
            },
            onError: () => {

            }
        }
    )

    // const checkDomain = useCallback(async (_: any, value: string) => {
    //     if (!value) {
    //         return Promise.reject(new Error('도메인(프로젝트명)을 입력해주세요.'))
    //     } else {
    //         const data = await checkProjectDomain(value)
    //         if (data.code === 409) {
    //             return Promise.reject(new Error(data.message))
    //         } else if (data.code === 400) {
    //             return Promise.reject(new Error(data.message))
    //         }
    //     }
    //     setProjectBuildInfo((prev) => ({
    //         ...prev,
    //         projectInfo: {
    //             ...prev.projectInfo,
    //             domain: `https://${value}.builzer.app`,
    //             projectName: value
    //         }
    //     }))
    //     return Promise.resolve()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const handleBuildTools = (e: RadioChangeEvent) => {
        setProjectBuildInfo((prev) => ({
            ...prev,
            projectSpec: {
                ...prev.projectSpec,
                buildTools: e.target.value
            }
        }))
    }
    
    const handleIsRunTest: CheckboxProps['onChange'] = (e) => {
        setProjectBuildInfo((prev) => ({
            ...prev,
            projectSpec: {
                ...prev.projectSpec,
                isRunTest: e.target.checked
            }
        }))
    }

    const handleIsUseDb: CheckboxProps['onChange'] = (e) => {
        setIsUseDb(e.target.checked)
        setProjectBuildInfo((prev) => ({
            ...prev,
            projectSpec: {
                ...prev.projectSpec,
                dbSpec: {
                    dbType: '',
                    dbVersion: '',
                    dbId: '',
                    dbPw: ''
                }
            }
        }))
    }
    
    const handleProjectDomain = (value: string) => {
        setDomain(value)
    }

    const handleDbId = (value: string) => {
        setDbId(value)

        if (projectBuildInfo.projectInfo.projectPlan === 'Pro') {
            setProjectBuildInfo((prev) => ({
                ...prev,
                projectSpec: {
                    ...prev.projectSpec,
                    dbSpec: {
                        ...prev.projectSpec.dbSpec,
                        dbId: value
                    }
                }
            }))
        }
    }

    const handleDbPw = (value: string) => {
        setDbPw(value)

        if (projectBuildInfo.projectInfo.projectPlan === 'Pro') {
            setProjectBuildInfo((prev) => ({
                ...prev,
                projectSpec: {
                    ...prev.projectSpec,
                    dbSpec: {
                        ...prev.projectSpec.dbSpec,
                        dbPw: value
                    }
                }
            }))
        }
    }

    const confirm: PopconfirmProps['onConfirm'] = () => {
        setProjectBuildInfo(() => ({
            ...projectBuildInfo,
            projectInfo: {
                ...projectBuildInfo.projectInfo,
                projectPlan: 'Pro'
            }
        }))
        message.success('업그레이드 완료')
    }

    useEffect(() => {
        if (data) {
            setProjectBuildInfo({
                projectInfo: {
                    projectName: data.projectInfo.projectName,
                    projectPlan: data.projectInfo.projectPlan,
                    domain: data.projectInfo.domain,
                    gitRepository: data.projectInfo.gitRepository
                },
                projectSpec: data.projectSpec
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(projectBuildInfo)
    }, [form, projectBuildInfo])

    useEffect(() => {
        if (!projectDefaultValue.projectSpecId) {
            setProjectBuildInfo((prev) => ({
                projectInfo: {
                    ...prev.projectInfo,
                    projectName: '',
                    domain: '',
                },
                projectSpec: {
                    ...prev.projectSpec,
                    buildTools: 'Gradle',
                    language: {
                        type: '',
                        version: '',
                        provider: ''
                    },
                    serverSpec: {
                        name: '',
                        cpu: '',
                        memory: '',
                        cloudProvider: '',
                        credit: 0
                    },
                    dbSpec: {
                        dbType: '',
                        dbVersion: '',
                        dbId: '',
                        dbPw: ''
                    },
                    isRunTest: true,
                    envList: []
                }
            }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (data === undefined || isLoading) return <></>

    return <div className='p-5'>
        <ProjectPlanButton plan={projectBuildInfo.projectInfo.projectPlan} />
        <Form
            className='mt-5 flex flex-col gap-10'
            name='projectSettingForm'
            initialValues={projectBuildInfo}
            form={form}
            autoComplete='off'
        >
            <div className='flex flex-col gap-5'>
                <ProjectSettingTitle title={'도메인'} />
                <div className='flex flex-row gap-5 w-full'>
                    <Form.Item
                        className='w-full'
                        name='projectInfo.domain'
                        rules={[
                            {
                                required: true,
                                message: '도메인(프로젝트명)을 입력해주세요.'            
                            }
                        ]}
                    >
                        <Input
                            defaultValue={domain}
                            size='large'
                            placeholder='도메인 또는 프로젝트명을 입력해주세요.'
                            addonAfter='.builzer.app'
                            addonBefore='https://'
                            onChange={(e) => handleProjectDomain(e.target.value)}
                        />
                    </Form.Item>
                    <Button
                        className='bg-black'
                        type='primary'
                        size='large'
                        onClick={() => domainValidMutation.mutate()}
                    >
                        유효성 검사
                    </Button>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <ProjectSettingTitle title={'언어/버전'} />
                <SelectLanguage projectBuildInfo={projectBuildInfo} setProjectBuildInfo={setProjectBuildInfo} />
            </div>
            <div className='flex flex-col gap-5'>
                <ProjectSettingTitle title={'빌드 툴'} />
                <Radio.Group
                    className='flex flex-row gap-10'
                    onChange={handleBuildTools}
                    value={projectBuildInfo.projectSpec.buildTools}
                >
                    <Radio value={'Gradle'}>
                        <span className='text-xl'>Gradle</span>
                    </Radio>
                    <Radio value={'Maven'}>
                        <span className='text-xl'>Maven</span>
                    </Radio>
                </Radio.Group>
            </div>
            <div className='flex flex-col gap-5'>
                <ProjectSettingTitle title={'서버스펙'} />
                <SelectServerSpec projectBuildInfo={projectBuildInfo} setProjectBuildInfo={setProjectBuildInfo} />
            </div>
            <div className='w-full flex flex-col gap-5 relative'>
                <div className='flex flex-row gap-2'>
                    <ProjectSettingTitle title={'데이터베이스'} />
                    <Checkbox
                        className='mt-3'
                        checked={isUseDb}
                        onChange={handleIsUseDb}
                    >
                        데이터베이스 세팅
                    </Checkbox>
                </div>
                <div>
                    <SelectDatabase projectBuildInfo={projectBuildInfo} setProjectBuildInfo={setProjectBuildInfo} isUseDb={isUseDb} />
                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-1/2'>
                            <span className='font-medium text-gray5'>아이디</span>
                            <Form.Item
                                name='projectSpec.dbSpec.dbId'
                                rules={[
                                    {
                                        required: projectBuildInfo.projectInfo.projectPlan === 'Lite' ? false : isUseDb ? true : false,
                                        message: '아이디를 입력해주세요.'
                                    }
                                ]}
                            >
                                <Input defaultValue={dbId} size='large' placeholder='아이디' onChange={(e) => handleDbId(e.target.value)} />
                            </Form.Item>
                        </div>
                        <div className='w-1/2'>
                            <span className='font-medium text-gray5'>비밀번호</span>
                            <Form.Item
                                name='projectSpec.dbSpec.dbPw'
                                rules={[
                                    {
                                        required: projectBuildInfo.projectInfo.projectPlan === 'Lite' ? false : isUseDb ? true : false,
                                        message: '비밀번호를 입력해주세요.'
                                    }
                                ]}
                            >
                                <Input.Password defaultValue={dbPw} size='large' placeholder='password' onChange={(e) => handleDbPw(e.target.value)} />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                {
                    projectBuildInfo.projectInfo.projectPlan === 'Lite' ? 
                    (
                        <div>
                            <div className='absolute z-10 top-12 w-[805px] h-[160px] bg-gray10 opacity-50 rounded-md'>
                            
                            </div>
                            <div className='absolute w-full top-20 z-20'>
                                <p className='font-bold text-2xl text-center'>PRO 전용</p>
                                <Popconfirm
                                    title='PRO 버전으로 업그레이드'
                                    description={<div className='w-[400px] mt-2'>PRO 버전으로 업그레이드 시 추가 서버 스펙 선택, 데이터베이스 설정이 가능합니다.<br /><p className='mt-4 font-medium'>⚠️ 추가 크레딧이 부과될 수 있습니다.</p ></div>}
                                    onConfirm={confirm}
                                    okText='업그레이드'
                                    cancelText='취소'
                                >
                                    <Button className='ml-[41%] bg-black mt-2' type='primary'>PRO로 업그레이드</Button>
                                </Popconfirm>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            {isUseDb ? 
                                (<></>)
                                :
                                (
                                    <div className='absolute z-10 top-12 w-[805px] h-[160px] bg-gray10 opacity-50 rounded-md' />
                                )
                            }
                        </div>
                    )
                }
            </div>
            <div className='flex flex-col gap-5'>
                <ProjectSettingTitle title={'테스트코드 실행 여부'} />
                <Checkbox
                    checked={projectBuildInfo.projectSpec.isRunTest}
                    onChange={handleIsRunTest}
                >
                    <span className='text-xl'>테스트코드 실행</span>
                </Checkbox>
            </div>
            <Button
                className='bg-black'
                type='primary'
                htmlType='submit'
                size='large'
                onClick={handleStartDeploy}
            >배포하기</Button>
        </Form>
    </div>
}