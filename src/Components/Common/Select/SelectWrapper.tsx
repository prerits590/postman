import { Select } from "antd";
import { FC } from "react";

interface SelectWrapperProps {
  defaultValue?: "date" | "alphabatically";
  options: { value: string; label: string }[];
  onChange?: (value: "date" | "alphabatically") => void;
}

const SelectWrapper: FC<SelectWrapperProps> = ({
  defaultValue,
  options,
  onChange,
}) => {
  return (
    <div>
      <Select
        defaultValue={defaultValue}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectWrapper;
