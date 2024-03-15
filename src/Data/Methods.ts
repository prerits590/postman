import { v4 as uuidv4 } from "uuid";
const date = new Date();
export const fetchWorkspaceData = () => {
  return {
    data: [
      {
        id: uuidv4(),
        name: "B Workspace",
        selectedreq: 0,
        time: date,
        description: "Lorem ipsum dolor sit amet",
        reqData: [],
      },
      {
        id: uuidv4(),
        name: "A Workspace",
        selectedreq: 0,
        time: date,
        description: "Consectetur adipisicing elit!!",
        reqData: [],
      },
    ],
  };
};
export const fetchWorkspaceMetaData = () => {
  const workspaceData = fetchWorkspaceData().data;
  const metaData = workspaceData.map((workspace) => ({
    id: workspace.id,
    name: workspace.name,
    selectedreq: workspace.selectedreq,
    time: workspace.time,
    description: workspace.description,
  }));

  return {
    metaData: metaData,
  };
};
