import React, { FC, useState } from "react";
import QuestionCard from "../../../components/QuestionCard";
import styles from "./index.module.scss";

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
  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <div id="list">
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
        <div className={styles.content}>
          {questionList.map((question) => {
            const { _id } = question;
            return <QuestionCard key={_id} {...question} />;
          })}
        </div>
        <div className={styles.footer}>footer</div>
      </div>
    </div>
  );
};

export default List;
