import { Input } from "antd";
import { FC, ReactNode } from "react";

interface InputGenericProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: ReactNode;
  disabled?: boolean;
}

const InputGeneric: FC<InputGenericProps> = ({
  value,
  placeholder,
  onChange,
  prefix,
  disabled,
}) => {
  return (
    <div>
      <Input
        value={value}
        prefix={prefix}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default InputGeneric;
