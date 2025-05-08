import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useRequest, useKeyPress, useDebounceEffect } from "ahooks";
import { Button, Typography, Space, Input, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./EditHeader.module.scss";

import { EditOutlined, LeftOutlined, SaveOutlined } from "@ant-design/icons";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { chnagePageTitle } from "../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { updateQuestionService } from "../../../service/question";

const { Title } = Typography;

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo();
  const [editState, setEditState] = useState(false);
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (newTitle) {
      dispatch(chnagePageTitle(newTitle));
    }
  }

  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChange}
      />
    );
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => setEditState(true)}
      />
    </Space>
  );
};

// 保存按钮
const SaveButton: FC = () => {
  // pageInfo componentList
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) {
        return;
      }
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    {
      manual: true,
    }
  );

  // 快捷键
  useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) {
      save();
    }
  });

  // 自动保存
  useDebounceEffect(() => {
    save();
  }, [componentList, pageInfo, save]);

  return (
    <Button icon={<SaveOutlined />} onClick={save} loading={loading}>
      保存
    </Button>
  );
};

// 发布按钮
const PublishButton: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { componentList = [] } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();

  const { loading, run: pub } = useRequest(
    async () => {
      if (!id) {
        return;
      }
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        notification.success({
          message: "发布",
          description: "操作成功",
        });
        nav("/question/stat/" + id);
      },
    }
  );

  return (
    <Button type="primary" loading={loading} onClick={pub}>
      发布
    </Button>
  );
};

// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate();

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="text" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
