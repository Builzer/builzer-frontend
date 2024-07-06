import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import GitRepositoryInfo from "../../components/overview/setting/GitRepositoryInfo";
import GitRepositoryFolder from "../../components/overview/setting/item/GitRepositoryFolder";
import { projectBuildInfo } from "../../types/project";
import {
  projectBuildState,
  projectCollaboratorsState,
} from "../../recoil/atoms/project";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { Select, notification } from "antd";
import { useEffect, useState } from "react";
import { selectItem } from "../../types/common";
import ProjectDetailSetting from "../../components/overview/setting/ProjectDetailSetting";

export default function OverviewSettingPage() {
  const [api, contextHolder] = notification.useNotification();
  const projectBuildInfo = useRecoilValue<projectBuildInfo>(projectBuildState);
  const [projectCollaborators, setProjectCollaborators] = useRecoilState<
    Array<selectItem>
  >(projectCollaboratorsState);
  const resetProjectCollaborators = useResetRecoilState(
    projectCollaboratorsState
  );
  const [value, setValue] = useState<string>("");
  const [options, setOptions] =
    useState<Array<selectItem>>(projectCollaborators);
  const [branchValue, setBranchValue] = useState<string>();

  const emailCheck = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!emailRegex.test(value)) {
      return false;
    } else {
      return true;
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      if (value !== "") {
        if (emailCheck(value)) {
          const tmpOption = {
            value: value,
            label: value,
          };

          setOptions([...options, tmpOption]);
          setValue("");
        } else {
          api["warning"]({
            message: "입력값이 유효하지 않습니다.",
            description: "올바른 이메일 형식을 입력해주세요.",
          });
        }
      }
    }
  };

  const handleSearch = (value: string) => {
    setValue(value);
  };

  const handleSelect = (value: any) => {
    if (
      projectBuildInfo.projectInfo.projectPlan === "Lite" &&
      options.length === 5
    ) {
      api["warning"]({
        message: "'Lite' 플랜은 최대 5명까지 초대 가능합니다.",
      });
    } else if (
      projectBuildInfo.projectInfo.projectPlan === "Pro" &&
      options.length === 50
    ) {
      api["warning"]({
        message: "'Lite' 플랜은 최대 50명까지 초대 가능합니다.",
      });
    } else {
      const tmpOption = {
        value: value,
        label: value,
      };
      setProjectCollaborators([...projectCollaborators, tmpOption]);
    }
  };

  const handleDeSelect = (value: any) => {
    setOptions(options.filter((option) => option.value !== value));
    setProjectCollaborators(
      projectCollaborators.filter((option) => option !== value)
    );
  };

  useEffect(() => {
    resetProjectCollaborators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full relative overflow-auto">
      {contextHolder}
      <div className="w-full h-[200px] bg-black" />
      <p className="absolute text-2xl top-3 left-40 text-white font-light">
        단계에 따라 프로젝트를 구성하고 배포해보세요!
      </p>
      <div className="flex flex-row gap-2 justify-between p-2">
        <div className="p-5 mt-[-140px] rounded-md border-[1px] border-gray1 w-[350px] h-[200px] bg-white">
          <GitRepositoryInfo setBranchValue={setBranchValue} />
          <GitRepositoryFolder
            branch={projectBuildInfo.projectSpec.branch}
            value={branchValue}
          />
        </div>
        <div className="absolute right-2 top-28 w-[400px]">
          <p className="text-white text-lg">
            <PersonAddAlt1OutlinedIcon />
            <span className="ml-2">팀원 추가</span>
          </p>
          <Select
            className="w-[390px] mt-2"
            mode="multiple"
            options={options}
            defaultValue={options}
            showSearch
            defaultActiveFirstOption={false}
            notFoundContent={null}
            onKeyDown={handleKeyDown}
            onSearch={handleSearch}
            onSelect={handleSelect}
            onDeselect={handleDeSelect}
            maxTagCount={"responsive"}
          />
        </div>
        <div className="w-full mb-2">
          <ProjectDetailSetting />
        </div>
      </div>
    </div>
  );
}
