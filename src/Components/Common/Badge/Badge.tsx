import { Badge } from "antd";
import { FC } from "react";

interface BadgeProps {
  status:
    | "default"
    | "success"
    | "processing"
    | "error"
    | "warning"
    | undefined;
  text: string;
}

const BadgeComponent: FC<BadgeProps> = ({ status, text }) => {
  return (
    <>
      <Badge status={status} text={text} />
    </>
  );
};

export default BadgeComponent;
