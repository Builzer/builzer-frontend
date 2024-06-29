import { useQuery } from 'react-query'
import { getLanguageList } from '../../../apis/overview'
import { useEffect, useState } from 'react'
import { Form, Select } from 'antd'

export default function SelectLanguage({...props}) {
    const {projectBuildInfo, setProjectBuildInfo} = props
    const [types, setTypes] = useState<Array<string>>()
    const [versions, setVersions] = useState<any>()
    const [providers, setProviders] = useState<any>()
    const [languageType, setLanguageType] = useState<string>()
    const [languageVersion, setLanguageVersion] = useState<string>()
    const [languageProvider, setLanguageProvider] = useState<string>()

    const { data, isLoading } = useQuery({
        queryKey: ['getLanguageList'],
        queryFn: () => getLanguageList()
    })

    const handleLanguageType = (value: string) => {
        setLanguageType(value)
        setLanguageVersion(versions[value][0])
        setLanguageProvider(providers[value][0])

        setProjectBuildInfo(() => ({
            ...projectBuildInfo,
            projectSpec: {
                ...projectBuildInfo.projectSpec,
                language: {
                    type: value,
                    version: versions[value][0],
                    provider: providers[value][0]
                }
            }
        }))
    }

    const handleLanguageVersion = (value: string) => {
        setLanguageVersion(value)

        setProjectBuildInfo(() => ({
            ...projectBuildInfo,
            projectSpec: {
                ...projectBuildInfo.projectSpec,
                language: {
                    ...projectBuildInfo.projectSpec.language,
                    version: value,
                }
            }
        }))
    }

    const handleLanguageProvider = (value: string) => {
        setLanguageProvider(value)

        setProjectBuildInfo(() => ({
            ...projectBuildInfo,
            projectSpec: {
                ...projectBuildInfo.projectSpec,
                language: {
                    ...projectBuildInfo.projectSpec.language,
                    provider: value,
                }
            }
        }))
    }

    useEffect(() => {
        if (data) {
            const tmpTypes: Array<string> = []
            const tmpVersions: any = {}
            const tmpProviders: any = {}

            data.forEach((language) => {
                tmpTypes.push(language.type)
                tmpVersions[language.type] = language.version
                tmpProviders[language.type] = language.provider
            })

            setTypes(tmpTypes)
            setVersions(tmpVersions)
            setProviders(tmpProviders)

            if (projectBuildInfo.projectSpec.language.type === '' && projectBuildInfo.projectSpec.language.version === '' && projectBuildInfo.projectSpec.language.provider === '') {
                setProjectBuildInfo(() => ({
                    ...projectBuildInfo,
                    projectSpec: {
                        ...projectBuildInfo.projectSpec,
                        language: {
                            type: tmpTypes[0],
                            version: tmpVersions[tmpTypes[0]][0],
                            provider: tmpProviders[tmpTypes[0]][0]
                        }
                    }
                }))

                setLanguageType(tmpTypes[0])
                setLanguageVersion(tmpVersions[tmpTypes[0]][0])
                setLanguageProvider(tmpProviders[tmpTypes[0]][0])
            } else {
                setLanguageType(projectBuildInfo.projectSpec.language.type)
                setLanguageVersion(projectBuildInfo.projectSpec.language.version)
                setLanguageProvider(projectBuildInfo.projectSpec.language.provider)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, projectBuildInfo])

    if (!data || isLoading || !types || !languageType || !versions || !languageVersion || !providers || !languageProvider) return <></>

    return <div className='flex flex-row gap-5 w-full'>
        <Form.Item
            className='w-1/3'
        >
            <Select
                defaultValue={types[0]}
                options={types.map((type) => ({ label: type, value: type}))}
                onChange={handleLanguageType}
                size='large'
            />
        </Form.Item>
        <Form.Item
            className='w-1/3'
        >
            <Select
                value={languageVersion}
                options={versions[languageType].map((version: any) => ({ label: version, value:version }))}
                onChange={handleLanguageVersion}
                size='large'
            />
        </Form.Item>
        <Form.Item
            className='w-1/3'
        >
            <Select
                value={languageProvider}
                options={providers[languageType].map((provider: any) => ({ label: provider, value:provider }))}
                onChange={handleLanguageProvider}
                size='large'
            />
        </Form.Item>
    </div>
}