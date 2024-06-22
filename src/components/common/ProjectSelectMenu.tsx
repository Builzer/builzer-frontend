import React from "react"
import SendIcon from "@mui/icons-material/Send"
import { Input } from "antd"
import { useQuery } from "react-query"
import { getProjectList } from "../../apis/overview"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import { projectList } from "../../types/project"
import ProjectMenuList from "../base/common/ProjectMenuList"

export default function ProjectSelectMenu() {
    const [isMenuShow, setIsMenuShow] = useState<boolean>(false);
    const [projectList, setProjectList] = useState<Array<projectList>>([]);

    const { data, isLoading } = useQuery({
        queryKey: ['getProjectList'],
        queryFn: () => getProjectList()
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const searchText = e.target.value.toLocaleLowerCase().split(' ').join('')
        const tmpProjectList: Array<projectList> = []

        if (data) {
            data.projects.forEach((project) => {
                if (project.projectName.toLocaleLowerCase().split(' ').join('').includes(searchText)) {
                    tmpProjectList.push(project)
                }
            })

            setProjectList(tmpProjectList)
        }
    }

    useEffect(() => {
        if (data) {
            setProjectList(data.projects)
        }
    }, [data])

    if (!data || isLoading) return <></>

    return <div className='absolute ml-[-50px] mt-2'>
        <div className='cursor-pointer px-3 text-white w-[200px] h-[40px] bg-black rounded-md font-light' onClick={() => setIsMenuShow(!isMenuShow)}>
            <div className='flex flex-row justify-between'>
                <p className='text-xl justify-center py-2'>Select Project</p>
                <span className='py-2'><SendIcon/></span>
            </div>
        </div>
        {isMenuShow && <div className='w-[200px] h-[300px] font-light bg-white relative z-10 mt-1 rounded-md p-2 shadow-lg'>
            <Input placeholder='프로젝트명으로 검색' allowClear onChange={handleSearch}/>
            <ProjectMenuList projects={projectList} />
            <div className='flex flex-row justify-between p-1 cursor-pointer mt-2 hover:bg-gray1'>
                <NavLink to='/overview/select'>프로젝트 생성</NavLink>
                <ControlPointIcon />
            </div>
            <div className='flex flex-row justify-between p-1 cursor-pointer hover:bg-gray1'>
                <NavLink to='/manage'>프로젝트 관리</NavLink>
                <SettingsOutlinedIcon />
            </div>
        </div>}
    </div>
}