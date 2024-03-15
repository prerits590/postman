import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import Accordian from "../../Accordian/Accordian";
import DividerLight from "../../Divider/Divider";
import Item from "antd/es/list/Item";
import { useWorkspaceContext } from "../../../../Context/WorkspaceContext/useWorkspaceContext";
import { DeleteIcon } from "../../Icons/Icons";
import PopConfirm from "../../PopConfirm/PopConfirm";
import { useDataContext } from "../../../../Context/DataContext/useDataContext";
import SwitchWrapper from "../../Switch/SwitchWrapper";
import SearchBar from "../../TextInput/SearchBar/SearchBar";
import Btn from "../../Buttons/Btn/Btn";

const ReqTabSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const { activeWorkspace } = useWorkspaceContext();
  const [history, setHistory] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const { removeRequestAtIndex, setUserSelectedReq, userSelectedActiveReq } =
    useDataContext();
  // console.log(userSelectedActiveReq, "User selected active req");
  const confirm = (index: number) => {
    removeRequestAtIndex(index, activeWorkspace.id);
    message.success("Request Deleted Successfully.");
  };
  const handleAddRequest = (reqId: string) => {
    if (userSelectedActiveReq.includes(reqId)) {
      message.error("Request is already there!");
      return;
    }

    setUserSelectedReq((prev) => [...prev, reqId]);
  };
  useEffect(() => {
    setHistory(activeWorkspace.reqData);
  }, [activeWorkspace]);
  // console.log(history, "HISTORY");
  const renderHistory = () => {
    return (
      <div className="">
        <div className=" flex justify-between items-center">
          <div className="flex items-center py-2 px-4">
            <div className="flex items-center">
              <SwitchWrapper size={"small"} />
            </div>
            <div className="pl-2">
              <p className="text-xs font-semibold">Save Responses</p>
            </div>
          </div>
          <div className="px-4">
            <Btn
              onClick={() => {
                setHistory([]);
              }}
              text="Clear All"
            />
          </div>
        </div>
        <DividerLight />
        <div>
          <Accordian items={history} />
        </div>
      </div>
    );
  };
  const renderCollections = () => {
    return <div className="flex justify-center font-bold">Collections</div>;
  };
  const renderApis = () => {
    return (
      <div className="">
        {activeWorkspace.reqData.map((req, index) => (
          <div key={index} className="list-style">
            <ul className="workspace-list ">
              <li className="workspace-card px-6 flex items-center justify-between">
                <div
                  onClick={() => {
                    handleAddRequest(req.id);
                  }}
                  className="flex items-center w-full h-full py-5"
                >
                  <h3 className="pr-4 font-bold">{req.method.toUpperCase()}</h3>
                  <p>{req.endPoint}</p>
                </div>
                <div>
                  <PopConfirm
                    title="Are you sure you want to delete this request?"
                    description="Once you delete a request there's no going back!"
                    btnText={<DeleteIcon />}
                    okText="Confirm"
                    cancelText="Cancel"
                    confirm={() => {
                      confirm(index);
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  };
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="m-0 w-full flex flex-col justify-center">
      <div className="pl-2">
        <SearchBar
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        {searchValue && (
          <div className="suggestions pt-2 px-6">
            {activeWorkspace.reqData
              .filter((req) =>
                req.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((req) => (
                <div
                  key={req.id}
                  className="suggestion "
                  onClick={() => {
                    console.log("hey search worked");
                  }}
                >
                  <span className="cursor-pointer w-full">{req.title}</span>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="">
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onChange={handleTabChange}
          className="m-0 w-full font-bold"
          centered
          tabBarStyle={{
            width: "100%",
            margin: "0px",
            padding: "0px",
            justifyContent: "space-between",
          }}
          indicator={{ size: 90 }}
        >
          <Item className="" tab="History" key="1">
            {renderHistory()}
          </Item>
          <Item tab="Collections" key="2">
            {renderCollections()}
          </Item>
          <Item tab="APIs" key="3">
            {renderApis()}
          </Item>
        </Tabs>
      </div>
    </div>
  );
};

export default ReqTabSidebar;
