import React, { useState } from "react";

const PostCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between flex-1">
        <div className="flex items-center gap-2">
          <img
            src="assets/demo-images/profile-image.avif"
            className="h-9 w-9 rounded-full "
          />
          <div>
            <p className="font-bold text-base leading-tight">Liam</p>
            <p className="text-sm text-slate-500">New York, USA</p>
          </div>
        </div>
        <p className="text-sm text-slate-500">10 days ago</p>
      </div>
      <div>
        <p className="mb-[10px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corrupti
          sunt deleniti voluptatem sequi amet eum tempore doloremque dolores
          veniam iure aliquid consequatur, voluptates, voluptatum tenetur est
          facilis esse quasi reiciendis deserunt aut, placeat maiores cumque.
          Recusandae in, dolor nesciunt iure officia molestiae porro earum, nisi
          natus, officiis sapiente saepe facere repellat consectetur voluptas
          amet ex praesentium! Rerum recusandae accusantium tempore non, vitae
          animi dignissimos officiis tenetur fugit nulla laudantium soluta id
          itaque ducimus molestiae voluptates quae amet laboriosam mollitia quam
          quas esse quisquam! Assumenda consequuntur at perferendis fuga
          tenetur! Rerum, id aliquam! Id eveniet laborum nobis nesciunt,
          molestiae aperiam!
        </p>
        <img
          src="assets/demo-images/profile-image.avif"
          className="rounded-xl mb-[20px]"
        />
      </div>
      <div className="flex justify-between pt-1 px-2 border-t">
        <div className="flex items-center gap-1">
          <img
            src={isLiked ? "assets/icons/liked.png" : "assets/icons/like.png"}
            className="h-5 w-5 cursor-pointer"
            onClick={() => setIsLiked((p) => !p)}
          />
          <p className="text-base mt-1">1 Like</p>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={"assets/icons/comment.png"}
            className="h-5 w-5 cursor-pointer mt-1"
          />
          <p className="text-base">0 Comments</p>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
