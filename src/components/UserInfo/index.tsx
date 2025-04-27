import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button, notification } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { LOGIN_PATHNAME } from "../../router";
import { removeToken } from "../../utils/user-token";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { logoutReducer } from "../../store/userReducer";

const UerInfo: FC = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { username, nickname } = useGetUserInfo();

  function logout() {
    // 清空 redux user 数据
    dispatch(logoutReducer());
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
