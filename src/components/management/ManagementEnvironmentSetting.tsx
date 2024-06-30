import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'

export default function ManagementEnvironmentSetting({...props}) {
    const {project, setProject} = props
    const [envList, setEnvList] = useState<Array<any>>()

    const handleEnvList = (list: any) => {
        const tmpList: Array<any> = []
        list.environmentList.forEach((item: {env_key: string, env_value: string}) => {
            tmpList.push({
                [item.env_key]: item.env_value
            })
        })
        setProject(() => ({
            ...project,
            projectSpec: {
                ...project.projectSpec,
                envList: tmpList
            }
        }))
    }

    useEffect(() => {
        const tmpList: Array<any> = []
        project.projectSpec.envList.forEach((item: any, index: number) => {
            for(let key in item) {
                tmpList.push({
                    env_key: key,
                    env_value: item[key]
                })                
            }
        })
        setEnvList(tmpList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!envList) return <></>

    return <div className='w-full h-full px-10 overflow-auto'>
        <p className='text-3xl font-bold pb-3 border-b-[1px] border-gray1'>환경변수 세팅</p>
        <div className='p-5'>
            <Form
                name='environmentListForm'
                autoComplete='off'
                onFinish={(formValues: any) => {
                    handleEnvList(formValues)
                }}
            >
                <Form.List name='environmentList' initialValue={envList}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <div className='w-full flex flex-row gap-3' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'env_key']}
                                    >
                                    <Input size='large' className='w-[400px]' placeholder='key' />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'env_value']}
                                    >
                                    <Input size='large' className='w-[400px]' placeholder='value' />
                                    </Form.Item>
                                    <span className='mt-2'><MinusCircleOutlined style={{fontSize: 25}} onClick={() => remove(name)} /></span>
                                </div>
                            ))}
                            <Form.Item>
                                <Button size='large' type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                                    환경변수 추가
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <div className='text-end mr-[-50px] mt-10'>
                    <Button className='bg-black' type='primary' htmlType='submit' size='large' onClick={() => message.success('저장되었습니다.')}>저장</Button>
                </div>
            </Form>
        </div>
    </div>
}