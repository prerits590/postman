import { ArrowBackIcon, PlusIcon, SettingsIcon } from "../Common/Icons/Icons";
import BtnPrimary from "../Common/Buttons/BtnPrimary/BtnPrimary";
import { useWorkspaceContext } from "../../Context/WorkspaceContext/useWorkspaceContext";

interface Props {}

const Homenav: React.FC<Props> = () => {
  const { addWorkspace } = useWorkspaceContext();
  return (
    <div className=" flex justify-between py-4">
      <div className="">
        <BtnPrimary text={""} typeOf={"primary"} icon={<ArrowBackIcon />} />
      </div>
      <div className=" flex">
        <div className="">
          <BtnPrimary
            onClickFunction={addWorkspace}
            typeOf={"primary"}
            text={"New Workspace"}
            icon={<PlusIcon />}
          />
        </div>
        <div className="pl-1">
          <BtnPrimary
            text={""}
            typeOf={"primary"}
            icon={<SettingsIcon className="text-xl" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Homenav;
