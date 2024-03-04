import { Switch } from "antd";

interface Props {}

const BtnToggle: React.FC<Props> = () => {
  return (
    <div>
      <Switch defaultChecked />
    </div>
  );
};

export default BtnToggle;
