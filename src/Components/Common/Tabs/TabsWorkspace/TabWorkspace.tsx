import { Input, Tabs } from "antd";
import { useState } from "react";
import { CrossIcon, PlusIcon } from "../../Icons/Icons";
import TextAreaWrapper from "../../TextInput/TextArea/TextArea";
import { InputSet } from "../../../../Context/Types";
import Item from "antd/es/list/Item";
import Btn from "../../Buttons/Btn/Btn";
import { useWorkspaceContext } from "../../../../Context/WorkspaceContext/useWorkspaceContext";
import { useDataContext } from "../../../../Context/DataContext/useDataContext";
import { workspaceHelpers } from "../../../../Entities";

interface Props {
  selectedRequest: workspaceHelpers.RequestData | null;
  selectedRequestIndex: number;
  workspaceId: string;
}
const TabsWorkspace: React.FC<Props> = ({
  selectedRequest,
  selectedRequestIndex,
  workspaceId,
}) => {
  const { updateWorkspaceData } = useWorkspaceContext();
  const {
    handleAddInputSet,
    handleAddHeader,
    handleInputSetChange,
    handleInputHeaderChange,
    handleRemoveHeader,
    handleRemoveInputSet,
  } = useDataContext();
  const [activeTab, setActiveTab] = useState<string>("1");
  const handleParamAction = (reqIndex: number, index?: number) => {
    if (index !== undefined) {
      handleRemoveInputSet(workspaceId, reqIndex, index);
    } else {
      handleAddInputSet(workspaceId, reqIndex);
    }
  };

  const handleHeaderAction = (reqIndex: number, index?: number) => {
    if (index !== undefined) {
      handleRemoveHeader(workspaceId, reqIndex, index);
    } else {
      handleAddHeader(workspaceId, reqIndex);
    }
  };
  const renderParams = () => {
    if (!selectedRequest) return null;
    const { reqParams } = selectedRequest;
    return (
      <div className="sm:py-4 py-2">
        <div className="h-full">
          {reqParams.map((inputSet: InputSet, index: number) => (
            <div key={index} className=" w-full py-2 flex">
              <div className="flex items-center justify-center">
                <Btn
                  icon={<PlusIcon />}
                  onClick={() => handleParamAction(selectedRequestIndex)}
                  typeOf={"success"}
                />
              </div>
              <div className=" w-full flex ">
                <div className="grid grid-cols-6 w-full px-1 items-center  h-full ">
                  <div className="col-span-3 px-1">
                    <Input
                      value={inputSet.key}
                      onChange={(e) =>
                        handleInputSetChange(
                          workspaceId,
                          selectedRequestIndex,
                          index,
                          "key",
                          e.target.value
                        )
                      }
                      placeholder="KEY"
                    />
                  </div>
                  <div className="col-span-3 px-1">
                    <Input
                      placeholder="VALUE"
                      value={inputSet.value}
                      onChange={(e) =>
                        handleInputSetChange(
                          workspaceId,
                          selectedRequestIndex,
                          index,
                          "value",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className=" flex ">
                  <Btn
                    icon={<CrossIcon />}
                    onClick={() =>
                      handleParamAction(index, selectedRequestIndex)
                    }
                    typeOf={""}
                    danger={true}
                    disabled={reqParams.length === 1 ? true : false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderBody = () => {
    return (
      <div className=" py-2 w-full">
        <TextAreaWrapper
          workspaceId={workspaceId}
          updateRequest={updateWorkspaceData}
          reqIndex={selectedRequestIndex}
          selectedRequest={selectedRequest}
          placeholderText={"{ }"}
        />
      </div>
    );
  };
  const renderHeader = () => {
    if (!selectedRequest) return null;
    const { reqHeader } = selectedRequest;
    return (
      <div className="py-4">
        <div className="  ">
          {reqHeader.map((headerSet: InputSet, index: number) => (
            <div key={index} className=" w-full py-2 flex">
              <div className="flex items-center justify-center">
                <Btn
                  icon={<PlusIcon />}
                  onClick={() => handleHeaderAction(selectedRequestIndex)}
                  typeOf={"success"}
                />
              </div>
              <div className=" w-full flex ">
                <div className="grid grid-cols-6 w-full px-1 items-center  h-full">
                  <div className="col-span-3 px-1">
                    <Input
                      placeholder="VALUE"
                      value={headerSet.key}
                      onChange={(e) =>
                        handleInputHeaderChange(
                          workspaceId,
                          selectedRequestIndex,
                          index,
                          "key",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="col-span-3 px-1">
                    <Input
                      placeholder="VALUE"
                      value={headerSet.value}
                      onChange={(e) =>
                        handleInputHeaderChange(
                          workspaceId,
                          selectedRequestIndex,
                          index,
                          "value",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <div className=" flex ">
                  <Btn
                    icon={<CrossIcon />}
                    onClick={() =>
                      handleHeaderAction(index, selectedRequestIndex)
                    }
                    typeOf={""}
                    danger={true}
                    disabled={reqHeader.length === 1 ? true : false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="w-full border border-gray-500 rounded-2xl px-2 my-2">
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={handleTabChange}
        className="m-0 w-full font-semibold"
        tabBarStyle={{
          width: "100%",
          margin: "0px",
          justifyContent: "space-between",
          border: "0",
        }}
        indicator={{ size: 70 }}
      >
        <Item className="" tab="Params" key="1">
          {renderParams()}
        </Item>
        <Item tab="Body" key="2">
          {renderBody()}
        </Item>
        <Item tab="Header" key="3">
          {renderHeader()}
        </Item>
      </Tabs>
    </div>
  );
};

export default TabsWorkspace;
