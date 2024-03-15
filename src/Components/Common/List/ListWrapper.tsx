import { List } from "antd";
import { FC, ReactNode } from "react";

interface ListWrapperProps {
  data: [];
  header: ReactNode;
  footer: ReactNode;
}

const ListWrapper: FC<ListWrapperProps> = ({ data }) => {
  return (
    <div>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

export default ListWrapper;
