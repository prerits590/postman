import { FC, ReactNode } from "react";
import { Button, Popconfirm } from "antd";

interface PopConfirmProps {
  title: string;
  description?: string;
  btnText: string | ReactNode;
  okText: string;
  cancelText: string;
  confirm: () => void;
}

const PopConfirm: FC<PopConfirmProps> = ({
  title,
  description,
  btnText,
  okText,
  cancelText,
  confirm,
}) => {
  return (
    <div>
      <Popconfirm
        title={title}
        onConfirm={confirm}
        okText={okText}
        cancelText={cancelText}
        description={description}
      >
        <Button danger className="flex justify-center items-center p-2">
          {btnText}
        </Button>
      </Popconfirm>
    </div>
  );
};

export default PopConfirm;
