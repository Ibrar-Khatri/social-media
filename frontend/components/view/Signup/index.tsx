import { FC, useState } from "react";
import { Button, Form, Input } from "antd";
import InputField from "@/components/common/Fields/InputField";
import PasswordField from "@/components/common/Fields/PasswordField";
import Link from "next/link";

const Signup: FC = () => {
  const [form] = Form.useForm();
  return (
    <div className="flex w-full h-full bg-grey justify-center items-center">
      <div className="w-full max-w-sm px-3">
        <Form
          name="Signup"
          layout={"vertical"}
          form={form}
          onFinish={(v) => {
            console.log("🚀 ~ v:", v);
          }}
        >
          <div className="flex flex-col	gap-1 mb-5">
            <h1 className="font-black	text-2xl m">Create your account</h1>
            <p className="decoration-slate-500">
              Create account and connect with friends
            </p>
          </div>

          <InputField
            name="firstName"
            placeholder="First Name"
            label="First Name"
            autoComplete="f-name"
            rules={[{ required: true, message: "This field is required*" }]}
          />
          <InputField
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            autoComplete="l-name"
            rules={[{ required: true, message: "This field is required*" }]}
          />
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
            <Button className="mt-1 w-full" type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
          <p className="decoration-slate-500 text-center">
            Already have an account? <Link href={"/"}>login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
