import React, { FC } from "react";
import { Spin } from "antd";
import useLoadeQuestionData from "../../../hooks/useLoadeQuestionData";

const Stat: FC = () => {
  const { loading, questionData } = useLoadeQuestionData();
  return (
    <Spin spinning={loading}>
      <p>Stat page</p>
      {!loading && <div>{JSON.stringify(questionData)}</div>}
    </Spin>
  );
};

export default Stat;
