import { FC } from "react";

const UserDetails: FC = () => {
  const socialLinks = [
    {
      lable: "Instagram",
      source: "assets/icons/social-icons/instagram.png",
    },
    {
      lable: "Twitter",
      source: "assets/icons/social-icons/twitter.png",
    },
    {
      lable: "Facebook",
      source: "assets/icons/social-icons/facebook.png",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-[10px] flex flex-col gap-[15px]">
      <div className="flex gap-[10px] items-center	">
        <img
          src="/assets/demo-images/profile-image.avif"
          className="rounded-full h-[50px] w-[50px]"
        />
        <div>
          <p className="font-bold">Code Wave</p>
          <p className="text-gray-400 text-sm	">Full-Stack Developer</p>
        </div>
        <img
          src="/assets/icons/edit-icon.png"
          className="h-[15px] w-[15px] cursor-pointer	"
        />
      </div>

      <hr />
      <div className="flex gap-[7px] flex-col">
        <div className="flex items-center gap-[8px]">
          <img src="/assets/icons/location.png" className="h-[15px] w-[15px]" />
          <p className="text-gray-400 text-sm">Karachi, Pakistan</p>
        </div>
        <div className="flex items-center gap-[8px]">
          <img src="/assets/icons/suitcase.png" className="h-[15px] w-[15px]" />
          <p className="text-gray-400 text-sm">Full-Stack Developer</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-[5px]">
        <p className="font-bold text-lg">1 Friends</p>
        <div className="w-full flex justify-between">
          <p className="text-gray-400 text-sm">Who viewed your profile</p>
          <p className="text-gray-400 text-sm">0</p>
        </div>
        <p className="text-blue-600 text-sm cursor-pointer w-fit">Verified</p>
        <div className="w-full flex justify-between">
          <p className="text-gray-400 text-sm">Joined</p>
          <p className="text-gray-700 text-sm">an hour ago</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-[5px]">
        <p className="font-bold text-lg">Social Profile</p>
        {socialLinks.map(({ lable, source }, key) => (
          <div key={key} className="flex items-center gap-[5px]">
            <img src={source} className="h-[20px] w-[20px]" />
            <p className="text-gray-700 text-sm">{lable}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
