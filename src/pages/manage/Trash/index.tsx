import React, { FC, useState } from "react";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Spin,
  notification,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import ListSearch from "../../../components/ListSearch";
import ListPage from "../../../components/ListPage";

import useLoadQuestionListData from "../../../hooks/useLoadQuestionListData";

import styles from "../common.module.scss";
import { useRequest } from "ahooks";
import {
  deleteQuestionService,
  updateQuestionService,
} from "../../../service/question";

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  const [selectedId, setSelectedId] = useState<string[]>([]);

  // 恢复
  const { loading: recoverLoading, run: recoverQuestion } = useRequest(
    async () => {
      for await (const id of selectedId) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      onSuccess() {
        notification.success({
          message: "恢复问卷",
          description: "操作成功",
        });
        refresh();
        setSelectedId([]);
      },
    }
  );

  const {
    data = {},
    loading,
    refresh,
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  function del() {
    confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不能找回，是否要彻底删除？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteQuestion();
      },
    });
  }

  const { loading: delLoading, run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedId);
    },
    {
      manual: true,
      onSuccess() {
        notification.success({
          message: "彻底删除",
          description: "操作成功",
        });
        refresh();
        setSelectedId([]);
      },
    }
  );

  const tableColumn = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];

  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedId.length === 0}
            onClick={recoverQuestion}
            loading={recoverLoading}
          >
            恢复
          </Button>
          <Button
            danger
            disabled={selectedId.length === 0}
            onClick={del}
            loading={delLoading}
          >
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumn}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedId(selectedRowKeys as string[]);
            console.log(selectedRowKeys);
          },
        }}
      ></Table>
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading && list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Trash;
