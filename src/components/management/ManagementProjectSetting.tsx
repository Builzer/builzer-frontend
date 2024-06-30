import { FolderOutlined, GithubFilled, MergeOutlined } from '@ant-design/icons'
import { Button, Checkbox, CheckboxProps, Form, Input, Popconfirm, PopconfirmProps, Radio, RadioChangeEvent, message } from 'antd'
import { useEffect } from 'react'
import ProjectSettingTitle from '../base/project/ProjectSettingTitle'
import SelectLanguage from '../base/project/SelectLanguage'
import SelectServerSpec from '../base/project/SelectServerSpec'
import SelectDatabase from '../base/project/SelectDatabase'
import ProjectPlanButton from '../base/common/ProjectPlanButton'
import { projectBuildInfo } from '../../types/project'

export default function ManagementProjectSetting({...props}) {
    const {project, setProject, isUseDb, setIsUseDb} = props

    const handleBuildTools = (e: RadioChangeEvent) => {
        setProject(() => ({
            ...project,
            projectSpec: {
                ...project.projectSpec,
                buildTools: e.target.value
            }
        }))
    }
    
    const handleIsRunTest: CheckboxProps['onChange'] = (e) => {
        setProject(() => ({
            ...project,
            projectSpec: {
                ...project.projectSpec,
                isRunTest: e.target.checked
            }
        }))
    }

    const handleIsUseDb: CheckboxProps['onChange'] = (e) => {
        setIsUseDb(e.target.checked)
    }

    const handleDbId = (value: string) => {
        if (project.projectInfo.projectPlan === 'Pro') {
            setProject(() => ({
                ...project,
                projectSpec: {
                    ...project.projectSpec,
                    dbSpec: {
                        ...project.projectSpec.dbSpec,
                        dbId: value
                    }
                }
            }))
        }
    }

    const handleDbPw = (value: string) => {
        if (project.projectInfo.projectPlan === 'Pro') {
            setProject(() => ({
                ...project,
                projectSpec: {
                    ...project.projectSpec,
                    dbSpec: {
                        ...project.projectSpec.dbSpec,
                        dbPw: value
                    }
                }
            }))
        }
    }

    const confirm: PopconfirmProps['onConfirm'] = () => {
        setProject(() => ({
            ...project,
            projectInfo: {
                ...project.projectInfo,
                projectPlan: 'Pro'
            }
        }))
        message.success('업그레이드 완료')
    }
        
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue(project)
    }, [form, project, isUseDb])

    useEffect(() => {
        if (!isUseDb) {
            setProject(() => ({
                ...project,
                projectSpec: {
                    ...project.projectSpec,
                    dbSpec: {
                        dbType: '',
                        dbVersion: '',
                        dbId: '',
                        dbPw: ''
                    }
                }
            }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUseDb])

    return <div className='w-full h-full px-10 overflow-auto'>
        <p className='text-3xl font-bold'>프로젝트 세팅</p>
        <div className='flex flex-row gap-3 justify-end pb-3 border-b-[1px] border-gray1'>
            <div className='flex flex-row'>
                <GithubFilled style={{ fontSize: 25 }}/>
                <p className='ml-2 mt-1'>{project.projectInfo.gitRepository}</p>
            </div>
            <Button disabled>
                <MergeOutlined className='rotate-180' style={{ fontSize: 25 }}/>
                {project.projectSpec.branch}</Button>
            <Button disabled>
                <FolderOutlined style={{ fontSize: 25 }} />
                {project.projectSpec.rootPath}</Button>
        </div>
        <div className='p-5'>
        <ProjectPlanButton plan={project.projectInfo.projectPlan} />
        <Form
            className='mt-5 flex flex-col gap-10'
            name='projectSettingForm'
            initialValues={project}
            form={form}
            autoComplete='off'
        >
            <div className='flex flex-col gap-5'>
                <ProjectSettingTitle title={'도메인'} />
                <div className='flex flex-row gap-5 w-full'>
                    <Form.Item<projectBuildInfo>
                        className='w-full'
                        rules={[
                            {
                                required: true,
                                message: '도메인(프로젝트명)을 입력해주세요.'            
                            }
                        ]}
                    >
                        <Input
                            value={project.projectInfo.domain}
                            size='large'
                            placeholder='도메인 또는 프로젝트명을 입력해주세요.'
                            addonAfter='.builzer.app'
                            addonBefore='https://'
                            disabled
                        />
                    </Form.Item>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <ProjectSettingTitle title={'언어/버전'} />
                <SelectLanguage projectBuildInfo={project} setProjectBuildInfo={setProject} />
            </div>
            <div className='flex flex-col gap-5'>
                <ProjectSettingTitle title={'빌드 툴'} />
                <Radio.Group
                    className='flex flex-row gap-10'
                    onChange={handleBuildTools}
                    value={project.projectSpec.buildTools}
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
                <SelectServerSpec projectBuildInfo={project} setProjectBuildInfo={setProject} />
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
                    <SelectDatabase projectBuildInfo={project} setProjectBuildInfo={setProject} isUseDb={isUseDb} />
                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-1/2'>
                            <span className='font-medium text-gray5'>아이디</span>
                            <Form.Item<projectBuildInfo>
                                rules={[
                                    {
                                        required: project.projectInfo.projectPlan === 'Lite' ? false : isUseDb ? true : false,
                                        message: '아이디를 입력해주세요.'
                                    }
                                ]}
                            >
                                <Input value={project.projectSpec.dbSpec.dbId} size='large' placeholder='아이디' onChange={(e) => handleDbId(e.target.value)} />
                            </Form.Item>
                        </div>
                        <div className='w-1/2'>
                            <span className='font-medium text-gray5'>비밀번호</span>
                            <Form.Item<projectBuildInfo>
                                rules={[
                                    {
                                        required: project.projectInfo.projectPlan === 'Lite' ? false : isUseDb ? true : false,
                                        message: '비밀번호를 입력해주세요.'
                                    }
                                ]}
                            >
                                <Input.Password value={project.projectSpec.dbSpec.dbPw} size='large' placeholder='password' onChange={(e) => handleDbPw(e.target.value)} />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                {
                    project.projectInfo.projectPlan === 'Lite' ? 
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
                    checked={project.projectSpec.isRunTest}
                    onChange={handleIsRunTest}
                >
                    <span className='text-xl'>테스트코드 실행</span>
                </Checkbox>
            </div>
        </Form>
    </div>
    </div>
}