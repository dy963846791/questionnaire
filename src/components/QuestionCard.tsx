import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";
import { Button, Space, Divider, Tag, Modal } from "antd";
import { useNavigate, Link } from "react-router-dom";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export type QuestionCardType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const { confirm } = Modal;
const QuestionCard: FC<QuestionCardType> = (props: QuestionCardType) => {
  const nav = useNavigate();
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props;

  function duplicate() {
    confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定要复制该问卷吗？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        console.log("fuzhile");
      },
    });
  }

  function delQuestion() {
    confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定要删除该问卷吗？",
      onOk() {
        console.log("删除");
      },
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStar && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "12px" }}></Divider>
      <div className={styles["button-container"]}>
        <div className={styles.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              disabled={!isPublished}
              icon={<LineChartOutlined />}
              onClick={() => nav(`/question/stat/${_id}`)}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="text" size="small" icon={<StarOutlined />}>
              {isStar ? "取消标星" : "标星"}
            </Button>

            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              onClick={duplicate}
            >
              复制
            </Button>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={delQuestion}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
