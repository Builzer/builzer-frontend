import { useRecoilValue } from "recoil";
import { projectInfoSimple } from "../types/project";
import { selectedProjectState } from "../recoil/atoms/common";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getProjectDetailInfo } from "../apis/overview";
import { BrowserView } from "react-device-detect";
import SettingSideMenu from "../components/base/common/SettingSideMenu";
import ProjectNotification from "../components/setting/ProjectNotification";
import ProjectCollaboratorSetting from "../components/setting/ProjectCollaboratorSetting";
import ProjectGeneral from "../components/setting/ProjectGeneral";

export default function SettingPage() {
  const selectedProject =
    useRecoilValue<projectInfoSimple>(selectedProjectState);
  const [managementMenu, setManagementMenu] = useState<string>("프로젝트 알림");

  const { data, isLoading } = useQuery({
    queryKey: ["getProjectDetailInfo", selectedProject.projectSpecId],
    queryFn: () => getProjectDetailInfo(selectedProject.projectSpecId),
  });

  useEffect(() => {
    if (!selectedProject.projectSpecId) {
      alert("관리할 프로젝트를 선택해주세요");
      window.location.href = "/overview";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data || isLoading) return <></>;

  return (
    <div>
      <BrowserView>
        <div className="w-full h-[620px] flex flex-row gap-5 p-2">
          <div className="w-1/5 mt-20 pl-5">
            <SettingSideMenu
              menuList={["프로젝트 알림", "프로젝트 팀원", "일반"]}
              setMenu={setManagementMenu}
              menu={managementMenu}
            />
          </div>
          <div className="w-4/5 pt-5">
            {managementMenu === "프로젝트 알림" ? (
              <ProjectNotification
                project={data}
                projectSpecId={selectedProject.projectSpecId}
              />
            ) : managementMenu === "프로젝트 팀원" ? (
              <ProjectCollaboratorSetting
                project={data}
                projectSpecId={selectedProject.projectSpecId}
              />
            ) : (
              <ProjectGeneral projectId={selectedProject.projectSpecId} />
            )}
          </div>
        </div>
      </BrowserView>
    </div>
  );
}
