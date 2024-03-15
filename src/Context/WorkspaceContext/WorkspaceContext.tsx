import { createContext, useState } from "react";
import { WorkspaceContextValue } from "../Types";
import { workspaceHelpers } from "../../Entities";

export const WorkspaceContext = createContext<WorkspaceContextValue>(
  {} as WorkspaceContextValue
);

export const WorkspaceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //? ******************** Stores all the workspaces from api call DB *********************
  const [workspaces, setWorkspaces] = useState<workspaceHelpers.Workspace[]>([
    workspaceHelpers.getInitWorkspaceObject(),
  ]);
  // console.log(workspaces);

  //? ******************** Stores the currently active workspace *********************
  const [activeWorkspace, setActiveWorkspace] = useState(
    workspaceHelpers.getInitWorkspaceObject()
  );

  // ********************* Method to update workspace name *********************

  // const updateWorkspaceName = (workspaceId: string, newName: string) => {
  //   setWorkspaces((prevWorkspaces) => {
  //     return prevWorkspaces.map((workspace) => {
  //       if (workspace.id === workspaceId) {
  //         return { ...workspace, name: newName };
  //       }
  //       return workspace;
  //     });
  //   });
  // };

  const updateWorkspaceMetaData = (
    workspaceId: string,
    key: keyof workspaceHelpers.Workspace,
    value: string
  ) => {
    const currentDate = new Date();
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          return { ...workspace, [key]: value, time: currentDate };
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
    key: "title" | "method" | "endPoint" | "reqBody" | "response",
    value: any
  ) => {
    const currentDate = new Date();
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          const updatedReqData = [...workspace.reqData];
          updatedReqData[reqDataIndex][key] = value;
          return { ...workspace, reqData: updatedReqData, time: currentDate };
        }
        return workspace;
      });
    });
  };

  //********************* Method to add a new workspace *********************

  const addWorkspace = () => {
    setWorkspaces([...workspaces, workspaceHelpers.getInitWorkspaceObject()]);
  };

  const updateWorkspaceTimeStamp = (workspaceId: string) => {
    const currentDate = new Date();
    setWorkspaces((prevWorkspaces) => {
      return prevWorkspaces.map((workspace) => {
        if (workspace.id === workspaceId) {
          return { ...workspace, time: currentDate };
        }
        return workspace;
      });
    });
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        activeWorkspace,
        deleteWorkspace,
        addWorkspace,
        updateWorkspaceData,
        setWorkspaces,
        setActiveWorkspace,
        updateActiveReq,
        updateWorkspaceMetaData,
        updateWorkspaceTimeStamp,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
