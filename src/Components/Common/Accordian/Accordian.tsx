import { Collapse } from "antd";
import { DownIcon } from "../Icons/Icons";

interface Props {
  text: string;
  req: string;
  date: string;
}
const Accordian: React.FC<Props> = ({ text, req, date }) => {
  return (
    <div>
      <Collapse
        bordered={false}
        className="font-semibold border-none shadow-none rounded-none "
        expandIcon={({ isActive }) => (
          <DownIcon rotate={isActive ? 360 : 270} />
        )}
        items={[
          {
            key: "1",
            label: `${date}`,
            children: (
              <div className=" flex pt-2 cursor-pointer">
                <div className="px-8">
                  <p className="font-bold">{req}</p>
                </div>
                <div>
                  <p>{text}</p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Accordian;
