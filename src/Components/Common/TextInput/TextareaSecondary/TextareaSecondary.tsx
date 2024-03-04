import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { RequestData } from "../../../../Context/Types";
import { isValidJSON } from "../../../Methods";
import BadgeComponent from "../../Badge/Badge";

interface Props {
  placeholderText: string;
  reqIndex: number;
  selectedRequest: RequestData | null;
  updateRequest: (
    workspaceId: string,
    reqDataIndex: number,
    key: keyof RequestData,
    value: any
  ) => void;
  workspaceId: string;
}

const TextareaSecondary: React.FC<Props> = ({
  placeholderText,
  reqIndex,
  selectedRequest,
  updateRequest,
  workspaceId,
}) => {
  const [body, setBody] = useState(selectedRequest?.reqBody || "");
  const [warning, setWarning] = useState(false);
  const handleBodyChange = (value: string) => {
    if (isValidJSON(value) != false) {
      setWarning(false);
      updateRequest(workspaceId, reqIndex, "reqBody", value);
    } else {
      console.log("Enter valid Json");
      setWarning(true);
    }
  };
  useEffect(() => {
    setBody(selectedRequest?.reqBody || "");
  }, [selectedRequest]);
  return (
    <>
      <div className="w-full relative">
        <TextArea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setBody(e.target.value);
            handleBodyChange(e.target.value);
          }}
          placeholder={placeholderText}
          rows={4}
          value={body}
        />
      </div>
      <div className="absolute top-2 px-2 right-0">
        {warning && (
          <BadgeComponent
            status={"warning"}
            text={"Please enter valid JSON."}
          />
        )}
      </div>
    </>
  );
};

export default TextareaSecondary;
