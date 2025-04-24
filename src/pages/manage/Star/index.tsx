import React, { FC, useState } from "react";

import QuestionCard from "../../../components/QuestionCard";
import { Typography, Empty } from "antd";

import { QuestionCardType } from "../../../components/QuestionCard";

import styles from "../common.module.scss";

const { Title } = Typography;
const rawQuestionList: QuestionCardType[] = [
  {
    _id: "q2",
    title: "问卷2",
    isPublished: false,
    isStar: true,
    answerCount: 10,
    createdAt: "3月11日 14:00",
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

const Star: FC = () => {
  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      {questionList.length > 0 && <div className={styles.footer}>分页</div>}
    </>
  );
};

export default Star;
