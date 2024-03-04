import  { FC } from "react";
import { Divider } from "antd";
interface DividerProps {}

const DividerLight: FC<DividerProps> = () => {
  return <Divider className="m-0 p-0" />;
};

export default DividerLight;
