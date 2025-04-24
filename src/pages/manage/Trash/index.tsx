import React, { FC, useState } from "react";
import { Typography, Empty, Table, Tag, Button, Space, Modal } from "antd";
import styles from "../common.module.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { confirm } = Modal;
const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: "3月10日 12:00",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: false,
    isStar: true,
    answerCount: 10,
    createdAt: "3月11日 14:00",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: true,
    isStar: false,
    answerCount: 20,
    createdAt: "3月12日 16:00",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: true,
    isStar: true,
    answerCount: 30,
    createdAt: "3月13日 18:00",
  },
];

const Trash: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList);
  const [selectedId, setSelectedId] = useState<string[]>([]);

  function del() {
    confirm({
      title: "温馨提示",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不能找回，是否要彻底删除？",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        console.log("彻底删除");
      },
    })
  }

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
          <Button type="primary" disabled={selectedId.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedId.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
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
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
    </>
  );
};

export default Trash;
