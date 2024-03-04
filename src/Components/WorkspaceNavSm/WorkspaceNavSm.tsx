import { FC } from "react";
import DrawerLeft from "../Common/Drawer/Drawer";
import { ArrowBackIcon, SettingsIcon } from "../Common/Icons/Icons";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import BtnPrimary from "../Common/Buttons/BtnPrimary/BtnPrimary";
import { useUiContext } from "../../Context/UiContext/useUiContext";
import { Workspace } from "../../Context/Types";

interface WorkspaceNavSmProps {
  activeWorkspace: Workspace;
}

const WorkspaceNavSm: FC<WorkspaceNavSmProps> = ({ activeWorkspace }) => {
  const { isDark, setIsDark } = useUiContext();
  return (
    <div className="flex justify-between">
      <div className=" flex items-center pt-4 pb-2">
        <div className=" pr-2">
          <Link to="/">
            <BtnPrimary typeOf={"primary"} text={""} icon={<ArrowBackIcon />} />
          </Link>
        </div>
        <div className="block sm:hidden">
          <DrawerLeft activeWorkspace={activeWorkspace} isDark={isDark} />
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify pt-4 pb-2">
          <div className="px-2">
            <ThemeToggle setIsDark={setIsDark} />
          </div>
          <div className="">
            <BtnPrimary
              typeOf={"primary"}
              text={""}
              icon={<SettingsIcon className="text-xl" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceNavSm;
