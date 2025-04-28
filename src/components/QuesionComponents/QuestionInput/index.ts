import Component from "./Component";
import { QuestionInputDefaultProps } from "./interface";

export * from "./interface";

const QuestionInputConf = {
  title: "输入框",
  type: "questionInput",
  Component,
  defaultProps: QuestionInputDefaultProps,
};
export default QuestionInputConf;
