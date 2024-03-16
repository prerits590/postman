import { workspaceHelpers } from "../Entities";

export interface InputSet {
  key: string;
  value: string;
}

export interface DataContextValue {
  updateWorkspaceDataWithParams: (
    workspaceId: string,
    reqIndex: number,
    key: "reqParams" | "reqHeader",
    params: { key: string; value: string }[]
  ) => void;
  handleAddInputSet: (workspaceId: string, reqIndex: number) => void;
  handleAddHeader: (workspaceId: string, reqIndex: number) => void;
  addRequest: (workspaceId: string, id: string) => void;
  removeRequestAtIndex: (indexToRemove: number, workspaceId: string) => void;
  handleInputSetChange: (
    workspaceId: string,
    reqIndex: number,
    paramIndex: number,
    key: keyof workspaceHelpers.RequestData["reqParams"][number],
    value: string
  ) => void;
  handleInputHeaderChange: (
    workspaceId: string,
    reqIndex: number,
    headerIndex: number,
    key: keyof workspaceHelpers.RequestData["reqHeader"][number],
    value: string
  ) => void;

  handleRemoveInputSet: (
    workspaceId: string,
    index: number,
    reqIndex: number
  ) => void;
  handleRemoveHeader: (
    workspaceId: string,
    index: number,
    reqIndex: number
  ) => void;
  activeReq: number;
  setActiveReq: React.Dispatch<React.SetStateAction<number>>;
  userSelectedActiveReq: string[];
  setUserSelectedReq: React.Dispatch<React.SetStateAction<string[]>>;
  removeReqFromActiveReqArray: (
    workspaceId: string,
    indexToRemove: number
  ) => void;
}

export interface UiDataContextValue {
  isLoading: boolean;
  isDark: boolean;
  showTooltip: boolean;
  viewMode: "tile" | "list";
  sortType: "alphabatically" | "date";
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  setViewMode: React.Dispatch<React.SetStateAction<"tile" | "list">>;
  setSortType: React.Dispatch<React.SetStateAction<"alphabatically" | "date">>;
}

export interface WorkspaceContextValue {
  workspaces: workspaceHelpers.Workspace[];
  setWorkspaces: React.Dispatch<
    React.SetStateAction<workspaceHelpers.Workspace[]>
  >;
  setActiveWorkspace: React.Dispatch<React.SetStateAction<any>>;
  addWorkspace: () => void;
  activeWorkspace: workspaceHelpers.Workspace;
  // updateWorkspaceName: (workspaceId: string, newName: string) => void;
  updateActiveReq: (workspaceId: string, newIndex: number) => void;
  updateWorkspaceData: (
    workspaceId: string,
    reqDataIndex: number,
    key: "title" | "method" | "endPoint" | "reqBody" | "response",
    value: string
  ) => void;
  deleteWorkspace: (workspaceId: string) => void;
  updateWorkspaceMetaData: (
    workspaceId: string,
    key: keyof workspaceHelpers.Workspace,
    value: string
  ) => void;
  updateWorkspaceTimeStamp: (workspaceId: string) => void;
}
