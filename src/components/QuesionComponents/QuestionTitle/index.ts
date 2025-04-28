import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";

export * from "./interface";

const QuestionTitleConf = {
  title: "标题",
  type: "questionTitle",
  Component,
  defaultProps: QuestionTitleDefaultProps,
};
export default QuestionTitleConf;
