import React, { FC } from "react";
import { Spin } from "antd";
import useLoadeQuestionData from "../../../hooks/useLoadeQuestionData";

const Edit: FC = () => {
  const { loading, questionData } = useLoadeQuestionData();

  return (
    <Spin spinning={loading}>
      <p>Edit page</p>
      {!loading && <div>{JSON.stringify(questionData)}</div>}
    </Spin>
  );
};

export default Edit;
