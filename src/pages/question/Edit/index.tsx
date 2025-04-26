import React, { FC } from "react";
import { Spin } from "antd";
import useLoadeQuestionData from "../../../hooks/useLoadeQuestionData";

const Edit: FC = () => {
  const { loading, data, error } = useLoadeQuestionData();

  return (
    <Spin spinning={loading}>
      <p>Edit page</p>
      {!loading && <div>{JSON.stringify(data)}</div>}
    </Spin>
  );
};

export default Edit;
