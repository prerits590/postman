import { useEffect, useState } from "react";
import {
  CommentIcon,
  CrossIcon,
  PenIcon,
  PlusIcon,
  SaveIcon,
  ThreeDotsIcon,
} from "../Common/Icons/Icons";
import { useWorkspaceContext } from "../../Context/WorkspaceContext/useWorkspaceContext";
import { useDataContext } from "../../Context/DataContext/useDataContext";
import { useUiContext } from "../../Context/UiContext/useUiContext";
import { v4 as uuidv4 } from "uuid";
import { workspaceHelpers } from "../../Entities";
import RequestInputBar from "../Common/TextInput/RequestInputBar/RequestInputBar";
import TabsWorkspace from "../Common/Tabs/TabsWorkspace/TabWorkspace";
import EmptyComponent from "../EmptyComponent/EmptyComponent";
import Btn from "../Common/Buttons/Btn/Btn";
import WorkspaceNavSm from "../WorkspaceNavSm/WorkspaceNavSm";
import ModalComponent from "../Common/Modal/ModalComponent";
import RequestAction from "../RequestAction/RequestAction";
import TabsResponse from "../Common/Tabs/TabsResponse/TabsResponse";

interface Props {}

const WorkspaceSection: React.FC<Props> = () => {
  const { activeWorkspace, updateWorkspaceData } = useWorkspaceContext();
  const {
    activeReq,
    userSelectedActiveReq,
    addRequest,
    setActiveReq,
    removeReqFromActiveReqArray,
    setUserSelectedReq,
  } = useDataContext();
  const { updateActiveReq } = useWorkspaceContext();
  const { setIsLoading, isLoading } = useUiContext();
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(activeReq);
  const [selectedRequest, setSelectedRequest] = useState(
    activeWorkspace.reqData.find(
      (req) => req.id === userSelectedActiveReq[0]
    ) || null
  );
  // console.log(activeWorkspace, "ACTIVE WORKSPACE");
  const [response, setResponse] = useState<any>({});
  const handleRequestClick = (
    req: workspaceHelpers.RequestData,
    index: number
  ) => {
    setSelectedRequest(req);
    setSelectedRequestIndex(index);
    setActiveReq(index);
    updateActiveReq(activeWorkspace.id, index);
  };

  const filteredRequests = activeWorkspace.reqData.filter((req) =>
    userSelectedActiveReq.includes(req.id)
  );

  useEffect(() => {
    if (selectedRequest) {
      setResponse(selectedRequest.response || {});
    } else {
      setResponse({});
    }
  }, [selectedRequest?.response, selectedRequest]);

  useEffect(() => {
    // console.log("RAN--------->>>>>>>>>>>>>");
    const newSelectedRequest = activeWorkspace.reqData[selectedRequestIndex];
    if (
      newSelectedRequest &&
      userSelectedActiveReq.includes(newSelectedRequest.id)
    ) {
      // console.log(newSelectedRequest, "NEW SELECTED REQ");
      setSelectedRequest(newSelectedRequest);
      setActiveReq(selectedRequestIndex);
      updateActiveReq(activeWorkspace.id, selectedRequestIndex);
    } else {
      const selectedIndexInFiltered = filteredRequests.findIndex(
        (req) => newSelectedRequest && req.id === newSelectedRequest.id
      );

      if (selectedIndexInFiltered !== -1) {
        setSelectedRequest(filteredRequests[selectedIndexInFiltered]);
        setSelectedRequestIndex(selectedIndexInFiltered);
      } else {
        if (filteredRequests.length > 0) {
          const newSelectedRequest = filteredRequests[0];
          setSelectedRequest(newSelectedRequest);
          setSelectedRequestIndex(0);
          setActiveReq(0);
          updateActiveReq(activeWorkspace.id, 0);
        } else {
          setSelectedRequest(null);
          setSelectedRequestIndex(-1);
        }
      }
    }
    // console.log(selectedRequest, selectedRequestIndex);
  }, [userSelectedActiveReq]);

  const handleAddRequest = () => {
    const requestId = uuidv4();
    addRequest(activeWorkspace.id, requestId);
    setUserSelectedReq((prev) => [...prev, requestId]);
  };

  const handleRemoveRequest = (reqId: string) => {
    const index = userSelectedActiveReq.findIndex((req) => req === reqId);
    if (index !== -1) {
      removeReqFromActiveReqArray(index);
    }
  };
  // console.log(selectedRequest, selectedRequestIndex);
  console.log(response, "RESPONSE--->>>>>");
  return (
    <div className=" flex flex-col px-4 h-full">
      <div className="sm:block hidden"></div>
      <div className=" sm:hidden block">
        <WorkspaceNavSm activeWorkspace={activeWorkspace} />
      </div>
      <div className=" flex overflow-x-auto">
        {filteredRequests.map((req, index) => (
          <div
            key={index}
            className={`mr-1 pt-1 btn-req ${
              selectedRequestIndex === index ? "btn-req-active" : ""
            }`}
          >
            <div
              onClick={() => {
                handleRequestClick(req, index);
              }}
            >
              <RequestAction
                onClick={() => handleRemoveRequest(req.id)}
                text={req.endPoint ? req.endPoint : "http://google.com"}
                req={req.method ? req.method.toUpperCase() : "GET"}
                icon={<CrossIcon className="text-gray-300" />}
                indexToRemove={index}
              />
            </div>
          </div>
        ))}

        <div className="a pb-2 flex items-end">
          <div className="pr-1">
            <Btn
              onClick={handleAddRequest}
              typeOf={"primary"}
              icon={<PlusIcon />}
            />
          </div>
          <div className=" flex items-center ">
            <Btn icon={<ThreeDotsIcon />} />
          </div>
        </div>
      </div>

      <div className=" ">
        <div className="py-2 font-normal flex items-center justify-between">
          <div>
            <p>{selectedRequest?.title}</p>
          </div>
          <div className=" flex">
            <div>
              <Btn text={"Save"} icon={<SaveIcon />} />
            </div>
            <div>
              <ModalComponent
                disabled={userSelectedActiveReq.length === 0 ? true : false}
                btnType=""
                title="Change Request Name"
                initialValue={""}
                onUpdate={(newName) =>
                  updateWorkspaceData(
                    activeWorkspace.id,
                    selectedRequestIndex,
                    "title",
                    newName
                  )
                }
                icon={<PenIcon />}
                placeholder="My Request"
              />
            </div>
            <div>
              <Btn icon={<CommentIcon />} />
            </div>
          </div>
        </div>
        <div className="a">
          <div className="w-full">
            <RequestInputBar
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
        {Object.keys(response).length > 0 ? (
          <TabsResponse data={response} isLoading={isLoading} />
        ) : (
          <EmptyComponent />
        )}
      </div>
    </div>
  );
};

export default WorkspaceSection;
