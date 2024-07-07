import { useMutation } from "react-query";
import { deleteProject, restartProject, stopProject } from "../../apis/setting";
import { Button, Input, Modal, message } from "antd";
import { useState } from "react";
import { useResetRecoilState } from "recoil";
import { selectedProjectState } from "../../recoil/atoms/common";
import { ExceptionOutlined } from "@ant-design/icons";

export default function ProjectGeneral({ ...props }) {
  const { project, projectSpecId, setProjectStatus } = props;
  const resetSelectedProject = useResetRecoilState(selectedProjectState);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activateOpen, setActivateOpen] = useState<boolean>(false);
  const [deactivateOpen, setDeactivateOpen] = useState<boolean>(false);
  const [leaveOpen, setLeaveOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>();

  const handleDeactivate = () => {
    stopProjectMutation.mutate();
  };

  const handleActivate = () => {
    restartProjectMutation.mutate();
  };

  const handleLeave = () => {
    deleteProjectMutation.mutate();
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteProjectMutation.mutate();
  };

  const stopProjectMutation = useMutation(
    ["stopProject"],
    () => stopProject(projectSpecId),
    {
      onSuccess: () => {
        message.success("비활성화되었습니다.");
        setProjectStatus("deactive");
      },
      onError: () => {},
    }
  );

  const restartProjectMutation = useMutation(
    ["restartProject"],
    () => restartProject(projectSpecId),
    {
      onSuccess: () => {
        message.success(
          <span>
            활성화되었습니다.{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => (window.location.href = "/management")}
            >
              MANAGEMENT
            </span>
            로 이동하여 재배포를 실행해주세요.
          </span>
        );
        setProjectStatus("active");
      },
      onError: () => {},
    }
  );

  const deleteProjectMutation = useMutation(
    ["deleteProject"],
    () => deleteProject(projectSpecId),
    {
      onSuccess: () => {
        message.success("프로젝트가 삭제되었습니다.");
        setConfirmLoading(true);
        setTimeout(() => {
          setLeaveOpen(false);
          setDeleteConfirmOpen(false);
          resetSelectedProject();
          window.location.href = "/overview";
        }, 2000);
      },
      onError: () => {},
    }
  );

  return (
    <div className="w-full h-full px-10 overflow-auto">
      <p className="text-3xl font-bold">일반</p>
      <div className="flex flex-row gap-3 justify-end pb-3 border-b-[1px] border-gray1" />
      <div className="mt-10">
        <div className="p-5 border-[1px] border-gray1 flex flex-row justify-between">
          <div>
            <p className="text-2xl font-bold">
              {project.projectInfo.projectStatus === "active"
                ? "프로젝트 비활성화"
                : "프로젝트 활성화"}
            </p>
            <p className="text-lg mt-2">
              {project.projectInfo.projectStatus === "active"
                ? "프로젝트 비활성화 관련 설명"
                : "프로젝트 활성화 관련 설명"}
            </p>
          </div>
          {project.projectInfo.projectStatus === "active" ? (
            <Button
              size="large"
              className="w-[100px] border-red text-red mt-2"
              onClick={() => setDeactivateOpen(true)}
            >
              비활성화
            </Button>
          ) : (
            <Button
              size="large"
              className="w-[100px] border-red text-red mt-2"
              onClick={() => setActivateOpen(true)}
            >
              활성화
            </Button>
          )}
        </div>
        <div className="p-5 border-[1px] border-gray1 flex flex-row justify-between">
          <div>
            <p className="text-2xl font-bold">
              {project.projectInfo.authority === "owner"
                ? "프로젝트 삭제하기"
                : "프로젝트 떠나기"}
            </p>
            <p className="text-lg mt-2">삭제/떠나기 관련 설명</p>
          </div>
          <Button
            size="large"
            className="w-[100px] border-red text-red mt-2"
            onClick={() =>
              project.projectInfo.authority === "owner"
                ? setDeleteOpen(true)
                : setLeaveOpen(true)
            }
          >
            {project.projectInfo.authority === "owner" ? "삭제" : "떠나기"}
          </Button>
        </div>
      </div>
      <Modal
        title="프로젝트 비활성화"
        open={deactivateOpen}
        onCancel={() => setDeactivateOpen(false)}
        onOk={handleDeactivate}
        footer={[
          <div className="w-full text-center" key="submit">
            <Button className="w-full" size="large" onClick={handleDeactivate}>
              비활성화
            </Button>
          </div>,
        ]}
      >
        <p>비활성화 관련 설명</p>
        <p className="text-center text-sm font-thin text-gray5 pt-5">
          상기 내용을 확인했으며, 동의합니다.
        </p>
      </Modal>
      <Modal
        title="프로젝트 활성화"
        open={activateOpen}
        onCancel={() => setActivateOpen(false)}
        onOk={handleActivate}
        footer={[
          <div className="w-full text-center" key="submit">
            <Button className="w-full" size="large" onClick={handleActivate}>
              활성화
            </Button>
          </div>,
        ]}
      >
        <p>활성화 관련 설명</p>
        <p className="text-center text-sm font-thin text-gray5 pt-5">
          상기 내용을 확인했으며, 동의합니다.
        </p>
      </Modal>
      <Modal
        title="프로젝트 떠나기"
        open={leaveOpen}
        onCancel={() => setLeaveOpen(false)}
        onOk={handleLeave}
        footer={[
          <div className="w-full text-center" key="submit">
            <Button className="w-full" size="large" onClick={handleLeave}>
              떠나기
            </Button>
          </div>,
        ]}
      >
        <p>떠나기 관련 설명</p>
        <p className="text-center text-sm font-thin text-gray5 pt-5">
          상기 내용을 확인했으며, 동의합니다.
        </p>
      </Modal>
      <Modal
        title="프로젝트 삭제"
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onOk={handleDelete}
        footer={[
          <div className="w-full text-center" key="submit">
            <Button
              className="w-full"
              size="large"
              key="submit"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>,
        ]}
      >
        <p>떠나기 관련 설명</p>
        <p className="text-center text-sm font-thin text-gray5 pt-5">
          상기 내용을 확인했으며, 동의합니다.
        </p>
      </Modal>
      <Modal
        title="프로젝트 삭제"
        open={deleteConfirmOpen}
        onCancel={() => setDeleteConfirmOpen(false)}
        onOk={handleDeleteConfirm}
        footer={[
          <div className="w-full text-center" key="submit">
            <Button
              className="w-full bg-black"
              size="large"
              key="submit"
              onClick={handleDeleteConfirm}
              disabled={
                value === project.projectInfo.projectName ? false : true
              }
              loading={confirmLoading}
              type="primary"
            >
              삭제
            </Button>
          </div>,
        ]}
      >
        <div className="w-full text-center">
          <p className="text-5xl">
            <ExceptionOutlined />
          </p>
          <p className="mt-5 mb-2 text-lg">
            삭제하시려면 아래 박스에{" "}
            <span className="font-bold">
              '{project.projectInfo.projectName}'
            </span>
            를 입력하세요
          </p>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="프로젝트 이름 입력"
            size="large"
          />
        </div>
      </Modal>
    </div>
  );
}
