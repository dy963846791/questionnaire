import Component from "./Component";
import { QuestionInfoDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

const QuestionInfoConf = {
  title: "问卷信息",
  type: "questionInfo",
  // 画布显示的组件
  Component,
  // 修改属性显示的组件
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
};
export default QuestionInfoConf;
