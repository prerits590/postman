import { Select } from "antd";
import Search from "antd/es/input/Search";
import { apiRequest } from "../../../Methods";
import { workspaceHelpers } from "../../../../Entities";

interface Props {
  option1: string;
  option2: string;
  selectedRequest: workspaceHelpers.RequestData | null;
  selectedRequestIndex: number;
  activeWorkspaceId: string;
  updateRequest: (
    workspaceId: string,
    reqDataIndex: number,
    key: "title" | "method" | "endPoint" | "reqBody" | "response",
    value: any
  ) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const RequestInputBar: React.FC<Props> = ({
  option1,
  option2,
  selectedRequest,
  selectedRequestIndex,
  updateRequest,
  setIsLoading,
  activeWorkspaceId,
}) => {
  const { Option } = Select;
  const handleSelectChangeReq = (value: string) => {
    updateRequest(
      activeWorkspaceId,
      selectedRequestIndex,
      "method",
      value.toLowerCase()
    );
  };

  const selectBefore = (
    <Select
      onChange={handleSelectChangeReq}
      // defaultValue={""}
      value={selectedRequest?.method.toUpperCase()}
      disabled={selectedRequest ? false : true}
    >
      <Option value={option1}>{option1}</Option>
      <Option value={option2}>{option2}</Option>
    </Select>
  );

  const handleSend = async () => {
    if (selectedRequest) {
      const { reqParams, reqHeader, reqBody, method, endPoint } =
        selectedRequest;
      setIsLoading(true);
      const response = await apiRequest(
        method,
        endPoint,
        reqBody,
        reqParams,
        reqHeader
      );
      setIsLoading(false);
      updateRequest(
        activeWorkspaceId,
        selectedRequestIndex,
        "response",
        response
      );
    }

  };

  return (
    <div>
      <Search
        addonBefore={selectBefore}
        enterButton={"SEND"}
        placeholder="Your API Endpoint Here..."
        size="large"
        className={`${selectedRequest ? "ant-searchbar" : "ant-searchbar1"}`}
        onSearch={handleSend}
        value={selectedRequest?.endPoint || ""}
        disabled={selectedRequest ? false : true}
        onChange={(e) => {
          updateRequest(
            activeWorkspaceId,
            selectedRequestIndex,
            "endPoint",
            e.target.value
          );
        }}
      />
    </div>
  );
};

export default RequestInputBar;
