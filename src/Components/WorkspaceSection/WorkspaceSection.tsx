import { useEffect, useState } from "react";
import {
  CrossIcon,
  DeleteIcon,
  PeopleIcon,
  PlusIcon,
  SettingsIcon,
  ThreeDotsIcon,
} from "../Common/Icons/Icons";
import SearchbarPrimary from "../Common/TextInput/SearchBarPrimary/SearchBarPrimary";
import BtnReq from "../Common/Buttons/BtnReq/BtnReq";
import TabsWorkspace from "../Common/Tabs/TabsWorkspace/TabWorkspace";
import TextareaPrimary from "../Common/TextInput/TextareaPrimary/TextareaPrimary";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import BtnPrimary from "../Common/Buttons/BtnPrimary/BtnPrimary";
// import ThemeToggle from "../ThemeToggle/ThemeToggle";
import WorkspaceNavSm from "../WorkspaceNavSm/WorkspaceNavSm";
import { RequestData } from "../../Context/Types";
import { useWorkspaceContext } from "../../Context/WorkspaceContext/useWorkspaceContext";
import { useDataContext } from "../../Context/DataContext/useDataContext";
import { useUiContext } from "../../Context/UiContext/useUiContext";
import PopConfirm from "../Common/PopConfirm/PopConfirm";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {}

const WorkspaceSection: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { activeWorkspace, updateWorkspaceData } = useWorkspaceContext();
  const { addRequest, removeRequestAtIndex, activeReq, setActiveReq } =
    useDataContext();
  const { updateActiveReq, deleteWorkspace } = useWorkspaceContext();
  const { setIsLoading, isLoading } = useUiContext();
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(activeReq);
  const [selectedRequest, setSelectedRequest] = useState(
    activeWorkspace.reqData[activeReq]
  );
  const [response, setResponse] = useState("");
  const handleRequestClick = (req: RequestData, index: number) => {
    setSelectedRequest(req);
    setSelectedRequestIndex(index);
    setActiveReq(index);
    updateActiveReq(activeWorkspace.id, index);
  };

  useEffect(() => {
    setSelectedRequestIndex(activeWorkspace.selectedreq);
    setSelectedRequest(activeWorkspace.reqData[activeWorkspace.selectedreq]);
    setActiveReq(activeWorkspace.selectedreq);
  }, [activeWorkspace.id]);

  useEffect(() => {
    if (selectedRequest) {
      setResponse(selectedRequest.response || "");
    } else {
      setResponse("");
    }
  }, [selectedRequest?.response, selectedRequest]);

  const confirm = (activeWorkspaceId: string) => {
    deleteWorkspace(activeWorkspaceId);
    message.success("Workspace Deleted Successfully.");
    navigate("/");
  };

  return (
    <div className=" flex flex-col px-4 h-full">
      <div className="sm:block hidden">
        <div className="flex items-center justify-between py-4">
          <div className="flex">
            <div className="border">
              <BtnPrimary
                text=""
                typeOf={"primary"}
                icon={<SettingsIcon className="text-xl" />}
              />
            </div>
            {/* <div className="border">
              <PopConfirm btnText={<DeleteIcon />} />
            </div> */}
          </div>
          <div className="">
            {/* <ThemeToggle setIsDark={setIsDark} /> */}
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
        </div>
        <div className="w-full py-1 justify-center sm:flex hidden">
          <BtnPrimary
            typeOf={"primary"}
            text={"Invite"}
            icon={<PeopleIcon className="text-lg" />}
          />
        </div>
      </div>
      <div className=" sm:hidden block">
        <WorkspaceNavSm activeWorkspace={activeWorkspace} />
      </div>
      <div className=" flex overflow-x-auto">
        {activeWorkspace.reqData.map((req, index) => (
          <div
            key={index}
            className={`pr-1 pt-2 btn-req ${
              selectedRequestIndex === index ? "btn-req-active" : ""
            }`}
          >
            <div
              onClick={() => {
                handleRequestClick(req, index);
              }}
            >
              <BtnReq
                onClickFunction={() =>
                  removeRequestAtIndex(index, activeWorkspace.id)
                }
                text={req.endPoint ? req.endPoint : "http://google.com"}
                req={req.method ? req.method.toUpperCase() : "GET"}
                icon={<CrossIcon className="text-gray-300" />}
                indexToRemove={index}
              />
            </div>
          </div>
        ))}

        <div className="a  flex items-end">
          <div className="px-1">
            <BtnPrimary
              onClickFunction={() => addRequest(activeWorkspace.id)}
              typeOf={"primary"}
              icon={<PlusIcon />}
            />
          </div>
          <div className=" flex items-center ">
            <BtnPrimary text={""} icon={<ThreeDotsIcon />} />
          </div>
        </div>
      </div>
      <div className=" ">
        <div className="py-4 font-normal">
          <p>Untitled Request</p>
        </div>
        <div className="a">
          <div className="w-full">
            <SearchbarPrimary
              updateRequest={updateWorkspaceData}
              setIsLoading={setIsLoading}
              selectedRequest={selectedRequest}
              selectedRequestIndex={selectedRequestIndex}
              option1={"GET"}
              option2={"POST"}
              activeWorkspaceId={activeWorkspace.id}
            />
          </div>
        </div>
      </div>
      <div className="a">
        <TabsWorkspace
          workspaceId={activeWorkspace.id}
          selectedRequestIndex={selectedRequestIndex}
          selectedRequest={selectedRequest}
        />
      </div>
      <div className="flex-grow">
        {response ? (
          <TextareaPrimary
            isLoading={isLoading}
            data={response}
            selectedRequest={selectedRequest}
            selectedRequestIndex={selectedRequestIndex}
          />
        ) : (
          <EmptyComponent />
        )}
      </div>
    </div>
  );
};

export default WorkspaceSection;
