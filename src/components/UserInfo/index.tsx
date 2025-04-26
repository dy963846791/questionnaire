import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../../router";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../../service/user";
import { UserAddOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { removeToken } from "../../utils/user-token";

const UerInfo: FC = () => {
  const nav = useNavigate();
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};

  function logout() {
    // 清楚token 的存储
    removeToken();
    notification.success({
      message: "退出",
      description: "操作成功",
    });
    nav(LOGIN_PATHNAME);
  }

  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserAddOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <div>{username ? UserInfo : Login}</div>;
};

export default UerInfo;
