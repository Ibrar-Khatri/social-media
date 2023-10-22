import { FC } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import CenterPanel from "./CenterPanel";

const Home: FC = () => {
  return (
    <div className="flex justify-between gap-[15px] relative">
      <LeftPanel />
      <CenterPanel />
      <RightPanel />
    </div>
  );
};

export default Home;
