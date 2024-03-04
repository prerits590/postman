import TextArea from "antd/es/input/TextArea";
import Loader from "../../Loader/Loader";
import { RequestData } from "../../../../Context/Types";

interface Props {
  data: string;
  selectedRequest: RequestData;
  selectedRequestIndex: number;
  isLoading: boolean;
}

const TextareaPrimary: React.FC<Props> = ({ data, isLoading }) => {

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="hidden sm:block">
            <TextArea className="resize-none" value={data} rows={11} />
          </div>
          <div className="block sm:hidden">
            <TextArea className="resize-none" value={data} rows={9} />
          </div>
        </>
      )}
    </div>
  );
};

export default TextareaPrimary;
