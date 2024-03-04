import { Input } from "antd";
import { FC } from "react";

interface InputGenericProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGeneric: FC<InputGenericProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <Input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default InputGeneric;
