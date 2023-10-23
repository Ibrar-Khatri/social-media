import { FC } from "react";
import FriendsCard from "./FriendsCard";

const Friends: FC = () => {
  const friends = [
    {
      name: "Jhon",
      profession: "",
      src: "assets/demo-images/profile-image.avif",
    },
    {
      name: "Liam",
      profession: "Full-Stack Developer",
      src: "assets/demo-images/profile-image.avif",
    },
    {
      name: "Liam",
      profession: "Full-Stack Developer",
      src: "assets/demo-images/profile-image.avif",
    },
    {
      name: "Liam",
      profession: "Full-Stack Developer",
      src: "assets/demo-images/profile-image.avif",
    },
  ];
  return (
    <div className="bg-white rounded-lg p-[10px] flex flex-col gap-[15px]">
      <div className="flex justify-between border-b-[1px] border-snate-500 py-[5px]">
        <p>Friends</p>
        <p>{friends.length}</p>
      </div>

      {friends.map((friend, key) => (
        <FriendsCard key={key} friend={friend} />
      ))}
    </div>
  );
};

export default Friends;
