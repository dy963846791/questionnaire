import Component from "./Component";
import { QuestionInputDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

const QuestionInputConf = {
  title: "输入框",
  type: "questionInput",
  // 画布显示的组件
  Component,
  // 修改属性显示的组件
  PropComponent,
  defaultProps: QuestionInputDefaultProps,
};
export default QuestionInputConf;
