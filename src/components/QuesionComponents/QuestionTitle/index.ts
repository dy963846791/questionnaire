import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

const QuestionTitleConf = {
  title: "标题",
  type: "questionTitle",
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
};
export default QuestionTitleConf;
