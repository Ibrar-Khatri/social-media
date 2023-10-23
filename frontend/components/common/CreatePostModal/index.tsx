import { Button, Input, Modal, Upload } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import CommonButton from "../Buttons";

interface CreatePostModalInterface {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreatePostModal: FC<CreatePostModalInterface> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      destroyOnClose
      closable={false}
      footer={false}
    >
      <div className="">
        <div className="relative flex justify-center items-center flex-1 border-b border-slate-300 pb-3 mb-3">
          <p className="text-xl font-bold">Create post</p>
          <img
            src="assets/icons/cross.png"
            className="absolute right-0 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center gap-2">
            <img
              src="assets/demo-images/profile-image.avif"
              className="h-[40px] w-[40px] rounded-full"
            />
            <div>
              <p className="leading-3 text-base font-semibold">Liam</p>
              <p className="text-slate-400">Full Stack Developer</p>
            </div>
          </div>
          <div>
            <Input.TextArea
              placeholder="Whats on your mind, Liam"
              autoSize={{ minRows: 3, maxRows: 5 }}
              className="!text-xl !border-0 placeholder:!text-slate-700 focus:!shadow-none active:!border-none"
            />
          </div>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
          >
            <Button>Upload Image</Button>
          </Upload>
          <div className="w-full">
            <CommonButton
              text={"Post"}
              className="!rounded-md w-full"
              type="primary"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
