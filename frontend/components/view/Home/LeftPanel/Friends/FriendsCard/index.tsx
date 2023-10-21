interface FriendsCardInterface {
  friend: any;
}

const FriendsCard = ({ friend }: FriendsCardInterface) => {
  return (
    <div className="flex items-center gap-[10px]">
      <img src={friend.src} className="h-[40px] w-[40px] rounded-full" />
      <div>
        <p className="text-gray-700 text-sm">{friend.name}</p>
        <p className="text-gray-400 text-sm">
          {friend.profession || "No Profession"}
        </p>
      </div>
    </div>
  );
};

export default FriendsCard;
