import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  // 登录方法
  const { register } = useAuth();

  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // 处理表单提交
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("两次输入密码不一致"));
      return; // 如果两次密码不一致的话，就不执行后面的代码
    }
    try {
      await run(register(values)); // run 返回一个 promise，所以要加上 await，否则 catch 中捕获不到错误
    } catch (err) {
      onError(err);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "用户名不能为空" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "密码不能为空" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder="确认密码" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
