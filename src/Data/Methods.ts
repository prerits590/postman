import { v4 as uuidv4 } from "uuid";
export const fetchWorkspaceData = () => {
  return {
    data: [
      {
        id: uuidv4(),
        name: "Workspace 1",
        selectedreq: 0,
        reqData: [
          {
            method: "get",
            endPoint: "/api/data",
            reqHeader: [{ key: "content-type", value: "application/json" }],
            reqBody: "",
            reqParams: [{ key: "", value: "" }],
            response: "",
          },
        ],
      },
      {
        id: uuidv4(),
        name: "Workspace 2",
        selectedreq: 0,
        reqData: [
          {
            method: "get",
            endPoint: "/api/data",
            reqHeader: [{ key: "content-type", value: "application/json" }],
            reqBody: "",
            reqParams: [{ key: "", value: "" }],
            response: "",
          },
        ],
      },
    ],
  };
};
