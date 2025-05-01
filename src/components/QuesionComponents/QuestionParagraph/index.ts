import Component from "./Component";
import { QuestionParagraphDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

const QuestionParagraphConf = {
  title: "段落",
  type: "questionParagraph",
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
export default QuestionParagraphConf;
