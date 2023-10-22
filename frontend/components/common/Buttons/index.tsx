import { Button } from "antd";

interface CommonButton {
  text: any;
  type?: "dashed" | "default" | "link" | "text" | "primary";
  size?: "large" | "middle" | "small";
  className?: string;
  onClick?: () => void;
}

const CommonButton = ({
  text,
  className = "",
  type,
  size,
  onClick = () => {},
}: CommonButton) => {
  return (
    <Button
      className={`!rounded-full ${className || ""}`}
      type={type}
      onClick={onClick}
      size={size}
    >
      {text}
    </Button>
  );
};

export default CommonButton;
