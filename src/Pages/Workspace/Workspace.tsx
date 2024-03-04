import { Layout } from "antd";
import { Link, useParams } from "react-router-dom";
import { ArrowBackIcon, PlusIcon } from "../../Components/Common/Icons/Icons";
import BtnPrimary from "../../Components/Common/Buttons/BtnPrimary/BtnPrimary";
import TabsSidebar from "../../Components/Common/Tabs/TabsSidebar/TabsSidebar";
import WorkspaceSection from "../../Components/WorkspaceSection/WorkspaceSection";
import { useEffect } from "react";
import ModalComponent from "../../Components/Common/Modal/ModalComponent";
import Loader from "../../Components/Common/Loader/Loader";
import { useWorkspaceContext } from "../../Context/WorkspaceContext/useWorkspaceContext";
import { useUiContext } from "../../Context/UiContext/useUiContext";

const { Sider, Content } = Layout;
const Workspace: React.FC = () => {
  const {
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
    updateWorkspaceName,
  } = useWorkspaceContext();
  const { workspaceId } = useParams();
  const { setIsLoading, isLoading } = useUiContext();

  //****** Setting preLoader ****** */

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
        <Sider
          className={"border-0 hidden sm:block bg-glass"}
          theme="light"
          width={"300"}
        >
          <div className="flex items-center py-4 justify-between px-4">
            <div className=" pr-2">
              <Link to="/">
                <BtnPrimary
                  text={""}
                  typeOf={"primary"}
                  icon={<ArrowBackIcon />}
                />
              </Link>
            </div>
            <div className="sm:px-8 px-2 ">
              <div className="sm:text-sm text-xs">{activeWorkspace.name}</div>
            </div>
            <div className=" pl-2">
              <div className="">
                <ModalComponent
                  workspaceId={activeWorkspace.id}
                  updateWorkspaceName={updateWorkspaceName}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex py-1">
              <div className=" pr-2">
                <div className=" ">
                  <BtnPrimary
                    typeOf={"primary"}
                    text={"New"}
                    icon={<PlusIcon />}
                  />
                </div>
              </div>
              <div className=" px-2">
                <BtnPrimary typeOf={"primary"} text={"Import"} />
              </div>
              <div className=" pl-2">
                <BtnPrimary typeOf={"primary"} text={"Runner"} />
              </div>
            </div>
          </div>
          <div className="">
            <TabsSidebar />
          </div>
        </Sider>
        <Layout className="overflow-y-auto">
          <Content className="px-0 h-full flex flex-col">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex-grow bg-glass-1">
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
