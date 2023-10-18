import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="h-full bg-white flex items-center justify-center">
      <Spin />;
    </div>
  );
};
export default Loading;
