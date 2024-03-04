import { useState } from "react";
import { Button, Modal } from "antd";
import { PenIcon } from "../Icons/Icons";
import InputGeneric from "../TextInput/InputGeneric/InputGeneric";

interface Props {
  updateWorkspaceName: (workspaceId: string, newName: string) => void;
  workspaceId: string;
}

const ModalComponent: React.FC<Props> = ({
  updateWorkspaceName,
  workspaceId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    updateWorkspaceName(workspaceId, newName);
    setIsModalOpen(false);
    setNewName("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PenIcon />}
        onClick={showModal}
        className="border-none shadow-none"
      />

      <Modal
        title="Change Workspace Name"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputGeneric
          placeholder={"My Workspace..."}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
