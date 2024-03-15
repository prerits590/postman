import { FC } from "react";

interface WorkspaceCardBlockProps {
  name: string;
  description: string;
}

const WorkspaceCardBlock: FC<WorkspaceCardBlockProps> = ({
  name,
  description,
}) => {
  return (
    <div className="card-style w-[15rem] h-[7rem] border rounded-sm">
      <ul className="workspace-list h-full flex w-full  items-center ">
        <li className="workspace-card h-full px-4 py-6 truncate w-full flex justify-evenly">
          <div className="">
            <h3>{name}</h3>
          </div>
          <div className="truncate">
            <p>{description}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WorkspaceCardBlock;
