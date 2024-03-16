import { ReactNode, useState } from "react";
import { Drawer } from "antd";
import { CrossIcon } from "../Icons/Icons";
import Btn from "../Buttons/Btn/Btn";
import { workspaceHelpers } from "../../../Entities";

interface Props {
  isDark?: boolean;
  activeWorkspace?: workspaceHelpers.Workspace;
  component: ReactNode;
  icon: ReactNode;
  typeOf?: string;
  disabled?: boolean;
}

const DrawerLeft: React.FC<Props> = ({ icon, typeOf, component, disabled }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Btn
        icon={icon}
        typeOf={typeOf}
        onClick={() => {
          showDrawer();
        }}
        disabled={disabled}
      />
      <Drawer
        title="Menu"
        placement="left"
        closable={true}
        onClose={onClose}
        open={open}
        closeIcon={<CrossIcon />}
        keyboard
      >
        {component}
      </Drawer>
    </>
  );
};

export default DrawerLeft;
