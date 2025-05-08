import Component from "./Component";
import { QuestionTextareaDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

const QuestionTextareaConf = {
  title: "多行输入",
  type: "questionTextarea",
  // 画布显示的组件
  Component,
  // 修改属性显示的组件
  PropComponent,
  defaultProps: QuestionTextareaDefaultProps,
};
export default QuestionTextareaConf;
