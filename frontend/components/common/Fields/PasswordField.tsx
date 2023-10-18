import { Form, Input } from "antd";

interface PasswordFieldType {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  rules?: Array<{}>;
  autoComplete?: string;
}

const PasswordField = ({
  label,
  name,
  placeholder,
  required,
  rules,
  autoComplete,
}: PasswordFieldType) => {
  return (
    <Form.Item label={label} required={required} name={name} rules={rules}>
      <Input.Password placeholder={placeholder} autoComplete={autoComplete} />
    </Form.Item>
  );
};

export default PasswordField;
