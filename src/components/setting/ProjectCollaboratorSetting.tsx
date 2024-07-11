import { useMutation, useQuery } from "react-query";
import {
  getProjectCollaborators,
  inviteCollaborators,
} from "../../apis/overview";
import { Button, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { selectItem } from "../../types/common";
import { projectCollaboratorsState } from "../../recoil/atoms/project";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function ProjectCollaboratorSetting({ ...props }) {
  const { project, projectId } = props;
  const [api, contextHolder] = notification.useNotification();
  const [value, setValue] = useState<string>("");
  const [projectCollaborators, setProjectCollaborators] = useRecoilState<
    Array<selectItem>
  >(projectCollaboratorsState);
  const [options, setOptions] = useState<Array<selectItem>>([]);
  const resetProjectCollaborators = useResetRecoilState(
    projectCollaboratorsState
  );
  const [inviteEmailList, setInviteEmailList] = useState<Array<string>>([]);
  const [reloadState, setReloadState] = useState<boolean>(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getCollagorators", projectId, reloadState],
    queryFn: () => getProjectCollaborators(projectId),
  });

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
    if (project.projectInfo.projectPlan === "Lite" && options.length === 5) {
      api["warning"]({
        message: "'Lite' 플랜은 최대 5명까지 초대 가능합니다.",
      });
    } else if (
      project.projectInfo.projectPlan === "Pro" &&
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
      setInviteEmailList((prev) => [...prev, value]);
    }
  };

  const handleDeSelect = (value: any) => {
    setOptions(options.filter((option) => option.value !== value));
    setProjectCollaborators(
      projectCollaborators.filter((option) => option !== value)
    );
    setInviteEmailList(inviteEmailList.filter((email) => email !== value));
  };

  const handleInviteMembers = () => {
    if (inviteEmailList.length > 0) {
      inviteCollaboratorsMutation.mutate();
    }
  };

  const inviteCollaboratorsMutation = useMutation(
    ["inviteCollaborators"],
    () => inviteCollaborators(projectId, inviteEmailList),
    {
      onSuccess: () => {
        resetProjectCollaborators();
        setReloadState((prev) => !prev);
      },
      onError: () => {},
    }
  );

  useEffect(() => {
    resetProjectCollaborators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data || isLoading) return <></>;

  return (
    <div className="w-full h-full px-10 overflow-auto">
      {contextHolder}
      <p className="text-3xl font-bold">프로젝트 팀원</p>
      <div className="flex flex-row gap-3 justify-end pb-3 border-b-[1px] border-gray1" />
      <div className="p-5">
        <div className="flex flex-row gap-5">
          <Select
            className="w-full mt-2"
            mode="multiple"
            options={options}
            showSearch
            defaultActiveFirstOption={false}
            notFoundContent={null}
            onKeyDown={handleKeyDown}
            onSearch={handleSearch}
            onDeselect={handleDeSelect}
            onSelect={handleSelect}
            maxTagCount={"responsive"}
            size="large"
            placeholder="🔎 초대할 팀원의 이메일 계정을 입력해주세요."
          />
          <Button
            size="large"
            className="mt-2 bg-black"
            type="primary"
            onClick={handleInviteMembers}
          >
            초대하기
          </Button>
        </div>
        <div className="w-full h-[430px] overflow-auto mt-5">
          {data.projectMembers.map((member, index) => (
            <div
              key={index}
              className={`border-b-[1px] border-gray1 px-5 py-2 h-[57px] flex flex-row justify-between ${
                member.isAccepted === "decline" ? "bg-gray1 text-gray6" : ""
              }`}
            >
              <p className="pt-2">{member.gitEmail}</p>
              {member.isAccepted === "accept" ? (
                <Button size="large" type="primary">
                  OUT
                </Button>
              ) : member.isAccepted === "pending" ? (
                <div className="flex flex-row gap-3">
                  <Button size="large">CANCEL</Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
