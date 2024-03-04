import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RequestData, Workspace, WorkspaceContextValue } from "../Types";

export const WorkspaceContext = createContext<WorkspaceContextValue>(
  {} as WorkspaceContextValue
);

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //? ******************** Stores all the workspaces from api call DB *********************

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: uuidv4(),
      name: "Untitled Workspace",
      selectedreq: 0,
      reqData: [
        {
          method: "get",
          endPoint: "",
          reqHeader: [{ key: "content-type", value: "application/json" }],
          reqBody: "",
          reqParams: [{ key: "", value: "" }],
          response: "",
        },
      ],
    },
  ]);

  //? ******************** Stores the currently active workspace *********************

  const [activeWorkspace, setActiveWorkspace] = useState({
    id: "",
    name: "Untitled Workspace",
    selectedreq: 0,
    reqData: [
      {
        method: "get",
        endPoint: "",
        reqHeader: [{ key: "content-type", value: "application/json" }],
        reqBody: "",
        reqParams: [{ key: "", value: "" }],
        response: "",
      },
    ],
  });

  // ********************* Method to update workspace name *********************

  const updateWorkspaceName = (workspaceId: string, newName: string) => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          return { ...workspace, name: newName };
        }
        return workspace;
      });
    });
  };

  // ********************* Method to update active request (users' last active req) *********************

  const updateActiveReq = (workspaceId: string, newIndex: number) => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          return { ...workspace, selectedreq: newIndex };
        }
        return workspace;
      });
    });
  };
  //********************* Method to dalete workspace *********************

  const deleteWorkspace = (workspaceId: string) => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.filter((workspace) => workspace.id !== workspaceId);
    });
  };

  //********************* Method to update workspace data *********************

  const updateWorkspaceData = (
    workspaceId: string,
    reqDataIndex: number,
    key: keyof RequestData,
    value: string & { key: string; value: string }[]
  ) => {
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const updatedReqData = [...workspace.reqData];
          updatedReqData[reqDataIndex][key] = value;
          return { ...workspace, reqData: updatedReqData };
        }
        return workspace;
      });
    });
  };

  //********************* Method to add a new workspace *********************

  const addWorkspace = () => {
    const newWorkspace: Workspace = {
      id: uuidv4(),
      name: "Untitled Workspace",
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
    };
    setWorkspaces([...workspaces, newWorkspace]);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        deleteWorkspace,
        addWorkspace,
        updateWorkspaceName,
        updateWorkspaceData,
        setWorkspaces,
        setActiveWorkspace,
        updateActiveReq,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
