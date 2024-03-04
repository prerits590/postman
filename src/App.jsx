import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import { Routes, Route } from "react-router-dom";
import Workspace from "./Pages/Workspace/Workspace";
import { useUiContext } from "./Context/UiContext/useUiContext";
import { useEffect } from "react";
import { fetchWorkspaceData } from "./Data/Methods";
import { useWorkspaceContext } from "./Context/WorkspaceContext/useWorkspaceContext";
function App() {
  const { setIsLoading } = useUiContext();
  const { setWorkspaces } = useWorkspaceContext();

  useEffect(() => {
    setIsLoading(true);
    const mockWorkspaces = fetchWorkspaceData();
    setWorkspaces(mockWorkspaces.data);
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/workspace/:workspaceId" element={<Workspace />} />
      </Routes>
    </div>
  );
}

export default App;
