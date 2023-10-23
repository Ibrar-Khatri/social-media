import { FC } from "react";
import UserDetails from "./UserDetails";
import Friends from "./Friends";

const LeftPanel: FC = () => {
  return (
    <div className="flex flex-col gap-[10px] height-full max-h-[calc(100vh-75px)] w-full overflow-y-auto">
      <UserDetails />
      <Friends />
    </div>
  );
};

export default LeftPanel;
