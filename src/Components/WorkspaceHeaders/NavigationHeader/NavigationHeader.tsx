import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowBackIcon,
  DeleteIcon,
  PenIcon,
  SettingsIcon,
} from "../../Common/Icons/Icons";
import { workspaceHelpers } from "../../../Entities";
import { message } from "antd";
import Btn from "../../Common/Buttons/Btn/Btn";
import ModalComponent from "../../Common/Modal/ModalComponent";
import PopConfirm from "../../Common/PopConfirm/PopConfirm";

interface NavigationHeaderProps {
  activeWorkspace: workspaceHelpers.Workspace;
  updateWorkspaceMetaData: (
    workspaceId: string,
    key: keyof workspaceHelpers.Workspace,
    value: string
  ) => void;
  deleteWorkspace: (id: string) => void;
}

const NavigationHeader: FC<NavigationHeaderProps> = ({
  activeWorkspace,
  updateWorkspaceMetaData,
  deleteWorkspace,
}) => {
  const navigate = useNavigate();
  const confirm = (activeWorkspaceId: string) => {
    deleteWorkspace(activeWorkspaceId);
    message.success("Workspace Deleted Successfully.");
    navigate("/");
  };
  return (
    <>
      <div className="px-4 flex w-full items-center justify-between">
        <div className="flex items-center w-[20%] pr-2 justify-between ">
          <div className="">
            <Link to="/">
              <Btn text={""} typeOf={"primary"} icon={<ArrowBackIcon />} />
            </Link>
          </div>
          <div className="sm:px-8 px-2 ">
            <div className="sm:text-sm text-xs text-white">
              {activeWorkspace.name}
            </div>
          </div>
          <div className="">
            <ModalComponent
              btnType="primary"
              title="Change Workspace Name"
              initialValue={""}
              onUpdate={(newName) =>
                updateWorkspaceMetaData(activeWorkspace.id, "name", newName)
              }
              icon={<PenIcon />}
              placeholder="My Workspace..."
            />
          </div>
        </div>
        <div className="flex justify-between w-[80%] pl-2">
          <div className="px-2">
            <PopConfirm
              btnText={<DeleteIcon />}
              description={
                "Are you sure that you want to delete this workspace?"
              }
              okText={"Delete"}
              cancelText={"Cancel"}
              confirm={() => {
                confirm(activeWorkspace.id);
              }}
              title={"Delete Workspace"}
            />
          </div>
          <div className="">
            <ModalComponent
              title="Update Workspace Description."
              initialValue={""}
              onUpdate={(newDescription) => {
                updateWorkspaceMetaData(
                  activeWorkspace.id,
                  "description",
                  newDescription
                );
              }}
              btnType={"primary"}
              icon={<SettingsIcon />}
              placeholder={"New description..."}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationHeader;
