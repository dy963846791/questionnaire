import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";

import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../service/user";
import { loginReducer } from "../store/userReducer";

function useLoadUserData() {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      // 存储到redux store
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // 判断当前 redux store中是否存在用户信息
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, [run, username]);

  return { waitingUserData };
}

export default useLoadUserData;
