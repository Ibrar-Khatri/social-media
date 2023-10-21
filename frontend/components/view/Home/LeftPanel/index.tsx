import { FC } from "react";
import UserDetails from "./UserDetails";
import Friends from "./Friends";

const LeftPanel: FC = () => {
  return (
    <div className="max-w-[250px] flex flex-col gap-[10px]	 w-full">
      <UserDetails />
      <Friends />
    </div>
  );
};

export default LeftPanel;
