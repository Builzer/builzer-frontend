import React from "react"
import { projectList } from "../../../types/project"

export default function ProjectMenuList({...props}) {
    const {projects} = props

    return <div className='mt-2 h-[170px] border-b-2 border-gray1 overflow-y-auto pb-2'>
        {projects.map((project: projectList, index: number) => (
            <div key={index} className='p-1 cursor-pointer hover:bg-gray1'>{project.projectName}</div>
        ))}
    </div>
}