import { useState } from "react";
// import { PenIcon } from "../Icons/Icons";
import InputGeneric from "../TextInput/Input/InputGeneric";
import Btn from "../Buttons/Btn/Btn";
import { Modal, message } from "antd";
import * as React from "react";

interface ModalProps {
  title: string;
  initialValue: string;
  onUpdate: (newValue: string) => void;
  btnType: string;
  disabled?: boolean;
  icon: React.ReactNode;
  placeholder: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  initialValue,
  onUpdate,
  btnType,
  disabled,
  icon,
  placeholder,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newValue, setNewValue] = useState(initialValue);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onUpdate(newValue);
    setIsModalOpen(false);
    setNewValue("");
    message.success("Data updated Successfully!");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Btn
        disabled={disabled ? true : false}
        typeOf={btnType}
        icon={icon}
        onClick={showModal}
      />

      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputGeneric
          placeholder={placeholder}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
