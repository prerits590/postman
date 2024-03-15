import { useState } from "react";
import { CrossIcon } from "../Common/Icons/Icons";
import Btn from "../Common/Buttons/Btn/Btn";

interface Props {
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeTooltip: React.FC<Props> = ({ setShowTooltip }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const handleTooltip = () => {
    setShowTooltip(false);
    setIsTooltipOpen((prev) => !prev);
  };
  return (
    <>
      <div className={`${isTooltipOpen ? "block" : "hidden"}`}>
        <div className="rounded-sm bg-ant-1 py-2 px-2 relative">
          <div className=" flex justify-end absolute right-0 px-2">
            <Btn
              text={""}
              typeOf={"primary"}
              icon={<CrossIcon className="text-xs" />}
              onClick={handleTooltip}
            />
          </div>
          <div className=" flex justify-center items-center h-[20vh] text-white">
            <p className="font-semibold">Post Man Tool Tip</p>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default HomeTooltip;
