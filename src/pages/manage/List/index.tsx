import React, { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

import QuestionCard from "../../../components/QuestionCard";
import { Typography } from "antd";

import styles from "../common.module.scss";

const {Title} = Typography;
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

const List: FC = () => {
  const [searchParams] = useSearchParams();
  console.log("keyword", searchParams.get("keyword"));

  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length > 0 &&
          questionList.map((question) => {
            const { _id } = question;
            return <QuestionCard key={_id} {...question} />;
          })}
      </div>
      <div className={styles.footer}>loadMore...</div>
    </>
  );
};

export default List;
