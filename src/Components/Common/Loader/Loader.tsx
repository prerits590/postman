
import { Spin } from "antd";

interface Props {}

const Loader: React.FC<Props> = () => {
  return <Spin size="large" fullscreen />;
};

export default Loader;
