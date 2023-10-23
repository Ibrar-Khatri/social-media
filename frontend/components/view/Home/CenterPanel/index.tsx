import { FC } from "react";
import CreatPost from "./CreatPost";
import PostCard from "@/components/common/PostCard";

const CenterPanel: FC = () => {
  return (
    <div className="flex flex-col flex-1 gap-3 max-h-[calc(100vh-75px)] overflow-y-auto">
      <CreatPost />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default CenterPanel;
