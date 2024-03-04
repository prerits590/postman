import { useState } from "react";
import { Button, Drawer } from "antd";
import {
  CrossIcon,
  DeleteIcon,
  PeopleIcon,
  ThreeLinsStackIcon,
} from "../Icons/Icons";
import TabsSidebar from "../Tabs/TabsSidebar/TabsSidebar";
import BtnPrimary from "../Buttons/BtnPrimary/BtnPrimary";
import PopConfirm from "../PopConfirm/PopConfirm";
import { Workspace } from "../../../Context/Types";

interface Props {
  isDark: boolean;
  activeWorkspace: Workspace;
}

const DrawerLeft: React.FC<Props> = ({ isDark, activeWorkspace }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        icon={<ThreeLinsStackIcon className="text-xl" />}
        type="primary"
        onClick={showDrawer}
        className="shadow-none flex items-center justify-center"
      />
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={onClose}
        open={open}
        closeIcon={<CrossIcon />}
        className={`pt-2 ${isDark ? "bg-dark" : ""} flex justify-center`}
      >
        {" "}
        <div className="flex border border-black items-center">
          <div className="w-full pb-2 flex justify-center">
            <BtnPrimary
              typeOf={"primary"}
              text={"Invite"}
              icon={<PeopleIcon className="text-lg" />}
            />
          </div>
          <div className="">
            {/* <ThemeToggle setIsDark={setIsDark} /> */}
            <PopConfirm
              btnText={<DeleteIcon />}
              description={
                "Are you sure that you want to delete this workspace?"
              }
              okText={"Delete"}
              cancelText={"Cancel"}
              confirm={() => {
                confirm(activeWorkspace.id);
              }}
              title={"Delete Workspace"}
            />
          </div>
        </div>
        <TabsSidebar />
      </Drawer>
    </>
  );
};

export default DrawerLeft;
