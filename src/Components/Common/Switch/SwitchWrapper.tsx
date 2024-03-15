import { Switch } from "antd";
import { FC } from "react";

interface SwitchWrapperProps {
  size: "small" | "default";
}

const SwitchWrapper: FC<SwitchWrapperProps> = ({ size }) => {
  return (
    <>
      <Switch size={size} defaultChecked />
    </>
  );
};

export default SwitchWrapper;
