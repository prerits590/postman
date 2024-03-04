import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataProvider } from "./Context/DataContext/DataContext";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
import React from "react";
import { UiProvider } from "./Context/UiContext/UiContext";
import { WorkspaceProvider } from "./Context/WorkspaceContext/WorkspaceContext";
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkspaceProvider>
        <DataProvider>
          <UiProvider>
            <App />
          </UiProvider>
        </DataProvider>
      </WorkspaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
