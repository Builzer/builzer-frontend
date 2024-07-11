import { BrowserView } from "react-device-detect";
import { useRecoilValue } from "recoil";
import { projectInfoSimple } from "../types/project";
import { selectedProjectState } from "../recoil/atoms/common";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getProjectDetailInfo } from "../apis/overview";
import PipelineList from "../components/pipeline/PipelineList";

export default function PipelinePage() {
  const selectedProject =
    useRecoilValue<projectInfoSimple>(selectedProjectState);

  const { data, isLoading } = useQuery({
    queryKey: ["getProjectDetailInfo", selectedProject.projectId],
    queryFn: () => getProjectDetailInfo(selectedProject.projectId),
  });

  useEffect(() => {
    if (!selectedProject.projectId) {
      alert("관리할 프로젝트를 선택해주세요");
      window.location.href = "/overview";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      if (data.projectInfo.projectStatus !== "active") {
        alert("프로젝트 활성화를 진행해주세요.");
        window.location.href = "/overview";
      }
    }
  }, [data]);

  if (!data || isLoading || !selectedProject.projectId) return <></>;

  return (
    <div>
      <BrowserView>
        <PipelineList />
      </BrowserView>
    </div>
  );
}
