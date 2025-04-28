import React, { FC } from "react";
import { Spin } from "antd";
import useLoadeQuestionData from "../../../hooks/useLoadeQuestionData";

const Stat: FC = () => {
  const { loading } = useLoadeQuestionData();
  return (
    <Spin spinning={loading}>
      <p>Stat page</p>
      {!loading && <div>stat</div>}
    </Spin>
  );
};

export default Stat;
