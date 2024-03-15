import { FC } from "react";
import Btn from "../../Common/Buttons/Btn/Btn";
import { PeopleIcon, PlusIcon } from "../../Common/Icons/Icons";

interface ActionHeaderProps {}

const ActionHeader: FC<ActionHeaderProps> = () => {
  return (
    <div className="flex items-center px-2 py-2 bg-gray-600">
      <div className="flex justify-center w-[20%] pr-1 pl-2">
        <div className="flex w-full justify-between ">
          <div className=" ">
            <Btn typeOf={"primary"} text={"New"} icon={<PlusIcon />} />
          </div>
          <div className="">
            <Btn typeOf={"primary"} text={"Import"} />
          </div>
          <div className="">
            <Btn typeOf={"primary"} text={"Runner"} />
          </div>
        </div>
      </div>
      <div className="w-[80%]">
        <div className="w-full py-1 justify-center sm:flex hidden">
          <Btn
            typeOf={"primary"}
            text={"Invite"}
            icon={<PeopleIcon className="text-lg" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionHeader;
