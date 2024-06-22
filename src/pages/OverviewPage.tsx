import {BrowserView} from "react-device-detect";
import ProjectSelect from "../components/overview/ProjectSelect";

export default function OverviewPage() {
    return <div>
        <BrowserView className="w-full h-[620px] flex flex-row bg-gray1">
            <div className="w-1/2 h-full border-r-[0.5px] border-gray1">
                <ProjectSelect />
            </div>
            <div className="w-1/2 h-full overflow-hidden">
            </div>
        </BrowserView>
    </div>
}