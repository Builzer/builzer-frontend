import { BrowserView, MobileView } from "react-device-detect";
import MainLeftSection from "../components/browser/main/MainLeftSection";
// import MainRightSection from "../components/browser/main/MainRightSection";

export default function MainPage() {
    return <div>
        <BrowserView className="flex flex-row">
            <div className="w-1/2 h-full border-r-[0.5px] border-gray1">
                <MainLeftSection />
            </div>
            <div className="w-1/2 h-full">
                {/* <MainRightSection /> */}
            </div>
        </BrowserView>
        <MobileView>모바일 메인</MobileView>
    </div>
}