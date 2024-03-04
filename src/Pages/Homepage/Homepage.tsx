import {
  CrossIcon,
  DownIcon,
  FourSquaresIcon,
  ThreeLinsStackIcon,
} from "../../Components/Common/Icons/Icons";
import Homenav from "../../Components/HomeNav/HomeNav";
import HomeWorkspaces from "../../Components/HomeWorkspaces/HomeWrokspaces";
import BtnPrimary from "../../Components/Common/Buttons/BtnPrimary/BtnPrimary";
import { Link } from "react-router-dom";
import { useWorkspaceContext } from "../../Context/WorkspaceContext/useWorkspaceContext";
interface Props {}

const Homepage: React.FC<Props> = () => {
  const { workspaces } = useWorkspaceContext();

  return (
    <div className={`h-full sm:h-screen flex flex-col relative px-5`}>
      <div className="">
        <Homenav />
      </div>
      <div className=" pb-2">
        <div className="rounded-sm bg-ant-1 py-2 px-2 relative">
          <div className=" flex justify-end absolute right-0 px-2">
            <BtnPrimary
              text={""}
              typeOf={"primary"}
              icon={<CrossIcon className="text-xs" />}
            />
          </div>
          <div className=" flex justify-center items-center h-[20vh] text-white">
            <p className="font-semibold">Post Man Tool Tip</p>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-between">
        <div className="">
          <p className="font-semibold text-xs md:font-bold md:text-sm">
            Recently Used Workspace
          </p>
        </div>
        <div className="flex items-center py-2">
          <button className="flex items-center px-2">
            <div className="px-1 font-semibold text-xs md:font-bold md:text-sm">
              Date Modified
            </div>
            <div className=" px-1">
              <DownIcon />
            </div>
          </button>
          <div className=" flex items-center px-1">
            <button>
              <FourSquaresIcon className="text-2xl" />
            </button>
          </div>
          <div className="px-1 flex items-center">
            <button>
              <ThreeLinsStackIcon className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:nowrap flex-wrap flex-grow">
        <div className="h-fit grid grid-cols-12 w-full gap-4">
          {workspaces.map((workspace) => (
            <div key={workspace.id} className=" col-span-12 sm:col-span-2">
              <Link to={`workspace/${workspace.id}`}>
                <HomeWorkspaces name={workspace.name} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
