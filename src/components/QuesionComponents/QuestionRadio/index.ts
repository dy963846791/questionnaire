import Component from "./Component";
import { QuestionRadioDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from "./interface";

const QuestionRadioConf = {
  title: "单选",
  type: "questionRadio",
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  // 统计组件
  StatComponent,
};

export default QuestionRadioConf;
