import { createContext, useState } from "react";
import { DataContextValue, RequestData, Workspace } from "../Types";
import { useWorkspaceContext } from "../WorkspaceContext/useWorkspaceContext";

export const DataContext = createContext<DataContextValue>(
  {} as DataContextValue
);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { setWorkspaces, workspaces } = useWorkspaceContext();

  const [activeReq, setActiveReq] = useState(0);

  // **************** Method to update workspace data with parameters (only using for params and header sets) ******************

  const updateWorkspaceDataWithParams = (
    workspaceId: string,
    reqIndex: number,
    key: "reqParams" | "reqHeader",
    params: { key: string; value: string }[]
  ) => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const updatedReqData: RequestData[] = [...workspace.reqData];
          updatedReqData[reqIndex][key] = params;
          return { ...workspace, reqData: updatedReqData };
        }
        return workspace;
      });
    });
  };

  // ********************* Handles addition of param input sets *********************

  const handleAddInputSet = (workspaceId: string, reqIndex: number) => {
    const newParams = { key: "", value: "" };

    updateWorkspaceDataWithParams(workspaceId, reqIndex, "reqParams", [
      ...(workspaces.find((workspace) => workspace.id === workspaceId)?.reqData[
        reqIndex
      ].reqParams || []),
      newParams,
    ]);
  };

  // ********************* Handles addition of param header sets *********************

  const handleAddHeader = (workspaceId: string, reqIndex: number) => {
    const newHeader = { key: "", value: "" };

    updateWorkspaceDataWithParams(workspaceId, reqIndex, "reqHeader", [
      ...(workspaces.find((workspace) => workspace.id === workspaceId)?.reqData[
        reqIndex
      ].reqHeader || []),
      newHeader,
    ]);
  };

  // ********************* Method to add new request into a specific workspace *********************

  const addRequest = (workspaceId: string) => {
    const workspaceIndex = workspaces.findIndex(
      (workspace) => workspace.id === workspaceId
    );

    if (workspaceIndex !== -1) {
      const newRequest = {
        method: "get",
        endPoint: "/api/data/new",
        reqHeader: [{ key: "content-type", value: "application/json" }],
        reqBody: "",
        reqParams: [{ key: "", value: "" }],
        response: "",
      };

      const updatedWorkspaces = [...workspaces];
      updatedWorkspaces[workspaceIndex].reqData.push(newRequest);

      setWorkspaces(updatedWorkspaces);
    } else {
      console.log("Workspace not found");
    }
  };

  // ********************* Method to remove a request at a specific index in a specific workspace *********************

  const removeRequestAtIndex = (indexToRemove: number, workspaceId: string) => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          if (workspace.reqData.length === 1) {
            return workspace;
          }
          const newReqData = [...workspace.reqData];
          newReqData.splice(indexToRemove, 1);
          return { ...workspace, reqData: newReqData };
        }
        return workspace;
      });
    });
  };

  // ********************* Method to handle removal of header *********************

  const handleRemoveHeader = (
    workspaceId: string,
    index: number,
    reqIndex: number
  ) => {
    const workspace = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    if (!workspace) return;
    const { reqData } = workspace;
    if (reqData[reqIndex].reqHeader.length === 1) {
      return;
    }
    const updatedReqHeader = reqData[reqIndex].reqHeader.filter(
      (_: object, headerIndex: number) => headerIndex !== index
    );

    updateWorkspaceDataWithParams(
      workspaceId,
      reqIndex,
      "reqHeader",
      updatedReqHeader
    );
  };

  // ********************* Method to handle removal of param *********************

  const handleRemoveInputSet = (
    workspaceId: string,
    index: number,
    reqIndex: number
  ) => {
    const workspace = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );
    if (!workspace) return;
    const { reqData } = workspace;
    if (reqData[reqIndex].reqParams.length === 1) {
      return;
    }
    const updatedReqParams = reqData[reqIndex].reqParams.filter(
      (_: object, paramIndex: number) => paramIndex !== index
    );

    updateWorkspaceDataWithParams(
      workspaceId,
      reqIndex,
      "reqParams",
      updatedReqParams
    );
  };

  // *********************  Method to handle change in params input set *********************

  const handleInputSetChange = (
    workspaceId: string,
    reqIndex: number,
    paramIndex: number,
    key: keyof RequestData["reqParams"][number],
    value: string
  ): void => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const updatedWorkspace: Workspace = { ...workspace };
          if (
            updatedWorkspace.reqData[reqIndex] &&
            updatedWorkspace.reqData[reqIndex].reqParams[paramIndex]
          ) {
            updatedWorkspace.reqData[reqIndex].reqParams[paramIndex][key] =
              value;
          }
          return updatedWorkspace;
        }
        return workspace;
      });
    });
  };

  // ********************* Method to handle change in headers input set *********************

  const handleInputHeaderChange = (
    workspaceId: string,
    reqIndex: number,
    headerIndex: number,
    key: keyof RequestData["reqHeader"][number],
    value: string
  ): void => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const updatedWorkspace: Workspace = { ...workspace };
          if (
            updatedWorkspace.reqData[reqIndex] &&
            updatedWorkspace.reqData[reqIndex].reqHeader[headerIndex]
          ) {
            updatedWorkspace.reqData[reqIndex].reqHeader[headerIndex][key] =
              value;
          }
          return updatedWorkspace;
        }
        return workspace;
      });
    });
  };

  return (
    <DataContext.Provider
      value={{
        activeReq,
        setActiveReq,
        updateWorkspaceDataWithParams,
        handleAddInputSet,
        handleAddHeader,
        addRequest,
        removeRequestAtIndex,
        handleInputHeaderChange,
        handleInputSetChange,
        handleRemoveHeader,
        handleRemoveInputSet,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
