import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./index.module.scss";
import { Button, Typography } from "antd";
import { MANAGE_LIST_PATHNAME } from "../../router";
const { Title, Paragraph } = Typography;
const Home: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，收到答卷 990 份</Paragraph>
      </div>
      <div>
        <Button type="primary" onClick={() => nav(MANAGE_LIST_PATHNAME)}>
          开始使用
        </Button>
      </div>
    </div>
  );
};

export default Home;
