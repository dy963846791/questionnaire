import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { Result, Button } from "antd";
import { HOME_PATH } from "../../router";
const NotFound: FC = () => {
  const nav = useNavigate();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在"
        extra={
          <Button type="primary" onClick={() => nav(HOME_PATH)}>
            返回首页
          </Button>
        }
      ></Result>
    </>
  );
};

export default NotFound;
