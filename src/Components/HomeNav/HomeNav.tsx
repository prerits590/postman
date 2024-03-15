import { ArrowBackIcon, PlusIcon, SettingsIcon } from "../Common/Icons/Icons";
import Btn from "../Common/Buttons/Btn/Btn";
import { useWorkspaceContext } from "../../Context/WorkspaceContext/useWorkspaceContext";

interface Props {
  
}

const Homenav: React.FC<Props> = () => {
  const { addWorkspace } = useWorkspaceContext();
  return (
    <div className=" flex justify-between py-4">
      <div className="">
        <Btn
          text={""}
          typeOf={"primary"}
          disabled={true}
          icon={<ArrowBackIcon />}
        />
      </div>
      <div className=" flex">
        <div className="">
          <Btn
            onClick={addWorkspace}
            typeOf={"primary"}
            text={"New Workspace"}
            icon={<PlusIcon />}
          />
        </div>
        <div className="pl-1">
          <Btn
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
