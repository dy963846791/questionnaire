import React, { FC } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./ManageLayout.module.scss";
import { Button, Space, Divider, notification } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";

import { createQuestion } from "../service/question";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  // const [loading, setLoading] = useState(false);
  // function handleCreateClick() {
  //   setLoading(true);
  //   createQuestion()
  //     .then((res) => {
  //       const { id } = res || {};
  //       if (id) {
  //         nav(`/question/edit/${id}`);
  //         notification.success({
  //           message: `新建问卷`,
  //           description: `操作成功`,
  //         });
  //       }
  //       console.log("handleCreateClick===>", id);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  const {
    loading,
    // error,
    run: handleCreateClick,
  } = useRequest(createQuestion, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result._id}`);
      notification.success({
        message: `新建问卷`,
        description: `操作成功`,
      });
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            loading={loading}
          >
            新建问卷
          </Button>
          <Divider />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav("/manage/list")}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav("/manage/star")}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav("/manage/trash")}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
