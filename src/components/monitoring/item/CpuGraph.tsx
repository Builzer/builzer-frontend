import { ReloadOutlined } from '@ant-design/icons'
import { DatePicker } from 'antd'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getCpuUsageGraph } from '../../../apis/monitoring'

export default function CpuGraph({...props}) {
    const {project, projectId} = props
    const { RangePicker } = DatePicker
    const [selectedCpuTerm, setSelectedCpuTerm] = useState<string>('1h')
    const [isCpuSpin, setIsCpuSpin] = useState<boolean>(false)
    const [cpuRange, setCpuRange] = useState<Array<string>>(['', ''])
    const terms = ['1h', '6h', '12h', '1d', '1w']

    const { data, isLoading } = useQuery({
        queryKey: ['', cpuRange, selectedCpuTerm, isCpuSpin],
        queryFn: () => getCpuUsageGraph(projectId, selectedCpuTerm, cpuRange)
    })

    const handleReload = () => {
        setIsCpuSpin(true)
        setTimeout(() => {
            setIsCpuSpin(false)
        }, 1000)
    }

    if (!data || isLoading) return <></>

    return <div>
        <div className='flex flex-row justify-between p-3'>
            <div className='font-bold text-xl'>CPU</div>
            <div className='flex flex-row gap-3'>
                {
                    project.projectInfo.projectPlan === 'Lite' ?
                    (<></>)
                    :
                    (<RangePicker 
                        showTime={{ format: 'HH:mm' }}
                        format='YYYY-MM-DD HH:mm'
                        onChange={(value, dateString) => {
                            if (value === null) {
                                setCpuRange(['', ''])
                            } else {
                                setCpuRange(dateString)
                            }
                        }}
                        
                    />)
                }
                <div className='flex flex-row gap-2 px-4 py-1 font-thin border-[1px] border-gray1 rounded-lg'>
                    {
                        terms.map((term, index) => (
                            <div key={index} className={`cursor-pointer px-2 ${selectedCpuTerm === term ? 'font-medium' : ''}`} onClick={() => setSelectedCpuTerm(term)}>{term}</div>
                        ))
                    }
                    <span className='ml-5 cursor-pointer'><ReloadOutlined onClick={() => handleReload()} spin={isCpuSpin} /></span>
                </div>
            </div>
        </div>
        <div className='w-full h-[330px] bg-black'></div>
    </div>
}