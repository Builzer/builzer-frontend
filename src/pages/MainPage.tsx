import React from "react"
import { BrowserView, MobileView } from "react-device-detect"
import MainLeftSection from "../components/main/MainLeftSection"
import MainRightSection from "../components/main/MainRightSection"

export default function MainPage() {
    return <div>
        <BrowserView className='flex flex-row h-[620px]'>
            <div className='w-1/2 h-full border-r-[0.5px] border-gray1'>
                <MainLeftSection />
            </div>
            <div className='w-1/2 h-full overflow-hidden'>
                <MainRightSection />
            </div>
        </BrowserView>
        <MobileView>모바일 메인</MobileView>
    </div>
}