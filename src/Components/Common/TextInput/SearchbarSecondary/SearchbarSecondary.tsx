import { Input } from "antd";


interface Props {}

const SearchbarSecondary: React.FC<Props> = () => {
  return (
    <div>
      <Input className="placeholder:px-6" placeholder="Search" />
    </div>
  );
};

export default SearchbarSecondary;
