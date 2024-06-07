import { BrowserView, MobileView } from "react-device-detect";
export default function MainPage() {
    return <div>
        <BrowserView>브라우저 메인</BrowserView>
        <MobileView>모바일 메인</MobileView>
    </div>
}