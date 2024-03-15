import { Button } from "antd";
import { ReactNode } from "react";

interface Props {
  text?: string;
  icon?: ReactNode;
  typeOf?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
}

const Btn: React.FC<Props> = ({
  text,
  icon,
  typeOf,
  active,
  disabled,
  danger,
  onClick,
}) => {
  const handleClick = () => {
    {
      onClick && onClick();
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
        className={`${buttonClassName} ${
          active === false ? "border-2 border-white" : ""
        }`}
        type={typeOf ? `${typeOf}` : undefined}
        icon={icon}
        onClick={onClick ? handleClick : undefined}
        disabled={disabled ? true : false}
        danger={danger ? true : false}
      >
        {text}
      </Button>
    </div>
  );
};

export default Btn;
