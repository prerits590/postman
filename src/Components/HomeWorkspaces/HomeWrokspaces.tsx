interface Props {
  name: string;
}

const HomeWorkspaces: React.FC<Props> = ({ name }) => {
  return (
    <div className="h-fit w-full py-2 cursor-pointer">
      <div className="border ">
        <div className=" h-[20vh] bg-ant-1 text-center text-white font-semibold flex items-center justify-center">
          <p>{name}</p>
        </div>
        <div className="border-t border-gray-500 flex justify-center py-2 px-4">
          <p className="text-sm">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeWorkspaces;
