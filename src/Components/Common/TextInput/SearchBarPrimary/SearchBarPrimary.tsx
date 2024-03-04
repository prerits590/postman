import { Select } from "antd";
import Search from "antd/es/input/Search";
import { apiRequest } from "../../../Methods";
import { RequestData } from "../../../../Context/Types";

interface Props {
  option1: string;
  option2: string;
  selectedRequest: RequestData | null;
  selectedRequestIndex: number;
  activeWorkspaceId: string;
  updateRequest: (
    workspaceId: string,
    reqDataIndex: number,
    key: keyof RequestData,
    value: any
  ) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchbarPrimary: React.FC<Props> = ({
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
      defaultValue={option1}
      value={selectedRequest?.method.toUpperCase()}
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
      const jsonResponse = JSON.stringify(response, null, 6);
      updateRequest(
        activeWorkspaceId,
        selectedRequestIndex,
        "response",
        jsonResponse
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
        className="ant-searchbar"
        onSearch={handleSend}
        value={selectedRequest?.endPoint || ""}
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

export default SearchbarPrimary;
