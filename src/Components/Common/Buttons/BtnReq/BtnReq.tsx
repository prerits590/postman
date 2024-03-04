import { ReactNode } from "react";

interface Props {
  text: string | null;
  req: string;
  icon: ReactNode;
  onClickFunction: () => void;
}

const BtnReq: React.FC<Props> = ({
  text,
  icon,
  req,
  onClickFunction,
}) => {
  return (
    <div>
      <div className=" bg-ant flex rounded-t-lg items-center sm:py-1 py-2 px-2 cursor-pointer">
        <div className=" text-gray-200 px-2 font-semibold sm:text-base text-sm">
          <p>{req}</p>
        </div>
        <div className=" font-medium w-[5rem] truncate text-gray-200 text-xs sm:text-xs ">
          <p>{text}</p>
        </div>
        <div className="">
          <button onClick={onClickFunction} className="flex items-center">
            {icon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BtnReq;
