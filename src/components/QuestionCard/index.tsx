import React, { FC, useState } from "react";
import { useRequest } from "ahooks";
import styles from "./index.module.scss";
import {
  Button,
  Space,
  Divider,
  Tag,
  Modal,
  notification,
  message,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  duplicationQuestionService,
  updateQuestionService,
} from "../../service/question";

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

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState((isStarState) => {
          return !isStarState;
        });
        notification.success({
          message: isStarState ? "取消标星" : "标星",
          description: `操作成功`,
        });
      },
    }
  );

  function duplicateHandle() {
    confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定要复制该问卷吗？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        duplicate();
      },
    });
  }
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicationQuestionService(_id);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        console.log("result===>", result);
        notification.success({
          message: "复制问卷",
          description: "操作成功",
        });
        nav(`/question/edit/${result.id}`);
      },
    }
  );

  function deleteHandle() {
    confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定要删除该问卷吗？",
      onOk() {
        deleteQuestion();
      },
    });
  }

  const { loading: delLoading, run: deleteQuestion } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, {isDeleted: true});
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        console.log("result===>", result);
        notification.success({
          message: "删除问卷",
          description: "操作成功",
        });
      },
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: "red" }} />}
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
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              onClick={changeStar}
              loading={changeStarLoading}
            >
              {isStarState ? "取消标星" : "标星"}
            </Button>

            <Button
              type="text"
              size="small"
              icon={<CopyOutlined />}
              onClick={duplicateHandle}
              loading={duplicateLoading}
            >
              复制
            </Button>

            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={deleteHandle}
              loading={delLoading}
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
