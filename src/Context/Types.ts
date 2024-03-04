export interface RequestData {
  method: string;
  endPoint: string;
  reqHeader: { key: string; value: string }[];
  reqBody: string;
  reqParams: { key: string; value: string }[];
  response: string;
}

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
  addRequest: (workspaceId: string) => void;
  removeRequestAtIndex: (indexToRemove: number, workspaceId: string) => void;
  handleInputSetChange: (
    workspaceId: string,
    reqIndex: number,
    paramIndex: number,
    key: keyof RequestData["reqParams"][number],
    value: string
  ) => void;
  handleInputHeaderChange: (
    workspaceId: string,
    reqIndex: number,
    headerIndex: number,
    key: keyof RequestData["reqHeader"][number],
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
}

export interface UiDataContextValue {
  isLoading: boolean;
  isDark: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WorkspaceContextValue {
  workspaces: Workspace[];
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
  setActiveWorkspace: React.Dispatch<React.SetStateAction<Workspace>>;
  addWorkspace: () => void;
  activeWorkspace: Workspace;
  updateWorkspaceName: (workspaceId: string, newName: string) => void;
  updateActiveReq: (workspaceId: string, newIndex: number) => void;
  updateWorkspaceData: (
    workspaceId: string,
    reqDataIndex: number,
    key: keyof RequestData,
    value: string & { key: string; value: string }[]
  ) => void;
  deleteWorkspace: (workspaceId: string) => void;
}

export interface Workspace {
  name: string;
  id: string;
  selectedreq: number;
  reqData: RequestData[];
}
