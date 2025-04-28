import { useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_LIST_PATHNAME,
} from "../router";

function useNavPage(waitingUserData: boolean) {
  const nav = useNavigate();
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();

  useEffect(() => {
    if (waitingUserData) {
      return;
    }

    // 已经登录
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_LIST_PATHNAME);
      }
      return;
    }

    // 未登录 且不需要登录的页面
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [username, pathname, waitingUserData, nav]);
}

export default useNavPage;
