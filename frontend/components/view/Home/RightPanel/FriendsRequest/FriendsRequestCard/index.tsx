import CommonButton from "@/components/common/Buttons";

interface FriendsCardInterface {
  friend: any;
}

const FriendsRequestCard = ({ friend }: FriendsCardInterface) => {
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
      <div className="flex flex-col gap-[5px]">
        <CommonButton
          className="h-[6px]"
          size="small"
          text={"Accept"}
          type="primary"
        />
        <CommonButton text={"Deny"} size="small" />
      </div>
    </div>
  );
};

export default FriendsRequestCard;
