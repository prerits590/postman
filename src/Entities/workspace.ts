import { AxiosError, AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";
const date = new Date();

export interface RequestData {
  id: string;
  title: string;
  method: string;
  endPoint: string;
  reqHeader: { key: string; value: string }[];
  reqBody: string;
  reqParams: { key: string; value: string }[];
  response: AxiosResponse<ApiReponse> | null;
  time: Date;
}
export interface ApiReponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
  error?: AxiosError;
}
export interface Workspace {
  name: string;
  id: string;
  selectedreq: number;
  time: Date;
  description: string;
  reqData: RequestData[];
}
export const getInitWorkspaceObject = () => {
  return {
    id: uuidv4(),
    name: "Untitled Workspace",
    selectedreq: 0,
    time: date,
    description: "My new workspace",
    reqData: [],
  };
};
export const getInitRequestObject = (reqId: string) => {
  return {
    id: reqId,
    title: "Untitled Request",
    method: "get",
    endPoint: "/api/data/new",
    reqHeader: [{ key: "content-type", value: "application/json" }],
    reqBody: "",
    reqParams: [{ key: "", value: "" }],
    response: null,
    time: date,
  };
};
