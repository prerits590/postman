import { createContext, useState } from "react";
import { DataContextValue } from "../Types";
import { useWorkspaceContext } from "../WorkspaceContext/useWorkspaceContext";
import { workspaceHelpers } from "../../Entities";

export const DataContext = createContext<DataContextValue>(
  {} as DataContextValue
);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { setWorkspaces, workspaces, updateWorkspaceTimeStamp } =
    useWorkspaceContext();

  const [activeReq, setActiveReq] = useState(0);
  const [userSelectedActiveReq, setUserSelectedReq] = useState<string[]>([]);
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
          const updatedReqData: workspaceHelpers.RequestData[] = [
            ...workspace.reqData,
          ];
          updatedReqData[reqIndex][key] = params;
          return { ...workspace, reqData: updatedReqData };
        }
        updateWorkspaceTimeStamp(workspaceId);
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
    updateWorkspaceTimeStamp(workspaceId);
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
    updateWorkspaceTimeStamp(workspaceId);
  };

  // ********************* Method to add new request into a specific workspace *********************

  const addRequest = (workspaceId: string, reqId: string) => {
    const workspaceIndex = workspaces.findIndex(
      (workspace) => workspace.id === workspaceId
    );

    if (workspaceIndex !== -1) {
      const updatedWorkspaces = [...workspaces];
      updatedWorkspaces[workspaceIndex].reqData.push(
        workspaceHelpers.getInitRequestObject(reqId)
      );
      setWorkspaces(updatedWorkspaces);
      updateWorkspaceTimeStamp(workspaceId);
    } else {
      console.log("Workspace not found");
    }
  };

  // ********************* Method to remove a request at a specific index in a specific workspace *********************

  const removeRequestAtIndex = (indexToRemove: number, workspaceId: string) => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const newReqData = [...workspace.reqData];
          newReqData.splice(indexToRemove, 1);
          return { ...workspace, reqData: newReqData };
        }
        return workspace;
      });
    });
    updateWorkspaceTimeStamp(workspaceId);
  };

  const removeReqFromActiveReqArray = (indexToRemove: number) => {
    setUserSelectedReq((prev) => {
      return prev.filter((_, index) => index !== indexToRemove);
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
    updateWorkspaceTimeStamp(workspaceId);
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
    updateWorkspaceTimeStamp(workspaceId);
  };

  // *********************  Method to handle change in params input set *********************

  const handleInputSetChange = (
    workspaceId: string,
    reqIndex: number,
    paramIndex: number,
    key: keyof workspaceHelpers.RequestData["reqParams"][number],
    value: string
  ): void => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const updatedWorkspace: workspaceHelpers.Workspace = { ...workspace };
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
    updateWorkspaceTimeStamp(workspaceId);
  };

  // ********************* Method to handle change in headers input set *********************

  const handleInputHeaderChange = (
    workspaceId: string,
    reqIndex: number,
    headerIndex: number,
    key: keyof workspaceHelpers.RequestData["reqHeader"][number],
    value: string
  ): void => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const updatedWorkspace: workspaceHelpers.Workspace = { ...workspace };
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
    updateWorkspaceTimeStamp(workspaceId);
  };

  return (
    <DataContext.Provider
      value={{
        activeReq,
        userSelectedActiveReq,
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
        setUserSelectedReq,
        removeReqFromActiveReqArray,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
