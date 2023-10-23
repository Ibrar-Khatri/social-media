import { FC } from "react";
import FriendsRequest from "./FriendsRequest";
import FriendSuggestion from "./FriendSuggestion";

const RightPanel: FC = () => {
  return (
    <div className="flex flex-col gap-[10px] height-full max-h-[calc(100vh-75px)] w-full overflow-y-auto">
      <FriendsRequest />
      <FriendSuggestion />
    </div>
  );
};

export default RightPanel;
