import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";

import Styles from "./index.module.scss";

import useGetUserInfo from "../../hooks/useGetUserInfo";
import { HOME_PATH, MANAGE_LIST_PATHNAME } from "../../router";

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATH);

  useEffect(() => {
    setPathname(username ? MANAGE_LIST_PATHNAME : HOME_PATH);
  }, [username]);

  return (
    <div className={Styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>React问卷</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
