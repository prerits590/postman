import { Button } from "antd";
import { ReactNode } from "react";

interface Props {
  text?: string;
  icon?: ReactNode;
  typeOf?: string;
  onClickFunction?: () => void;
}

const BtnPrimary: React.FC<Props> = ({
  text,
  icon,
  typeOf,
  onClickFunction,
}) => {
  const handleClick = () => {
    {
      onClickFunction && onClickFunction();
    }
  };
  let buttonClassName = "flex items-center justify-center shadow-none";

  if (typeOf === "success") {
    buttonClassName += " btn-success";
  } else if (typeOf === "danger") {
    buttonClassName += " btn-danger";
  }
  return (
    <div>
      <Button
        className={buttonClassName}
        type={typeOf ? `${typeOf}` : undefined}
        icon={icon}
        onClick={onClickFunction ? handleClick : undefined}
      >
        {text}
      </Button>
    </div>
  );
};

export default BtnPrimary;
