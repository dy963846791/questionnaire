import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const nav = useNavigate();
  function goBack() {
    nav(-1);
  }

  return <div>
    <p>Login</p>
    <button onClick={goBack}>返回</button>
  </div>;
};

export default Login;
