import { FC, useState } from "react";
import { Button, Form, Input } from "antd";
import InputField from "@/components/common/Fields/InputField";
import PasswordField from "@/components/common/Fields/PasswordField";

const Login: FC = () => {
  const [form] = Form.useForm();
  return (
    <div className="flex w-full h-full bg-grey justify-center items-center">
      <div className="w-full max-w-sm px-3">
        <Form
          name="login"
          layout={"vertical"}
          form={form}
          onFinish={(v) => {
            console.log("🚀 ~ v:", v);
          }}
        >
          <InputField
            name="email"
            placeholder="Enter a email"
            label="Email"
            autoComplete="email"
            rules={[
              { required: true, message: "This field is required*" },
              { type: "email" },
            ]}
          />
          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter a password"
            rules={[{ required: true, message: "This field is required*" }]}
            autoComplete="current-password"
          />

          <Form.Item>
            <Button className="mt-1" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
