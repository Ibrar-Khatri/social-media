import CreatePostModal from "@/components/common/CreatePostModal";
import { Input } from "antd";
import { FC, Fragment, useState } from "react";

const CreatPost: FC = () => {
  const [open, setOpen] = useState(false);
  const hanldeOpen = () => {
    setOpen(true);
  };
  return (
    <Fragment>
      <div className="bg-white rounded-lg">
        <div className="flex px-[15px] py-[30px] gap-[20px]">
          <img src="assets/icons/user.png" className="h-[35px] w-[35px]" />
          <Input
            placeholder="Whats on your mind..."
            className="!rounded-lg !bg-slate-300"
            value=""
            onClick={hanldeOpen}
          />
        </div>
        <div className="flex justify-evenly px-[10px] py-[15px] border-t ">
          <span>
            <img
              src="assets/icons/photo.png"
              onClick={hanldeOpen}
              className="h-[25px] w-[25px]  cursor-pointer"
            />
          </span>
          <span>
            <img
              src="assets/icons/zoom.png"
              onClick={hanldeOpen}
              className="h-[25px] w-[25px] cursor-pointer"
            />
          </span>
          <span>
            <img
              src="assets/icons/folder.png"
              onClick={hanldeOpen}
              className="h-[25px] w-[25px]  cursor-pointer"
            />
          </span>
        </div>
      </div>
      <CreatePostModal open={open} setOpen={setOpen} />
    </Fragment>
  );
};

export default CreatPost;
