import React, { FC } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import Styles from "./index.module.scss";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className={Styles.container}>
      <Link to="/">
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
