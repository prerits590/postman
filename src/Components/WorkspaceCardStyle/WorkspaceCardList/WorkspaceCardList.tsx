import { FC } from "react";
import { OpenFolderIcon } from "../../Common/Icons/Icons";

interface WorkspaceCardListProps {
  name: string;
  description: string;
}

const WorkspaceCardList: FC<WorkspaceCardListProps> = ({
  name,
  description,
}) => {
  return (
    <div className="list-style">
      <ul className="workspace-list ">
        <li className="workspace-card p-4 flex items-center">
          <div className=" border-2 p-4 rounded-full ">
            <OpenFolderIcon className="text-3xl" />
          </div>
          <div className="px-4 text-xl">
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WorkspaceCardList;
