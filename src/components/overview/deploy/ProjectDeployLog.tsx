import { Steps } from 'antd'
import { useEffect, useState } from 'react'
import { CheckCircleFilled, LoadingOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'

export const defaultStepItems = [
    {
        title: 'Deployment',
        status: 'process',
        icon: <LoadingOutlined />,
        content: 'Deployment Script'
    },
    {
        title: 'Staging',
        status: 'wait',
        icon: '',
        content: 'Staging Script'
    },
    {
        title: 'Production',
        status: 'wait',
        icon: '',
        content: 'Production Script'
    },
    {
        title: 'Done',
        status: 'wait',
        icon: '',
        content: 'Done Script'
    }
]
export default function ProjectDeployLog() {
    const [stepItems, setStepItems] = useState<Array<any>>(defaultStepItems)
    const [stepCurrent, setStepCurrent] = useState<number>(0)
    const [showIndex, setShowIndex] = useState<Array<boolean>>([true, false, false, false])

    const handleScriptUp = (index: number) => {
        const idxList = [...showIndex]
        idxList[index] = false
        setShowIndex(idxList)
    }

    const handleScriptDown = (index: number) => {
        const idxList = [...showIndex]
        idxList[index] = true
        setShowIndex(idxList)
    }

    useEffect(() => {
        let index = 1
        const stateIntervalId = setInterval(() => {
            let nextStepItems = [...stepItems]
            nextStepItems[index-1].status = 'finish'
            nextStepItems[index-1].icon = ''
            nextStepItems[index].status = 'process'
            nextStepItems[index].icon = <LoadingOutlined />

            setStepItems(nextStepItems)
            setStepCurrent(index)

            index++

            if (index === 4) {
                clearTimeout(stateIntervalId)
                nextStepItems[index-1].status = 'finish'
                nextStepItems[index-1].icon = ''
            }
        }, 5000)

        const scriptIntervalId = setInterval(() => {
            const contentParent = document.getElementById(stepItems[index-1].title)
            const newScript = document.createElement('p')
            newScript.innerText = stepItems[index-1].content + ' Added'

            contentParent?.appendChild(newScript)
            if (index === 4) {
                clearTimeout(scriptIntervalId)
            }
        }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const idxList = [...showIndex]
        idxList[stepCurrent] = true
        if (stepCurrent > 0) {
            idxList[stepCurrent-1] = false
        }
        setShowIndex(idxList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepCurrent])

    return <div className='w-full h-full overflow-auto scrollbar-hide'>
        <Steps current={stepCurrent} items={stepItems} className='w-full mt-10'/>
        <div className='w-full h-[500px] mt-5'>
            {
                stepItems.map((item, index) => (
                    <div key={index}>
                        <div className='w-full border-[1px] border-gray1 text-2xl font-bold'>
                            <p className='flex flex-row justify-between gap-3 py-3 px-2'>
                                <div className='flex flex-row gap-3'>
                                    {
                                        index < 3 && stepCurrent === index ? <LoadingOutlined />
                                        :
                                        (index < stepCurrent) || ((index === stepCurrent) && index === 3) ?
                                        <CheckCircleFilled className='text-green' style={{ fontSize: 30 }} />
                                        :
                                        '' 
                                    }
                                    <span>{item.title}</span>
                                </div>
                                {
                                    showIndex[index] ?
                                    <UpOutlined style={{ fontSize: 20 }} onClick={() => handleScriptUp(index)} />
                                    :
                                    <DownOutlined style={{ fontSize: 20 }} onClick={() => handleScriptDown(index)} />
                                }
                            </p>
                            <div 
                                className={`${showIndex[index] ? 'block' : 'hidden'} w-full h-[280px] overflow-y-auto scrollbar-hide text-[0.8rem] font-thin bg-gray10 text-white px-2`}
                                id={stepItems[index].title}
                            >
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
}