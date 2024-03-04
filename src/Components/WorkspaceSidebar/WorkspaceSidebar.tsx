import { PlusIcon, SearchIcon } from "../Common/Icons/Icons";
import SearchbarSecondary from "../Common/TextInput/SearchbarSecondary/SearchbarSecondary";
import TabSidebar from "../Common/Tabs/TabsSidebar/TabsSidebar";
import BtnPrimary from "../Common/Buttons/BtnPrimary/BtnPrimary";
interface Props {}
const WorkspaceSidebar: React.FC<Props> = () => {
  return (
    <div className="">
      <div className="col-span-1 ">
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
          <div className=" px-2">
            <BtnPrimary typeOf={"primary"} text={"Runner"} />
          </div>
        </div>
      </div>
      <div className="py-2 ">
        <div className=" relative flex items-center ">
          <div className=" w-full px-4">
            <SearchbarSecondary />
          </div>
          <div className="absolute left-7">
            <SearchIcon className="text-lg text-gray-" />
          </div>
        </div>
        <div className="">
          <TabSidebar />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
