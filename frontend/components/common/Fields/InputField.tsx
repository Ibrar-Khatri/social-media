import { Form, Input } from "antd";

interface InputFieldType {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rules?: Array<{}>;
  type?: string | "number" | "email";
  autoComplete?: string | "number" | "email";
}

const InputField = ({
  label,
  name,
  placeholder,
  required,
  rules,
  type,
  autoComplete,
}: InputFieldType) => {
  return (
    <Form.Item label={label} required={required} name={name} rules={rules}>
      <Input
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
      />
    </Form.Item>
  );
};

export default InputField;
