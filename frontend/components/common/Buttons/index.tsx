import { Button } from "antd";

interface CommonButton {
  text: any;
  type?: "dashed" | "default" | "link" | "text" | "primary";
  onClick?: () => void;
}

const CommonButton = ({ text, type, onClick = () => {} }: CommonButton) => {
  return (
    <Button className="!rounded-full" type={type} onClick={onClick}>
      {text}
    </Button>
  );
};

export default CommonButton;
