import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Space,
  Typography,
  Form,
  Input,
  Checkbox,
  Button,
  notification,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { loginService } from "../../service/user";
import { MANAGE_LIST_PATHNAME, REGISTER_PATH } from "../../router";
import { setToken } from "../../utils/user-token";

import styles from "./index.module.scss";

type LoginProps = {};
const { Title } = Typography;
const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

const Login: React.FC<LoginProps> = () => {
  const nav = useNavigate();
  const [form] = Form.useForm(); // 第三方 hook

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  });

  const { run, loading: loginLoading } = useRequest(
    async (username, password) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token } = result;

        setToken(token);
        notification.success({
          message: "登录",
          description: "操作成功",
        });
        nav(MANAGE_LIST_PATHNAME);
      },
    }
  );

  const onFinish = (values: any) => {
    const { username, password, remember } = values || {};

    run(username, password);

    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "字符长度在 5-20 之间",
              },
              { pattern: /^\w+$/, message: "只能是字母数字下划线" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loginLoading}>
                登录
              </Button>
              <Link to={REGISTER_PATH}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
