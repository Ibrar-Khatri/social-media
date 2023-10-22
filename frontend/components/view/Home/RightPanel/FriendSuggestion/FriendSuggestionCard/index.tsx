import CommonButton from "@/components/common/Buttons";

interface FriendsCardInterface {
  friend: any;
}

const FriendSuggestionCard = ({ friend }: FriendsCardInterface) => {
  return (
    <div className="flex items-center gap-[10px] justify-between">
      <div className="flex items-center gap-[10px]">
        <img src={friend.src} className="h-[40px] w-[40px] rounded-full" />
        <div>
          <p className="text-gray-700 text-sm">{friend.name}</p>
          <p className="text-gray-400 text-sm">
            {friend.profession || "No Profession"}
          </p>
        </div>
      </div>
      <img
        src={"assets/icons/add-user.png"}
        className="h-[20px] w-[20px] cursor-pointer"
      />
    </div>
  );
};

export default FriendSuggestionCard;
