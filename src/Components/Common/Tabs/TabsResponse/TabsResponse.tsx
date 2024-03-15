import { Tabs } from "antd";
import { useState } from "react";
import Item from "antd/es/list/Item";
import { AxiosResponse } from "axios";
import Loader from "../../Loader/Loader";
interface props {
  data: AxiosResponse;
  isLoading: boolean;
}
const TabsResponse: React.FC<props> = ({ data, isLoading }) => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const headerCount =
    data && data.config && data.config.headers
      ? Object.keys(data.config.headers).length
      : 0;

  const paramCount =
    data && data.config && data.config.params
      ? Object.keys(data.config.params).length
      : 0;

  const formatHeaders = () => {
    if (data && data.config && data.config.headers) {
      const formattedHeaders = JSON.stringify(data.config.headers, null, 2);
      return <pre>{formattedHeaders}</pre>;
    } else {
      return <div>No Headers</div>;
    }
  };
  const formatParams = () => {
    if (data && data.config && data.config.params) {
      const formattedParams = JSON.stringify(data.config.params, null, 2);
      return <pre>{formattedParams}</pre>;
    } else {
      return <div>No Params</div>;
    }
  };

  const renderBody = () => {
    return <div className="">{data ? data.data : ""}</div>;
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="m-0 w-full border border-gray-500 px-2 rounded-2xl h-full flex flex-col justify-center">
          <Tabs
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={handleTabChange}
            className="m-0 w-full p-0 font-bold p-0 w-full  h-full "
            indicator={{ size: 80 }}
          >
            <Item
              tab={`Cookies ${paramCount === 0 ? "" : `(${paramCount})`}`}
              key="1"
            >
              {formatParams()}
            </Item>
            <Item tab={`Body ${data.data ? "(1)" : ""}`} key="2 ">
              {renderBody()}
            </Item>
            <Item
              tab={`Headers ${headerCount === 0 ? "" : `(${headerCount})`}`}
              key="3"
            >
              {formatHeaders()}
            </Item>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default TabsResponse;
