import axios from "./ajax";
import type { ResDataType } from "./ajax";

// 获取单个问卷信息
export async function getQuestion(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// 创建问卷
export async function createQuestion(): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.post(url)) as ResDataType;
  return data;
}
