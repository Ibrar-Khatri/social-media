import { FC } from "react";
import { Button, Form, Input } from "antd";

const Login: FC = () => {
  const [form] = Form.useForm();

  return (
    <Form layout={"vertical"} form={form} style={{ maxWidth: 600 }}>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
