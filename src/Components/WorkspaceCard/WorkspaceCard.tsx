import WorkspaceCardBlock from "../WorkspaceCardStyle/WorkspaceCardBlock/WorkspaceCardBlock";
import WorkspaceCardList from "../WorkspaceCardStyle/WorkspaceCardList/WorkspaceCardList";

interface Props {
  name: string;
  description: string;
  viewMode: "tile" | "list";
}

const WorkspaceCard: React.FC<Props> = ({ name, description, viewMode }) => {
  return (
    <div className="h-fit w-full py-2 cursor-pointer">
      {viewMode === "list" ? (
        <WorkspaceCardList name={name} description={description} />
      ) : (
        <WorkspaceCardBlock name={name} description={description} />
      )}
    </div>
  );
};

export default WorkspaceCard;
