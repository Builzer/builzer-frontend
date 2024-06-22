import React from "react"
import GitHubIcon from "@mui/icons-material/GitHub"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"

export default function Footer() {
    return <div className='flex flex-row mt-1 gap-2 float-right'>
        <GitHubIcon className='cursor-pointer'/>
        <LightModeOutlinedIcon className='cursor-pointer rounded-full bg-gray5'/>
        <DarkModeOutlinedIcon className='cursor-pointer'/>
    </div>
}