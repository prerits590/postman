import { Empty } from "antd";
import { FC } from "react";

interface EmptyComponentProps {}

const EmptyComponent: FC<EmptyComponentProps> = () => {
  return (
    <Empty
      className="flex justify-center items-center w-full flex-col h-full"
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 100 }}
      description={
        <div className="font-semibold sm:text-lg text-sm">Hit send to get started...</div>
      }
    />
  );
};

export default EmptyComponent;
