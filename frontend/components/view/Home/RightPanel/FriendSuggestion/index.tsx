import { FC } from "react";
import FriendSuggestionCard from "./FriendSuggestionCard";

const FriendSuggestion: FC = () => {
  const requests = [
    {
      name: "Jhon",
      profession: "",
      src: "assets/demo-images/profile-image.avif",
    },
    {
      name: "Liam",
      profession: "Developer",
      src: "assets/demo-images/profile-image.avif",
    },
    {
      name: "Liam",
      profession: "Developer",
      src: "assets/demo-images/profile-image.avif",
    },
  ];
  return (
    <div className="bg-white rounded-lg p-[10px] flex flex-col gap-[15px]">
      <div className="flex justify-between border-b-[1px] border-snate-500 py-[5px]">
        <p className="text-lg font-bold">Friend Suggestion</p>
      </div>

      {requests.map((friend, key) => (
        <FriendSuggestionCard key={key} friend={friend} />
      ))}
    </div>
  );
};

export default FriendSuggestion;
