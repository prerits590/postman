// import { Input } from "antd";
import Search from "antd/es/input/Search";
import { FC } from "react";

interface InputGenericProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<InputGenericProps> = ({ value, placeholder, onChange }) => {
  return (
    <div>
      <Search
        className="px-4"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
