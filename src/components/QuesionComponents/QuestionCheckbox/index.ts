import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionCheckboxDefaultProps } from "./interface";

export * from "./interface";

const QuestionCheckboxConf = {
  title: "多选",
  type: "questionCheckbox",
  // 画布显示的组件
  Component,
  // 修改属性显示的组件
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
};

export default QuestionCheckboxConf;
