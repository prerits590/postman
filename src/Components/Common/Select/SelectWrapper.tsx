import { Select } from "antd";
import { FC } from "react";

interface SelectWrapperProps {
  defaultValue?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
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
