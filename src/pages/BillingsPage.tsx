import { BrowserView } from "react-device-detect";
import { useQuery } from "react-query";
import { getProjectList } from "../apis/overview";
import ProjectPlanButton from "../components/base/common/ProjectPlanButton";
import { useRecoilValue } from "recoil";
import { selectedProjectState } from "../recoil/atoms/common";
import { projectInfoSimple } from "../types/project";
import { useState } from "react";
import NextBillingInfo from "../components/billing/NextBillingInfo";

export default function BillingsPage() {
  const selectedProject =
    useRecoilValue<projectInfoSimple>(selectedProjectState);
  const [projectId, setProjectId] = useState<number | undefined>(
    selectedProject.projectId
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getProjectList"],
    queryFn: () => getProjectList(),
  });

  if (!data || isLoading) return <></>;

  return (
    <div>
      <BrowserView>
        <div className="relative w-full h-[620px] flex flex-row gap-5">
          <div className="relative z-10 ml-40 pt-5 w-full h-full px-10 overflow-auto">
            <p className="text-3xl font-bold">크레딧 결제내역</p>
            <div className="gap-3 pb-3 w-full border-b-[1px] border-gray1" />
            <div className="p-5">
              <div className="w-full overflow-y-hidden flex flex-row flex-wrap gap-5">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer flex flex-row gap-2 px-3 py-2 rounded-md ${
                      projectId === project.projectId ? "bg-gray1" : ""
                    }`}
                    onClick={() => setProjectId(project.projectId)}
                  >
                    <p>{project.projectName}</p>
                    <div className="bg-white">
                      <ProjectPlanButton plan={project.projectPlan} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <p className="font-bold text-2xl">결제 예정</p>
                <div className="w-full mt-2">
                  <NextBillingInfo projectId={projectId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserView>
    </div>
  );
}
