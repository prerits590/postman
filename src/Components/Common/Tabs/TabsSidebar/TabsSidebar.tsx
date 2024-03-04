import { Tabs } from "antd";
import { useState } from "react";
import Accordian from "../../Accordian/Accordian";
import DividerLight from "../../Divider/Divider";
import Item from "antd/es/list/Item";

const TabsSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const renderHistory = () => {
    return (
      <div className="">
        <div className=" flex justify-between items-center">
          <div className="flex items-center py-2 px-4">
            <div className="pt-1">
              <input type="checkbox" />
            </div>
            <div className="px-2 ">
              <p className="text-xs font-semibold">Save Responses</p>
            </div>
          </div>
          <div className="px-4">
            <p className="text-xs font-bold ">Clear All</p>
          </div>
        </div>
        <DividerLight />
        <div>
          <Accordian
            req={"GET"}
            text={"https://google.com"}
            date={"23 Februray 2069"}
          />
          <Accordian
            req={"POST"}
            text={"https://google.com"}
            date={"21 April 2024"}
          />
          <Accordian
            req={"GET"}
            text={"https://google.com"}
            date={"09 January 2024"}
          />
          <Accordian
            req={"GET"}
            text={"https://google.com"}
            date={"09 Februray 2069"}
          />
        </div>
      </div>
    );
  };
  const renderCollections = () => {
    return <div className="flex justify-center font-bold">Collections</div>;
  };
  const renderApis = () => {
    return <div className="flex justify-center font-bold">APIs</div>;
  };
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="m-0 w-full flex justify-center">
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={handleTabChange}
        className="m-0 w-full font-bold "
        centered
        tabBarStyle={{
          width: "100%",
          margin: "0px",
          padding: "0",
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
  );
};

export default TabsSidebar;
