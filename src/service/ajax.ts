import axios from "axios";
import { notification } from "antd";
import { getToken } from "../utils/user-token";

const instance = axios.create({
  timeout: 10 * 1000,
});

// request 拦截：每次请求都带上 token
instance.interceptors.request.use(
  (config) => {
    // JWT 固定格式
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// response 拦截：统一处理errno 和 msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    // 错误提示
    if (msg) {
      notification.warning({
        message: `错误码：${errno}`,
        description: `错误信息${msg}`,
      });
    }

    throw new Error(msg);
  }

  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

export type ResDataType = {
  [key: string]: any;
};
