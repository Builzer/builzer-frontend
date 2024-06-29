import { useQuery } from 'react-query'
import { getDatabaseList } from '../../../apis/overview'
import { useEffect, useState } from 'react'
import { Form, Select } from 'antd'

export default function SelectDatabase({...props}) {
    const {projectBuildInfo, setProjectBuildInfo, isUseDb} = props
    const [types, setTypes] = useState<Array<string>>()
    const [versions, setVersions] = useState<any>()
    const [databaseType, setDatabaseType] = useState<string>()
    const [databaseVersion, setDatabaseVersion] = useState<string>()

    const { data, isLoading } = useQuery({
        queryKey: ['getDatabaseList'],
        queryFn: () => getDatabaseList()
    })

    const handleDatabaseType = (value: string) => {
        setDatabaseType(value)
        setDatabaseVersion(versions[value][0])

        setProjectBuildInfo(() => ({
            ...projectBuildInfo,
            projectSpec: {
                ...projectBuildInfo.projectSpec,
                dbSpec: {
                    ...projectBuildInfo.projectSpec.dbSpec,
                    dbType: value,
                    dbVersion: versions[value][0],
                }
            }
        }))
    }

    const handleDatabaseVersion = (value: string) => {
        setDatabaseVersion(value)

        setProjectBuildInfo(() => ({
            ...projectBuildInfo,
            projectSpec: {
                ...projectBuildInfo.projectSpec,
                dbSpec: {
                    ...projectBuildInfo.projectSpec.dbSpec,
                    dbVersion: value,
                }
            }
        }))
    }

    useEffect(() => {
        if (data) {
            const tmpTypes: Array<string> = []
            const tmpVersions: any = {}

            data.forEach((dbSpec) => {
                tmpTypes.push(dbSpec.type)
                tmpVersions[dbSpec.type] = dbSpec.version
            })

            setTypes(tmpTypes)
            setVersions(tmpVersions)

            if (projectBuildInfo.projectSpec.dbSpec.dbType === '') {
                if (projectBuildInfo.projectInfo.projectPlan === 'Pro' && isUseDb) {
                    setProjectBuildInfo(() => ({
                        ...projectBuildInfo,
                        projectSpec: {
                            ...projectBuildInfo.projectSpec,
                            dbSpec: {
                                ...projectBuildInfo.projectSpec.dbSpec,
                                dbType: tmpTypes[0],
                                dbVersion: tmpVersions[tmpTypes[0]][0],
                            }
                        }
                    }))
                }
                
                setDatabaseType(tmpTypes[0])
                setDatabaseVersion(tmpVersions[tmpTypes[0]][0])
            } else {
                setDatabaseType(projectBuildInfo.projectSpec.dbSpec.dbType)
                setDatabaseVersion(projectBuildInfo.projectSpec.dbSpec.dbVersion)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, projectBuildInfo, isUseDb])

    if (!data || isLoading || !types || !versions || !databaseType || !databaseVersion) return <></>

    return <div>
        <div className='flex flex-row gap-5 w-full'>
        <Form.Item
            className='w-1/2'
        >
            <Select
                defaultValue={types[0]}
                value={databaseType}
                options={types.map((type) => ({ label: type, value: type}))}
                onChange={handleDatabaseType}
                size='large'
            />
        </Form.Item>
        <Form.Item
            className='w-1/2'
        >
            <Select
                value={databaseVersion}
                options={versions[databaseType].map((version: any) => ({ label: version, value:version }))}
                onChange={handleDatabaseVersion}
                size='large'
            />
        </Form.Item>
        </div>
    </div>
}