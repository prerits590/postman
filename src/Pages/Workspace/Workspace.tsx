import { Layout } from "antd";
import { useParams } from "react-router-dom";
import ReqTabSidebar from "../../Components/Common/Tabs/ReqTabSidebar/ReqTabSidebar";
import WorkspaceSection from "../../Components/WorkspaceSection/WorkspaceSection";
import { useEffect } from "react";
import Loader from "../../Components/Common/Loader/Loader";
import { useWorkspaceContext } from "../../Context/WorkspaceContext/useWorkspaceContext";
import { useUiContext } from "../../Context/UiContext/useUiContext";
import NavigationHeader from "../../Components/WorkspaceHeaders/NavigationHeader/NavigationHeader";
import ActionHeader from "../../Components/WorkspaceHeaders/ActionHeader/ActionHeader";

const { Sider, Content, Header } = Layout;
const Workspace: React.FC = () => {
  const {
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
    deleteWorkspace,
    updateWorkspaceMetaData,
  } = useWorkspaceContext();

  const { workspaceId } = useParams();
  const { setIsLoading, isLoading } = useUiContext();

  //****** Setting preLoader ****** */
  //! useEffect on route param.
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  //********* Setting currently active workspace as activeWorkspace in global workspace context ********* */

  useEffect(() => {
    const foundWorkspace = workspaces.find(
      (workspace) => workspace.id === workspaceId
    );

    if (foundWorkspace) {
      setActiveWorkspace(foundWorkspace);
    }
  }, [workspaces, workspaceId, setActiveWorkspace]);

  return (
    <div className="h-screen flex">
      <Layout className="flex-grow h-full">
        <Header className=" px-0 h-fit py-4 flex items-center">
          <NavigationHeader
            deleteWorkspace={deleteWorkspace}
            updateWorkspaceMetaData={updateWorkspaceMetaData}
            activeWorkspace={activeWorkspace}
          />
        </Header>
        <Layout className="flex-none bg-white justify-center">
          <ActionHeader />
        </Layout>

        <Layout className="overflow-y-auto py-2">
          <Sider
            className={"border-0 bg-white hidden sm:block"}
            theme="light"
            width={"21vw"}
          >
            <div className="">
              <ReqTabSidebar />
            </div>
          </Sider>

          <Content className="px-0 h-full flex flex-col">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex-grow bg-white">
                <WorkspaceSection />
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Workspace;
