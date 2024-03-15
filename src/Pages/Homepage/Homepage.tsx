import {
  FourSquaresIcon,
  ThreeLinsStackIcon,
} from "../../Components/Common/Icons/Icons";
import Homenav from "../../Components/HomeNav/HomeNav";
import { Link } from "react-router-dom";
import { useWorkspaceContext } from "../../Context/WorkspaceContext/useWorkspaceContext";
import HomeTooltip from "../../Components/HomeTooltip/HomeTooltip";
import Btn from "../../Components/Common/Buttons/Btn/Btn";
import { useEffect, useState } from "react";
import SelectWrapper from "../../Components/Common/Select/SelectWrapper";
import { workspaceHelpers } from "../../Entities";
import WorkspaceCard from "../../Components/WorkspaceCard/WorkspaceCard";
import { useUiContext } from "../../Context/UiContext/useUiContext";
// import { useUiContext } from "../../Context/UiContext/useUiContext";
// import { fetchWorkspaceData } from "../../Data/Methods";

interface Props {}

const Homepage: React.FC<Props> = () => {
  const { workspaces } = useWorkspaceContext();
  const { showTooltip, setShowTooltip } = useUiContext();
  // const { setIsLoading } = useUiContext();
  const [sortedWorkspaces, setSortedWorkspaces] = useState<
    workspaceHelpers.Workspace[]
  >([]);
  const [viewMode, setViewMode] = useState<"tile" | "list">(() => {
    return (localStorage.getItem("viewMode") as "tile" | "list") || "tile";
  });
  const [sortType, setSortType] = useState<string>(() => {
    return localStorage.getItem("sortType") || "date";
  });

  // useEffect(() => {
  //   setIsLoading(true);
  //   const mockWorkspaces = fetchWorkspaceData();
  //   setWorkspaces(mockWorkspaces.data);
  //   setIsLoading(false);
  // }, []);

  useEffect(() => {
    // const workspaceMetaData = fetchWorkspaceMetaData();
    // console.log(workspaceMetaData);
    const workspacesSorted = [...workspaces];
    if (sortType === "date") {
      workspacesSorted.sort((a, b) => b.time.getTime() - a.time.getTime());
    } else {
      workspacesSorted.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    setSortedWorkspaces(workspacesSorted);
  }, [sortType, workspaces]);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);
  useEffect(() => {
    localStorage.setItem("sortType", sortType);
  }, [sortType]);

  const handleViewModeChange = (mode: "tile" | "list") => {
    setViewMode(mode);
  };
  const handleSortTypeChange = (type: string) => {
    setSortType(type);
  };
  // console.log(workspaces);
  return (
    <div className={`h-full sm:h-screen flex flex-col relative px-5`}>
      <div className="">
        <Homenav />
      </div>

      <div className="">
        {showTooltip && <HomeTooltip setShowTooltip={setShowTooltip} />}
      </div>

      <div className="pt-2 flex items-center justify-between">
        <div className="">
          <p className="font-semibold text-xs md:font-bold md:text-sm">
            Recently Used Workspace
          </p>
        </div>
        <div className="flex items-center py-2">
          <SelectWrapper
            defaultValue={sortType}
            options={[
              { value: "date", label: "Date Modified" },
              { value: "alphabatically", label: "Alphabatically" },
            ]}
            onChange={(value) => {
              handleSortTypeChange(value);
            }}
          />
          <div className=" flex items-center px-1">
            <Btn
              icon={<FourSquaresIcon className="text-2xl" />}
              typeOf="primary"
              onClick={() => {
                handleViewModeChange("tile");
              }}
              active={viewMode === "tile" ? true : false}
            />
          </div>
          <div className="flex items-center">
            <Btn
              icon={<ThreeLinsStackIcon className="text-2xl" />}
              typeOf="primary"
              onClick={() => {
                handleViewModeChange("list");
              }}
              active={viewMode === "list" ? true : false}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center md:nowrap flex-wrap flex-grow">
        <div
          className={`h-fit flex flex-wrap ${
            viewMode === "tile" ? "flex-row" : "flex-col"
          }  w-full `}
        >
          {sortedWorkspaces.map((workspace) => (
            <div key={workspace.id} className="pr-1">
              {viewMode === "tile" ? (
                <Link to={`workspace/${workspace.id}`}>
                  <WorkspaceCard
                    viewMode={viewMode}
                    name={workspace.name}
                    description={workspace.description}
                  />
                </Link>
              ) : (
                <div className="flex flex-col ">
                  <Link to={`workspace/${workspace.id}`}>
                    <WorkspaceCard
                      viewMode={viewMode}
                      name={workspace.name}
                      description={workspace.description}
                    />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
