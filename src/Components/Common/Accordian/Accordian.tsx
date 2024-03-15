import { Collapse } from "antd";
import { DownIcon } from "../Icons/Icons";
// import { ReactNode } from "react";

interface Item {
  id: string;
  method: string;
  endPoint: string;
  time: Date;
}

interface Props {
  items: Item[];
}

const Accordian: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <Collapse
        bordered={false}
        className="font-semibold border-none shadow-none rounded-none"
        expandIcon={({ isActive }) => (
          <DownIcon rotate={isActive ? 360 : 270} />
        )}
        items={items.map((item) => ({
          key: item.id,
          label: `${item.time.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`,
          children: (
            <>
              <div className="pt-2 flex cursor-pointer">
                <div className="px-8">
                  <p className="font-bold">{item.method}</p>
                </div>
                <div>
                  <p>{item.endPoint}</p>
                </div>
              </div>
            </>
          ),
        }))}
      />
    </div>
  );
};

export default Accordian;
