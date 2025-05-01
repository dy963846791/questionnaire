import React from "react";
import { Typography } from "antd";

import { QuestionInfoPropsType, QuestionInfoDefaultProps } from "./interface";

const { Title, Paragraph } = Typography;

const Component: React.FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  const { title, desc } = { ...QuestionInfoDefaultProps, ...props };
  const descList = desc?.split("\n");

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {descList &&
          descList.map((desc, index) => (
            <span key={index}>
              {index > 0 && <br />}
              {desc}
            </span>
          ))}
      </Paragraph>
    </div>
  );
};

export default Component;
